/* ==========================================================================
   ABDULLAH VISUALS | عبدالله فجولز
   Interactive Portfolio, Before/After Compare Studio, NLE Timeline & Theater
   ========================================================================== */

(() => {
  "use strict";

  const VIDEO_BASE = "https://abdullah0102edit-eng.github.io/videos/";
  const WA_BASE = "https://wa.me/201037103806";
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Source layout of c-*.mp4 / c-*.jpg side-by-side compare files:
  // If left half of c-*.mp4 is Before (raw) and right half is After (edited), set true.
  // We verify visually in browser preview.
  const SOURCE_BEFORE_ON_LEFT = true;

  /* ------------------------------------------------------------------------
     1. Complete Portfolio Catalog (All 21 Videos + 5 Compare Sliders)
     ------------------------------------------------------------------------ */
  const CATEGORIES = {
    reels: {
      key: "reels",
      name: "ريلز",
      desc: "فيديوهات قصيرة بالطول لإنستجرام وتيك توك.",
      price: "800 جنيه",
      unit: "للريل",
      cta: "اطلب ريل",
      waMsg: "عايز أطلب ريل",
      aspect: "9 / 16",
      featuredCompare: { id: "r-mody", compareId: "c-mody" },
      items: [
        { id: "r-final", label: "ريل 1" },
        { id: "r-6", label: "ريل 2" },
        { id: "r-green", label: "ريل 3" },
        { id: "r-fn", label: "ريل 4" },
        { id: "r-99", label: "ريل 5" },
        { id: "r-history", label: "ريل 6" },
        { id: "r-15", label: "ريل 7" },
        { id: "r-blue", label: "ريل 8" },
        { id: "r-fn12", label: "ريل 9" },
        { id: "r-comp", label: "ريل 10" },
        { id: "r-11", label: "ريل 11" },
        { id: "r-9", label: "ريل 12" },
        { id: "r-mody", label: "ريل 13" }
      ]
    },
    promos: {
      key: "promos",
      name: "بروموهات",
      desc: "فيديوهات تعريفية لبراند أو حدث أو خدمة.",
      price: "1200 جنيه",
      unit: "للبرومو",
      cta: "اطلب برومو",
      waMsg: "عايز أطلب برومو",
      aspect: "16 / 9",
      items: [
        { id: "p-fn", label: "برومو 1", big: true },
        { id: "p-prof", label: "برومو 2" },
        { id: "p-gino", label: "برومو 3" }
      ]
    },
    ads: {
      key: "ads",
      name: "إعلانات",
      desc: "إعلانات مدفوعة هدفها توقّف اللي بيقلّب وتبيع.",
      price: "1500 جنيه",
      unit: "للإعلان",
      cta: "اطلب إعلان",
      waMsg: "عايز أطلب إعلان",
      aspect: "9 / 16",
      items: [
        { id: "a-tuana", label: "إعلان 1", big: true }
      ]
    },
    motion: {
      key: "motion",
      name: "موشن جرافيك",
      desc: "فيديوهات كاملة بالحركة والرسوم والصوت.",
      price: "1000 جنيه",
      unit: "للفيديو",
      cta: "اطلب موشن",
      waMsg: "عايز أطلب فيديو موشن جرافيك",
      aspect: "9 / 16",
      items: [
        { id: "m-1", label: "موشن 1", big: true },
        { id: "m-2", label: "موشن 2" },
        { id: "m-azoz", label: "موشن 3" }
      ]
    }
  };

  const COMPARE_PAIRS = [
    { id: "r-6", compareId: "c-6" },
    { id: "r-green", compareId: "c-green" },
    { id: "r-fn", compareId: "c-fn" },
    { id: "r-comp", compareId: "c-comp" }
  ];

  // Build flat lookup map for direct opening by video ID
  const VIDEO_BY_ID = new Map();
  Object.values(CATEGORIES).forEach((cat) => {
    cat.items.forEach((item, index) => {
      VIDEO_BY_ID.set(item.id, { catKey: cat.key, index, item });
    });
  });

  function waUrl(msg) {
    return msg ? `${WA_BASE}?text=${encodeURIComponent(msg)}` : WA_BASE;
  }

  function mediaUrl(file) {
    return `${VIDEO_BASE}${file}`;
  }

  /* ------------------------------------------------------------------------
     2. Cinematic Intro Curtain
     ------------------------------------------------------------------------ */
  function initIntro() {
    const curtain = document.getElementById("intro-curtain");
    const tcEl = document.getElementById("intro-tc");
    if (!curtain) return;

    if (REDUCED_MOTION) {
      curtain.classList.add("is-done");
      return;
    }

    const start = performance.now();
    const duration = 850;
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const frames = Math.floor(p * 24);
      if (tcEl) {
        tcEl.textContent = `00:00:00:${String(frames).padStart(2, "0")}`;
      }
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          curtain.classList.add("is-done");
        }, 120);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     3. Header Scroll State, Active Nav Highlight & Mobile Drawer
     ------------------------------------------------------------------------ */
  function initHeader() {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    const navLinks = Array.from(document.querySelectorAll(".main-nav .nav-link"));

    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && drawer) {
      const closeDrawer = () => {
        toggle.setAttribute("aria-expanded", "false");
        drawer.hidden = true;
      };
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        drawer.hidden = expanded;
      });
      drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
      window.addEventListener("resize", () => {
        if (window.innerWidth > 960) closeDrawer();
      });
    }

    // Active section observer for top nav
    const sections = ["hero", "portfolio", "before-after", "journey", "pricing"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const secObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
            });
          });
        },
        { rootMargin: "-38% 0px -52% 0px" }
      );
      sections.forEach((s) => secObserver.observe(s));
    }
  }

  /* ------------------------------------------------------------------------
     4. Scroll Reveal Observer
     ------------------------------------------------------------------------ */
  function initReveals() {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     5. Hero Interactive Showreel Stage
     ------------------------------------------------------------------------ */
  function initHeroStage() {
    const videoEl = document.getElementById("hero-stage-video");
    const triggerEl = document.getElementById("hero-stage-trigger");
    const titleEl = document.getElementById("hero-clip-title");
    const tcEl = document.getElementById("hero-tc");
    const pills = Array.from(document.querySelectorAll(".sw-pill"));
    let activeClipId = "r-final";

    const selectClip = (clipId, label) => {
      activeClipId = clipId;
      if (titleEl && label) titleEl.textContent = label;
      if (videoEl) {
        videoEl.poster = mediaUrl(`${clipId}.jpg`);
        videoEl.src = mediaUrl(`${clipId}-loop.mp4`);
        videoEl.play().catch(() => {});
      }
      pills.forEach((p) => p.classList.toggle("is-active", p.dataset.heroClip === clipId));
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        selectClip(pill.dataset.heroClip, pill.dataset.label);
      });
    });

    if (triggerEl) {
      triggerEl.addEventListener("click", () => openVideoById(activeClipId));
    }

    // Flanking cards open full video & play loop on hover
    document.querySelectorAll(".stage-flank").forEach((card) => {
      const vid = card.querySelector("video");
      card.addEventListener("mouseenter", () => vid && vid.play().catch(() => {}));
      card.addEventListener("mouseleave", () => vid && vid.pause());
      card.addEventListener("click", () => {
        if (card.dataset.openVideo) openVideoById(card.dataset.openVideo);
      });
    });

    // Live hero SMPTE timecode display
    if (videoEl && tcEl) {
      const updateTc = () => {
        const t = videoEl.currentTime || 0;
        const mins = Math.floor(t / 60);
        const secs = Math.floor(t % 60);
        const frames = Math.floor((t % 1) * 24);
        tcEl.textContent = `00:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
        if (!document.hidden) requestAnimationFrame(updateTc);
      };
      requestAnimationFrame(updateTc);
    }
  }

  /* ------------------------------------------------------------------------
     6. Shared Lazy Loop Video Observer
     ------------------------------------------------------------------------ */
  const loopVideoObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const vid = entry.target;
              if (entry.isIntersecting && !vid.closest("[hidden]")) {
                if (!vid.src && vid.dataset.src) {
                  vid.src = vid.dataset.src;
                }
                vid.play().catch(() => {});
              } else {
                vid.pause();
              }
            });
          },
          { rootMargin: "160px 0px", threshold: 0.05 }
        )
      : null;

  /* ------------------------------------------------------------------------
     7. Frame-Synced Before/After Compare Card Builder
     ------------------------------------------------------------------------ */
  const compareControllers = [];

  function createCompareCard({ id, compareId, isBig = false }) {
    const wrap = document.createElement("div");
    wrap.className = `compare${isBig ? " is-big" : ""}`;
    wrap.setAttribute("role", "slider");
    wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("aria-label", "مقارنة قبل وبعد — اسحب يمين وشمال");
    wrap.setAttribute("aria-valuemin", "5");
    wrap.setAttribute("aria-valuemax", "95");
    wrap.setAttribute("aria-valuenow", "50");

    const canvas = document.createElement("canvas");
    canvas.width = 450;
    canvas.height = 800;

    const line = document.createElement("div");
    line.className = "compare-line";
    line.innerHTML = `
      <span class="compare-knob" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 7 3 12l5 5M16 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    `;

    const tagBefore = document.createElement("span");
    tagBefore.className = "compare-tag compare-tag-before";
    tagBefore.textContent = "قبل";

    const tagAfter = document.createElement("span");
    tagAfter.className = "compare-tag compare-tag-after";
    tagAfter.textContent = "بعد";

    const fullBtn = document.createElement("button");
    fullBtn.type = "button";
    fullBtn.className = "compare-full-btn";
    fullBtn.textContent = "شوفه كامل";
    fullBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
    fullBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openVideoById(id);
    });

    wrap.append(canvas, line, tagBefore, tagAfter, fullBtn);

    const ctx = canvas.getContext("2d");
    let pos = 0.5;
    let userTouched = false;
    let inView = false;
    let rafId = null;

    // Poster image fallback (drawn immediately before video frames arrive)
    const posterImg = new Image();
    posterImg.crossOrigin = "anonymous";
    posterImg.src = mediaUrl(`${compareId}.jpg`);

    // Offscreen side-by-side compare video
    const vid = document.createElement("video");
    vid.crossOrigin = "anonymous";
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.preload = "metadata";
    vid.dataset.src = mediaUrl(`${compareId}.mp4`);

    function setPos(nextPos) {
      pos = Math.max(0.06, Math.min(0.94, nextPos));
      wrap.style.setProperty("--pos", `${(pos * 100).toFixed(2)}%`);
      wrap.setAttribute("aria-valuenow", String(Math.round(pos * 100)));
      drawFrame();
    }

    function drawSplitSource(source, srcW, srcH) {
      if (!ctx || !srcW || !srcH) return;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      const isSideBySide = srcW / srcH > 0.9;
      const splitX = Math.round(cw * pos);

      if (isSideBySide) {
        const halfW = srcW / 2;
        const afterX = SOURCE_BEFORE_ON_LEFT ? halfW : 0;
        const beforeX = SOURCE_BEFORE_ON_LEFT ? 0 : halfW;

        // Left region of card [0 .. splitX] => AFTER ("بعد")
        if (splitX > 0) {
          ctx.drawImage(source, afterX, 0, halfW * pos, srcH, 0, 0, splitX, ch);
        }
        // Right region of card [splitX .. cw] => BEFORE ("قبل")
        if (splitX < cw) {
          ctx.drawImage(
            source,
            beforeX + halfW * pos,
            0,
            halfW * (1 - pos),
            srcH,
            splitX,
            0,
            cw - splitX,
            ch
          );
        }
      } else {
        // Fallback if single-frame source
        ctx.drawImage(source, 0, 0, srcW, srcH, 0, 0, cw, ch);
      }
    }

    function drawFrame() {
      if (vid.readyState >= 2 && vid.videoWidth > 0) {
        drawSplitSource(vid, vid.videoWidth, vid.videoHeight);
      } else if (posterImg.complete && posterImg.naturalWidth > 0) {
        drawSplitSource(posterImg, posterImg.naturalWidth, posterImg.naturalHeight);
      }
    }

    posterImg.addEventListener("load", drawFrame);
    vid.addEventListener("loadeddata", drawFrame);

    let phase = Math.random() * Math.PI * 2;
    function loop(ts) {
      if (!inView || wrap.closest("[hidden]")) {
        rafId = null;
        return;
      }
      // Subtle gentle glide on the featured big compare card before user interacts
      if (isBig && !userTouched && !REDUCED_MOTION) {
        pos = 0.5 + Math.sin(ts * 0.0011 + phase) * 0.14;
        wrap.style.setProperty("--pos", `${(pos * 100).toFixed(2)}%`);
      }
      drawFrame();
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      inView = true;
      if (!vid.src && vid.dataset.src) {
        vid.src = vid.dataset.src;
      }
      vid.play().catch(() => {});
      if (!rafId) rafId = requestAnimationFrame(loop);
    }

    function stop() {
      inView = false;
      vid.pause();
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    // Pointer scrubbing
    let dragging = false;
    const updateFromClientX = (clientX) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width) return;
      userTouched = true;
      setPos((clientX - rect.left) / rect.width);
    };

    wrap.addEventListener("pointerdown", (e) => {
      dragging = true;
      wrap.setPointerCapture(e.pointerId);
      updateFromClientX(e.clientX);
    });

    wrap.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      updateFromClientX(e.clientX);
    });

    const endDrag = () => {
      dragging = false;
    };
    wrap.addEventListener("pointerup", endDrag);
    wrap.addEventListener("pointercancel", endDrag);

    // Keyboard accessibility
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        userTouched = true;
        setPos(pos - 0.05);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        userTouched = true;
        setPos(pos + 0.05);
      }
    });

    setPos(0.5);
    compareControllers.push({ el: wrap, start, stop });
    return wrap;
  }

  function initCompareObserver() {
    if (!("IntersectionObserver" in window)) {
      compareControllers.forEach((c) => c.start());
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ctrl = compareControllers.find((c) => c.el === entry.target);
          if (!ctrl) return;
          if (entry.isIntersecting && !entry.target.closest("[hidden]")) {
            ctrl.start();
          } else {
            ctrl.stop();
          }
        });
      },
      { rootMargin: "140px 0px", threshold: 0.05 }
    );
    compareControllers.forEach((c) => obs.observe(c.el));
  }

  /* ------------------------------------------------------------------------
     8. Build Portfolio Panels & Before/After Pairs
     ------------------------------------------------------------------------ */
  function createVideoTile(catKey, item, index, aspect) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `tile${item.big ? " is-big" : ""}`;
    btn.style.setProperty("--ar", aspect);
    btn.setAttribute("aria-label", `شغّل الفيديو ${index + 1} - ${CATEGORIES[catKey].name}`);

    const vid = document.createElement("video");
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.preload = "none";
    vid.poster = mediaUrl(`${item.id}.jpg`);
    vid.dataset.src = mediaUrl(`${item.id}-loop.mp4`);

    const badge = document.createElement("span");
    badge.className = "tile-badge";
    badge.textContent = String(index + 1).padStart(2, "0");

    const playIcon = document.createElement("span");
    playIcon.className = "tile-play";
    playIcon.setAttribute("aria-hidden", "true");
    playIcon.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.6-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" fill="currentColor"/></svg>`;

    btn.append(vid, badge, playIcon);
    btn.addEventListener("click", () => openTheater(catKey, index));

    if (loopVideoObserver) {
      loopVideoObserver.observe(vid);
    } else {
      vid.src = vid.dataset.src;
    }

    return btn;
  }

  function renderPortfolio() {
    // 1) Reels Panel
    const reelsPanel = document.getElementById("panel-reels");
    if (reelsPanel) {
      const grid = document.createElement("div");
      grid.className = "grid-reels";

      // Featured Big Compare Card (r-mody)
      grid.appendChild(
        createCompareCard({
          id: CATEGORIES.reels.featuredCompare.id,
          compareId: CATEGORIES.reels.featuredCompare.compareId,
          isBig: true
        })
      );

      // All 13 Reel Tiles
      CATEGORIES.reels.items.forEach((item, idx) => {
        grid.appendChild(createVideoTile("reels", item, idx, CATEGORIES.reels.aspect));
      });

      // Closing Crimson Invite Card
      const invite = document.createElement("div");
      invite.className = "invite-card";
      invite.innerHTML = `
        <h4>الريل الجاي بتاعك؟</h4>
        <a class="btn btn-solid" href="${waUrl(CATEGORIES.reels.waMsg)}" target="_blank" rel="noopener">اطلب ريل</a>
      `;
      grid.appendChild(invite);

      reelsPanel.appendChild(grid);
    }

    // 2) Promos Panel
    const promosPanel = document.getElementById("panel-promos");
    if (promosPanel) {
      const grid = document.createElement("div");
      grid.className = "grid-promos";
      CATEGORIES.promos.items.forEach((item, idx) => {
        grid.appendChild(createVideoTile("promos", item, idx, CATEGORIES.promos.aspect));
      });
      promosPanel.appendChild(grid);
    }

    // 3) Ads Panel (Video + Spotlight Campaign Info)
    const adsPanel = document.getElementById("panel-ads");
    if (adsPanel) {
      const grid = document.createElement("div");
      grid.className = "grid-ads";
      CATEGORIES.ads.items.forEach((item, idx) => {
        grid.appendChild(createVideoTile("ads", item, idx, CATEGORIES.ads.aspect));
      });

      const info = document.createElement("div");
      info.className = "ad-spotlight-info";
      info.innerHTML = `
        <span class="section-kicker">PERFORMANCE AD · إعلان يوقف السكرول</span>
        <h4>إعلانك مش مجرد فيديو حلو — إعلانك بيبيع.</h4>
        <p>في الإعلانات المدفوعة، أول 3 ثواني هما اللي بيحددوا مصير الحملة. بنبني هوك بصري خاطف، إيقاع حاد، ومؤثرات تبرز المنتج وتدفع المشاهد ياخد قرار الشراء.</p>
        <div class="ad-pillars">
          <div class="ad-pillar">
            <strong>هوك أول 3 ثواني</strong>
            <span>حركة وصوت يخطفوا عين العميل فوراً</span>
          </div>
          <div class="ad-pillar">
            <strong>رسالة واضحة وسريعة</strong>
            <span>كابشن وجرافيك يوصّل الميزة حتى من غير صوت</span>
          </div>
          <div class="ad-pillar">
            <strong>تلوين فاخر للمنتج</strong>
            <span>يخلي البراند يبان بقيمة أعلى وسط المنافسين</span>
          </div>
          <div class="ad-pillar">
            <strong>جاهز لكل المنصات</strong>
            <span>مقاسات وجودة مخصصة لإعلانات إنستجرام وتيك توك</span>
          </div>
        </div>
        <div>
          <a class="btn btn-solid btn-lg" href="${waUrl(CATEGORIES.ads.waMsg)}" target="_blank" rel="noopener">اطلب إعلانك الآن (1500 جنيه)</a>
        </div>
      `;
      grid.appendChild(info);
      adsPanel.appendChild(grid);
    }

    // 4) Motion Panel
    const motionPanel = document.getElementById("panel-motion");
    if (motionPanel) {
      const grid = document.createElement("div");
      grid.className = "grid-motion";
      CATEGORIES.motion.items.forEach((item, idx) => {
        grid.appendChild(createVideoTile("motion", item, idx, CATEGORIES.motion.aspect));
      });
      motionPanel.appendChild(grid);
    }

    // 5) Dedicated Before/After Pairs Grid
    const pairsGrid = document.getElementById("pairs-grid");
    if (pairsGrid) {
      COMPARE_PAIRS.forEach((pair) => {
        pairsGrid.appendChild(createCompareCard(pair));
      });
    }

    initCompareObserver();
  }

  /* ------------------------------------------------------------------------
     9. Portfolio Category Tabs + Animated Sliding Indicator
     ------------------------------------------------------------------------ */
  let switchTabGlobal = () => {};

  function initTabs() {
    const tabsShell = document.getElementById("tabs");
    const indicator = document.getElementById("tab-indicator");
    const buttons = Array.from(document.querySelectorAll(".tab-btn"));
    const catTitle = document.getElementById("cat-title");
    const catDesc = document.getElementById("cat-desc");
    const catPrice = document.getElementById("cat-price");
    const catCta = document.getElementById("cat-cta");

    if (!tabsShell || !buttons.length) return;

    const moveIndicator = (btn) => {
      if (!indicator || !btn) return;
      const shellRect = tabsShell.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      indicator.style.left = `${btnRect.left - shellRect.left}px`;
      indicator.style.width = `${btnRect.width}px`;
    };

    const switchTab = (key) => {
      const cat = CATEGORIES[key];
      if (!cat) return;

      buttons.forEach((b) => {
        const active = b.dataset.tab === key;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
        if (active) moveIndicator(b);
      });

      Object.keys(CATEGORIES).forEach((k) => {
        const panel = document.getElementById(`panel-${k}`);
        if (!panel) return;
        const active = k === key;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);

        panel.querySelectorAll("video").forEach((v) => {
          if (active) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      });

      if (catTitle) catTitle.textContent = cat.name;
      if (catDesc) catDesc.textContent = cat.desc;
      if (catPrice) {
        catPrice.innerHTML = `<strong>${cat.price}</strong><span>${cat.unit}</span>`;
      }
      if (catCta) {
        catCta.textContent = cat.cta;
        catCta.href = waUrl(cat.waMsg);
      }
    };

    switchTabGlobal = switchTab;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // Pricing cards "شوف النماذج" jump buttons
    document.querySelectorAll("[data-jump-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.jumpTab;
        switchTab(targetTab);
        const portfolio = document.getElementById("portfolio");
        if (portfolio) portfolio.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Position indicator initially and on resize
    requestAnimationFrame(() => moveIndicator(buttons[0]));
    window.addEventListener("resize", () => {
      const activeBtn = buttons.find((b) => b.classList.contains("is-active"));
      if (activeBtn) moveIndicator(activeBtn);
    });
  }

  /* ------------------------------------------------------------------------
     10. Interactive NLE Timeline ("من الخام للنهائي")
     ------------------------------------------------------------------------ */
  function initJourneyTimeline() {
    const timeline = document.getElementById("timeline");
    const tracksWrap = document.getElementById("tl-tracks");
    const playhead = document.getElementById("tl-playhead");
    const canvas = document.getElementById("j-canvas");
    const stageTitle = document.getElementById("j-stage-title");
    const stageDesc = document.getElementById("j-stage-desc");
    const stagePill = document.getElementById("j-stage-pill");
    const stepCount = document.getElementById("j-step-count");
    const tcEl = document.getElementById("j-tc");
    const progressFill = document.getElementById("j-progress-fill");
    const autoBtn = document.getElementById("j-autoplay");
    const autoLabel = document.getElementById("j-autoplay-label");

    if (!timeline || !tracksWrap || !canvas) return;

    const STAGES = [
      {
        name: "خام",
        start: 0.0,
        desc: "الفيديو جايلي من الكاميرا أو الموبايل: لقطات طويلة من غير أي حاجة."
      },
      {
        name: "قص",
        start: 0.14,
        desc: "بشيل الزيادة وأظبط الإيقاع، فالكلام يوصل أسرع ومحدش يزهق."
      },
      {
        name: "تلوين",
        start: 0.30,
        desc: "بظبط الإضاءة والألوان، عشان اللقطة تبان غالية وليها شخصية."
      },
      {
        name: "كابشن",
        start: 0.46,
        desc: "كابشن كلمة بكلمة، عشان اللي بيتفرج من غير صوت يفهم برضه."
      },
      {
        name: "موشن",
        start: 0.62,
        desc: "عناصر وحركة وانتقالات تشد العين وتخلّيه يكمّل للآخر."
      },
      {
        name: "صوت",
        start: 0.80,
        desc: "مؤثرات وميوزك ماشيين مع كل حركة، وده اللي بيخلّي الفيديو يتحس."
      }
    ];

    const trackButtons = Array.from(tracksWrap.querySelectorAll(".tl-track"));
    const ctx = canvas.getContext("2d");
    let progress = 0.05; // 0..1 (RTL right-to-left)
    let autoPlaying = false;
    let lastTime = 0;

    function getStageIndex(p) {
      let idx = 0;
      for (let i = 0; i < STAGES.length; i++) {
        if (p >= STAGES[i].start) idx = i;
      }
      return idx;
    }

    function updateUI() {
      const idx = getStageIndex(progress);
      const st = STAGES[idx];

      if (playhead) playhead.style.setProperty("--p", `${(progress * 100).toFixed(2)}%`);
      if (progressFill) progressFill.style.width = `${(progress * 100).toFixed(2)}%`;
      timeline.setAttribute("aria-valuenow", String(Math.round(progress * 100)));

      if (stageTitle) stageTitle.textContent = st.name;
      if (stageDesc) stageDesc.textContent = st.desc;
      if (stagePill) stagePill.textContent = st.name;
      if (stepCount) stepCount.textContent = `مرحلة ${idx + 1} من ${STAGES.length}`;

      // 30-second SMPTE timecode
      const totalSec = progress * 30;
      const secs = Math.floor(totalSec);
      const frames = Math.floor((totalSec - secs) * 24);
      if (tcEl) {
        tcEl.textContent = `00:00:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
      }

      trackButtons.forEach((btn, i) => {
        btn.classList.toggle("is-active", i === idx);
        btn.classList.toggle("is-passed", i < idx);
      });
    }

    function drawPreview(now) {
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const t = now * 0.001;
      const idx = getStageIndex(progress);

      const cutAmt = Math.max(0, Math.min(1, (progress - 0.14) / 0.14));
      const colorAmt = Math.max(0, Math.min(1, (progress - 0.30) / 0.14));
      const captionAmt = Math.max(0, Math.min(1, (progress - 0.46) / 0.12));
      const motionAmt = Math.max(0, Math.min(1, (progress - 0.62) / 0.12));
      const soundAmt = Math.max(0, Math.min(1, (progress - 0.80) / 0.12));

      // 1. Background (transitions from flat grey S-Log to deep crimson cinema studio)
      const bgR = Math.round(122 - colorAmt * 98);
      const bgG = Math.round(121 - colorAmt * 112);
      const bgB = Math.round(118 - colorAmt * 108);
      ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
      ctx.fillRect(0, 0, w, h);

      // 2. Cinema Studio Key & Rim Lighting (Color Stage+)
      if (colorAmt > 0.01) {
        const grad = ctx.createRadialGradient(w * 0.5, h * 0.42, 14, w * 0.5, h * 0.45, w * 0.72);
        grad.addColorStop(0, `rgba(255, 118, 98, ${0.42 * colorAmt})`);
        grad.addColorStop(0.45, `rgba(154, 23, 36, ${0.45 * colorAmt})`);
        grad.addColorStop(1, `rgba(10, 6, 7, ${0.9 * colorAmt})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Warm glowing studio ring behind speaker
        ctx.save();
        ctx.strokeStyle = `rgba(255, 150, 128, ${0.55 * colorAmt})`;
        ctx.lineWidth = 4;
        ctx.shadowColor = `rgba(224, 64, 76, ${0.85 * colorAmt})`;
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.41, 96, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Sound Sonic Pulse Rings (Sound Stage)
      if (soundAmt > 0.01) {
        const pulse = (Math.sin(t * 6.5) + 1) * 0.5;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 90, 74, ${(0.22 + pulse * 0.35) * soundAmt})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.41, 108 + pulse * 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Subject Silhouette (punches in tightly on Cut Stage!)
      const zoom = 1 + cutAmt * 0.14 + (motionAmt * Math.sin(t * 2.4) * 0.015);
      ctx.save();
      ctx.translate(w * 0.5, h * 0.56);
      ctx.scale(zoom, zoom);
      ctx.translate(-w * 0.5, -h * 0.56);

      const silR = Math.round(74 - colorAmt * 48);
      const silG = Math.round(74 - colorAmt * 56);
      const silB = Math.round(72 - colorAmt * 54);
      ctx.fillStyle = `rgb(${silR},${silG},${silB})`;

      // Shoulders / torso
      ctx.beginPath();
      ctx.ellipse(w * 0.5, h * 0.86, 134, 185, 0, Math.PI, Math.PI * 2);
      ctx.lineTo(w * 0.5 + 134, h + 40);
      ctx.lineTo(w * 0.5 - 134, h + 40);
      ctx.closePath();
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.41, 46, 0, Math.PI * 2);
      ctx.fill();

      // Crimson rim light edge on silhouette in Color stage+
      if (colorAmt > 0.05) {
        ctx.strokeStyle = `rgba(255, 141, 130, ${0.75 * colorAmt})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.41, 46, -Math.PI * 0.85, Math.PI * 0.15);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Cut Stage Framing Guides
      if (cutAmt > 0.05 && idx === 1) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 141, 130, ${0.5 * cutAmt})`;
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(24, 58, w - 48, h - 116);
        ctx.restore();
      }

      // 6. Motion Graphics Elements (Motion Stage+)
      if (motionAmt > 0.05) {
        ctx.save();
        ctx.globalAlpha = motionAmt;
        const floatY = Math.sin(t * 3.1) * 5;

        // Floating Top Brand Pill ("عبدالله فجولز")
        const pillW = 152;
        const pillH = 34;
        const pillX = (w - pillW) / 2;
        const pillY = 82 + floatY;
        ctx.fillStyle = "rgba(27, 17, 19, 0.86)";
        ctx.strokeStyle = "rgba(224, 64, 76, 0.85)";
        ctx.lineWidth = 1.5;
        roundRect(ctx, pillX, pillY, pillW, pillH, 17);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#f3ecea";
        ctx.font = '700 14px "Alexandria", sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("عبدالله فجولز", w / 2, pillY + pillH / 2 + 1);

        // Kinetic corner accent lines
        ctx.strokeStyle = "#ff5a4a";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(26, 146 - floatY);
        ctx.lineTo(64, 146 - floatY);
        ctx.moveTo(w - 26, 174 + floatY);
        ctx.lineTo(w - 58, 174 + floatY);
        ctx.stroke();
        ctx.restore();
      }

      // 7. Word-by-Word Arabic Captions (Caption Stage+)
      if (captionAmt > 0.05) {
        ctx.save();
        ctx.globalAlpha = captionAmt;
        const words = ["لقطتك", "بتتحوّل", "لتحفة!"];
        const activeWord = Math.floor(t * 2.2) % words.length;
        const cy = h * 0.72;

        // Subtle caption backdrop
        ctx.fillStyle = "rgba(10, 6, 7, 0.62)";
        roundRect(ctx, 28, cy - 28, w - 56, 56, 16);
        ctx.fill();

        const spacing = 86;
        words.forEach((word, i) => {
          // RTL placement: word 0 on right, word 2 on left
          const wx = w / 2 + (1 - i) * spacing;
          const isHot = i === activeWord;
          ctx.font = isHot
            ? '800 22px "Alexandria", sans-serif'
            : '600 18px "Alexandria", sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          if (isHot) {
            ctx.shadowColor = "rgba(224, 64, 76, 0.9)";
            ctx.shadowBlur = 14;
            ctx.fillStyle = "#ff8d82";
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#f3ecea";
          }
          ctx.fillText(word, wx, cy + (isHot ? -2 : 0));
        });
        ctx.restore();
      }

      // 8. Audio Equalizer Waveform (Sound Stage)
      if (soundAmt > 0.05) {
        ctx.save();
        ctx.globalAlpha = soundAmt;
        const bars = 26;
        const barW = 5;
        const gap = 5;
        const totalW = bars * (barW + gap) - gap;
        const startX = (w - totalW) / 2;
        const baseY = h - 42;

        for (let i = 0; i < bars; i++) {
          const distCenter = 1 - Math.abs(i - bars / 2) / (bars / 2);
          const amp = (Math.sin(t * 7 + i * 0.7) * 0.5 + 0.5) * 34 * (0.4 + distCenter * 0.6) + 6;
          const gradBar = ctx.createLinearGradient(0, baseY - amp, 0, baseY);
          gradBar.addColorStop(0, "#ffe9e3");
          gradBar.addColorStop(0.5, "#ff5a4a");
          gradBar.addColorStop(1, "#9a1724");
          ctx.fillStyle = gradBar;
          roundRect(ctx, startX + i * (barW + gap), baseY - amp, barW, amp, 3);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function roundRect(ctx2d, x, y, width, height, radius) {
      ctx2d.beginPath();
      ctx2d.moveTo(x + radius, y);
      ctx2d.arcTo(x + width, y, x + width, y + height, radius);
      ctx2d.arcTo(x + width, y + height, x, y + height, radius);
      ctx2d.arcTo(x, y + height, x, y, radius);
      ctx2d.arcTo(x, y, x + width, y, radius);
      ctx2d.closePath();
    }

    // Pointer scrubbing on RTL timeline (right edge = 0%, left edge = 100%)
    // Clean click on any stage track jumps directly to that stage; dragging scrubs smoothly.
    let dragging = false;
    let moved = false;
    let startX = 0;
    const setFromClientX = (clientX) => {
      const rect = tracksWrap.getBoundingClientRect();
      if (!rect.width) return;
      const p = (rect.right - clientX) / rect.width;
      progress = Math.max(0, Math.min(1, p));
      updateUI();
    };

    timeline.addEventListener("pointerdown", (e) => {
      dragging = true;
      moved = false;
      startX = e.clientX;
      stopAutoPlay();
      if (!e.target.closest(".tl-track")) {
        timeline.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }
    });

    timeline.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      if (!moved && Math.abs(e.clientX - startX) > 5) {
        moved = true;
        try { timeline.setPointerCapture(e.pointerId); } catch {}
      }
      if (moved || !e.target.closest(".tl-track")) {
        setFromClientX(e.clientX);
      }
    });

    const endDrag = () => {
      dragging = false;
    };
    timeline.addEventListener("pointerup", endDrag);
    timeline.addEventListener("pointercancel", endDrag);

    // Clicking a specific track jumps cleanly to that stage
    trackButtons.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        if (moved) return;
        stopAutoPlay();
        progress = idx === STAGES.length - 1 ? 0.92 : STAGES[idx].start + 0.05;
        updateUI();
      });
    });

    // Keyboard scrubbing
    timeline.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stopAutoPlay();
        progress = Math.min(1, progress + 0.06);
        updateUI();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoPlay();
        progress = Math.max(0, progress - 0.06);
        updateUI();
      }
    });

    function stopAutoPlay() {
      autoPlaying = false;
      if (autoBtn) autoBtn.setAttribute("aria-pressed", "false");
      if (autoLabel) autoLabel.textContent = "تشغيل تلقائي";
    }

    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        autoPlaying = !autoPlaying;
        autoBtn.setAttribute("aria-pressed", String(autoPlaying));
        if (autoLabel) autoLabel.textContent = autoPlaying ? "إيقاف مؤقت" : "تشغيل تلقائي";
        if (autoPlaying && progress >= 0.98) progress = 0;
      });
    }

    // Continuous smooth animation loop when visible
    let visible = true;
    if ("IntersectionObserver" in window) {
      const visObs = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.05 }
      );
      visObs.observe(canvas);
    }

    function animate(now) {
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0;
      lastTime = now;

      if (autoPlaying) {
        progress += dt * 0.085;
        if (progress >= 1) progress = 0;
        updateUI();
      }

      if (visible) drawPreview(now);
      requestAnimationFrame(animate);
    }

    updateUI();
    requestAnimationFrame(animate);
  }

  /* ------------------------------------------------------------------------
     11. Fullscreen Cinema Theater Dialog
     ------------------------------------------------------------------------ */
  const theater = document.getElementById("theater");
  const theaterVideo = document.getElementById("theater-video");
  const theaterCat = document.getElementById("theater-cat");
  const theaterCount = document.getElementById("theater-count");
  const theaterWa = document.getElementById("theater-wa");
  const theaterPrev = document.getElementById("theater-prev");
  const theaterNext = document.getElementById("theater-next");
  const theaterClose = document.getElementById("theater-close");

  let theaterState = { catKey: "reels", index: 0 };

  function loadTheaterItem() {
    const cat = CATEGORIES[theaterState.catKey];
    if (!cat || !theaterVideo) return;
    const items = cat.items;
    const item = items[theaterState.index];
    if (!item) return;

    if (theaterCat) theaterCat.textContent = cat.name;
    if (theaterCount) theaterCount.textContent = `${theaterState.index + 1} / ${items.length}`;
    if (theaterWa) {
      theaterWa.href = waUrl(cat.waMsg);
      theaterWa.textContent = cat.cta;
    }

    const single = items.length <= 1;
    if (theaterPrev) theaterPrev.hidden = single;
    if (theaterNext) theaterNext.hidden = single;

    theaterVideo.poster = mediaUrl(`${item.id}.jpg`);
    theaterVideo.src = mediaUrl(`${item.id}.mp4`);
    theaterVideo.muted = false;
    theaterVideo.play().catch(() => {});
  }

  function openTheater(catKey, index) {
    if (!theater) return;
    theaterState = { catKey, index };
    loadTheaterItem();
    if (!theater.open) theater.showModal();
  }

  function openVideoById(videoId) {
    const found = VIDEO_BY_ID.get(videoId);
    if (found) {
      openTheater(found.catKey, found.index);
    }
  }

  function stepTheater(delta) {
    const cat = CATEGORIES[theaterState.catKey];
    if (!cat || cat.items.length <= 1) return;
    theaterState.index = (theaterState.index + delta + cat.items.length) % cat.items.length;
    loadTheaterItem();
  }

  function closeTheater() {
    if (!theater) return;
    if (theaterVideo) {
      theaterVideo.pause();
      theaterVideo.removeAttribute("src");
      theaterVideo.load();
    }
    if (theater.open) theater.close();
  }

  function initTheater() {
    if (!theater) return;
    if (theaterClose) theaterClose.addEventListener("click", closeTheater);
    if (theaterPrev) theaterPrev.addEventListener("click", () => stepTheater(-1));
    if (theaterNext) theaterNext.addEventListener("click", () => stepTheater(1));

    theater.addEventListener("click", (e) => {
      if (e.target === theater) closeTheater();
    });

    theater.addEventListener("close", () => {
      if (theaterVideo) {
        theaterVideo.pause();
        theaterVideo.removeAttribute("src");
        theaterVideo.load();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (!theater.open) return;
      if (e.key === "ArrowLeft") stepTheater(1);
      else if (e.key === "ArrowRight") stepTheater(-1);
    });
  }

  /* ------------------------------------------------------------------------
     12. Contact Quick Brief Picker & One-Click Phone Copy
     ------------------------------------------------------------------------ */
  function initContact() {
    const chips = Array.from(document.querySelectorAll(".brief-chip"));
    const waBtn = document.getElementById("contact-wa-btn");
    const copyBtn = document.getElementById("copy-phone");
    const copyHint = document.getElementById("phone-copy-hint");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        if (waBtn && chip.dataset.msg) {
          waBtn.href = waUrl(chip.dataset.msg);
        }
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const phone = copyBtn.dataset.phone || "01037103806";
        try {
          await navigator.clipboard.writeText(phone);
          if (copyHint) {
            copyHint.textContent = "تم النسخ ✓";
            setTimeout(() => {
              copyHint.textContent = "نسخ";
            }, 2200);
          }
        } catch {
          window.location.href = `tel:${phone}`;
        }
      });
    }

    // Hide floating WhatsApp pill cleanly when contact/footer section is in view
    const floatBtn = document.getElementById("float-talk");
    const contactSec = document.getElementById("contact");
    if (floatBtn && contactSec && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          floatBtn.classList.toggle("is-hidden", Boolean(entries[0]?.isIntersecting));
        },
        { threshold: 0.25 }
      );
      obs.observe(contactSec);
    }
  }

  /* ------------------------------------------------------------------------
     Bootstrap Everything
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initHeader();
    renderPortfolio();
    initTabs();
    initHeroStage();
    initJourneyTimeline();
    initTheater();
    initContact();
    initReveals();
  });
})();
