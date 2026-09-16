import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Quote, ChevronDown, Menu, X, MapPin, Calendar, PhoneCall } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { LandingNoticePopup } from '../components/LandingNoticePopup';

const NAVER_BOOKING_URL = "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84/place/2050622926?searchType=place&lng=129.0357115&lat=35.1045449&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh";
const CONTACT_PHONE = "0507-1380-0028";
const NAVER_PLACE_URL = NAVER_BOOKING_URL;

export const SubstanceLabLandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accordion State for Expertise Section
  const [openAccordion, setOpenAccordion] = useState<number | null>(5); // Default open on the last important item

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // 1. Wrap words in [data-reveal-words]
    const revealWordsElements = root.querySelectorAll('[data-reveal-words]');
    revealWordsElements.forEach((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const nodes: Node[] = [];
      let n: Node | null;
      while ((n = walker.nextNode())) {
        if (n.textContent && n.textContent.trim() !== '') {
          nodes.push(n);
        }
      }
      let i = 0;
      nodes.forEach((tn) => {
        if (!tn.textContent) return;
        const parts = tn.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (part.trim() === '') {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const span = document.createElement('span');
          span.className = 'word-reveal';
          span.style.transitionDelay = `${i * 45}ms`;
          span.textContent = part;
          frag.appendChild(span);
          i++;
        });
        if (tn.parentNode) {
          tn.parentNode.replaceChild(frag, tn);
        }
      });
    });

    // 2. Reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = root.querySelectorAll('[data-reveal], [data-panel-img]');
    revealElements.forEach((el) => io.observe(el));

    // 3. Parallax effect
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let handleScroll: (() => void) | null = null;

    if (!reduced) {
      const layers = root.querySelectorAll<HTMLElement>('[data-parallax]');
      let ticking = false;

      handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            layers.forEach((el) => {
              const rect = el.getBoundingClientRect();
              if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const speed = parseFloat(el.dataset.parallax || '0');
                const isContact = el.closest('#contact') !== null;
                const translateY = (window.scrollY * speed * (isContact ? -0.3 : 1)) % 600;
                el.style.transform = `translateY(${translateY.toFixed(1)}px)`;
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // 4. Cursor image preview
    const preview = root.querySelector<HTMLElement>('#cursor-preview');
    const previewImg = root.querySelector<HTMLImageElement>('#cursor-preview-img');

    const cleanups: (() => void)[] = [];

    if (preview && previewImg && matchMedia('(pointer: fine)').matches) {
      const rows = root.querySelectorAll<HTMLElement>('[data-preview]');
      rows.forEach((row) => {
        const onMouseEnter = () => {
          if (row.dataset.preview) {
            previewImg.src = row.dataset.preview;
          }
          preview.classList.remove('opacity-0', 'scale-90');
          preview.classList.add('opacity-100', 'scale-100');
        };

        const onMouseLeave = () => {
          preview.classList.add('opacity-0', 'scale-90');
          preview.classList.remove('opacity-100', 'scale-100');
        };

        const onMouseMove = (e: MouseEvent) => {
          preview.style.left = `${e.clientX + 28}px`;
          preview.style.top = `${e.clientY - 80}px`;
        };

        row.addEventListener('mouseenter', onMouseEnter);
        row.addEventListener('mouseleave', onMouseLeave);
        row.addEventListener('mousemove', onMouseMove);

        cleanups.push(() => {
          row.removeEventListener('mouseenter', onMouseEnter);
          row.removeEventListener('mouseleave', onMouseLeave);
          row.removeEventListener('mousemove', onMouseMove);
        });
      });
    }

    // 5. Video Controller
    const videoObservers: IntersectionObserver[] = [];
    const videos = root.querySelectorAll<HTMLVideoElement>('video[data-aura-video-preset]');
    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      const preset = video.dataset.auraVideoPreset || 'loop-in-view';

      if (preset === 'hover') {
        const onEnter = () => video.play().catch(() => {});
        const onLeave = () => {
          video.pause();
          video.currentTime = 0;
        };
        video.addEventListener('mouseenter', onEnter);
        video.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          video.removeEventListener('mouseenter', onEnter);
          video.removeEventListener('mouseleave', onLeave);
        });
      } else {
        const vObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.play().catch(() => {});
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.35 }
        );
        vObserver.observe(video);
        videoObservers.push(vObserver);
      }
    });

    return () => {
      io.disconnect();
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      cleanups.forEach((fn) => fn());
      videoObservers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const expertiseItems = [
    {
      id: 0,
      num: '01',
      title: '25년 이상의 심리상담 임상경험',
      desc: '성범죄 및 성문제 행동에 대한 오랜 상담경험을 토대로 사건만이 아니라 행동을 만들어낸 심리적 구조와 재범위험을 함께 분석합니다.'
    },
    {
      id: 1,
      num: '02',
      title: '불법촬영·카촬죄 특화 심리상담',
      desc: '불법촬영 행동에서 나타나는 인지왜곡, 성적 자극, 대상화, 반복행동, 자기합리화와 충동조절 문제를 전문적으로 다룹니다.'
    },
    {
      id: 2,
      num: '03',
      title: '로펌·변호사 사무실과의 긴밀한 협력',
      desc: '오랜 기간 로펌, 법률사무소 및 변호사들과 협력하며 성범죄 형사사건을 상담해 온 경험을 토대로 법률적 상황을 이해하면서 심리상담을 진행합니다.'
    },
    {
      id: 3,
      num: '04',
      title: '형사절차에 대한 실무적 이해',
      desc: '경찰 조사, 검찰 수사, 기소 및 재판 등 형사사건이 진행되는 절차와 각 단계의 특성을 이해하고 그 상황에 맞는 상담과 재범방지교육을 진행합니다.'
    },
    {
      id: 4,
      num: '05',
      title: '전문적인 재범방지 프로그램',
      desc: '인지왜곡 교정, 피해자 관점 이해, 성인지 감수성, 충동조절, 위험상황 분석과 재범방지 행동계획을 개인의 특성에 맞추어 진행합니다.'
    },
    {
      id: 5,
      num: '06',
      title: '전문 양형자료를 위한 변화과정',
      isHighlight: true,
      desc: '단순히 상담을 몇 회 받았는지를 기록하는 데 그치지 않습니다. 사건에 대한 이해, 책임인식, 피해자 관점, 인지왜곡의 변화, 재범위험 관리와 향후 재범방지 계획 등 실제 상담과 교육을 통해 만들어진 변화의 과정이 구체적으로 드러날 수 있도록 체계적으로 정리합니다.'
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#FBFAF7] text-[#12281A] antialiased font-['Inter'] selection:bg-[#42A85D] selection:text-black min-h-screen overflow-x-clip relative">
      {/* ============ FIXED CAPSULE NAV ============ */}
      <nav className="fixed left-1/2 -translate-x-1/2 top-3 sm:top-6 z-[1000] w-[95vw] max-w-5xl font-['Space_Grotesk']">
        <div className="relative flex items-center justify-between bg-white/90 backdrop-blur-md rounded-full px-3.5 sm:px-5 py-2 border border-black/10 shadow-xl shadow-black/10 min-w-0">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 min-w-0 pr-1">
            <span className="grid grid-cols-3 gap-[2.5px] shrink-0">
              <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-black/30"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-black/30"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-black/30"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
            </span>
            {/* Mobile Title (2 lines, controlled) */}
            <div className="flex flex-col justify-center text-[10px] xs:text-[11px] sm:text-[12px] font-semibold leading-[1.18] text-[#12281A] md:hidden">
              <span className="whitespace-nowrap">부산불법촬영·카촬죄</span>
              <span className="whitespace-nowrap">재범방지 심리상담센터</span>
            </div>
            {/* Desktop Title (1 line) */}
            <span className="hidden md:inline font-semibold text-sm tracking-tight whitespace-nowrap text-[#12281A]">
              부산불법촬영·카촬죄 재범방지 심리상담센터
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 text-sm text-black/60 shrink-0">
            <a href="#studio" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300 whitespace-nowrap">
              센터소개
            </a>
            <a href="#projects" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300 whitespace-nowrap">
              전문영역
              <sup className="text-[#42A85D] ml-0.5 text-xs">25+</sup>
            </a>
            <a href="#notes" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300 whitespace-nowrap">
              재범방지
            </a>
            <a href="#location" className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors duration-300 whitespace-nowrap">
              오시는길
            </a>
          </div>

          {/* Right Actions (CTA + Mobile Hamburger Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a href={NAVER_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-[#1E4D33] hover:bg-[#2A6647] active:scale-95 text-white text-xs sm:text-sm font-medium px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 whitespace-nowrap shadow-md shadow-[#1E4D33]/20">
              상담신청
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-[#12281A] transition-colors cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown Panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 mt-2.5 bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-black/10 shadow-2xl shadow-black/20 flex flex-col gap-1 z-[1001]"
              >
                {[
                  { label: '센터소개', href: '#studio' },
                  { label: '전문영역', href: '#projects', badge: '18+' },
                  { label: '재범방지', href: '#notes' },
                  { label: '상담문의', href: '#contact' },
                  { label: '오시는길', href: '#location' }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-[#1E4D33]/10 text-[#12281A] font-medium text-sm transition-colors whitespace-nowrap"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold text-white bg-[#42A85D] px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
                <a
                  href={NAVER_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full bg-[#1E4D33] hover:bg-[#2A6647] text-white text-center font-medium text-sm py-3 rounded-xl shadow-lg shadow-[#1E4D33]/30 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  상담 신청하기
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header id="top" className="relative min-h-[100dvh] overflow-hidden flex flex-col justify-between">
        {/* cinematic background video */}
        <div className="absolute inset-0" data-parallax="0.15">
          <video
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/9109ecbb-cdc4-4815-981e-2ea83be13765/1782999286314-2d8dfd1d-f5c0-4ad1-81a1-2055a64391da.mp4"
            poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f8e75ffd-3780-45d5-a852-838b5e33ede8_3840w.webp"
            data-aura-generated-video="true"
            data-aura-video-preset="loop-in-view"
            muted
            playsInline
            preload="metadata"
            loop
            className="w-full h-full object-cover scale-110 opacity-90"
          ></video>
        </div>
        {/* floating translucent forms */}
        <div className="absolute inset-0 pointer-events-none" data-parallax="0.3">
          <div className="drift-a absolute top-[12%] left-[8%] w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-sm border border-white/20 shadow-[inset_0_0_60px_rgba(255,255,255,0.25)]"></div>
          <div className="drift-b absolute top-[28%] right-[10%] w-24 h-24 sm:w-44 sm:h-44 rounded-[40%] bg-gradient-to-tl from-[#42A85D]/25 to-white/10 backdrop-blur-md border border-white/15 shadow-[inset_0_0_40px_rgba(66,168,93,0.3)]"></div>
          <div className="drift-c absolute top-[52%] left-[38%] w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-white/20 to-transparent backdrop-blur-[2px] border border-white/25"></div>
          <div className="drift-b absolute top-[8%] left-[55%] w-12 h-12 sm:w-20 sm:h-20 rounded-[45%] bg-white/10 backdrop-blur-sm border border-white/20"></div>
          <div className="drift-a absolute bottom-[38%] right-[28%] w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#42A85D]/20 to-transparent backdrop-blur-sm border border-white/10"></div>
        </div>
        {/* readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBFAF7] via-[#FBFAF7]/60 to-[#FBFAF7]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBFAF7]/70 via-transparent to-[#FBFAF7]/30"></div>

        {/* manifesto */}
        <div className="relative z-10 flex-1 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-10 pb-[22vw] sm:pb-[18vw] lg:pb-[15vw] pt-32 sm:pt-40">
            <div className="max-w-2xl lg:max-w-4xl" data-reveal="">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#1E4D33] font-medium mb-5 sm:mb-8" data-reveal="">
                BUSAN · DIGITAL SEXUAL OFFENSE · 25+ YEARS
              </p>
              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] leading-[1.08] sm:leading-[1.02] text-[#12281A] font-light tracking-tighter mb-6 sm:mb-8" data-reveal-words="true">
                <span className="inline-block sm:whitespace-nowrap">25년 이상의 노하우,</span>
                <br />
                <span className="inline-block sm:whitespace-nowrap">법적 절차의 이해,</span>
                <br />
                변화를 보여주는{' '}
                <em className="font-['Instrument_Serif'] italic font-normal inline-block pb-[0.05em]">
                  전문 양형자료.
                </em>
              </h1>
              <p className="text-sm sm:text-base text-black/70 tracking-wide leading-relaxed mb-8 sm:mb-10 max-w-xl" data-reveal="" style={{ transitionDelay: '550ms' }}>
                불법촬영·카촬죄에 특화된 재범방지 심리상담과 전문교육.
                <br className="hidden sm:inline" />
                사건 이후의 실질적인 변화를 만들고 그 과정을 체계적으로 기록합니다.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6" data-reveal="" style={{ transitionDelay: '700ms' }}>
                <a href={NAVER_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 bg-[#1E4D33] hover:bg-[#2A6647] active:scale-95 text-white font-medium text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-[#1E4D33]/30 hover:shadow-2xl hover:shadow-[#1E4D33]/40">
                  상담 시작하기
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="#projects" className="text-xs sm:text-sm text-black/60 hover:text-black transition-colors duration-300 border-b border-black/20 hover:border-black pb-0.5">
                  불법촬영 상담 · 재범방지교육 · 양형자료
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* giant cropped background wordmark */}
        <div className="absolute -bottom-[4vw] left-1/2 -translate-x-1/2 w-full z-[5] pointer-events-none overflow-hidden" data-parallax="0.5">
          <p className="font-['Space_Grotesk'] text-[22vw] sm:text-[19.5vw] leading-none text-center text-[#1E4D33]/10 whitespace-nowrap select-none font-light tracking-tighter" style={{ WebkitTextStroke: '1px rgba(30, 77, 51, 0.12)' }}>
            CHANGE
          </p>
        </div>
      </header>

      {/* ============ SELECTED WORK (전문 영역) ============ */}
      <section id="projects" className="relative pt-16 sm:pt-36 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex items-end justify-between mb-8 sm:mb-14" data-reveal="">
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-light tracking-tighter" data-reveal-words="true">
              전문{' '}
              <em className="font-['Instrument_Serif'] italic font-normal">영역</em>
            </h2>
            <p className="hidden sm:block text-sm text-black/40">18+ YEARS OF EXPERTISE</p>
          </div>
        </div>

        {/* panel 01 - Main Giant Card */}
        <div className="max-w-7xl mx-auto px-5 sm:px-10 mb-6 sm:mb-10">
          <div className="relative rounded-2xl overflow-hidden min-h-[360px] sm:aspect-[21/9] shadow-2xl shadow-black/15 flex flex-col justify-end">
            <video
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/9109ecbb-cdc4-4815-981e-2ea83be13765/1782999930583-dfa026f6-bc70-4ea9-b421-6fd67b3eff53.mp4"
              poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/0686272e-5c53-4301-bce5-b1a86a762fa4/1600w.jpg"
              data-aura-generated-video="true"
              data-aura-video-preset="loop-in-view"
              muted
              playsInline
              preload="metadata"
              loop
              aria-label="전문 양형자료 지원"
              data-panel-img=""
              className="absolute inset-0 w-full h-full object-cover"
            ></video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between w-full gap-4">
              <div data-reveal="">
                <p className="text-xs text-[#42A85D] font-medium mb-2">01</p>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-light tracking-tighter text-white">
                  전문 양형자료
                </h3>
                <p className="text-sm sm:text-base text-white/80 mt-2 max-w-xl leading-relaxed">
                  상담 횟수만 기록하는 자료가 아니라 사건 이후 무엇을 이해하고 어떻게 변화했는지가 구체적으로 드러날 수 있도록 상담과 교육과정을 설계합니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-white/80" data-reveal="" style={{ transitionDelay: '150ms' }}>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  COUNSELING
                </span>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  EDUCATION
                </span>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  CHANGE RECORD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* panels 02 + 03 */}
        <div className="max-w-7xl mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mb-6 sm:mb-10">
          <div className="lg:col-span-7 lg:-mt-4 relative rounded-2xl overflow-hidden min-h-[340px] sm:aspect-[4/3] shadow-2xl shadow-black/15 flex flex-col justify-end">
            <img
              data-panel-img=""
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5f870fa0-1fa4-4845-bf04-6732d79259fa_1600w.webp"
              alt="불법촬영 전문 심리상담"
              className="absolute inset-0 w-full h-full object-cover object-[50%_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-6 sm:p-8" data-reveal="" style={{ transitionDelay: '120ms' }}>
              <p className="text-xs text-[#42A85D] font-medium mb-2">02</p>
              <h3 className="font-['Space_Grotesk'] text-2xl font-light tracking-tighter text-white">
                불법촬영 전문 심리상담
              </h3>
              <p className="text-sm sm:text-base text-white/80 mt-2 max-w-sm leading-relaxed">
                불법촬영·카촬 행동으로 이어진 인지왜곡, 성적 충동, 반복행동과 심리적 원인을 분석합니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/80 mt-4">
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  PSYCHOLOGY
                </span>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  ANALYSIS
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:mt-24 relative rounded-2xl overflow-hidden min-h-[340px] sm:aspect-[4/5] lg:aspect-auto shadow-2xl shadow-black/15 flex flex-col justify-end">
            <img
              data-panel-img=""
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/750647bd-8e6a-40c8-a21a-8398b7c09a75_3840w.png"
              alt="재범방지 전문교육"
              className="absolute inset-0 w-full h-full object-cover object-[50%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="relative z-10 p-6 sm:p-8" data-reveal="" style={{ transitionDelay: '240ms' }}>
              <p className="text-xs text-[#42A85D] font-medium mb-2">03</p>
              <h3 className="font-['Space_Grotesk'] text-2xl font-light tracking-tighter text-white">
                재범방지 전문교육
              </h3>
              <p className="text-sm sm:text-base text-white/80 mt-2 max-w-sm leading-relaxed">
                성인지 감수성, 피해자 관점, 충동조절, 위험상황 관리와 재범방지 행동계획을 교육합니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/80 mt-4">
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  EDUCATION
                </span>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  PREVENTION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* panel 04, full bleed */}
        <div className="relative overflow-hidden min-h-[340px] sm:aspect-[21/9] flex flex-col justify-end">
          <img
            data-panel-img=""
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746406/443092bbe8a6d721224eb86297939438_senwv4.png"
            alt="로펌 변호사 협력 및 형사절차 이해"
            className="absolute inset-0 w-full h-full object-cover object-[50%_40%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 pb-8 sm:pb-12 pt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div data-reveal="">
                <p className="text-xs text-[#42A85D] font-medium mb-2">04</p>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-light tracking-tighter text-white">
                  로펌 · 변호사 협력 및 형사절차 이해
                </h3>
                <p className="text-sm sm:text-base text-white/80 mt-2 max-w-md leading-relaxed">
                  경찰 조사, 검찰 수사, 재판 등 형사사건의 진행 과정과 법률적 맥락을 깊이 이해하고 실질적인 변화 과정의 기록을 준비합니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-white/80" data-reveal="" style={{ transitionDelay: '150ms' }}>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  LEGAL COLLABORATION
                </span>
                <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                  PROCESS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FULL WIDTH IMAGE (노트 / 스튜디오 기록 사진) ============ */}
      <section className="relative overflow-hidden min-h-[340px] sm:aspect-[21/9] bg-[#12281A] flex flex-col justify-end">
        <img
          data-panel-img=""
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop"
          alt="상담 기록과 노트"
          className="absolute inset-0 w-full h-full object-cover opacity-80 object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-5 sm:px-10 pb-8 sm:pb-12 pt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div data-reveal="">
              <p className="text-xs text-[#42A85D] font-medium mb-2">CLINICAL EXPERIENCE</p>
              <h3 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-light tracking-tighter text-white">
                25년 이상
                <br />
                심리상담 임상경험
              </h3>
              <p className="text-sm sm:text-base text-white/70 mt-3 max-w-md leading-relaxed">
                다양한 성범죄 사건의 상담 경험을 토대로 사건과 심리, 재범위험과 변화과정을 함께 살펴봅니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/70" data-reveal="" style={{ transitionDelay: '150ms' }}>
              <span className="border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                25+ YEARS OF CLINICAL EXPERIENCE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STUDIO METHOD (연한 녹색 SECTION) ============ */}
      <section id="studio" className="bg-[#E4EFDA] text-black py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="max-w-3xl mb-12 sm:mb-20" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-4 sm:mb-6">
              WHAT WE DO
            </p>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-6xl leading-[1.1] sm:leading-[1.05] font-light tracking-tighter" data-reveal-words="true">
              상담에서 끝나지 않습니다.
              <br />
              <em className="font-['Instrument_Serif'] italic font-normal">
                변화가 자료가 되기까지.
              </em>
            </h2>
            <p className="text-base sm:text-lg text-black/70 mt-5 sm:mt-6 max-w-2xl leading-relaxed">
              양형자료에서 중요한 것은 단순히 상담을 받았다는 사실만이 아닙니다.
              <br />
              <strong className="font-semibold text-[#1E4D33]">사건을 어떻게 이해했고, 무엇을 변화시키고 있으며, 재범을 예방하기 위해 어떤 노력을 하고 있는가.</strong>
              <br />
              그 과정을 전문적으로 만들어가는 것이 중요합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            <div data-reveal="">
              <div className="rounded-xl overflow-hidden aspect-[3/2] mb-5 sm:mb-6 shadow-xl shadow-black/10">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
                  alt="심리적 원인 분석"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <p className="text-xs text-black/40 font-medium mb-1.5 sm:mb-2">A</p>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl mb-2 sm:mb-3 font-light tracking-tighter">
                심리적 원인 분석
              </h3>
              <p className="text-sm sm:text-base text-black/60 leading-relaxed">
                불법촬영 행동으로 이어진 인지왜곡, 충동, 정서, 반복행동과 위험요인을 구체적으로 분석합니다.
              </p>
            </div>
            <div data-reveal="" style={{ transitionDelay: '120ms' }}>
              <div className="rounded-xl overflow-hidden aspect-[3/2] mb-5 sm:mb-6 shadow-xl shadow-black/10">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
                  alt="실제 변화와 재범방지"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <p className="text-xs text-black/40 font-medium mb-1.5 sm:mb-2">B</p>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl mb-2 sm:mb-3 font-light tracking-tighter">
                실제 변화와 재범방지
              </h3>
              <p className="text-sm sm:text-base text-black/60 leading-relaxed">
                피해자 관점, 책임인식, 성인지 감수성, 충동조절과 재범방지 행동계획을 상담과 교육을 통해 만들어갑니다.
              </p>
            </div>
            <div data-reveal="" style={{ transitionDelay: '240ms' }}>
              <div className="rounded-xl overflow-hidden aspect-[3/2] mb-5 sm:mb-6 shadow-xl shadow-black/10">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop"
                  alt="변화과정의 전문적 기록"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <p className="text-xs text-black/40 font-medium mb-1.5 sm:mb-2">C</p>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl mb-2 sm:mb-3 font-light tracking-tighter">
                변화과정의 전문적 기록
              </h3>
              <p className="text-sm sm:text-base text-black/60 leading-relaxed">
                상담 및 교육과정에서 나타난 인식과 행동의 변화를 체계적으로 정리하여 상담·교육 관련 자료를 준비할 수 있도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES / EXPERTISE (DARK GREEN SECTION) ============ */}
      <section id="notes" className="bg-[#1E4D33] py-16 sm:py-36 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#42A85D] font-medium mb-8 sm:mb-12" data-reveal="">
            EXPERTISE
          </p>
          <div data-reveal="" className="divide-y divide-white/10">
            {expertiseItems.map((item) => {
              const isOpen = openAccordion === item.id;
              return (
                <div
                  key={item.id}
                  className={`py-5 sm:py-8 transition-colors duration-500 cursor-pointer ${
                    item.isHighlight ? 'bg-white/5 px-4 sm:px-6 rounded-xl border border-[#42A85D]/30 my-3' : 'hover:border-[#42A85D]/50'
                  }`}
                  onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-['Space_Grotesk'] text-lg sm:text-2xl md:text-3xl font-light tracking-tighter transition-all duration-300 ${
                      isOpen ? 'text-white translate-x-1 sm:translate-x-2' : 'text-white/80 hover:text-white'
                    } ${item.isHighlight ? 'text-[#42A85D] font-normal' : ''}`}>
                      {item.title}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-xs text-white/40 group-hover:text-[#42A85D]">
                        {item.num}
                      </span>
                      <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#42A85D]' : ''}`} />
                    </div>
                  </div>
                  {isOpen && (
                    <div className="mt-3 pt-2 text-sm sm:text-base text-white/80 leading-relaxed font-normal animate-slide-up max-w-3xl">
                      {item.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* floating cursor preview */}
        <div
          id="cursor-preview"
          className="hidden lg:block fixed z-40 pointer-events-none w-56 aspect-[4/3] rounded-lg overflow-hidden opacity-0 scale-90 transition-all duration-300 ease-out shadow-2xl shadow-black/50"
        >
          <img
            id="cursor-preview-img"
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ============ PROOF / EXPERT QUOTE ============ */}
      <section className="bg-[#FBFAF7] py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1" data-reveal="">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/15 bg-slate-200 max-w-md mx-auto lg:max-w-none">
              <img
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971435/be1df2d6-1459-41c0-9573-25ead7c90602_wuzimg.png"
                alt="대표 원장 윤영준"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2" data-reveal="">
            <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#1E4D33] mb-6 sm:mb-8" />
            <blockquote className="font-['Space_Grotesk'] text-xl sm:text-3xl md:text-4xl leading-[1.3] text-[#12281A] font-light tracking-tighter" data-reveal-words="true">
              “양형자료의 핵심은 서류의 양이 아니라, 사건 이후 실제로 무엇을 이해했고 어떻게 달라지고 있는지가 드러나는 것입니다.”
            </blockquote>
            <div className="mt-6 sm:mt-8" data-reveal="" style={{ transitionDelay: '300ms' }}>
              <p className="text-base sm:text-lg font-semibold text-[#12281A]">대표 원장 윤영준</p>
              <p className="text-xs sm:text-sm text-black/50 mt-1">심리상담 25년 이상 · 재범방지교육 · 법원 제출 상담의견</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#1E4D33] font-medium mt-2 sm:mt-3">SEXUAL OFFENSE COUNSELING SPECIALIST</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GIANT TYPOGRAPHY SECTION ============ */}
      <section className="relative overflow-hidden py-6 sm:py-12 bg-[#FBFAF7] overflow-x-clip">
        <div className="overflow-hidden select-none pointer-events-none" data-parallax="0.35">
          <p className="font-['Space_Grotesk'] text-[12vw] sm:text-[11vw] leading-[0.85] text-[#1E4D33]/10 whitespace-nowrap text-center font-light tracking-tighter">
            MAKE CHANGE VISIBLE
          </p>
        </div>
      </section>

      {/* ============ FINAL CONTACT SECTION ============ */}
      <section id="contact" className="relative overflow-hidden bg-[#FBFAF7] pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-3 sm:mb-4">START HERE</p>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl leading-[1.1] mb-5 sm:mb-6 font-light tracking-tighter" data-reveal-words="true">
              변화는
              <br />
              <em className="font-['Instrument_Serif'] italic font-normal">
                기록되어야 합니다.
              </em>
            </h2>
            <p className="text-sm sm:text-base text-black/70 max-w-md mb-6 sm:mb-8 leading-relaxed">
              사건을 없었던 일로 만들 수는 없습니다.
              <br />
              그러나 사건 이후 자신의 행동을 어떻게 이해하고 어떤 노력을 통해 변화하고 있는지는 지금부터 만들어갈 수 있습니다.
              <br /><br />
              불법촬영 재범방지 심리상담부터 상담·교육 과정 및 양형자료 관련 상담까지 현재 상황에 맞게 안내해드립니다.
            </p>
            <a href="tel:0507-1380-0028" className="group inline-flex items-center gap-2 text-sm sm:text-base text-black font-semibold border-b border-black/20 hover:border-[#1E4D33] pb-1 transition-colors duration-300">
              전화 문의: 0507-1380-0028
              <ArrowUpRight className="w-4 h-4 text-[#1E4D33] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-7" data-reveal="">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-black/5 aspect-[3/2] bg-white group">
              <img
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746452/fff22c558386aeb6f29c77afcb70056b_gqmw9u.png"
                alt="변화는 기록되어야 합니다"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOCATION SECTION (오시는 길) ============ */}
      <section id="location" className="relative overflow-hidden bg-white border-t border-black/10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#059669]" />
                    센터 위치 안내
                  </h3>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                    <div>
                      <p className="text-sm text-slate-400 mb-1 font-bold">📍 주소</p>
                      <p className="text-lg font-bold text-slate-900">부산광역시 중구 해관로 64, 4층 403-A02호 (중앙동4가, 원빌딩)</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1 font-bold">문의 및 예약</p>
                      <p className="text-2xl font-bold text-[#059669]">{CONTACT_PHONE}</p>
                    </div>
                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                      <a 
                        href={NAVER_PLACE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-8 py-4 bg-[#03C75A] text-white rounded-2xl font-bold text-center hover:bg-[#02b351] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-50"
                      >
                        <Calendar className="w-5 h-5" />
                        네이버 상담 예약
                      </a>
                      <a 
                        href={`tel:${CONTACT_PHONE}`}
                        className="flex-1 px-8 py-4 bg-[#059669] text-white rounded-2xl font-bold text-center hover:bg-[#047857] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-50"
                      >
                        <PhoneCall className="w-5 h-5" />
                        전화 문의하기 ({CONTACT_PHONE})
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-[#059669] rounded-full" />
                    교통편 및 오시는 길 안내
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {/* 지하철 이용 */}
                    <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-2 text-base">
                        <span>🚇</span> 지하철 이용
                      </p>
                      <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-1 pl-6">
                        <p>• 부산도시철도 1호선 중앙역</p>
                        <p>• 13번 출구에서 도보 약 2~3분</p>
                        <p>• 출구에서 해관로 방향으로 직진하시면 원빌딩 4층 403-A02호에 위치해 있습니다.</p>
                      </div>
                    </div>

                    {/* 버스 이용 */}
                    <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-2 text-base">
                        <span>🚌</span> 버스 이용
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium pl-6">
                        중앙역, 중앙동, 부산세관 정류장에서 하차 후 도보 약 3분
                      </p>
                    </div>

                    {/* 자가용 이용 */}
                    <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-2 text-base">
                        <span>🚗</span> 자가용 이용
                      </p>
                      <div className="text-sm text-slate-600 leading-relaxed font-medium space-y-1.5 pl-6">
                        <p>• 내비게이션에 '부산광역시 중구 해관로 64' 또는 '원빌딩'을 검색해 주세요.</p>
                        <p>• 건물 인근 공영주차장 및 민영주차장을 이용하실 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[500px] lg:h-auto min-h-[400px] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
                <iframe 
                  src="https://maps.google.com/maps?q=부산광역시%20중구%20해관로%2064&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-[#FBFAF7] border-t border-black/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10 sm:py-14 space-y-8">
          {/* Top Row: Brand & Nav Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-black/10">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <span className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1.5 rounded-lg bg-black/[0.03] border border-black/5 shrink-0">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#42A85D]"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/70"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/30"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/70"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/30"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/70"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/30"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/70"></span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#42A85D]"></span>
              </span>
              <span className="font-['Space_Grotesk'] font-bold text-base sm:text-lg tracking-tight text-slate-900">
                부산불법촬영·카촬죄 재범방지 심리상담센터
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-black/60 font-medium">
              <a href="#studio" className="hover:text-black transition-colors duration-300">
                센터소개
              </a>
              <a href="#projects" className="hover:text-black transition-colors duration-300">
                전문영역
              </a>
              <a href="#notes" className="hover:text-black transition-colors duration-300">
                재범방지
              </a>
              <a href="#contact" className="hover:text-black transition-colors duration-300">
                상담신청
              </a>
              <a href="#location" className="hover:text-black transition-colors duration-300">
                오시는길
              </a>
            </div>
          </div>

          {/* Middle Row: Description & Address Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-medium break-keep">
                부산지역에서 성범죄 심리 상담과 교정 치료에 특화된 최고 수준의 전문 상담 기관입니다. 철저한 비밀 원칙과 체계적인 상담 과정을 통해 재범 방지를 위한 변화를 돕습니다.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-2 text-xs sm:text-sm text-black/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1E4D33] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-black/90 font-semibold">주소 :</strong> 부산광역시 중구 해관로 64, 4층 403-A02호 (중앙동4가, 원빌딩)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#1E4D33] shrink-0" />
                <span>
                  <strong className="text-black/90 font-semibold">문의 및 예약 :</strong> {CONTACT_PHONE}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Copyright */}
          <div className="pt-6 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] sm:text-xs text-black/45">
            <p>© 2025 부산불법촬영·카촬죄 재범방지 심리상담센터. All rights reserved.</p>
            <p>※ 모든 상담 및 방문 정보는 100% 철저한 비밀보장 원칙에 따라 보호됩니다.</p>
          </div>
        </div>
      </footer>

      {/* Layer Notice Popup */}
      <LandingNoticePopup />
    </div>
  );
};

export default SubstanceLabLandingPage;

