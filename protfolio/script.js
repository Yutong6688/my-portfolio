/**
 * 个人网站骨架交互：
 * 1) 顶部导航高亮（随滚动/点击）
 * 2) 项目/实践详情弹窗占位（可后续替换内容）
 * 3) 联系方式一键复制
 */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ============ 顶部导航：滚动高亮 ============
const navLinks = $$(".nav-item[data-nav]");
const sections = $$("[data-section]");

function setActiveNav(id) {
  navLinks.forEach((a) => {
    a.classList.toggle("is-active", a.dataset.nav === id);
  });
}

// IntersectionObserver：更稳、更省性能
const io = new IntersectionObserver(
  (entries) => {
    // 选择可见比例最大的那个 section 作为 active
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.dataset?.section) {
      setActiveNav(visible.target.dataset.section);
    }
  },
  {
    root: null,
    // 让“接近屏幕中部”时切换高亮，体验更像 tab
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0.01, 0.1, 0.25, 0.5, 0.75, 1],
  }
);
sections.forEach((s) => io.observe(s));

// 点击导航：立即高亮（滚动后 observer 会再校准）
navLinks.forEach((a) => {
  a.addEventListener("click", () => setActiveNav(a.dataset.nav));
});

// ============ 详情弹窗 ============
const modal = $("#detail-modal");
const modalTitle = $("#modal-title");
const modalContent = $("#modal-content");
const closeBtn = $("[data-modal-close]");

function openModal(payload) {
  // dialog 兼容性：现代浏览器支持；如果不支持则退化为 alert
  if (!(modal instanceof HTMLDialogElement) || typeof modal.showModal !== "function") {
    window.alert(`${payload.title}\n\n${payload.summary}`);
    return;
  }
  modalTitle.textContent = payload.title;
  modalContent.innerHTML = payload.html;
  modal.showModal();
}

function closeModal() {
  if (modal instanceof HTMLDialogElement && modal.open) modal.close();
}

closeBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  // 点击遮罩关闭
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// 占位数据：后续你给我内容，我把这里替换成真实数据即可
const DETAIL_MAP = {
  "intern-qdzl": {
    title: "秦都众联培训学校｜产品运营实习",
    summary: "2024.01-06",
    html: `
      <p class="muted">时间：2024.01-06</p>
      <div class="modal-section">
        <div class="modal-section-title">项目背景与目标</div>
        <p class="muted">
          校企实训项目主营娃哈哈饮品、君乐宝酸奶、配饰戒指多品类线上销售，原有商品关键词杂乱、
          详情排版无序，推广短视频同质化严重，初始商品自然进店转化率仅 3%。项目目标围绕实体单品做
          产品精细化运营，通过商品优化 + 自研内容投放，提升单品自然流量与成交转化。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">核心行动</div>
        <ul class="bullet">
          <li>
            产品页面优化：深挖平台用户搜索词，对标同行竞品，优化全品类标题、封面顺序、详情信息架构，
            梳理产品卖点展示逻辑。
          </li>
          <li>
            内容全链路落地：围绕产品特点独立完成短视频脚本、出镜实拍、后期剪辑，拆分日常种草、硬核测评
            两种内容形式开展 A/B 测试，借助 Excel 统计曝光、点击、进店转化数据。
          </li>
          <li>
            数据复盘梳理：汇总全渠道运营数据，对比不同内容投产效果，提炼优质内容创作规律，梳理整套运营规范。
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">产出与价值</div>
        <ul class="bullet">
          <li>商品自然进店转化率从 3% 提升至 5.2%</li>
          <li>种草类内容转化效率高出硬广 40%</li>
          <li>输出项目复盘报告，落地商品上架、内容制作全流程 SOP，顺利通过企业结业考核</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">个人能力沉淀</div>
        <p class="muted">
          熟练掌握快消、饰品类目电商精细化运营全流程，擅长通过页面优化、内容 A/B 测试撬动自然流量转化。具备数据复盘与 SOP 沉淀能力，形成以数据为导向的轻量化增长运营思维。
        </p>
      </div>
    `,
  },
  "project-metafit": {
    title: "MetaFit｜AI 驱动 WebXR 虚拟导购（项目负责人）",
    summary:
      "主导用户 & 竞品调研，梳理购物痛点，敲定 MVP 落地顺序，独立输出 PRD；统筹 4 人小组，对接三方 API 完成系统集成落地；搭建数据埋点，依据可用性测试推动 3 轮产品迭代。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">项目背景与目标</div>
        <p class="muted">
          传统线上服饰购物存在文字搜索表意受限、无法实景试穿、商品推荐同质化三大痛点，用户选购决策成本高、
          成交转化率偏低。项目依托 AI 大模型与 WebXR 3D 渲染技术搭建轻量化虚拟试衣选购平台，落地 MVP 版本，
          优化搜索与试穿体验，提升服饰推荐转化效率。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">核心行动</div>
        <ul class="bullet">
          <li>
            <strong>需求拆解与方案落地：</strong>开展用户调研 + 竞品对标，锁定搜索困难、缺少试穿体验、个性化推荐不足核心痛点，
            敲定 MVP 落地优先级：自然语言智能推荐→3D 虚拟试衣→商品三维可视化；选用 RAG 结合 BM25、FAISS 混合检索实现用户意图解析，
            基于 WebXR+Three.js 搭建轻量化 3D 渲染方案，输出完整 PRD 与项目验收规范。
          </li>
          <li>
            <strong>跨团队项目协同：</strong>对接 4 人开发小组，统筹 LLM 意图识别、Gemini 试衣 API、Tripo3D 图生 3D 接口对接与联调工作，
            常态化组织需求评审、项目例会，统一多方技术规范与开发节奏，保障项目按期上线。
          </li>
          <li>
            <strong>数据与版本迭代：</strong>敲定推荐点击率、试衣转化、资源加载耗时等关键监测指标，配合完成前端埋点设计；组织 15 人用户可用性测试，
            根据加载卡顿、设备兼容问题落地 3 轮迭代优化，完成产品从上线到调优全流程闭环。
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">产出与价值</div>
        <p class="muted">
          完成 AI 语义检索 + 3D 虚拟试衣一体化产品 MVP 落地，通过多轮用户优化改善模型加载延迟与多终端适配问题，完善产品核心使用链路，
          落地可商用的轻量化线上试衣解决方案。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">个人能力沉淀</div>
        <p class="muted">
          掌握 AI 三维交互产品从需求定义、技术选型到跨团队落地的完整流程。擅长通过用户测试与指标体系搭建驱动产品迭代，具备创新型智能产品从 0 到 1 落地能力。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/metafit-1.png" alt="系统界面截图" loading="lazy" />
          <img class="img-real" src="./assets/metafit-2.png" alt="项目流程展示" loading="lazy" />
        </div>
      </div>
    `,
  },
  "project-nanospace": {
    title: "Nano-Space｜WebVR 沉浸式减压系统（核心成员）",
    summary:
      "针对设备卡顿痛点自研动态图片压缩方案，完成全景资源优化；牵头用户测试，落地 80% 有效率的 VR 减压产品，输出公益落地方案。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、项目背景与目标</div>
        <p class="muted">
          香港劏房居住环境狭小密闭，用户普遍存在空间压抑、精神焦虑、空间剥夺等心理困扰，市面轻量化线上减压 VR 产品稀缺。项目依托 WebVR 技术打造免下载、浏览器直达的全景沉浸式减压产品，通过环境场景与白噪音干预缓解心理压抑，落地可面向公益推广的轻量化减压方案。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、核心行动</div>
        <ul class="bullet">
          <li>
            <strong>需求梳理与产品定义：</strong>深挖劏房住户空间压抑痛点，基于 A-Frame+Web Audio API 搭建 360° 全景场景 + 环境白噪音的产品核心架构；规划环境自定义「舒适栏」、空间锚点过渡两大核心功能，规避虚实切换带来的 VR 眩晕问题，输出完整用户画像与落地使用场景文档。
          </li>
          <li>
            <strong>落地开发与性能优化：</strong>跟进 4K HDR 全景素材适配与全机型兼容性测试，瞄准低配老旧设备加载卡顿难题，自研落地动态图片压缩优化方案，降低硬件配置门槛，提升手机、低配设备全端适配率。
          </li>
          <li>
            <strong>用户测试与迭代落地：</strong>组织 15 人定向用户实测，整理问卷与访谈调研数据；根据用户反馈输出完整复盘报告，制定移动端优先迭代方案，同步规划公益机构、本地社群的落地推广渠道。
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、产出与价值</div>
        <p class="muted">
          产品实测心理减压有效率 80%，通过图片压缩优化解决低配设备卡顿难题，实现浏览器免安装即用，产品方案可对接公益项目落地投放。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">四、个人能力沉淀</div>
        <p class="muted">
          擅长轻量化 Web 产品的痛点挖掘、功能设计与多端性能适配优化。具备小样本用户测试、数据验证与渠道落地能力，能够低成本完成普惠型产品闭环迭代。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/nano-1.png" alt="Nano-Space场景截图" loading="lazy" />
          <img class="img-real" src="./assets/nano-2.png" alt="Nano-Space交互流程" loading="lazy" />
        </div>
      </div>
    `,
  },
  "project-echoes": {
    title: "ECHOES｜VR 历史文化探索游戏（产品负责人）",
    summary:
      "定义世界观与谜题规则，制定防眩晕交互规范；优化渲染方案解决掉帧，沉淀复用型 VR 体验设计标准。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、项目背景与目标</div>
        <p class="muted">
          传统 VR 交互产品普遍存在画面掉帧、长时间佩戴眩晕、交互逻辑生硬等问题，用户沉浸式游玩体验差。本项目打造历史题材解谜探索 VR 游戏，通过优化交互逻辑、渲染方案解决卡顿与眩晕痛点，落地标准化 VR 体验设计规范。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、核心行动</div>
        <ul class="bullet">
          <li>
            <strong>需求梳理与方案定义：</strong>主导搭建「1+N」整体世界观架构，完成 9 组解谜关卡的功能与玩法定义，输出完整游戏规则文档；依托 Unity+SteamVR 敲定产品交互规范，协同研发敲定 FOV 动态窄化的防眩晕技术落地路径。
          </li>
          <li>
            <strong>跨团队统筹与性能优化：</strong>对接 8 人跨职能小组（程序/美术/测试），拆分项目周期并制定分阶段验收标准；落地模型面数管控、闲置碰撞体清除、场景分块异步加载三类渲染优化方案，针对性改善场景掉帧故障。
          </li>
          <li>
            <strong>用户反馈闭环迭代：</strong>结合多轮内测反馈，协同研发将原生平滑移动替换为 Teleport 瞬移模式，搭配动态视野收缩算法优化体感；经过多轮调试，大幅降低 VR 晕动症发生率，沉淀通用设计准则。
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、产出与价值</div>
        <p class="muted">
          彻底解决产品原生渲染掉帧问题，优化后玩家佩戴舒适度大幅提升；落地整套可复用的 VR 防眩晕交互与性能优化规范，完整落地历史向 VR 解谜产品。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">四、个人能力沉淀</div>
        <p class="muted">
          熟悉 VR 沉浸式产品关卡策划、交互设计与性能优化全链路，精通 VR 舒适度体验迭代逻辑。能够结合设备特性解决眩晕、掉帧等核心体验问题，具备沉浸式产品的体验把控与规范沉淀能力。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/echoes-1.png" alt="ECHOES游戏截图" loading="lazy" />
          <img class="img-real" src="./assets/echoes-2.png" alt="ECHOES交互流程" loading="lazy" />
        </div>
      </div>
    `,
  },
  "project-solar": {
    title: "国家级大创｜太阳能光催化装置（项目负责人）",
    summary:
      "全权统筹 14 个月项目全周期，作为第一发明人申报 2 项实用新型专利，项目获评国家级优秀结项。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、项目背景与目标</div>
        <p class="muted">
          传统污水处理工艺能耗高、运维成本大，依托太阳能光催化技术的小型污水处理设备落地案例较少。本项目聚焦污水净化场景，研发太阳能驱动光催化污水处理装置，在约束生产成本与设备性能的前提下完成样机研发，冲刺国家级大创优秀评级。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、核心行动</div>
        <ul class="bullet">
          <li>
            <strong>项目统筹与需求管控：</strong>担任项目第一负责人，编制囊括设备功能参数、污水处理性能指标、制造成本约束的完整项目 PRD，制定 14 个月全周期里程碑规划；定期组织项目周会、阶段性复盘，闭环管控项目全周期进度与研发风险。
          </li>
          <li>
            <strong>多方协同与技术攻坚：</strong>对接校内指导老师与实验室资源，统筹催化原料制备、污水处理装置结构设计、污水试样性能测试多环节协同对接；针对污水环境下光催化剂负载稳定性难题专项攻关，突破核心技术卡点，保障污水处理样机研发进度。
          </li>
          <li>
            <strong>成果落地与结项推进：</strong>以第一发明人撰写专利技术交底书，完成 2 项针对污水净化催化结构的实用新型专利申报并成功受理；统筹汇总实验数据、结题材料、答辩筹备全流程工作。
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、产出与价值</div>
        <p class="muted">
          顺利落地太阳能光催化污水处理装置实体模型，2 项实用新型专利获官方受理，项目最终获评国家级大创优秀结项，研发方案可为小型分散式污水处理设备提供落地参考。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">四、个人能力沉淀</div>
        <p class="muted">
          具备硬件科研项目全周期统筹、跨模块协同与技术攻坚能力。熟练掌握专利成果转化、项目风险管控与高阶结项流程，拥有严谨的研发落地与项目管理思维。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/solar-1.png" alt="太阳能光催化装置" loading="lazy" />
          <img class="img-real" src="./assets/solar-2.png" alt="专利/结项证明" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-sx乡": {
    title: "三下乡社会实践｜副队长",
    summary:
      "牵头走访调研，收集百余份问卷，提炼行业痛点，撰稿 6 篇稿件登省 / 国家级平台，项目获校级二等奖。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、背景与任务</div>
        <p class="muted">
          聚焦县域特殊儿童帮扶现状，针对乡镇自闭症儿童家庭认知薄弱、康复资源匮乏的现实问题，参与专项暑期社会实践调研。以实地走访、问卷普查、机构访谈为核心形式，全面摸排当地特殊儿童帮扶真实痛点与现存缺口。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、行动与落地</div>
        <ul class="bullet">
          <li>
            落地多维度调研工作，累计完成 5 户家庭深度家访、3 家当地康复机构专项访谈，回收并整理有效问卷 100 余份。
          </li>
          <li>
            通过数据汇总与内容梳理，精准提炼核心问题：超 70% 受访者存在自闭症认知不足、县域专业康复资源短缺等典型痛点，形成完整调研素材体系。
          </li>
          <li>
            同步负责内容采编，累计产出 6 篇调研报告及宣传通讯稿。
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、成果与收获</div>
        <p class="muted">
          多篇稿件成功发表于国家级、省级宣传平台，有效扩大乡村特殊儿童帮扶议题影响力。本次实践成果获评校级社会实践二等奖，同时沉淀了完整的田野调研、用户痛点提炼、数据汇总与内容输出能力，具备社会调研类项目的落地与复盘思维。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/sx-1.png" alt="活动照片" loading="lazy" />
          <img class="img-real" src="./assets/sx-2.png" alt="调研/走访" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-flag": {
    title: "西安工程大学校国旗护卫队｜宣传委员/队员",
    summary:
      "统筹百余场落地活动，全权负责新媒体账号运营，产出百余篇推文，实现 5w + 人次曝光。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、背景与任务</div>
        <p class="muted">
          任职校国旗护卫队队员兼宣传委员，兼顾仪仗执勤、爱国主义活动统筹与全平台宣传运营。依托仪仗活动搭建校内外交流渠道，以多平台内容运营塑造队伍形象，弘扬校园爱国主义文化。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、落地执行</div>
        <ul class="bullet">
          <li>常态化参与仪仗集训，落地各类升降旗、爱国教育活动 100 余场，覆盖师生 5 万+ 人次。</li>
          <li>统筹微信公众号、微博、QQ空间三方内容运营，独立完成选题、撰稿、排版，累计发文 100+ 篇，自制宣传短片 3 支。</li>
          <li>对接联络近 10 所兄弟院校国旗护卫队，邀约参与队内换届典礼、经验交流会，统筹跨校会务对接与现场宣传。</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、成果与收获</div>
        <p class="muted">
          推文单篇最高阅读 2000+，宣传片总播放 3000+，有效扩大队伍校内知名度与校外圈层影响力。锻炼大型活动统筹、跨校外联洽谈、多渠道新媒体矩阵运营能力，提升统筹协调与内容策划综合素养。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/flag-1.jpg" alt="活动现场" loading="lazy" />
          <img class="img-real" src="./assets/flag-2.jpg" alt="推文截图" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-beijing": {
    title: "三下乡社会实践｜核心成员",
    summary:
      "围绕红色历史文化开展实地走访调研，统筹方案规划与落地执行，在多处国家级红色场馆完成人物访谈、素材采集与文稿编撰工作。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、背景与任务</div>
        <p class="muted">
          依托红色党史研学主题开展暑期社会实践，项目以实地场馆调研、人物专访为核心形式。本人作为核心成员，全权参与整体实践方案构思、行程规划，统筹拆分各组落地任务，保障整趟北京调研有序落地。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、落地执行</div>
        <ul class="bullet">
          <li>按既定计划带队前往国家博物馆、天安门广场、中国人民抗日战争纪念馆三处地标点位，对接联络受访人员，累计完成 10 余人次实地访谈与现场调研。</li>
          <li>同步收集一线素材，负责实践全程通讯稿件撰写工作。</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、成果与收获</div>
        <p class="muted">
          顺利完成全部调研走访与文稿输出任务，完整归集一手调研资料。锻炼项目方案策划、异地行程统筹、实地采访与公文写作能力，加深红色文化调研落地与团队分工管控的实操经验。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/beijing-1.jpg" alt="活动照片" loading="lazy" />
          <img class="img-real" src="./assets/beijing-2.jpg" alt="馆点记录" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-tuangzhi": {
    title: "西安工程大学理学院团总支｜宣传部干事",
    summary:
      "负责院系新媒体矩阵运营、校园文体及思政活动宣传、视觉物料制作与宣发效果跟进。通过多平台内容输出与线下宣传配合，持续扩大学院各类活动的校园曝光度与师生影响力。",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">一、背景与任务</div>
        <p class="muted">
          立足院系团学宣传工作，承接学院日常思政教育、文体活动、学风建设等各类活动的全媒体宣发任务。依托 QQ 空间、官方微博等新媒体阵地，搭建院系宣传窗口，保障活动信息高效、精准触达全院师生。
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">二、落地执行</div>
        <ul class="bullet">
          <li>全权负责院系双新媒体平台日常运营、文案编辑与内容推送，累计完成各类活动通知、新闻动态、主题宣传内容 50 余条。</li>
          <li>主动参与活动宣传海报的设计制作，统筹线上内容宣发、线下物料落地的全流程配合，实时跟进宣传曝光与传播效果，动态优化宣传节奏。</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">三、成果与收获</div>
        <p class="muted">
          持续稳定输出高质量宣传内容，有效提升院系各类活动的参与度与校园知名度，夯实院系宣传阵地建设。熟练掌握新媒体内容策划、图文排版、视觉物料制作与宣传效果复盘能力，积累了系统化、多渠道的宣传运营实战经验。
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="./assets/tuangzhi-1.jpg" alt="宣传物料" loading="lazy" />
          <img class="img-real" src="./assets/tuangzhi-2.jpg" alt="活动现场" loading="lazy" />
        </div>
      </div>
    `,
  },
};

$$("[data-modal-open]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-modal-open");
    const payload = DETAIL_MAP[key] ?? {
      title: "详情（占位）",
      summary: "暂无详情。",
      html: `<p class="muted">暂无详情。</p>`,
    };
    openModal(payload);
  });
});

// ============ 复制到剪贴板 ============
const toast = $("#copy-toast");
let toastTimer = null;

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 兼容性降级：选区复制
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.textContent = "";
  }, 1800);
}

$$("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const targetSel = btn.getAttribute("data-copy");
    const el = targetSel ? $(targetSel) : null;
    const text = el?.textContent?.trim() ?? "";
    if (!text) {
      showToast("没有可复制的内容");
      return;
    }
    const ok = await copyText(text);
    showToast(ok ? "已复制到剪贴板" : "复制失败，请手动复制");
  });
});

// 一键复制联系方式（电话/微信 + 邮箱）
const copyBothBtn = $("[data-copy-both]");
copyBothBtn?.addEventListener("click", async () => {
  const phone = $("#contact-phone")?.textContent?.trim() ?? "";
  const email = $("#contact-email")?.textContent?.trim() ?? "";
  const text = `电话/微信：${phone}\n邮箱：${email}`;
  const ok = await copyText(text);
  showToast(ok ? "已复制联系方式" : "复制失败，请手动复制");
});

// ============ 奖项自动慢速滚动（拖拽/悬停/到头停2秒） ============
(function(){
  const container = $(".awards-scroll");
  const inner = $(".awards-scroll-inner");
  if(!container || !inner) return;

  let pos = 0;
  let paused = false;
  let hovering = false;
  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  const SPEED = 0.35;
  const PAUSE_MS = 2000;

  // 自动滚动
  function tick(){
    if(!paused && !hovering && !dragging){
      pos -= SPEED;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if(pos <= -maxScroll){
        paused = true;
        container.style.scrollBehavior = "auto";
        setTimeout(() => {
          pos = 0;
          container.scrollLeft = 0;
          container.style.scrollBehavior = "";
          if(!hovering && !dragging) paused = false;
        }, PAUSE_MS);
      }
      container.scrollLeft = -pos;
    }
    requestAnimationFrame(tick);
  }

  // 鼠标悬停
  container.addEventListener("mouseenter", () => { hovering = true; });
  container.addEventListener("mouseleave", () => { hovering = false; });

  // 鼠标拖拽左右滑动
  container.addEventListener("mousedown", (e) => {
    dragging = true;
    dragStartX = e.clientX;
    dragStartScroll = container.scrollLeft;
    container.style.cursor = "grabbing";
    e.preventDefault();
  });
  document.addEventListener("mousemove", (e) => {
    if(!dragging) return;
    const dx = e.clientX - dragStartX;
    container.scrollLeft = dragStartScroll - dx;
  });
  document.addEventListener("mouseup", () => {
    if(dragging){
      dragging = false;
      container.style.cursor = "grab";
    }
  });

  // 触摸支持
  container.addEventListener("touchstart", (e) => {
    dragging = true;
    dragStartX = e.touches[0].clientX;
    dragStartScroll = container.scrollLeft;
  }, { passive: true });
  container.addEventListener("touchmove", (e) => {
    if(!dragging) return;
    const dx = e.touches[0].clientX - dragStartX;
    container.scrollLeft = dragStartScroll - dx;
  }, { passive: true });
  container.addEventListener("touchend", () => { dragging = false; }, { passive: true });

  requestAnimationFrame(tick);
})();
