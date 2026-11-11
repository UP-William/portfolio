/* 交互：筛选、详情层、深链、灯箱、键盘 */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    var hay = [w.title, w.en, w.catLabel, w.year, w.summary, w.award, w.tags.join(" "), w.sections.map(function (s) { return s.h + s.p; }).join(" ")]
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
      return '<button type="button" role="tab" data-cat="' + c.id + '" aria-selected="' + (state.cat === c.id) + '">' + esc(c.label) + "</button>";
    }).join("");
  }

  function cardHTML(w) {
    return '<a class="card" href="#work/' + w.slug + '" data-id="' + w.id + '">' +
      '<div class="card-media">' +
        '<img src="' + w.cover + '" alt="' + esc(w.title) + '" width="1400" height="1050" loading="lazy" decoding="async">' +
        '<span class="card-veil"></span>' +
        '<span class="card-num">' + esc(w.no) + "</span>" +
        (w.award ? '<span class="card-award">获奖</span>' : "") +
        '<span class="card-open">查看项目 <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"></path></svg></span>' +
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
    resultCount.textContent = list.length + " 件";
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
    var list = filtered().slice(0, 4);
    var total = filtered().length;
    searchResults.hidden = false;
    searchResults.innerHTML =
      (list.length ? list.map(function (w) {
        return '<a class="sr-item" href="#work/' + w.slug + '">' +
          '<img src="' + w.cover + '" alt="" width="120" height="90" loading="lazy">' +
          '<span class="sr-text"><b>' + esc(w.title) + "</b><em>" + esc(w.catLabel) + " · " + esc(w.year) + "</em></span>" +
          '<span class="sr-arrow">→</span></a>';
      }).join("") : '<p class="sr-empty">没有匹配的作品</p>') +
      '<a class="sr-all" href="#works">' + (total ? "查看全部 " + total + " 件结果" : "浏览全部作品") + " ↓</a>";
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
    state.q = b.dataset.q;
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
    var w = WORKS[idx];
    state.current = w;
    if (!opts.keepFocus) state.lastFocus = document.activeElement;

    $("#wvCover").src = w.cover;
    $("#wvCover").alt = w.title + " 主视觉";
    $("#wvKicker").textContent = w.catLabel + "  ·  " + w.year + (w.award ? "  ·  获奖作品" : "");
    $("#wvTitle").textContent = w.title;
    $("#wvEn").textContent = w.en;
    $("#wvNo").textContent = w.no;
    $("#wvSummary").textContent = w.summary;
    wvScroll.scrollTop = 0;

    var meta = "<dl>" + metaCell("年份", w.year) + metaCell("类别", w.catLabel) + metaCell("角色", w.role) + metaCell("工具", w.tools) + "</dl>";
    if (w.award) meta += '<div class="wv-award"><b>AWARD</b>' + esc(w.award) + "</div>";
    meta += '<div class="wv-tags">' + w.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>";
    if (w.doc) meta += '<a class="wv-doc" href="' + w.doc.href + '" target="_blank" rel="noopener">' + esc(w.doc.label) + " ↗</a>";
    $("#wvMeta").innerHTML = meta;

    $("#wvSections").innerHTML = w.sections.map(function (s, i) {
      return '<section class="wv-sec"><span class="idx">' + String(i + 1).padStart(2, "0") + "</span><div><h3>" + esc(s.h) + "</h3><p>" + esc(s.p) + "</p></div></section>";
    }).join("");

    $("#wvMedia").innerHTML = (w.media || []).map(mediaHTML).join("");

    $("#wvGallery").innerHTML = w.gallery.map(function (g, i) {
      return '<figure data-i="' + i + '" tabindex="0" role="button" aria-label="放大：' + esc(g.cap) + '">' +
        '<img src="' + g.src + '" alt="' + esc(g.cap) + '" loading="lazy" decoding="async">' +
        "<figcaption>" + esc(g.cap) + "</figcaption></figure>";
    }).join("");

    var prev = WORKS[(idx - 1 + WORKS.length) % WORKS.length];
    var next = WORKS[(idx + 1) % WORKS.length];
    $("#wvPrev").href = "#work/" + prev.slug;
    $("#wvPrev").querySelector("strong").textContent = prev.title;
    $("#wvNext").href = "#work/" + next.slug;
    $("#wvNext").querySelector("strong").textContent = next.title;
    $("#wvEnd").innerHTML = "<span>作品 " + w.no + " / " + WORKS.length + "</span><span>图片与文字版权归于佳林</span>";

    wv.classList.add("open");
    wv.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    if (!opts.silentHash) setHash("#work/" + w.slug, "push");
    setTimeout(function () { wv.focus({ preventScroll: true }); }, 60);
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
  (function initContact() {
    var EMAIL = atob("Y2l5dWppYWxpbkAxNjMuY29t");
    var btn = document.getElementById("revealContact");
    if (!btn) return;
    var subject = encodeURIComponent("作品集咨询 · 于佳林");
    btn.addEventListener("click", function () {
      var mail = document.getElementById("contactMail");
      if (mail) mail.outerHTML = '<a class="mail" id="contactMail" href="mailto:' + EMAIL + '?subject=' + subject + '">' + EMAIL + '</a>';
      btn.outerHTML = '<a class="btn btn-solid" href="mailto:' + EMAIL + '?subject=' + subject + '">写邮件</a>'
        + '<button class="btn btn-line" type="button" id="copyMail">复制邮箱</button>';
      var copy = document.getElementById("copyMail");
      if (copy) copy.addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(EMAIL).then(function () { copy.textContent = "已复制"; }, function () { copy.textContent = EMAIL; });
        } else { copy.textContent = EMAIL; }
      });
    });
  })();

  /* ---------------- init ---------------- */
  renderFilters();
  renderGrid();
  var initial = slugFromHash();
  if (initial) setTimeout(function () { openWork(initial, { silentHash: true }); }, 80);
})();
