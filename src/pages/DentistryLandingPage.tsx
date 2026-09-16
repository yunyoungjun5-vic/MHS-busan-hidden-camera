import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  MapPin, 
  PhoneCall, 
  Menu, 
  X,
  XCircle, 
  Calendar, 
  CheckCircle, 
  ShieldCheck, 
  Mail, 
  Clock, 
  ArrowRight, 
  Facebook,
  Scale,
  Users,
  Zap,
  Lock,
  Star,
  MessageSquare,
  FileText,
  BrainCircuit,
  Trophy,
  Shield,
  AlertCircle,
  Gavel,
  ClipboardCheck,
  AlertTriangle,
  Info,
  Smartphone,
  ChevronDown,
  Globe,
  Monitor,
  GraduationCap,
  ClipboardList,
  Contact2,
  CheckCircle2,
  Lock as LockIcon,
  Search,
  BookOpen,
  RefreshCw,
  Gavel as GavelIcon,
  Shield as ShieldIcon,
  PenTool,
  FileCheck,
  BarChart3,
  HelpCircle,
  Heart,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import PartnerTeaser from '../components/PartnerTeaser';
import MediaAppearanceTeaser from '../components/MediaAppearanceTeaser';
import BroadcastMarquee from '../components/BroadcastMarquee';
import { NAV_STRUCTURE } from '../App';

const NAVER_PLACE_URL = "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh";
const CONTACT_PHONE = "0507-1380-0028";

const LogoIcon = ({ className }: { className?: string }) => (
  <Scale className={className} />
);

const DentistryLandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const navItems = [
    { name: "센터 소개", href: "#about" },
    { name: "전문 프로그램", href: "#services" },
    { name: "전문가 그룹", href: "#experts" },
    { name: "양형자료 안내", href: "#legal" }
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="antialiased selection:bg-emerald-200 selection:text-emerald-900 bg-slate-50 text-slate-600">
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky md:p-4 w-full z-50 pt-3 pr-3 pb-3 pl-3 top-0 right-0 left-0">
        <nav className="mx-auto max-w-7xl rounded-2xl backdrop-blur-xl border shadow-lg px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-300 bg-white/90 border-white/20 shadow-slate-200/50">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:bg-emerald-600 transition-colors text-white">
              <LogoIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">부산성범죄심리상담센터</span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase mt-0.5">Busan Counseling Center</span>
            </div>
          </a>

          {/* Menu (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-bold transition-colors text-slate-600 hover:text-emerald-600 break-keep">
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0507-1380-0028" className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
              <PhoneCall className="w-4 h-4" />
              0507-1380-0028
            </a>
            <a href={NAVER_PLACE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-500 text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:bg-emerald-600 text-white">
              상담 예약하기
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="lg:hidden text-slate-900 p-1 relative z-50">
            {isMobileMenuOpen ? <XCircle className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 p-6"
            >
              {navItems.map((item) => (
                <a key={item.name} href={item.href} onClick={toggleMenu} className="text-2xl font-bold text-slate-900">{item.name}</a>
              ))}
              
              <hr className="w-12 border-slate-200" />
              
              <a href="tel:0507-1380-0028" className="flex items-center gap-2 text-xl font-bold text-emerald-600">
                <PhoneCall />
                0507-1380-0028
              </a>
              <a href={NAVER_PLACE_URL} target="_blank" rel="noopener noreferrer" onClick={toggleMenu} className="w-full max-w-xs text-center bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20">
                상담 예약하기
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 0. TOP BAR (Moved to Hero boundary) */}
      <div className="bg-emerald-950 text-emerald-50 text-xs font-medium py-2.5 px-4 border-b border-emerald-900 shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Bell className="text-emerald-400 w-3.5 h-3.5" />
              성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>실시간 1:1 비대면 상담 가능</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-32 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1777958782/8be3688f-db30-4faf-a837-2ab54d9a5272_de9aaa.png" 
            alt="Counseling Center" 
            className="w-full h-full object-cover object-[80%_20%] sm:object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 lg:via-slate-900/50 to-slate-900/30 lg:to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-emerald-50 tracking-tight">성범죄 특화 심리치료 전문 기관</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-white break-keep">
              부산 성범죄 특화 심리상담<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 font-medium">
                재범방지 교정치료 전문기관
              </span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-medium leading-relaxed max-w-lg break-keep">
              부산 지역 성범죄 사건 이후의 상담 경험이 풍부한 전문 심리상담 기관입니다.<br className="hidden sm:block" /> 
              상담 과정과 변화를 객관적으로 기록하여 양형자료 준비에도 도움을 드립니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-2">
              <a href={NAVER_PLACE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-emerald-500 text-base font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 hover:bg-emerald-600 text-white">
                상담 예약하기
                <Calendar className="w-5 h-5" />
              </a>
              <a href="tel:0507-1380-0028" className="inline-flex justify-center items-center gap-2 border-2 text-base font-bold px-8 py-4 rounded-full transition-all bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 border-white/20 break-keep text-center">
                전화상담 문의 0507-1380-0028
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <Link to="/legal/info" className="flex items-center gap-2 text-white/90 group">
                <CheckCircle className="text-emerald-400 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-base font-bold">양형자료 안내</span>
              </Link>
              <Link to="/legal/education/prevention" className="flex items-center gap-2 text-white/90 group">
                <CheckCircle className="text-emerald-400 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-base font-bold">재범방지교육 안내</span>
              </Link>
              <Link to="/remote" className="flex items-center gap-2 text-white/90 group">
                <CheckCircle className="text-emerald-400 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-base font-bold">비대면 프로그램 안내</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MEDIA BROADCAST BANNER */}
      <BroadcastMarquee />

      {/* 3. PHILOSOPHY SECTION */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
                  <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] shadow-xl grayscale-[0.3] hover:grayscale-0 transition-all duration-500" alt="Consulting" />
                  <div className="p-6 md:p-8 bg-emerald-600 rounded-[32px] text-white shadow-lg">
                    <h4 className="text-2xl md:text-3xl font-bold mb-2">20+</h4>
                    <p className="text-emerald-50 text-xs md:text-sm font-bold uppercase tracking-widest">상담 특화 경력</p>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="p-6 md:p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                    <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">12,000 +</h4>
                    <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest">누적 상담 케이스</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] shadow-xl grayscale-[0.3] hover:grayscale-0 transition-all duration-500" alt="Team Work" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">Our Philosophy</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight break-keep">
                우리는 왜 <br />
                성범죄 심리에 <br />
                <span className="text-emerald-500">집중하는가?</span>
              </h2>
              <p className="text-lg font-bold text-emerald-600 mb-8 break-keep">재범 방지는 가장 근본적인 피해자 보호입니다</p>
              
              <div className="space-y-8 mb-10">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 break-keep">단순한 처벌만으로는 문제 행동이 근본적으로 해결되지 않습니다</h4>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed break-keep">
                      문제를 일으킨 심리 구조를 이해하고 교정하여 같은 행동이 반복되지 않도록 하는 것이 우리 센터가 존재하는 이유입니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 break-keep">우리는 변화의 가능성을 중요하게 봅니다</h4>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed break-keep">
                      우리는 내담자를 비난하는 기관이 아닙니다. 내담자가 자신의 문제 행동을 이해하고 건강한 사회 구성원으로 복귀할 수 있도록 돕는 전문 심리 상담 기관입니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 break-keep">임상 경험과 객관적 데이터 기반 상담</h4>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed break-keep">
                      수많은 상담 사례를 통해 축적된 임상 경험과 심리 평가 도구를 활용하여 문제 행동을 분석하고 효과적인 교정 방향을 제시합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <Link to="/about/intro" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all group">
                  센터 소개 더보기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
              전문 <span className="text-emerald-600">특화 프로그램</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium break-keep">
              단순한 대화 상담을 넘어 과학적 근거에 기반한 구조적 프로그램을 통해 실질적인 변화를 돕습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "성범죄 가해자 상담", desc: "사건 전 불안, 충동조절 실패 분석 및 잘못된 인지 체계의 근본적 교정" },
              { icon: Zap, title: "디지털 성범죄 교정", desc: "도파민-충동 루프 해체 및 디지털 성폭력의 중독성을 극복하는 전문 개입" },
              { icon: Lock, title: "성도착 행동 교정", desc: "공연음란, 특정행동 집착 등 왜곡된 성적 충동의 구조적 해체와 조절 훈련" },
              { icon: ShieldCheck, title: "양형자료 심리평가", desc: "법원 및 수사기관 제출을 위한 재범 위험성 및 인지왜곡 정밀 평가/소견서" }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 font-medium break-keep">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERTS SECTION */}
      <section id="experts" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative background text */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
          <div className="text-[20vw] font-black uppercase leading-none font-display text-emerald-900">PROFESSIONAL</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-black tracking-widest uppercase text-sm mb-6 block font-display">Expert Group</span>
              <h2 className="text-4xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight font-display">
                부산 최고 수준의 <br />
                <span className="text-emerald-500">성범죄 특화</span> 전문가
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed font-bold break-keep">
                단순 심리상담사가 아닌, 범죄 심리와 행동 교정에 특화된 임상 전문가들이 당신의 변화를 책임집니다.
              </p>
            </div>
            <Link to="/about/experts" className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm">
              전체 전문가 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                name: "윤영준 원장", 
                role: "대표원장 / 상담학 박사", 
                tags: ["성범죄 교정 특화", "국제 임상최면치료사"],
                desc: "동국대 심리상담 석사 및 로드랜드대 상담학 박사 학위를 보유한 심리치료 전문가입니다. 미국최면사고시위원회(ACHE) 국제 의학최면치료사로서 뇌인지과학과 심리치료를 결합한 고도의 교정 프로그램을 운영합니다.",
                image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346422/ChatGPT_Image_2026%EB%85%84_3%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_10_34_52_ydee1z.png" 
              },
              { 
                name: "소윤주 부원장", 
                role: "부원장 / 기능의학·최면 전문가", 
                tags: ["기능의학", "최면전문가", "성상담 전문가"],
                desc: "원광대 의대 출신의 기능의학 전문가이자 최면 치료 전문가입니다. 몸과 마음의 통합적 치유를 위해 기능의학, 명상, 심신정화 식이요법을 결합한 독창적인 MHS 프로그램을 운영합니다.",
                image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774347139/KakaoTalk_20240521_123825759_gslvpg.jpg" 
              },
              { 
                name: "허선무 변호사", 
                role: "법무법인 소울 변호사 / 성범죄 전문 변호사", 
                tags: ["사법시험 54회", "성범죄 전문"],
                desc: "사법시험 54회 합격 및 사법연수원(44기)을 수료한 법률 전문가입니다. 법무법인 소울 변호사로서 창원지방법원 조정위원, 창원지방검찰청 형사조정위원 등을 역임하며 전문 변호사로 활동하고 있습니다.",
                image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346463/member_view23_nnxzhn.jpg" 
              }
            ].map((expert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={expert.image} 
                    alt={expert.name} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-wider border border-white/10 font-display">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-1 font-display">{expert.name}</h3>
                    <p className="text-emerald-300 font-black text-sm uppercase tracking-widest font-display">{expert.role}</p>
                  </div>
                </div>
                <div className="p-12">
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 font-bold break-keep">
                    {expert.desc}
                  </p>
                  <a 
                    href={NAVER_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    상담 예약하기
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARTNERS & MEDIA */}
      <div className="[&_h2]:text-emerald-900 [&_.text-primary-deep]:text-emerald-600 [&_.btn-primary]:bg-emerald-600 [&_.bg-primary-deep]:bg-emerald-600">
        <PartnerTeaser />
        <MediaAppearanceTeaser />
      </div>

      {/* 6. LEGAL SECTION */}
      <section id="legal" className="py-24 bg-emerald-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Sentencing Support</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white">
                법원·검찰 제출용 <br />
                <span className="text-emerald-400 font-medium">전문 양형자료 지원</span>
              </h2>
              <p className="text-lg text-emerald-100/70 mb-10 leading-relaxed font-medium break-keep">
                심리치료는 단순한 반성을 넘어, 재범 위험성이 낮아졌음을 입증하는 가장 강력한 객관적 자료입니다. 전문가의 소견서와 보고서로 당신의 변화를 과학적으로 증명하십시오.
              </p>
              
              <div className="space-y-4">
                {[
                  "재범위험성/인지왜곡 정밀 평가",
                  "상담확인서 및 전문가 소견서 발급",
                  "법원 제출용 통합 상담 보고서",
                  "변호인과의 긴밀한 법률 협업"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-2xl border border-white/5">
                    <CheckCircle className="text-emerald-400 w-5 h-5" />
                    <span className="font-bold text-emerald-50">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/10">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">100% 완전 비밀보장</h4>
                  <p className="text-emerald-100/60 break-keep">
                    모든 상담 기록은 의료 및 심리 상담 보안 규정에 따라 철저하게 관리됩니다. 신뢰를 바탕으로 변화에만 집중하십시오.
                  </p>
                  <a href={NAVER_PLACE_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-emerald-900 text-center font-bold py-4 rounded-2xl hover:bg-emerald-100 transition-all">
                    지금 바로 상담 예약하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">상담 진행 절차</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium break-keep">
              체계적인 단계를 통해 당신의 심리 구조를 분석하고 최적의 교정 솔루션을 제공합니다.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "01", title: "문의/접수", desc: "전화 또는 온라인을 통한 초기 상담 예약", icon: MessageSquare },
                { step: "02", title: "초기 평가", desc: "심리 상태 및 사건 구조 정밀 진단", icon: ClipboardCheck },
                { step: "03", title: "프로그램 설계", desc: "개인별 맞춤형 교정 개입 계획 수립", icon: FileText },
                { step: "04", title: "집중 치료", desc: "인지왜곡 교정 및 충동 차단 훈련", icon: Zap },
                { step: "05", title: "사후 관리", desc: "재발 방지 루틴 점검 및 지속 관리", icon: ShieldCheck },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CASE TYPES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">사건 유형별 전문 대응</h2>
            <p className="text-slate-500 font-medium">각 사건의 특수성을 고려한 맞춤형 심리 개입 프로그램을 제공합니다.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAV_STRUCTURE[3].children?.map((child, idx) => (
              <Link 
                key={idx} 
                to={child.href}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all text-center group relative z-10 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 break-keep">{child.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-5">
              <a href="#" className="flex items-center gap-2">
                <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                  <LogoIcon className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900">부산성범죄심리상담센터</span>
              </a>
              <p className="text-slate-500 text-sm leading-relaxed font-medium break-keep">
                성범죄 가해 심리 분석 및 재범 방지 교정 치료 특화 기관입니다. 당신의 변화를 위한 고도의 심리적 개입을 지원합니다.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm">
                   <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li><a href="#about" className="hover:text-emerald-600">센터 소개</a></li>
                <li><a href="#services" className="hover:text-emerald-600">전문 프로그램</a></li>
                <li><a href="#experts" className="hover:text-emerald-600">전문가 그룹</a></li>
                <li><a href="#legal" className="hover:text-emerald-600">양형자료 안내</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Programs</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-emerald-600">성범죄 가해자 상담</a></li>
                <li><a href="#" className="hover:text-emerald-600">디지털 성범죄 교정</a></li>
                <li><a href="#" className="hover:text-emerald-600">재범방지교육</a></li>
                <li><a href="#" className="hover:text-emerald-600">비대면 원격 프로그램</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="flex items-start gap-3">
                  <MapPin className="text-emerald-500 w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">부산광역시 중구 해관로 64, 4층 403-A02호 (중앙동4가, 원빌딩)</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneCall className="text-emerald-500 w-5 h-5 shrink-0" />
                  <a href="tel:0507-1380-0028" className="hover:text-emerald-600">0507-1380-0028</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-emerald-500 w-5 h-5 shrink-0" />
                  <a href="mailto:mhsjoy74@gmail.com" className="hover:text-emerald-600 break-all">mhsjoy74@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-bold">
            <p>© 2026 부산성범죄심리상담치료센터. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-600">이용약관</a>
              <a href="#" className="hover:text-emerald-600">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DentistryLandingPage;
