/* 作品数据：文案与图片均由本人作品整理，未虚构奖项与数据 */
const CATS = [
  { id: "all", label: "全部作品" },
  { id: "smart", label: "智能产品" },
  { id: "culture", label: "文创设计" },
  { id: "space", label: "家具与空间" },
  { id: "visual", label: "视觉与交互" }
];

const WORKS = [
  {
    id: "w01",
    slug: "breathing-resonance",
    no: "01",
    title: "呼吸共鸣 · 疗愈单元",
    en: "BREATHING RESONANCE",
    cat: "smart",
    catLabel: "智能产品",
    year: "2025",
    role: "独立完成 · 智能产品设计课程",
    tools: "Rhino / KeyShot / Photoshop",
    award: "",
    tags: ["老年抑郁", "多感官疗愈", "模块化灯具"],
    summary:
      "一盏会呼吸的灯。为经历退休、丧偶与独居的老年人设计的多感官疗愈单元——用缓慢的光、自然声与硅胶触感，把难以说出口的情绪安放下来。",
    sections: [
      {
        h: "起点",
        p: "老年人抑郁症常常伴随退休、亲友离世与社会性退缩而来。调研中我反复看到同一种状态：电视终日开着，人却坐在旁边发呆——房间里有声音，但没有回应。"
      },
      {
        h: "概念",
        p: "我把「陪伴」拆成三种身体可以接收的信号：视觉上，暖光以呼吸般的节奏缓慢明暗；听觉上，引入中低频的自然声；触觉上，硅胶模块随呼吸轻微膨胀与收缩。使用者不需要学习操作，只需要靠近。"
      },
      {
        h: "形态",
        p: "半透明立方体模块可以堆叠、拆分：主灯、小夜灯与红绿氛围块，对应不同的情绪场景。圆角与软质表面降低「器械感」，让它更像一件可以抱住的家具。"
      },
      {
        h: "验证",
        p: "以「陈伯伯，75 岁，社会性退缩型」为用户原型，梳理从稳态期到情绪波动期的感知地图，校准光的变化速度与声音的介入时机。这是课程作业，仍在继续深化结构与交互细节。"
      }
    ],
    doc: { href: "assets/docs/breathing-resonance.pdf", label: "阅读 6 页作品册（PDF）" },
    cover: "assets/img/w01-cover.webp",
    gallery: [
      { src: "assets/img/w01-g1.webp", cap: "主体形态：六个软质模块围合出中心光源" },
      { src: "assets/img/w01-g2.webp", cap: "夜间场景：放在床边，光随呼吸缓慢起伏" },
      { src: "assets/img/w01-g3.webp", cap: "暖光模式：织物与木色被一起照亮" },
      { src: "assets/img/w01-g4.webp", cap: "白色版本：更像一件安静的家具" },
      { src: "assets/img/w01-g5.webp", cap: "模块堆叠：可以按心情重新组合" },
      { src: "assets/img/w01-g6.webp", cap: "绿色氛围块：用于平静与入睡前" },
      { src: "assets/img/w01-g7.webp", cap: "红色氛围块：用于需要一点温度的时刻" },
      { src: "assets/img/w01-g8.webp", cap: "光环与色块：早期形态实验" },
      { src: "assets/img/w01-g9.webp", cap: "早期概念渲染：灯体与底座的另一种可能" },
      { src: "assets/img/w01-g10.webp", cap: "课程展板：从调研到形态的完整推演" }
    ]
  },
  {
    id: "w02",
    slug: "qingmang",
    no: "02",
    title: "青芒 · 三星堆儿童文创",
    en: "QINGMANG / SANXINGDUI",
    cat: "culture",
    catLabel: "文创设计",
    year: "2026",
    role: "独立完成 · 毕业设计",
    tools: "Rhino / KeyShot / Illustrator / Photoshop",
    award: "东方设计奖 · 全国高校创新设计大赛 全国决赛 三等奖",
    tags: ["三星堆", "儿童美育", "硅胶灯具"],
    summary:
      "把三星堆青铜器上威严的纹饰，翻译成 8–12 岁孩子愿意伸手触摸的语言：三款硅胶灯，以及一整套可以带进课堂的文具。",
    sections: [
      {
        h: "为什么是孩子",
        p: "博物馆里的青铜面具常被讲解成「神秘」「威严」，孩子只能仰头看。我想做一次转译：保留青铜器的轮廓、纵目与云雷纹，把比例缩短、表情放松、材质变软。"
      },
      {
        h: "从纹饰到角色",
        p: "提取纵目、兽面、云雷纹与青铜绿，把三款灯做成有性格的角色：站立的、拄杖的、坐着的。纹饰不再是装饰，而是角色的「衣服」。"
      },
      {
        h: "一盏灯的手感",
        p: "灯罩为磨砂硅胶，透出柔和暖光；灯体保留青铜绿的哑光质感。孩子可以按压、旋转灯头切换亮度——触觉是比说明书更直接的交互。"
      },
      {
        h: "延展",
        p: "同一套纹样语言延伸到笔记本、直尺、日历、金属书签与帆布袋，让文化从展柜走进书包。作品获东方设计奖全国高校创新设计大赛全国决赛三等奖（作品编号 297429）。"
      }
    ],
    media: [
      {
        type: "video",
        src: "assets/video/qingmang.mp4",
        poster: "assets/video/qingmang-poster.webp",
        ratio: "16 / 9",
        caption: "灯具动画：线稿、点亮与角色动作 / 15 秒 / 无声"
      }
    ],
    cover: "assets/img/w02-cover.webp",
    gallery: [
      { src: "assets/img/w02-g1.webp", cap: "主题海报：三星堆灯具系列" },
      { src: "assets/img/w02-g2.webp", cap: "三款灯具：站立、拄杖、端坐" },
      { src: "assets/img/w02-g3.webp", cap: "夜间书桌：灯光只照亮眼前一小块" },
      { src: "assets/img/w02-g4.webp", cap: "日间场景：关灯时也是一件摆件" },
      { src: "assets/img/w02-g5.webp", cap: "文具与文创：同一套纹样语言" },
      { src: "assets/img/w02-g6.webp", cap: "纹样笔记本：封面即一面青铜器" },
      { src: "assets/img/w02-g7.webp", cap: "金属书签：纵目面具" },
      { src: "assets/img/w02-g8.webp", cap: "金属书签：青铜纹样" },
      { src: "assets/img/w02-g9.webp", cap: "纸盒与手提袋：把文化带回家" },
      { src: "assets/img/w02-g10.webp", cap: "参赛展板：设计推演与系列延展" }
    ]
  },
  {
    id: "w03",
    slug: "elderly-cat-house",
    no: "03",
    title: "老人猫舍",
    en: "A HOME FOR ELDERS & CATS",
    cat: "space",
    catLabel: "家具与空间",
    year: "2024",
    role: "独立完成 · 家具设计课程",
    tools: "Rhino / KeyShot",
    award: "",
    tags: ["适老设计", "人宠互动", "模块家具"],
    summary:
      "一套让老人和猫共同生活的客厅家具。猫窝藏进沙发，猫爬架长在储物柜上——陪伴不必额外占用一间房。",
    sections: [
      {
        h: "起点",
        p: "独居老人需要陪伴，但养猫常被「没地方放猫爬架」劝退。我想让家具同时服务于人和猫，让猫的存在自然地出现在日常起居里。"
      },
      {
        h: "策略",
        p: "把猫窝、猫抓板、跳跃平台拆散，藏进沙发、茶几与储物柜：座位下方是猫窝，柜体侧面是台阶，柜顶是晒太阳的位置。人坐下的高度，正好能看见猫。"
      },
      {
        h: "结构",
        p: "四个模块可单独使用，也可围合成一组：单椅 550×540×950、茶几 1600×800×560、沙发 3000×2000×1000、猫爬架 1500×900×1800（mm）。"
      },
      {
        h: "细节",
        p: "所有可接触边缘做圆角；软垫可拆洗；猫洞尺寸按成年家猫的肩宽预留。木色与米白让家具在老年住宅里不显突兀。"
      }
    ],
    cover: "assets/img/w03-cover.webp",
    gallery: [
      { src: "assets/img/w03-g1.webp", cap: "客厅组合：沙发、茶几、猫爬架与边几" },
      { src: "assets/img/w03-g2.webp", cap: "暖光场景：家具与猫共享同一块地毯" },
      { src: "assets/img/w03-g3.webp", cap: "猫爬架与储物柜：竖向利用墙面" },
      { src: "assets/img/w03-g4.webp", cap: "沙发与猫窝：座位下方留给猫" }
    ]
  },
  {
    id: "w04",
    slug: "xipu",
    no: "04",
    title: "戏谱 · 戏曲文化 App",
    en: "XIPU / CHINESE OPERA APP",
    cat: "visual",
    catLabel: "视觉与交互",
    year: "2024",
    role: "独立完成 · UI/UX 课程",
    tools: "Figma / 即时设计 / Photoshop",
    award: "",
    tags: ["非遗", "信息架构", "交互原型"],
    summary:
      "一款把戏曲「听懂」的 App。以中国红、金与云纹为视觉骨架，把剧目、票务、社区与唱段收进四个标签页。",
    sections: [
      {
        h: "文化转译",
        p: "戏曲的门槛不在画面，而在语言与节奏。界面不堆砌纹样，只保留三种元素：红色层级、金色点缀、云纹做分隔，让内容成为主角。"
      },
      {
        h: "信息架构",
        p: "四个主标签：首页（资讯与推荐）、听曲（剧目与唱段）、梨园（社区与动态）、我（收藏与票务）。把「看戏」「听戏」「聊戏」三种行为分开，减少第一次使用的迷失。"
      },
      {
        h: "视觉系统",
        p: "中国红 #A50305 作为主色，米白承托长文本，金色只用于强调。字体采用宋体做标题、黑体做正文，兼顾传统气质与可读性。"
      },
      {
        h: "原型",
        p: "用即时设计完成可点击原型，覆盖登录、首页、剧目详情、票务与社区。下方视频为原型录屏，保留了录屏工具的红点。"
      }
    ],
    media: [
      {
        type: "video",
        src: "assets/video/xipu.mp4",
        poster: "assets/video/xipu-poster.webp",
        ratio: "9 / 16",
        phone: true,
        caption: "可点击原型录屏：登录、个人主页与关注流 / 46 秒 / 无声"
      }
    ],
    cover: "assets/img/w04-cover.webp",
    gallery: [
      { src: "assets/img/w04-g1.webp", cap: "交互展板：从需求到信息架构" },
      { src: "assets/img/w04-g2.webp", cap: "界面系统：首页、听曲、梨园、我的" },
      { src: "assets/img/w04-g3.webp", cap: "手机界面细节" }
    ]
  },
  {
    id: "w05",
    slug: "rgb-clock",
    no: "05",
    title: "三色光 · 时钟",
    en: "RGB CLOCK",
    cat: "smart",
    catLabel: "智能产品",
    year: "2024",
    role: "独立完成 · 情感化设计课程",
    tools: "Rhino / KeyShot",
    award: "",
    tags: ["光", "时间", "情感化设计"],
    summary:
      "用红、绿、蓝三束光代替时针、分针与秒针。光色交叠出新的颜色，直到 12 点，三束光汇成白色。",
    sections: [
      {
        h: "概念",
        p: "数字时钟把时间变成跳动的数字，指针时钟把时间变成角度。我想试试第三种：时间是一种颜色。红、绿、蓝分别对应时、分、秒，三束光在表盘上叠加，混出当下的颜色。"
      },
      {
        h: "规则",
        p: "每一束光的长度对应数值，颜色对应单位。三者重叠的区域产生新色；当 12 点整，三束光完全重合，表盘回到白色——一天里唯一一次「归零」。"
      },
      {
        h: "形态",
        p: "圆形表盘嵌在黑色方体中，只留一圈发光边缘。白天它是一件安静的摆件，夜里才显出颜色。"
      }
    ],
    cover: "assets/img/w05-cover.webp",
    gallery: [
      { src: "assets/img/w05-g1.webp", cap: "12 点：三束光归白" },
      { src: "assets/img/w05-g2.webp", cap: "6 点：绿与蓝交叠" },
      { src: "assets/img/w05-g3.webp", cap: "3 点：红与绿相接" },
      { src: "assets/img/w05-g4.webp", cap: "课程展板：规则与形态" }
    ]
  },
  {
    id: "w06",
    slug: "ocean-elimination",
    no: "06",
    title: "消除 · 海洋公益海报",
    en: "ELIMINATE",
    cat: "visual",
    catLabel: "视觉与交互",
    year: "2023",
    role: "独立完成",
    tools: "Illustrator / Photoshop",
    award: "第 12 届全国海洋文化创意设计大赛 佳作奖",
    tags: ["公益海报", "信息设计", "海洋保护"],
    summary:
      "一张「消消乐」式的海洋公益海报。每一格被消掉的，是渔网、塑料瓶和珊瑚——游戏结束，海也结束了。",
    sections: [
      {
        h: "洞察",
        p: "消消乐的逻辑是「消除得越多，得分越高」。把海洋垃圾放进去，这个逻辑立刻变得残酷：我们消掉的不是方块，是鱼、珊瑚与海水。"
      },
      {
        h: "机制",
        p: "画面由 8×8 的方格构成，每一格是一个海洋符号：塑料瓶、鱼骨、珊瑚、渔网。右侧用游戏界面式的数据呈现真实数字：关卡 2023、消逝 1500W、垃圾 640 万吨、核污水 1.5 万吨。"
      },
      {
        h: "结果",
        p: "作品获第 12 届全国海洋文化创意设计大赛佳作奖。海报不提供解决方案，只让观看者在熟悉的游戏界面里停顿一秒。"
      }
    ],
    cover: "assets/img/w06-cover.webp",
    gallery: [
      { src: "assets/img/w06-g1.webp", cap: "海报：消消乐式的海洋" },
      { src: "assets/img/w06-g2.webp", cap: "获奖证书：第 12 届全国海洋文化创意设计大赛 佳作奖" }
    ]
  },
  {
    id: "w07",
    slug: "santiaozan",
    no: "07",
    title: "三条簪 · 福州非遗文创",
    en: "SAN TIAO ZAN",
    cat: "culture",
    catLabel: "文创设计",
    year: "2024",
    role: "独立完成 · 民间工艺课程",
    tools: "Illustrator / Photoshop / Rhino",
    award: "",
    tags: ["福州非遗", "银质书签", "包装"],
    summary:
      "福州女性的三条簪，曾象征「为国、为家、为己」。把这份锋利的温柔做成银质书签与纸盒包装。",
    sections: [
      {
        h: "文化",
        p: "三条簪是旧时福州女性插在发髻上的三支银簪，形似刀剑。一簪为国，一簪为家，一簪为己——它既是装饰，也是一种身份宣言。"
      },
      {
        h: "符号",
        p: "把簪的轮廓压平成纹样：三条直线、一个交叉、一圈缠枝。纹样足够简单，才能落在书签这样的小面积上仍然可读。"
      },
      {
        h: "产品",
        p: "书签用银质材料与镂空工艺，保留簪的锋利感；包装用环保纸盒，正面印女性背影，侧面是三条簪的剪影。色彩取自传统：#FDECD5、#B78F5A、#321D17、#A50305。"
      }
    ],
    cover: "assets/img/w07-cover.webp",
    gallery: [
      { src: "assets/img/w07-g1.webp", cap: "展板：三条簪的象征与再设计" },
      { src: "assets/img/w07-g2.webp", cap: "银质书签：纹样与流苏" },
      { src: "assets/img/w07-g3.webp", cap: "纸盒包装：正面是背影，侧面是簪影" }
    ]
  },
  {
    id: "w08",
    slug: "film-studio",
    no: "08",
    title: "影视工作室 · 室内设计",
    en: "FILM WORKSHOP",
    cat: "space",
    catLabel: "家具与空间",
    year: "2023",
    role: "独立完成 · 室内设计原理课程",
    tools: "3ds Max / V-Ray / AutoCAD",
    award: "",
    tags: ["室内设计", "动线", "造价控制"],
    summary:
      "一个影视工作室：从店面、接待、办公到剪辑与拍摄，把动线、造价与绿色材料放在同一张平面上推敲。",
    sections: [
      {
        h: "任务",
        p: "影视工作室规模可大可小，但需要把策划、拍摄、后期与发行放在同一条动线上。课程要求同时考虑成本造价、功能性与绿色环保。"
      },
      {
        h: "动线",
        p: "入口—接待—办公—剪辑—拍摄，客人止于接待区，工作人员从侧廊进入工作区。平面、立面与尺寸图同步推敲，避免效果图与落地脱节。"
      },
      {
        h: "材料",
        p: "木饰面、微水泥与线性灯构成主要界面。木色负责温度，微水泥负责耐脏，线性灯把视线引向走廊深处。"
      }
    ],
    cover: "assets/img/w08-cover.webp",
    gallery: [
      { src: "assets/img/w08-g1.webp", cap: "课程展板：店面、入口、接待与办公" },
      { src: "assets/img/w08-g2.webp", cap: "室内效果：木色、线性灯与低饱和家具" }
    ]
  },
  {
    id: "w09",
    slug: "residence",
    no: "09",
    title: "居室空间 · 三代同堂",
    en: "FAMILY RESIDENCE",
    cat: "space",
    catLabel: "家具与空间",
    year: "2024",
    role: "独立完成 · 居室空间设计课程",
    tools: "3ds Max / V-Ray / AutoCAD",
    award: "",
    tags: ["住宅", "适老", "平面优化"],
    summary:
      "为三代同堂的六口之家做的四室两厅。打通阳台、客厅与餐厅，让光线和视线在一条轴线上流动。",
    sections: [
      {
        h: "家庭",
        p: "六口人、三代同住：老人需要安静的卧室与少台阶的动线，孩子需要写作业与玩耍的地方，父母需要能同时照看两代人。"
      },
      {
        h: "改造",
        p: "拆掉阳台与客厅之间的推拉门，把阳台纳入客厅；餐厅与客厅打通，形成一条从窗到走廊的完整轴线。浅色调放大采光，局部木色压住空间。"
      },
      {
        h: "图纸",
        p: "平面按 1:100 出图，标出家具尺度与通行宽度；客厅、卧室分别出效果图，核对材质与灯光。"
      }
    ],
    cover: "assets/img/w09-cover.webp",
    gallery: [
      { src: "assets/img/w09-g1.webp", cap: "课程展板：四室两厅与 1:100 平面" },
      { src: "assets/img/w09-g2.webp", cap: "客厅效果：打通后的阳台与餐客厅" }
    ]
  },
  {
    id: "w10",
    slug: "console-table",
    no: "10",
    title: "玄关条案",
    en: "CONSOLE TABLE",
    cat: "space",
    catLabel: "家具与空间",
    year: "2023",
    role: "独立完成 · 家具设计课程",
    tools: "Rhino / KeyShot",
    award: "",
    tags: ["新中式", "玄关", "胡桃木"],
    summary:
      "新中式玄关条案。圆形镂空借景，竖向格栅藏起杂物，胡桃木的深色让进门的第一步安静下来。",
    sections: [
      {
        h: "概念",
        p: "玄关是家的第一口气。条案不追求体量，而是做「留白」：中间一轮圆月般的镂空，让背后的墙与光透过来。"
      },
      {
        h: "细节",
        p: "两侧格栅门藏鞋与杂物，格栅间距按通风与遮挡的平衡确定；圆洞边缘做内凹倒角，手指摸过去没有棱。"
      },
      {
        h: "比例",
        p: "整体高度控制在视线以下，台面放一壶、一松、一对小狮子，刚好构成一幅横向的静物。"
      }
    ],
    cover: "assets/img/w10-cover.webp",
    gallery: [
      { src: "assets/img/w10-g1.webp", cap: "玄关条案：圆形镂空与竖向格栅" }
    ]
  },
  {
    id: "w11",
    slug: "sketching",
    no: "11",
    title: "产品手绘 · 电热水壶",
    en: "PRODUCT SKETCHING",
    cat: "visual",
    catLabel: "视觉与交互",
    year: "2023",
    role: "独立完成 · 产品表现技法课程",
    tools: "马克笔 / 彩铅 / 针管笔",
    award: "",
    tags: ["手绘", "结构表达", "马克笔"],
    summary:
      "电热水壶的马克笔表现。用曲线解释安全，用分解图解释结构，让一张草图同时承担造型与工程说明。",
    sections: [
      {
        h: "表达",
        p: "壶身用连续曲面，减少磕碰与划伤；把手与壶身留出隔热间隙。马克笔的宽笔触负责体块，针管笔负责转折。"
      },
      {
        h: "结构",
        p: "分解图把壶盖、滤网、底座与电源接口拆开，标注分离式结构与多材质组合，让观者一眼看懂怎么清洗、怎么放回。"
      }
    ],
    cover: "assets/img/w11-cover.webp",
    gallery: [
      { src: "assets/img/w11-g1.webp", cap: "马克笔表现：造型与结构说明" },
      { src: "assets/img/w11-g2.webp", cap: "单张效果：曲面与分离式底座" }
    ]
  },
  {
    id: "w12",
    slug: "light-and-objects",
    no: "12",
    title: "光与物 · 摄影练习",
    en: "LIGHT & OBJECTS",
    cat: "visual",
    catLabel: "视觉与交互",
    year: "2023–2024",
    role: "独立完成",
    tools: "相机 / 自然光 / 影棚灯",
    award: "",
    tags: ["摄影", "光线", "材质"],
    summary:
      "一组关于光的练习：柑橘的逆光、起雾玻璃上的柠檬、影棚里的柔光箱、砾石上的浅景深。",
    sections: [
      {
        h: "观察",
        p: "做产品设计之后，看东西的方式变了：先看光从哪来，再看材质怎么回应。这组照片是一次单纯的练习，也是素材库。"
      },
      {
        h: "光线",
        p: "逆光让柑橘的果肉变成半透明的琥珀；侧光让柔光箱的金属边缘出现一条细高光；散射光让起雾的玻璃只剩轮廓。"
      }
    ],
    cover: "assets/img/w12-cover.webp",
    gallery: [
      { src: "assets/img/w12-g1.webp", cap: "柑橘：逆光下的果肉" },
      { src: "assets/img/w12-g2.webp", cap: "起雾玻璃上的柠檬" },
      { src: "assets/img/w12-g3.webp", cap: "影棚柔光箱" },
      { src: "assets/img/w12-g4.webp", cap: "砾石：浅景深练习" }
    ]
  }
];

const PROFILE = {
  name: "于佳林",
  en: "YU JIALIN",
  school: "福建农林大学",
  major: "产品设计",
  classOf: "2026 届",
  gpa: "3.5 / 4",
  city: "河北石家庄",
  // 联系方式只保留邮箱（网页打码显示）；手机号已按要求从站点与 PDF 中移除。
  // 生成带真实邮箱的 PDF 时，用 assets/js/contact.local.js 覆盖（该文件不部署）。
  email: "ciyu****@163.com"
};
