/**
 * Personal Website Skeleton Interactions (English Version)
 * 1) Sticky nav highlight (scroll/click)
 * 2) Project/practice detail modals
 * 3) Contact one-click copy
 */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ============ Sticky Nav: Scroll Highlight ============
const navLinks = $$(".nav-item[data-nav]");
const sections = $$("[data-section]");

function setActiveNav(id) {
  navLinks.forEach((a) => {
    a.classList.toggle("is-active", a.dataset.nav === id);
  });
}

const io = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.dataset?.section) {
      setActiveNav(visible.target.dataset.section);
    }
  },
  {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0.01, 0.1, 0.25, 0.5, 0.75, 1],
  }
);
sections.forEach((s) => io.observe(s));

navLinks.forEach((a) => {
  a.addEventListener("click", () => setActiveNav(a.dataset.nav));
});

// ============ Detail Modal ============
const modal = $("#detail-modal");
const modalTitle = $("#modal-title");
const modalContent = $("#modal-content");
const closeBtn = $("[data-modal-close]");

function openModal(payload) {
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
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

const DETAIL_MAP = {
  "intern-qdzl": {
    title: "Qindu Zhonglian Training School | Product Operations Intern",
    summary: "2024.01-06",
    html: `
      <p class="muted">Duration: 2024.01-06</p>
      <div class="modal-section">
        <div class="modal-section-title">Background & Goals</div>
        <p class="muted">
          This school-enterprise training project covered online sales of Wahaha beverages, Junlebao yogurt, and accessory rings across multiple categories. Initial challenges included cluttered product keywords, disorganized detail page layouts, and homogenized promotional short videos — the organic in-store conversion rate was only 3%. The goal was to refine product operations around individual SKUs through listing optimization and proprietary content投放, boosting organic traffic and transaction conversion.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Key Actions</div>
        <ul class="bullet">
          <li>
            Product page optimization: Deep-dived into platform search terms, benchmarked competitor listings, optimized titles across all categories, cover image sequencing, and detail page information architecture; restructured the product selling-point narrative.
          </li>
          <li>
            End-to-end content execution: Independently produced short video scripts, on-camera shoots, and post-production editing around product features; split content into lifestyle种草 and in-depth review formats for A/B testing; tracked impressions, clicks, and in-store conversion data using Excel.
          </li>
          <li>
            Data review and process standardization: Consolidated multi-channel operations data, compared content ROI across formats, extracted patterns for high-performing content, and developed a standardized operations playbook.
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Output & Value</div>
        <ul class="bullet">
          <li>Organic in-store conversion rate increased from 3% to 5.2%</li>
          <li>Lifestyle content achieved 40% higher conversion efficiency than hard-sell ads</li>
          <li>Delivered a project review report and end-to-end SOPs for listing management and content production; successfully passed the corporate completion assessment</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Skills Gained</div>
        <p class="muted">
          Mastered the full cycle of e-commerce operations for FMCG and accessories categories, skilled in driving organic traffic conversion through listing optimization and content A/B testing. Proficient in data review and SOP development, with a data-driven growth operations mindset.
        </p>
      </div>
    `,
  },
  "project-metafit": {
    title: "MetaFit | AI-Powered WebXR Virtual Shopping Assistant (Project Lead)",
    summary:
      "Led user & competitor research, identified shopping pain points, prioritized MVP features, independently authored PRD; coordinated a 4-person team, integrated third-party APIs; set up data tracking, drove 3 rounds of product iteration based on usability testing.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">Background & Goals</div>
        <p class="muted">
          Traditional online clothing shopping suffers from limited text-based search, the inability to try on items realistically, and homogenized product recommendations — leading to high decision costs and low conversion rates. This project leverages AI large language models and WebXR 3D rendering to build a lightweight virtual fitting and shopping platform, delivering an MVP that optimizes search and try-on experiences to boost recommendation conversion efficiency.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Key Actions</div>
        <ul class="bullet">
          <li>
            <strong>Requirements analysis & solution delivery:</strong> Conducted user research + competitor benchmarking to identify core pain points (search difficulty, lack of try-on experience, poor personalization). Prioritized MVP features: natural language smart recommendation → 3D virtual try-on → product 3D visualization. Implemented user intent parsing using RAG with BM25 and FAISS hybrid retrieval, built a lightweight 3D rendering solution with WebXR + Three.js, and delivered a complete PRD with acceptance criteria.
          </li>
          <li>
            <strong>Cross-team coordination:</strong> Aligned a 4-person development team, coordinated LLM intent recognition, Gemini try-on API, and Tripo3D image-to-3D integration; organized regular requirements reviews and project syncs to unify technical standards and development pace, ensuring on-time delivery.
          </li>
          <li>
            <strong>Data-driven iteration:</strong> Defined key monitoring metrics (recommendation click-through rate, try-on conversion, resource loading time) and led front-end tracking design; organized 15-person usability tests, drove 3 rounds of iterative improvements addressing loading lag and device compatibility issues, completing the full product cycle from launch to optimization.
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Output & Value</div>
        <p class="muted">
          Delivered an MVP integrating AI semantic search + 3D virtual try-on. Through multiple user optimization rounds, improved model loading latency and cross-device compatibility; refined the core product usage flow and delivered a commercially viable lightweight online fitting solution.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Skills Gained</div>
        <p class="muted">
          Mastered the complete process of AI-powered 3D interactive product development — from requirements definition and technology selection to cross-team delivery. Skilled in driving product iteration through user testing and metric frameworks; capable of taking innovative intelligent products from 0 to 1.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/metafit-1.png" alt="System interface screenshot" loading="lazy" />
          <img class="img-real" src="../assets/metafit-2.png" alt="Project workflow" loading="lazy" />
        </div>
      </div>
    `,
  },
  "project-nanospace": {
    title: "Nano-Space | WebVR Immersive Stress Relief System (Core Member)",
    summary:
      "Self-developed dynamic image compression to solve device lag; led user testing, delivered a VR stress relief product with 80% effectiveness rate, and produced a public-benefit deployment plan.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Goals</div>
        <p class="muted">
          Hong Kong's subdivided flats (劏房) are cramped and enclosed, leading to spatial压抑, anxiety, and sensory deprivation. Lightweight online VR stress relief products are scarce in the market. This project uses WebVR technology to create a no-download, browser-based panoramic immersive relaxation product, leveraging environmental scenes and white noise to alleviate psychological distress, and delivering a lightweight solution deployable for public benefit.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Key Actions</div>
        <ul class="bullet">
          <li>
            <strong>Requirements & product definition:</strong> Deep-dived into subdivided-flat residents' spatial压抑 pain points; architected the product around A-Frame + Web Audio API for 360° panoramic scenes with ambient white noise; designed two core features — a customizable environment "comfort bar" and spatial anchor transitions — to mitigate VR motion sickness from虚实 switching; produced complete user personas and deployment scenario documentation.
          </li>
          <li>
            <strong>Development & performance optimization:</strong> Managed 4K HDR panoramic asset adaptation and cross-device compatibility testing; targeted loading lag on low-end legacy devices with a self-developed dynamic image compression optimization, lowering hardware requirements and improving adaptation rates across mobile and low-spec devices.
          </li>
          <li>
            <strong>User testing & iteration:</strong> Organized 15-person targeted user testing, collected questionnaire and interview data; produced a comprehensive review report based on user feedback, formulated a mobile-first iteration roadmap, and identified deployment channels through non-profit organizations and local communities.
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Output & Value</div>
        <p class="muted">
          Achieved 80% stress relief effectiveness in product testing; resolved low-end device lag through image compression optimization; delivered a browser-based, no-install product ready for public-benefit deployment.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">4. Skills Gained</div>
        <p class="muted">
          Proficient in pain-point discovery, feature design, and cross-device performance optimization for lightweight Web products. Experienced in small-sample user testing, data validation, and channel deployment — capable of delivering inclusive product iteration cycles at low cost.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/nano-1.png" alt="Nano-Space scene screenshot" loading="lazy" />
          <img class="img-real" src="../assets/nano-2.png" alt="Nano-Space interaction flow" loading="lazy" />
        </div>
      </div>
    `,
  },
  "project-echoes": {
    title: "ECHOES | VR Historical Puzzle Exploration Game (Product Lead)",
    summary:
      "Defined the game world and puzzle rules, established anti-motion-sickness interaction standards; optimized rendering to resolve frame drops; created reusable VR experience design guidelines.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Goals</div>
        <p class="muted">
          Traditional VR interactive products commonly suffer from frame drops, motion sickness during extended wear, and awkward interaction logic — resulting in poor immersive experiences. This project developed a history-themed puzzle-exploration VR game, addressing stuttering and motion sickness through optimized interaction logic and rendering solutions, establishing standardized VR experience design guidelines.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Key Actions</div>
        <ul class="bullet">
          <li>
            <strong>Requirements & solution definition:</strong> Led the design of a "1+N" world-building架构, completed functional and gameplay definitions for 9 puzzle levels, and delivered a comprehensive game rules document; established product interaction standards using Unity + SteamVR and collaborated with engineering on FOV dynamic narrowing for anti-motion-sickness implementation.
          </li>
          <li>
            <strong>Cross-team coordination & performance optimization:</strong> Aligned an 8-person cross-functional team (programming / art / QA), broke down the project timeline with phased acceptance criteria; implemented three rendering optimization approaches — polygon count control, idle collider cleanup, and scene chunking with async loading — to address场景 frame-drop issues.
          </li>
          <li>
            <strong>User feedback & iterative improvement:</strong> Incorporated multi-round internal testing feedback, replaced native smooth movement with Teleport mode paired with dynamic FOV narrowing algorithms; after multiple调试 rounds, significantly reduced VR motion sickness incidence and established reusable design guidelines.
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Output & Value</div>
        <p class="muted">
          Fully resolved the original rendering frame-drop issues; post-optimization player comfort improved substantially; delivered a complete set of reusable VR anti-motion-sickness interaction and performance optimization standards, along with a fully produced history-themed VR puzzle product.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">4. Skills Gained</div>
        <p class="muted">
          Proficient in the full chain of VR immersive product level design, interaction design, and performance optimization;精通 VR comfort experience iteration logic. Capable of addressing core experience issues such as motion sickness and frame drops based on device characteristics, with strong experience quality control and standards development capabilities for immersive products.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/echoes-1.png" alt="ECHOES game screenshot" loading="lazy" />
          <img class="img-real" src="../assets/echoes-2.png" alt="ECHOES interaction flow" loading="lazy" />
        </div>
      </div>
    `,
  },
  "project-solar": {
    title: "National-level Innovation Project | Solar Photocatalytic Device (Project Lead)",
    summary:
      "Full-cycle project lead over 14 months; filed 2 utility model patents as primary inventor; project rated National-level Excellent Completion.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Goals</div>
        <p class="muted">
          Traditional wastewater treatment processes are energy-intensive and costly to operate, with few real-world cases of small-scale solar photocatalytic treatment devices. This project focused on water purification scenarios, developing a solar-driven photocatalytic wastewater treatment device. The goal was to complete a prototype within cost and performance constraints and achieve a National-level Excellent rating for the innovation project.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Key Actions</div>
        <ul class="bullet">
          <li>
            <strong>Project management & requirements control:</strong> Served as primary project lead, authored a complete PRD covering device functional specifications, wastewater treatment performance targets, and manufacturing cost constraints; established a 14-month full-cycle milestone plan; organized weekly syncs and阶段性的 reviews to manage progress and R&D risks.
          </li>
          <li>
            <strong>Multi-party coordination & technical攻坚:</strong> Coordinated with faculty advisors and lab resources, managed multi-party collaboration across catalyst material preparation, device structural design, and wastewater sample testing; specifically tackled the challenge of photocatalyst load stability in wastewater environments, breaking through core technical barriers to keep prototype development on schedule.
          </li>
          <li>
            <strong>Results delivery & project completion:</strong> Authored patent technical disclosure documents as primary inventor, filed and obtained受理 for 2 utility model patents covering wastewater purification catalytic structures; consolidated experimental data, completion materials, and defense preparation.
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Output & Value</div>
        <p class="muted">
          Successfully delivered a physical prototype of the solar photocatalytic wastewater treatment device; 2 utility model patents officially受理; project ultimately earned National-level Excellent Completion; the R&D approach can serve as a reference for small-scale decentralized wastewater treatment solutions.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">4. Skills Gained</div>
        <p class="muted">
          Developed full-cycle project management capabilities for hardware research projects, including cross-module coordination and technical攻坚. Proficient in patent成果转化, project risk control, and high-level project completion processes, with a rigorous R&D delivery and project management mindset.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/solar-1.png" alt="Solar photocatalytic device" loading="lazy" />
          <img class="img-real" src="../assets/solar-2.png" alt="Patent/completion certificate" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-sx乡": {
    title: "Rural Social Practice (Shaanxi Weinan) | Deputy Team Lead",
    summary:
      "Led field research, collected over 100 questionnaires, identified industry pain points, authored 6 articles published on provincial/national platforms; project won university second prize.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Task</div>
        <p class="muted">
          Focused on supporting children with special needs in county areas, targeting the critical issues of limited autism awareness among township families and scarce rehabilitation resources. Participated in a dedicated summer social practice research project, using field visits, questionnaire surveys, and institutional interviews to comprehensively assess the real pain points and existing gaps in local special-needs child support.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Actions & Execution</div>
        <ul class="bullet">
          <li>
            Conducted multi-dimensional research: completed 5 in-depth family visits, 3 specialized interviews with local rehabilitation institutions, collected and processed over 100 valid questionnaires.
          </li>
          <li>
            Through data aggregation and content analysis, precisely identified core issues: over 70% of respondents showed insufficient autism awareness; county-level professional rehabilitation resources were critically scarce — forming a complete research material system.
          </li>
          <li>
            Managed content collection and editing, producing 6 research reports and promotional articles.
          </li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Results & Takeaways</div>
        <p class="muted">
          Multiple articles were successfully published on national and provincial media platforms, effectively amplifying the visibility of rural special-needs child support issues. The project won the university's Social Practice Second Prize, while developing complete field research, pain-point extraction, data aggregation, and content output capabilities — with a systematic approach to social research project delivery and review.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/sx-1.png" alt="Activity photos" loading="lazy" />
          <img class="img-real" src="../assets/sx-2.png" alt="Research/field visits" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-flag": {
    title: "Xi'an Polytechnic University National Flag Guard | Publicity Officer / Member",
    summary:
      "Coordinated over 100 events, fully responsible for new media account operations, produced 100+ articles, achieved 50,000+ impressions.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Task</div>
        <p class="muted">
          Served as both a flag guard member and publicity officer, balancing ceremonial duties, patriotic event coordination, and multi-platform promotional operations. Built校内外的交流 channels through ceremonial events, shaped the team's image via multi-platform content operations, and promoted campus patriotic culture.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Execution</div>
        <ul class="bullet">
          <li>Regularly participated in ceremonial training, executed over 100 flag-raising and patriotic education events, reaching 50,000+师生.</li>
          <li>Managed content operations across WeChat public account, Weibo, and QQ Space — independently handled topic selection, writing, and排版, publishing 100+ articles and producing 3 promotional short films.</li>
          <li>Coordinated with nearly 10 sister-university flag guards, inviting them to participate in transition ceremonies and experience-sharing sessions; managed cross-university event coordination and on-site publicity.</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Results & Takeaways</div>
        <p class="muted">
          Single post reached 2,000+ reads; promotional videos totaled 3,000+ views, effectively expanding the team's校内 awareness and校外 influence. Developed skills in large-scale event coordination, cross-university outreach, and multi-channel new media matrix operations. Enhanced overall project coordination and content planning capabilities.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/flag-1.jpg" alt="Event photos" loading="lazy" />
          <img class="img-real" src="../assets/flag-2.jpg" alt="Article screenshots" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-beijing": {
    title: "Rural Social Practice (Beijing) | Core Member",
    summary:
      "Conducted field research on red cultural heritage, coordinated project planning and execution, completed interviews, material collection, and article writing at multiple national-level red heritage sites.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Task</div>
        <p class="muted">
          Based on the theme of red party history research, this summer social practice project used field site visits and expert interviews as its core format. As a core member, I fully participated in overall project planning and itinerary design, coordinated task delegation across groups, and ensured the smooth execution of the entire Beijing research trip.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Execution</div>
        <ul class="bullet">
          <li>Led the team to three landmark sites — the National Museum of China, Tiananmen Square, and the Museum of the War of Chinese People's Resistance Against Japanese Aggression — coordinating contacts with interviewees and completing 10+ in-person interviews and field surveys.</li>
          <li>Collected first-hand materials and managed the writing of all practice coverage articles throughout the project.</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Results & Takeaways</div>
        <p class="muted">
          Successfully completed all research visits and article output tasks, with comprehensive first-hand research materials consolidated. Developed skills in project planning,异地 itinerary coordination, field interviewing, and document writing. Gained practical experience in red culture research execution and team task division management.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/beijing-1.jpg" alt="Activity photos" loading="lazy" />
          <img class="img-real" src="../assets/beijing-2.jpg" alt="Site records" loading="lazy" />
        </div>
      </div>
    `,
  },
  "practice-tuangzhi": {
    title: "Xi'an Polytechnic University, College of Science Youth League | Publicity Officer",
    summary:
      "Managed the college's new media matrix operations, campus cultural and ideological event publicity, visual material production, and promotion效果 tracking. Through multi-platform content output and offline promotional coordination, continuously expanded the college's campus visibility and influence among staff and students.",
    html: `
      <div class="modal-section">
        <div class="modal-section-title">1. Background & Task</div>
        <p class="muted">
          Based in the college's youth league propaganda work, responsible for full-media promotion of daily ideological education, cultural and sports events, academic culture building, and other college activities. Leveraged QQ Space and official Weibo as new media platforms to build the college's publicity window, ensuring efficient and precise information delivery to all staff and students.
        </p>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">2. Execution</div>
        <ul class="bullet">
          <li>Fully responsible for daily operations of two college new media platforms, including copy editing and content推送, completing 50+ activity notices, news updates, and themed promotional posts.</li>
          <li>Actively participated in activity promotional poster design and production, coordinated the entire workflow from online content distribution to offline material deployment, tracked promotion exposure and effectiveness in real time, and dynamically optimized the promotional rhythm.</li>
        </ul>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">3. Results & Takeaways</div>
        <p class="muted">
          Consistently delivered high-quality promotional content, effectively increasing participation in college activities and campus visibility, strengthening the college's publicity阵地. Mastered new media content planning, graphic layout, visual material production, and promotion效果 review. Accumulated systematic, multi-channel propaganda operations experience.
        </p>
      </div>
      <div class="modal-section">
        <div class="img-grid img-grid-2">
          <img class="img-real" src="../assets/tuangzhi-1.jpg" alt="Promotional materials" loading="lazy" />
          <img class="img-real" src="../assets/tuangzhi-2.jpg" alt="Event photos" loading="lazy" />
        </div>
      </div>
    `,
  },
};

$$("[data-modal-open]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-modal-open");
    const payload = DETAIL_MAP[key] ?? {
      title: "Details",
      summary: "No details available.",
      html: `<p class="muted">No details available.</p>`,
    };
    openModal(payload);
  });
});

// ============ Copy to Clipboard ============
const toast = $("#copy-toast");
let toastTimer = null;

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
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
      showToast("Nothing to copy");
      return;
    }
    const ok = await copyText(text);
    showToast(ok ? "Copied to clipboard" : "Copy failed, please copy manually");
  });
});

// One-click copy contact info
const copyBothBtn = $("[data-copy-both]");
copyBothBtn?.addEventListener("click", async () => {
  const phone = $("#contact-phone")?.textContent?.trim() ?? "";
  const email = $("#contact-email")?.textContent?.trim() ?? "";
  const text = `Phone/WeChat: ${phone}\nEmail: ${email}`;
  const ok = await copyText(text);
  showToast(ok ? "Contact info copied" : "Copy failed, please copy manually");
});

// ============ Awards auto-scroll (drag/hover/pause at end) ============
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

  container.addEventListener("mouseenter", () => { hovering = true; });
  container.addEventListener("mouseleave", () => { hovering = false; });

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
