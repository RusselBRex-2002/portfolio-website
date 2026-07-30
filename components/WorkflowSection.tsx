"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

// ─── Data ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "design",
    number: "01",
    title: "Design",
    description:
      "We craft intuitive digital experiences through meticulous wireframing, user journey mapping, and interactive prototyping that transforms your vision into a tangible blueprint.",
    image: "/Workflow generated assets/Designing generation image..jpg",
    video: "/Workflow generated assets/Video 1.mp4",
    accentColor: "#edff66",
    label: "DESIGN ARCHITECTURE",
  },
  {
    id: "develop",
    number: "02",
    title: "Develop",
    description:
      "We engineer robust, scalable architectures with clean code practices, rigorous testing protocols, and modern technology stacks that power seamless performance.",
    image: "/Workflow generated assets/Development generation image..jpg",
    video: "/Workflow generated assets/Video 2.mp4",
    accentColor: "#06b6d4",
    label: "FULLSTACK ENGINEERING",
  },
  {
    id: "deploy",
    number: "03",
    title: "Deploy",
    description:
      "We launch on secure, high-performance infrastructure with automated CI/CD pipelines, real-time monitoring, and zero-downtime deployment strategies.",
    image: "/Workflow generated assets/Deployment generation.jpg",
    video: "/Workflow generated assets/Video 3.mp4",
    accentColor: "#10b981",
    label: "EDGE DEPLOYMENT",
  },
  {
    id: "success",
    number: "04",
    title: "Client Success",
    description:
      "We forge lasting partnerships through dedicated support, continuous optimization, data-driven insights, and an unwavering commitment to your long-term growth.",
    image: "/Workflow generated assets/Client Success generation image.jpg",
    video: null,
    accentColor: "#a855f7",
    label: "CLIENT SUCCESS",
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────
type Phase = 0 | 1 | 2 | 3 | 4 | "v1" | "v2" | "v3";
const VIDEO_PHASES: Phase[] = ["v1", "v2", "v3"];

export function WorkflowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Refs for GSAP targets
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // ─── State (using refs to avoid re-renders) ───────────────────────────────
  const phaseRef = useRef<Phase>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const isVideoPlayingRef = useRef<boolean>(false);

  // ─── Input Lock ───────────────────────────────────────────────────────────
  // Single source of truth: while true, ALL wheel/touch input is ignored.
  // Set the instant a gesture commits; released only in the GSAP onComplete.
  const lockedRef = useRef<boolean>(false);
  const skipVideoRef = useRef<(() => void) | null>(null);

  // ─── Helpers ─────────────────────────────────────────────────────────────
  const updateIndicators = useCallback((activeStepIndex: number) => {
    const pct = ((activeStepIndex + 1) / STEPS.length) * 100;
    indicatorRefs.current.forEach((ind, i) => {
      if (!ind) return;
      ind.classList.remove("wf-active", "wf-completed");
      if (i < activeStepIndex) ind.classList.add("wf-completed");
      else if (i === activeStepIndex) ind.classList.add("wf-active");
    });
    if (progressRef.current) {
      gsap.to(progressRef.current, { height: `${pct}%`, duration: 0.5, ease: "power2.out" });
    }
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, { width: `${pct}%`, duration: 0.5, ease: "power2.out" });
    }
    if (stageLabelRef.current) {
      stageLabelRef.current.textContent = `${STEPS[activeStepIndex].number}. ${STEPS[activeStepIndex].label}`;
    }
    return pct;
  }, []);

  const hideHint = useCallback(() => {
    if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.3 });
  }, []);
  const showHint = useCallback(() => {
    if (hintRef.current) gsap.to(hintRef.current, { opacity: 1, duration: 0.3, delay: 0.5 });
  }, []);

  // ─── Layer Isolation & Stacking Helpers ───────────────────────────────────
  const setActiveLayer = useCallback((activeEl: HTMLElement | null) => {
    imgRefs.current.forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      if (el === activeEl) {
        gsap.set(el, { zIndex: 20, visibility: "visible", opacity: 1, pointerEvents: "auto" });
      } else {
        gsap.set(el, { zIndex: 1, visibility: "hidden", opacity: 0, pointerEvents: "none" });
      }
    });
    videoLayerRefs.current.forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      if (el === activeEl) {
        gsap.set(el, { zIndex: 20, visibility: "visible", opacity: 1, pointerEvents: "auto" });
      } else {
        gsap.set(el, { zIndex: 1, visibility: "hidden", opacity: 0, pointerEvents: "none" });
      }
    });
  }, []);

  const prepareTransition = useCallback((fromEl: HTMLElement | null, toEl: HTMLElement | null) => {
    imgRefs.current.forEach((el) => {
      if (!el) return;
      if (el !== fromEl && el !== toEl) {
        gsap.killTweensOf(el);
        gsap.set(el, { zIndex: 1, visibility: "hidden", opacity: 0, pointerEvents: "none" });
      }
    });
    videoLayerRefs.current.forEach((el) => {
      if (!el) return;
      if (el !== fromEl && el !== toEl) {
        gsap.killTweensOf(el);
        gsap.set(el, { zIndex: 1, visibility: "hidden", opacity: 0, pointerEvents: "none" });
      }
    });
    if (fromEl) {
      gsap.set(fromEl, { zIndex: 10, visibility: "visible", opacity: 1, pointerEvents: "auto" });
    }
    if (toEl) {
      gsap.set(toEl, { zIndex: 20, visibility: "visible", opacity: 0, pointerEvents: "auto" });
    }
  }, []);

  // ─── Transition Logic ─────────────────────────────────────────────────────

  // PHASE 0 → PHASE 1
  const doTitleToDesign = useCallback(() => {
    isAnimatingRef.current = true;
    hideHint();
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
    prepareTransition(null, imgRefs.current[0]);

    const designContent = imgRefs.current[0]?.querySelector(".wf-step-content");
    gsap.set(titleRef.current, { scale: 1, opacity: 1 });
    gsap.set(gridRef.current, { opacity: 0 });
    if (designContent) gsap.set(designContent, { y: 50, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        phaseRef.current = 1;
        isAnimatingRef.current = false;
        lockedRef.current = false; // 🔓 UNLOCK
        setActiveLayer(imgRefs.current[0]);
        updateIndicators(0);
        showHint();
      },
    });

    tl.to(titleRef.current, { scale: 1.4, opacity: 0, duration: 0.7, ease: "power2.in" });
    tl.to(gridRef.current, { opacity: 1, duration: 0.3 }, 0);
    tl.to(imgRefs.current[0], { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.4);
    if (designContent) {
      tl.fromTo(
        designContent,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.7
      );
    }
  }, [hideHint, showHint, updateIndicators, prepareTransition, setActiveLayer]);

  // PHASE n → VIDEO → PHASE n+1
  const doImageToVideoToImage = useCallback((fromStepIndex: number) => {
    const toStepIndex = fromStepIndex + 1;
    const videoIndex = fromStepIndex;
    const videoLayer = videoLayerRefs.current[videoIndex];
    const videoEl = videoRefs.current[videoIndex];
    const fromLayer = imgRefs.current[fromStepIndex];
    const toLayer = imgRefs.current[toStepIndex];
    const videoPhase = VIDEO_PHASES[videoIndex];
    const fromContent = fromLayer?.querySelector(".wf-step-content");

    isAnimatingRef.current = true;
    isVideoPlayingRef.current = true;
    phaseRef.current = videoPhase;
    hideHint();
    prepareTransition(fromLayer, videoLayer);

    if (fromContent) gsap.set(fromContent, { y: 0, opacity: 1 });

    const tl = gsap.timeline();

    if (fromContent) {
      tl.to(fromContent, { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" });
    }
    tl.to(fromLayer, { opacity: 0, duration: 0.5, ease: "power2.in" }, 0.2);
    tl.to(videoLayer, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.5);

    tl.call(() => {
      if (videoEl) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      }

      const onEnd = () => {
        videoEl?.removeEventListener("ended", onEnd);
        skipVideoRef.current = null;
        isVideoPlayingRef.current = false;

        const toContent = toLayer?.querySelector(".wf-step-content");
        if (toContent) gsap.set(toContent, { y: 50, opacity: 0 });
        if (toStepIndex === 3 && glowRef.current) gsap.set(glowRef.current, { opacity: 0 });

        prepareTransition(videoLayer, toLayer);

        const tl2 = gsap.timeline({
          onComplete: () => {
            if (videoEl) {
              videoEl.pause();
              videoEl.currentTime = 0;
            }
            phaseRef.current = (toStepIndex + 1) as Phase;
            isAnimatingRef.current = false;
            lockedRef.current = false; // 🔓 UNLOCK
            setActiveLayer(toLayer);
            updateIndicators(toStepIndex);
            showHint();
          },
        });

        tl2.to(videoLayer, { opacity: 0, duration: 0.6, ease: "power2.in" });
        tl2.to(toLayer, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3);
        if (toContent) {
          tl2.fromTo(
            toContent,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.6
          );
        }
        if (toStepIndex === 3) {
          tl2.to(glowRef.current, { opacity: 1, duration: 1 }, 0.8);
        }
      };

      skipVideoRef.current = () => {
        videoEl?.removeEventListener("ended", onEnd);
        if (videoEl) {
          videoEl.pause();
          videoEl.currentTime = 0;
        }
        skipVideoRef.current = null;
        onEnd();
      };

      if (videoEl) {
        videoEl.addEventListener("ended", onEnd);
      } else {
        onEnd();
      }
    });
  }, [hideHint, showHint, updateIndicators, prepareTransition, setActiveLayer]);

  // PHASE n → PHASE n-1 (retreat)
  const doImageRetreat = useCallback((fromPhase: 2 | 3 | 4) => {
    const fromStepIndex = fromPhase - 1;
    const toStepIndex = fromPhase - 2;
    const fromLayer = imgRefs.current[fromStepIndex];
    const toLayer = imgRefs.current[toStepIndex];
    const fromContent = fromLayer?.querySelector(".wf-step-content");
    const toContent = toLayer?.querySelector(".wf-step-content");

    isAnimatingRef.current = true;
    hideHint();
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
    prepareTransition(fromLayer, toLayer);

    if (fromContent) gsap.set(fromContent, { y: 0, opacity: 1 });
    if (toContent) gsap.set(toContent, { y: -30, opacity: 0 });
    if (fromPhase === 4 && glowRef.current) gsap.set(glowRef.current, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        phaseRef.current = (fromPhase - 1) as Phase;
        isAnimatingRef.current = false;
        lockedRef.current = false; // 🔓 UNLOCK
        setActiveLayer(toLayer);
        updateIndicators(toStepIndex);
        showHint();
      },
    });

    if (fromPhase === 4 && glowRef.current) {
      tl.to(glowRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0);
    }
    if (fromContent) {
      tl.to(fromContent, { y: 30, opacity: 0, duration: 0.35, ease: "power2.in" }, 0);
    }
    tl.to(fromLayer, { opacity: 0, duration: 0.5, ease: "power2.in" }, 0.2);
    tl.to(toLayer, { opacity: 1, duration: 0.7, ease: "power2.out" }, 0.4);
    if (toContent) {
      tl.fromTo(
        toContent,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.7
      );
    }
  }, [hideHint, showHint, updateIndicators, prepareTransition, setActiveLayer]);

  // ─── Advance / Retreat / Exit ──────────────────────────────────────────────
  const handleAdvance = useCallback(() => {
    const phase = phaseRef.current;

    if (isVideoPlayingRef.current) {
      if (skipVideoRef.current) skipVideoRef.current();
      return;
    }

    if (isAnimatingRef.current) return;

    if (phase === 0) {
      doTitleToDesign();
    } else if (phase === 1) {
      doImageToVideoToImage(0);
    } else if (phase === 2) {
      doImageToVideoToImage(1);
    } else if (phase === 3) {
      doImageToVideoToImage(2);
    } else if (phase === 4) {
      hideHint();
      const wrapper = wrapperRef.current;
      const nextScrollY = wrapper
        ? wrapper.offsetTop + wrapper.offsetHeight
        : window.scrollY + window.innerHeight;
      window.dispatchEvent(
        new CustomEvent("workflow:exit", { detail: { scrollTo: nextScrollY } })
      );
    }
  }, [doTitleToDesign, doImageToVideoToImage, hideHint]);

  const handleRetreat = useCallback(() => {
    if (isAnimatingRef.current || isVideoPlayingRef.current) return;

    const phase = phaseRef.current;

    if (phase === 1) {
      isAnimatingRef.current = true;
      hideHint();
      prepareTransition(imgRefs.current[0], null);
      const retreatContent = imgRefs.current[0]?.querySelector(".wf-step-content");
      if (retreatContent) gsap.set(retreatContent, { y: 0, opacity: 1 });
      gsap.set(gridRef.current, { opacity: 1 });
      gsap.set(titleRef.current, { scale: 1.4, opacity: 0 });
      const tl = gsap.timeline({
        onComplete: () => {
          phaseRef.current = 0;
          isAnimatingRef.current = false;
          lockedRef.current = false; // 🔓 UNLOCK
          setActiveLayer(null);
        },
      });
      if (retreatContent) tl.to(retreatContent, { y: 30, opacity: 0, duration: 0.35, ease: "power2.in" });
      tl.to(imgRefs.current[0], { opacity: 0, duration: 0.5, ease: "power2.in" }, 0.2);
      tl.to(gridRef.current, { opacity: 0, duration: 0.4 }, 0.3);
      tl.to(titleRef.current, { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.4);
    } else if (phase === 2 || phase === 3 || phase === 4) {
      doImageRetreat(phase);
    }
  }, [hideHint, doImageRetreat, prepareTransition, setActiveLayer]);

  const handleExitUp = useCallback(() => {
    hideHint();
    const wrapper = wrapperRef.current;
    const prevScrollY = wrapper
      ? Math.max(0, wrapper.offsetTop - window.innerHeight)
      : Math.max(0, window.scrollY - window.innerHeight);
    window.dispatchEvent(
      new CustomEvent("workflow:exit", { detail: { scrollTo: prevScrollY } })
    );
  }, [hideHint]);

  // ─── Visibility tracking via IntersectionObserver ────────────────────────
  const isInViewRef = useRef<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const wasInView = isInViewRef.current;

        if (ratio >= 0.95 && !wasInView) {
          isInViewRef.current = true;
          const wrapper = wrapperRef.current;
          const exactTop = wrapper ? wrapper.offsetTop : window.scrollY;
          window.dispatchEvent(
            new CustomEvent("workflow:enter", { detail: { scrollTo: exactTop } })
          );
        }
        if (ratio < 0.1 && wasInView) {
          isInViewRef.current = false;
          window.dispatchEvent(new CustomEvent("workflow:exit", { detail: {} }));
        }
      },
      { threshold: [0, 0.1, 0.5, 0.95, 1.0] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ─── Wheel & Touch Event Binding ──────────────────────────────────────────
  //
  // INPUT LOCK PATTERN:
  //  1. `lockedRef` is the single gate. If true, every wheel/touch event is
  //     ignored immediately.
  //  2. On the first event of a new gesture we set lockedRef = true and fire
  //     the transition.
  //  3. lockedRef is reset to false ONLY inside the GSAP timeline onComplete.
  //     No timers, no delta accumulation, no gesture-settling heuristics.
  //
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isInViewRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      // 🔒 Input lock — block everything while a transition is running
      if (lockedRef.current) return;

      const phase = phaseRef.current;
      const goingDown = e.deltaY > 0;

      // Top boundary: hand off to native scroll
      if (phase === 0 && !goingDown) {
        handleExitUp();
        return;
      }

      // Video playing: skip forward only
      if (isVideoPlayingRef.current) {
        if (goingDown && skipVideoRef.current) {
          lockedRef.current = true;
          skipVideoRef.current();
        }
        return;
      }

      // Bottom boundary exit: no animation to unlock us, so don't lock
      if (phase === 4 && goingDown) {
        handleAdvance();
        return;
      }

      // 🔒 Lock immediately and commit
      lockedRef.current = true;
      if (goingDown) {
        handleAdvance();
      } else {
        handleRetreat();
      }
    };

    // ── Touch support (mobile) ───────────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isInViewRef.current) return;

      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;

      e.preventDefault();
      e.stopPropagation();

      if (lockedRef.current) return;

      const phase = phaseRef.current;
      const goingDown = delta > 0;

      if (phase === 0 && !goingDown) {
        handleExitUp();
        return;
      }

      if (isVideoPlayingRef.current) {
        if (goingDown && skipVideoRef.current) {
          lockedRef.current = true;
          skipVideoRef.current();
        }
        return;
      }

      if (phase === 4 && goingDown) {
        handleAdvance();
        return;
      }

      lockedRef.current = true;
      if (goingDown) {
        handleAdvance();
      } else {
        handleRetreat();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd, { capture: true } as EventListenerOptions);
    };
  }, [handleAdvance, handleRetreat, handleExitUp]);

  // ─── Initial GSAP Setup ───────────────────────────────────────────────────
  useEffect(() => {
    setActiveLayer(null);
    if (gridRef.current) gsap.set(gridRef.current, { opacity: 0 });
    if (glowRef.current) gsap.set(glowRef.current, { opacity: 0 });
    if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 });
    if (progressRef.current) gsap.set(progressRef.current, { height: "0%" });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }
    setTimeout(() => {
      if (hintRef.current) gsap.to(hintRef.current, { opacity: 1, duration: 0.5 });
    }, 1600);
  }, [setActiveLayer]);

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div
      id="workflow-wrapper"
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", background: "#000", height: "100vh", margin: 0, padding: 0 }}
    >
      <section
        ref={sectionRef}
        id="workflow"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
          color: "#fff",
          margin: 0,
          padding: 0,
        }}
      >
        {/* ── Grid BG ── */}
        <div ref={gridRef} className="wf-grid-bg" />

        {/* ── Completion Glow ── */}
        <div ref={glowRef} className="wf-completion-glow" />

        {/* ── TITLE ── */}
        <div ref={titleRef} className="wf-title">
          <h1>Workflow</h1>
          <div className="wf-title-accent" />
          <div className="wf-title-sub">Design · Develop · Deploy · Client Success</div>
        </div>

        {/* ── Left Progress Track ── */}
        <div className="wf-progress-track">
          <div ref={progressRef} className="wf-progress-fill" />
        </div>

        {/* ── Right Step Indicators ── */}
        <div className="wf-indicators">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className={`wf-indicator${i === 0 ? " wf-active" : ""}`}
              ref={(el) => { indicatorRefs.current[i] = el; }}
            >
              {step.number}
            </div>
          ))}
        </div>

        {/* ── Bottom Progress Bar + Label ── */}
        <div className="wf-bottom-bar">
          <div className="wf-stage-info">
            <span className="wf-stage-dot" />
            <span ref={stageLabelRef} className="wf-stage-label">01. DESIGN ARCHITECTURE</span>
          </div>
          <div className="wf-bar-track">
            <div ref={progressBarRef} className="wf-bar-fill" />
          </div>
        </div>

        {/* ── Scroll Hint ── */}
        <div ref={hintRef} className="wf-scroll-hint">
          <span>Scroll to Advance</span>
          <div className="wf-scroll-line" />
        </div>

        {/* ── IMAGE LAYERS ── */}
        {STEPS.map((step, i) => (
          <div
            key={step.id}
            className="wf-media-layer"
            ref={(el) => { imgRefs.current[i] = el; }}
          >
            <img src={step.image} alt={step.title} />
            <div className="wf-img-overlay" />

            <div className="wf-step-content">
              <div className="wf-step-label">
                <span className="wf-step-num" style={{ color: step.accentColor }}>STEP {step.number}</span>
                <div className="wf-step-line" style={{ background: `linear-gradient(90deg, ${step.accentColor}, transparent)` }} />
              </div>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
          </div>
        ))}

        {/* ── VIDEO LAYERS ── */}
        {STEPS.slice(0, 3).map((step, i) => (
          <div
            key={`vid-${step.id}`}
            className="wf-media-layer"
            ref={(el) => { videoLayerRefs.current[i] = el; }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              preload="auto"
              playsInline
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={step.video!} type="video/mp4" />
            </video>
            <div className="wf-video-overlay" />
            <div className="wf-video-badge">
              <span className="wf-vid-dot" />
              <span>Transitioning to {STEPS[i + 1].title}</span>
            </div>
          </div>
        ))}
      </section>
      
      {/* ── Styles ── */}
      <style jsx>{`
        .wf-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(168, 85, 247, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.07) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: perspective(600px) rotateX(55deg) translateY(-80px) scale(1.6);
          transform-origin: center top;
          animation: wfGridFloat 25s linear infinite;
          pointer-events: none;
        }

        @keyframes wfGridFloat {
          0%   { transform: perspective(600px) rotateX(55deg) translateY(0) scale(1.6); }
          100% { transform: perspective(600px) rotateX(55deg) translateY(60px) scale(1.6); }
        }

        .wf-completion-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.18), transparent 65%);
          pointer-events: none;
          z-index: 5;
        }

        .wf-title {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 40;
          pointer-events: none;
        }

        .wf-title h1 {
          font-size: clamp(4rem, 14vw, 11rem);
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #fff;
          text-transform: uppercase;
          line-height: 1;
          font-family: inherit;
          text-shadow: 0 0 80px rgba(168, 85, 247, 0.35);
        }

        .wf-title-accent {
          width: 130px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #a855f7, #06b6d4, transparent);
          margin-top: 1.5rem;
          border-radius: 2px;
        }

        .wf-title-sub {
          margin-top: 1.2rem;
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          font-family: monospace;
        }

        .wf-media-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .wf-media-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .wf-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.6) 100%);
        }

        .wf-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.15), rgba(0,0,0,0.4));
        }

        .wf-step-content {
          position: absolute;
          left: 6%;
          bottom: 14%;
          max-width: 520px;
          z-index: 10;
          padding: 2.25rem 2.5rem;
          background: rgba(8, 8, 14, 0.65);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .wf-step-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .wf-step-num {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-family: monospace;
        }

        .wf-step-line {
          width: 32px;
          height: 1.5px;
          border-radius: 1px;
        }

        .wf-step-content h2 {
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          color: #fff;
          margin: 0 0 1rem 0;
          font-weight: 800;
          line-height: 1.1;
        }

        .wf-step-content p {
          color: rgba(255,255,255,0.72);
          line-height: 1.75;
          font-size: 0.975rem;
          margin: 0;
        }

        .wf-video-badge {
          position: absolute;
          top: 7%;
          left: 6%;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          background: rgba(0,0,0,0.65);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          font-size: 0.75rem;
          font-family: monospace;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
        }

        .wf-vid-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
          animation: wfPulse 1s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes wfPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        .wf-progress-track {
          position: absolute;
          left: 3.5%;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 180px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          z-index: 50;
          overflow: hidden;
        }

        .wf-progress-fill {
          width: 100%;
          height: 0%;
          background: linear-gradient(to bottom, #a855f7, #06b6d4);
          border-radius: 2px;
        }

        .wf-indicators {
          position: absolute;
          right: 3.5%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .wf-indicator {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.35);
          font-size: 0.68rem;
          font-weight: 800;
          font-family: monospace;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(0,0,0,0.25);
          position: relative;
        }

        .wf-indicator.wf-active {
          border-color: #a855f7;
          color: #a855f7;
          background: rgba(168, 85, 247, 0.1);
          box-shadow: 0 0 24px rgba(168, 85, 247, 0.3);
        }

        .wf-indicator.wf-completed {
          border-color: rgba(6, 182, 212, 0.5);
          color: #06b6d4;
        }

        .wf-bottom-bar {
          position: absolute;
          bottom: 6%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          width: min(440px, 85vw);
          padding: 0.85rem 1.25rem;
          background: rgba(6, 6, 12, 0.75);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .wf-stage-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .wf-stage-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #edff66;
          flex-shrink: 0;
          animation: wfPulse 1.4s ease-in-out infinite;
        }

        .wf-stage-label {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: #edff66;
          font-family: monospace;
          font-weight: 700;
          text-transform: uppercase;
        }

        .wf-bar-track {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .wf-bar-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(to right, #a855f7, #06b6d4, #edff66);
          border-radius: 2px;
        }

        .wf-scroll-hint {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          pointer-events: none;
        }

        .wf-scroll-hint span {
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          font-family: monospace;
        }

        .wf-scroll-line {
          width: 1px;
          height: 44px;
          background: linear-gradient(to bottom, #a855f7, transparent);
          position: relative;
          overflow: hidden;
        }

        .wf-scroll-line::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent);
          animation: wfScrollPulse 1.8s ease-in-out infinite;
        }

        @keyframes wfScrollPulse {
          0%   { top: -100%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

export default WorkflowSection;