/* 交互：筛选、详情层、深链、灯箱、键盘 */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- i18n ---------------- */
  var DICT = window.I18N || { zh: {}, en: {} };
  var LANG = (function () {
    try { var s = localStorage.getItem("pf-lang"); if (s === "en" || s === "zh") return s; } catch (e) {}
    return "zh";
  })();

  function T(key, vars) {
    var d = DICT[LANG] || {};
    var v = d[key];
    if (v == null) v = (DICT.zh || {})[key];
    if (v == null) return key;
    if (vars) Object.keys(vars).forEach(function (k) { v = v.split("{" + k + "}").join(vars[k]); });
    return v;
  }

  /* 英文字段叠加到作品对象上；图注按序号替换 */
  function lw(w) {
    if (LANG !== "en" || !window.WORK_EN) return w;
    var e = window.WORK_EN[w.slug];
    if (!e) return w;
    var o = {}, k;
    for (k in w) o[k] = w[k];
    for (k in e) o[k] = e[k];
    if (e.docLabel && w.doc) o.doc = { href: w.doc.href, label: e.docLabel };
    if (e.galleryCaps) o.gallery = w.gallery.map(function (g, i) { return { src: g.src, cap: e.galleryCaps[i] || g.cap }; });
    if (e.mediaCaps && w.media) o.media = w.media.map(function (m, i) {
      if (!e.mediaCaps[i]) return m;
      var mm = {}, q;
      for (q in m) mm[q] = m[q];
      mm.caption = e.mediaCaps[i];
      return mm;
    });
    return o;
  }

  var state = { cat: "all", q: "", current: null, lastFocus: null, lbFocus: null, lbIndex: 0, lbList: [] };

  /* ---------------- render helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function matches(w) {
    if (state.cat !== "all" && w.cat !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var v = lw(w);
    var hay = [v.title, w.title, w.en, v.catLabel, w.catLabel, w.year, v.summary, w.summary,
      v.award || "", w.award || "", v.tags.join(" "), w.tags.join(" "),
      v.sections.map(function (s) { return s.h + " " + s.p; }).join(" "),
      w.sections.map(function (s) { return s.h + s.p; }).join(" ")]
      .join(" ").toLowerCase();
    return q.split(/\s+/).every(function (term) { return hay.indexOf(term) !== -1; });
  }

  function filtered() { return WORKS.filter(matches); }

  /* ---------------- grid + filters ---------------- */
  var grid = $("#grid");
  var filters = $("#filters");
  var resultCount = $("#resultCount");
  var countNum = $("#countNum");
  var clearBtn = $("#clearBtn");
  var empty = $("#empty");

  function renderFilters() {
    filters.innerHTML = CATS.map(function (c) {
      var lbl = T("cat." + c.id);
      if (lbl === "cat." + c.id) lbl = c.label;
      return '<button type="button" role="tab" data-cat="' + c.id + '" aria-selected="' + (state.cat === c.id) + '">' + esc(lbl) + "</button>";
    }).join("");
  }

  function cardHTML(w) {
    w = lw(w);
    return '<a class="card" href="#work/' + w.slug + '" data-id="' + w.id + '">' +
      '<div class="card-media">' +
        '<img src="' + w.cover + '" alt="' + esc(w.title) + '" width="1400" height="1050" loading="lazy" decoding="async">' +
        '<span class="card-veil"></span>' +
        '<span class="card-num">' + esc(w.no) + "</span>" +
        (w.award ? '<span class="card-award">' + esc(T("card.award")) + '</span>' : "") +
        '<span class="card-open">' + esc(T("card.open")) + ' <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"></path></svg></span>' +
      "</div>" +
      '<div class="card-info">' +
        '<div class="card-top"><span class="card-cat">' + esc(w.catLabel) + '</span><span class="card-year">' + esc(w.year) + "</span></div>" +
        '<h3 class="card-title">' + esc(w.title) + "</h3>" +
        '<p class="card-sub">' + esc(w.tags.join(" · ")) + "</p>" +
      "</div></a>";
  }

  function renderGrid() {
    var list = filtered();
    grid.innerHTML = list.map(cardHTML).join("");
    empty.hidden = list.length > 0;
    resultCount.textContent = list.length + " " + T("count.unit");
    countNum.textContent = list.length;
    clearBtn.hidden = !(state.cat !== "all" || state.q);
    $$("#filters button").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.dataset.cat === state.cat));
    });
    renderSearchResults();
  }

  filters.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-cat]");
    if (!b) return;
    state.cat = b.dataset.cat;
    renderGrid();
  });

  clearBtn.addEventListener("click", function () {
    state.cat = "all"; state.q = "";
    $("#searchInput").value = "";
    renderGrid();
  });

  /* ---------------- hero search ---------------- */
  var input = $("#searchInput");
  var chips = $("#heroChips");
  var searchResults = document.createElement("div");
  searchResults.className = "search-results";
  searchResults.hidden = true;
  $(".index-card").appendChild(searchResults);

  function renderSearchResults() {
    var q = state.q.trim();
    if (!q) { searchResults.hidden = true; searchResults.innerHTML = ""; delete searchResults.dataset.on; return; }
    var list = filtered().slice(0, 4).map(lw);
    var total = filtered().length;
    searchResults.hidden = false;
    searchResults.innerHTML =
      (list.length ? list.map(function (w) {
        return '<a class="sr-item" href="#work/' + w.slug + '">' +
          '<img src="' + w.cover + '" alt="" width="120" height="90" loading="lazy">' +
          '<span class="sr-text"><b>' + esc(w.title) + "</b><em>" + esc(w.catLabel) + " · " + esc(w.year) + "</em></span>" +
          '<span class="sr-arrow">→</span></a>';
      }).join("") : '<p class="sr-empty">' + esc(T("search.none")) + "</p>") +
      '<a class="sr-all" href="#works">' + esc(total ? T("search.viewall", { n: total }) : T("search.browse")) + " ↓</a>";
    placeResults();
  }

  function placeResults() {
    if (searchResults.hidden) return;
    var card = $(".index-card").getBoundingClientRect();
    var field = input.closest(".search").getBoundingClientRect();
    var h = Math.min(searchResults.offsetHeight || 240, 340);
    var spaceBelow = window.innerHeight - field.bottom - 20;
    if (spaceBelow < h + 16) {
      searchResults.style.top = "auto";
      searchResults.style.bottom = Math.round(card.bottom - field.top + 10) + "px";
      searchResults.classList.add("is-up");
    } else {
      searchResults.style.bottom = "auto";
      searchResults.style.top = Math.round(field.bottom - card.top + 10) + "px";
      searchResults.classList.remove("is-up");
    }
  }
  window.addEventListener("resize", placeResults);

  input.addEventListener("input", function () {
    state.q = input.value;
    renderGrid();
  });
  searchResults.addEventListener("click", function (e) {
    if (e.target.closest("a")) { searchResults.hidden = true; }
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      location.hash = "#works";
      input.blur();
    }
  });
  chips.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-q]");
    if (!b) return;
    state.q = LANG === "en" ? (b.dataset.qEn || b.dataset.q) : b.dataset.q;
    input.value = state.q;
    renderGrid();
    location.hash = "#works";
  });

  /* ---------------- nav / menu ---------------- */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = $("#menuBtn"), mobileMenu = $("#mobileMenu");
  menuBtn.addEventListener("click", function () {
    var open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });
  mobileMenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) { menuBtn.setAttribute("aria-expanded", "false"); mobileMenu.hidden = true; }
  });

  /* ---------------- reveal ---------------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------- work detail ---------------- */
  var wv = $("#wv"), wvScroll = $("#wvScroll");
  var lb = $("#lb");

  function metaCell(label, value) {
    return '<div class="meta-cell"><dt>' + esc(label) + "</dt><dd>" + esc(value) + "</dd></div>";
  }

  function mediaHTML(m) {
    var phone = m.phone ? " phone" : "";
    return '<div class="video-block' + phone + '">' +
      '<div class="frame"><video controls muted loop playsinline preload="none" poster="' + m.poster + '" style="aspect-ratio:' + m.ratio.replace(/\s/g, "") + '">' +
      '<source src="' + m.src + '" type="video/mp4">你的浏览器不支持视频播放。</video></div>' +
      '<p class="video-cap"><span>' + esc(m.caption) + '</span><span class="mono">VIDEO</span></p>' +
      "</div>";
  }

  function openWork(slug, opts) {
    opts = opts || {};
    var idx = WORKS.findIndex(function (w) { return w.slug === slug; });
    if (idx < 0) return;
    var base = WORKS[idx];
    var w = lw(base);
    state.current = base;
    if (!opts.keepFocus) state.lastFocus = document.activeElement;

    $("#wvCover").src = w.cover;
    $("#wvCover").alt = w.title + " 主视觉";
    $("#wvKicker").textContent = w.catLabel + "  ·  " + w.year + (w.award ? "  ·  " + T("detail.awardword") : "");
    $("#wvTitle").textContent = w.title;
    $("#wvEn").textContent = w.en;
    $("#wvNo").textContent = w.no;
    $("#wvSummary").textContent = w.summary;
    wvScroll.scrollTop = 0;

    var meta = "<dl>" + metaCell(T("detail.year"), w.year) + metaCell(T("detail.cat"), w.catLabel) + metaCell(T("detail.role"), w.role) + metaCell(T("detail.tools"), w.tools) + "</dl>";
    if (w.award) meta += '<div class="wv-award"><b>AWARD</b>' + esc(w.award) + "</div>";
    meta += '<div class="wv-tags">' + w.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>";
    if (w.doc) meta += '<a class="wv-doc" href="' + w.doc.href + '" target="_blank" rel="noopener">' + esc(w.doc.label) + " ↗</a>";
    $("#wvMeta").innerHTML = meta;

    $("#wvSections").innerHTML = w.sections.map(function (s, i) {
      return '<section class="wv-sec"><span class="idx">' + String(i + 1).padStart(2, "0") + "</span><div><h3>" + esc(s.h) + "</h3><p>" + esc(s.p) + "</p></div></section>";
    }).join("");

    $("#wvMedia").innerHTML = (w.media || []).map(mediaHTML).join("");

    $("#wvGallery").innerHTML = w.gallery.map(function (g, i) {
      return '<figure data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(T("gallery.aria")) + esc(g.cap) + '">' +
        '<img src="' + g.src + '" alt="' + esc(g.cap) + '" loading="lazy" decoding="async">' +
        "<figcaption>" + esc(g.cap) + "</figcaption></figure>";
    }).join("");

    var prev = lw(WORKS[(idx - 1 + WORKS.length) % WORKS.length]);
    var next = lw(WORKS[(idx + 1) % WORKS.length]);
    $("#wvPrev").href = "#work/" + prev.slug;
    $("#wvPrev").querySelector("strong").textContent = prev.title;
    $("#wvNext").href = "#work/" + next.slug;
    $("#wvNext").querySelector("strong").textContent = next.title;
    $("#wvEnd").innerHTML = "<span>" + (LANG === "en" ? "Work " : "作品 ") + w.no + " / " + WORKS.length + "</span><span>" + esc(T("detail.credit")) + "</span>";

    wv.classList.add("open");
    wv.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    if (!opts.silentHash) setHash("#work/" + w.slug, "push");
    if (!opts.noFocus) setTimeout(function () { wv.focus({ preventScroll: true }); }, 60);
  }

  function closeWork(opts) {
    opts = opts || {};
    if (!wv.classList.contains("open")) return;
    wv.classList.remove("open");
    wv.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
    state.current = null;
    if (!opts.silentHash) setHash("", "replace");
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus({ preventScroll: true });
  }

  function setHash(hash, mode) {
    try {
      var url = hash || location.pathname + location.search;
      history[mode + "State"](null, "", url);
    } catch (err) {
      location.hash = hash ? hash.slice(1) : "";
    }
  }

  function slugFromHash() {
    var m = location.hash.match(/^#work\/([a-z0-9-]+)/i);
    return m ? m[1] : null;
  }

  function syncFromHash() {
    var slug = slugFromHash();
    if (slug) {
      if (!state.current || state.current.slug !== slug) openWork(slug, { silentHash: true });
    } else if (wv.classList.contains("open")) {
      closeWork({ silentHash: true });
    }
  }

  /* card + feature links */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#work/"]');
    if (!a || wv.contains(a)) return;
    e.preventDefault();
    var slug = a.getAttribute("href").slice(6);
    openWork(slug);
  });

  $$("#wv [data-close]").forEach(function (b) { b.addEventListener("click", function () { closeWork(); }); });
  $$("#wv [data-prev]").forEach(function (b) { b.addEventListener("click", function () { step(-1); }); });
  $$("#wv [data-next]").forEach(function (b) { b.addEventListener("click", function () { step(1); }); });

  function step(dir) {
    if (!state.current) return;
    var i = WORKS.indexOf(state.current);
    var w = WORKS[(i + dir + WORKS.length) % WORKS.length];
    openWork(w.slug, { keepFocus: true });
    wvScroll.scrollTop = 0;
  }

  $("#wvPrev").addEventListener("click", function (e) { e.preventDefault(); step(-1); });
  $("#wvNext").addEventListener("click", function (e) { e.preventDefault(); step(1); });

  /* gallery -> lightbox */
  $("#wvGallery").addEventListener("click", function (e) {
    var fig = e.target.closest("figure[data-i]");
    if (fig) openLB(parseInt(fig.dataset.i, 10));
  });
  $("#wvGallery").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var fig = e.target.closest("figure[data-i]");
    if (!fig) return;
    e.preventDefault();
    openLB(parseInt(fig.dataset.i, 10));
  });

  /* ---------------- lightbox ---------------- */
  function openLB(i) {
    if (!state.current) return;
    state.lbList = state.current.gallery;
    state.lbIndex = i;
    paintLB();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    state.lbFocus = document.activeElement;
    document.body.classList.add("lock");
    $(".lb-close").focus({ preventScroll: true });
  }

  function paintLB() {
    var g = state.lbList[state.lbIndex];
    $("#lbImg").src = g.src;
    $("#lbImg").alt = g.cap;
    $("#lbCap").textContent = g.cap;
    $("#lbNum").textContent = String(state.lbIndex + 1).padStart(2, "0") + " / " + String(state.lbList.length).padStart(2, "0");
  }

  function closeLB() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    if (!wv.classList.contains("open")) document.body.classList.remove("lock");
    if (state.lbFocus && state.lbFocus.focus) state.lbFocus.focus({ preventScroll: true });
  }

  function lbStep(d) {
    if (!state.lbList.length) return;
    state.lbIndex = (state.lbIndex + d + state.lbList.length) % state.lbList.length;
    paintLB();
  }

  $$("#lb [data-lb-close]").forEach(function (b) { b.addEventListener("click", closeLB); });
  $("#lb [data-lb-prev]").addEventListener("click", function () { lbStep(-1); });
  $("#lb [data-lb-next]").addEventListener("click", function () { lbStep(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });

  /* ---------------- keyboard ---------------- */
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;

    if (lb.classList.contains("open")) {
      if (e.key === "Escape") { e.preventDefault(); closeLB(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); lbStep(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); lbStep(1); }
      return;
    }
    if (wv.classList.contains("open")) {
      if (e.key === "Escape") { e.preventDefault(); closeWork(); }
      else if (!typing && e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      else if (!typing && e.key === "ArrowRight") { e.preventDefault(); step(1); }
      return;
    }
    if (e.key === "/" && !typing) {
      e.preventDefault();
      input.focus();
      document.getElementById("top").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

  /* keep focus inside detail dialog */
  document.addEventListener("focusin", function (e) {
    if (wv.classList.contains("open") && !wv.contains(e.target)) {
      var c = wv.querySelector(".wv-x");
      if (c) c.focus({ preventScroll: true });
    }
  });

  window.addEventListener("hashchange", syncFromHash);

  /* ---------------- contact reveal（打码 → 点击解码） ----------------
     静态 HTML 里只有 ciyu****@163.com，真实值以 base64 存在此处，
     页面源码与文本爬虫拿不到明文；手机号已从站点与 PDF 中移除。 */
  var CONTACT = { revealed: false, email: atob("Y2l5dWppYWxpbkAxNjMuY29t") };

  function contactSubject() {
    return encodeURIComponent(LANG === "en" ? "Portfolio enquiry · Yu Jialin" : "作品集咨询 · 于佳林");
  }

  function paintContact() {
    var mail = document.getElementById("contactMail");
    if (!mail) return;
    var subject = contactSubject();
    if (!CONTACT.revealed) {
      var b0 = document.getElementById("revealContact");
      if (b0) b0.textContent = T("contact.reveal");
      return;
    }
    if (mail.tagName !== "A") {
      mail.outerHTML = '<a class="mail" id="contactMail" href="mailto:' + CONTACT.email + "?subject=" + subject + '">' + CONTACT.email + "</a>";
    } else {
      mail.setAttribute("href", "mailto:" + CONTACT.email + "?subject=" + subject);
    }
    var btn = document.getElementById("revealContact");
    if (!btn) return;
    btn.outerHTML = '<a class="btn btn-solid" href="mailto:' + CONTACT.email + "?subject=" + subject + '">' + esc(T("contact.write")) + "</a>" +
      '<button class="btn btn-line" type="button" id="copyMail">' + esc(T("contact.copy")) + "</button>";
    var copy = document.getElementById("copyMail");
    if (copy) copy.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONTACT.email).then(function () { copy.textContent = T("contact.copied"); }, function () { copy.textContent = CONTACT.email; });
      } else { copy.textContent = CONTACT.email; }
    });
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.id === "revealContact") { CONTACT.revealed = true; paintContact(); }
  });

  /* ---------------- language switch ---------------- */
  function applyStatic() {
    $$("[data-i18n]").forEach(function (el) {
      var v = T(el.getAttribute("data-i18n"));
      if (v != null && v !== "") el.innerHTML = v;
    });
    $$("[data-i18n-ph]").forEach(function (el) {
      var v = T(el.getAttribute("data-i18n-ph"));
      if (v) el.setAttribute("placeholder", v);
    });
    $$("[data-i18n-aria]").forEach(function (el) {
      var v = T(el.getAttribute("data-i18n-aria"));
      if (v) el.setAttribute("aria-label", v);
    });
    $$("[data-i18n-alt]").forEach(function (el) {
      var v = T(el.getAttribute("data-i18n-alt"));
      if (v) el.setAttribute("alt", v);
    });
    document.documentElement.lang = LANG === "en" ? "en" : "zh-CN";
    document.body.classList.toggle("lang-en", LANG === "en");
    document.title = T("page.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", T("page.desc"));
  }

  function updateLangBtn() {
    $$(".lang-btn, .menu-lang").forEach(function (b) { b.setAttribute("aria-pressed", String(LANG === "en")); });
  }

  var ripple = $("#ripple"), rippleEdge = $("#rippleEdge");
  var switching = false;

  /* 从点击点扩散到全屏的涟漪：裁切圆扩大 → 覆盖后换语言 → 淡出 */
  function rippleFrom(x, y, done) {
    if (reduceMotion || !ripple) { done(); return; }
    var vw = window.innerWidth, vh = window.innerHeight;
    var r = Math.sqrt(Math.pow(Math.max(x, vw - x), 2) + Math.pow(Math.max(y, vh - y), 2)) + 80;
    var ease = "cubic-bezier(.55,.02,.2,1)";
    var dur = 640;
    var from = "circle(0px at " + x + "px " + y + "px)";
    var to = "circle(" + r + "px at " + x + "px " + y + "px)";

    ripple.style.background = "radial-gradient(circle at " + x + "px " + y + "px, rgba(240,163,94,.24) 0%, rgba(22,23,26,.97) 24%, #0b0c0e 58%, #0b0c0e 100%)";
    ripple.style.clipPath = from;
    ripple.style.opacity = "1";
    ripple.hidden = false;

    if (rippleEdge) {
      rippleEdge.style.left = x + "px";
      rippleEdge.style.top = y + "px";
      rippleEdge.style.opacity = "1";
      rippleEdge.hidden = false;
      rippleEdge.getAnimations().forEach(function (a) { a.cancel(); });
      rippleEdge.animate([
        { width: "0px", height: "0px", opacity: .85 },
        { width: (2 * r) + "px", height: (2 * r) + "px", opacity: 0 }
      ], { duration: dur, easing: ease, fill: "forwards" });
    }

    ripple.getAnimations().forEach(function (a) { a.cancel(); });
    var grow = ripple.animate([{ clipPath: from }, { clipPath: to }], { duration: dur, easing: ease, fill: "forwards" });

    var started = false;
    function swap() {
      if (started) return;
      started = true;
      done();
      var fade = ripple.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, delay: 70, easing: "ease-out", fill: "forwards" });
      fade.onfinish = function () {
        ripple.hidden = true;
        if (rippleEdge) rippleEdge.hidden = true;
        ripple.style.opacity = "";
      };
    }
    grow.onfinish = swap;
    setTimeout(swap, dur + 80);
  }

  function applyLang(next) {
    LANG = next;
    try { localStorage.setItem("pf-lang", next); } catch (e) {}
    applyStatic();
    renderFilters();
    renderGrid();
    paintContact();
    if (state.current) openWork(state.current.slug, { silentHash: true, keepFocus: true, noFocus: true });
    updateLangBtn();
  }

  function setLang(next, origin) {
    if (next === LANG || switching) return;
    switching = true;
    document.body.classList.add("is-switching");
    var x = window.innerWidth / 2, y = Math.min(72, window.innerHeight / 3);
    if (origin && origin.getBoundingClientRect) {
      var b = origin.getBoundingClientRect();
      x = b.left + b.width / 2;
      y = b.top + b.height / 2;
    }
    rippleFrom(x, y, function () {
      applyLang(next);
      setTimeout(function () {
        document.body.classList.remove("is-switching");
        switching = false;
      }, 460);
    });
  }

  $$(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      setLang(LANG === "en" ? "zh" : "en", b);
    });
  });
  var langBtnM = $("#langBtnM");
  if (langBtnM) {
    langBtnM.addEventListener("click", function (e) {
      e.preventDefault();
      setLang(LANG === "en" ? "zh" : "en", menuBtn);
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  }

  /* ---------------- init ---------------- */
  applyStatic();
  updateLangBtn();
  renderFilters();
  renderGrid();
  paintContact();
  var initial = slugFromHash();
  if (initial) setTimeout(function () { openWork(initial, { silentHash: true }); }, 80);
})();
