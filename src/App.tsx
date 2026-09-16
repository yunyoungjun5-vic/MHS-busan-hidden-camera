/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  Globe, 
  Menu, 
  MapPin, 
  Contact2, 
  Star, 
  PhoneCall, 
  ArrowLeft, 
  ArrowRight,
  X,
  ChevronDown,
  ShieldCheck,
  FileText,
  Users,
  MessageSquare,
  BookOpen,
  ClipboardCheck,
  RefreshCw,
  BrainCircuit,
  AlertCircle,
  Gavel,
  Lock,
  Zap,
  Shield,
  Smartphone,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  PenTool,
  FileCheck,
  ClipboardList,
  BarChart3,
  GraduationCap,
  Monitor,
  HelpCircle,
  Heart,
  Info,
  PieChart,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PartnerTeaser from './components/PartnerTeaser';
import MediaAppearanceTeaser from './components/MediaAppearanceTeaser';
import PartnersPage from './pages/PartnersPage';
import MediaAppearancePage from './pages/MediaAppearancePage';
import RemoteProgramPage from './pages/RemoteProgramPage';
import DentistryLandingPage from './pages/DentistryLandingPage';
import SubstanceLabLandingPage from './pages/SubstanceLabLandingPage';

// --- Types ---
interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string; description?: string }[];
}

// --- Constants & Data ---
const NAVER_PLACE_URL = "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh";
const CONTACT_PHONE = "0507-1380-0028";

export const NAV_STRUCTURE: NavItem[] = [
  {
    title: "센터소개",
    href: "/about",
    children: [
      { title: "센터 소개", href: "/about/intro", description: "성범죄 전문 심리치료 특화 기관" },
      { title: "원장 프로필", href: "/about/profile", description: "윤영준 원장의 전문성과 이력" },
      { title: "부원장 프로필", href: "/about/vice-profile", description: "소윤주 부원장의 전문성과 이력" },
      { title: "대표 인사말", href: "/about/greeting", description: "재범방지 중심의 치료 철학" },
      { title: "상담전문가", href: "/about/experts", description: "검증된 성범죄 특화 전문가" },
      { title: "방송/대외활동", href: "/media/appearance", description: "공신력 있는 활동 내역" },
      { title: "협력 · 협약 · 출강 기관", href: "/partners", description: "주요 법률·공공기관 협력 현황" },
      { title: "공지사항", href: "/about/notice" },
      { title: "오시는 길", href: "/about/location", description: "부산 센터 위치 및 주차 안내" },
    ]
  },
  {
    title: "상담/치료",
    href: "/treatment",
    children: [
      { title: "부산 성범죄 가해자 심리상담", href: "/treatment/offender", description: "사건 전 심리구조 분석 및 교정" },
      { title: "부산 디지털 성범죄", href: "/treatment/digital", description: "불법촬영, 딥페이크, 중독 구조 해체" },
      { title: "부산 성도착/행동교정", href: "/treatment/paraphilia", description: "공연음란, 특정행동 교정 프로그램" },
      { title: "부산 성중독/행동중독", href: "/treatment/addiction", description: "충동-자극-행동 루프 해체" },
    ]
  },
  {
    title: "비대면 프로그램",
    href: "/guide",
    children: [
      { title: "부산 비대면 심리상담 및 교육 안내", href: "/remote", description: "실시간 1:1 원격 심리개입 프로그램" },
      { title: "부산 성범죄 가해자 상담 및 치료 프로세스", href: "/guide/process", description: "문의부터 프로그램 설계까지" },
      { title: "비밀보장 원칙", href: "/guide/privacy", description: "철저한 기록 관리 및 보안" },
      { title: "자주 묻는 질문", href: "/guide/faq" },
    ]
  },
  {
    title: "사건유형별 대응",
    href: "/cases",
    children: [
      { title: "부산 강간 / 준강간", href: "/cases/rape" },
      { title: "부산 강제추행", href: "/cases/molestation" },
      { title: "부산 불법 카메라촬영 / 유포", href: "/cases/filming" },
      { title: "부산 딥페이크 / 합성물", href: "/cases/deepfake" },
      { title: "부산 통신매체이용음란", href: "/cases/tongmaeum" },
      { title: "부산 아청법 관련 사건", href: "/cases/juvenile" },
      { title: "부산 미성년자 의제 강간", href: "/cases/statutory-rape" },
      { title: "부산 스토킹 / 주거침입", href: "/cases/stalking" },
      { title: "부산 직장/학교 사건", href: "/cases/workplace" },
    ]
  },
  {
    title: "양형자료",
    href: "/legal",
    children: [
      { title: "부산 성범죄 법원·검찰 제출용 양형자료", href: "/legal/info", description: "심리치료의 법적 효력과 필요성" },
      { title: "부산 성범죄 심리평가/소견서", href: "/legal/assessment", description: "재범위험성 및 인지왜곡 평가" },
      { title: "부산 성범죄 반성문 코칭", href: "/legal/coaching", description: "책임 인식 기반 진술서 가이드" },
      { title: "부산 성범죄 변호사 협업 상담 시스템", href: "/legal/collaboration", description: "법률-심리 통합 대응 프로세스" },
      { title: "부산 성범죄 재범방지교육", href: "/legal/education/prevention", description: "재발 방지를 위한 핵심 교육" },
      { title: "부산 성인지 감수성 교육", href: "/legal/education/sensitivity", description: "성적 권리와 존중의 이해" },
      { title: "부산 성인지 왜곡 교정 교육", href: "/legal/education/distortion", description: "잘못된 성 관념의 인지적 교정" },
      { title: "부산 성범죄 준법정신 강화 교육 프로그램", href: "/legal/education/compliance", description: "법질서 준수 및 사회적 책임" },
      { title: "부산 성차별 교육", href: "/legal/education/discrimination", description: "평등한 성 역할과 차별 해소" },
    ]
  },
  {
    title: "자료실",
    href: "/archive",
    children: [
      { title: "전문가 칼럼", href: "/archive/column", description: "성인지 왜곡과 충동 조절" },
      { title: "자가심리평가", href: "/archive/check", description: "충동 통제 및 위험도 검사" },
      { title: "익명 사례", href: "/archive/cases", description: "변화와 회복의 기록" },
      { title: "미디어 자료", href: "/archive/media" },
    ]
  }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  if (location.pathname === '/' || location.pathname.startsWith('/substance-lab')) {
    return null;
  }

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      {/* Scrolling Top Bar */}
      <Link 
        to="/" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="block bg-slate-50 border-b border-slate-100 py-1.5 overflow-hidden hover:bg-slate-100 transition-colors"
      >
        <div className="flex w-max animate-scroll-right">
          <div className="flex items-center gap-8 px-4">
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
          </div>
          <div className="flex items-center gap-8 px-4">
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-slate-500">
              부산성범죄심리상담치료센터 / 성범죄 가해자 상담 · 재범방지 교육 전문기관
            </span>
          </div>
        </div>
      </Link>

      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group shrink-0"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-emerald-800/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-primary-deep transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Scale className="w-9 h-9" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm lg:text-base xl:text-lg font-black tracking-tight text-slate-900 leading-none font-display">
                부산성범죄심리상담치료센터
              </span>
              <span className="text-[10px] lg:text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-0.5">PUSAN CENTER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 h-full flex-nowrap">
            {NAV_STRUCTURE.map((item) => (
              <div 
                key={item.title}
                className="relative h-full flex items-center shrink-0"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className={`px-2.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-semibold transition-all flex items-center gap-1 rounded-lg hover:bg-slate-50 whitespace-nowrap min-w-max ${activeMenu === item.title ? 'text-primary-deep' : 'text-slate-600 hover:text-slate-900'}`}>
                  {item.title}
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${activeMenu === item.title ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMenu === item.title && item.children && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-6 grid grid-cols-2 gap-x-6 gap-y-2 mt-1 whitespace-normal"
                    >
                      {item.children.map((child) => (
                        <Link 
                          key={child.title} 
                          to={child.href}
                          onClick={() => {
                            if (child.href === '/archive/column') {
                              window.dispatchEvent(new CustomEvent('reset-column-page'));
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="group p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                        >
                          <div className="text-[14px] font-bold text-slate-900 group-hover:text-emerald-600 mb-0.5">{child.title}</div>
                          {child.description && (
                            <div className="text-[12px] text-slate-500 leading-tight">{child.description}</div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors shrink-0">
              <Search className="w-5 h-5" />
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2.5 px-4 xl:px-6 text-[13px] xl:text-[14px] whitespace-nowrap min-w-max shrink-0"
            >
              상담 예약하기
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
              {NAV_STRUCTURE.map((item) => (
                <div key={item.title} className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-display">{item.title}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {item.children?.map((child) => (
                      <Link 
                        key={child.title} 
                        to={child.href}
                        onClick={() => {
                          if (child.href === '/archive/column') {
                            window.dispatchEvent(new CustomEvent('reset-column-page'));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="flex flex-col group"
                      >
                        <span className="text-lg font-bold text-slate-900 group-hover:text-primary-deep transition-colors">{child.title}</span>
                        {child.description && <span className="text-sm text-slate-500">{child.description}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-8 border-t border-slate-100">
                <a 
                  href={NAVER_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full block text-center"
                >
                  상담 예약하기
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-bg-soft">
    <div className="container-custom relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-primary-deep text-sm font-black mb-6 md:mb-8 font-display">
            <ShieldCheck className="w-4 h-4" />
            성범죄 특화 심리치료 전문 기관
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.15] md:leading-[1.1] mb-6 md:mb-8 break-keep font-display">
            부산 성범죄 특화 심리상담<br />
            <span className="text-primary-deep">재범방지 교정치료 전문기관</span>
          </h1>
          
          <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl break-keep">
              부산 지역 성범죄 사건 이후의 상담 경험이 풍부한 <br className="hidden md:block" />
              전문 심리상담 기관입니다.
            </p>

            <div className="space-y-4">
              <p className="text-lg md:text-xl text-slate-900 font-black leading-relaxed break-keep font-display">
                사건 이후 가장 중요한 것은 <br className="hidden sm:block" />
                재범을 막는 변화입니다.
              </p>
              
              <div className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl space-y-4 break-keep">
                <p>
                  전문 심리상담과 교정 치료를 통해 문제 행동의 원인을 이해하고 <br className="hidden md:block" />
                  재범 방지를 위한 실질적인 변화를 돕습니다.
                </p>
                <p>
                  또한 상담 과정과 변화를 객관적으로 기록하여 <br className="hidden md:block" />
                  양형자료 준비에도 도움을 드립니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              상담 예약하기
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/remote" className="btn-primary bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 w-full sm:w-auto">
              비대면 프로그램 안내
            </Link>
            <Link to="/legal/info" className="btn-primary bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 w-full sm:w-auto">
              양형자료 안내
            </Link>
            <Link to="/legal/education/prevention" className="btn-primary bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 w-full sm:w-auto">
              재범방지교육 안내
            </Link>
          </div>

          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-8 border-t border-slate-300 pt-8">
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-display">100%</div>
              <div className="text-xs md:text-sm text-slate-500 font-bold">비밀보장 원칙</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-300"></div>
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-display">20+</div>
              <div className="text-xs md:text-sm text-slate-500 font-bold">전문가 그룹</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-300"></div>
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-display">24/7</div>
              <div className="text-xs md:text-sm text-slate-500 font-bold">긴급 상담 지원</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="relative z-10 rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl border-4 lg:border-8 border-white">
            <img 
              src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746399/4a50ee1d8c22f9992951cf64c1105d47_m180kr.png" 
              alt="Professional Counseling" 
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
          
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 p-4 lg:p-6 bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[180px] lg:max-w-[240px] hidden sm:block"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="font-black text-slate-900 text-sm lg:text-base font-display">신뢰와 보안</span>
            </div>
            <p className="text-[10px] lg:text-xs text-slate-500 leading-relaxed">상담 내용과 기록은 철저한 보안 기준에 따라 안전하게 보호됩니다.</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 p-4 lg:p-6 bg-slate-900 text-white rounded-2xl lg:rounded-3xl shadow-2xl z-20 max-w-[180px] lg:max-w-[240px] hidden sm:block"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-emerald-800/20 text-emerald-500 flex items-center justify-center">
                <Scale className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="font-black text-sm lg:text-base font-display">법적 조력</span>
            </div>
            <p className="text-[10px] lg:text-xs text-slate-400 leading-relaxed">전문가 소견서 및 양형자료 준비를 완벽히 지원합니다.</p>
          </motion.div>

          {/* Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-300 rounded-full -z-10 opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-300 rounded-full -z-10 opacity-30"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const HomeIntro = () => (
  <section className="section-padding bg-white overflow-hidden">
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 md:mb-32">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600" className="rounded-[24px] md:rounded-[32px] shadow-xl grayscale-[0.3] hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
              <div className="p-6 md:p-8 bg-primary-deep rounded-[24px] md:rounded-[32px] text-white shadow-lg">
                <h4 className="text-2xl md:text-3xl font-black mb-2 font-display">20+</h4>
                <p className="text-emerald-100 text-xs md:text-sm font-bold">성범죄 상담 특화 경력</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="p-6 md:p-8 bg-bg-soft rounded-[24px] md:rounded-[32px] border border-slate-200">
                <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 font-display">12,000 +</h4>
                <p className="text-slate-500 text-xs md:text-sm font-bold">누적 상담 케이스</p>
              </div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" className="rounded-[24px] md:rounded-[32px] shadow-xl grayscale-[0.3] hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50 rounded-full blur-[100px] opacity-50"></div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-primary-deep font-black tracking-widest uppercase text-xs md:text-sm mb-4 md:mb-6 block font-display">Our Philosophy</span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-slate-900 mb-8 md:mb-12 tracking-tighter leading-[1.2] md:leading-[1.1] break-keep font-display">
            우리는 왜 <br className="hidden md:block" />
            <span className="text-primary-deep">성범죄 심리</span>에 <br className="hidden md:block" />
            집중하는가?
          </h2>
          <div className="space-y-8 md:space-y-10">
            <div className="flex gap-4 md:gap-6 group">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-bg-soft flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-all">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary-deep" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-black text-slate-900 mb-2 break-keep font-display">재범 방지는 가장 근본적인 피해자 보호입니다</h4>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed break-keep">
                  단순한 처벌만으로는 문제 행동이 근본적으로 해결되지 않습니다. 문제를 일으킨 심리 구조를 이해하고 교정하여 같은 행동이 반복되지 않도록 하는 것이 우리 센터가 존재하는 이유입니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6 group">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-bg-soft flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-all">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-primary-deep" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-black text-slate-900 mb-2 break-keep font-display">우리는 변화의 가능성을 중요하게 봅니다</h4>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed break-keep">
                  우리는 내담자를 비난하는 기관이 아닙니다. 내담자가 자신의 문제 행동을 이해하고 건강한 사회 구성원으로 복귀할 수 있도록 돕는 전문 심리 상담 기관입니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6 group">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-bg-soft flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-all">
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary-deep" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-black text-slate-900 mb-2 break-keep font-display">임상 경험과 객관적 데이터 기반 상담</h4>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed break-keep">
                  수많은 상담 사례를 통해 축적된 임상 경험과 심리 평가 도구를 활용하여 문제 행동을 분석하고 효과적인 교정 방향을 제시합니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link to="/about/intro" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              센터 소개 더보기 <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Expert" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-black text-primary-deep font-display">
                +10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "전문성", 
            desc: "성범죄 심리 교정 상담에 특화된 임상심리 및 범죄심리 전문가가 함께합니다. 문제 행동의 원인을 분석하고 재범 방지를 위한 전문 상담을 진행합니다.",
            icon: Star
          },
          { 
            title: "신뢰성", 
            desc: "객관적인 심리 평가와 상담 기록을 기반으로 전문 소견서 및 양형자료 준비를 지원합니다. 상담 과정에서 정리된 기록과 평가는 법원과 수사기관에서 비중 있는 참고 자료가 될 수 있습니다.",
            icon: ShieldCheck
          },
          { 
            title: "비밀성", 
            desc: "상담 내용과 기록은 철저한 비밀 원칙에 따라 보호됩니다. 모든 상담 정보는 엄격한 기준에 따라 안전하게 관리됩니다.",
            icon: Lock
          }
        ].map((item, idx) => (
          <div key={idx} className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-bg-soft border border-slate-200 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/50 transition-all group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform">
              <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-deep" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 font-display">{item.title}</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed break-keep">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HomeExperts = () => (
  <section className="section-padding bg-bg-soft relative overflow-hidden">
    {/* Decorative background text */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
      <div className="text-[20vw] font-black uppercase leading-none font-display">PROFESSIONAL</div>
    </div>

    <div className="container-custom relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-primary-deep font-black tracking-widest uppercase text-sm mb-6 block font-display">Expert Group</span>
          <h2 className="text-4xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight font-display">
            부산 최고 수준의 <br />
            <span className="text-primary-deep">성범죄 특화</span> 전문가
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-bold">
            단순 심리상담사가 아닌, 범죄 심리와 행동 교정에 특화된 임상 전문가들이 당신의 변화를 책임집니다.
          </p>
        </div>
        <Link to="/about/experts" className="btn-primary bg-white text-slate-900 border border-slate-200 hover:bg-slate-50">
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
            image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346422/ChatGPT_Image_2026년_3월_1일_오후_10_34_52_ydee1z.png" 
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
            className="group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-3xl transition-all border border-slate-200"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-wider border border-white/10 font-display">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-black text-white mb-1 font-display">{expert.name}</h3>
                <p className="text-emerald-400 font-black text-sm uppercase tracking-widest font-display">{expert.role}</p>
              </div>
            </div>
            <div className="p-12">
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-bold">
                {expert.desc}
              </p>
              <a 
                href={NAVER_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2 bg-bg-soft text-slate-900 hover:text-white"
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
);

const CoreServices = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 tracking-tight font-display">전문 특화 프로그램</h2>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed break-keep">
          단순한 대화 상담이 아니라 <br className="hidden sm:block" />
          과학적 근거에 기반한 구조적 프로그램을 통해 <br className="hidden sm:block" />
          실질적인 변화를 돕습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Users, title: "성범죄 가해자 심리상담", desc: "사건 전 불안, 충동조절 실패 분석 및 인지왜곡 교정", color: "bg-blue-50 text-primary-deep" },
          { icon: Zap, title: "디지털 성범죄", desc: "도파민-충동 루프 해체 및 피해자 비가시화 문제 해결", color: "bg-purple-50 text-purple-600" },
          { icon: AlertCircle, title: "성도착/행동교정", desc: "공연음란, 특정행동 집착 등 행동 교정 프로그램", color: "bg-amber-50 text-amber-600" },
          { icon: Lock, title: "성중독/행동중독", desc: "음란물, 섹스 중독 등 자극-행동 루프 완벽 해체", color: "bg-rose-50 text-rose-600" },
        ].map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl border border-slate-200 bg-bg-soft hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-sm`}>
              <service.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 font-display">{service.title}</h3>
            <p className="text-slate-500 leading-relaxed text-[15px] font-bold">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const LegalSection = () => (
  <section className="section-padding bg-slate-900 text-white overflow-hidden relative">
    <div className="container-custom relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-emerald-400 font-black tracking-widest uppercase text-sm mb-4 block font-display">Sentencing Materials</span>
          <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-tight leading-tight font-display text-white">
            법원·검찰 제출용<br />
            <span className="text-emerald-400">전문 양형자료</span> 지원
          </h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed font-bold">
            심리치료는 단순한 반성을 넘어, 재범 위험성이 현저히 낮아졌음을 입증하는 가장 강력한 객관적 자료입니다. 전문가의 소견서와 평가 보고서로 당신의 변화를 증명하세요.
          </p>
          
          <div className="space-y-6 mb-12">
            {[
              "재범위험성/인지왜곡/충동성 정밀 평가",
              "상담확인서 및 전문가 소견서 발급",
              "책임 인식 기반 반성문/진술서 코칭",
              "변호사 협업 통합 대응 프로세스"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-deep flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-bold">{item}</span>
              </div>
            ))}
          </div>
          
          <Link to="/legal/info" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 inline-flex items-center gap-2">
            양형자료 상세 안내
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="relative">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Gavel className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-black text-xl font-display text-white">양형자료 패키지</h4>
                <p className="text-sm text-white font-bold">법적 효력을 갖춘 전문 문서 지원</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all">
                <span className="text-white font-bold">상담 확인서</span>
                <span className="text-xs font-black text-white uppercase font-display">Available</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all">
                <span className="text-white font-bold">전문가 소견서</span>
                <span className="text-xs font-black text-white uppercase font-display">Available</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all">
                <span className="text-white font-bold">재범위험성 평가서</span>
                <span className="text-xs font-black text-white uppercase font-display">Available</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all">
                <span className="text-white font-bold">반성문 가이드</span>
                <span className="text-xs font-black text-white uppercase font-display">Available</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-[80px] -z-10"></div>
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="section-padding bg-bg-soft">
    <div className="container-custom">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight font-display">상담 진행 절차</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold">
          체계적인 단계를 통해 당신의 심리 구조를 분석하고 최적의 교정 솔루션을 제공합니다.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -translate-y-1/2 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
          {[
            { step: "01", title: "문의/접수", desc: "전화 또는 온라인을 통한 초기 상담 예약", icon: MessageSquare },
            { step: "02", title: "초기 평가", desc: "심리 상태 및 사건 구조 정밀 진단", icon: ClipboardCheck },
            { step: "03", title: "프로그램 설계", desc: "개인별 맞춤형 교정 개입 계획 수립", icon: FileText },
            { step: "04", title: "집중 치료", desc: "인지왜곡 교정 및 충동 차단 훈련", icon: Zap },
            { step: "05", title: "사후 관리", desc: "재발 방지 루틴 점검 및 지속 관리", icon: ShieldCheck },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all text-center group">
              <div className="w-12 h-12 rounded-full bg-primary-deep text-white flex items-center justify-center font-black text-sm mx-auto mb-6 group-hover:scale-110 transition-transform font-display">
                {item.step}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3 font-display">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname.startsWith('/substance-lab')) {
    return null;
  }

  return (
    <footer className="bg-footer-bg pt-20 pb-12 relative z-20 text-white">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          {/* 센터 이름 (강조된 제목) */}
          <Link to="/" className="flex items-center gap-2 mb-8 relative z-10">
            <Scale className="w-7 h-7 text-emerald-400" />
            <span className="text-xl font-black text-white tracking-tight font-display">부산성범죄심리상담치료센터</span>
          </Link>

          {/* 소개 문구 (가독성 개선) */}
          <div className="max-w-[300px] mb-8">
            <p className="text-slate-300 text-[14px] leading-[1.8] break-keep font-bold">
              부산 지역에서 성범죄 심리 상담과 교정 치료에 특화된 최고 수준의 전문 상담 기관입니다.
              철저한 비밀 원칙과 체계적인 상담 과정을 통해 재범 방지를 위한 변화를 돕습니다.
            </p>
          </div>

          {/* 주소 및 연락처 (아이콘과 수평 정렬) */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 text-slate-300 text-[13px]">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-bold text-slate-300">부산광역시 중구 해관로 64, 4층 403-A02호 (중앙동4가, 원빌딩)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-[13px]">
              <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-black">{CONTACT_PHONE}</span>
            </div>
            <div className="text-slate-300 text-[13px] pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex gap-2">
                <span className="text-slate-400 font-medium">대표자명</span>
                <span className="font-bold text-slate-200">윤영준</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-400 font-medium">사업자등록번호</span>
                <span className="font-bold text-slate-200">230-91-02378</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-deep transition-all cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
            </a>
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-deep transition-all cursor-pointer"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>
        </div>

        {NAV_STRUCTURE.slice(0, 3).map((item) => (
          <div key={item.title}>
            <h4 className="text-white font-black mb-6 font-display">{item.title}</h4>
            <ul className="space-y-4">
              {item.children?.map((child) => (
                <li key={child.title}>
                  <Link 
                    to={child.href} 
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-slate-300 text-sm hover:text-indigo-400 transition-colors block py-1 relative z-10 cursor-pointer font-bold"
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 text-xs font-black text-slate-400 uppercase tracking-widest font-display">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
        <p className="text-slate-400 text-xs font-bold">
          © 2026 부산성범죄심리상담치료센터. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  );
};

// --- Pages ---

const WorkplaceCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900">직장과 학교는 단순한 공간이 아닙니다. 나의 경력과 미래, 사회적 신뢰가 연결된 공간입니다.</p>
            <p className="font-bold">그곳에서 사건이 발생했다는 사실만으로도 이미 큰 불안과 수치심, 두려움, 억울함을 동시에 경험하게 됩니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500 font-bold">
              <p>“왜 이렇게까지 커졌을까…”</p>
              <p>“나는 그런 의도가 아니었는데…”</p>
              <p>“앞으로 직장은? 학교는? 인생은 어떻게 되는 걸까…”</p>
            </div>
            <p className="font-bold">저희는 그 마음부터 이해합니다. 직장·학교 사건은 신분·평판·경력에 직접적인 영향을 주기 때문에 심리적 충격이 훨씬 크게 작용합니다.</p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346329/ChatGPT_Image_2026년_3월_3일_오후_08_16_41_yut2kc.png" 
            alt="Workplace Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-black italic font-display">"사건의 맥락과 관계의 구조를 전문적으로 분석합니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
          <h4 className="font-black text-slate-900 mb-4 font-display">주요 사건 유형</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-bold">
            <li>• 직장 내 성희롱·성추행 신고</li>
            <li>• 교수–학생 간 부적절한 관계</li>
            <li>• 동료·상사와의 사적 메시지 문제</li>
            <li>• 교내 성비위 조사</li>
            <li>• 술자리 이후 오해 및 진술 충돌</li>
          </ul>
        </div>
        <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
          <h4 className="font-black text-slate-900 mb-4 font-display">흔히 겪는 심리 상태</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-bold">
            <li>• 극심한 불안, 공황, 수면장애</li>
            <li>• 억울함과 분노, 자책</li>
            <li>• 반복적인 상황 재생(플래시백)</li>
            <li>• 직장·학교 복귀에 대한 공포</li>
            <li>• 주변 시선에 대한 과도한 위축</li>
          </ul>
        </div>
        <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100">
          <h4 className="font-black text-slate-900 mb-4 font-display">사건의 특수성</h4>
          <p className="text-sm text-slate-600 leading-relaxed font-bold">
            법적 문제와 함께 ‘조직 내 징계’가 동시에 진행된다는 점이 가장 큰 특징입니다. 저희는 사건의 맥락, 관계의 구조, 감정의 흐름을 전문적으로 분석합니다.
          </p>
        </div>
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center font-display text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          직장·학교 사건은 ‘성 문제’이기도 하지만 동시에 <br />
          관계 경계와 권력 구조에 대한 이해 부족 문제이기도 합니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "사건 구조 분석", icon: Search },
            { title: "재발 방지 구조 확립", icon: ShieldCheck },
            { title: "인지 왜곡 교정", icon: Zap },
            { title: "심리적 안정 회복", icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6" />
              <h4 className="text-xl font-black font-display text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. 양형자료 및 징계 대응 */}
    <section>
      <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3 font-display">
        <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 및 징계 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="font-bold">직장·학교 사건은 형사 절차뿐 아니라 <span className="font-black text-slate-900">내부 징계위원회, 인사위원회, 교권·학폭위원회</span> 등이 동시에 진행될 수 있습니다.</p>
            <p className="font-bold">따라서 양형자료 역시 단순 반성문 수준으로는 부족합니다. 판단하는 기관이 궁금해하는 것은 단 하나, “이 사람이 다시 이런 행동을 할 가능성이 있는가?”입니다. 저희는 감정적인 글이 아니라 구조적이고 설득력 있는 자료를 준비합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { title: "사건 이해 및 분석", desc: "관계 구조 및 맥락 분석" },
                { title: "재발 방지 계획", desc: "구체적이고 실천적인 전략" },
                { title: "심리평가 소견", desc: "전문가 진단 및 평가" },
                { title: "상담 참여 증빙", desc: "실질적 노력의 기록" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-bg-soft border border-slate-200">
                  <div className="font-black text-slate-900 mb-2 font-display">✔ {item.title}</div>
                  <div className="text-sm text-slate-500 font-bold">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 font-display">이런 분들께 권합니다</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-bold">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 직장 내 성희롱 신고를 받은 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 학교 조사위원회 출석 예정인 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 교수·강사·교사로 징계 절차 중인 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 억울함과 불안을 동시에 겪는 분</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full flex items-center justify-center gap-2"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>

    <section className="bg-bg-soft p-12 rounded-[48px]">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-black text-slate-900 mb-12 font-display">저희 센터의 원칙</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "비난하지 않습니다", desc: "있는 그대로의 사실을 직시합니다." },
            { title: "객관적으로 분석합니다", desc: "맥락과 구조를 파헤칩니다." },
            { title: "재발 방지 중심", desc: "미래의 안전을 최우선으로 합니다." },
            { title: "실질적 도움", desc: "설득력 있는 자료를 만듭니다." }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-primary-deep font-black mb-2 font-display">{item.title}</div>
              <p className="text-slate-500 text-sm font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const StalkingCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 분석 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태 분석
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900">스토킹 및 주거침입 사건은 단순한 감정 문제로 시작되었을 수 있지만, 법적으로는 매우 무겁게 다뤄지는 사안입니다.</p>
            <p className="font-bold">많은 내담자분들이 이렇게 말씀하십니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500 font-bold">
              <p>“좋아하는 마음이었는데 이렇게까지 될 줄 몰랐습니다.”</p>
              <p>“상대가 오해한 것 같습니다.”</p>
              <p>“헤어진 뒤 감정이 정리되지 않았습니다.”</p>
              <p>“한 번 찾아간 것뿐인데 범죄가 될 줄 몰랐습니다.”</p>
            </div>
            <p className="font-bold">이러한 사건은 집착, 거절 수용의 어려움, 분리불안, 왜곡된 기대감 등이 복합적으로 작용한 결과인 경우가 많습니다. 우리 센터는 실질적인 재발 방지와 법적 대응을 함께 고려하는 구조화된 개입을 진행합니다.</p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346345/ChatGPT_Image_2026년_3월_3일_오후_07_32_36_pvyiur.png" 
            alt="Stalking Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-black italic font-display">"감정의 왜곡을 바로잡고, 법적 대응과 심리 회복을 함께합니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "관계 단절 거부", desc: "“이대로 끝날 수 없다”는 강한 집착과 오해" },
          { title: "정서적 의존", desc: "관계 단절 시 극심한 공허감과 분리불안" },
          { title: "왜곡된 합리화", desc: "“만나서 이야기하면 해결된다”는 생각" },
          { title: "통제력 저하", desc: "밤 시간대 감정 증폭 및 음주 후 연락/방문" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-bg-soft border border-slate-200 text-center">
            <h4 className="font-black text-slate-900 mb-2 font-display">{item.title}</h4>
            <p className="text-sm text-slate-500 font-bold">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center font-display text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          스토킹 및 주거침입 사건은 재발 위험성을 낮추는 구체적 개입이 필요합니다. <br />
          단순 상담이 아닌 구조화된 재범방지 프로그램을 운영합니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "집착/왜곡 사고 교정", icon: Zap },
            { title: "감정/충동 통제 훈련", icon: ShieldCheck },
            { title: "정서적 독립성 회복", icon: Users },
            { title: "재범 방지 행동 계획", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6" />
              <h4 className="text-xl font-black font-display text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3 font-display">
        <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="font-bold">법원은 <span className="font-black text-slate-900">재범 가능성, 피해자에 대한 인식 변화, 접근 통제 가능성</span> 등을 중요하게 봅니다.</p>
            <p className="font-bold">형식적인 반성문이 아니라 구체적인 변화 과정이 입증되어야 합니다. 스토킹 사건은 “계속될 가능성”이 가장 중요한 판단 기준이 되므로, 재발 가능성이 구조적으로 낮아졌다는 점을 전문적으로 입증하는 것이 핵심입니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { title: "심리 분석 보고", desc: "사건 당시 심리 구조 분석" },
                { title: "상담 경과 보고", desc: "실질적인 변화 과정 기록" },
                { title: "재범 방지 계획", desc: "구체적인 행동 지침 수립" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-bg-soft border border-slate-200">
                  <div className="font-black text-slate-900 mb-2 font-display">{item.title}</div>
                  <div className="text-xs text-slate-500 font-bold">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 font-display">이런 분들께 권합니다</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-bold">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 헤어진 연인에게 반복 연락한 경우</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 상대 주거지 인근을 방문한 경우</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 차단 이후에도 연락을 시도한 경우</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 감정이 조절되지 않아 찾아간 경우</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full flex items-center justify-center gap-2"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>

    <section className="bg-bg-soft p-12 rounded-[48px] text-center">
      <h3 className="text-2xl font-black text-slate-900 mb-6 font-display">당신은 지금 두려울 수 있습니다</h3>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-bold">
        경찰 조사, 접근금지, 주변 시선... 머리가 하얘지는 것이 정상입니다. <br />
        하지만 중요한 것은 지금부터의 대응 방식입니다. 심리 구조를 정확히 이해하고 재발 방지 계획을 세우면 결과는 달라질 수 있습니다.
      </p>
    </section>
  </div>
);

const JuvenileCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 아동·청소년 관련 성범죄 처벌 강화 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            아동·청소년 관련 성범죄 처벌 강화
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900 text-xl">
              최근 아동·청소년 대상 성범죄에 대한 사회적 인식과 법적 기준은 매우 엄격하게 변화하고 있습니다.
            </p>
            <p className="font-bold">
              특히 「아동·청소년의 성보호에 관한 법률」(아청법)은 여러 차례 개정을 통해 처벌 범위와 수위를 대폭 확대해 왔습니다. 
              2020년 개정 이후에는 디지털 환경에서 발생하는 성범죄에 대한 대응이 강화되면서, 아동·청소년이 등장하는 성적 영상물과 관련된 모든 행위에 대해 무관용 원칙이 적용되고 있습니다.
            </p>
            
            <div className="bg-bg-soft rounded-3xl p-8 border border-slate-200 mt-8">
              <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2 font-display">
                <AlertCircle className="w-5 h-5 text-cta-deep" />
                주요 처벌 대상 행위
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "성착취 영상물의 제작 및 촬영",
                  "영상물의 유포 또는 판매",
                  "다운로드 및 단순 소지",
                  "온라인 전송 및 공유",
                  "스트리밍 시청 (일부 경우 포함)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-cta-deep shrink-0" />
                    <span className="text-sm font-black text-slate-700 font-display">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-500 leading-relaxed font-bold">
                ※ 디지털 환경에서는 영상물의 일부 장면만 존재하더라도 아동·청소년이 등장하는 성적 표현이 포함되어 있을 경우 법적 문제가 될 수 있으며, 메신저·클라우드·SNS 등을 통한 전달 및 저장 행위도 폭넓게 처벌 대상이 됩니다.
              </p>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346347/ChatGPT_Image_2026년_3월_3일_오후_07_14_08_pgier6.png" 
            alt="Juvenile Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-black italic font-display">"과거 벌금형 수준의 사건도 최근에는 정식 재판(구공판)으로 진행되는 사례가 급증하고 있습니다."</p>
          </div>
        </div>
      </div>
    </section>

    {/* 2. 의제강간 관련 법률 개정 */}
    <section className="bg-primary-deep rounded-[48px] p-12 lg:p-20 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black mb-8 text-center font-display text-white">의제강간 관련 법률 개정 (만 16세 미만)</h2>
        <div className="space-y-8 text-center">
          <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-2xl font-black font-display">
            기존 만 13세 미만 → <span className="text-yellow-300">개정 만 16세 미만 확대</span>
          </div>
          <p className="text-xl text-indigo-100 leading-relaxed font-bold">
            상대방의 동의 여부와 관계없이 일정 연령 이하의 청소년과의 성행위를 처벌 대상으로 규정합니다. 
            이는 성인과 미성년자 사이의 권력 불균형과 판단 능력의 차이를 고려하여 해당 연령대의 청소년을 보다 적극적으로 보호하겠다는 취지입니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 사건 개요 및 심리 상태 분석 (기존 내용 보강) */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태 분석
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900">아동·청소년 관련 사건은 법적·사회적 파장이 크고, 수사 과정 또한 매우 엄격하게 진행됩니다.</p>
            <p className="font-bold">사건에 연루된 많은 분들이 이렇게 말씀하십니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500 font-bold">
              <p>“이렇게까지 커질 줄 몰랐습니다.”</p>
              <p>“단순한 대화라고 생각했습니다.”</p>
              <p>“상대가 미성년자인 줄 몰랐습니다.”</p>
              <p>“순간적인 충동이었고, 깊이 생각하지 못했습니다.”</p>
            </div>
            <p className="font-bold">지금 가장 힘든 것은 법적 처벌의 두려움, 그리고 동시에 가족과 사회에 대한 죄책감, 수치심, 혼란일 것입니다. 저희 센터는 비난이 아닌 사실 기반 분석과 심리 구조 이해를 통해, 당신이 현재 상황을 정리하고 재발을 막을 수 있도록 돕습니다.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {[
            { 
              title: "① 인지 왜곡", 
              items: ["“상대가 동의했다.”", "“요즘은 다 이런다.”", "“실제 접촉은 없었다.”", "“사진만 본 건데 큰 문제인가?”"] 
            },
            { 
              title: "② 충동 및 자극 의존", 
              items: ["음주 후 반복되는 행동", "야동·음란채팅 중독", "스트레스 해소 방식의 왜곡", "디지털 환경 속 점진적 둔감화"] 
            },
            { 
              title: "③ 정서적 결핍", 
              items: ["인정 욕구 및 관계 단절감", "통제감 상실", "현실 관계에서의 좌절", "왜곡된 친밀감 추구"] 
            }
          ].map((group, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-bg-soft border border-slate-200">
              <h4 className="font-black text-slate-900 mb-3 font-display">{group.title}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-500 font-bold">
                {group.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary-deep">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. 상담 및 치료 목표 (통합) */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center font-display text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          저희 센터의 목표는 단순한 “반성문 작성”이 아닙니다. <br />
          진짜 목표는 재범 방지와 심리 구조 교정입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "인지 왜곡 교정", icon: Zap },
            { title: "충동 조절 훈련", icon: ShieldCheck },
            { title: "성적 자극 재구조화", icon: Search },
            { title: "정서 회복 및 자기통제", icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
              <h4 className="font-black font-display text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-emerald-600/10 border border-emerald-500/20 text-center">
          <p className="text-lg leading-relaxed font-bold text-emerald-900">
            저희는 상담 과정을 통해 <br />
            <span className="text-emerald-950 font-black">“나는 왜 그 행동을 했는가?” → “다시는 하지 않기 위해 무엇을 바꿀 것인가?”</span> <br />
            이 질문에 구체적으로 답하도록 돕습니다.
          </p>
        </div>
      </div>
    </section>

    {/* 5. 양형자료 대응 (통합) */}
    <section>
      <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3 font-display">
        <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응 및 전문적 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="font-bold">아동청소년법 사건은 <span className="font-black text-slate-900">재범 위험성 판단</span>이 핵심 요소입니다.</p>
            <p className="font-bold">저희 센터는 단순한 형식적 문서가 아니라, 객관적 심리 변화와 구조적 개선을 보여주는 전문적 심리 보고를 제공합니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { title: "법률 기준 적용", desc: "강화된 법률 기준 분석" },
                { title: "심리 평가", desc: "객관적 지표를 통한 진단" },
                { title: "변화 과정 기록", desc: "상담 참여 및 인식 변화" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-bg-soft border border-slate-200">
                  <div className="font-black text-slate-900 mb-2 font-display">{item.title}</div>
                  <div className="text-xs text-slate-500 font-bold">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-3xl bg-bg-soft border border-slate-200">
              <h4 className="font-black text-slate-900 mb-4 font-display">전문적 대응의 핵심 요소</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="font-black text-primary-deep font-display">구체적 상황 평가</div>
                  <p className="text-sm font-bold">사건의 경위, 행위 정도, 전과 여부 등에 따른 객관적 평가를 진행합니다.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-black text-primary-deep font-display">변화 노력 증명</div>
                  <p className="text-sm font-bold">사건 이후의 태도 변화와 재발 방지를 위한 실질적 노력들을 체계적으로 정리합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 font-display">이런 분들께 권합니다</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-bold">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 수사 중 불안과 공황을 겪는 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 재범이 두려운 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 양형자료 준비가 필요한 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-deep mt-1.5 shrink-0" /> 성적 충동을 통제하고 싶은 분</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full flex items-center justify-center gap-2"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const StatutoryRapeCaseContent = () => (
  <div className="space-y-32">
    {/* 1. 헤드 아래 임팩트 섹션 */}
    <section className="py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold tracking-wider">
            심리-법률 통합 대응 가이드
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight font-display">
            합의였다고 생각했지만,<br />
            <span className="text-rose-600">법은 다르게 판단합니다.</span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-600 font-bold leading-relaxed">
            미성년자 의제 강간은 동의 여부와 관계없이 성립될 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
              만 16세 미만 보호
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              무관용 원칙 적용
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[48px] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3] relative group">
            <img 
              src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786091036/미성년자_의제_강간_전문_대응_hlwadm.png" 
              alt="Contemplating Man" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-all duration-700" />
          </div>
          <div className="absolute -bottom-10 -left-10 p-10 bg-white rounded-[40px] shadow-2xl border border-slate-100 max-w-sm z-10">
            <p className="text-slate-900 text-lg font-black italic leading-relaxed font-display">
              "상대방이 원했다고 생각했는데...<br />
              이제 제 인생은 어떻게 되는 건가요?"
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 2. 왜 나에게 이런 일이? (공감 섹션) */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="rounded-[48px] overflow-hidden shadow-2xl aspect-square relative group">
            <img 
              src="https://picsum.photos/seed/confusion/800/800" 
              alt="Confusion" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 font-display leading-tight">왜 나에게 이런 일이<br />발생했을까요?</h2>
          <p className="text-xl text-slate-600 leading-relaxed font-bold">
            사건 직후 가장 먼저 찾아오는 감정은 <span className="text-rose-600 underline underline-offset-8 decoration-4">당혹감과 억울함</span>입니다.<br />
            "강제로 한 게 아닌데 왜 강간인가?"라는 의문이 머릿속을 떠나지 않을 것입니다.
          </p>
          <div className="space-y-6">
            {[
              { title: "상황의 오해", desc: "서로 호감이 있었다고 믿었거나, 상대의 나이를 정확히 인지하지 못한 경우" },
              { title: "판단력 저하", desc: "음주나 일시적인 충동으로 인해 법적 경계를 망각한 경우" },
              { title: "관계의 왜곡", desc: "온라인상의 친밀감이 현실의 법적 책임으로 이어질 줄 몰랐던 경우" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                <h4 className="text-lg font-black text-slate-900 mb-2 font-display">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 3. 법적 이해 섹션 */}
    <section className="bg-slate-900 rounded-[64px] p-8 lg:p-24 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://picsum.photos/seed/justice/1200/800" 
          alt="Justice Scale" 
          className="w-full h-full object-cover blur-md"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl lg:text-5xl font-black mb-12 text-center font-display text-white">법은 '합의'보다 '나이'를 먼저 봅니다.</h2>
        <div className="space-y-12">
          <div className="p-10 bg-white/10 backdrop-blur-md rounded-[40px] border border-white/20">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-white">
              <Scale className="w-8 h-8 text-emerald-400" />
              미성년자 의제 강간죄란?
            </h3>
            <p className="text-xl text-emerald-100 leading-relaxed font-bold mb-8">
              형법 제305조에 따라, <span className="text-yellow-300">만 16세 미만</span>의 미성년자와 성관계를 한 경우, 폭행이나 협박이 없었더라도, 심지어 <span className="text-yellow-300">서로 합의 하에 이루어졌더라도</span> 강간죄와 동일하게 처벌하는 규정입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-emerald-200 mb-2">핵심 기준 01</p>
                <p className="text-lg font-bold text-white">피해자의 연령 (만 16세 미만)</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-emerald-200 mb-2">핵심 기준 02</p>
                <p className="text-lg font-bold text-white">성적 자기결정권 행사의 미성숙</p>
              </div>
            </div>
          </div>
          <p className="text-center text-xl text-slate-300 font-bold">
            "몰랐다"거나 "동의했다"는 주장은 법리적으로 받아들여지기 매우 어렵습니다.
          </p>
        </div>
      </div>
    </section>

    {/* 4. 처벌 수위 섹션 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 font-display leading-tight">부산 미성년자 의제 강간,<br />처벌 수위는 어느 정도인가요?</h2>
          <div className="space-y-8">
            <div className="p-8 rounded-[40px] bg-rose-50 border border-rose-100 space-y-6">
              <h4 className="text-2xl font-black text-rose-900 font-display">형사 처벌</h4>
              <ul className="space-y-4">
                {[
                  "3년 이상의 유기징역 (벌금형 없음)",
                  "아청법 위반 시 가중 처벌 가능",
                  "미수범 또한 처벌 대상"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-rose-800 font-bold">
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 space-y-6">
              <h4 className="text-2xl font-black text-slate-900 font-display">보안 처분</h4>
              <ul className="space-y-4">
                {[
                  "신상정보 등록 및 공개/고지",
                  "아동·청소년 관련 기관 취업 제한",
                  "성폭력 치료 프로그램 이수 명령",
                  "전자장치(전자발찌) 부착 검토"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-slate-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[48px] overflow-hidden shadow-2xl aspect-[3/4] relative group">
            <img 
              src="https://picsum.photos/seed/prison/600/800" 
              alt="Legal Consequences" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <p className="text-3xl font-black text-white text-center leading-tight font-display drop-shadow-lg">
                단순한 벌금으로<br />끝나지 않습니다.<br />
                <span className="text-rose-400">실형의 위험</span>이<br />뒤따릅니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 5. 수사 단계 대응 섹션 */}
    <section className="py-24 bg-slate-50 rounded-[64px] border border-slate-100 overflow-hidden relative">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <img 
          src="https://picsum.photos/seed/police/800/1200" 
          alt="Police Investigation" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-12 text-center font-display">수사 단계에서의 대응이 평생을 결정합니다.</h2>
        <div className="space-y-8">
          {[
            { num: "01", title: "초기 진술의 일관성", desc: "당황하여 사실을 부인하거나 번복하는 것은 수사 기관의 불신을 초래합니다. 객관적 사실 관계를 먼저 정리해야 합니다." },
            { num: "02", title: "인지 왜곡의 인정과 교정", desc: "\"몰랐다\"는 변명보다 \"왜 그런 판단을 했는지\"에 대한 심리적 분석과 반성이 재판부의 판단에 긍정적인 영향을 미칩니다." },
            { num: "03", title: "전문가 개입의 시점", desc: "수사 초기부터 전문 상담 기관의 개입을 통해 자신의 심리 상태를 객관화하고 재발 방지 의지를 서면으로 증명해야 합니다." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-8 items-start bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-2xl font-black text-emerald-600">
                {item.num}
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900 font-display">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed font-bold">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 6. 전문 개입 프로세스 섹션 */}
    <section>
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 font-display">본 센터의 전문 개입 프로세스</h2>
          <p className="text-slate-500 font-bold">과학적 진단부터 법적 소명까지 원스톱 솔루션을 제공합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "심리 정밀 진단", desc: "사건 당시의 심리 구조와 인지 왜곡 패턴을 과학적으로 분석합니다.", icon: BrainCircuit, seed: "brain" },
            { step: "02", title: "맞춤형 교육 설계", desc: "의제 강간의 법적 취지와 성인지 감수성을 바로잡는 집중 교육을 실시합니다.", icon: BookOpen, seed: "book" },
            { step: "03", title: "재발 위험 차단", desc: "충동 조절 훈련과 고위험 상황 회피 전략을 수립하여 재범 가능성을 원천 차단합니다.", icon: ShieldCheck, seed: "shield" },
            { step: "04", title: "전문 소견서 발행", desc: "치료 과정과 변화 노력을 담은 법원 제출용 심리 평가 보고서를 작성합니다.", icon: FileText, seed: "report" }
          ].map((item, idx) => (
            <div key={idx} className="group relative rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-[400px]">
              <div className="absolute inset-0">
                <img 
                  src={`https://picsum.photos/seed/${item.seed}/400/600`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              </div>
              <div className="relative h-full p-8 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-emerald-400 mb-2 font-display tracking-widest uppercase">STEP {item.step}</div>
                <h4 className="text-xl font-black text-white mb-4 font-display leading-tight">{item.title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 7. 양형 자료로서의 심리 상담 섹션 */}
    <section className="bg-emerald-800 rounded-[64px] p-8 lg:p-24 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://picsum.photos/seed/document/1200/800" 
          alt="Documents" 
          className="w-full h-full object-cover blur-sm"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-5xl font-black font-display text-white">양형 자료로서의<br />심리 상담</h2>
          <p className="text-xl text-emerald-100 leading-relaxed font-bold">
            단순한 반성문보다 강력한 것은 <span className="text-white underline underline-offset-8 decoration-white/30">"객관적인 변화의 증거"</span>입니다.
          </p>
          <div className="space-y-4">
            {[
              "전문 상담사의 객관적인 심리 평가 보고서",
              "재발 방지를 위한 구체적인 노력의 기록",
              "왜곡된 성 인지의 교정 과정 증빙",
              "장기적인 치료 계획 및 실천 의지"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
                <span className="text-lg font-bold text-white">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[40px] border border-white/20">
          <p className="text-lg leading-relaxed font-bold text-emerald-50">
            재판부는 가해자가 자신의 행위를 얼마나 깊이 이해하고 있는지, 그리고 <span className="text-white font-black">다시 범죄를 저지르지 않을 구체적인 준비가 되었는지</span>를 중요하게 봅니다. 본 센터의 소견서는 그 진정성을 뒷받침하는 핵심 자료가 됩니다.
          </p>
        </div>
      </div>
    </section>

    {/* 8. 비밀 보장 섹션 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-lg font-bold">
            <Lock className="w-5 h-5 text-emerald-400" />
            100% 철저한 비밀 보장
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 font-display leading-tight">안전하고 편안한<br />상담 환경</h2>
          <p className="text-xl text-slate-600 leading-relaxed font-bold">
            사건의 특성상 누구에게도 말하지 못하는 고통을 잘 알고 있습니다.<br />
            본 센터는 의료법 및 상담 윤리 규정에 따라 <span className="text-slate-900">상담 내용을 철저히 보호</span>합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <h4 className="text-lg font-black text-slate-900 mb-2 font-display">익명성 보장</h4>
              <p className="text-slate-500 text-sm font-bold">상담 예약부터 진행까지 개인 정보 보호를 최우선으로 합니다.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <h4 className="text-lg font-black text-slate-900 mb-2 font-display">비난 없는 상담</h4>
              <p className="text-slate-500 text-sm font-bold">우리는 당신을 비난하기 위해 여기 있는 것이 아니라, 문제를 해결하기 위해 여기 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[48px] overflow-hidden shadow-2xl aspect-video relative group">
            <img 
              src="https://picsum.photos/seed/secret/800/450" 
              alt="Confidentiality" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-900/10" />
          </div>
        </div>
      </div>
    </section>

    {/* 9. FAQ 섹션 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-[48px] overflow-hidden shadow-2xl aspect-[4/5] relative group">
            <img 
              src="https://picsum.photos/seed/questions/600/750" 
              alt="FAQ" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />
          </div>
        </div>
        <div className="space-y-12 order-1 lg:order-2">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 font-display">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-6">
            {[
              { q: "상대방이 나이를 속였는데도 처벌받나요?", a: "상대방이 나이를 속였다는 점이 입증된다면 고의성 여부에서 다툴 여지가 있습니다. 하지만 법원은 성인이 미성년자의 연령을 확인해야 할 주의 의무를 엄격하게 봅니다. 전문가와 함께 당시 정황을 정밀하게 분석해야 합니다." },
              { q: "합의를 하면 처벌을 피할 수 있나요?", a: "의제 강간은 친고죄나 반의사불벌죄가 아니므로 합의를 하더라도 수사와 처벌은 계속됩니다. 다만, 합의는 가장 중요한 양형 사유 중 하나이며, 진지한 반성과 재발 방지 노력이 동반될 때 효과가 극대화됩니다." },
              { q: "상담 기록이 수사 기관에 넘어가나요?", a: "상담 기록은 본인의 동의 없이는 외부로 유출되지 않습니다. 오직 본인이 법적 소명 자료로 활용하기를 원할 때만 공식적인 소견서 형태로 발행됩니다." }
            ].map((faq, idx) => (
              <div key={idx} className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4 mb-4">
                  <span className="text-emerald-600 font-black text-2xl font-display">Q.</span>
                  <h4 className="text-lg font-black text-slate-900 font-display">{faq.q}</h4>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-300 font-black text-2xl font-display">A.</span>
                  <p className="text-slate-600 leading-relaxed font-bold">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 10. 실제 사례 섹션 */}
    <section className="bg-slate-50 rounded-[64px] p-8 lg:p-24 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-full h-1/2 opacity-5">
        <img 
          src="https://picsum.photos/seed/story/1200/600" 
          alt="Case Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-16 text-center font-display">실제 사례 (익명화)</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="p-10 bg-white rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold">사례 01</div>
              <h4 className="text-xl font-black text-slate-900 font-display">채팅 앱을 통해 만난 사례</h4>
            </div>
            <p className="text-slate-600 leading-relaxed font-bold mb-6">
              상대방이 20대라고 주장하여 만남을 가졌으나, 이후 미성년자임이 밝혀져 수사가 시작된 사례입니다.<br /><br />
              초기 당혹감으로 부인했으나, 본 센터의 도움을 통해 당시 인지 상태와 판단 과정에 대해 객관적으로 소명하고,
              집중적인 성인지 교육을 이수하며 자신의 행위에 대한 인식과 재발 방지 노력을 서류자료로 구체화하였습니다.<br /><br />
              엄중한 처벌이 예상되는 상황 속에서도 최종적으로 집행유예 판결이 선고되었고, 이 과정에서 관련 자료들이 양형 판단에 있어 감경 요소로 반영되었습니다.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">#인지왜곡교정</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">#양형자료제출</span>
            </div>
          </div>
          <div className="p-10 bg-white rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold">사례 02</div>
              <h4 className="text-xl font-black text-slate-900 font-display">호감을 가지고 만났으나 법적 문제가 된 사례</h4>
            </div>
            <p className="text-slate-600 leading-relaxed font-bold mb-6">
              서로 합의 하에 관계를 가졌다고 인식하였으나, 법적으로는 의제강간에 해당하여 부모의 신고로 사건이 진행되었습니다.<br /><br />
              본 센터는 내담자의 미성숙한 성 인식과 판단 과정의 문제를 분석하고,
              피해자에 대한 진지한 사과와 재발 방지 의지를 구체적으로 정리한 소견서를 통해
              내담자의 반성과 변화 의지를 법적으로 전달할 수 있도록 조력하였습니다.<br /><br />
              그 결과, 해당 자료는 재판 과정에서 내담자의 반성 및 재범 방지 노력에 대한 자료로 제출되었으며,
              양형 판단에 있어 감형 요소로 작용하였습니다.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">#재발방지약속</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">#전문가소견서</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 11. CTA 섹션 */}
    <section className="py-24 lg:py-32 bg-slate-900 rounded-[64px] text-center text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/hope/1200/800" 
          alt="Hope" 
          className="w-full h-full object-cover blur-sm brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      </div>
      <div className="max-w-4xl mx-auto px-8 relative z-10 space-y-12">
        <h2 className="text-3xl lg:text-5xl font-black font-display text-white leading-tight">지금 이 순간의 선택이<br />당신의 미래를 바꿉니다.</h2>
        <p className="text-xl lg:text-2xl text-indigo-100 font-bold leading-relaxed">
          혼자 고민한다고 해결되지 않습니다. 전문가와 함께 길을 찾으십시오.<br />
          당신의 비밀을 지키며, 최선의 해결책을 함께 고민하겠습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <a 
            href={`tel:${CONTACT_PHONE}`}
            className="inline-flex items-center justify-center gap-3 px-10 py-6 bg-white text-slate-900 text-xl font-black rounded-[32px] hover:bg-emerald-50 transition-all shadow-2xl"
          >
            <PhoneCall className="w-6 h-6" />
            전화 상담 ({CONTACT_PHONE})
          </a>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-6 bg-emerald-600 text-white text-xl font-black rounded-[32px] hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/20"
          >
            온라인 예약하기
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
        <p className="text-[#064e3b] font-bold">모든 상담은 철저히 비밀로 진행됩니다.</p>
      </div>
    </section>
  </div>
);

const TongmaeumCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900">통신매체이용음란 사건은 대부분 온라인 공간에서 발생합니다.</p>
            <p className="font-bold">상담실에서 많은 분들이 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500 font-bold">
              <p>“장난처럼 시작했습니다.”</p>
              <p>“상대가 불쾌할 거라고 깊이 생각하지 못했습니다.”</p>
              <p>“온라인이라 현실과 다르게 느껴졌습니다.”</p>
            </div>
            <p className="font-bold">디지털 환경은 익명성과 거리감을 제공합니다. 이 거리감은 순간적으로 공감 기능을 약화시키고, 충동을 빠르게 행동으로 연결시킬 수 있습니다.</p>
            <p className="bg-bg-soft p-6 rounded-2xl text-slate-900 font-black font-display border border-slate-200">
              사건을 정확히 이해하는 것이 재발 방지의 출발점입니다. 저희 센터는 그 당시의 심리 상태를 구조적으로 분석합니다.
            </p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346348/ChatGPT_Image_2026년_3월_3일_오후_06_56_55_cxvu5c.png" 
            alt="Tongmaeum Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-black italic font-display">"중요한 것은 환경을 피하는 것이 아니라 그 안에서 스스로를 통제할 수 있는 능력을 갖추는 것입니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "작동 감정 분석", desc: "당시 어떤 감정이 작동했는지" },
          { title: "행동 정당화 기제", desc: "어떤 생각이 행동을 정당화했는지" },
          { title: "반복 가능성 탐색", desc: "반복 가능성은 어디에서 비롯되는지" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-bg-soft border border-slate-200 text-center">
            <h4 className="font-black text-slate-900 mb-2 font-display">{item.title}</h4>
            <p className="text-sm text-slate-500 font-bold">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center font-display text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          통신매체이용음란 문제의 핵심은 <br />
          “다시는 같은 상황에서 같은 선택을 하지 않도록 만드는 것”입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "왜곡된 인식 교정", icon: Zap },
            { title: "디지털 충동 관리 훈련", icon: ShieldCheck },
            { title: "공감 능력 회복", icon: Users },
            { title: "자극-행동 구조 분석", icon: Search },
            { title: "현실적 재발 방지 계획", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6" />
              <h4 className="text-xl font-black mb-2 font-display text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-emerald-600/10 border border-emerald-500/20 text-center">
          <p className="text-lg leading-relaxed font-bold text-emerald-900">
            후회만으로는 구조가 바뀌지 않을 수 있습니다. <br />
            막연한 다짐이 아니라 구조적 변화가 필요합니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3 font-display">
        <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="font-bold">통신매체이용음란 사건에서는 <span className="font-black text-slate-900">온라인에서의 인식 변화와 책임 인식의 성숙</span>이 중요합니다.</p>
            <p className="font-bold">저희 센터는 상담을 통해 형성된 변화의 흐름을 차분하고 전문적인 기준 안에서 정리합니다. 형식적인 반성이 아니라 실질적인 인식 전환과 재발 방지 의지가 자연스럽게 드러나도록 준비합니다.</p>
            <div className="bg-bg-soft p-8 rounded-3xl border border-slate-200 mt-8">
              <p className="text-slate-900 font-black italic font-display">이러한 과정은 현재의 상태와 앞으로의 가능성을 설명하는 자료로서 의미 있게 참고될 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 font-display">전문적 정리</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">
              변화의 흐름을 전문적인 기준 안에서 정리하여 실질적인 인식 전환을 보여줍니다.
            </p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full flex items-center justify-center gap-2"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const DeepfakeCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900">딥페이크 및 합성물 사건은 직접적인 접촉이 없다는 이유로 처음에는 심각하게 인식되지 않는 경우가 많습니다.</p>
            <p className="font-bold">많은 내담자들이 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500 font-bold">
              <p>“실제 촬영은 아니었습니다.”</p>
              <p>“장난처럼 시작했습니다.”</p>
              <p>“온라인에서 흔히 보이는 일이라고 생각했습니다.”</p>
            </div>
            <p className="font-bold">그러나 시간이 지나면서 상황의 무게를 체감하게 됩니다. 딥페이크·합성물은 기술의 문제처럼 보이지만 실제로는 심리 구조의 문제일 수 있습니다.</p>
            <p className="bg-bg-soft p-6 rounded-2xl text-slate-900 font-black font-display border border-slate-200">
              특히 온라인 환경은 “가상”이라는 착각을 만들지만, 결과는 현실에 영향을 줍니다. 사건 이후 남는 것은 강한 불안과 자기 의문입니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746426/67d97b84c9f7063f52c317540fa1688a_mvk69s.png" 
            alt="Deepfake Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-black italic font-display">"정확한 이해가 변화의 시작입니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "현실감 약화", desc: "디지털 공간에서의 현실감 약화" },
          { title: "대상 거리감", desc: "대상에 대한 심리적 거리감" },
          { title: "인지 왜곡", desc: "‘직접적인 피해가 아닐 것’이라는 왜곡" },
          { title: "자극 추구 패턴", desc: "자극 추구 성향과 반복 패턴" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-bg-soft border border-slate-200 text-center">
            <h4 className="font-black text-slate-900 mb-2 font-display">{item.title}</h4>
            <p className="text-sm text-slate-500 font-bold">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center font-display text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          딥페이크·합성물 문제의 핵심은 기술을 멈추는 것이 아니라 <br />
          왜곡된 인식과 충동 구조를 교정하는 것입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "왜곡된 인지 교정", icon: Zap },
            { title: "디지털 책임 인식 강화", icon: ShieldCheck },
            { title: "공감 능력 회복", icon: Users },
            { title: "자극-행동 구조 분석", icon: Search },
            { title: "재발 방지 계획 수립", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6" />
              <h4 className="text-xl font-black mb-2 font-display text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-emerald-600/10 border border-emerald-500/20 text-center">
          <p className="text-lg leading-relaxed font-bold text-emerald-900">
            충동은 억제만으로는 사라지지 않습니다. 이해하고 재구성해야 약화됩니다. <br />
            막연한 다짐이 아니라 구조적 변화가 필요합니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3 font-display">
        <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="font-bold">사건 이후 많은 분들이 느끼는 것은 불안과 막막함입니다. <span className="font-black text-slate-900">“내가 어떤 노력을 하고 있다는 것을 과연 어떻게 전달할 수 있을까.”</span></p>
            <p className="font-bold">중요한 것은 말의 길이가 아니라 과정의 존재입니다. 상담은 단순한 참여가 아니라 시간을 들여 이어가는 변화의 흐름입니다. 그 흐름은 스스로에게도, 그리고 외부에서도 확인 가능한 형태로 남을 필요가 있습니다.</p>
            <div className="bg-bg-soft p-8 rounded-3xl border border-slate-200 mt-8">
              <p className="text-slate-900 font-black italic font-display">시간을 들여 이어온 상담의 과정은 그 자체로 현재의 상태와 앞으로의 가능성을 설명하는 근거가 되며, 이러한 정리된 변화의 흐름은 판단 과정에서 의미 있게 참고될 수 있습니다.</p>
            </div>
            <p className="text-xl font-black text-primary-deep mt-8 font-display">결국 중요한 것은 말이 아니라 과정이며, 그 과정이 정리될 때 변화는 더욱 설득력을 갖습니다.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 font-display">안전한 출발</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">
              딥페이크·합성물 사건은 “가상이었다”는 이유로 가볍게 끝나지 않습니다. 그 선택의 구조를 이해하고 다시는 같은 판단을 반복하지 않도록 준비하는 것이 진짜 대응입니다.
            </p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full flex items-center justify-center gap-2"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const FilmingCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 font-display">
            <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-black text-slate-900">최근 불법촬영 사건의 상당수는 휴대전화 카메라를 이용한 ‘카촬’ 형태로 발생합니다.</p>
            <p className="font-bold">많은 내담자들이 상담실에서 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500 font-bold">
              <p>“그때는 들킬 거라고 생각하지 못했습니다.”</p>
              <p>“순간적인 호기심이었습니다.”</p>
              <p>“심각성을 제대로 인식하지 못했습니다.”</p>
              <p>“지금 생각하면 왜 그랬는지 스스로도 이해가 안 됩니다.”</p>
            </div>
            <p className="font-bold">카촬은 대부분 계획적 범죄라기보다 짧은 순간의 충동과 왜곡된 판단에서 시작됩니다. 디지털 환경은 판단을 빠르게 만들고, 충동을 더 쉽게 행동으로 연결시킵니다.</p>
            <p className="bg-bg-soft p-6 rounded-2xl text-slate-900 font-black font-display border border-slate-200">
              사건을 정확히 이해하는 것이 재발 방지의 시작입니다. 저희 센터는 그 순간의 심리 구조를 함께 정리합니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088926/불법_카메라촬영_유포_전문_대응_sywzii.png" 
            alt="Filming Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-black italic font-display">"환경을 없애는 것이 아니라 그 안에서 통제 가능한 자신을 만드는 것이 목표입니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "자기 합리화", desc: "‘한 번쯤은 괜찮겠지’라는 생각" },
          { title: "거리감/비현실감", desc: "화면 속 대상에 대한 거리감" },
          { title: "현실감 약화", desc: "디지털 환경에서의 판단력 저하" },
          { title: "즉각적 반응", desc: "자극에 대한 즉각적 충동 반응" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-bg-soft border border-slate-200 text-center">
            <h4 className="font-black text-slate-900 mb-2 font-display">{item.title}</h4>
            <p className="text-sm text-slate-500 font-bold">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center font-display text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          카촬 문제의 핵심은 단순한 반성이 아니라 반복 가능성의 차단입니다. <br />
          디지털 자극은 계속 존재합니다. 환경을 피하는 것이 아니라 통제력을 갖추는 것이 핵심입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "인지 및 합리화 교정", icon: Zap },
            { title: "디지털 충동 관리 훈련", icon: ShieldCheck },
            { title: "자극-행동 구조 분석", icon: Search },
            { title: "공감 능력 회복", icon: Users },
            { title: "현실적 재발 방지 계획", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6" />
              <h4 className="text-xl font-black mb-2 font-display text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-emerald-600/10 border border-emerald-500/20 text-center">
          <p className="text-lg leading-relaxed font-bold text-emerald-950">
            충동은 억누르는 것이 아니라 이해하고 재구성해야 줄어듭니다. <br />
            막연한 다짐이 아니라 구조적인 변화가 필요합니다.
          </p>
          <p className="text-2xl font-black mt-6 text-emerald-700 font-display">
            “다시는 안 하겠다”는 다짐이 실질적인 결과로 이어지는 과정을 만듭니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-3 font-display">
        <div className="w-10 h-10 rounded-xl bg-bg-soft text-primary-deep flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="font-bold">사건 이후 많은 분들이 <span className="font-black text-slate-900">“내가 정말 변화하고 있다는 것을 어떻게 보여줄 수 있을까”</span> 고민합니다.</p>
            <p className="font-bold">저희 센터는 상담 과정을 기반으로 양형자료를 체계적으로 정리합니다. 이는 형식적인 반성문이 아니라 실제 변화의 과정을 담은 자료입니다.</p>
            <p className="font-bold">구체적인 노력과 구조화된 변화는 법원의 양형 판단 과정에서 의미 있게 참고될 수 있습니다.</p>
            <div className="bg-bg-soft p-8 rounded-3xl border border-slate-200 mt-8">
              <p className="text-slate-900 font-black italic font-display">카촬 문제는 “한 번의 실수”로만 정리되기 어렵습니다. 그 순간을 이해하고 다시는 같은 선택을 반복하지 않도록 준비하는 것, 그것이 진짜 대응입니다.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-bg-soft border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 font-display">변화의 시작</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-bold">
              혼자 고민하며 불안을 키우기보다 지금 이 시점에서 구조를 정리하는 것이 가장 안전한 선택일 수 있습니다.
            </p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full flex items-center justify-center gap-2"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const MolestationCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">강제추행 사건은 단순한 “신체 접촉”의 문제가 아닙니다. <br />그 순간, 무엇이 판단을 흐리게 했는가가 핵심입니다.</p>
            <p>많은 내담자들은 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“의도는 그게 아니었습니다.”</p>
              <p>“분위기를 오해했습니다.”</p>
              <p>“순간적으로 선을 넘었습니다.”</p>
            </div>
            <p>그러나 그 이면에는 감정 조절의 취약성, 성인지 왜곡, 관계 해석의 오류, 충동과 합리화가 동시에 작동한 심리 구조가 존재하는 경우가 많습니다.</p>
            <p className="bg-rose-50 p-6 rounded-2xl text-rose-900 font-medium">
              사건을 정확히 이해하지 못하면 반성은 감정에 머무르고, 변화는 구조로 이어지지 않습니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088924/강제_추행_전문_대응_피의자_입장_페이지_x62jpy.png" 
            alt="Molestation Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-bold italic">"사건을 객관적으로 해부해야 재발 가능성을 낮출 수 있습니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "상황 인식 왜곡", desc: "상황 인식은 어떻게 왜곡되었는가" },
          { title: "의사 해석 오류", desc: "상대의 의사를 왜 잘못 해석했는가" },
          { title: "감정-충동 연결", desc: "충동은 어떤 감정과 연결되어 있었는가" },
          { title: "반복 위험 요인", desc: "반복 위험 요인은 무엇인가" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-emerald-900">상담 및 치료 목표</h2>
        <p className="text-xl text-emerald-800 text-center mb-16 font-bold">
          강제추행 대응의 핵심은 “다시는 같은 상황을 만들지 않는 것”입니다. <br />
          상담은 단순한 반성 유도가 아닙니다. 행동의 구조를 바꾸는 과정입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "성인지 왜곡 교정", icon: Zap },
            { title: "충동 조절 능력 강화", icon: ShieldCheck },
            { title: "감정 조절 및 스트레스 관리", icon: Zap },
            { title: "공감 능력 회복", icon: Users },
            { title: "재발 방지 계획 구체화", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-sm hover:shadow-md hover:border-emerald-300 transition-colors text-slate-900 text-center">
              <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6" />
              <h4 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-emerald-600/10 border border-emerald-500/20 text-center">
          <p className="text-lg leading-relaxed">
            막연한 다짐은 오래가지 않습니다. 구조를 바꾸어야 행동이 바뀝니다. <br />
            상담을 통해 충동이 작동하는 지점을 명확히 알고, 위험 상황을 예측하며, 실제 대응 전략을 훈련합니다.
          </p>
          <p className="text-2xl font-bold mt-6 text-emerald-700">
            이 과정이 있을 때 “다시는 하지 않겠다”는 말이 실질적인 가능성으로 바뀝니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>강제추행 사건에서 중요한 것은 단순한 반성 표현이 아니라 <span className="font-bold text-slate-900">구조적 변화의 근거</span>입니다.</p>
            <p>저희 센터는 상담 과정을 기반으로 양형자료를 체계적으로 정리합니다. 형식적인 문서가 아니라 실질적인 변화 과정을 담은 자료를 준비합니다.</p>
            <p>이는 단순한 방어를 위한 문서가 아니라 사건에 대한 인식 변화와 재발 방지 노력을 객관적으로 정리하는 과정입니다.</p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-8">
              <p className="text-slate-900 font-medium">상담을 통해 형성된 구체적 변화 과정과 구조화된 재발 방지 계획은 당사자의 책임 인식과 개선 의지를 보다 명확하게 보여줄 수 있으며, 이러한 전문적이고 체계적인 자료는 양형과정에서 매우 의미 있게 참고될 수 있습니다.</p>
            </div>
            <p className="text-xl font-bold text-emerald-600 mt-8">중요한 것은 형식이 아니라 실질적인 변화의 내용입니다.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100">
            <h4 className="font-bold text-slate-900 mb-4">전문 대응의 가치</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> 행동 원인에 대한 직면</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> 재발 방지를 위한 구체적 준비</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> 삶의 방향성 재설정</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#059669] text-white text-center font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-xl shadow-emerald-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const RapeCaseContent = () => (
  <div className="space-y-24">
    {/* 2. 사건 개요 설명 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            강간 / 준강간 사건의 특징
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">강간 · 준강간 사건은 동의 여부와 순간의 판단에 대한 심리 구조 분석이 핵심입니다.</p>
            <p>사건의 실체적 진실을 가리는 가장 중요한 쟁점은 '동의'의 유무와 그 인식 과정이며, 음주 상황, 관계의 깊이 등 복합적 요소가 작용합니다.</p>
            <p className="bg-rose-50 p-6 rounded-2xl text-rose-900 font-medium">
              사건 발생 당시의 왜곡된 인식을 바로잡지 않으면 진정한 반성과 변화로 이어지기 어렵습니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088921/강간_준강간_전문_대응_vtw8fb.png" 
            alt="Rape Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-bold italic">"동의 인식의 객관적 재점검과 심리구조 해체가 재발방지의 핵심입니다."</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "동의 여부의 핵심성", desc: "사건의 실체적 진실을 가리는 가장 중요한 쟁점은 '동의'의 유무와 그 인식 과정입니다." },
          { title: "복합적 상황 맥락", desc: "음주 상황, 관계의 깊이, 당시의 분위기 등 여러 복합적 요소가 사건 해석에 영향을 미칩니다." },
          { title: "심리적 혼란의 극치", desc: "사건 이후 가해자와 피해자 모두 극심한 심리적 혼란과 인지적 왜곡을 경험하기 쉽습니다." }
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 3. 사건 이후 자주 나타나는 심리 상태 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        사건 이후의 심리적 구조
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            title: "극심한 불안과 공포", 
            items: ["수사 및 재판 과정에 대한 압박", "구속 가능성에 대한 두려움", "사회적 지위 및 가족 관계 붕괴 걱정"],
            color: "bg-rose-50 border-rose-100 text-rose-900"
          },
          { 
            title: "수치심과 자기혐오", 
            items: ["\"인생이 끝났다\"는 절망감", "사회적 낙인에 대한 극도의 공포", "자신의 행위에 대한 혼란스러운 감정"],
            color: "bg-slate-50 border-slate-100 text-slate-900"
          },
          { 
            title: "억울함과 분노", 
            items: ["\"상대방도 원했다고 생각했다\"는 주장", "상황 해석의 차이에서 오는 분노", "자신만 가해자가 되었다는 피해의식"],
            color: "bg-amber-50 border-amber-100 text-amber-900"
          },
          { 
            title: "인지 왜곡과 합리화", 
            items: ["동의에 대한 자의적 해석(동의 착각)", "관계 맥락을 통한 행위 정당화", "책임 분산 및 상황 탓으로 돌리기"],
            color: "bg-emerald-50 border-emerald-100 text-emerald-950"
          }
        ].map((group, idx) => (
          <div key={idx} className={`p-8 rounded-[32px] border ${group.color}`}>
            <h4 className="text-xl font-bold mb-6">{group.title}</h4>
            <ul className="space-y-3">
              {group.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm opacity-80">
                  <span className="shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* 4. 상담 목표 */}
    <section className="bg-emerald-50 rounded-[48px] p-12 lg:p-20 border border-emerald-100 text-slate-900">
      <div className="max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-emerald-900">본 센터의 개입 목표</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            "사건 발생 당시의 심리구조 정밀 분석",
            "동의 인식 구조의 근본적 재점검",
            "성인지 관점의 왜곡 현상 교정",
            "고위험 상황에서의 충동 통제력 강화",
            "객관적 지표를 통한 재발 위험 차단"
          ].map((goal, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">
                {idx + 1}
              </div>
              <p className="font-medium text-slate-800">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 5. 프로그램 구성 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">단계별 전문 프로그램</h2>
      <div className="space-y-4">
        {[
          { step: "01", title: "초기 위기 안정", desc: "불안 및 공황 관리, 가족 대응 전략 수립, 심리적 안정화" },
          { step: "02", title: "사건 구조 분석", desc: "당시 심리 상태 복기, 음주·흥분 상태 분석, 동의 해석 과정 점검, 인지왜곡 패턴 확인" },
          { step: "03", title: "성인지 교정 개입", desc: "동의 개념의 재구성, 관계 권력 구조 이해, 피해 영향력 인식 강화" },
          { step: "04", title: "충동 통제 훈련", desc: "고위험 상황 차단 전략, 음주 상황 관리, 위험 환경 회피 계획 수립" },
          { step: "05", title: "재발방지 설계", desc: "개인별 트리거 목록화, 대응 루틴 설계, 자기통제 프로토콜 구축" }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
            <div className="text-4xl font-black text-emerald-100 group-hover:text-emerald-500 transition-colors shrink-0">{item.step}</div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 7. 자주 묻는 질문 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12">자주 묻는 질문 (FAQ)</h2>
      <div className="space-y-6">
        {[
          { q: "음주 상태였는데도 책임이 있나요?", a: "성범죄 가해자 심리상담은 술에 의존했던 당시의 인식 구조를 정밀하게 재정비하는 과정입니다." },
          { q: "상대방과 관계가 있었는데도 문제가 되나요?", a: "과거의 관계 유무와 무관하게, 해당 시점에서의 명확한 동의 구조가 핵심입니다. 본 센터는 동의 인식의 왜곡 여부를 객관적으로 점검합니다." },
          { q: "억울한 부분이 있어도 상담이 필요한가요?", a: `억울함의 감정과는 별개로, 본인의 행동 패턴에서 나타나는 반복 위험 요인을 점검하고 차단하는 것은 향후 삶을 위해 반드시 필요합니다.` }
        ].map((faq, idx) => (
          <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-white">
            <div className="flex gap-4 mb-4">
              <span className="text-emerald-600 font-black text-xl">Q.</span>
              <h4 className="text-lg font-bold text-slate-900">{faq.q}</h4>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-300 font-black text-xl">A.</span>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 8. 이런 분들이 상담을 받습니다 */}
    <section className="p-12 lg:p-20 rounded-[48px] bg-emerald-50 border border-emerald-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">이런 분들께 권장합니다</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "음주 상황에서 의도치 않게 사건이 발생한 경우",
          "상대방과의 관계 해석이 극명하게 엇갈리는 경우",
          "특정 상황에서 충동 통제가 어려웠던 경험이 있는 경우",
          "법적 절차를 앞두고 자신의 심리 상태 정리가 필요한 경우",
          "다시는 같은 실수를 반복하고 싶지 않은 경우"
        ].map((text, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
            <span className="text-slate-700 font-medium">{text}</span>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <a 
          href={NAVER_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-5 bg-[#059669] text-white font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-xl shadow-emerald-200"
        >
          성범죄 가해자 심리상담 신청하기
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  </div>
);

const CasePage = ({ title, slug }: { title: string; slug: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    {/* Page Header */}
    <div className="bg-slate-50 py-16 lg:py-32 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          사건유형 전체보기
        </Link>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">{title} 전문 대응</h1>
        <div className="max-w-2xl leading-relaxed">
          {slug === 'workplace' ? (
            <p className="text-2xl lg:text-3xl text-slate-600 font-medium">
              (직장 내 성희롱 · 교수-학생 관계 · 동료 간 사건 · 교내 성비위 등)
            </p>
          ) : (
            <p className="text-xl text-slate-500">
              {title} 사건은 법적 처벌뿐만 아니라 심리적 왜곡을 바로잡는 것이 재발 방지의 핵심입니다.
            </p>
          )}
        </div>
      </div>
    </div>

    {/* Content Sections */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {slug === 'rape' && <RapeCaseContent />}
      {slug === 'molestation' && <MolestationCaseContent />}
      {slug === 'filming' && <FilmingCaseContent />}
      {slug === 'deepfake' && <DeepfakeCaseContent />}
      {slug === 'tongmaeum' && <TongmaeumCaseContent />}
      {slug === 'juvenile' && <JuvenileCaseContent />}
      {slug === 'statutory-rape' && <StatutoryRapeCaseContent />}
      {slug === 'stalking' && <StalkingCaseContent />}
      {slug === 'workplace' && <WorkplaceCaseContent />}
      {slug !== 'rape' && slug !== 'molestation' && slug !== 'filming' && slug !== 'deepfake' && slug !== 'tongmaeum' && slug !== 'juvenile' && slug !== 'statutory-rape' && slug !== 'stalking' && slug !== 'workplace' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-20">
            
            {/* Section 1: Overview */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              사건 개요 및 심리 상태
            </h2>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-8">
                {title} 관련 사건에 연루된 경우, 대다수의 내담자들은 극도의 공포와 수치심, 그리고 상황에 대한 합리화나 왜곡된 인지 상태를 경험하게 됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "공포/불안", desc: "법적 처벌 및 사회적 낙인에 대한 두려움" },
                  { label: "인지 왜곡", desc: "자신의 행동을 정당화하거나 축소하려는 경향" },
                  { label: "충동 조절", desc: "특정 상황에서의 통제력 상실" },
                  { label: "죄책감/수치심", desc: "자신에 대한 혐오 및 심리적 위축" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-900 mb-1">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Goals */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              상담 및 치료 목표
            </h2>
            <div className="space-y-6">
              {[
                { title: "인지 구조 재구성", desc: "성적 대상화 및 왜곡된 성인지 관점을 객관적으로 분석하고 교정합니다." },
                { title: "책임 인식 훈련", desc: "피해자의 고통을 가시화하고 자신의 행동에 대한 진정한 책임을 수용합니다." },
                { title: "재발 방지 루틴 설계", desc: "고위험 상황을 식별하고 충동을 차단할 수 있는 구체적인 행동 지침을 수립합니다." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-4xl font-black text-slate-100 shrink-0">0{idx + 1}</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Program */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              프로그램 구성
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-4">초기 집중 개입 (1-4회)</h4>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• 심리 평가 및 사건 구조 분석</li>
                  <li>• 위기 관리 및 정서적 안정화</li>
                  <li>• 인지 왜곡 탐색</li>
                </ul>
              </div>
              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-4">심화 교정 훈련 (5-12회)</h4>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• 성인지 감수성 향상 교육</li>
                  <li>• 충동 조절 및 행동 수정</li>
                  <li>• 대인관계 기술 훈련</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Sticky */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="p-8 rounded-3xl bg-[#4F46E5] text-white shadow-xl shadow-indigo-200">
              <h3 className="text-xl font-bold mb-4">양형자료 연계</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                본 프로그램 이수 시, 법원 및 검찰 제출용 전문가 소견서와 재범위험성 평가 보고서 발급이 가능합니다.
              </p>
              <Link to="/legal/info" className="block w-full py-3 bg-white text-[#4F46E5] text-center font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                양형자료 상세 보기
              </Link>
            </div>

            <div className="p-8 rounded-3xl border border-slate-200 bg-white">
              <h3 className="text-lg font-bold text-slate-900 mb-4">상담 문의</h3>
              <div className="space-y-4">
                <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <PhoneCall className="w-5 h-5 text-[#4F46E5]" />
                  <span className="font-bold">{CONTACT_PHONE}</span>
                </a>
                <a 
                  href={NAVER_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-primary-deep text-white text-center font-bold rounded-2xl hover:bg-emerald-900 transition-colors"
                >
                  온라인 상담 신청
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  </motion.div>
);

const TreatmentPage = ({ title, slug }: { title: string; slug: string }) => {
  const getHeroBg = (slug: string) => {
    switch (slug) {
      case 'offender':
        return "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746424/8dd7bf0c969b781cadaeeb3f81a21923_u0fgqg.png";
      case 'digital':
        return "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088919/불법_카메라촬영_유포_xntnnr.png";
      case 'paraphilia':
        return "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088926/성도착_행동교정_프로그램_luaytt.png";
      case 'addiction':
        return "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088924/성중독행동중독_프로그램_j8ugtz.png";
      default:
        return null;
    }
  };

  const bgImage = getHeroBg(slug);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Page Header */}
      <div className="relative bg-slate-50 py-16 lg:py-32 border-b border-slate-200 overflow-hidden">
        {bgImage && (
          <div className="absolute inset-0 opacity-15">
            <img 
              src={bgImage} 
              alt={`${title} Hero Background`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:text-emerald-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            상담/치료 전체보기
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">{title} 프로그램</h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            단순한 억제가 아닌, 행동의 근본 원인을 분석하고 심리적 루프를 해체하는 전문 치료 과정입니다.
          </p>
        </div>
      </div>

    {/* Treatment Flow Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">치료 프로세스</h2>
        <p className="text-slate-500">평가부터 재발방지까지, 체계적인 5단계 개입을 진행합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { step: "평가", desc: "심리 상태 및 위험도 정밀 진단", icon: ClipboardCheck },
          { step: "원인 분석", desc: "행동의 심리적 기제 및 루프 파악", icon: Search },
          { step: "교정 개입", desc: "인지 왜곡 교정 및 사고 전환", icon: Zap },
          { step: "훈련", desc: "충동 차단 및 대안 행동 습득", icon: ShieldCheck },
          { step: "재발방지", desc: "지속적인 모니터링 및 루틴 관리", icon: Lock }
        ].map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.step}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
            {idx < 4 && (
              <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Detailed Content */}
    <div className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {slug === 'addiction' ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">왜 성중독 · 행동중독 치료가 필요할까요?</h2>
            
            <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-xl border border-slate-100 space-y-12">
              <div className="text-center space-y-4">
                <p className="text-2xl font-medium text-slate-400 italic">“이번이 마지막입니다.”</p>
                <p className="text-lg text-slate-600">많은 분들이 그렇게 말합니다. 그리고 또 반복됩니다.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    성중독과 행동중독은 <span className="font-bold text-emerald-600">단순한 의지의 문제가 아닙니다.</span><br />
                    반복된 자극이 뇌에 학습되고, 스트레스와 감정을 처리하는 방식이 왜곡되며 특정 상황에서 통제가 무너지는 구조가 형성됩니다.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    처벌은 행동을 멈추게 할 수는 있습니다. 하지만 <span className="font-bold text-rose-500">충동의 구조까지 바꾸지는 못합니다.</span>
                  </p>
                  <p className="text-lg text-slate-700 font-medium">
                    문제는 한 번의 행동이 아니라 계속 이어지는 패턴입니다.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088924/성중독행동중독_프로그램_j8ugtz.png" 
                    alt="Sex Addiction Therapy" 
                    className="rounded-[40px] shadow-2xl w-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                    <p className="text-slate-900 font-bold italic text-sm">"충동-자극-행동 루프를 해체하고 자율 통제 능력을 회복합니다."</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-100">
                <p className="text-xl text-slate-800 leading-relaxed mb-8">
                  치료는 “하지 말라”는 조언이 아닙니다.<br />
                  <span className="font-bold text-emerald-600">왜 반복되는지, 어디서 통제가 무너지는지, 어떤 왜곡된 인식이 개입하는지</span> 그 구조를 객관적으로 분석하고 교정하는 과정입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                    <p className="text-rose-800 font-medium">치료받지 않은 충동은 사라지지 않습니다. 잠시 멈췄다가 다른 방식으로 나타날 수 있습니다.</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-emerald-800 font-medium">지금 멈추는 선택은 자신을 보호하는 결정입니다.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-10 rounded-[32px] text-center border border-slate-100">
                <p className="text-lg text-slate-500 mb-4">저희 센터는 구조를 분석하고, 재발 위험을 낮추며, 다시 통제 가능한 삶으로 돌아갈 수 있도록 돕습니다.</p>
                <p className="text-2xl font-bold text-slate-900">반복을 끝내고 싶다면, 지금이 시작입니다.</p>
              </div>
            </div>
          </div>
        ) : slug === 'offender' ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">성범죄 가해자 심리상담은 단순한 반성 과정이 아닙니다</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 분들이 성범죄 가해자 심리상담을 <span className="text-slate-900 font-bold">"잘못을 인정하는 과정"</span>이라고 생각하기도 합니다.</p>
                  <p>하지만 실제 성범죄 가해자 심리상담은 그보다 훨씬 넓은 의미를 가지고 있습니다.</p>
                  
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <p className="font-bold text-slate-900">성범죄 가해자 심리상담에서는</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                        <span>사건이 발생한 상황과 배경을 차분하게 정리하고</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                        <span>자신의 감정과 행동 패턴을 이해하며</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                        <span>비슷한 상황이 다시 발생하지 않도록 준비하는 과정이 이루어집니다.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-emerald-600 font-bold font-display">
                    이 과정은 단순히 사건만을 다루는 것이 아니라 앞으로의 삶을 안정적으로 정리하는 과정이기도 합니다.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746424/8dd7bf0c969b781cadaeeb3f81a21923_u0fgqg.png" 
                  alt="Counseling Session" 
                  className="rounded-[40px] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                  <p className="text-slate-900 font-bold italic">"변화는 구조를 바꿀 때 시작됩니다."</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 lg:p-16 shadow-sm border border-slate-100 mb-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">성범죄 가해자 심리상담은 변화하려는 의지를 보여주는 과정이기도 합니다</h3>
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                <p>사건 이후 어떤 태도를 보이는지는 이후 과정에서 중요한 의미를 가질 수 있습니다.</p>
                <p>사건이 발생한 뒤 자신의 행동을 돌아보고 재발을 방지하려는 노력을 시작하는 것은 <span className="font-bold text-slate-900">개인의 삶을 위해서도 매우 중요한 과정</span>입니다.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="font-bold text-slate-900">실제로 많은 분들이 사건 이후 성범죄 가해자 심리상담을 통해</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                        <span>자신의 행동 원인을 이해하고</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                        <span>충동이나 판단 오류가 발생했던 상황을 분석하며</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                        <span>다시 같은 일이 발생하지 않도록 행동을 교정하는 과정을 시작합니다.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-emerald-900 font-medium">
                      이러한 과정은 단순히 개인의 심리 회복에만 의미가 있는 것이 아니라 <span className="font-bold">변화를 위해 실제로 어떤 노력을 했는지를 보여주는 과정</span>이 되기도 합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-slate-100">
                  <p>
                    전문 상담기관에서의 성범죄 가해자 심리상담 참여, 교육 과정, 행동 교정 노력 등은 필요할 경우 <span className="font-bold text-emerald-600 underline decoration-2 underline-offset-4">객관적인 자료나 전문가 의견 형태로 정리될 수 있으며 재판 과정에서 비중있게 참고되는 요소가 됩니다.</span>
                  </p>
                  <p>
                    물론 성범죄 가해자 심리상담이 재판의 결과를 직접적으로 결정하는 것은 아닙니다. 그러나 사건 이후 아무런 변화 노력 없이 시간을 보내는 것보다 자신의 행동을 이해하고 재발을 방지하려는 노력을 실제로 시작하는 것은 <span className="font-bold text-slate-900">양형 과정에서 충분히 고려될 수 있는 중요한 요소</span>가 될 수 있습니다.
                  </p>
                  <p className="bg-slate-50 text-slate-900 p-8 rounded-2xl border border-slate-100">
                    즉, 사건 이후 어떤 태도로 변화 노력을 했는지, 재발 방지를 위해 어떤 과정을 시작했는지는 <span className="text-emerald-600 font-bold">양형 판단 과정에서 의미 있게 반영될 가능성이 높습니다.</span>
                  </p>
                  <p className="text-center font-bold text-xl text-slate-900">
                    따라서 성범죄 가해자 심리상담은 단순히 마음을 정리하는 시간이 아니라 <br className="hidden sm:block" />
                    <span className="text-emerald-600">앞으로의 삶을 다시 정리하고 변화의 과정을 시작하는 첫 단계</span>가 될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">혼자 고민할수록 상황은 더 복잡해질 수 있습니다</h3>
                <p className="text-slate-600 mb-8">사건 이후 많은 분들이 주변에 이야기하지 못한 채 혼자 고민을 이어가게 됩니다.</p>
                <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 space-y-4">
                  <p className="font-bold text-rose-900">하지만 혼자서 생각이 계속 반복되면</p>
                  <ul className="space-y-3 text-rose-800">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>불안이 더 커지거나</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>분노가 더 커지거나</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>상황 판단이 흐려질 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
                <p className="mt-8 text-slate-900 font-bold text-center">
                  전문가와 함께 상황을 정리하면 생각보다 빠르게 마음이 정리되는 경우도 많습니다.
                </p>
              </div>
              <div className="bg-primary-deep text-white p-12 lg:p-16 rounded-[48px] flex flex-col justify-center text-center space-y-10 shadow-2xl shadow-emerald-200/20">
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight break-keep [text-wrap:balance]">
                  성범죄 가해자 심리상담은 <br className="hidden sm:block" />
                  삶을 다시 정리하는 출발점이 될 수 있습니다
                </h3>
                <div className="space-y-6 text-lg lg:text-xl text-emerald-50/90 leading-relaxed">
                  <p className="break-keep">
                    성범죄 가해자 심리상담을 시작하는 것은 자신을 포기하는 것이 아니라 <br className="hidden md:block" />
                    오히려 자신의 삶을 다시 정리하려는 용기 있는 선택입니다.
                  </p>
                  <p className="text-emerald-100/80">사건 이후의 삶은 아직 끝난 것이 아닙니다.</p>
                  <p className="text-2xl lg:text-3xl font-black text-white mt-4">
                    지금의 선택이 앞으로의 방향을 바꿀 수 있습니다.
                  </p>
                </div>
                <div className="pt-8 border-t border-white/10">
                  <p className="text-emerald-100 font-medium text-lg">
                    혼자 고민하기보다 전문가와 함께 상황을 차분히 정리해 보는 것이 <br className="hidden sm:block" />
                    실질적인 도움이 될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : slug === 'paraphilia' ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">왜 성도착 · 행동교정 치료가 필요합니까?</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 분들이 처음에는 이렇게 생각합니다.</p>
                  <div className="pl-6 border-l-4 border-slate-200 space-y-3 py-2 italic text-slate-500">
                    <p>“남들에게 피해만 주지 않으면 괜찮지 않을까.”</p>
                    <p>“이건 나만의 취향일 뿐이다.”</p>
                    <p>“통제만 잘하면 문제는 없다.”</p>
                  </div>
                  <p>하지만 시간이 지나면서 불안이 생깁니다.</p>
                  <ul className="space-y-2 text-slate-900 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-rose-500" /> 생각이 점점 강해진다.</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-rose-500" /> 자극이 점점 강해진다.</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-rose-500" /> 통제하는 데 점점 더 많은 에너지가 든다.</li>
                  </ul>
                  <p className="text-xl font-bold text-slate-900 pt-4">
                    그리고 스스로 묻게 됩니다.<br />
                    <span className="text-emerald-600">“나는 이 패턴을 계속 안고 살아가도 괜찮은가.”</span>
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088926/성도착_행동교정_프로그램_luaytt.png" 
                  alt="Behavioral Correction" 
                  className="rounded-[40px] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                  <p className="text-slate-900 font-bold italic">"치료의 핵심은 억제가 아니라 재구성입니다."</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">문제는 ‘취향’이 아니라 ‘통제력’입니다</h3>
                <p className="text-slate-600 mb-8">모든 성적 관심이 문제가 되는 것은 아닙니다. 그러나 다음과 같은 경우라면 치료가 필요할 수 있습니다.</p>
                <ul className="space-y-4">
                  {[
                    "특정 자극에 과도하게 집착한다",
                    "점점 더 강한 자극을 찾아가게 된다",
                    "현실 관계보다 왜곡된 상상에 의존한다",
                    "멈추고 싶은데 잘 되지 않는다",
                    "불안과 죄책감이 함께 따라온다"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 p-4 bg-slate-50 rounded-2xl text-sm text-slate-500 leading-relaxed">
                  이것은 단순한 기호의 문제가 아니라 <span className="font-bold text-slate-900">학습된 자극 구조와 강화된 행동 패턴</span>의 문제일 수 있습니다.
                </p>
              </div>
              <div className="bg-slate-50 text-slate-900 p-10 rounded-[40px] flex flex-col justify-center border border-slate-100">
                <h3 className="text-2xl font-bold mb-6">행동은 반복될수록 강화됩니다</h3>
                <div className="space-y-6 text-slate-600">
                  <p>성적 자극과 행동은 뇌의 보상체계와 깊이 연결되어 있습니다.</p>
                  <p>반복될수록 회로는 강화되고, 강화될수록 통제는 어려워집니다.</p>
                  <p className="text-slate-900 font-medium">의지로 누르는 것은 잠시 멈출 수는 있어도 구조를 바꾸지는 못합니다.</p>
                  <div className="pt-6 border-t border-slate-200">
                    <p className="text-xl font-bold text-slate-900">치료의 핵심은 억제가 아니라 <span className="text-emerald-600">재구성</span>입니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 mb-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">성도착 · 행동교정 치료는 이렇게 진행됩니다</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "왜곡된 인지 패턴 교정", icon: Zap },
                  { title: "자극 반응 구조 분석", icon: Search },
                  { title: "충동 조절 능력 강화", icon: ShieldCheck },
                  { title: "건강한 성적 에너지 재설계", icon: Zap },
                  { title: "재발 방지 계획 수립", icon: ClipboardCheck }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl text-center hover:bg-emerald-50 transition-colors group">
                    <item.icon className="w-8 h-8 mx-auto mb-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-center text-lg text-slate-600">이는 단순한 상담이 아니라 <span className="text-emerald-600 font-bold">행동 시스템을 다시 설계하는 과정</span>입니다.</p>
            </div>

            <div className="bg-primary-deep text-white p-12 rounded-[40px] text-center space-y-6">
              <h3 className="text-3xl font-bold">지금 멈추는 선택이 가장 안전합니다</h3>
              <p className="text-xl text-emerald-100">많은 문제는 “더 심각해진 뒤”에 상담실을 찾습니다.</p>
              <div className="max-w-3xl mx-auto space-y-6 text-lg">
                <p>그러나 진짜 변화는 아직 통제 가능할 때 시작하는 것이 가장 효과적입니다.</p>
                <p className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                  성도착 · 행동교정 치료는 누군가를 판단하기 위한 과정이 아니라 <br />
                  <span className="font-bold text-2xl">자신을 안전하게 지키기 위한 선택입니다.</span>
                </p>
                <p className="text-xl">혼자 해결하려 애쓰지 않으셔도 됩니다.</p>
              </div>
              <p className="text-3xl font-black pt-6">반복을 끝내고 싶다면, 지금이 시작입니다.</p>
            </div>
          </div>
        ) : slug === 'digital' ? (
          <div className="max-w-5xl mx-auto space-y-24">
            {/* 1. 디지털 성범죄 상담·치료가 필요한 이유 */}
            <section>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">디지털 성범죄 상담·치료가 필요한 이유</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                    <p className="text-slate-500 mb-6 italic">“많은 분들이 처음에는 이렇게 말합니다.”</p>
                    <div className="space-y-4">
                      {["“직접적인 접촉은 없었습니다.”", "“순간적인 호기심이었습니다.”", "“온라인에서 일어난 일이었습니다.”"].map((quote, i) => (
                        <p key={i} className="text-lg font-medium text-slate-800 pl-4 border-l-4 border-emerald-200">{quote}</p>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">처음에는 사건을 그렇게 이해하려 합니다. 하지만 시간이 지나면 대부분 같은 질문에 다시 마주하게 됩니다.</p>
                  
                  <div className="bg-primary-deep text-white p-10 rounded-[40px] shadow-xl">
                    <h3 className="text-xl font-bold mb-8 text-emerald-100">우리가 마주해야 할 질문들</h3>
                    <ul className="space-y-6">
                      {[
                        "왜 그 순간에 멈추지 못했는가.",
                        "왜 화면 앞에서는 판단이 느슨해졌는가.",
                        "다시 같은 상황이 오면 나는 통제할 수 있는가."
                      ].map((q, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center shrink-0 text-xs">{i+1}</span>
                          <p className="text-lg leading-tight">{q}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088919/불법_카메라촬영_유포_xntnnr.png" 
                    alt="Digital Crime Therapy" 
                    className="rounded-[40px] shadow-2xl w-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-8 -right-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                    <p className="text-slate-900 font-bold italic text-sm">"온라인 환경의 특수성과 심리적 제동 장치의 약화"</p>
                  </div>
                </div>
              </div>
              <p className="mt-12 text-center text-slate-500 text-sm max-w-3xl mx-auto">
                이 질문은 단순한 법적 문제를 넘어 자신의 행동을 이해하려는 과정에서 시작됩니다.
              </p>
            </section>

            {/* 2. 디지털 성범죄는 단순한 환경의 문제가 아닙니다 */}
            <section>
              <div className="bg-slate-50 rounded-[40px] p-12 border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">디지털 성범죄는 단순한 환경의 문제가 아닙니다</h2>
                <p className="text-slate-600 mb-12">디지털 성범죄에는 다음과 같은 행동들이 포함됩니다.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                  {[
                    "불법촬영(카메라 촬영, 일명 카촬)",
                    "촬영물 저장 및 소지",
                    "촬영물 유포",
                    "온라인 성적 콘텐츠 문제 행동",
                    "딥페이크 및 합성물 관련 문제"
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">반복되는 행동 패턴 (도파민 루프)</h3>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {[
                      { title: "자극", color: "bg-rose-50 text-rose-600" },
                      { title: "충동적인 행동", color: "bg-orange-50 text-orange-600" },
                      { title: "불안과 후회", color: "bg-slate-50 text-slate-600" },
                      { title: "자기 합리화", color: "bg-emerald-50 text-emerald-600" },
                      { title: "다시 반복", color: "bg-rose-600 text-white" }
                    ].map((step, i, arr) => (
                      <React.Fragment key={i}>
                        <div className={`px-6 py-4 rounded-2xl font-bold text-sm ${step.color} shadow-sm`}>
                          {step.title}
                        </div>
                        {i < arr.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-slate-300 hidden md:block" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mt-10 text-center text-slate-500 text-sm">
                    이 구조가 형성되면 비슷한 상황이 다시 왔을 때 같은 선택이 반복될 가능성이 높아집니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. 온라인 환경에서는 왜 판단이 약해질까요 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">온라인 환경에서는 왜 판단이 약해질까요?</h2>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { title: "익명성", icon: Shield },
                    { title: "거리감", icon: MapPin },
                    { title: "즉각적 자극", icon: Zap }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 bg-slate-50 rounded-2xl">
                      <item.icon className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  이러한 요소들은 순간적으로 도덕적 제동 장치를 약하게 만들 수 있습니다.
                </p>
              </div>

              <div className="bg-rose-50 p-10 rounded-[40px] border border-rose-100">
                <h2 className="text-2xl font-bold text-rose-900 mb-8">자주 발견되는 생각의 왜곡</h2>
                <ul className="space-y-4">
                  {[
                    "“다들 하는 일 같았다.”",
                    "“상대는 크게 상처받지 않았을 것 같았다.”",
                    "“이번 한 번 정도는 괜찮을 것 같았다.”"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-rose-800">
                      <div className="w-5 h-5 rounded-full bg-rose-200 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold">!</div>
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-rose-600 italic">
                  이러한 생각이 반복되면 행동은 점점 자연스러워지고 자기 통제는 점점 어려워질 수 있습니다.
                </p>
              </div>
            </section>

            {/* 4. 상담은 행동의 구조를 이해하는 과정입니다 */}
            <section className="bg-slate-50 text-slate-900 p-12 rounded-[40px] border border-slate-100">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">상담은 행동의 구조를 이해하는 과정입니다</h2>
                <p className="text-slate-500">단순히 “왜 그랬는가”만 묻지 않습니다. 대신 구체적인 재발 방지 전략을 함께 만듭니다.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "어떤 감정이 그 행동을 촉발했는가",
                  "어떤 생각이 판단을 흐리게 만들었는가",
                  "어떤 상황에서 통제가 무너졌는가",
                  "비슷한 상황이 다시 오면 어떻게 다르게 대응할 것인가"
                ].map((q, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 flex gap-4">
                    <HelpCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <p className="font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. 디지털 성범죄 치료는 구조를 바꾸는 과정입니다 (기존 박스 유지) */}
            <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">디지털 성범죄 치료는 구조를 바꾸는 과정입니다</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "왜곡된 인지 교정", icon: Zap },
                  { title: "충동 조절 능력 강화", icon: ShieldCheck },
                  { title: "온라인 환경 트리거 관리", icon: Search },
                  { title: "공감 능력 회복", icon: Users },
                  { title: "재발 방지 계획 수립", icon: ClipboardCheck }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl text-center hover:bg-emerald-50 transition-colors group">
                    <item.icon className="w-8 h-8 mx-auto mb-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-center text-lg text-slate-600">단순한 다짐이 아니라 <span className="text-emerald-600 font-bold">행동 시스템을 재설계하는 과정</span>입니다.</p>
            </div>

            {/* 6. 지금이 가장 중요한 시점입니다 */}
            <section className="text-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">지금이 가장 중요한 시점입니다</h2>
                <div className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed space-y-4">
                  <p>스마트폰과 인터넷은 우리의 일상에서 사라지지 않습니다.</p>
                  <p>중요한 것은 환경을 완전히 피하는 것이 아니라 <span className="font-bold text-emerald-600">그 안에서 스스로를 통제할 수 있는 힘</span>을 만드는 것입니다.</p>
                  <p>디지털 성범죄 상담은 낙인을 위한 과정이 아니라 다시는 같은 선택을 반복하지 않기 위한 준비 과정입니다.</p>
                </div>
              </div>

              <div className="bg-primary-deep text-white p-12 rounded-[40px] shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <p className="text-2xl font-bold">혼자 해결하려 애쓰지 않으셔도 됩니다.</p>
                  <p className="text-4xl font-black">반복을 끝내고 싶다면,<br />지금이 변화의 시작이 될 수 있습니다.</p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 max-w-3xl mx-auto">
                <p className="text-slate-700 font-medium leading-relaxed">
                  디지털 성범죄 문제는 혼자 해결하려 할수록 반복되기 쉽습니다.<br />
                  전문 상담을 통해 행동 패턴을 이해하고 재발을 예방하는 것이 중요합니다.
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">왜 {title} 치료가 필요한가?</h2>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">행동 루프의 해체</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">충동-자극-행동으로 이어지는 고착화된 심리적 루프를 분석하여 근본적인 변화를 이끌어냅니다.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">객관적 자기 인식</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">자신의 행동이 타인에게 미치는 영향을 객관적으로 바라보고 책임을 수용하는 과정을 거칩니다.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">실질적 대처 기술</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">고위험 상황에서 즉각적으로 사용할 수 있는 충동 차단 기술을 훈련합니다.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                alt="Counseling" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                <p className="text-slate-900 font-bold italic">"부산 성범죄 특화 심리 상담, 교정 치료 및 전문 상담을 지향합니다."</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* CTA */}
    <section className="py-24 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">지금 전문가와 상담하세요</h2>
        <p className="text-lg text-slate-500 mb-10">귀하의 고민을 가장 잘 이해하는 전문가가 철저한 비밀 보장 하에 도움을 드립니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#059669] text-white font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-lg shadow-emerald-200"
          >
            온라인 상담 예약
          </a>
          <a href={`tel:${CONTACT_PHONE}`} className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
            <PhoneCall className="w-5 h-5" />
            {CONTACT_PHONE}
          </a>
        </div>
      </div>
    </section>
  </motion.div>
);
};

const EducationPage = ({ title, slug }: { title: string; slug: string }) => {
  const getEducationDetails = (slug: string) => {
    switch (slug) {
      case 'prevention':
        return {
          subtitle: "재발 방지를 위한 핵심 심리 교육",
          details: [
            "성범죄 발생의 심리적 기제 분석",
            "재범 위험 요인 파악 및 통제 전략",
            "충동 조절 및 상황 대처 훈련",
            "건강한 성적 가치관 확립"
          ]
        };
      case 'sensitivity':
        return {
          subtitle: "성적 권리와 존중의 이해",
          details: [
            "성인지 감수성의 개념과 중요성",
            "성적 자기결정권의 이해",
            "일상 속의 성차별적 요소 인지",
            "타인의 성적 경계 존중하기"
          ]
        };
      case 'distortion':
        return {
          subtitle: "잘못된 성 관념의 인지적 교정",
          details: [
            "성 관련 인지 왜곡의 유형 파악",
            "피해자 유발론 등 잘못된 신념 교정",
            "객관적 상황 판단 능력 배양",
            "공감 능력 향상 프로그램"
          ]
        };
      case 'compliance':
        return {
          subtitle: "법질서 준수 및 사회적 책임",
          details: [
            "성범죄 관련 법률 체계 이해",
            "범죄 행위의 사회적 파급력 인식",
            "준법 의식 내면화 과정",
            "사회 복귀를 위한 책임감 강화"
          ]
        };
      case 'discrimination':
        return {
          subtitle: "평등한 성 역할과 차별 해소",
          details: [
            "성차별의 역사적·사회적 배경",
            "고정관념 탈피와 다양성 존중",
            "평등한 소통 방식 연습",
            "건강한 공동체 의식 함양"
          ]
        };
      default:
        return {
          subtitle: "법원 제출용 전문 교육 이수 프로그램입니다.",
          details: [
            "전문 커리큘럼 이수",
            "심리 상태 분석 및 평가",
            "변화 양상 기록",
            "이수 확인서 발급"
          ]
        };
    }
  };

  const content = getEducationDetails(slug);

  if (slug === 'prevention') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen"
      >
        {/* SEO Optimized Main Title Section */}
        <div className="relative bg-slate-50 py-24 lg:py-32 border-b border-slate-200 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786107152/성범죄_재범방지_교육_skedbn.png" 
              alt="Prevention Hero Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-sm font-bold mb-8"
            >
              <ShieldCheck className="w-4 h-4" />
              전문가 칼럼: 성범죄 재범방지 교육의 중요성
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.25] text-slate-900 max-w-[800px] mx-auto break-keep [text-wrap:balance]">
              부산 성범죄 재범방지 교육이 중요한 이유 : <br className="hidden sm:block" />
              단순한 절차가 아니라 <span className="text-emerald-600">‘변화의 증거’</span>입니다
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              사건 이후의 막막함, 변화를 향한 첫걸음이 당신의 미래를 결정합니다.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <article className="prose prose-slate prose-lg max-w-none">
            
            {/* Empathy Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-emerald-500 pl-6">사건 이후 느끼는 불안과 혼란에 대하여</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>성범죄 사건에 연루되면 많은 분들이 처음 겪는 상황에 큰 혼란을 느끼게 됩니다.</p>
                <blockquote className="bg-slate-50 p-8 rounded-2xl border-none italic text-slate-700 font-medium">
                  "앞으로 어떻게 해야 할까"<br />
                  "내 상황이 얼마나 심각한 걸까"<br />
                  "지금 무엇을 해야 하는 게 맞을까"
                </blockquote>
                <p>이런 질문들이 머릿속을 계속 맴돌게 됩니다. 실제로 <strong>성범죄 상담</strong>을 하다 보면 많은 분들이 사건 자체보다 앞으로의 결과에 대한 불안 때문에 더 큰 고통을 느끼고 있습니다.</p>
                <p>이럴 때 중요한 것은 단순히 상황을 피하거나 시간을 보내는 것이 아니라, 지금부터 어떤 태도로 문제를 마주하느냐입니다. 그 과정에서 중요한 역할을 하는 것이 바로 <strong>성범죄 재범방지 교육</strong>과 심리 상담입니다.</p>
              </div>
            </section>

            {/* Actual Case Section */}
            <section className="mb-20 bg-emerald-50/50 p-10 lg:p-16 rounded-[40px] border border-emerald-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-emerald-600" />
                실제 상담실 사례
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>상담실에는 사건 이후 처음으로 상담을 받으러 오는 분들이 많습니다. 몇 달 전에도 한 30대 직장인이 상담실을 찾아왔습니다.</p>
                <p>문을 열고 들어와 의자에 앉았지만 한동안 말을 하지 못했습니다. 손을 계속 만지작거리다가 한참 뒤에 겨우 입을 열었습니다.</p>
                <p className="font-bold text-slate-900 text-xl">"지금 수사를 받고 있습니다."</p>
                <p>그는 휴대폰과 관련된 성범죄 사건으로 조사를 받고 있는 상황이었습니다. 잠을 제대로 못 자고 있었고 회사에서도 일이 손에 잡히지 않는 상태였습니다. 상담을 시작하고 얼마 지나지 않아 그는 이렇게 물었습니다.</p>
                <p className="bg-white p-6 rounded-xl border border-emerald-200 font-bold text-emerald-700 text-center">"지금 제가 뭘 해야 합니까?"</p>
                <p><strong>성범죄 사건 상담</strong>을 겪게 되면 많은 사람들이 막막함 때문에 아무 준비도 하지 못한 채 시간을 보내는 경우가 많습니다. 하지만 재판 과정에서는 사건 자체뿐 아니라 사건 이후 어떤 태도를 보였는지도 중요한 판단 요소가 됩니다.</p>
              </div>
            </section>

            {/* Judge's Perspective Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Gavel className="w-8 h-8 text-emerald-600" />
                판사가 실제로 중요하게 보는 것
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>재판에서는 단순히 사건 사실만 보는 것이 아닙니다. 다음과 같은 부분이 함께 판단됩니다.</p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0">
                  <li className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">1</div>
                    <span className="font-bold text-slate-900">사건 이후 어떤 노력을 했는지</span>
                  </li>
                  <li className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">2</div>
                    <span className="font-bold text-slate-900">자신의 행동을 어떻게 인식하고 있는지</span>
                  </li>
                  <li className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">3</div>
                    <span className="font-bold text-slate-900">재범 가능성이 얼마나 낮은지</span>
                  </li>
                </ul>
                <p>이때 중요한 역할을 하는 것이 바로 <strong>재범방지 교육 프로그램</strong>과 <strong>성범죄 심리상담</strong> 기록입니다. 전문기관에서 진행한 교육과 상담 과정은 단순한 서류가 아니라 재범 방지를 위한 실제 노력의 기록이 되기 때문입니다.</p>
              </div>
            </section>

            {/* Why Education is Important Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-emerald-600" />
                재범방지 교육이 중요한 이유
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>많은 분들이 처음에는 이렇게 말합니다.</p>
                <blockquote className="border-l-4 border-slate-200 pl-6 italic">
                  "그렇게까지 큰 문제라고 생각하지 못했습니다."<br />
                  "순간적인 판단이었습니다."
                </blockquote>
                <p>하지만 상담과 교육을 진행하다 보면 자신의 행동이 상대방에게 어떤 영향을 줄 수 있었는지, 그리고 왜 그런 행동이 반복될 수 있는지에 대해 점차 이해하게 됩니다. 이 과정은 단순한 반성이 아니라 재발을 막기 위한 인식의 변화 과정입니다.</p>
                <div className="bg-slate-50 text-slate-900 p-10 rounded-[32px] my-12 border border-slate-100">
                  <h4 className="text-xl font-bold mb-6 text-[#059669]">재범방지 교육의 주요 내용</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      <span>성 인식 교정</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      <span>충동 조절 훈련</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      <span>관계 인식 개선</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      <span>재발 위험 상황 관리</span>
                    </div>
                  </div>
                </div>
                <p>이 과정은 단순히 사건을 넘기기 위한 절차가 아니라 앞으로의 삶에서 같은 문제가 반복되지 않도록 하는 예방 과정입니다.</p>
              </div>
            </section>

            {/* Case Result Section */}
            <section className="mb-20 bg-slate-50 p-10 lg:p-16 rounded-[40px] border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">실제 상담 사례의 결과</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>앞서 상담했던 내담자는 교육 과정 동안 <strong>성 인식 교육, 충동 행동 분석, 사건 상황 정리, 재발 방지 계획</strong>을 하나씩 정리했습니다.</p>
                <p>교육 과정에서 작성한 기록과 상담 소견서는 변호사를 통해 법원에 <strong>성범죄 양형자료</strong>로 제출되었습니다. 재판부에서는 사건 내용뿐 아니라 사건 이후의 태도와 재범 방지를 위한 노력을 함께 확인했습니다.</p>
                <p className="text-lg font-bold text-emerald-700">그 결과 그는 예상했던 것보다 완화된 결과를 받을 수 있었습니다.</p>
                <p>재판이 끝난 후 그는 상담실에 다시 찾아와 이렇게 말했습니다.</p>
                <p className="italic font-medium text-slate-800">"그때 상담을 시작하지 않았으면 아무 준비도 못 했을 것 같습니다."</p>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-emerald-600" />
                많은 분들이 궁금해하는 질문
              </h2>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-start gap-3">
                    <span className="text-emerald-600">Q.</span>
                    교육을 받으면 형량이 줄어드나요?
                  </h4>
                  <p className="text-slate-600 leading-relaxed pl-8">
                    교육만으로 결과가 결정되는 것은 아닙니다. 하지만 실제 재판에서는 <strong>사건 이후의 태도, 반성의 진정성, 재범 방지를 위한 노력</strong> 등의 요소들이 함께 고려됩니다. 전문기관에서 진행한 상담과 교육 기록은 이러한 부분을 설명할 수 있는 중요한 자료가 될 수 있습니다.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-start gap-3">
                    <span className="text-emerald-600">Q.</span>
                    교육 자료는 어디에 제출하나요?
                  </h4>
                  <p className="text-slate-600 leading-relaxed pl-8">
                    일반적으로 변호사를 통해 검찰 또는 법원에 양형 자료로 제출하게 됩니다. 교육 이수 확인서뿐 아니라 <strong>상담 확인서, 상담 소견서, 반성문, 교육 과정 기록</strong> 등의 자료가 함께 제출되는 경우가 많습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Most Important Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">사건 이후 가장 중요한 것</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>사건이 발생하면 누구나 당황하고 두려움을 느끼게 됩니다. 하지만 그 이후의 과정에서 가장 중요한 것은 문제를 피하려는 태도가 아니라 변화하려는 태도입니다.</p>
                <p><strong>성범죄 재범방지 교육</strong>과 심리 상담은 단순히 서류를 준비하기 위한 절차가 아니라 <strong>자신의 행동을 돌아보고, 재발 가능성을 낮추고, 같은 문제가 반복되지 않도록 준비하는 과정</strong>입니다. 그리고 이러한 과정은 법적 절차에서도 의미 있는 판단 요소가 될 수 있습니다.</p>
              </div>
            </section>

            {/* Counseling Guide & Closing */}
            <section className="mt-32 pt-20 border-t border-slate-200">
              <div className="bg-primary-deep rounded-[48px] p-12 lg:p-20 text-white text-center shadow-2xl shadow-emerald-200">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">당신의 변화를 위한 가장 객관적인 조력자가 되겠습니다</h2>
                <p className="text-xl text-emerald-100 mb-12 leading-relaxed">
                  사건 이후 무엇을 해야 할지 막막한 경우 상담이 도움이 될 수 있습니다.<br />
                  전문가 상담을 통해 재범 방지와 심리적 정리를 함께 할 수 있습니다.<br />
                  모든 상담 내용은 철저히 비밀보장이 되니 안심하고 문의해 주시기 바랍니다.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href={NAVER_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 bg-white text-[#059669] text-lg font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-3"
                  >
                    상담 예약하기
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a 
                    href={`tel:${CONTACT_PHONE}`}
                    className="px-10 py-5 bg-emerald-600 text-white text-lg font-bold rounded-2xl hover:bg-emerald-500 transition-all flex items-center gap-3 border border-emerald-500"
                  >
                    전화 문의하기 ({CONTACT_PHONE})
                    <PhoneCall className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </section>

          </article>
        </div>
      </motion.div>
    );
  }

  if (slug === 'compliance') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen"
      >
        {/* 1. 상단 인트로 영역 */}
        <header className="bg-slate-50 py-20 lg:py-28 text-center border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">부산 성범죄 준법정신 강화 교육 프로그램</h1>
            <p className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 leading-tight">
              준법정신 강화 교육은 자신의 행동이 사회와 타인에게 어떤 영향을 미칠 수 있는지 이해하고 책임 있는 선택을 할 수 있도록 돕는 교육 과정입니다.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              법은 단순히 처벌을 위한 규칙이 아니라 사회 구성원이 서로의 권리와 안전을 지키기 위해 만들어진 약속입니다. 본 교육은 자신의 행동과 판단을 다시 돌아보고, 앞으로 같은 문제가 반복되지 않도록 돕는 것을 목표로 합니다.
            </p>
          </div>
        </header>

        {/* 2. 상단 이미지 영역 */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088919/성범죄_준법정신_강화_교육_프로그램_wqgy1p.png" 
                alt="Compliance Spirit Enhancement Education Session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 3. 본문 설명 영역 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-16">
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">준법정신 강화 교육 프로그램</h2>
                <div className="space-y-6 text-lg">
                  <p>법은 단순히 처벌을 위한 규칙이 아니라 사회 구성원이 서로의 권리와 안전을 지키기 위해 만들어진 약속입니다. 그러나 많은 사람들은 일상 속에서 법의 의미를 깊이 생각할 기회를 갖지 못한 채 살아가기도 합니다.</p>
                  <p>준법정신 강화 교육은 단순히 법률 지식을 전달하는 교육이 아니라, 자신의 행동이 사회와 타인에게 어떤 영향을 미칠 수 있는지 이해하고 책임 있는 선택을 할 수 있도록 돕는 교육 과정입니다.</p>
                  <p>특히 성 관련 사건이나 법적 문제를 경험한 이후에는 자신의 행동과 판단을 다시 돌아보는 과정이 매우 중요합니다. 이 교육은 그러한 성찰의 기회를 제공하고, 앞으로 같은 문제가 반복되지 않도록 돕는 것을 목표로 합니다.</p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">준법정신 강화 교육의 필요성</h2>
                <div className="space-y-6 text-lg">
                  <p>많은 사건은 법을 몰라서 발생한다기보다, 순간적인 판단이나 상황에 대한 오해, 또는 자신의 행동이 가져올 결과에 대한 충분한 고려 없이 이루어지는 경우가 많습니다.</p>
                  <p className="font-bold text-slate-800">예를 들어 다음과 같은 생각들이 나타날 수 있습니다.</p>
                  <ul className="grid grid-cols-1 gap-4 list-none p-0">
                    {[
                      '이 정도는 큰 문제가 되지 않을 것이라고 생각했다',
                      '모두가 하는 행동이라고 생각했다',
                      '상대가 크게 문제 삼지 않을 것이라고 생각했다',
                      '상황이 그렇게 심각하게 이어질 줄 몰랐다'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                        <CheckCircle2 className="w-6 h-6 text-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>하지만 이러한 판단은 실제로는 법적 문제로 이어질 수 있으며, 개인의 삶에 큰 영향을 미칠 수 있습니다.</p>
                  <p className="font-bold text-slate-900">준법정신 강화 교육은 이러한 판단의 과정과 행동의 결과를 다시 이해하는 과정입니다.</p>
                </div>
              </div>

              {/* 4. 교육 주요 내용 카드 영역 */}
              <div className="space-y-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">교육 주요 내용</h2>
                <p className="text-lg">준법정신 강화 교육은 단순한 법률 강의가 아니라, 자신의 행동과 판단을 돌아보는 교육 과정으로 진행됩니다.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "1. 법의 의미와 사회적 책임 이해", 
                      desc: "법이 왜 존재하는지, 사회 속에서 법이 어떤 역할을 하는지 이해합니다.",
                      icon: Gavel
                    },
                    { 
                      title: "2. 개인 행동과 법적 결과 이해", 
                      desc: "개인의 행동이 법적 문제로 이어질 수 있는 과정과 결과를 이해합니다.",
                      icon: Scale
                    },
                    { 
                      title: "3. 상황 판단 능력 강화", 
                      desc: "충동적이거나 감정적인 판단이 아닌, 책임 있는 선택을 할 수 있는 사고 방식을 훈련합니다.",
                      icon: BrainCircuit
                    },
                    { 
                      title: "4. 사회적 규범과 관계 이해", 
                      desc: "사회 속에서 타인의 권리와 경계를 존중하는 태도를 이해합니다.",
                      icon: Users
                    },
                    { 
                      title: "5. 책임 있는 행동 습관 형성", 
                      desc: "일상 속에서 법과 사회적 규범을 고려한 행동 방식을 학습합니다.",
                      icon: ClipboardCheck
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 group-hover:bg-primary-deep group-hover:text-white transition-colors">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. 교육 진행 방식 섹션 */}
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">교육 진행 방식</h2>
                <div className="space-y-6 text-lg">
                  <p>준법정신 강화 교육은 단순한 강의 형태가 아니라 상담적 접근을 함께 활용하여 진행됩니다.</p>
                  <p>교육 과정에서는 다음과 같은 방식이 활용됩니다.</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                    {[
                      '실제 사례 기반 교육',
                      '상황 판단 훈련',
                      '자기 인식 점검',
                      '행동 패턴 이해',
                      '상담 기반 피드백'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                        <CheckCircle2 className="w-6 h-6 text-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>이를 통해 자신의 판단 과정과 행동 패턴을 보다 객관적으로 이해할 수 있도록 돕습니다.</p>
                </div>
              </div>

              {/* 6. 교육의 목적 섹션 */}
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">교육의 목적</h2>
                <div className="space-y-6 text-lg">
                  <p>준법정신 강화 교육은 단순히 법률 지식을 전달하는 것이 아니라, 책임 있는 행동과 판단 능력을 강화하는 교육입니다.</p>
                  <p>이 교육을 통해 다음과 같은 변화를 목표로 합니다.</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                    {[
                      '자신의 행동에 대한 책임 인식',
                      '법과 사회적 규범에 대한 이해',
                      '충동적 판단의 감소',
                      '상황 판단 능력 향상',
                      '재발 방지를 위한 행동 변화'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 text-slate-700 font-medium shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 7. 마무리 섹션 */}
              <div className="pt-16 border-t border-slate-100 space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">변화는 책임 있는 선택에서 시작됩니다</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 사람들은 사건 이후 처음으로 자신의 행동과 판단을 깊이 돌아보게 됩니다.</p>
                  <p>처음에는 혼란이나 억울함, 후회 등의 감정을 느끼기도 합니다. 그러나 상담과 교육을 통해 자신의 행동을 차분히 돌아보면, 앞으로 어떤 선택을 해야 하는지에 대해 더 분명한 방향을 찾게 되는 경우가 많습니다.</p>
                  <p className="font-medium text-slate-800">준법정신 강화 교육은 누군가를 비난하거나 낙인찍기 위한 과정이 아니라, 자신의 행동을 이해하고 더 책임 있는 삶의 방향을 찾도록 돕는 과정입니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. 상담 문의 버튼 */}
        <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-slate-900">상담은 현재를 정리하고 앞으로를 준비하는 과정입니다</h2>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-primary-deep text-white text-xl font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-100"
            >
              상담 문의하기
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </motion.div>
    );
  }

  if (slug === 'discrimination') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen"
      >
        {/* 1. 히어로 섹션 (상단 인트로) */}
        <header className="bg-slate-50 py-[110px] px-6 text-center border-b border-slate-100">
          <div className="max-w-[860px] mx-auto">
            <h1 className="text-[34px] md:text-[52px] font-bold text-slate-900 mb-[36px] leading-[1.2] tracking-tight max-w-[700px] mx-auto break-keep">
              부산 성차별 인식 교육 프로그램
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-[16px] md:text-[19px] leading-[1.75] text-slate-700 max-w-[680px] mb-[24px] break-keep">
                성차별은 특정한 사람만의 문제가 아니라 사회 속에서 형성된 인식과 문화 속에서 자연스럽게 만들어질 수 있습니다. 많은 사람들은 자신이 성차별적인 생각이나 행동을 하고 있다고 느끼지 못하지만, 일상적인 말과 행동 속에서도 상대에게 불편함이나 상처를 줄 수 있는 인식이 나타날 수 있습니다.
              </p>
              <p className="text-[16px] md:text-[19px] leading-[1.75] text-slate-700 max-w-[680px] mb-[24px] break-keep">
                성차별 인식 교육은 누군가를 비난하거나 처벌하기 위한 교육이 아니라, 자신의 생각과 행동을 객관적으로 돌아보고 관계 속에서 더 건강한 방식으로 소통할 수 있도록 돕는 교육 과정입니다.
              </p>
              <p className="text-[16px] md:text-[19px] leading-[1.75] text-slate-700 max-w-[680px] break-keep">
                특히 성 관련 사건 이후 자신의 인식과 행동을 돌아보고 변화의 방향을 찾고자 하는 분들에게 중요한 교육 과정이 될 수 있습니다.
              </p>
            </div>
          </div>
        </header>

        {/* 2. 상단 이미지 영역 */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786089531/재범방지_교육_중_하나_nxt8cp.png" 
                alt="Gender Discrimination Education Session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 3. 성차별 인식 교육의 필요성 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">성차별 인식 교육의 필요성</h2>
              <p className="text-lg mb-8">많은 성 관련 갈등이나 사건은 단순한 충동이나 실수만으로 발생하는 것이 아니라, 성에 대한 인식과 관계에 대한 이해 부족에서 비롯되는 경우가 많습니다.</p>
              <p className="text-lg mb-6">예를 들어 다음과 같은 생각들이 자연스럽게 자리 잡아 있을 수 있습니다.</p>
              <ul className="grid grid-cols-1 gap-4 list-none p-0 mb-8">
                {[
                  '상대가 특별히 거부하지 않으면 괜찮다고 생각했다',
                  '농담이나 장난이라고 생각했다',
                  '모두가 하는 행동이라고 생각했다',
                  '상대의 불편함을 크게 생각하지 않았다'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg">이러한 인식은 개인의 의도와 관계없이 상대에게 불편함이나 상처를 줄 수 있으며, 관계 속 갈등으로 이어질 수 있습니다.</p>
              <p className="text-lg font-medium text-slate-800">성차별 인식 교육은 이러한 무의식적인 인식 구조를 이해하고 점검하는 과정입니다.</p>
            </div>
          </div>
        </section>

        {/* 4. 교육 주요 내용 (카드형 UI 5개) */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-center">교육 주요 내용</h2>
            <p className="text-lg text-slate-500 text-center mb-16">본 교육은 단순한 이론 강의가 아니라 자신의 생각과 행동을 돌아보는 교육 과정으로 구성됩니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { 
                  title: "성차별과 성 고정관념 이해", 
                  desc: "사회 속에서 형성된 성 고정관념이 개인의 생각과 행동에 어떤 영향을 미치는지 이해합니다.",
                  icon: Globe
                },
                { 
                  title: "관계 속 경계와 존중", 
                  desc: "상대의 의사와 경계를 존중하는 관계 형성의 중요성을 이해합니다.",
                  icon: Users
                },
                { 
                  title: "의도와 결과의 차이 이해", 
                  desc: "본인의 의도와 상대가 느끼는 경험이 다르게 나타날 수 있다는 점을 이해합니다.",
                  icon: Scale
                },
                { 
                  title: "공감 능력 향상", 
                  desc: "상대의 입장에서 상황을 바라보는 연습을 통해 관계 속 공감 능력을 높입니다.",
                  icon: Heart
                },
                { 
                  title: "건강한 관계 방식 학습", 
                  desc: "존중과 책임을 기반으로 한 건강한 관계 형성 방법을 학습합니다.",
                  icon: ShieldCheck
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 group-hover:bg-primary-deep group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 교육 진행 방식 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">교육 진행 방식</h2>
              <p className="text-lg mb-8">성차별 인식 교육은 강의 형식뿐만 아니라 상담적 접근을 함께 활용하여 진행됩니다.</p>
              <p className="text-lg mb-6">교육 과정에서는 다음과 같은 방식이 활용됩니다.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-8">
                {['사례 기반 교육', '상황 이해 훈련', '자기 인식 점검', '관계 인식 훈련', '상담 기반 피드백'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-medium text-slate-800">이를 통해 자신의 생각과 행동을 보다 객관적으로 이해할 수 있도록 돕습니다.</p>
            </div>
          </div>
        </section>

        {/* 6. 교육의 목적 */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">교육의 목적</h2>
              <p className="text-lg mb-8">성차별 인식 교육은 단순히 지식을 전달하는 교육이 아니라, 인식의 변화를 돕는 교육입니다.</p>
              <p className="text-lg mb-6">이 교육을 통해 다음과 같은 변화를 목표로 합니다.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-8">
                {[
                  '자신의 인식과 행동에 대한 객관적 이해',
                  '관계 속에서의 책임과 존중 인식',
                  '성에 대한 왜곡된 인식 점검',
                  '공감 능력 향상',
                  '건강한 관계 형성 능력 강화'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 text-slate-700 font-medium shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. 마무리 섹션 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12">변화는 인식에서 시작됩니다</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>많은 사람들은 사건 이후 처음으로 자신의 생각과 행동을 돌아보게 됩니다.</p>
              <p>처음에는 혼란이나 억울함, 후회 등의 감정을 느끼기도 합니다. 그러나 상담과 교육을 통해 자신의 행동을 차분히 돌아보면 그동안 보지 못했던 부분을 이해하게 되는 경우가 많습니다.</p>
              <p className="font-medium text-slate-800">성차별 인식 교육은 비난이나 낙인을 위한 과정이 아니라 자신의 인식과 행동을 이해하고 더 건강한 방향으로 변화할 수 있도록 돕는 과정입니다.</p>
            </div>
            
            {/* 상담 문의 버튼 */}
            <div className="mt-16">
              <a 
                href={NAVER_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-12 py-6 bg-primary-deep text-white text-xl font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-2xl shadow-emerald-100"
              >
                상담 문의하기
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </motion.div>
    );
  }

  if (slug === 'distortion') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen"
      >
        {/* 1. 상단 인트로 영역 */}
        <header className="bg-slate-50 py-20 lg:py-28 text-center border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">부산 성인지 왜곡 교정 교육</h1>
            <p className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 leading-tight">
              성인지 왜곡 교정 교육은 성과 관계에 대한 잘못된 인식 구조를 점검하고 행동 판단 과정에 영향을 미치는 사고 패턴을 교정하는 교육입니다.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              사건 이후에는 단순한 반성만으로 행동 변화가 이루어지기 어렵습니다. 행동의 배경이 되는 인지 구조를 이해하고 교정하는 과정이 필요합니다.
            </p>
          </div>
        </header>

        {/* 2. 상단 이미지 영역 */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785747295/성인지왜곡_교정교육_a2neuh.png" 
                alt="Gender Perception Distortion Correction Session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 3. 왜 성인지 왜곡 교정 교육이 필요한가 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 text-center">왜 성인지 왜곡 교정 교육이 필요한가</h2>
              <p className="text-lg mb-8 text-center">많은 사건에서 다음과 같은 인식 문제가 나타납니다.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { title: "상황을 잘못 해석하는 인식 구조", icon: BrainCircuit },
                  { title: "관계에 대한 왜곡된 판단", icon: Users },
                  { title: "행동의 결과를 충분히 고려하지 못하는 사고 패턴", icon: AlertTriangle }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-sm">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-900 leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg text-center font-medium text-slate-800">이러한 인식 구조를 점검하고 교정하는 것이 재발 방지의 중요한 과정입니다.</p>
            </div>
          </div>
        </section>

        {/* 4. 교육 과정 (카드형 UI 4개) */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-16 text-center">교육 과정</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "사건 상황 인식", 
                  desc: "사건 당시의 상황과 판단 과정을 함께 점검합니다.",
                  icon: Search
                },
                { 
                  title: "인지 왜곡 분석", 
                  desc: "행동에 영향을 미친 사고 패턴과 판단 구조를 분석합니다.",
                  icon: BarChart3
                },
                { 
                  title: "관계 인식 재구성", 
                  desc: "타인의 입장과 관계 맥락을 고려하는 사고 방식을 학습합니다.",
                  icon: RefreshCw
                },
                { 
                  title: "행동 선택 훈련", 
                  desc: "유사한 상황에서 보다 안전한 판단과 행동을 선택할 수 있도록 훈련합니다.",
                  icon: CheckCircle2
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-8 group-hover:bg-primary-deep group-hover:text-white transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 교육 방식 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">교육 방식</h2>
              <p className="text-lg mb-8">교육은 상담과 교육이 결합된 방식으로 진행됩니다.</p>
              <p className="text-lg mb-6">교육 과정에서는</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-8">
                {['실제 사례 분석', '상황 인식 훈련', '사고 구조 점검', '행동 선택 훈련'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-medium text-slate-800">등을 통해 이해와 행동 변화가 함께 이루어지도록 진행됩니다.</p>
            </div>
          </div>
        </section>

        {/* 6. 교육의 목적 */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">교육의 목적</h2>
              <p className="text-lg mb-8">성인지 왜곡 교정 교육의 목적은 단순한 지식 전달이 아니라 행동 판단 구조의 변화입니다.</p>
              <p className="text-lg mb-6">교육을 통해 내담자는</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-8">
                {['자신의 판단 과정 이해', '관계 상황 인식 능력 향상', '충동적 판단 감소', '재발 위험 감소'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 text-slate-700 font-medium shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-medium text-slate-800">와 같은 변화를 준비할 수 있습니다.</p>
            </div>
          </div>
        </section>

        {/* 7. 상담 문의 영역 */}
        <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-slate-900">당신의 변화를 위한 첫걸음, 지금 시작하세요</h2>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-[#059669] text-white text-xl font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-2xl shadow-emerald-100"
            >
              상담 문의하기
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </motion.div>
    );
  }

  if (slug === 'sensitivity') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen"
      >
        {/* 1. 히어로 섹션 (상단 인트로) */}
        <header className="bg-slate-50 py-[110px] px-6 text-center border-b border-slate-100">
          <div className="max-w-[860px] mx-auto">
            <p className="text-[14px] md:text-[15px] font-semibold tracking-[0.05em] text-emerald-600 mb-[16px] uppercase">
              재범방지 교육 · 관계 인식 교육 · 성인지 감수성 교육
            </p>
            <h1 className="text-[34px] md:text-[52px] font-bold text-slate-900 mb-[28px] leading-[1.2] tracking-tight max-w-[620px] mx-auto break-keep">
              부산 성인지 감수성 교육
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-[18px] md:text-[22px] font-medium leading-[1.6] text-slate-800 max-w-[720px] mb-[28px] break-keep">
                성인지 감수성 교육은 관계 속에서 발생할 수 있는 상황을 이해하고 행동 기준을 정리하는 과정입니다.
              </p>
              <p className="text-[16px] md:text-[18px] leading-[1.75] text-slate-600 max-w-[660px] break-keep">
                사건 이후 많은 분들이 상황 판단과 관계 이해에 대한 혼란을 느끼게 됩니다. 본 센터의 교육은 이러한 상황을 객관적으로 이해하고 재발을 예방할 수 있도록 돕는 과정으로 진행됩니다.
              </p>
            </div>
          </div>
        </header>

        {/* 2. 상단 이미지 영역 */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746679/성인지감수성_ult8hq.png" 
                alt="Gender Sensitivity Education Session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 3. 핵심 교육 내용 요약 카드 영역 */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { title: "성인지 관점 이해", icon: Globe },
                { title: "관계 속 경계 인식", icon: Users },
                { title: "상황 판단 기준", icon: Scale },
                { title: "의사 표현과 의사 확인", icon: MessageSquare },
                { title: "사회적 관계 속 행동 기준", icon: Gavel }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary-deep group-hover:text-white transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 본문 설명 영역 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-16">
              <div className="text-center mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">성인지 감수성 교육</h2>
                <div className="space-y-6 text-lg">
                  <p>성인지 감수성 교육은 단순한 이론 교육이 아닙니다.</p>
                  <p>사건 이후 많은 분들이</p>
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-700 font-medium space-y-2">
                    <p>“내 행동이 왜 문제가 되었는지”</p>
                    <p>“어떤 기준으로 판단해야 하는지”</p>
                  </div>
                  <p>에 대해 혼란을 느끼기도 합니다.</p>
                  <p>성인지 감수성 교육은 이러한 상황에서 자신의 행동을 보다 객관적으로 이해하고 앞으로 비슷한 상황이 반복되지 않도록 돕는 과정입니다.</p>
                </div>
              </div>

              <div className="space-y-24">
                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">성인지 감수성이란 무엇인가</h3>
                  <div className="space-y-6">
                    <p>성인지 감수성은 성별과 관련된 상황에서 타인의 입장과 영향을 이해하고 판단하는 능력을 의미합니다.</p>
                    <p>특히 사람 사이의 관계에서는</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                      {['상대방의 불편함', '관계 속 경계', '상황에 대한 인식 차이', '의사 표현의 방식'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>등이 서로 다르게 받아들여질 수 있습니다.</p>
                    <p>이러한 차이를 이해하는 것이 성인지 감수성의 중요한 부분입니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">왜 성인지 감수성 교육이 필요한가</h3>
                  <div className="space-y-6">
                    <p>사건 이후 상담 과정에서 많은 분들이 다음과 같은 이야기를 합니다.</p>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-700 font-medium space-y-2">
                      <p>“그렇게까지 문제가 될 줄 몰랐다”</p>
                      <p>“상대가 불편하게 느낄 줄 몰랐다”</p>
                      <p>“그 상황에서 어떻게 행동해야 하는지 몰랐다”</p>
                    </div>
                    <p>이처럼 상황을 해석하는 방식이나 관계에 대한 인식 차이는 예상하지 못한 문제로 이어질 수 있습니다.</p>
                    <p>성인지 감수성 교육은 이러한 상황 인식의 차이를 이해하고 보다 적절한 판단 기준을 정리하는 과정입니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">교육에서 다루는 내용</h3>
                  <div className="space-y-6">
                    <p>본 센터의 성인지 감수성 교육은 단순한 강의 방식이 아니라 사례와 상황을 함께 살펴보는 방식으로 진행됩니다.</p>
                    <p>교육 과정에서는 다음과 같은 내용을 다룹니다.</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                      {[
                        '성인지 관점 이해',
                        '관계 속 경계 인식',
                        '상황 판단 기준 이해',
                        '의사 표현과 의사 확인',
                        '사회적 관계 속 행동 기준'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>이 과정은 단순한 지식을 전달하는 것이 아니라 실제 상황에서의 판단과 행동 기준을 이해하는 과정입니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">관계 속 경계를 이해하는 과정</h3>
                  <div className="space-y-6">
                    <p>사람 사이의 관계에서는 같은 행동이라도 상황과 관계에 따라 다르게 받아들여질 수 있습니다.</p>
                    <p>따라서 관계 속에서</p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0">
                      {['상대방의 입장', '상황의 맥락', '행동이 미칠 수 있는 영향'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>을 함께 고려하는 것이 중요합니다.</p>
                    <p>교육에서는 이러한 부분을 실제 사례와 함께 살펴보며 상황을 보다 객관적으로 이해할 수 있도록 돕습니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">재발 방지를 위한 교육</h3>
                  <div className="space-y-6">
                    <p>성인지 감수성 교육의 목적은 누군가를 비난하거나 판단하기 위한 것이 아닙니다.</p>
                    <p>중요한 것은</p>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-700 font-medium space-y-2 text-center">
                      <p>어떤 상황에서 문제가 발생할 수 있는지 이해하고</p>
                      <p>앞으로 같은 상황에서 더 적절한 판단을 할 수 있도록 준비하는 것입니다.</p>
                    </div>
                    <p>교육은 이러한 기준을 정리하는 과정이기도 합니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">상담과 함께 이루어지는 교육</h3>
                  <div className="space-y-6">
                    <p>성인지 감수성 교육은 상담 과정과 함께 진행될 때 보다 현실적인 변화로 이어질 수 있습니다.</p>
                    <p>상담을 통해</p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0">
                      {['사건 당시의 상황', '관계의 맥락', '행동의 배경'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>을 함께 살펴보면서 보다 안정적인 이해와 변화로 이어질 수 있도록 돕습니다.</p>
                  </div>
                </section>

                <section className="pt-16 border-t border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">변화는 이해에서 시작됩니다</h3>
                  <div className="space-y-6 text-lg">
                    <p>사건 이후 많은 분들이</p>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-700 font-medium text-center">
                      “어디서부터 다시 시작해야 할지 모르겠다”
                    </div>
                    <p>는 상태에서 상담을 찾게 됩니다.</p>
                    <p>성인지 감수성 교육은 현재 상황을 이해하고 앞으로의 행동 기준을 정리하는 과정이 될 수 있습니다.</p>
                    <p>본 센터는 사건 상담 경험과 심리적 이해를 바탕으로 내담자가 보다 안정적으로 상황을 정리하고 변화의 방향을 준비할 수 있도록 돕고 있습니다.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 상담 문의 버튼 */}
        <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-slate-900">상담은 현재를 정리하고 앞으로를 준비하는 과정입니다</h2>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-[#059669] text-white text-xl font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-2xl shadow-emerald-100"
            >
              상담 문의하기
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div className="bg-slate-50 py-12 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-lg text-slate-500">{content.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">교육 프로그램 상세</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">주요 교육 내용</h4>
                  <ul className="space-y-3">
                    {content.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">이수 확인서 발급</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">교육 이수 후 법원 및 검찰 제출용 공식 이수 확인서와 전문가 소견서를 발급해 드립니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src={`https://picsum.photos/seed/edu-${slug}/800/600`} 
                alt={title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CoachingPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-slate-50 min-h-screen"
  >
    {/* Hero Section */}
    <div className="relative bg-slate-50 py-40 text-slate-900 text-center overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
          alt="Legal Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-base font-bold mb-8 shadow-sm"
        >
          <PenTool className="w-5 h-5" />
          진정성 있는 반성을 위한 전문 가이드
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight">부산 성범죄 반성문 코칭</h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          단순한 사과가 아닌, 책임 인식을 바탕으로 한 진실된 고백을 돕습니다.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="space-y-24">
        {/* 1. 반성문과 소감문에서 가장 많이 발생하는 문제 */}
        <section className="bg-rose-50 rounded-[48px] p-12 lg:p-20 border border-rose-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">반성문과 소감문 작성 시 주의사항</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  많은 분들이 직접 작성한 자료를 제출하지만, 다음과 같은 문제로 인해 오히려 전달력이 떨어지는 경우가 많습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "지나치게 감정적인 표현",
                    "비논리적인 사건 설명",
                    "변명처럼 보이는 내용",
                    "반복적인 상투적 표현"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-rose-200 text-rose-700 text-sm font-medium">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mt-6">
                  진정성이 있음에도 불구하고 설득력이 전달되지 않을 수 있습니다. 
                  따라서 <span className="font-bold text-slate-900">사건의 경위 → 인식 변화 → 재발 방지 노력</span>이라는 구조적인 흐름으로 정리되는 것이 중요합니다.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-white p-10 rounded-[40px] shadow-xl border border-rose-100">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-8">
                <PenTool className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">전문적인 코칭의 필요성</h3>
              <p className="text-slate-500 leading-relaxed">
                자신의 진심이 재판부에 오해 없이 전달될 수 있도록, 전문가의 시각에서 글의 구조와 표현을 다듬는 과정이 필요합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 코칭 프로세스 */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">반성문 코칭 프로세스</h2>
            <p className="text-slate-500">단순 대필이 아닌, 내담자의 진심을 끌어내는 과정입니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "사건 인식 분석", desc: "사건에 대한 내담자의 현재 인식과 감정 상태를 심층 분석합니다." },
              { step: "02", title: "핵심 메시지 도출", desc: "재판부에 전달해야 할 진정성 있는 핵심 메시지를 함께 찾습니다." },
              { step: "03", title: "구조적 흐름 설계", desc: "논리적이고 설득력 있는 글의 흐름을 설계하고 표현을 다듬습니다." }
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="text-6xl font-black text-slate-50 absolute -top-4 -right-4 group-hover:text-emerald-50 transition-colors">{item.step}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-50 rounded-[48px] p-12 lg:p-20 text-slate-900 text-center border border-slate-200">
          <h2 className="text-3xl font-bold mb-8">당신의 진심이 올바르게 전달되도록 돕겠습니다</h2>
          <p className="text-xl text-slate-500 mb-12">
            전문가의 코칭을 통해 더욱 설득력 있는 양형자료를 준비하세요.
          </p>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#059669] text-white font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-lg shadow-emerald-100"
          >
            코칭 상담 예약하기
            <ArrowRight className="w-6 h-6" />
          </a>
        </section>
      </div>
    </div>
  </motion.div>
);

const CollaborationPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    {/* 1. Hero Section */}
    <header className="relative bg-slate-50 py-24 lg:py-32 text-slate-900 overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746399/f2ff459c6d7d4b51450ed22f0fd0ff29_mxcc8u.png" 
          alt="Lawyer Collaboration Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-bold mb-8"
          >
            <ShieldCheck className="w-4 h-4" />
            법적 절차를 이해하는 성범죄 사건 전문 심리상담
          </motion.div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
            부산 성범죄 변호사 협업 상담 시스템
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            성범죄 사건은 일반적인 심리 상담과 다르게 수사 절차와 법적 상황이 함께 진행되는 특수한 사건입니다. 본 센터는 사건 상담 경험과 법적 절차에 대한 높은 이해를 바탕으로, 변호사와 협업하는 상담 시스템을 운영하고 있습니다.
          </p>
        </div>
      </div>
    </header>

    {/* 2. 소개 섹션 */}
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">사건을 이해하는 상담은 다릅니다</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>성범죄 사건에 연루되면 대부분의 사람들은 처음 겪는 상황 속에서 큰 혼란과 불안을 경험하게 됩니다.</p>
              <p>수사 과정, 법적 절차, 주변의 시선, 가족 관계의 변화, 앞으로의 삶에 대한 걱정까지 여러 문제가 동시에 나타나기 때문입니다.</p>
              <p>이러한 상황에서 중요한 것은 단순한 위로나 감정 상담이 아니라 사건의 상황을 정확히 이해하고 현실적인 방향을 정리할 수 있는 상담입니다.</p>
              <p>본 센터는 성범죄 사건 상담 경험을 바탕으로 변호사와 협업하는 상담 시스템을 운영하고 있습니다.</p>
              <p>심리 상담의 전문성과 법적 절차에 대한 이해가 함께할 때 내담자는 보다 현실적인 도움을 받을 수 있습니다.</p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
              alt="Professional Counseling Session" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>

    {/* 3. 법적 절차 이해 및 단계별 대응 섹션 */}
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">법적 절차를 이해하는 상담</h2>
          <div className="bg-white rounded-[40px] p-10 lg:p-16 shadow-sm border border-slate-100">
            <p className="text-xl text-slate-700 mb-8 font-medium">성범죄 사건은 일반 상담과 달리 다음과 같은 절차를 거치며 진행되는 경우가 많습니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {['경찰 조사', '검찰 조사', '재판 과정'].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">{idx + 1}</div>
                  <span className="font-bold text-slate-900">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed mb-12">
              <p>이 과정에서 많은 내담자들은 심리적으로 큰 압박과 혼란을 경험합니다.</p>
              <p>지금 어떤 태도를 보여야 할지, 절차는 앞으로 어떻게 진행될지, 무엇을 준비해야 하는지 혼란스러워하는 경우가 많습니다.</p>
              <p>본 센터는 오랜 사건 상담 경험을 통해 수사 과정과 재판 과정에서 나타나는 다양한 심리적 상황, 실제 내담자들이 겪는 혼란, 절차별 준비 포인트에 대한 경험과 데이터를 축적해 왔습니다.</p>
              <p>이러한 경험을 바탕으로 다음과 같은 상담과 코칭이 가능합니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                "경찰 조사 전 심리적 준비",
                "조사 과정에서의 심리적 대응",
                "검찰 단계에서의 정리와 준비",
                "재판 과정에서의 심리적 태도 정리",
                "절차 단계에 따라 필요한 양형자료의 방향 정리",
                "상담 경과에 따른 변화 내용 정리",
                "재범 방지 노력, 심리상담 참여, 자기이해 및 행동 변화 내용을 자료화하는 과정 지원"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <p className="text-lg font-bold text-emerald-900 mb-4">
                본 센터는 단순히 심리적 위로만 제공하는 곳이 아니라, 경찰 조사, 검찰 조사, 재판 과정에 대한 이해를 바탕으로 절차별 심리 대응과 양형자료 정리까지 함께 고려할 수 있는 상담센터입니다.
              </p>
              <p className="text-emerald-600 font-bold">이 부분은 일반적인 심리상담센터와 매우 큰 차이점입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 4. 변호사 협업 섹션 */}
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
              alt="Legal Collaboration Concept" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">변호사와 협업하는 상담 구조</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>성범죄 사건 상담을 고민하는 많은 분들이 공통적으로 묻는 질문이 있습니다.</p>
              <p>상담이 실제로 도움이 되는지, 법적으로도 의미가 있는지 궁금해합니다.</p>
              <p>본 센터는 사건 상담 과정에서 변호사와 협업하여 진행되는 상담 사례가 많습니다.</p>
              <p>상담 과정에서 나타나는 심리적 변화, 재범 방지 노력, 행동 변화 과정, 절차에 맞춘 상담 진행 내용, 양형자료에 반영 가능한 변화 과정 등을 객관적으로 정리하는 과정도 함께 지원하고 있습니다.</p>
              <p>이 과정은 단순히 상담 기록을 남기는 차원을 넘어, 사건 이후 어떤 태도와 변화가 있었는지를 보다 체계적으로 정리하는 과정이 될 수 있습니다.</p>
            </div>
            <div className="mt-12 p-8 bg-slate-50 rounded-3xl text-slate-900 border border-slate-100">
              <p className="text-xl font-bold text-[#059669]">“상담 + 법적 이해 + 절차별 자료 정리”</p>
              <p className="text-slate-500 mt-2">본 센터가 지향하는 통합적 상담 시스템의 핵심 구조입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 5. 왜 차이가 있는가 섹션 */}
    <section className="py-24 lg:py-32 bg-slate-50 text-slate-900 overflow-hidden relative border-y border-slate-200">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-900 rounded-full"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 tracking-tight">왜 일반 상담센터와 차이가 있는가</h2>
          <div className="space-y-8 text-xl text-slate-500 leading-relaxed">
            <p>성범죄 사건은 일반적인 심리 상담과는 다르게 법적 절차와 함께 진행되는 경우가 많습니다.</p>
            <p>따라서 사건 경험이 없는 일반적인 심리상담만으로는 현재의 복합적인 상황을 충분히 이해하고 정리하는 데 한계가 있을 수 있습니다.</p>
            <p>본 센터는 성범죄 사건 상담 경험, 경찰·검찰·재판 절차에 대한 이해, 변호사 협업 경험, 절차에 따른 양형자료 방향 정리에 대한 이해를 함께 갖추고 있습니다.</p>
            <p className="text-emerald-600 font-bold">이러한 점은 본 센터가 일반 심리상담센터와 구별되는 중요한 강점입니다.</p>
          </div>
        </div>
      </div>
    </section>

    {/* 6. 특징 카드 섹션 */}
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">이런 점이 다릅니다</h2>
          <p className="text-lg text-slate-500">본 센터만의 차별화된 전문성을 확인하세요.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "성범죄 사건 상담 경험", 
              desc: "성범죄 사건과 관련된 다양한 상담 경험을 바탕으로 현재 상황을 보다 현실적으로 이해하고 정리할 수 있도록 돕습니다.",
              icon: Users
            },
            { 
              title: "변호사 협업 상담", 
              desc: "사건 진행 과정에서 변호사와 협업하는 상담 구조를 통해 보다 실제적인 방향 정리가 가능합니다.",
              icon: Gavel
            },
            { 
              title: "경찰·검찰·재판 절차 이해", 
              desc: "법적 절차에 대한 높은 이해를 바탕으로 단계별 심리 대응과 준비 과정을 상담에 반영합니다.",
              icon: Scale
            },
            { 
              title: "단계별 양형자료 정리 지원", 
              desc: "절차에 따라 필요한 양형자료의 방향을 정리하고 상담 경과와 변화 과정을 보다 체계적으로 정리할 수 있도록 돕습니다.",
              icon: FileCheck
            },
            { 
              title: "재범 방지 중심 상담", 
              desc: "단순한 감정 상담이 아니라 재범 방지를 위한 자기이해, 행동 변화, 인지 점검 과정을 함께 진행합니다.",
              icon: ShieldCheck
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{card.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 7. 마무리 섹션 */}
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12">상담은 사건 이후의 방향을 정리하는 과정입니다</h2>
          <div className="space-y-8 text-xl text-slate-600 leading-relaxed mb-16">
            <p>상담은 단순한 위로나 형식적인 절차가 아니라 사건 이후의 방향을 정리하고 변화를 준비하는 과정입니다.</p>
            <p>혼란스러운 상황 속에서는 자신의 생각을 객관적으로 정리하기가 쉽지 않습니다.</p>
            <p>전문적인 상담은 현재 상황을 이해하고, 필요한 준비를 하고, 앞으로의 방향을 보다 차분하게 세워 가는 데 도움이 될 수 있습니다.</p>
            <p>본 센터는 사건 경험과 절차에 대한 이해를 바탕으로 내담자가 보다 안정적으로 상황을 정리하고 변화의 방향을 준비할 수 있도록 돕고 있습니다.</p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-6 bg-[#059669] text-white text-xl font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-2xl shadow-emerald-100"
          >
            상담 문의하기
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  </motion.div>
);

const LegalPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-slate-50 min-h-screen"
  >
    {/* Hero Section */}
    <div className="relative bg-slate-50 py-40 text-slate-900 text-center overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
          alt="Legal Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-base font-bold mb-8 shadow-sm"
        >
          <ShieldCheck className="w-5 h-5" />
          성범죄 사건 심리상담 및 양형자료 지원 서비스 안내
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight">부산 성범죄 법원·검찰 제출용 양형자료</h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          심리치료는 당신의 진지한 반성과 재범 방지 의지를 입증하는 객관적인 증거입니다.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "전문가 소견서", desc: "상담 과정과 변화 양상을 전문적으로 기술한 공식 문서", icon: FileText },
          { title: "재범위험성 평가", desc: "표준화된 검사 도구를 통한 객관적 위험도 측정 보고서", icon: ClipboardCheck },
          { title: "반성문 코칭", desc: "책임 인식을 바탕으로 한 진정성 있는 진술 가이드", icon: MessageSquare }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-8">
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="mt-24 space-y-24">
        
        {/* 1. 사건 이후의 태도 */}
        <section className="bg-white rounded-[40px] p-12 lg:p-20 shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">성범죄 사건 이후, 가장 중요한 것은 “사건 이후의 태도”입니다</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>성범죄 사건에 연루된 많은 분들이 처음 겪는 상황 속에서 큰 혼란을 경험합니다. 수사 과정에서 무엇을 준비해야 하는지, 재판에서 어떤 부분이 중요하게 판단되는지 알기 어렵기 때문입니다.</p>
                <p>하지만 실제 재판 과정에서는 단순히 사건의 사실관계만 보는 것이 아니라 <span className="text-emerald-600 font-bold">사건 이후 피고인이 어떤 태도와 노력을 보였는지</span>도 중요한 판단 요소로 작용합니다.</p>
                
                <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">주요 검토 사항</h4>
                  <ul className="space-y-3">
                    {[
                      "사건에 대한 인식과 책임 의식",
                      "자신의 행동에 대한 성찰 여부",
                      "재발 방지를 위한 노력",
                      "상담 및 교육 참여 여부",
                      "주변의 관리와 변화 의지"
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-slate-500 mt-4 italic">이러한 부분을 객관적인 자료로 정리해 제출하는 것이 바로 양형 자료입니다.</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                alt="Legal Consultation" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 2. 왜 심리상담 기반의 양형 자료가 필요한가 */}
        <section className="bg-slate-50 rounded-[48px] p-12 lg:p-20 text-slate-900 relative overflow-hidden border border-slate-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">왜 심리상담 기반의 양형 자료가 필요한가</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-xl text-slate-600 leading-relaxed">
                  많은 분들이 반성문이나 교육 감상문을 제출합니다. 그러나 실제 재판에서는 단순한 형식적인 문서가 긍정적으로 평가되는 경우는 거의 없습니다.
                </p>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold mb-4 text-slate-900">재판부의 핵심 질문</h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                    <li>• 단순한 사과인가, 진정한 반성인가?</li>
                    <li>• 사건을 제대로 이해하고 있는가?</li>
                    <li>• 자신의 문제를 인식하고 있는가?</li>
                    <li>• 재발 방지를 위한 구체적인 계획이 있는가?</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  중요한 것은 <span className="text-emerald-600 font-bold">내용의 진정성과 논리적인 설명</span>입니다.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  심리상담 기반 자료는 단순한 개인 의견이 아니라 <span className="underline decoration-emerald-300 underline-offset-4">전문 상담 과정에서 정리된 객관적인 기록</span>이라는 점에서 큰 의미가 있습니다.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  상담 과정에서 드러난 심리 상태와 변화 과정, 재발 방지 계획 등이 정리되면 사건 이후의 태도를 보다 명확하게 설명할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 센터에서 제공하는 주요 상담 및 자료 */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">센터 제공 주요 상담 및 자료</h2>
            <p className="text-slate-500">단순한 서류 발급이 아닌, 내담자의 변화 과정을 객관적으로 정리합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "상담확인서", desc: "상담 참여 사실을 증명하는 공식 문서", icon: FileCheck },
              { title: "상담소견서", desc: "전문가의 시각에서 본 변화 양상 및 소견", icon: ClipboardList },
              { title: "심리검사 결과 보고서", desc: "객관적 지표를 통한 심리 상태 진단", icon: BarChart3 },
              { title: "교육 확인서", desc: "성인지 및 재발방지 교육 이수 증명", icon: GraduationCap }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center text-slate-600">
            <p>재판 과정에서 제출되는 문서의 특성을 고려하여 <span className="font-bold text-slate-900">내용의 논리성과 설득력</span>을 함께 검토합니다.</p>
          </div>
        </section>

        {/* 4. 최근 성범죄 처벌 경향 */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">최근 성범죄 처벌 경향 및 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-4">판단 기준의 확대</h4>
              <p className="text-sm text-slate-500 leading-relaxed">과거에는 물리적 강제력이 중심이었지만, 현재는 <span className="font-bold text-emerald-600">상대방의 성적 자기결정권 침해 여부</span>가 핵심 기준입니다.</p>
            </div>
            <div className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
                <Monitor className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-4">디지털 성범죄 강화</h4>
              <p className="text-sm text-slate-500 leading-relaxed">통매음, 불법 촬영, 몰카, 딥페이크, 온라인 괴롭힘 등 디지털 환경의 침해를 폭넓게 처벌합니다.</p>
            </div>
            <div className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-4">아청법 처벌 강화</h4>
              <p className="text-sm text-slate-500 leading-relaxed">아동·청소년 대상 범죄는 소지·다운로드·시청만으로도 강력한 처벌 대상이 됩니다.</p>
            </div>
          </div>
          <div className="mt-12 text-center text-slate-600">
            <p>법적 기준이 강화될수록 <span className="font-bold text-emerald-600">사건 이후의 태도와 변화 노력</span>에 대한 평가가 더욱 중요해집니다.</p>
          </div>
        </section>

        {/* 5. 사건 이후 가장 중요한 것은 변화입니다 */}
        <section className="bg-slate-50 rounded-[48px] p-12 lg:p-20 text-slate-900 text-center border border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">사건 이후 가장 중요한 것은 변화입니다</h2>
            <p className="text-xl text-slate-500 mb-16 leading-relaxed">
              재판에서 가장 중요한 것은 사건 이후 어떤 변화가 있었는지입니다. <br />
              객관적으로 정리된 변화 의지는 당신의 진심을 전달하는 가장 강력한 도구입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                "행동에 대한 깊은 이해",
                "진정성 있는 반성",
                "구체적인 재발 방지 노력"
              ].map((text, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 font-bold shadow-sm">
                  {text}
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <p className="text-lg text-slate-600">
                성범죄 사건은 개인이 혼자 대응하기에 법적·심리적으로 매우 복잡합니다. <br />
                상담을 통해 상황을 정리하는 것만으로도 막연한 불안에서 벗어날 수 있습니다.
              </p>
              <a 
                href={NAVER_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary-deep text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-2xl shadow-emerald-100"
              >
                전문 상담 및 자료 준비 시작하기
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">성범죄 재범방지 교육 프로그램</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "성범죄 재범방지교육", href: "/legal/education/prevention", desc: "재발 방지를 위한 핵심 심리 교육" },
            { title: "성인지 감수성 교육", href: "/legal/education/sensitivity", desc: "성적 권리와 존중의 이해" },
            { title: "성인지 왜곡 교정 교육", href: "/legal/education/distortion", desc: "잘못된 성 관념의 인지적 교정" },
            { title: "준법정신 강화교육", href: "/legal/education/compliance", desc: "법질서 준수 및 사회적 책임" },
            { title: "성차별 교육", href: "/legal/education/discrimination", desc: "평등한 성 역할과 차별 해소" }
          ].map((edu, idx) => (
            <Link key={idx} to={edu.href} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{edu.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{edu.desc}</p>
              <div className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                상세보기 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const LegalAssessmentPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* 1. 히어로 섹션 */}
      <section className="py-[120px] px-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 text-center">
        <div className="max-w-[960px] mx-auto">
          <div className="max-w-[820px] mx-auto">
            <p className="text-[14px] md:text-[15px] font-semibold tracking-[0.05em] text-emerald-600 mb-[18px] uppercase">
              전문 성심리상담 · 재범방지 교육 · 법원 제출 상담 소견서
            </p>
            <h1 className="text-[28px] sm:text-[32px] md:text-[48px] lg:text-[54px] font-bold md:font-extrabold leading-[1.35] md:leading-[1.24] tracking-tight text-slate-900 mb-[30px] max-w-[900px] mx-auto break-keep">
              부산 성범죄 가해자 <br className="block md:hidden" />
              성심리상담과 전문가 소견서가<br />
              양형에 중요한 이유
            </h1>
            <p className="text-[16px] md:text-[19px] leading-[1.75] text-slate-600 max-w-[700px] mx-auto break-keep">
              성범죄 사건 이후의 대응에서 중요한 것은 형식적인 반성이 아니라, <br className="hidden md:block" />
              사건 이후 어떤 변화와 재발 방지 노력이 실제로 이루어지고 있는지입니다. <br className="hidden md:block" />
              전문 성심리상담과 상담 소견서는 이러한 변화를 객관적으로 설명하는 중요한 자료가 될 수 있습니다.
            </p>
              {/* Buttons removed as per request */}
          </div>
        </div>
      </section>

      {/* 2. 상단 이미지 영역 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746402/8da9b2d5602c75b267fd7573a10c5117_tey9j5.png" 
              alt="Professional Psychological Counseling Session" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 3. 본문 영역 */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12">성심리상담과 전문 소견서가 양형에 중요한 이유</h2>
            
            <div className="space-y-8">
              <p>성범죄 사건에 연루되면 대부분의 사람들은 큰 충격과 혼란을 경험합니다. 수사 과정과 재판 절차를 처음 겪는 경우가 많기 때문에 앞으로 어떤 과정을 준비해야 하는지 알지 못해 불안이 커지기도 합니다.</p>
              <p>이 과정에서 많은 분들이 간과하는 것이 있습니다. 바로 사건 이후의 "태도와 변화"입니다.</p>
              <p>법원은 사건의 사실관계뿐 아니라 피의자 또는 피고인이 사건 이후 어떤 인식 변화를 보였는지, 재범 가능성은 얼마나 되는지, 그리고 스스로 문제를 해결하기 위해 어떤 노력을 하고 있는지를 매우 중요하게 살펴봅니다.</p>
              <p className="font-medium text-slate-800">이때 중요한 역할을 하는 것이 바로 전문 성심리상담과 상담 소견서입니다.</p>
            </div>

            <hr className="my-16 border-slate-100" />

            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">법원이 실제로 보는 것: 단순한 반성문이 아니라 '변화의 근거'</h2>
            <div className="space-y-8">
              <p>많은 사람들이 반성문을 작성하면 충분하다고 생각합니다. 하지만 실제 재판 과정에서는 단순한 글보다 객관적인 평가 자료가 훨씬 중요하게 작용하는 경우가 많습니다.</p>
              <p>특히 전문 상담기관에서 작성한 성심리상담 소견서는 다음과 같은 이유로 중요한 의미를 가집니다.</p>
              
              <ul className="grid grid-cols-1 gap-4 list-none p-0">
                {[
                  '피고인의 심리 상태에 대한 전문가의 객관적 평가',
                  '사건에 대한 인식 변화와 반성 수준',
                  '충동 조절 및 인지 왜곡 여부',
                  '재범 위험성에 대한 심리 평가',
                  '향후 재발 방지를 위한 치료 및 교육 계획'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <p>이러한 내용은 단순한 주장이나 개인적인 설명이 아니라 전문 상담 과정과 심리 평가를 통해 확인된 내용으로 기록됩니다.</p>
              <p className="font-medium text-slate-800">이때 상담 소견서는 피고인의 내적 변화를 객관적으로 입증하는 핵심적인 양형 자료가 됩니다. 단순한 반성문보다 훨씬 더 강력한 자료로 작용하는 경우가 많습니다.</p>
            </div>

            <hr className="my-16 border-slate-100" />

            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">상담이 형식이 되면 의미가 없습니다</h2>
            <div className="space-y-8">
              <p>최근에는 사건 이후 상담을 받는 경우가 늘어나고 있지만, 모든 상담이 실제로 도움이 되는 것은 아닙니다.</p>
              <p>재판부가 중요하게 보는 것은 상담의 횟수나 형식적인 프로그램 이수가 아니라 상담을 통해 실제로 어떤 변화가 이루어졌는지입니다.</p>
              <p>따라서 상담 과정에서는 다음과 같은 내용이 체계적으로 다루어져야 합니다.</p>
              
              <ul className="grid grid-cols-1 gap-4 list-none p-0">
                {[
                  '사건이 발생하게 된 심리적 배경',
                  '성 관련 인지 왜곡 여부',
                  '충동 조절 능력과 감정 조절 문제',
                  '피해자에 대한 인식과 공감 능력',
                  '재발을 방지하기 위한 행동 변화'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="font-medium text-slate-800">이러한 과정이 구체적으로 기록되고 평가되어야 상담이 실제 의미를 갖게 됩니다.</p>
            </div>

            <hr className="my-16 border-slate-100" />

            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">전문 성심리상담 소견서는 어떻게 준비되는가</h2>
            <div className="space-y-8">
              <p>신뢰할 수 있는 상담기관에서는 단순한 상담 기록이 아니라 체계적인 평가와 분석을 기반으로 소견서를 작성합니다.</p>
              <p>일반적으로 다음과 같은 절차를 통해 이루어집니다.</p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  "1. 초기 상담 및 사건 경위 파악",
                  "2. 심리 상태 평가 및 성 관련 인지 구조 분석",
                  "3. 충동 조절 및 행동 패턴 평가",
                  "4. 상담 과정에서의 인식 변화 확인",
                  "5. 재범 위험성 및 향후 관리 방향 평가"
                ].map((step, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-primary-deep text-white flex items-center justify-center font-bold shrink-0">{i+1}</span>
                    <span className="text-slate-800 font-medium">{step.substring(3)}</span>
                  </div>
                ))}
              </div>

              <p>이러한 과정을 통해 전문가가 종합적인 판단을 내려 법원 제출이 가능한 형태의 상담 소견서를 작성하게 됩니다.</p>
            </div>

            <hr className="my-16 border-slate-100" />

            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">상담기관 선택이 중요한 이유</h2>
            <div className="space-y-8">
              <p>성범죄 사건은 일반적인 심리상담과는 접근 방식이 다릅니다.</p>
              <p>사건의 법적 의미, 재범 위험 평가, 인지 왜곡 교정, 충동 조절 문제 등 다양한 요소를 이해하고 있어야 하기 때문입니다.</p>
              <p>따라서 상담기관을 선택할 때는 다음과 같은 점을 반드시 확인하는 것이 좋습니다.</p>
              
              <ul className="grid grid-cols-1 gap-4 list-none p-0">
                {[
                  '성범죄 사건 상담 경험이 있는 기관인지',
                  '법원 제출용 상담 소견서 작성 경험이 있는지',
                  '심리 평가와 상담이 체계적으로 진행되는지'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="font-medium text-slate-800">형식만 갖춘 상담이나 단순 프로그램 이수는 실제 재판 과정에서 의미 있게 평가되지 않을 수 있습니다.</p>
            </div>

            <hr className="my-16 border-slate-100" />

            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">사건 이후의 대응이 결과를 바꿀 수 있습니다</h2>
            <div className="space-y-8">
              <p>사건 이후의 시간은 단순히 재판을 기다리는 시간이 아닙니다.</p>
              <p>자신의 행동을 돌아보고 문제의 원인을 이해하며 다시 같은 일이 반복되지 않도록 준비하는 매우 중요한 과정입니다.</p>
              <p>전문적인 성심리상담은 단순히 법적인 대응을 위한 절차가 아니라 자신의 행동을 이해하고 변화의 방향을 만드는 과정이기도 합니다.</p>
              <p>만약 성심리상담 과정이나 상담 소견서 발급 절차에 대해 궁금한 점이 있다면 상담을 통해 구체적인 안내를 받을 수 있습니다.</p>
              <p className="font-bold text-slate-900 text-xl">신중하고 체계적인 준비는 사건 이후의 결과에 중요한 영향을 미칠 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 상담 문의 버튼 */}
      <section className="py-24 lg:py-32 bg-slate-50 text-slate-900 border-t border-slate-200">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12">상담은 현재를 정리하고 앞으로를 준비하는 과정입니다</h2>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-6 bg-[#059669] text-white text-xl font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-xl shadow-emerald-100"
          >
            상담 문의하기
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>
    </motion.div>
  );
};

const NoticePage = () => {
  const externalNoticeUrl = "http://mindbrain.cafe24.com/%ec%bb%a4%eb%ae%a4%eb%8b%88%ed%8b%b0/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-[#f7f9fb] min-h-screen"
    >
      {/* ① 상단 소개 영역 */}
      <section className="relative py-16 md:py-24 lg:py-32 text-slate-900 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746407/123355521f6cb02a4c959ef391321ecd_lrndxi.png" 
            alt="Notice Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-keep">공지사항 안내</h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed break-keep">
            센터 운영 안내, 교육 일정, 상담 관련 공지사항을 확인하실 수 있습니다.
          </p>
          <div className="mt-8">
            <p className="text-base text-slate-500 leading-relaxed break-keep">
              센터 운영 안내, 상담 일정, 교육 프로그램 공지 등은
              <br className="hidden sm:block" />
              별도의 공지사항 페이지에서 확인하실 수 있습니다.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mt-4 break-keep">
              최신 공지사항은 아래 링크를 통해 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ② 공지사항 바로가기 카드 */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 break-keep">센터 공지사항 확인</h3>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 break-keep">
              상담 일정, 교육 프로그램 안내, 센터 운영 공지 등
              <br className="hidden sm:block" />
              최신 공지사항을 확인하실 수 있습니다.
            </p>
            <a 
              href={externalNoticeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95 text-center"
            >
              공지사항 바로가기
            </a>
          </div>
        </div>
      </section>

      {/* ③ 공지사항 안내 아이콘 영역 */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="text-center p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-[#f7f9fb] border border-slate-100 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                <Monitor className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 break-keep">센터 운영 공지</h3>
              <p className="text-slate-500 leading-relaxed break-keep">상담 일정 변경, 휴무 안내 등</p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-[#f7f9fb] border border-slate-100 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                <Calendar className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 break-keep">교육 프로그램 일정</h3>
              <p className="text-slate-500 leading-relaxed break-keep">재범방지 교육 및 상담 프로그램 일정 안내</p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-[#f7f9fb] border border-slate-100 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                <MessageSquare className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 break-keep">상담 관련 안내</h3>
              <p className="text-slate-500 leading-relaxed break-keep">상담 신청 및 상담 절차 관련 공지</p>
            </div>
          </div>
        </div>
      </section>

      {/* ④ 공지 이용 안내 */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 md:mb-8 break-keep">공지 이용 안내</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 break-keep">
              센터 공지사항에는 상담 일정, 교육 프로그램, 센터 운영과 관련된 다양한 안내가 게시됩니다.
              <br className="hidden sm:block" />
              공지사항은 별도의 공지 페이지에서 관리되며 최신 정보는 공지사항 페이지에서 확인하실 수 있습니다.
            </p>
            <a 
              href={externalNoticeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline text-base md:text-lg"
            >
              공지사항 바로가기 <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ⑤ 상담 문의 안내 */}
      <section className="py-16 md:py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 md:mb-8 break-keep">상담 문의 안내</h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 md:mb-12 break-keep">
            공지사항 확인 후 상담 문의가 필요한 경우,
            <br className="hidden sm:block" />
            센터로 연락 주시면 안내해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              예약하기
            </a>
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-primary-deep text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              전화상담 ({CONTACT_PHONE})
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const MediaActivityPage = () => {
  const externalMediaUrl = "http://mindbrain.cafe24.com/%ec%bb%a4%eb%ae%a4%eb%8b%88%ed%8b%b0/%eb%b0%a9%ec%86%a1%ec%b6%9c%ec%97%b0%eb%8c%80%ec%99%b8%ed%99%9c%eb%8f%99/";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-[#f7f9fb] min-h-screen"
    >
      {/* ① 상단 소개 영역 (Hero) */}
      <section className="relative py-16 md:py-24 lg:py-32 text-slate-900 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775281989/5cb3f455097954a32bb3e0d4ff55aaad_vifxd5.png" 
            alt="Media Activities Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-keep">방송 · 대외활동</h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl break-keep">
            센터의 방송 출연 및 다양한 대외활동 내용을 확인하실 수 있습니다.
          </p>
          <div className="mt-8 space-y-4">
            <p className="text-base text-slate-500 leading-relaxed break-keep">
              센터는 다양한 방송과 언론, 강연 및 교육 활동 등을 통해
              <br className="hidden sm:block" />
              심리 상담과 재범 방지 교육의 중요성을 알리는 활동을 하고 있습니다.
            </p>
            <p className="text-base text-slate-500 leading-relaxed break-keep">
              방송 출연 및 대외활동 관련 내용은
              <br className="hidden sm:block" />
              별도의 페이지에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ② 방송 / 대외활동 바로가기 카드 */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 break-keep">방송 및 대외활동 보기</h3>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 break-keep">
              센터의 방송 출연, 인터뷰, 강연 활동 등
              <br className="hidden sm:block" />
              다양한 대외활동 내용을 확인하실 수 있습니다.
            </p>
            <a 
              href={externalMediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-[#1565C0] text-white font-bold rounded-2xl hover:bg-[#115599] transition-all shadow-lg shadow-blue-200 active:scale-95 text-center"
            >
              방송 / 대외활동 페이지 바로가기
            </a>
          </div>
        </div>
      </section>

      {/* ③ 활동 분야 안내 아이콘 영역 */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="text-center p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-[#f7f9fb] border border-slate-100 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-[#1565C0] flex items-center justify-center mx-auto mb-6 shadow-md">
                <Monitor className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 break-keep">방송 출연</h3>
              <p className="text-slate-500 leading-relaxed break-keep">TV 및 언론 인터뷰</p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-[#f7f9fb] border border-slate-100 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-[#1565C0] flex items-center justify-center mx-auto mb-6 shadow-md">
                <GraduationCap className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 break-keep">강연 및 교육 활동</h3>
              <p className="text-slate-500 leading-relaxed break-keep">재범방지 교육 및 심리 교육</p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-[#f7f9fb] border border-slate-100 shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-[#1565C0] flex items-center justify-center mx-auto mb-6 shadow-md">
                <Users className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 break-keep">전문가 활동</h3>
              <p className="text-slate-500 leading-relaxed break-keep">심리 상담 및 연구 활동</p>
            </div>
          </div>
        </div>
      </section>

      {/* ④ 활동 안내 설명 */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 md:mb-8 break-keep">활동 안내</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 break-keep">
              센터의 방송 및 대외활동은 심리 상담의 중요성과 건강한 사회 인식 형성을 위한 활동입니다.
              <br className="hidden sm:block" />
              관련 활동 내용은 별도의 페이지에서 확인하실 수 있습니다.
            </p>
            <a 
              href={externalMediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#1565C0] font-bold hover:underline text-base md:text-lg"
            >
              방송 / 대외활동 페이지 바로가기 <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ⑤ 문의 안내 */}
      <section className="py-16 md:py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 md:mb-8 break-keep">문의 안내</h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 md:mb-12 break-keep">
            방송 인터뷰 요청, 강연 문의, 협력 문의가 필요한 경우
            <br className="hidden sm:block" />
            센터로 연락 주시면 안내해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-[#1565C0] text-white font-bold rounded-2xl hover:bg-[#115599] transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              문의하기 ({CONTACT_PHONE})
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const AboutPage = ({ title, slug }: { title: string; slug: string }) => {
  if (slug === 'notice') {
    return <NoticePage />;
  }

  if (slug === 'activities') {
    return <MediaActivityPage />;
  }

  if (slug === 'intro') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white min-h-screen selection:bg-emerald-200 selection:text-emerald-900"
      >
        {/* 1. Hero Section */}
        <header className="relative bg-gradient-to-b from-emerald-50/20 to-white py-24 lg:py-32 text-slate-900 overflow-hidden border-b border-emerald-500/10">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746399/f2ff459c6d7d4b51450ed22f0fd0ff29_mxcc8u.png" 
              alt="Center Introduction Hero" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs sm:text-sm font-bold mb-6 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                성범죄 특화 심리치료 전문 기관
              </div>
              <h1 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight leading-tight text-slate-900">
                센터 <span className="text-emerald-600">소개</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-bold break-keep">
                부산성범죄심리상담치료센터는 단순한 비난이 아닌 실질적인 교정을 통해 재범 없는 안전한 사회를 만듭니다.
              </p>
            </div>
          </div>
        </header>

        {/* 2. 센터 소개 텍스트 영역 */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">Our Approach</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">
                  사건을 이해하는 <span className="text-emerald-600">전문 심리상담</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>본 센터는 성범죄 사건과 관련된 심리상담을 전문적으로 진행하는 상담기관입니다.</p>
                  <p>
                    성범죄 사건은 단순한 개인의 심리 문제만으로 설명하기 어려운 경우가 많습니다.<br />
                    수사 절차, 법적 상황, 사회적 관계, 개인의 심리 상태가 동시에 영향을 미치는 복합적인 상황이기 때문입니다.
                  </p>
                  <p>이러한 이유로 성범죄 사건 상담은 일반적인 심리 상담과는 다른 접근이 필요합니다.</p>
                  <p>
                    본 센터는 오랜 기간 성범죄 사건 상담을 진행하면서 다양한 사건 사례와 상담 경험을 축적해 왔으며, 사건 이후 내담자들이 실제로 겪는 심리적 혼란และ 현실적인 문제를 함께 이해하고 정리하는 상담을 진행하고 있습니다.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                  alt="Counseling Session" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. 센터 핵심 가치 섹션 */}
        <section className="py-24 lg:py-32 bg-emerald-50/20 border-t border-emerald-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">Core Values</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">센터 <span className="text-emerald-600">핵심 가치</span></h2>
              <p className="text-lg text-emerald-600/80 font-medium font-bold">우리가 지향하는 전문성과 변화의 방향입니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "성범죄 사건 상담 경험 기반 전문 상담",
                  desc: "성범죄 사건 상담 경험을 바탕으로 내담자의 상황을 보다 현실적으로 이해하고 상담에 반영합니다."
                },
                {
                  title: "법적 절차를 이해하는 상담 시스템",
                  desc: "경찰 조사, 검찰 조사, 재판 과정 등 사건 절차에 대한 이해를 상담 과정에 반영합니다."
                },
                {
                  title: "변호사 협업 상담 구조",
                  desc: "사건 상담 과정에서 변호사와 협업하는 상담 구조를 운영하고 있습니다."
                },
                {
                  title: "단계별 양형자료 정리 지원",
                  desc: "상담 경과와 재범 방지 노력, 변화 과정 등을 절차에 맞게 정리하는 상담을 진행합니다."
                },
                {
                  title: "재범 방지 중심 상담 프로그램",
                  desc: "충동 조절, 자기 이해, 행동 패턴 점검 등을 통해 변화의 방향을 준비합니다."
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-emerald-500/5 hover:border-emerald-500/15 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">{card.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div className="relative bg-slate-50 py-12 lg:py-24 border-b border-slate-100 overflow-hidden">
        {slug === 'location' && (
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786090054/오시는_길_ddate1.png" 
              alt="오시는 길 Hero Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-8">{title}</h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              부산성범죄심리상담치료센터는 단순한 비난이 아닌 실질적인 교정을 통해 재범 없는 안전한 사회를 만듭니다.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {slug === 'profile' && (
        <div className="space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 lg:sticky lg:top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346422/ChatGPT_Image_2026년_3월_1일_오후_10_34_52_ydee1z.png" 
                  alt="윤영준 원장" 
                  className="w-full aspect-square lg:aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">윤영준 <span className="text-lg font-medium text-slate-500">원장</span></h3>
                <p className="text-emerald-600 font-bold">상담학 박사 / 국제 임상최면치료사</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  학력 및 학위
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 동국대학교 대학원 심리상담 석사</li>
                  <li>• 로드랜드 대학교 상담학 박사</li>
                  <li>• 서불대학교 심신통합치유학과 뇌인지과학 박사 수료</li>
                  <li>• 원광대학교 동양학대학원 기공학 전문과정 전공</li>
                </ul>
              </section>

              <section className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  전문 자격 및 국제 인증
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-500" />
                      미국최면사고시위원회 (ACHE)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 국제 최면전문가 (International Master Hypnotist)</li>
                      <li>• 국제 최면치료사 (International Hypnotherapist)</li>
                      <li>• 국제 임상최면치료사 (International Clinical Hypnotherapist)</li>
                      <li>• 국제 의학최면치료사 (International Medical Hypnotherapist)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      미국 최면대학 (HCC)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 최면전문가 (Master Hypnotist)</li>
                      <li>• 최면치료사 (Hypnotherapist)</li>
                      <li>• 임상최면치료사 (Clinical Hypnotherapist)</li>
                      <li>• 의학최면치료사 (Medical Hypnotherapist)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200/50">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                       <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                         <Zap className="w-4 h-4 text-emerald-500" />
                         NLP 및 코칭
                       </h4>
                       <ul className="space-y-2 text-sm text-slate-600">
                          <li>• NLP 프랙티셔너 / 마스터 프랙티셔너</li>
                          <li>• NLP 프로코치 (전문가)</li>
                       </ul>
                     </div>
                     <div className="bg-primary-deep p-6 rounded-2xl shadow-xl shadow-emerald-100 border border-emerald-500">
                       <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-emerald-200" />
                         기타 전문 자격
                       </h4>
                       <ul className="space-y-2 text-sm text-emerald-50">
                          <li>• 성폭력 전문 상담사</li>
                          <li>• 가정폭력 전문 상담사</li>
                          <li>• 뇌교육 상담사</li>
                       </ul>
                     </div>
                   </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  주요 학회 및 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 성범죄심리상담학회 회장</li>
                  <li>• 미국 로렐라이즈 메디테이션 센터 원장</li>
                  <li>• (전)제5심리과학회 회장</li>
                  <li>• (전)동서통합심리상담학회 회장</li>
                  <li>• 사단법인 장애어린이집 이사</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  수상 및 교수 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 로드랜드 대학교 총장상 수상</li>
                  <li>• 로드랜드 대학교 객원교수</li>
                  <li>• 한국 B&S 교육문화진흥원 교육원장</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  강의 및 상담 경력
                </h3>
                <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">대학 및 교육기관</h4>
                    <p>금오공과대학교, 상지대학교, 광운대학교, 춘해대학교, 부산외국어대학교, 한국폴리텍대학교, 구미대학교 등 다수 대학 강의 및 심리검사 교육 진행</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">기업 및 관공서</h4>
                    <p>삼성, LG, 대우, 기아자동차, 웅진코웨이, SK가스 등 대기업 임직원 대상 심리 프로그램 진행. 경찰서(상주, 군위, 구미, 점촌), 구미시청 등 관공서 출강 및 상담.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-3">공공 및 사회 활동 (성범죄 및 위기 상담 특화)</h4>
                    <ul className="space-y-2 text-emerald-800">
                      <li>• 부산가정법원 위탁보호위원</li>
                      <li>• 경북권 전경, 의경 담당 심리상담사</li>
                      <li>• 경북 소방대원 심리상담 및 교육</li>
                      <li>• 학교폭력 자치위원, 경북교육지원청 위원 활동</li>
                      <li>• 청소년 대상 인터넷 중독 및 자살 예방 교육 전문 강사</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  저서 및 논문
                </h3>
                <div className="space-y-6 text-slate-600">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">주요 저서</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 나의 마음이 나의 세상을 만든다</li>
                      <li>• 삶과 운명을 바꾸는 마음의 기술 (부제: 내면을 깨우면 무엇이든 가능하다)</li>
                      <li>• 자기탐구 내면아이 워크북</li>
                      <li>• The Secret of Korean Power (영문판)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">출판 예정</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 리얼리티 코드 (부제: 당신의 현실을 다시 쓰는 법)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">학술 논문</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 정서 인식 명확성이 청소년의 학업 스트레스로 인한 우울에 미치는 영향 연구</li>
                      <li>• A Study on the Psychotherapeutic Approaches of Meditation: Focusing on Anxiety</li>
                      <li>• Mindfulness, Emotion Regulation, and Cognitive Flexibility: A Neurocognitive Perspective</li>
                      <li>• Meditation Experience, Attentional Control, and Emotion Regulation: A Neurocognitive Review</li>
                      <li>• 최면과 명상이 주의조절 및 자기인식 과정에 미치는 영향에 관한 비교 연구</li>
                      <li>• 명상·최면·심리치료의 공통적 변화기제에 대한 뇌인지과학적 고찰</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {slug === 'vice-profile' && (
        <div className="space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 lg:sticky lg:top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774347139/KakaoTalk_20240521_123825759_gslvpg.jpg" 
                  alt="소윤주 부원장" 
                  className="w-full aspect-square lg:aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">소윤주 <span className="text-lg font-medium text-slate-500">부원장</span></h3>
                <p className="text-emerald-600 font-bold">기능의학전문가 │ 최면전문가 │ 성상담 전문가</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  학력 및 약력
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 원광대학교 의과대학</li>
                  <li>• 전) 부산서울피부과의원</li>
                  <li>• 전) 대전 DS피부과의원</li>
                  <li>• 전) 대전 J의원</li>
                  <li>• 전) 부산 파르베의원</li>
                  <li>• 현) 미안의원 부원장</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  주요 학회 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 제5심리과학학회 이사</li>
                  <li>• 동서통합심리학회 이사</li>
                  <li>• 대한레이저피부모발학회</li>
                  <li>• 대한미용성형레이저학회</li>
                  <li>• 대한일차진료학회</li>
                  <li>• 대한필러학회</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  방송활동 및 출강
                </h3>
                <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
                  <p>• KBS '동행', MBC 등 다수 방송 출연</p>
                  <p>• 고용노동부, 교육지원청, 한화글로벌, 삼성탈레스, 한화, LG 이노텍 등 다수 기업 및 관공서 강의</p>
                  <p>• 중·고, 대학교 인터넷 중독예방, 자살예방교육 강의, 심리검사 및 교육</p>
                  <p>• 서리풀 타임즈 의학부(의과학) 칼럼위원</p>
                  <p>• 뇌과학기술인협회, 나우명상</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                  저서 및 강의내용
                </h3>
                <div className="space-y-6 text-slate-600">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">저서</h4>
                    <p>회복과 성장, 심신건강 최면치료</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">강의내용</h4>
                    <p>몸, 마음 건강과 기능의학, 명상과 건강, 명상과 심신건강, 심신정화를 위한 식이요법</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {slug === 'greeting' && (
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200" 
              alt="Greeting" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">"비난을 넘어, 책임 있는 변화의 길로 안내하겠습니다."</h2>
            <p>안녕하십니까, 부산성범죄심리상담치료센터 원장 윤영준입니다.</p>
            <p>성범죄 사건에 직면했을 때, 대부분의 사람들은 극심한 혼란과 두려움, 그리고 사회적 비난에 대한 공포를 경험합니다. 하지만 진정한 해결은 단순히 처벌을 피하는 것이 아니라, 자신의 행동 이면에 숨겨진 심리적 구조를 직시하고 이를 교정하여 다시는 같은 실수를 반복하지 않는 삶을 설계하는 데 있습니다.</p>
            <p>본 센터는 단순한 정서적 지지를 넘어, 뇌인지과학과 임상심리학적 근거를 바탕으로 한 고도의 교정 프로그램을 제공합니다. 우리는 내담자가 자신의 책임을 온전히 인식하고, 왜곡된 성 인지를 바로잡아 건강한 사회 구성원으로 복귀할 수 있도록 가장 객관적이고 전문적인 조력자가 될 것입니다.</p>
            <p>변화는 용기 있는 직면에서 시작됩니다. 그 길에 저희가 함께하겠습니다.</p>
            <div className="pt-12 border-t border-slate-100 text-right">
              <p className="text-slate-500 mb-2">부산성범죄심리상담치료센터 대표원장</p>
              <p className="text-2xl font-bold text-slate-900">윤 영 준</p>
            </div>
          </div>
        </div>
      )}

      {slug === 'experts' && (
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">성범죄 특화 전문가 그룹</h2>
            <p className="text-slate-500">단순 심리상담사가 아닌, 구조적 개입과 행동 교정의 전문가들이 함께합니다.</p>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {/* Row 1: 2 experts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-8 sm:gap-10">
              {[
                { 
                  name: "윤영준 원장", 
                  role: "상담학 박사 / 국제 임상최면치료사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346422/ChatGPT_Image_2026년_3월_1일_오후_10_34_52_ydee1z.png",
                  desc: "성범죄 상담 경력 18년 이상, 법원 촉탁 상담위원 역임.",
                  objectClass: "object-cover"
                },
                { 
                  name: "소윤주 부원장", 
                  role: "기능의학 / 최면 / 성상담 전문가", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774347139/KakaoTalk_20240521_123825759_gslvpg.jpg",
                  desc: "기능의학 기반의 심신 통합 치유 전문가.",
                  objectClass: "object-cover object-top"
                }
              ].map((expert, idx) => (
                <div key={idx} className="text-center group flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-5 shadow-xl group-hover:scale-105 transition-transform duration-500 bg-slate-50 shrink-0">
                    <img src={expert.image} alt={expert.name} className={`w-full h-full ${expert.objectClass}`} referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 [word-break:keep-all]">{expert.name}</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-3 [word-break:keep-all]">{expert.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed px-2 sm:px-4 [word-break:keep-all]">{expert.desc}</p>
                </div>
              ))}
            </div>

            {/* Row 2: 3 experts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
              {[
                { 
                  name: "허선무 변호사", 
                  role: "법무법인 소울 변호사 / 성범죄 전문 변호사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346463/member_view23_nnxzhn.jpg",
                  desc: "현재 법무법인 소울 변호사, 창원지방법원 조정위원, 창원지방검찰청 형사조정위원, 대한법률구조공단 구조위원 역임."
                },
                { 
                  name: "강주오 변호사", 
                  role: "법무법인 로하스 대표변호사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971476/73290c9b-6542-4f47-9ea0-ec8be1861807_plqybw.png",
                  desc: "경북도청 및 구미시 법률상담관, 구미시의회 고문변호사, 법무부 법사랑 위원."
                },
                { 
                  name: "백진욱 변호사", 
                  role: "법무법인 로하스 변호사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1777026382/bfb4a67d-9cf5-410b-9338-7f76ed3b73b9-md_qycut4.jpg",
                  desc: "성범죄 및 형사 사건 전문 법률 조력자."
                }
              ].map((expert, idx) => (
                <div key={idx} className="text-center group flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-5 shadow-xl group-hover:scale-105 transition-transform duration-500 bg-slate-50 shrink-0">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 [word-break:keep-all]">{expert.name}</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-3 [word-break:keep-all]">{expert.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed px-2 sm:px-4 [word-break:keep-all]">{expert.desc}</p>
                </div>
              ))}
            </div>

            {/* Row 3: 2 experts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-8 sm:gap-10">
              {[
                { 
                  name: "문영애 교수", 
                  role: "상담심리학 박사 / 한국신체심리치료 연구소 대표", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201676/문영애_교수1_q9eo9t.png",
                  desc: "PhD 상담심리학 박사, 펠든크라이스 전문가."
                },
                { 
                  name: "이제승 교수", 
                  role: "IMC 국제마음치유연구원 원장 / 심리상담학과 교수", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779153823/이제승_교수_gkluyp.jpg",
                  desc: "국제기독대학교 교수, 한국심리상담전문학회 학회장."
                }
              ].map((expert, idx) => (
                <div key={idx} className="text-center group flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-5 shadow-xl group-hover:scale-105 transition-transform duration-500 bg-slate-50 shrink-0">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 [word-break:keep-all]">{expert.name}</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-3 [word-break:keep-all]">{expert.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed px-2 sm:px-4 [word-break:keep-all]">{expert.desc}</p>
                </div>
              ))}
            </div>

            {/* Row 4: 3 experts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
              {[
                { 
                  name: "이희철 교수", 
                  role: "심리학 박사 / 임상심리 전문가", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201660/이희철_교수_1_lvwzev.png",
                  desc: "성범죄 가해자 인지왜곡 교정 및 상담 프로그램 연구."
                },
                { 
                  name: "유보경 선생님", 
                  role: "상담심리 전문가 / 성인지 교육 강사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201666/유보경_선생님_2_lobfoq.png",
                  desc: "성범죄 예방 및 재발 방지를 위한 심리 교육 전문가."
                },
                { 
                  name: "윤송이 선생님", 
                  role: "심리상담 전문가 / 성폭력 예방 교육 강사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201655/윤송이_선생님_2_q34upo.png",
                  desc: "인지행동치료 기반의 성인지 감수성 향상 교육."
                }
              ].map((expert, idx) => (
                <div key={idx} className="text-center group flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-5 shadow-xl group-hover:scale-105 transition-transform duration-500 bg-slate-50 shrink-0">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 [word-break:keep-all]">{expert.name}</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-3 [word-break:keep-all]">{expert.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed px-2 sm:px-4 [word-break:keep-all]">{expert.desc}</p>
                </div>
              ))}
            </div>

            {/* Row 5: 3 experts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
              {[
                { 
                  name: "전경숙 선생님", 
                  role: "상담심리 전문가 / 중독 상담사 / 성상담 전문가", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779198673/전경숙_선생님_hctbka.png",
                  desc: "성인지 왜곡 및 중독 문제 해결을 위한 전문 심리 상담."
                },
                { 
                  name: "박경실 선생님", 
                  role: "상담심리 전문가 / 청소년 상담사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779200461/ChatGPT_Image_2026년_5월_19일_오후_11_20_53_jagksr.png",
                  desc: "청소년 및 성인 내담자의 심리적 안정과 긍정적 변화 지원."
                },
                { 
                  name: "강민경 선생님", 
                  role: "상담심리 전문가 / 가족학 석사 / 부모, 가족 교육 강사", 
                  image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779198673/강민경_선생님_2_bganyn.bmp",
                  desc: "심리 정서적 지지를 통한 자존감 회복 및 재발 방지 상담."
                }
              ].map((expert, idx) => (
                <div key={idx} className="text-center group flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-5 shadow-xl group-hover:scale-105 transition-transform duration-500 bg-slate-50 shrink-0">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 [word-break:keep-all]">{expert.name}</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-3 [word-break:keep-all]">{expert.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed px-2 sm:px-4 [word-break:keep-all]">{expert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {slug === 'location' && (
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
      )}

      {slug !== 'intro' && slug !== 'experts' && slug !== 'profile' && slug !== 'greeting' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
  );
};

const FAQ_DATA = [
  {
    q: "Q1. 사건 직후 상담을 받는 것이 도움이 되나요?",
    a: "네. 사건 이후 초기 단계에서 상담을 받는 것은 매우 중요합니다. 사건 직후에는 불안, 억울함, 수치심, 두려움 등 다양한 감정이 섞여 상황을 객관적으로 판단하기 어려운 경우가 많습니다. 상담을 통해 현재 상황을 차분하게 정리하고 향후 대응 방향을 준비할 수 있습니다."
  },
  {
    q: "Q2. 상담을 받으면 양형에 실제로 도움이 되나요?",
    a: "전문 상담기관에서의 상담 이력은 법원에서 피고인의 교정 의지와 재범 방지 노력을 확인하는 참고 자료로 활용될 수 있습니다. 상담 과정에서 나타난 인식 변화, 책임 인식, 행동 교정 노력 등은 상담 소견서나 자료 형태로 정리될 수 있습니다."
  },
  {
    q: "Q3. 초범인데도 상담이 필요한가요?",
    a: "초범이라 하더라도 사건이 발생한 심리적 배경을 이해하는 것은 매우 중요합니다. 많은 경우 단순한 실수처럼 보이지만 실제로는 충동 조절 문제, 스트레스 상황, 관계 문제, 인지 왜곡 등이 영향을 미치기도 합니다. 상담은 이러한 부분을 이해하고 재발을 예방하는 데 도움을 줍니다."
  },
  {
    q: "Q4. 억울한 부분이 있어도 상담을 받아야 하나요?",
    a: "억울함이 있는 상황에서도 상담은 도움이 될 수 있습니다. 강한 분노나 억울함은 상황 판단을 흐리게 만들 수 있기 때문에 전문가와 함께 사건을 객관적으로 정리하는 과정이 필요할 수 있습니다. 상담은 감정을 정리하고 안정적인 대응을 돕는 과정이기도 합니다."
  },
  {
    q: "Q5. 상담을 받으면 불리해지지는 않나요?",
    a: "상담은 법적 판단을 대신하는 과정이 아니라 심리적 이해와 행동 교정을 돕는 과정입니다. 많은 경우 상담은 자신의 행동을 이해하고 재발을 예방하려는 노력으로 해석되며 긍정적인 요소로 고려될 수 있습니다."
  },
  {
    q: "Q6. 상담 내용이 가족이나 회사에 알려질 수 있나요?",
    a: "본 센터는 철저한 비밀보장 원칙을 따르고 있습니다. 상담 내용, 상담 기록, 방문 사실 등은 내담자의 동의 없이 외부로 제공되지 않습니다. 직장이나 가족에게 상담 사실이 전달되는 일은 없습니다."
  },
  {
    q: "Q7. 상담은 어떤 방식으로 진행되나요?",
    a: "상담은 보통 다음 단계로 진행됩니다.\n\n1단계 – 초기 상담: 사건 상황과 현재 심리 상태를 파악합니다.\n2단계 – 심리 평가: 충동 조절, 감정 상태, 인지 패턴 등을 분석합니다.\n3단계 – 상담 진행: 인지 교정, 감정 조절, 행동 패턴 이해 등을 중심으로 상담이 진행됩니다.\n4단계 – 재범 방지 계획: 유사 상황에서의 대응 방법과 예방 전략을 함께 정리합니다."
  },
  {
    q: "Q8. 상담은 몇 번 정도 받아야 하나요?",
    a: "상담 횟수는 개인의 상황에 따라 달라질 수 있습니다. 사건의 특성, 심리 상태, 상담 목표 등을 고려하여 초기 상담 이후 상담 계획이 함께 결정됩니다."
  },
  {
    q: "Q9. 상담을 받으면 어떤 변화가 기대되나요?",
    a: "상담을 통해 자신의 행동 패턴과 감정 반응을 이해하고 충동 상황에서의 대처 능력을 키울 수 있습니다. 또한 사건 이후의 불안, 수치심, 스트레스 등을 정리하는 데에도 도움이 될 수 있습니다."
  },
  {
    q: "Q10. 상담 기록은 어떻게 관리되나요?",
    a: "상담 기록은 상담 윤리 기준과 개인정보 보호 원칙에 따라 철저히 비밀로 관리됩니다. 상담 내용은 외부에 공개되지 않으며, 센터 내규에 따라 일정 기간 경과 후 안전하게 폐기됩니다. 내담자의 개인정보와 상담 내용 보호를 최우선으로 관리하고 있습니다."
  },
  {
    q: "Q11. 상담을 받는 사람들이 실제로 많나요?",
    a: "사건 이후 상담을 통해 자신의 행동을 돌아보고 재발을 방지하려는 분들이 점점 늘고 있습니다. 상담은 문제를 숨기는 과정이 아니라 상황을 정리하고 삶을 다시 안정적으로 회복하는 과정이 될 수 있습니다."
  },
  {
    q: "Q12. 상담을 받으면 재범 가능성이 줄어드나요?",
    a: "상담에서는 충동 상황, 사고 패턴, 행동 패턴을 분석하고 교정하는 과정을 진행합니다. 이를 통해 동일한 상황에서의 행동 선택을 바꾸는 연습을 하게 되며 재발 위험을 줄이는 데 도움을 줄 수 있습니다."
  },
  {
    q: "Q13. 상담이 꼭 필요한 상황은 어떤 경우인가요?",
    a: "다음과 같은 경우 상담이 특히 도움이 될 수 있습니다.\n• 사건 이후 불안이나 스트레스가 매우 큰 경우\n• 충동적으로 행동했던 경험이 있는 경우\n• 사건 이후 관계나 직장 생활이 어려워진 경우\n• 상황을 어떻게 정리해야 할지 막막한 경우"
  },
  {
    q: "Q14. 상담을 받는 것이 부끄러운 일인가요?",
    a: "많은 분들이 처음에는 상담을 망설이지만 실제 상담을 시작하면 \"혼자 고민할 때보다 훨씬 정리가 된다\"고 이야기합니다. 상담은 문제를 숨기는 것이 아니라 자신의 삶을 다시 안정적으로 정리하기 위한 과정입니다."
  },
  {
    q: "Q15. 상담을 시작하려면 어떻게 해야 하나요?",
    a: "전화 또는 온라인 문의를 통해 상담 예약이 가능합니다. 초기 상담에서는 현재 상황을 함께 정리하고 내담자에게 필요한 상담 방향을 안내해 드립니다. 혼자 고민하기보다 전문가와 함께 상황을 정리해보는 것이 문제 해결의 시작이 될 수 있습니다."
  }
];

const SENTENCING_FAQ_DATA = [
  {
    q: "Q1. 판사는 무엇을 가장 중요하게 보나요?",
    a: "판사는 사건의 사실관계뿐 아니라 피고인이 사건 이후 어떤 태도를 보였는지를 함께 살펴봅니다. 특히 책임 인식, 반성의 진정성, 재범 가능성, 사건 이후의 행동 변화 등이 중요한 판단 요소가 될 수 있습니다."
  },
  {
    q: "Q2. 심리상담 기록이 실제로 양형자료가 될 수 있나요?",
    a: "전문 상담기관에서의 상담 이력은 재범 방지를 위한 노력의 하나로 참고될 수 있습니다. 상담 과정에서 나타난 인식 변화, 행동 교정 노력, 충동 관리 계획 등은 객관적인 자료 형태로 정리될 수 있습니다."
  },
  {
    q: "Q3. 단순히 반성문만 제출하면 충분한가요?",
    a: "반성문은 자신의 생각을 표현하는 중요한 자료이지만, 실제 변화 노력까지 함께 보여주는 것이 더 중요합니다. 상담 참여, 교육 이수, 재발 방지 계획 등은 이러한 노력의 객관적인 근거가 될 수 있습니다."
  },
  {
    q: "Q4. 초범인 경우에도 판사가 상담 여부를 보나요?",
    a: "초범 여부도 중요한 요소지만 사건 이후 어떤 태도를 보였는지도 함께 고려됩니다. 자신의 행동 원인을 이해하고 재발을 방지하려는 노력이 있다면 긍정적으로 해석될 가능성이 있습니다."
  },
  {
    q: "Q5. 재범 위험성은 어떻게 판단되나요?",
    a: "재범 위험성은 사건의 특성, 개인의 생활환경, 충동 조절 능력, 사건 이후의 행동 변화 등을 종합적으로 고려하여 판단됩니다. 상담 과정에서는 이러한 부분을 분석하고 재발 가능성을 줄이기 위한 방법을 함께 찾게 됩니다."
  },
  {
    q: "Q6. 사건 이후 아무 행동도 하지 않으면 불리한가요?",
    a: "사건 이후 아무런 변화나 노력이 보이지 않는 경우에는 재범 위험성에 대한 우려가 제기될 수 있습니다. 반대로 자신의 행동을 돌아보고 개선하려는 노력은 긍정적인 요소로 고려될 수 있습니다."
  },
  {
    q: "Q7. 상담을 받는다고 해서 처벌이 줄어드나요?",
    a: "상담 자체가 처벌을 결정하는 요소는 아니지만, 사건 이후 변화하려는 노력과 재범 방지 의지를 보여주는 자료로 참고될 수 있습니다."
  },
  {
    q: "Q8. 판사는 피고인의 태도를 중요하게 보나요?",
    a: "네. 사건 이후의 태도는 매우 중요한 요소입니다. 책임을 회피하는 태도인지, 자신의 행동을 돌아보고 변화하려는 태도인지에 따라 사건을 바라보는 시각이 달라질 수 있습니다."
  },
  {
    q: "Q9. 재범 방지를 위한 노력에는 어떤 것들이 있나요?",
    a: "재범 방지를 위한 노력에는 심리상담 참여, 인지 교정 교육, 충동 조절 훈련, 생활 습관 개선 등이 포함될 수 있습니다. 이러한 과정은 자신의 행동 패턴을 이해하고 다시 같은 상황이 발생하지 않도록 준비하는 과정입니다."
  },
  {
    q: "Q10. 상담을 받는 것이 왜 중요한가요?",
    a: "상담은 단순히 형식적인 절차가 아니라 자신의 행동 원인을 이해하고 재발 가능성을 낮추기 위한 과정입니다. 사건 이후 삶을 다시 안정적으로 정리하고 건강한 방향으로 나아가기 위한 중요한 출발점이 될 수 있습니다."
  }
];

const FAQAccordionItem = ({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void, key?: any }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all mb-4">
      <button 
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-start gap-4">
          <span className="text-[#2E7D32] font-black text-xl shrink-0 mt-0.5">Q.</span>
          <span className="text-slate-900 font-bold text-lg leading-tight group-hover:text-[#2E7D32] transition-colors">{q.replace(/^Q\d+\.\s/, '')}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2E7D32]' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-50">
              <div className="flex items-start gap-4">
                <span className="text-[#2E7D32] font-black text-xl shrink-0 mt-0.5">A.</span>
                <div className="text-slate-600 leading-relaxed whitespace-pre-line text-[16px]">
                  {a}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 text-[#2E7D32] text-xs font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                상담이 필요한 경우 언제든 편하게 문의하실 수 있습니다.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CounselingProcessPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    {/* 1. 상단 인트로 영역 */}
    <header className="bg-slate-50 py-20 lg:py-28 text-center border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">부산 성범죄 가해자 상담 및 치료 프로세스</h1>
        <p className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 leading-tight">
          상담은 단순한 심리 상담이 아니라 사건 이후의 변화를 준비하는 과정입니다.
        </p>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
          평가부터 원인 분석, 교정 개입, 행동 훈련, 재발 방지 및 양형자료 정리까지 체계적인 5단계 상담 과정을 진행합니다.
        </p>
      </div>
    </header>

    {/* 2. 상단 이미지 영역 */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786088923/성범죄_가해자_상담_및_치료_프로세스_tveqfl.png" 
            alt="Professional Counseling Session" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    {/* 3. 5단계 상담 프로세스 카드 */}
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { 
              step: "카드1", 
              title: "평가", 
              subtitle: "심리 상태 및 위험 요인 점검", 
              desc: "현재 사건 상황, 심리 상태, 행동 패턴, 충동 조절 상태를 종합적으로 확인합니다.",
              icon: ClipboardCheck
            },
            { 
              step: "카드2", 
              title: "원인 분석", 
              subtitle: "행동의 심리적 기제 및 반복 패턴 파악", 
              desc: "사건 당시의 심리 상태와 행동 구조를 분석하여 재발 가능성을 점검합니다.",
              icon: Search
            },
            { 
              step: "카드3", 
              title: "교정 개입", 
              subtitle: "인지 왜곡 교정 및 상담 경과 기록", 
              desc: "사고 전환과 판단 구조 교정을 진행하며 상담 과정에서 나타나는 변화 과정을 기록합니다.",
              icon: RefreshCw
            },
            { 
              step: "카드4", 
              title: "훈련", 
              subtitle: "충동 차단 및 대안 행동 습득", 
              desc: "충동 조절 훈련과 위험 상황 인식을 통해 실제 생활에서의 행동 변화를 준비합니다.",
              icon: BrainCircuit
            },
            { 
              step: "카드5", 
              title: "재발 방지", 
              subtitle: "지속적인 모니터링 및 양형자료 정리", 
              desc: "상담 경과와 재범 방지 노력을 체계적으로 정리하여 변화 과정을 관리합니다.",
              icon: ShieldCheck
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-[#059669] group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">STEP {idx + 1}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm font-bold text-slate-700 mb-4 leading-tight">{item.subtitle}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. 단계별 상세 설명 영역 */}
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-16">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">부산 성범죄 가해자 상담 및 치료 프로세스</h2>
            <div className="space-y-6 text-lg">
              <p>성범죄 사건 상담은 단순한 심리 상담만으로 이루어지지 않습니다.</p>
              <p>사건 이후에는 심리적 혼란과 함께 수사 절차, 재판 과정, 사회적 관계 문제 등 다양한 상황이 동시에 발생하기 때문입니다.</p>
              <p>본 센터의 상담은 이러한 상황을 고려하여 심리 상담과 사건 이후의 준비 과정을 함께 정리하는 구조로 진행됩니다.</p>
              <p>상담은 평가 단계에서 시작하여 재발 방지 단계까지 체계적인 5단계 상담 과정으로 진행됩니다.</p>
            </div>
          </div>

          <div className="space-y-24">
            {/* 1단계 */}
            <section className="relative pl-12 border-l-2 border-slate-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#059669]" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">1단계 평가</h3>
              <p className="text-lg font-bold text-slate-700 mb-6">심리 상태 및 위험 요인 점검</p>
              <div className="space-y-6">
                <p>상담의 첫 단계에서는 내담자의 현재 심리 상태와 사건과 관련된 상황을 함께 정리합니다.</p>
                <p>이 과정에서는</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {['현재 진행 중인 사건 상황', '심리 상태 점검', '행동 패턴 확인', '충동 조절 상태'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>등을 종합적으로 점검합니다.</p>
                <p>이 단계는 상담의 방향을 설정하는 중요한 과정입니다.</p>
              </div>
            </section>

            {/* 2단계 */}
            <section className="relative pl-12 border-l-2 border-slate-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#059669]" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">2단계 원인 분석</h3>
              <p className="text-lg font-bold text-slate-700 mb-6">행동의 심리적 배경 이해</p>
              <div className="space-y-6">
                <p>성범죄 사건은 대부분 특정한 심리적 패턴과 행동 구조 속에서 발생하는 경우가 많습니다.</p>
                <p>상담에서는</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {['사건 당시의 심리 상태', '행동의 심리적 기제', '반복 가능성이 있는 행동 패턴'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>등을 분석합니다.</p>
                <p>이 과정은 내담자가 자신의 행동을 보다 객관적으로 이해하고 재발 가능성을 줄이기 위한 중요한 과정입니다.</p>
              </div>
            </section>

            {/* 3단계 */}
            <section className="relative pl-12 border-l-2 border-slate-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#059669]" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">3단계 교정 개입</h3>
              <p className="text-lg font-bold text-slate-700 mb-6">인지 왜곡 교정 및 사고 전환</p>
              <div className="space-y-6">
                <p>사건과 관련된 행동에는 인지 왜곡이나 잘못된 판단 구조가 포함되어 있는 경우가 있습니다.</p>
                <p>상담 과정에서는</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {['인지 왜곡 교정', '사고 전환', '상황 판단 훈련', '충동 인식 과정'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>등을 통해 행동에 영향을 미치는 사고 구조를 점검하고 교정합니다.</p>
                <p>또한 이 단계부터 상담 과정에서 나타나는 행동 변화와 상담 경과를 기록하며 변화 과정을 체계적으로 정리합니다.</p>
                <p>이러한 상담 기록은 내담자의 변화 과정과 재범 방지 노력을 객관적으로 정리하는 자료가 됩니다.</p>
              </div>
            </section>

            {/* 4단계 */}
            <section className="relative pl-12 border-l-2 border-slate-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#059669]" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">4단계 행동 훈련</h3>
              <p className="text-lg font-bold text-slate-700 mb-6">충동 조절 및 대안 행동 형성</p>
              <div className="space-y-6">
                <p>행동의 변화는 단순한 인식만으로 이루어지지 않습니다.</p>
                <p>상담에서는 실제 생활에서 적용할 수 있는 행동 훈련을 진행합니다.</p>
                <p>예를 들어</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {['충동 차단 훈련', '위험 상황 인식', '대안 행동 형성', '반복 행동 차단 전략'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>등을 통해 실제 생활에서 반복될 수 있는 상황을 예방하는 훈련을 진행합니다.</p>
              </div>
            </section>

            {/* 5단계 */}
            <section className="relative pl-12 border-l-2 border-slate-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#059669]" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">5단계 재발 방지</h3>
              <p className="text-lg font-bold text-slate-700 mb-6">변화 유지 및 양형자료 정리</p>
              <div className="space-y-6">
                <p>상담의 마지막 단계는 변화가 지속될 수 있도록 관리하는 과정입니다.</p>
                <p>이 단계에서는</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {['재발 위험 요인 점검', '행동 변화 유지', '생활 패턴 관리', '지속적인 모니터링'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>등을 진행합니다.</p>
                <p>또한 상담 과정에서 이루어진 변화 과정과 재범 방지 노력, 상담 경과 기록을 정리하여 양형자료 준비 과정에 참고될 수 있도록 정리할 수 있습니다.</p>
                <p>본 센터는 사건 상담 경험을 바탕으로 상담 과정에서 이루어지는 변화와 노력들이 보다 체계적으로 정리될 수 있도록 상담을 진행하고 있습니다.</p>
              </div>
            </section>
          </div>

          <div className="pt-20 border-t border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">상담은 변화를 준비하는 과정입니다</h3>
            <div className="space-y-6 text-lg">
              <p>사건 이후 많은 분들이</p>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-700 font-medium">
                “앞으로 어떻게 해야 할지 모르겠다”<br />
                “지금 무엇을 준비해야 할지 모르겠다”
              </div>
              <p>는 상태에서 상담을 찾게 됩니다.</p>
              <p>상담은 단순히 과거를 이야기하는 과정이 아니라 현재 상황을 정리하고 앞으로의 방향을 준비하는 과정이 될 수 있습니다.</p>
              <p>본 센터는 성범죄 사건 상담 경험과 심리적 이해를 바탕으로 내담자가 보다 안정적으로 상황을 정리하고 변화의 방향을 준비할 수 있도록 돕고 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 5. 상담 기록 및 양형자료 정리 강조 박스 */}
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 lg:p-16 bg-white rounded-[40px] border border-slate-200 shadow-sm text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">상담 과정은 변화의 기록이 됩니다</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            상담 과정에서 이루어지는 행동 변화, 재범 방지 노력, 상담 참여 경과는 체계적으로 정리될 수 있으며 사건 진행 상황에 따라 양형자료 준비 과정에서 참고될 수 있습니다.
          </p>
        </div>
      </div>
    </section>

    {/* 6. 변호사 협업 연결 문장 */}
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-slate-500 font-medium">
          본 센터는 사건 상담 경험과 절차 이해를 바탕으로 필요 시 변호사 협업 구조 속에서 상담 경과와 변화 과정을 보다 체계적으로 정리할 수 있도록 상담을 진행하고 있습니다.
        </p>
      </div>
    </section>

    {/* 7. 마무리 영역 */}
    <section className="py-24 lg:py-32 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">상담은 현재를 정리하고 앞으로를 준비하는 과정입니다</h2>
        <p className="text-xl text-slate-500 leading-relaxed mb-16">
          사건 이후 많은 분들이 어디서부터 시작해야 할지 모르는 상태에서 상담을 시작합니다. 상담은 현재 상황을 차분하게 정리하고 변화의 방향을 준비하는 과정이 될 수 있습니다.
        </p>
        
        {/* 8. 상담 문의 버튼 */}
        <a 
          href={NAVER_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-12 py-6 bg-[#059669] text-white text-xl font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-xl"
        >
          상담 문의하기
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </section>
  </motion.div>
);

const ConfidentialityPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    {/* 1. 상단 인트로 영역 */}
    <header className="bg-slate-50 py-20 lg:py-28 text-center border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">비밀보장 원칙</h1>
        <p className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 leading-tight">
          상담에서 가장 중요한 것은 신뢰이며, 상담 내용은 안전하게 보호되어야 합니다.
        </p>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
          본 센터는 상담 과정에서 이루어지는 모든 내용을 엄격한 비밀보장 원칙 아래 관리하고 있습니다.
        </p>
      </div>
    </header>

    {/* 2. 상단 이미지 영역 */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746427/238f8462b0008cc95bc664c1596010d9_tosbht.png" 
            alt="Secure Counseling Environment" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    {/* 3. 핵심 원칙 요약 카드 영역 */}
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { 
              title: "상담 내용 비공개", 
              desc: "상담 과정에서 이루어지는 대화와 상담 기록은 상담을 위한 목적 외에 외부에 공개되지 않습니다.",
              icon: Lock
            },
            { 
              title: "상담 기록 보호", 
              desc: "상담 기록은 외부 접근이 제한된 방식으로 관리되며 상담 목적 외에는 사용되지 않습니다.",
              icon: ShieldCheck
            },
            { 
              title: "동의 없는 정보 제공 금지", 
              desc: "상담 내용이나 상담 기록이 외부 기관이나 제3자에게 전달되는 일은 내담자의 동의 없이 이루어지지 않습니다.",
              icon: FileCheck
            },
            { 
              title: "안전한 상담 환경", 
              desc: "상담 과정에서 이루어지는 모든 대화와 기록이 내담자의 신뢰 속에서 이루어질 수 있도록 상담 환경과 관리 원칙을 유지하고 있습니다.",
              icon: ShieldCheck
            },
            { 
              title: "내담자 신뢰 우선", 
              desc: "내담자의 상황과 신뢰를 가장 중요하게 생각하며 안정적인 상담 환경 속에서 상담이 이루어질 수 있도록 노력하고 있습니다.",
              icon: Users
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 group-hover:bg-[#059669] group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. 본문 설명 영역 */}
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-16">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">비밀보장 원칙</h2>
            <div className="space-y-6 text-lg">
              <p>상담에서 가장 중요한 것은 신뢰입니다.</p>
              <p>많은 분들이 상담을 고민하면서 가장 먼저 걱정하는 것이 있습니다.</p>
              <p className="font-bold text-slate-800 italic">“내가 상담한 내용이 다른 사람에게 알려지지는 않을까?”</p>
              <p>특히 사건과 관련된 상담의 경우 이러한 걱정은 더욱 클 수 있습니다.</p>
              <p>본 센터는 상담 과정에서 이루어지는 모든 내용을 엄격한 비밀보장 원칙 아래 관리하고 있습니다.</p>
              <p>상담은 내담자가 자신의 상황을 안전하게 이야기할 수 있어야 의미가 있기 때문입니다.</p>
            </div>
          </div>

          <div className="space-y-24">
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#059669] rounded-full" />
                상담 내용은 외부에 공개되지 않습니다
              </h3>
              <div className="space-y-4">
                <p>상담 과정에서 이루어지는 대화와 상담 기록은 상담을 위한 목적 외에 외부에 공개되지 않습니다.</p>
                <p>상담 내용은 내담자의 동의 없이 제3자에게 전달되지 않으며 상담 기록 또한 내부 기준에 따라 관리됩니다.</p>
                <p>이는 상담 관계에서 가장 기본적인 원칙입니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#059669] rounded-full" />
                상담 기록은 보호된 방식으로 관리됩니다
              </h3>
              <div className="space-y-4">
                <p>상담 과정에서 이루어지는 상담 기록은 내담자의 변화 과정과 상담 경과를 정리하기 위해 작성됩니다.</p>
                <p>이러한 기록은 외부 접근이 제한된 방식으로 관리되며 상담 목적 외에는 사용되지 않습니다.</p>
                <p>상담 기록은 상담 과정의 흐름을 정리하고 내담자의 변화 과정을 객관적으로 확인하기 위한 자료입니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#059669] rounded-full" />
                내담자의 동의 없이 정보 제공은 이루어지지 않습니다
              </h3>
              <div className="space-y-4">
                <p>상담 내용이나 상담 기록이 외부 기관이나 제3자에게 전달되는 일은 내담자의 동의 없이 이루어지지 않습니다.</p>
                <p>필요한 경우에도 반드시 내담자의 확인과 동의를 거쳐 진행됩니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#059669] rounded-full" />
                상담은 안전한 공간에서 이루어집니다
              </h3>
              <div className="space-y-4">
                <p>상담은 내담자가 자신의 상황을 솔직하게 이야기할 수 있는 안전한 공간이어야 합니다.</p>
                <p>본 센터는 상담 과정에서 이루어지는 모든 대화와 기록이 내담자의 신뢰 속에서 이루어질 수 있도록 상담 환경과 관리 원칙을 유지하고 있습니다.</p>
              </div>
            </section>

            <section className="pt-16 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">상담을 망설이고 있다면</h3>
              <div className="space-y-6 text-lg">
                <p>사건 이후 많은 분들이</p>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-700 font-medium space-y-2">
                  <p>“상담을 받아도 괜찮을까”</p>
                  <p>“상담 내용이 밖으로 알려지지는 않을까”</p>
                </div>
                <p>라는 걱정 때문에 상담을 망설이기도 합니다.</p>
                <p>상담은 누군가에게 평가받는 자리가 아니라 현재 상황을 정리하고 앞으로의 방향을 준비하는 과정입니다.</p>
                <p>본 센터는 내담자의 상황과 신뢰를 가장 중요하게 생각하며 안정적인 상담 환경 속에서 상담이 이루어질 수 있도록 노력하고 있습니다.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    {/* 5. 강조 박스 영역 */}
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 lg:p-16 bg-white rounded-[40px] border border-slate-200 shadow-sm text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">상담은 신뢰 위에서 이루어집니다</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            상담 내용과 상담 기록은 내담자의 동의 없는 외부 제공 없이 보호되며, 내담자가 안심하고 자신의 상황을 이야기할 수 있는 환경을 유지하는 것이 본 센터의 중요한 원칙입니다.
          </p>
        </div>
      </div>
    </section>

    {/* 6. 마무리 영역 */}
    <section className="py-24 lg:py-32 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">안심하고 상담을 시작하실 수 있도록</h2>
        <p className="text-xl text-slate-500 leading-relaxed mb-16">
          상담은 현재 상황을 안전하게 정리하고 앞으로의 방향을 준비하는 과정입니다. 본 센터는 내담자의 신뢰와 비밀보장을 가장 중요한 원칙으로 생각하며 상담을 진행하고 있습니다.
        </p>
        
        {/* 7. 상담 문의 버튼 */}
        <a 
          href={NAVER_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-12 py-6 bg-[#059669] text-white text-xl font-bold rounded-2xl hover:bg-[#047857] transition-all shadow-xl shadow-emerald-100"
        >
          상담 문의하기
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </section>
  </motion.div>
);

const GuidePage = ({ title, slug }: { title: string; slug: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSentencingIndex, setOpenSentencingIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${slug === 'faq' ? 'bg-[#f7f9fb]' : 'bg-white'}`}
    >
      <div className={`${slug === 'faq' ? 'bg-[#E8F5E9]' : 'bg-slate-50'} py-16 lg:py-24 text-slate-900 relative overflow-hidden border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight">{title}</h1>
          <p className={`text-xl ${slug === 'faq' ? 'text-green-800/70' : 'text-slate-500'} max-w-2xl leading-relaxed`}>
            {slug === 'faq' 
              ? "사건을 겪게 되면 누구나 큰 혼란과 두려움을 느끼게 됩니다. 가장 많이 질문하시는 내용들을 정리해 드립니다."
              : "투명하고 체계적인 상담 안내를 확인하세요."}
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 skew-x-12 translate-x-1/4 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {slug === 'faq' && (
          <div className="space-y-16">
            {/* General FAQ Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#2E7D32] rounded-full" />
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">자주 묻는 질문 (FAQ)</h2>
              </div>
              <div className="max-w-4xl">
                {FAQ_DATA.map((item, idx) => (
                  <FAQAccordionItem 
                    key={idx}
                    q={item.q}
                    a={item.a}
                    isOpen={openIndex === idx}
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  />
                ))}
              </div>
            </section>

            {/* Sentencing FAQ Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#059669] rounded-full" />
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">판사가 실제로 보는 것 (양형자료 관련 FAQ)</h2>
              </div>
              <div className="max-w-4xl">
                <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm mb-8">
                  <p className="text-slate-600 leading-relaxed mb-10 text-lg">
                    사건을 겪은 많은 분들이 "판사는 무엇을 중요하게 볼까"라는 질문을 합니다. 실제 재판에서는 단순히 사건 사실뿐 아니라 사건 이후의 태도와 변화 가능성도 함께 고려됩니다.
                  </p>
                  {SENTENCING_FAQ_DATA.map((item, idx) => (
                    <FAQAccordionItem 
                      key={idx}
                      q={item.q}
                      a={item.a}
                      isOpen={openSentencingIndex === idx}
                      onClick={() => setOpenSentencingIndex(openSentencingIndex === idx ? null : idx)}
                    />
                  ))}
                </div>
              </div>
            </section>
            
            {/* Bottom CTA */}
            <div className="bg-slate-50 rounded-[40px] p-12 text-center text-slate-900 relative overflow-hidden border border-slate-200">
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6">더 궁금한 점이 있으신가요?</h3>
                <p className="text-slate-500 mb-10 max-w-lg mx-auto">
                  혼자 고민하기보다 전문가와 함께 상황을 정리해보는 것이 문제 해결의 시작이 될 수 있습니다.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href={NAVER_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-[#059669] text-white font-bold rounded-2xl hover:bg-[#047857] transition-all flex items-center gap-2 shadow-lg shadow-emerald-100"
                  >
                    상담 예약하기
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a 
                    href={`tel:${CONTACT_PHONE}`}
                    className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
                  >
                    전화 문의하기 ({CONTACT_PHONE})
                  </a>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100/50 blur-[100px] rounded-full -ml-32 -mt-32" />
            </div>
          </div>
        )}

        {slug === 'privacy' && (
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-[40px] bg-slate-50 text-slate-900 border border-slate-200">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold">비밀보장 및 윤리규정</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-emerald-600">철저한 기록 관리</h4>
                <p className="text-slate-500 leading-relaxed">모든 상담 기록은 암호화되어 안전하게 보관되며, 법적 의무 사항(자해/타해 위험 등)을 제외하고는 절대 외부로 공개되지 않습니다.</p>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-emerald-600">개인정보 보호</h4>
                <p className="text-slate-500 leading-relaxed">상담 신청부터 종결까지 모든 과정에서 내담자의 신원 보호를 최우선으로 합니다. 익명 상담 신청도 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {slug !== 'faq' && slug !== 'privacy' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
  );
};

const ImpulseControlTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "감정 촉발 상황", text: "스트레스를 받으면 즉각적인 자극을 찾게 된다." },
    { category: "감정 촉발 상황", text: "외로울 때 충동적인 행동을 할 가능성이 높아진다." },
    { category: "감정 촉발 상황", text: "화가 나거나 억울하면 판단력이 흐려진다." },
    { category: "감정 촉발 상황", text: "술을 마시면 통제력이 약해진다." },
    { category: "감정 촉발 상황", text: "피곤하거나 지칠 때 충동 행동이 늘어난다." },
    { category: "충동 발생 순간", text: "“한 번 정도는 괜찮다”는 생각이 든다." },
    { category: "충동 발생 순간", text: "행동하기 전에 충분히 생각하지 못하는 경우가 있다." },
    { category: "충동 발생 순간", text: "행동 후에 후회하는 일이 반복된다." },
    { category: "충동 발생 순간", text: "충동이 올라오면 참기 어렵다고 느낀다." },
    { category: "충동 발생 순간", text: "순간적인 욕구가 이성적 판단을 이기는 경우가 있다." },
    { category: "통제 전략", text: "충동이 올라올 때 스스로 멈추는 방법을 알고 있다.", isReverse: true },
    { category: "통제 전략", text: "위험 상황을 피하려고 노력한다.", isReverse: true },
    { category: "통제 전략", text: "스트레스를 건강한 방식으로 해소한다.", isReverse: true },
    { category: "통제 전략", text: "문제가 생길 수 있는 상황을 미리 피한다.", isReverse: true },
    { category: "통제 전략", text: "자신의 행동 패턴을 객관적으로 돌아본다.", isReverse: true },
    { category: "반복 패턴", text: "같은 실수를 반복한 경험이 있다." },
    { category: "반복 패턴", text: "하지 말아야 할 행동이라는 것을 알면서도 하게 된다." },
    { category: "반복 패턴", text: "“이번이 마지막”이라고 생각한 적이 여러 번 있다." },
    { category: "반복 패턴", text: "충동 행동 이후 죄책감이나 후회가 크게 느껴진다." },
    { category: "반복 패턴", text: "스스로 통제하기 어렵다는 생각이 든다." },
  ];

  const calculateScore = () => {
    return answers.reduce((acc, curr, idx) => {
      if (curr === -1) return acc;
      const q = questions[idx];
      return acc + (q.isReverse ? (3 - curr) : curr);
    }, 0);
  };

  const totalScore = calculateScore();
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "충동 조절 능력 양호", color: "text-emerald-600", bg: "bg-emerald-50", desc: "현재 충동 조절 능력이 비교적 양호한 상태입니다. 스트레스 상황에서도 이성적인 판단을 유지하려 노력하고 계시네요. 지금의 건강한 대처 방식을 유지하세요." };
    if (score <= 30) return { title: "통제력 흔들림 (주의)", color: "text-amber-600", bg: "bg-amber-50", desc: "스트레스나 특정 감정 상태에서 통제력이 일시적으로 흔들릴 수 있는 단계입니다. 충동이 올라올 때 잠시 멈추고 상황을 객관화하는 연습이 필요합니다." };
    if (score <= 45) return { title: "충동 패턴 형성 (위험)", color: "text-orange-600", bg: "bg-orange-50", desc: "반복적인 충동 행동 패턴이 형성되어 자제력이 약해진 상태입니다. 이는 의도치 않은 법적·사회적 문제로 이어질 수 있으므로, 전문가와의 상담을 통해 충동 조절 전략을 수립해야 합니다." };
    return { title: "충동 조절 어려움 (심각)", color: "text-red-600", bg: "bg-red-50", desc: "스스로의 의지만으로는 충동을 통제하기 매우 어려운 상태입니다. 반복되는 후회와 죄책감이 삶의 질을 떨어뜨리고 있습니다. 즉각적인 전문 심리치료와 약물 치료 등을 포함한 통합적 개입을 강력히 권장합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-emerald-50 border border-emerald-100 overflow-hidden text-slate-900">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                충동 조절 능력 <br /> 자가 평가
              </h2>
              <p className="text-slate-500 max-w-lg leading-relaxed">
                특정 상황에서 나의 통제력은 어느 정도인가요? <br />
                지난 6개월간의 경험을 바탕으로 가장 가까운 항목을 선택해 주세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["감정 촉발 상황", "충동 발생 순간", "통제 전략", "반복 패턴"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-emerald-600 transition-colors">
                            <span className="text-emerald-500 font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              disabled={!isComplete}
              onClick={() => {
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-emerald-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Zap className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-emerald-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-emerald-50 border border-emerald-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
              <h4 className="font-bold text-2xl text-emerald-900 mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-500" />
                충동 조절의 메커니즘
              </h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                충동 조절은 뇌의 전두엽 기능과 밀접하게 연관되어 있습니다. 스트레스나 피로, 음주는 이 기능을 일시적으로 약화시켜 평소라면 하지 않았을 행동을 하게 만듭니다. 자신의 취약 상황을 파악하고 '멈춤' 신호를 만드는 훈련이 중요합니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-emerald-50 border border-emerald-100">
              <h4 className="font-bold text-2xl text-emerald-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                조절 능력 강화 솔루션
              </h4>
              <ul className="space-y-6">
                {[
                  "충동 발생 시 10초간 심호흡하며 상황 분리하기",
                  "자신의 감정 상태를 기록하는 '감정 일기' 작성",
                  "전문가와 함께하는 인지행동치료(CBT) 프로그램"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-emerald-500 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-emerald-600 text-white text-center font-black text-lg rounded-[24px] hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-100 active:scale-95"
            >
              전문가 상담 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const DigitalRiskTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "음란물 및 자극 노출 영역", text: "야동·성적 쇼츠·SNS 노출 콘텐츠를 주 3회 이상 시청한다." },
    { category: "음란물 및 자극 노출 영역", text: "자극 강도가 점점 높아지는 경향이 있다." },
    { category: "음란물 및 자극 노출 영역", text: "미성년으로 보이는 콘텐츠에 노출된 적이 있다." },
    { category: "음란물 및 자극 노출 영역", text: "“이 정도는 괜찮겠지”라고 스스로 합리화한 적이 있다." },
    { category: "음란물 및 자극 노출 영역", text: "시청 후 죄책감이 들지만 반복된다." },
    { category: "온라인 관계 위험 영역", text: "오픈채팅·DM 등에서 성적 대화를 시도한 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "상대 나이를 명확히 확인하지 않은 채 대화한 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "익명성이 있으니 괜찮다고 느낀 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "사진이나 영상을 요구하거나 받은 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "저장해 둔 이미지·영상이 있다." },
    { category: "충동 통제 영역", text: "스트레스나 음주 후 온라인 접속이 증가한다." },
    { category: "충동 통제 영역", text: "외로움이나 분노가 들 때 자극 콘텐츠를 찾는다." },
    { category: "충동 통제 영역", text: "“한 번만 더”라는 생각이 반복된다." },
    { category: "충동 통제 영역", text: "스스로 통제하기 어렵다고 느낀 적이 있다." },
    { category: "충동 통제 영역", text: "지우고 다시 반복한 경험이 있다." },
    { category: "법적 위험 인식 영역", text: "아청법 기준을 정확히 모른다." },
    { category: "법적 위험 인식 영역", text: "포렌식으로 복원 가능하다는 사실을 가볍게 여긴 적이 있다." },
    { category: "법적 위험 인식 영역", text: "“다운만 받았지 유포는 안 했다”고 안심한 적이 있다." },
    { category: "법적 위험 인식 영역", text: "캡처·저장도 처벌 대상이 될 수 있음을 충분히 인식하지 못했다." },
    { category: "법적 위험 인식 영역", text: "디지털 기록이 영구적으로 남는다는 점을 깊이 생각하지 않았다." },
  ];

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "낮은 위험군", color: "text-emerald-600", bg: "bg-emerald-50", desc: "비교적 통제 가능하나 주의가 필요한 상태입니다. 현재의 건강한 온라인 활동 습관을 유지하시되, 자극적인 콘텐츠에 대한 경계심을 늦추지 마세요." };
    if (score <= 30) return { title: "경계군", color: "text-amber-600", bg: "bg-amber-50", desc: "반복적인 패턴이 존재하며, 인지 왜곡이 시작될 수 있는 단계입니다. 전문가와의 상담을 통해 자신의 온라인 활동 패턴을 객관적으로 점검하고 교정 개입을 받는 것을 권장합니다." };
    if (score <= 45) return { title: "고위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "충동 조절의 어려움과 왜곡된 사고 구조가 형성된 상태입니다. 법적 위험성이 매우 높으며, 혼자만의 의지로는 통제가 어려울 수 있습니다. 즉각적인 전문 상담이 필요합니다." };
    return { title: "재범 위험군", color: "text-red-600", bg: "bg-red-50", desc: "매우 심각한 수준의 중독 증상과 왜곡된 인지 구조를 보이고 있습니다. 즉각적인 상담 및 외부 자극 차단 개입이 필수적이며, 체계적인 치료 프로그램 이수가 시급합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Sticky Progress Bar */}
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-[#059669]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-slate-50 border border-slate-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                디지털 성범죄 <br /> 위험도 자가 체크
              </h2>
              <p className="text-slate-500 max-w-lg leading-relaxed">
                온라인 활동 중 나도 모르게 형성된 위험 요소를 객관적으로 점검합니다. <br />
                최근 6개월간의 활동을 기준으로 솔직하게 답변해 주세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["음란물 및 자극 노출 영역", "온라인 관계 위험 영역", "충동 통제 영역", "법적 위험 인식 영역"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-[#059669] transition-colors">
                            <span className="text-[#059669] font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-[#059669] border-[#059669] text-white shadow-xl shadow-emerald-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                              {answers[globalIdx] === item.score && (
                                <motion.div 
                                  layoutId={`active-indicator-${globalIdx}`}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"
                                >
                                  <div className="w-2 h-2 bg-[#059669] rounded-full" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4F46E5] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              disabled={!isComplete}
              onClick={() => {
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-[#4F46E5] text-white shadow-2xl shadow-indigo-100 hover:bg-[#4338ca] hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-emerald-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Smartphone className="w-12 h-12 text-[#059669]" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-emerald-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-600" />
                위험성 분석
              </h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                디지털 성범죄는 '기록의 영구성'과 '확산의 신속성' 때문에 피해자에게 씻을 수 없는 고통을 줍니다. 또한 수사 기관의 포렌식 기술은 매우 정교하여 삭제된 기록도 복원이 가능합니다. 단순 시청이나 소지도 엄격한 처벌 대상이 됨을 명심해야 합니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-emerald-50 border border-emerald-100">
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                솔루션 가이드
              </h4>
              <ul className="space-y-6">
                {[
                  "디지털 기기 사용 환경의 물리적 차단 설정",
                  "충동 조절 및 스트레스 관리 전문 상담",
                  "디지털 성범죄 관련 법률 및 윤리 교육"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-emerald-600 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-[#059669] text-white text-center font-black text-lg rounded-[24px] hover:bg-[#047857] transition-all shadow-2xl shadow-emerald-100 active:scale-95"
            >
              전문가 상담 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const GenderSensitivityTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "피해 인식 영역", text: "상대방이 명확히 거부하지 않았다면 동의했다고 볼 수 있다고 생각한다." },
    { category: "피해 인식 영역", text: "술에 취한 상태에서는 판단력이 떨어지므로 어느 정도는 이해할 수 있다고 본다." },
    { category: "피해 인식 영역", text: "상대가 평소 호의적으로 행동했다면 성적 의도가 있었다고 해석한 적이 있다." },
    { category: "피해 인식 영역", text: "피해자가 즉시 신고하지 않았다면 상황이 심각하지 않았다고 생각한 적이 있다." },
    { category: "피해 인식 영역", text: "피해자의 복장이나 행동이 오해를 불러일으킬 수 있다고 자주 생각한다." },
    { category: "책임 인식 영역", text: "상황이 그렇게 된 것은 서로의 책임이라고 느낀 적이 있다." },
    { category: "책임 인식 영역", text: "억울하다는 생각이 먼저 떠오른다." },
    { category: "책임 인식 영역", text: "상대가 명확히 거부하지 않았으니 문제 될 줄 몰랐다고 생각한다." },
    { category: "책임 인식 영역", text: "나는 의도하지 않았으니 큰 잘못은 아니라고 느낀 적이 있다." },
    { category: "책임 인식 영역", text: "법이 너무 엄격하다고 느낀 적이 있다." },
    { category: "공감 능력 영역", text: "상대가 느꼈을 두려움이나 불안을 구체적으로 상상하기 어렵다." },
    { category: "공감 능력 영역", text: "“그 정도로 상처받을 일인가?”라고 생각한 적이 있다." },
    { category: "공감 능력 영역", text: "상대 입장에서 감정 일기를 써본 적이 없다." },
    { category: "공감 능력 영역", text: "피해자의 삶이 이후 어떻게 달라졌을지 깊이 생각해본 적이 없다." },
    { category: "공감 능력 영역", text: "사건 이후 나의 억울함이 상대의 고통보다 더 크게 느껴졌다." },
    { category: "왜곡 사고 영역", text: "“남자라면 그럴 수 있다”는 말을 이해하는 편이다." },
    { category: "왜곡 사고 영역", text: "성적 충동은 어쩔 수 없는 본능이라고 생각한다." },
    { category: "왜곡 사고 영역", text: "음란물의 영향은 실제 행동과는 별개라고 본다." },
    { category: "왜곡 사고 영역", text: "대부분의 성범죄는 과장되었다고 느낀 적이 있다." },
    { category: "왜곡 사고 영역", text: "성인지 교육은 형식적이라고 생각한 적이 있다." },
  ];

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "비교적 건강한 성인지 관점", color: "text-emerald-600", bg: "bg-emerald-50", desc: "현재 성인지 관점이 비교적 객관적이고 건강한 상태입니다. 하지만 성인지 감수성은 지속적인 학습과 성찰이 필요한 영역이므로 꾸준한 관심을 권장합니다." };
    if (score <= 30) return { title: "부분적 왜곡 존재 (교정 필요)", color: "text-amber-600", bg: "bg-amber-50", desc: "일부 문항에서 성인지 왜곡이 발견됩니다. 특정 상황에서 피해자의 입장을 충분히 고려하지 못할 위험이 있으므로, 전문가와의 상담을 통해 자신의 인지 구조를 점검해보는 것이 좋습니다." };
    if (score <= 45) return { title: "성인지 왜곡 위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "성인지 관점에 상당한 왜곡이 존재하며, 이는 실제 행동으로 이어질 위험이 높은 상태입니다. 자신의 사고 패턴이 타인에게 어떤 고통을 줄 수 있는지 깊이 있는 성찰과 전문적인 교정 교육이 시급합니다." };
    return { title: "고위험 왜곡 사고 패턴", color: "text-red-600", bg: "bg-red-50", desc: "매우 위험한 수준의 성인지 왜곡 사고를 보이고 있습니다. 이는 법적 문제뿐만 아니라 심각한 사회적 갈등을 초래할 수 있는 패턴입니다. 즉시 전문적인 심리치료와 행동 교정 프로그램에 참여하시기를 강력히 권고합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Sticky Progress Bar */}
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-[#059669]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-emerald-50 border border-emerald-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                성인지 감수성 <br /> 자가 체크 테스트
              </h2>
              <p className="text-slate-500 max-w-lg leading-relaxed">
                나의 성인지 관점은 얼마나 객관적인가요? <br />
                솔직한 답변을 통해 자신의 인지 구조를 점검해 보세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["피해 인식 영역", "책임 인식 영역", "공감 능력 영역", "왜곡 사고 영역"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-[#059669] transition-colors">
                            <span className="text-[#059669] font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-[#059669] border-[#059669] text-white shadow-xl shadow-emerald-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                              {answers[globalIdx] === item.score && (
                                <motion.div 
                                  layoutId={`active-indicator-sensitivity-${globalIdx}`}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"
                                >
                                  <div className="w-2 h-2 bg-[#059669] rounded-full" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#059669] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              disabled={!isComplete}
              onClick={() => {
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-[#059669] text-white shadow-2xl shadow-emerald-100 hover:bg-[#047857] hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-emerald-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <ClipboardCheck className="w-12 h-12 text-[#059669]" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-emerald-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-500" />
                전문가 소견
              </h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                성인지 왜곡은 단순한 생각의 차이가 아니라, 타인의 권리를 침해할 수 있는 위험한 인지 구조입니다. 특히 '피해자 유발론'이나 '책임 회피'적 사고는 재범의 가장 큰 원인이 됩니다. 저희 센터는 이러한 왜곡된 인지 구조를 객관적으로 분석하고 교정하는 특화 프로그램을 운영하고 있습니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-emerald-50 border border-emerald-100">
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                다음 단계 안내
              </h4>
              <ul className="space-y-6">
                {[
                  "전문가와의 1:1 심층 인지 분석 상담",
                  "성인지 왜곡 교정 특화 교육 이수",
                  "재범 방지를 위한 행동 계약 수립"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-emerald-500 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-[#059669] text-white text-center font-black text-lg rounded-[24px] hover:bg-[#047857] transition-all shadow-2xl shadow-emerald-100 active:scale-95"
            >
              상담 및 교육 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const RecidivismRiskTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "충동 통제 영역", text: "충동적인 행동을 한 후 후회하는 경우가 있다." },
    { category: "충동 통제 영역", text: "스트레스 상황에서 통제력이 약해진다." },
    { category: "충동 통제 영역", text: "음주 후 판단력이 흐려진 경험이 있다." },
    { category: "충동 통제 영역", text: "순간적인 욕구가 이성적 판단을 이긴 적이 있다." },
    { category: "충동 통제 영역", text: "하지 말아야 할 행동을 반복한 경험이 있다." },
    { category: "인지 왜곡 영역", text: "상황이 그렇게 심각하지 않았다고 생각한 적이 있다." },
    { category: "인지 왜곡 영역", text: "상대도 어느 정도 책임이 있다고 느낀 적이 있다." },
    { category: "인지 왜곡 영역", text: "억울함이 먼저 떠오른 적이 있다." },
    { category: "인지 왜곡 영역", text: "법 기준이 지나치게 엄격하다고 느낀 적이 있다." },
    { category: "인지 왜곡 영역", text: "“그 정도는 괜찮다”는 생각이 든 적이 있다." },
    { category: "생활 안정성 영역", text: "최근 스트레스가 많다." },
    { category: "생활 안정성 영역", text: "수면이나 생활 패턴이 불규칙하다." },
    { category: "생활 안정성 영역", text: "음주나 자극적인 콘텐츠 사용이 잦다." },
    { category: "생활 안정성 영역", text: "외로움이나 정서적 고립감을 자주 느낀다." },
    { category: "생활 안정성 영역", text: "건강한 취미나 스트레스 해소 방법이 부족하다." },
    { category: "자기 인식 영역", text: "자신의 행동 패턴을 객관적으로 돌아본 적이 있다.", isReverse: true },
    { category: "자기 인식 영역", text: "비슷한 상황을 피하려는 노력을 하고 있다.", isReverse: true },
    { category: "자기 인식 영역", text: "자신의 감정 상태를 인식하려고 노력한다.", isReverse: true },
    { category: "자기 인식 영역", text: "재발 가능성에 대해 진지하게 고민해 본 적이 있다.", isReverse: true },
    { category: "자기 인식 영역", text: "필요한 도움을 받을 의지가 있다.", isReverse: true },
  ];

  const calculateScore = () => {
    return answers.reduce((acc, curr, idx) => {
      if (curr === -1) return acc;
      const q = questions[idx];
      return acc + (q.isReverse ? (3 - curr) : curr);
    }, 0);
  };

  const totalScore = calculateScore();
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "낮은 위험군", color: "text-emerald-600", bg: "bg-emerald-50", desc: "현재 재범 위험성이 매우 낮은 상태입니다. 자신의 행동을 객관적으로 인식하고 있으며, 생활 안정성도 양호합니다. 지금의 긍정적인 변화를 유지하세요." };
    if (score <= 30) return { title: "주의군", color: "text-amber-600", bg: "bg-amber-50", desc: "일부 위험 요인이 존재하며, 특정 상황에서 통제력이 흔들릴 수 있습니다. 인지 왜곡이 고착되지 않도록 주의가 필요하며, 정기적인 자기 점검을 권장합니다." };
    if (score <= 45) return { title: "위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "구조적인 위험 패턴이 형성되어 재범 가능성이 높은 상태입니다. 특히 인지 왜곡과 생활 불균형이 심화되어 있으므로, 즉각적인 전문가의 개입과 체계적인 치료가 필요합니다." };
    return { title: "고위험군", color: "text-red-600", bg: "bg-red-50", desc: "매우 높은 수준의 재범 위험성을 보이고 있습니다. 스스로의 통제가 불가능한 상태이며, 심각한 법적·사회적 문제를 재발시킬 위험이 큽니다. 즉시 전문적인 집중 치료 프로그램에 참여해야 합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Sticky Progress Bar */}
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-[#059669]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-emerald-50 border border-emerald-100 overflow-hidden text-slate-900">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Scale className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                재범 위험성 <br /> 간이 측정
              </h2>
              <p className="text-slate-500 max-w-lg leading-relaxed">
                전문 도구 기반의 간이 위험도 체크입니다. <br />
                최근 6개월간의 행동 패턴을 기준으로 솔직하게 답변해 주세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["충동 통제 영역", "인지 왜곡 영역", "생활 안정성 영역", "자기 인식 영역"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-[#059669] transition-colors">
                            <span className="text-[#059669] font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-[#059669] border-[#059669] text-white shadow-xl shadow-emerald-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#059669] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              disabled={!isComplete}
              onClick={() => {
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-[#059669] text-white shadow-2xl shadow-emerald-100 hover:bg-[#047857] hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-emerald-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Scale className="w-12 h-12 text-[#059669]" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-emerald-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-50 text-slate-900 relative overflow-hidden group border border-slate-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
              <h4 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-500" />
                위험 요인 분석
              </h4>
              <p className="text-slate-500 leading-relaxed text-lg">
                재범 위험성은 고정된 것이 아니라 생활 환경과 인지 상태에 따라 변화합니다. 특히 스트레스 관리 실패 and 인지 왜곡의 심화는 가장 큰 위험 신호입니다. 자신의 취약점을 명확히 알고 이를 보완하는 체계적인 관리가 필요합니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-emerald-50 border border-emerald-100">
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                재발 방지 솔루션
              </h4>
              <ul className="space-y-6">
                {[
                  "고위험 상황(High-Risk Situation) 식별 및 회피 전략 수립",
                  "인지 왜곡 교정을 위한 전문 심리치료 프로그램 참여",
                  "생활 안정성 확보를 위한 규칙적인 생활 습관 형성"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-emerald-500 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-[#059669] text-white text-center font-black text-lg rounded-[24px] hover:bg-[#047857] transition-all shadow-2xl shadow-emerald-100 active:scale-95"
            >
              상담 및 교육 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const COLUMN_POSTS = [
  { 
    id: "sentencing-material",
    title: "성범죄 가해자의 양형자료로서의 심리치료, 그 진정성의 가치", 
    category: "법률/심리",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746419/5c20fe13d89f0e3eed075d6b0ba90a74_stb2a7.png",
    content: [
      { type: 'text', value: '사건이 발생한 이후 많은 분들이 깊은 혼란과 두려움 속에서 시간을 보내게 됩니다. 수사와 재판 과정은 낯설고, 앞으로 삶이 어떻게 될지에 대한 불안도 커집니다. 이 과정에서 많은 분들이 "양형자료"라는 말을 듣게 됩니다.\n\n양형자료는 재판 과정에서 판사가 피고인의 삶, 태도, 변화 가능성을 이해하는 데 참고하는 자료입니다. 단순히 서류 몇 장으로 만들어지는 것이 아니라, 그 사람이 사건을 어떻게 바라보고 있는지, 어떤 반성과 변화의 과정을 겪고 있는지를 보여주는 중요한 자료입니다.\n\n그중에서도 심리치료와 상담 기록은 매우 중요한 의미를 가집니다.' },
      { type: 'text', value: '하지만 상담을 단순히 "재판에 도움이 되는 서류" 정도로 생각한다면, 그 가치는 절반도 발휘되지 않습니다. 심리치료의 진짜 의미는 처벌을 줄이기 위한 기술이 아니라, 자신을 이해하고 같은 일이 반복되지 않도록 삶의 방향을 바꾸는 과정에 있습니다.' },
      { type: 'text', value: '많은 성범죄 사건을 상담하다 보면, 대부분의 분들이 스스로를 이렇게 말합니다.\n\n"저도 왜 그런 행동을 했는지 잘 모르겠습니다."\n\n이 말은 단순한 변명이 아니라, 실제로 많은 사람들이 자신의 감정과 충동을 충분히 이해하지 못한 채 행동했다는 것을 보여줍니다. 외로움, 스트레스, 분노, 성에 대한 왜곡된 인식, 관계에서의 좌절감 등 다양한 심리적 요인이 복합적으로 작용하는 경우가 많습니다.' },
      { type: 'text', value: '심리치료는 이러한 마음의 구조를 하나씩 살펴보는 과정입니다. 왜 그런 선택을 하게 되었는지, 어떤 상황에서 충동이 올라오는지, 그리고 앞으로 같은 상황에서 어떻게 다른 선택을 할 수 있을지를 함께 탐색합니다.' },
      { type: 'header', value: '이 과정에서 중요한 것은 "진정성"입니다.' },
      { type: 'text', value: '판사나 조사기관은 단순한 형식적인 상담과, 실제로 변화하려는 사람의 태도를 생각보다 정확하게 구분합니다. 상담을 통해 자신의 행동을 돌아보고, 피해자에게 미쳤을 영향을 이해하려 노력하며, 재발을 막기 위한 구체적인 노력을 시작하는 사람은 분명히 다르게 보입니다.' },
      { type: 'text', value: '또 하나 중요한 점은, 심리치료는 재판을 위한 과정이기도 하지만 동시에 "앞으로의 삶을 위한 과정"이라는 것입니다.\n\n사건 이후 많은 분들이 말합니다.\n\n"이 일을 겪고 나서야 제 삶을 돌아보게 되었습니다."\n\n상담은 단순히 사건을 설명하는 시간이 아니라, 그동안 미뤄두었던 자신의 마음을 정리하고, 더 건강한 방식으로 살아갈 방법을 배우는 시간입니다.' },
      { type: 'text', value: '우리 상담센터에서는 사건의 법적 상황만을 바라보지 않습니다. 한 사람의 삶 전체를 함께 바라보며, 왜 이런 일이 일어났는지 이해하고 다시는 같은 일이 반복되지 않도록 돕는 것을 가장 중요한 목표로 삼고 있습니다.' },
      { type: 'text', value: '심리치료 기록과 상담 소견은 이러한 변화의 과정을 객관적으로 정리하여 양형자료로 활용될 수 있습니다. 그러나 그보다 더 중요한 것은, 상담 과정 자체가 한 사람의 삶을 다시 정리하는 출발점이 될 수 있다는 점입니다.' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 어렵고 혼란스럽습니다. 하지만 그 시간을 어떻게 보내느냐에 따라 앞으로의 삶은 분명히 달라질 수 있습니다.\n\n만약 지금 마음이 복잡하고, 어디서부터 정리해야 할지 모르겠다면 상담을 통해 자신의 이야기를 차분히 풀어보는 것도 하나의 방법이 될 수 있습니다.' },
      { type: 'header', value: '진정한 변화는 이해에서 시작됩니다.' },
      { type: 'text', value: '그리고 그 이해는 혼자서보다, 함께 이야기할 때 더 분명해집니다.' }
    ]
  },
  { 
    id: "what-judges-look-for",
    title: "성범죄 사건에서 판사가 실제로 보는 것 7가지", 
    subtitle: "재판은 단순히 사건의 사실만 보는 과정이 아닙니다.\n판사는 사건의 내용뿐 아니라 그 사람의 태도, 변화 가능성, 사건 이후의 행동까지 함께 살펴보게 됩니다.",
    category: "법률/심리",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746433/78477f2b9e3e7de356790d754d394f12_glh9dc.png",
    content: [
      { type: 'text', value: '성범죄 사건을 겪게 되면 많은 사람들이 가장 궁금해하는 질문이 있습니다.\n\n“판사는 무엇을 가장 중요하게 볼까요?”\n\n재판은 단순히 사건의 사실만 보는 과정이 아닙니다.\n판사는 사건의 내용뿐 아니라 그 사람의 태도, 변화 가능성, 사건 이후의 행동까지 함께 살펴보게 됩니다.\n\n실제 많은 사건을 보면 판사가 중요하게 보는 요소에는 몇 가지 공통적인 부분이 있습니다.' },
      { type: 'header', value: '1. 사건의 구체적인 내용' },
      { type: 'text', value: '가장 기본적으로는 사건 자체의 내용입니다.\n\n어떤 상황에서 사건이 발생했는지\n피해자와의 관계는 어떠했는지\n행동의 정도는 어떠했는지\n\n이러한 요소들은 판결에서 매우 중요한 기준이 됩니다.' },
      { type: 'header', value: '2. 사건 이후의 태도' },
      { type: 'text', value: '판사는 사건 이후 피고인이 어떤 태도를 보이는지도 중요하게 봅니다.\n\n예를 들어\n자신의 행동을 어떻게 바라보고 있는지\n사건에 대해 어떤 인식을 가지고 있는지\n책임을 회피하려 하는지, 아니면 돌아보려 하는지\n\n이러한 태도는 그 사람이 사건을 어떻게 이해하고 있는지를 보여주는 중요한 요소가 됩니다.' },
      { type: 'header', value: '3. 피해자에 대한 인식' },
      { type: 'text', value: '성범죄 사건에서는 특히 피해자의 관점에 대한 이해가 중요하게 고려됩니다.\n\n자신의 행동이 상대에게 어떤 영향을 주었는지\n피해자가 느꼈을 수 있는 감정\n피해 상황에 대한 인식\n\n이러한 부분을 이해하려는 태도가 보일 때\n그 반성은 더 설득력을 가지게 됩니다.' },
      { type: 'header', value: '4. 재발 가능성' },
      { type: 'text', value: '판사는 사건 자체뿐 아니라 앞으로 같은 일이 반복될 가능성도 중요하게 봅니다.\n\n그래서 다음과 같은 부분을 살펴보게 됩니다.\n\n충동적인 행동 패턴이 있는지\n사건 이후 어떤 노력을 하고 있는지\n행동을 바꾸기 위한 과정이 있는지\n\n이러한 요소들은 재범 위험성을 판단하는 데 중요한 기준이 됩니다.' },
      { type: 'header', value: '5. 사건 이후의 노력' },
      { type: 'text', value: '많은 사건에서 판사는 사건 이후 어떤 노력을 하고 있는지를 함께 봅니다.\n\n예를 들어\n자신의 행동을 돌아보는 과정\n심리상담이나 치료 참여\n재발 방지를 위한 노력\n\n이러한 과정은 단순한 말이 아니라 실제 변화하려는 행동으로 평가될 수 있습니다.' },
      { type: 'header', value: '6. 일관된 태도' },
      { type: 'text', value: '판사는 한 사람의 태도를 전체적으로 일관되게 살펴봅니다.\n\n진술 내용\n반성문\n상담 기록\n사건 이후의 행동\n\n이 모든 부분이 서로 일관되게 나타날 때\n그 사람의 태도는 더 신뢰를 얻을 수 있습니다.' },
      { type: 'header', value: '7. 앞으로의 변화 가능성' },
      { type: 'text', value: '마지막으로 판사는 그 사람이 앞으로 어떻게 살아갈 가능성이 있는지도 중요하게 봅니다.\n\n사람은 누구나 실수를 할 수 있습니다.\n하지만 중요한 것은 그 이후에 어떤 선택을 하느냐입니다.\n\n자신의 행동을 이해하려 노력하는지\n같은 일이 반복되지 않도록 준비하고 있는지\n삶의 방향을 다시 세우려 하는지\n\n이러한 과정은 변화 가능성을 보여주는 중요한 요소가 됩니다.' },
      { type: 'header', value: '재판은 과거만 보는 것이 아닙니다' },
      { type: 'text', value: '많은 사람들이 재판을 이미 지나간 사건만 평가하는 과정이라고 생각합니다.\n하지만 실제로는 사건 이후의 태도와 변화 과정도 함께 고려됩니다.\n\n그래서 사건 이후의 시간은 매우 중요합니다.\n그 시간을 단순히 두려움 속에서 보내기보다\n자신의 삶을 돌아보고 정리하는 과정으로 사용한다면\n앞으로의 삶에도 분명 의미 있는 시간이 될 수 있습니다.' },
      { type: 'header', value: '사건 이후의 시간' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 어렵습니다.\n불안과 후회 속에서 시간을 보내는 경우도 많습니다.\n하지만 그 시간이 삶을 다시 정리하는 시작이 될 수도 있습니다.\n\n우리 상담센터에서는 단순히 사건만을 바라보지 않습니다.\n한 사람의 삶 전체를 함께 바라보며\n사건을 이해하고\n재발을 막고\n앞으로 더 건강한 삶의 방향을 찾을 수 있도록 돕는 것을 목표로 합니다.\n\n혼자서 모든 것을 감당하려 하지 않아도 됩니다.\n때로는 누군가와 함께 이야기하는 것만으로도\n많은 것이 정리되기 시작합니다.' }
    ]
  },
  { 
    id: "importance-of-investigation-stage-counseling",
    title: "수사 단계에서 심리상담이 중요한 이유", 
    subtitle: "성범죄 사건이 발생하면 대부분의 사람들은 먼저 법적인 문제에 집중하게 됩니다. 하지만 수사 단계에서 상담을 시작하는 것이 훨씬 의미 있는 경우가 많습니다.",
    category: "수사 대응",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786093185/수사_단계에서_심리상담이_중요한_이유_mfglw2.png",
    content: [
      { type: 'text', value: '성범죄 사건이 발생하면 대부분의 사람들은 먼저 법적인 문제에 집중하게 됩니다. 변호사를 선임하고, 조사에 대비하고, 앞으로 재판이 어떻게 진행될지 걱정하게 됩니다. 그래서 많은 분들이 이렇게 생각합니다.\n\n"상담은 재판 전에 양형자료 준비할 때 받으면 되는 것 아닌가요?"\n\n하지만 실제 상담 현장에서 보면 수사 단계에서 상담을 시작하는 것이 훨씬 의미 있는 경우가 많습니다.\n\n왜냐하면 수사 단계는 단순히 사건이 진행되는 시간이 아니라, 자신의 삶과 행동을 정리해야 하는 가장 중요한 시기이기 때문입니다.' },
      { type: 'header', value: '1. 수사 단계는 가장 혼란스러운 시기입니다' },
      { type: 'text', value: '사건이 발생한 직후 사람들은 매우 복잡한 감정 상태에 놓이게 됩니다.\n\n• 앞으로 어떻게 될지 모른다는 불안\n• 주변 사람들에게 알려질까 하는 두려움\n• 후회와 억울함이 동시에 올라오는 감정\n• 경찰 조사나 수사 과정에 대한 긴장\n\n이러한 감정 속에서는 자신의 상황을 차분하고 객관적으로 바라보기 어렵습니다.\n\n그래서 이 시기에는 단순히 법적인 대응뿐 아니라 마음을 정리하는 과정이 함께 필요합니다.\n\n심리상담은 이러한 혼란 속에서 자신의 감정을 정리하고 사건을 조금 더 차분하게 바라볼 수 있도록 돕는 과정이 됩니다.' },
      { type: 'header', value: '2. 사건을 객관적으로 바라볼 수 있게 됩니다' },
      { type: 'text', value: '많은 내담자들이 상담실에서 이렇게 말합니다.\n\n"그때는 왜 그런 판단을 했는지 지금도 잘 이해가 안 됩니다."\n\n사건이 발생하는 순간에는\n\n• 감정이 격해져 있거나\n• 술이나 스트레스 상황에 있거나\n• 관계 속에서 판단이 흐려져 있는 경우가 많습니다.\n\n심리상담에서는 이러한 상황을 하나씩 돌아보면서\n\n• 사건 당시의 감정 상태\n• 판단이 흐려진 순간\n• 관계 속에서의 오해\n• 충동이 올라오는 패턴\n\n이러한 요소들을 함께 살펴보게 됩니다.\n\n이 과정은 단순히 사건을 설명하는 것이 아니라 자신의 행동을 이해하는 과정입니다.' },
      { type: 'header', value: '3. 재발을 막기 위한 준비가 시작됩니다' },
      { type: 'text', value: '성범죄 사건에서 가장 중요한 것은 단순한 사과보다 같은 일이 반복되지 않는 것입니다.\n\n그래서 상담에서는 다음과 같은 부분을 함께 다루게 됩니다.\n\n• 어떤 상황에서 충동이 올라오는지 이해하기\n• 성에 대한 왜곡된 생각이나 판단 점검하기\n• 감정과 스트레스를 건강하게 다루는 방법 배우기\n• 관계 속에서의 경계와 책임 이해하기\n\n이러한 과정은 단순한 대화가 아니라 행동을 바꾸기 위한 실제적인 준비 과정입니다.' },
      { type: 'header', value: '4. 변화의 과정이 기록으로 남습니다' },
      { type: 'text', value: '수사 단계에서 시작된 상담은 일정 기간 동안 자신의 행동을 돌아보고 변화하려는 과정을 기록으로 남길 수 있습니다.\n\n재판 과정에서는 피고인이 사건 이후 어떤 태도로 자신의 행동을 바라보고 있는지가 중요한 요소로 고려됩니다.\n\n단기간에 급하게 작성된 반성문보다\n\n• 일정 기간 동안 상담을 통해 자신의 행동을 성찰한 기록\n• 재발 방지를 위해 노력하는 과정\n• 자신의 생각과 태도의 변화\n\n이러한 과정이 드러날 때 그 기록은 훨씬 의미 있는 자료가 될 수 있습니다.\n\n하지만 상담의 목적은 단순히 재판을 위한 자료를 만드는 데 있지 않습니다.\n\n상담의 가장 중요한 목적은 사건 이후의 삶을 다시 정리하는 것입니다.' },
      { type: 'header', value: '5. 사건 이후의 시간을 어떻게 보내느냐가 중요합니다' },
      { type: 'text', value: '사건 이후 많은 사람들이 두려움과 불안 속에서 시간을 보내게 됩니다.\n\n어떤 분들은 혼자서 모든 것을 감당하려고 하면서 더 큰 스트레스를 경험하기도 합니다.\n\n하지만 이 시간을 어떻게 보내느냐에 따라 앞으로의 삶은 분명히 달라질 수 있습니다.\n\n심리상담은 단순히 사건을 이야기하는 자리가 아니라\n\n• 자신의 행동을 이해하고\n• 같은 일이 반복되지 않도록 준비하고\n• 앞으로의 삶의 방향을 다시 정리하는 과정이 될 수 있습니다.\n\n우리 상담센터에서는 사건의 법적 상황만을 바라보지 않습니다.\n\n한 사람의 삶 전체를 함께 바라보며\n\n• 사건이 왜 발생했는지 이해하고\n• 재발을 막고\n• 더 건강한 삶의 방향을 찾을 수 있도록 돕는 것을 목표로 합니다.\n\n사건 이후의 시간은 누구에게나 어렵게 느껴질 수 있습니다.\n\n하지만 그 시간이 삶을 다시 정리하는 시작이 될 수도 있습니다.\n\n혼자서 모든 것을 버티려고 하지 않아도 됩니다.\n\n때로는 전문가와 함께 이야기하는 것만으로도 생각보다 많은 것이 정리되기 시작합니다.' }
    ]
  },
  { 
    id: "recidivism-mechanism",
    title: "성범죄는 왜 반복되는가", 
    subtitle: "행동 뒤에 숨겨진 심리적 메커니즘\n“멈추고 싶지만 반복되는 이유”",
    category: "심리 분석",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346314/ChatGPT_Image_2026년_3월_6일_오후_05_45_25_y2cxol.png",
    content: [
      { type: 'text', value: '성범죄 사건을 상담하다 보면 많은 사람들이 비슷한 이야기를 합니다.\n\n“저도 왜 그런 행동을 했는지 잘 모르겠습니다.”\n“그 순간에는 그렇게까지 큰 문제가 될 거라고 생각하지 못했습니다.”\n“지금 생각해 보면 왜 그랬는지 이해가 안 됩니다.”\n\n이 말은 단순한 변명이 아니라, 실제로 많은 사람들이 자신의 행동을 정확히 이해하지 못한 채 행동했다는 사실을 보여줍니다.\n\n성범죄는 단순히 한 번의 선택으로만 설명되기 어려운 경우가 많습니다.\n그 뒤에는 여러 심리적 요인이 복합적으로 작용하는 구조가 존재합니다.' },
      { type: 'header', value: '1. 순간적인 충동과 판단의 흐려짐' },
      { type: 'text', value: '많은 사건이 순간적인 충동 속에서 발생합니다.\n\n예를 들어\n\n술에 취한 상태\n감정이 격해진 상황\n관계에서의 오해\n인터넷이나 자극적인 콘텐츠에 노출된 상태\n\n이러한 상황에서는 평소보다 판단력이 크게 떨어질 수 있습니다.\n\n문제는 그 순간에는 “이 정도는 괜찮겠지”라는 생각이 들지만,\n사건이 발생한 뒤에는 그 선택이 매우 큰 결과를 가져온다는 것입니다.' },
      { type: 'header', value: '2. 성에 대한 왜곡된 인식' },
      { type: 'text', value: '상담을 하다 보면 일부 사람들은 성에 대해 잘못된 인식을 가지고 있는 경우가 있습니다.\n\n예를 들어\n\n상대도 싫지 않았을 것이라고 생각했다\n이 정도 행동은 큰 문제가 아니라고 생각했다\n상대가 거절하지 않았다고 느꼈다\n\n하지만 이러한 생각은 실제 상황과 다르게 해석된 경우가 많습니다.\n\n특히 현대 사회에서는 동의와 경계에 대한 기준이 매우 중요하게 여겨지고 있기 때문에,\n과거의 잘못된 인식이 그대로 행동으로 이어질 경우 큰 문제가 될 수 있습니다.' },
      { type: 'header', value: '3. 외로움과 관계의 좌절' },
      { type: 'text', value: '생각보다 많은 사건에서 외로움이나 관계의 좌절이 배경으로 존재하기도 합니다.\n\n인간관계의 단절\n연애 관계의 실패\n성적 욕구의 왜곡된 해소 방식\n\n이러한 상황에서 사람들은 건강하지 않은 방식으로 욕구를 해소하려 하기도 합니다.\n\n하지만 이런 방식은 문제를 해결하기보다 더 큰 문제를 만들게 되는 경우가 많습니다.' },
      { type: 'header', value: '4. 반복되는 행동 패턴' },
      { type: 'text', value: '성범죄가 반복되는 가장 큰 이유 중 하나는 행동 패턴을 이해하지 못하기 때문입니다.\n\n예를 들어\n\n특정 상황에서 충동이 올라온다\n특정 감정 상태에서 판단이 흐려진다\n특정 자극에 반복적으로 노출된다\n\n이러한 패턴을 이해하지 못하면,\n같은 상황이 다시 왔을 때 비슷한 선택을 할 가능성이 생길 수 있습니다.\n\n그래서 성범죄 사건에서는 단순한 사과보다 재발 방지를 위한 이해와 변화 과정이 중요하게 여겨집니다.' },
      { type: 'header', value: '5. 변화는 이해에서 시작됩니다' },
      { type: 'text', value: '많은 사람들은 사건 이후 이렇게 말합니다.\n\n“이 일을 겪고 나서야 제 삶을 돌아보게 되었습니다.”\n\n심리상담은 단순히 사건을 설명하는 시간이 아니라,\n\n자신의 행동을 이해하고\n잘못된 인식을 바로잡고\n같은 일이 반복되지 않도록 삶의 방식을 바꾸는 과정입니다.\n\n이 과정에서 사람들은 자신의 감정, 충동, 관계 방식에 대해 처음으로 깊이 이해하게 되는 경우가 많습니다.' },
      { type: 'header', value: '사건 이후의 시간' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 쉽지 않습니다.\n\n두려움, 후회, 혼란 속에서 시간을 보내는 경우도 많습니다.\n하지만 그 시간을 어떻게 보내느냐에 따라 앞으로의 삶은 분명히 달라질 수 있습니다.\n\n우리 상담센터에서는 단순히 사건만을 바라보지 않습니다.\n한 사람의 삶 전체를 함께 바라보며\n\n왜 이런 일이 발생했는지 이해하고\n같은 일이 반복되지 않도록 돕고\n앞으로 더 건강한 방식으로 살아갈 수 있도록 지원하는 것을 목표로 합니다.\n\n진정한 변화는 처벌이 아니라 이해에서 시작됩니다.\n\n그리고 그 이해는 혼자보다, 전문가와 함께할 때 더 분명해질 수 있습니다.' }
    ]
  },
  { 
    id: "digital-distortion",
    title: "디지털 성범죄 가해자의 인지 왜곡과 교정 방향", 
    subtitle: "디지털 성범죄, “나는 그렇게까지 나쁜 사람은 아니다”라는 생각에서 시작됩니다",
    category: "디지털 성범죄",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1786094749/디지털_성범죄_삽화_df0zyb.png",
    content: [
      { type: 'text', value: '디지털 성범죄로 조사를 받거나, 이미 처벌을 경험하신 분들 중 상당수는 이렇게 말합니다.\n“그냥 호기심이었다.”\n“다들 보는 줄 알았다.”\n“실제 만난 것도 아닌데 그렇게 큰 문제인가요?”\n“저는 피해를 줄 생각은 없었습니다.”\n이 말들은 변명이 아니라, 그 당시 당신의 진짜 생각이었을 가능성이 큽니다.\n그리고 바로 그 지점이, 우리가 함께 들여다봐야 할 ‘인지 왜곡’의 출발점입니다.' },
      { type: 'header', value: '1. 디지털 성범죄 가해자의 ‘인지 왜곡’이란 무엇인가' },
      { type: 'text', value: '인지 왜곡은 쉽게 말해,\n내가 나를 지키기 위해 스스로를 설득하는 생각의 방식입니다.\n디지털 성범죄 영역에서는 이런 생각들이 자주 나타납니다.\n“상대도 어느 정도는 동의했을 것이다.”\n“온라인이니까 현실과는 다르다.”\n“이미 인터넷에 떠도는 건데 내가 본다고 달라질 게 있나.”\n“저 사람도 노출을 했으니 책임이 있다.”\n“나는 촬영만 했지 유포는 안 했다.”\n이 생각들은 순간적으로는 마음을 편하게 해줍니다.\n하지만 그 편안함이 반복되면, 행동은 점점 더 쉽게 넘어가게 됩니다.\n죄책감이 줄어들수록, 충동은 빨라집니다.' },
      { type: 'header', value: '2. 왜 이런 왜곡이 생길까요?' },
      { type: 'text', value: '많은 분들이 “내가 원래 그런 사람이냐”고 묻습니다.\n그렇지 않습니다.\n디지털 환경은 다음과 같은 특징을 가지고 있습니다.\n상대의 표정이 보이지 않는다.\n고통이 즉각적으로 느껴지지 않는다.\n클릭 한 번이면 접근이 가능하다.\n자극이 강할수록 뇌는 더 빨리 반응한다.\n이 환경 속에서 사람은 점점 감각이 무뎌집니다.\n특히 반복적으로 자극적인 영상, 이미지, 채팅을 접하면\n뇌는 점점 더 강한 자극을 찾게 됩니다.\n그러다 보면 어느 순간\n“이 정도는 괜찮겠지”라는 생각이 자연스럽게 올라옵니다.\n그게 바로 왜곡의 자동화입니다.' },
      { type: 'header', value: '3. 디지털 성범죄의 핵심 문제는 ‘충동’이 아니라 ‘해석’입니다' },
      { type: 'text', value: '많은 분들이 “충동이 문제다”라고 생각합니다.\n하지만 실제 상담을 해보면, 더 근본적인 문제는 사건을 바라보는 해석 구조입니다.\n예를 들어,\n외로움 → 자극적인 콘텐츠 탐색 → 일시적 해소 → 죄책감 → 다시 외로움\n스트레스 → 음주 → 판단력 저하 → 온라인 접촉 → 후회\n이 과정에서 중요한 것은\n“나는 통제할 수 없었다”는 생각입니다.\n하지만 실제로는 통제 불능이 아니라\n왜곡된 해석이 행동을 정당화한 것에 가깝습니다.' },
      { type: 'header', value: '4. 교정은 ‘혼내는 것’이 아니라 ‘다시 보는 것’입니다' },
      { type: 'text', value: '저희 상담센터에서는 가해자를 비난하지 않습니다.\n그 대신 묻습니다.\n그때 당신은 무엇을 느끼고 있었나요?\n그 행동 전, 어떤 생각이 스쳤나요?\n그 생각은 정말 사실이었나요?\n피해자는 어떤 감정을 겪었을까요?\n처벌은 이미 받았거나 받게 될 것입니다.\n상담은 처벌을 대신하는 것이 아닙니다.\n상담은 재발을 막기 위한 구조를 만드는 과정입니다.\n인지 왜곡을 교정한다는 것은\n“나는 나쁜 사람이다”라고 몰아붙이는 게 아니라,\n“내 생각이 어디서부터 잘못 해석되었는지”를 차분히 살펴보는 일입니다.' },
      { type: 'header', value: '5. 많은 가해자들이 공통적으로 말하는 것' },
      { type: 'text', value: '상담을 진행하다 보면 이런 말을 자주 듣습니다.\n“그때는 그렇게 심각한 줄 몰랐습니다.”\n“지금 생각하면 왜 그랬는지 모르겠습니다.”\n“다시는 그러고 싶지 않습니다.”\n이 말이 진심이라면,\n그 다음 단계는 구조를 바꾸는 것입니다.\n트리거(유발 상황) 파악\n왜곡된 생각 문장 교정\n피해자 공감 훈련\n온라인 사용 습관 재설계\n충동 차단 전략 수립\n이 과정 없이 “다짐”만으로는 오래가기 어렵습니다.' },
      { type: 'header', value: '6. 당신이 상담을 받아야 하는 이유' },
      { type: 'text', value: '상담은 유리한 자료를 만들기 위한 형식 절차가 아닙니다.\n물론 양형자료에 도움이 될 수는 있습니다.\n하지만 더 중요한 것은,\n“나는 다시는 같은 실수를 반복하지 않겠다”는 것을\n구체적인 계획으로 증명하는 과정이라는 점입니다.\n재범을 막지 못하면\n인생은 같은 자리에서 다시 무너집니다.\n하지만 구조를 바꾸면,\n사건은 인생의 끝이 아니라 전환점이 될 수 있습니다.' },
      { type: 'header', value: '마지막으로, 당신에게 묻고 싶습니다' },
      { type: 'text', value: '지금 이 글을 읽고 있다면\n마음 한쪽에 이런 생각이 있을 수 있습니다.\n“나는 정말 바뀔 수 있을까?”\n네, 바뀔 수 있습니다.\n하지만 혼자서 왜곡을 교정하기는 어렵습니다.\n왜냐하면 왜곡은\n이미 당신의 생각처럼 느껴지기 때문입니다.\n전문적인 심리 상담은\n당신을 판단하기 위해 존재하는 것이 아니라,\n당신이 스스로를 다시 이해하도록 돕기 위해 존재합니다.\n잘못은 분명히 책임져야 합니다.\n그러나 그 책임이\n당신의 삶 전체를 파괴하도록 둘 필요는 없습니다.\n지금이 바로,\n생각의 구조를 바꾸는 출발점이 될 수 있습니다.\n저희는 비난보다 구조를 봅니다.\n감정보다 원인을 봅니다.\n그리고 재발 방지라는 현실적인 목표를 봅니다.\n당신이 진심으로 멈추고 싶다면,\n그 출발은 혼자가 아니라 함께 가야 합니다.' }
    ]
  },
  { 
    id: "family-support",
    title: "가족의 지지가 재범 방지에 미치는 영향", 
    category: "가족 상담",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746413/e1c1a882b51b29c3b836a615b1f12eea_b4r2dn.png",
    content: [
      { type: 'text', value: '성범죄 사건 이후 많은 분들이 깊은 혼란과 두려움 속에 시간을 보내게 됩니다. 사건 자체도 충격이지만, 그 이후의 삶이 어떻게 될지에 대한 불안이 더 크게 다가오기도 합니다. 이 과정에서 가장 중요한 요소 중 하나가 바로 가족의 지지입니다.' },
      { type: 'header', value: '사건 이후의 심리 상태' },
      { type: 'text', value: '사건 이후 많은 사람들은 죄책감, 수치심, 두려움, 억울함, 분노 등 복잡한 감정을 동시에 경험합니다. 이러한 감정은 스스로를 고립시키거나 삶을 포기하고 싶게 만들기도 합니다. 하지만 이런 상태에서 혼자 버티는 것은 매우 어렵습니다.\n\n이때 가족의 태도는 매우 큰 영향을 미칩니다. 비난과 단절은 사람을 더 깊은 절망으로 밀어 넣을 수 있지만, 차분한 지지와 책임을 함께 바라보는 태도는 변화의 가능성을 만들어 줍니다.' },
      { type: 'header', value: '왜 가족의 지지가 중요한가' },
      { type: 'text', value: '많은 심리 연구에서도 재범 방지에 가장 큰 영향을 미치는 요소 중 하나로 지지적 관계가 언급됩니다. 사람은 완전히 혼자가 되었을 때 오히려 자신의 행동을 직면하기보다 회피하려는 경향이 강해집니다.\n\n반대로 가족이 "문제는 분명히 있지만, 함께 해결해보자"는 태도를 보일 때 사람은 자신의 행동을 돌아보고 변화하려는 힘을 얻기 시작합니다.\n\n이는 단순한 위로가 아니라, 책임과 변화의 방향을 함께 바라보는 건강한 지지입니다.' },
      { type: 'header', value: '변화는 혼자서 이루어지지 않는다' },
      { type: 'text', value: '재범을 막는 가장 중요한 과정은 자신의 행동을 이해하고 통제하는 능력을 회복하는 것입니다. 충동이 왜 발생했는지, 어떤 상황에서 위험이 커지는지, 앞으로 어떻게 다른 선택을 할 수 있는지를 배우는 과정이 필요합니다.\n\n이 과정에서 가족의 역할은 단순한 보호가 아니라 변화를 함께 지켜보는 사람이 되는 것입니다.\n\n가족이 관심을 가지고 변화 과정을 함께 이해할 때, 당사자 역시 자신의 삶을 다시 정리할 용기를 얻을 수 있습니다.' },
      { type: 'header', value: '심리상담이 필요한 이유' },
      { type: 'text', value: '많은 분들이 사건 이후 "시간이 지나면 괜찮아지겠지"라고 생각합니다. 그러나 충동의 구조나 왜곡된 생각은 스스로 정리하기가 쉽지 않습니다.\n\n전문적인 심리상담은 다음과 같은 부분을 다룹니다.\n\n• 사건을 일으킨 심리적 배경 이해\n• 왜곡된 인식과 판단 교정\n• 충동 관리와 감정 조절 훈련\n• 재범 위험 상황에 대한 대비\n\n또한 상담 과정은 가족에게도 큰 도움이 됩니다. 가족이 어떻게 지지하고, 어떤 태도를 취해야 하는지에 대한 방향을 함께 이해할 수 있기 때문입니다.' },
      { type: 'header', value: '다시 삶을 정리하는 과정' },
      { type: 'text', value: '사건 이후의 삶은 누구에게나 쉽지 않습니다. 그러나 중요한 것은 지금 이후의 선택입니다.\n\n자신의 행동을 돌아보고, 필요한 도움을 받고, 삶을 다시 정리하려는 노력은 분명히 의미 있는 변화의 시작이 될 수 있습니다.\n\n심리상담은 단순히 문제를 해결하기 위한 절차가 아니라, 자신의 삶을 다시 책임 있게 살아가기 위한 과정입니다.\n\n혼자서 버티기 어렵다면 전문가의 도움을 받는 것도 하나의 용기 있는 선택이 될 수 있습니다.\n\n변화는 비난 속에서 시작되지 않습니다.\n\n이해와 책임, 그리고 지지 속에서 시작됩니다.' }
    ]
  },
  { 
    id: "impulse-correlation",
    title: "충동 조절 장애와 성범죄의 상관관계", 
    category: "정신건강",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746410/c8e33c77f1c750bb6cd1ce25a6b907f1_almtmf.png",
    content: [
      { type: 'text', value: '많은 성범죄 사건을 상담 현장에서 만나면서 공통적으로 발견되는 특징 중 하나는 ‘충동을 조절하는 어려움’입니다. 물론 모든 사건이 동일한 원인에서 발생하는 것은 아닙니다. 하지만 순간적인 욕구나 자극을 통제하지 못하는 문제는 여러 사건에서 중요한 심리적 배경으로 나타납니다.' },
      { type: 'text', value: '충동은 인간이라면 누구나 경험합니다. 어떤 이미지를 보거나, 특정한 상황에 놓이거나, 감정이 강하게 올라올 때 순간적인 욕구가 생길 수 있습니다. 문제는 충동 자체가 아니라 그 충동을 어떻게 다루느냐입니다.' },
      { type: 'text', value: '어떤 사람은 충동이 올라와도 잠시 멈추고 생각합니다. ‘이 행동이 어떤 결과를 가져올까?’ ‘지금 이 행동이 옳은 선택일까?’ 이런 과정이 작동하면 행동은 멈추거나 다른 방향으로 바뀌게 됩니다.' },
      { type: 'text', value: '하지만 충동 조절이 약해져 있는 상태에서는 이러한 과정이 충분히 작동하지 않습니다. 순간적인 자극에 반응해 행동이 먼저 나가고, 그 이후에 후회가 따라오는 경우가 많습니다.' },
      { type: 'text', value: '특히 디지털 환경에서는 이러한 문제가 더 쉽게 발생합니다. 스마트폰, 인터넷, 익명성, 빠른 자극은 사람의 충동을 더 강하게 자극합니다. 평소에는 하지 않았을 행동도 특정 상황에서는 판단이 흐려질 수 있습니다.' },
      { type: 'text', value: '상담을 하다 보면 많은 분들이 비슷한 말을 합니다.\n\n“그때 왜 그랬는지 모르겠습니다.”\n“순간적으로 판단을 못 했습니다.”\n“지금 생각하면 정말 어리석은 행동이었습니다.”\n\n이 말들은 단순한 변명이 아니라 실제 심리 상태를 보여주는 경우가 많습니다. 충동이 강하게 올라오는 순간에는 뇌의 판단 기능이 일시적으로 약해질 수 있기 때문입니다.' },
      { type: 'header', value: '충동 조절 능력은 훈련을 통해 개선될 수 있습니다' },
      { type: 'text', value: '심리상담에서는 단순히 “다시는 그러지 않겠습니다”라는 다짐을 만드는 것이 목표가 아닙니다. 왜 그런 상황이 발생했는지, 어떤 감정과 환경이 충동을 키웠는지, 그리고 앞으로 그 순간을 어떻게 다르게 지나갈 수 있는지를 함께 탐색합니다.\n\n예를 들어 다음과 같은 부분을 함께 다루게 됩니다.\n\n• 어떤 상황에서 충동이 강하게 올라오는지\n• 어떤 감정 상태에서 판단이 흐려지는지\n• 자극을 피하거나 차단하는 방법\n• 충동이 올라오는 순간 멈추는 훈련\n• 건강한 방식으로 욕구를 관리하는 방법' },
      { type: 'text', value: '이 과정은 단순한 반성이 아니라 ‘재발을 막기 위한 실제적인 훈련’이라고 볼 수 있습니다.' },
      { type: 'text', value: '많은 분들이 상담을 시작하기 전에는 이렇게 말합니다.\n\n“이미 벌어진 일인데 상담이 무슨 의미가 있을까요?”\n\n하지만 상담은 과거를 바꾸기 위한 것이 아니라 앞으로의 삶을 바꾸기 위한 과정입니다.' },
      { type: 'text', value: '사건 이후의 태도와 변화 노력은 스스로에게도, 주변 사람들에게도, 그리고 사회적으로도 매우 중요한 의미를 가집니다. 특히 자신의 문제를 직면하고 도움을 받으려는 태도는 진정한 변화의 시작이 될 수 있습니다.' },
      { type: 'text', value: '혼자서 모든 것을 해결하려고 하기보다는 전문가의 도움을 통해 자신의 패턴을 이해하고, 충동을 다루는 방법을 배우는 것이 훨씬 현실적인 해결 방법이 될 수 있습니다.' },
      { type: 'text', value: '심리상담은 누군가를 판단하거나 비난하기 위한 공간이 아닙니다. 오히려 자신의 문제를 솔직하게 바라보고, 더 나은 방향으로 삶을 바꾸기 위한 안전한 공간입니다.' },
      { type: 'text', value: '만약 현재 사건으로 인해 혼란과 불안 속에 있다면, 그리고 스스로의 행동을 돌아보며 변화가 필요하다고 느낀다면 전문가와의 상담이 중요한 전환점이 될 수 있습니다.' },
      { type: 'header', value: '변화는 이해에서 시작됩니다' },
      { type: 'text', value: '변화는 멀리 있는 것이 아니라, 문제를 이해하려는 작은 시작에서부터 만들어집니다.' }
    ]
  },
  { 
    id: "post-trauma-anxiety",
    title: "성범죄 사건 이후 불안과 공포가 계속되는 이유", 
    category: "심리 상담",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746426/9b2da1459e997e0abd235c1aa8eb29c2_w8zj4i.png",
    content: [
      { type: 'text', value: '성범죄 사건에 연루된 이후 많은 사람들이 비슷한 이야기를 합니다.\n\n"잠을 제대로 못 잡니다."\n"계속 사건 생각이 납니다."\n"앞으로 어떻게 될지 모르겠어서 너무 불안합니다."\n\n사건 이후 느끼는 불안과 공포는 단순한 걱정 수준을 넘어서는 경우가 많습니다. 수사, 재판, 사회적 시선, 가족 문제 등 여러 요소가 동시에 작용하면서 심리적으로 매우 큰 압박을 경험하게 됩니다.\n\n상담 현장에서 보면 많은 분들이 사건 이후 특정한 심리 패턴을 경험합니다.' },
      { type: 'header', value: '1. 계속 반복되는 생각' },
      { type: 'text', value: '사건 이후 가장 흔하게 나타나는 현상은 생각의 반복입니다.\n\n• "그때 왜 그렇게 행동했을까"\n• "앞으로 어떻게 되는 걸까"\n• "사람들이 알게 되면 어떻게 하지"\n\n이러한 생각이 계속 반복되면서 머릿속에서 사건이 끊임없이 재생되는 것처럼 느껴지기도 합니다.\n\n이런 상태가 지속되면 집중력이 떨어지고 일상생활에도 영향을 주게 됩니다.' },
      { type: 'header', value: '2. 미래에 대한 극단적인 불안' },
      { type: 'text', value: '사건 이후 많은 사람들이 미래에 대해 매우 비관적인 생각을 하게 됩니다.\n\n• "내 인생은 끝난 것 같다"\n• "앞으로 아무것도 할 수 없을 것 같다"\n• "모든 것이 무너질 것 같다"\n\n하지만 이러한 생각은 실제 상황보다 훨씬 더 극단적으로 확대되는 경우가 많습니다.\n\n불안이 커질수록 사람은 상황을 더 부정적으로 해석하는 경향이 있기 때문입니다.' },
      { type: 'header', value: '3. 수치심과 자기비난' },
      { type: 'text', value: '사건 이후 많은 사람들이 강한 수치심을 느끼기도 합니다.\n\n• "나는 정말 문제가 있는 사람인가"\n• "내가 왜 이런 일을 했을까"\n• "사람들이 나를 어떻게 볼까"\n\n이러한 생각이 계속 반복되면 자기비난이 커지고 자존감이 크게 떨어질 수 있습니다.' },
      { type: 'header', value: '4. 주변 시선에 대한 두려움' },
      { type: 'text', value: '많은 분들이 사건 자체보다 주변 사람들의 시선을 더 두려워하기도 합니다.\n\n• 가족\n• 직장\n• 친구\n• 사회적 관계\n\n이러한 관계 속에서 어떤 일이 벌어질지 모른다는 불안이 커지면서 사람들은 점점 더 위축되기도 합니다.' },
      { type: 'header', value: '5. 감정을 혼자서 견디려는 태도' },
      { type: 'text', value: '사건 이후 많은 사람들이 자신의 감정을 혼자서 견디려고 합니다.\n\n• 누구에게도 말하지 못하고\n• 도움을 요청하지 못하고\n• 혼자서 모든 것을 해결하려고 합니다.\n\n하지만 이러한 방식은 오히려 불안을 더 크게 만드는 경우가 많습니다.' },
      { type: 'header', value: '사건 이후의 불안은 자연스러운 반응입니다' },
      { type: 'text', value: '사건 이후 느끼는 불안과 공포는 이상한 반응이 아닙니다. 갑작스러운 상황과 큰 스트레스 속에서 나타나는 자연스러운 심리 반응일 수 있습니다.\n\n하지만 이러한 상태가 오래 지속되면 일상생활과 판단에도 영향을 줄 수 있습니다.\n\n그래서 이 시기에는 자신의 감정을 정리하고 상황을 객관적으로 바라보는 과정이 필요합니다.' },
      { type: 'header', value: '상담이 도움이 되는 이유' },
      { type: 'text', value: '심리상담은 단순히 사건을 이야기하는 시간이 아닙니다.\n\n상담을 통해 많은 사람들이 다음과 같은 과정을 경험합니다.\n\n• 반복되는 생각을 정리하는 과정\n• 사건을 조금 더 객관적으로 이해하는 과정\n• 불안을 조절하는 방법을 배우는 과정\n• 앞으로의 삶을 다시 정리하는 과정\n\n이러한 과정 속에서 처음에는 매우 불안한 상태로 상담을 시작했던 사람들도 시간이 지나면서 점차 마음의 균형을 찾는 경우가 많습니다.' },
      { type: 'header', value: '혼자서 버티지 않아도 됩니다' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 어렵습니다. 그러나 그 시간을 혼자서만 버틸 필요는 없습니다.\n\n우리 상담센터에서는 사건의 법적 문제만을 바라보지 않습니다. 한 사람의 삶 전체를 함께 바라보며 사건 이후의 불안과 혼란을 정리하고 앞으로의 삶을 다시 세울 수 있도록 돕는 것을 목표로 합니다.\n\n지금의 시간이 매우 힘들게 느껴질 수 있습니다. 하지만 그 시간이 삶을 다시 정리하는 출발점이 될 수도 있습니다.\n\n때로는 누군가와 함께 이야기를 나누는 것만으로도 마음이 조금씩 정리되기 시작합니다.' }
    ]
  }
];

const MEDIA_DATA = [
  {
    title: "지네 던지고 라이터로 지지고… 후임병 괴롭힌 20대 집행유예",
    source: "조선일보",
    date: "2026-04-05",
    category: "사건대응",
    summary: "군 복무 중 가혹행위와 함께 성추행이 결합된 사건에서 법원이 집행유예를 선고한 사례를 보도했다. 군 조직 내 성범죄는 위계·위력 관계와 결합해 신고·입증이 어렵고 2차 피해가 발생하기 쉬워, 군사사법·지휘체계의 예방·사후 조치 역량이 사회적 검증 대상이 된다.",
    point: "군 조직 내 성범죄의 특수성과 위계 관계에 따른 2차 피해 방지 및 군사사법 체계의 대응 역량이 중요함을 시사합니다.",
    url: "https://www.chosun.com/national/regional/2026/04/05/6C3LMNAQGRCCLP3EPAKQR6UJSI/"
  },
  {
    title: "오픈채팅서 만난 미성년자 성폭행·성착취물 제작 30대 징역7년",
    source: "연합뉴스",
    date: "2026-04-04",
    category: "아청법 사건",
    summary: "오픈채팅을 통해 미성년자를 만나 성폭행하고 성착취물을 제작·저장한 사건에서 중형(징역 7년)과 취업제한·보호관찰이 선고됐다고 보도됐다. 재판부는 다수 피해자·디지털 성범죄의 복제·유포 가능성 등을 엄벌 필요성의 근거로 제시했고, 이는 플랫폼 기반 접촉범죄와 디지털 기록(촬영·저장)의 결합이 양형을 가중시키는 흐름을 반영한다.",
    point: "플랫폼 기반 접촉범죄와 디지털 기록의 결합이 양형 가중 요소로 작용하며, 복제·유포 가능성에 대한 엄중한 처벌 경향을 보여줍니다.",
    url: "https://www.yna.co.kr/amp/view/AKR20260403079900065"
  },
  {
    title: "해외 사이트로 외국인도 유치…대형 성매매업소 무더기 단속",
    source: "연합뉴스TV",
    date: "2026-04-02",
    category: "사건대응",
    summary: "서울경찰청이 2026년 1분기 대형 성매매업소·학교 주변 유해업소 등을 단속해 다수 검거했다는 발표를 보도했다. 특히 해외 사이트를 개설해 외국인까지 유치한 업소 사례가 언급돼, 온라인 기반 알선·국경 간 유입이 결합한 성매매 범죄의 수사·단속 방식(압수수색, 지자체 폐쇄절차 연계)의 중요성이 부각된다.",
    point: "온라인 기반 알선과 국경 간 유입이 결합된 성매매 범죄에 대한 수사 및 단속 방식의 고도화 필요성을 시사합니다.",
    url: "https://www.yonhapnewstv.co.kr/news/AKR20260402140401YcQ"
  },
  {
    title: "SNS로 만난 지적장애 여성 성폭행 20대 징역 3년",
    source: "연합뉴스",
    date: "2026-04-02",
    category: "입법, 법률 개정 및 판결",
    summary: "지적장애 여성을 성폭행한 사건에서 실형과 함께 성폭력 치료프로그램 이수, 취업제한 명령이 병과된 판결을 전했다. 피해자의 장애 특성과 권력관계(취약성)가 범행의 중대성을 강화하는 요소로 평가될 가능성이 크며, 보호·재범방지명령의 실효적 관리가 관건이 된다.",
    point: "피해자의 취약성을 악용한 범죄에 대한 엄중한 처벌과 함께, 실효적인 재범 방지 및 보호 명령 관리의 중요성을 보여줍니다.",
    url: "https://www.yna.co.kr/view/AKR20260402095300064"
  },
  {
    title: "(공식) 디지털 성범죄 AI 24시간 자동 탐지·분석·신고(삭제요청 자동화·딥페이크 탐지 등)",
    source: "성평등가족부",
    date: "2026-04-01",
    category: "디지털 성범죄",
    summary: "공식 발표는 디지털 성범죄물 탐지·신고·삭제요청의 자동화를 통해 대응 속도와 정확도를 높이고, 아동·청소년 온라인 성착취에 대한 선제 개입을 강화하겠다는 방향을 제시한다. 기술 기반 대응이 확대될수록 탐지 정확도(오탐·미탐), 삭제요청의 적법성, 피해자 지원(상담·법률지원)과의 연계가 정책 성패를 좌우하게 된다.",
    point: "기술 기반의 선제적 대응 체계 강화와 함께 탐지 정확도 및 피해자 지원 연계의 중요성을 강조하는 정책 방향을 제시합니다.",
    url: "https://www.mogef.go.kr/nw/enw/nw_enw_s001d.do?bbtSn=713381&mid=mda700"
  },
  {
    title: "디지털성범죄물 AI로 24시간 탐지·신고…\"건당 처리시간 단축\"",
    source: "연합뉴스",
    date: "2026-04-01",
    category: "디지털 성범죄",
    summary: "성평등가족부가 AI 기반으로 디지털 성범죄 피해영상의 탐지→삭제요청까지 자동화하는 시스템을 도입했다고 보도했다(삭제요청·처리·이력 관리의 자동화, 처리시간 단축 등). 아동·청소년 성착취물·유인정보를 24시간 자동 수집해 신고·삭제요청까지 수행하는 “선제 대응 시스템”도 함께 추진돼, 사후 구제 중심에서 상시 모니터링·선제 차단으로 정책 축이 이동하고 있다.",
    point: "AI 기술을 활용한 자동화 시스템 도입으로 디지털 성범죄 대응이 사후 구제에서 선제적 차단 중심으로 변화하고 있음을 보여줍니다.",
    url: "https://www.yna.co.kr/view/AKR20260331165800530"
  },
  {
    title: "약에 취해 살인·방화·난폭운전… 마약, 다른 사람 목숨까지 위협",
    source: "조선일보",
    date: "2026-03-31",
    category: "사건대응",
    summary: "마약 범죄가 폭력·사고뿐 아니라 ‘물뽕’ 등 약물을 이용한 성범죄(이른바 데이트 강간) 수단으로도 활용되는 실태를 조명했다. 성범죄와 약물 범죄가 결합할 경우 피해자의 기억 결손·증거 확보 난점이 커져 수사·입증 전략과 예방정책(의약품 관리, 유통·처방 통제)까지 연쇄적으로 영향을 받는다.",
    point: "약물 이용 성범죄의 수사 및 입증 어려움을 지적하며, 관련 예방 정책과 수사 전략의 유기적 연계 필요성을 시사합니다.",
    url: "https://www.chosun.com/national/court_law/2026/03/31/NA2DESY6MZH5LJH4KP25MTN76Q/"
  },
  {
    title: "성폭력방지 및 피해자보호 등에 관한 법률 일부개정법률안(대안) (의안번호 2217875)",
    source: "국민참여입법센터(국회 의안)",
    date: "2026-03-30",
    category: "입법, 법률 개정 및 판결",
    summary: "성폭력피해자통합지원센터의 통칭인 ‘해바라기센터’ 명칭을 법률상 근거로 명확히 하고, 유사명칭 사용 금지 근거를 마련하는 내용이 포함된다. 더불어 센터 지정취소·업무정지 등 제재수단의 상한을 정비(업무정지 상한 6개월)해 행정제재의 비례성을 명문화하려는 취지로 읽힌다.",
    point: "해바라기센터의 법적 근거 명확화와 행정제재의 비례성 확보를 통해 피해자 지원 체계의 안정성과 신뢰성을 높이려는 입법 취지를 담고 있습니다.",
    url: "https://opinion.lawmaking.go.kr/gcom/nsmLmSts/out/2217875/detailRP"
  },
  {
    title: "(법령개정) 성폭력피해상담소 상담원 교육훈련시설 지정 권한의 지방 이양(제23조)",
    source: "법제처 국가법령정보센터(제정·개정이유)",
    date: "2026-03-26",
    category: "입법, 법률 개정 및 판결",
    summary: "대통령령 개정 취지로, 종전에는 시·도가 교육훈련시설을 지정할 때에도 중앙부처 장관이 인정한 기관·단체 범위에 사실상 종속됐으나, 개정 후에는 시·도가 자체적으로 “인적·물적 자원을 갖춘 기관·단체”를 인정해 지정할 수 있도록 자율성이 확대됐다. 상담원 양성 인프라의 지역 맞춤형 확충을 도모하는 동시에, 지정 기준의 일관성·품질관리(편차) 문제가 후속 과제로 남는다.",
    point: "교육훈련시설 지정 권한의 지방 이양으로 지역 맞춤형 인프라 확충이 기대되나, 서비스 품질의 일관성 유지가 향후 과제임을 시사합니다.",
    url: "https://www.law.go.kr/LSW/lsRvsRsnListP.do%3Bjsessionid%3D7laRKi0DKIRB0JdH1JRCrw7i.LSW15?chrClsCd=010102&lsId=011319&lsRvsGubun=all"
  },
  {
    title: "헌법재판소 결정 요지: 성폭력처벌법 제30조 제6항(영상녹화 진술 증거사용) 합헌(2023헌가20)",
    source: "헌법재판소",
    date: "2026-03-26",
    category: "입법, 법률 개정 및 판결",
    summary: "헌법재판소는 장애인복지법상 장애인 성폭력 피해자의 진술녹화 영상물을 증거로 사용할 수 있게 한 성폭력처벌법 규정에 대해 합헌 결정을 내렸다. 다수의견은 진술 신빙성 담보 장치(절차·요건)와 피해자 보호 필요성을 근거로 위헌성을 부정했으며, 반대의견은 반대신문권 제한이 방어권을 과도하게 제약할 수 있다는 점을 문제 삼았다.",
    point: "장애인 성폭력 피해자 보호를 위한 영상 진술의 증거 능력 인정과 피고인의 방어권 보장 사이의 헌법적 판단 기준을 제시한 사례입니다.",
    url: "https://www.ccourt.go.kr/site/kor/ex/bbs/View.do?bcIdx=4265114&cbIdx=1098"
  },
  {
    title: "헌재, ‘장애인 성폭력 피해자 진술녹화물’ 증거 인정 “합헌\"",
    source: "조선일보",
    date: "2026-03-26",
    category: "입법, 법률 개정 및 판결",
    summary: "장애인 성폭력 피해자의 조사 진술을 영상으로 녹화한 자료를, 피해자가 법정에 출석하지 않더라도 일정 요건하에 증거로 사용할 수 있도록 한 규정이 합헌이라는 결정을 전했다. 피해자 보호(2차 피해 방지)와 피고인의 반대신문권·방어권 사이의 긴장이 핵심이며, 수사 초기 영상진술의 적법한 확보·절차 준수의 중요성이 커진다.",
    point: "피해자 보호와 피고인의 방어권 사이의 균형을 고려한 헌재의 합헌 결정으로, 수사 초기 영상 진술 확보의 적법성 준수가 더욱 강조됩니다.",
    url: "https://www.chosun.com/national/court_law/2026/03/26/T4U4NMAUSJEHTDJFXGES3L4B5E/"
  },
  {
    title: "메타에 과징금 176억원… 아동·청소년 폭력·성범죄로부터 보호 의무 위반 제재",
    source: "동아일보",
    date: "2026-03-25",
    category: "아청법 사건",
    summary: "규제당국이 아동·청소년을 폭력·성범죄로부터 보호할 의무 위반을 문제 삼아 메타에 대규모 과징금을 부과했다는 보도다. 온라인 플랫폼의 신고·삭제 중심 “사후조치”만으로는 보호의무를 충족하기 어렵다는 논리와 연결되며, 플랫폼 사업자의 안전설계(duty of care) 범위를 둘러싼 규제 경쟁이 강화되는 신호로 해석된다.",
    point: "온라인 플랫폼의 신고·삭제 중심 “사후조치”만으로는 보호의무를 충족하기 어렵다는 논리와 연결되며, 플랫폼 사업자의 안전설계(duty of care) 범위를 둘러싼 규제 경쟁이 강화되는 신호로 해석된다.",
    url: "https://edu.donga.com/news/articleView.html?idxno=104847&utm_source=chatgpt.com"
  },
  {
    title: "아동·청소년의 성보호에 관한 법률 일부개정법률안 (의안번호 2217704)",
    source: "국민참여입법센터(국회 의안)",
    date: "2026-03-24",
    category: "입법, 법률 개정 및 판결",
    summary: "디지털 플랫폼 기반 성범죄에 대응하기 위해 “중앙 통합체계”를 마련하고, 정보통신서비스 제공자가 범죄 정황을 인지할 경우 신고 의무를 부과하는 취지의 개정안을 담고 있다.",
    point: "신고로 인한 민사책임을 제한하는 방향도 포함돼, 플랫폼의 적극적 신고 유인을 높이는 동시에 오·남용(과잉신고, 표현 위축) 방지 설계가 입법 쟁점이 될 수 있다.",
    url: "https://opinion.lawmaking.go.kr/gcom/nsmLmSts/out/2217704/detailRP?yType=I"
  },
  {
    title: "또래 여중생 집단 성폭행 불법촬영·유포 4명, 2심도 실형",
    source: "연합뉴스",
    date: "2026-03-24",
    category: "아청법 사건",
    summary: "또래 여중생에 대한 집단 성폭행, 불법촬영·유포가 결합된 사건에서 항소심이 실형을 유지한 것으로 보도됐다.",
    point: "성폭력 자체의 중대성에 더해 촬영·유포로 피해가 반복·확산되는 디지털 특성이 양형에서 불리하게 작용하는 전형을 보여준다.",
    url: "https://www.yna.co.kr/view/AKR20260324161400063"
  },
  {
    title: "성폭력 피해자 법률상담등 지원기관 지정 고시 제정안 행정예고",
    source: "국민참여입법센터(성평등가족부 공고)",
    date: "2026-03-16",
    category: "입법, 법률 개정 및 판결",
    summary: "성폭력 피해자에게 법률상담·소송대리 지원을 제공할 “지원기관 지정”을 위한 고시 제정 행정예고로, 예고기간이 2026-03-16~2026-04-06로 제시됐다.",
    point: "법률·시행령이 예정한 지원체계를 실제 ‘지정’으로 연결하는 하위 규범 정비로서, 피해자 접근성(어디서 상담·대리를 받을 수 있는지)을 좌우하는 실무적 파급이 크다.",
    url: "https://opinion.lawmaking.go.kr/gcom/admpp/46376?announceType=TYPE6&blockStartPage=1&mappingAdmRulSeq=2000000325212&pageIndex=1&pageIndexSub=1&queryString=cptOfiOrgCd%3D1192000"
  },
  {
    title: "여자 화장실서 상습 불법 촬영했는데…법원은 영장 기각",
    source: "연합뉴스",
    date: "2026-03-16",
    category: "입법, 법률 개정 및 판결",
    summary: "여자 화장실에서 반복적 불법촬영을 한 피의자가 체포됐으나 법원이 구속영장을 기각한 사건을 다뤘다.",
    point: "디지털 성범죄에서 증거 인멸·재범 위험과 신체구속의 필요성(비례성) 판단이 어떻게 작동하는지 보여주는 사례로, 영장 단계에서의 사실관계·위험성 소명이 실무상 중요함을 시사한다.",
    url: "https://www.yna.co.kr/view/AKR20260316122400061"
  },
  {
    title: "성범죄자 신상 공개, 교육부 홈페이지에서도 본다",
    source: "경향신문",
    date: "2026-03-14",
    category: "입법, 법률 개정 및 판결",
    summary: "성범죄자 신상정보 공개·고지 체계를 교육 현장과 연계해 접근성을 높이려는 정책 흐름을 다룬 기사로 보도됐다.",
    point: "아동·청소년 보호라는 공익과, 신상정보 공개가 가져올 낙인·사적 제재 위험 및 정보보호(2차 유출) 사이의 균형이 핵심 쟁점이다.",
    url: "https://www.khan.co.kr/article/202603181425011"
  },
  {
    title: "성추행범도 협박범도 “4심 받겠다” (재판소원 접수 급증)",
    source: "조선일보",
    date: "2026-03-14",
    category: "입법, 법률 개정 및 판결",
    summary: "‘재판소원’ 제도 도입 직후 정치인·일반인뿐 아니라 성추행 등 형사사건 당사자도 헌법적 구제를 시도하는 흐름을 전했다.",
    point: "형사사건의 확정판결 이후에도 절차적 권리(재판청구권·적법절차 등)를 근거로 다툼이 제기될 수 있어, 남용 방지 장치와 실질적 권리구제 사이의 제도 설계가 논점으로 부상한다.",
    url: "https://www.chosun.com/national/court_law/2026/03/14/R4GH3P6Q4FDJJOVNSMX6SUBJ54/"
  },
  {
    title: "대법원 중요판결 요지: 송금메모가 통신매체이용음란죄의 ‘통신매체’에 해당",
    source: "대법원(중요판결 요지 PDF)",
    date: "2026-03-12",
    category: "입법, 법률 개정 및 판결",
    summary: "대법원은 계좌이체 ‘송금메모’란도 메시지 전달 기능을 수행하므로, 성폭력처벌법상 통신매체이용음란죄의 “통신매체” 개념에 포함될 수 있다는 취지로 판단했다.",
    point: "통신수단의 확장(메신저·SNS뿐 아니라 금융이체 부가정보까지)을 범죄구성요건 해석에 반영했다는 점에서, 향후 유사한 “비전통적 전달수단” 사건의 기준점이 될 수 있다.",
    url: "https://www.scourt.go.kr/sjudge/1773621019789_093019.pdf"
  },
  {
    title: "미성년자 상대 성매매·성 착취물 제작 20대에 징역 7년 구형",
    source: "연합뉴스",
    date: "2026-03-12",
    category: "아청법 사건",
    summary: "검찰이 미성년자를 대상으로 성매매·성착취물 제작 등 혐의를 적용해 중형을 구형한 사건을 다뤘다.",
    point: "미성년자 대상 성범죄는 동의 여부와 무관하게 중하게 처벌되는 영역이어서, 범행 방식(촬영·저장 등)과 재범위험 평가가 양형에 직접 반영된다는 점이 강조된다.",
    url: "https://www.yna.co.kr/view/AKR20260312122500056"
  },
  {
    title: "근무 중 성매매업소서 성 접대 받고 동료 단속도 무마… 경찰관 2명 징역형",
    source: "연합뉴스",
    date: "2026-03-11",
    category: "사건대응",
    summary: "현직 경찰관들이 근무 중 성매매업소에서 성접대를 받고, 동료 경찰관의 단속을 무마한 정황이 형사사건으로 이어져 징역형이 선고된 사례로 보도됐다.",
    point: "공권력 내부 비위가 성범죄(성매매)와 결합될 때 수사 신뢰를 훼손하고 2차 피해·은폐 위험을 키운다는 점이 쟁점이다.",
    url: "https://www.yna.co.kr/view/AKR20260311159000055"
  },
  {
    title: "이커머스 업체 대표 남편, 직원 강제추행 혐의 인정…검찰 집행유예 구형",
    source: "연합뉴스",
    date: "2026-03-10",
    category: "입법, 법률 개정 및 판결",
    summary: "직장 내 위계나 관계를 배경으로 한 성범죄 이슈가 다시 주목된 사례입니다. 사건 발생 후 초기 대응과 사실관계 정리가 얼마나 중요한지 생각하게 합니다.",
    point: "사건 이후 진술 정리와 조기 상담 개입의 중요성을 시사합니다. 법적 판단은 사건별로 달라질 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20260310114900004"
  },
  {
    title: "부산 ‘돌려차기’ 사건 국가배상 확정…법무부 항소 포기",
    source: "연합뉴스",
    date: "2026-03-05",
    category: "입법, 법률 개정 및 판결",
    summary: "중대한 폭력·성범죄 사건 이후 국가 책임과 피해 회복 문제까지 함께 논의된 사례입니다. 사건이 남기는 사회적 파장과 제도적 대응의 중요성을 보여줍니다.",
    point: "피해 회복과 재발 방지 체계가 함께 논의되어야 함을 시사합니다. 구체적 법률 평가는 사건별 검토가 필요합니다.",
    url: "https://www.yna.co.kr/view/AKR20260305157300004"
  },
  {
    title: "미성년자 대상 성매매·성착취물 제작 사건, 징역 5년 선고",
    source: "연합뉴스",
    date: "2026-03-04",
    category: "아청법 사건",
    summary: "아동·청소년 대상 범죄는 매우 엄중하게 다뤄지고 있으며, 제작과 유인, 착취 구조 전반이 함께 문제 되는 흐름을 보여줍니다.",
    point: "왜곡된 인식 교정과 재범방지 교육의 필요성을 보여주는 사례입니다. 사건별 판단 기준은 다를 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20260304086800056"
  },
  {
    title: "현직 검사, 전 연인 신체 몰래촬영 의혹…경찰 수사",
    source: "동아일보",
    date: "2026-02-27",
    category: "디지털 성범죄",
    summary: "불법촬영 문제는 직업이나 지위와 무관하게 발생할 수 있으며, 친밀한 관계 안에서도 중대한 침해가 될 수 있음을 보여줍니다.",
    point: "디지털 성범죄 예방 교육과 경계 인식의 필요성을 시사합니다. 법적 평가는 수사와 재판 과정에서 달라질 수 있습니다.",
    url: "https://www.donga.com/news/Society/article/all/20260227/133436259/2"
  },
  {
    title: "딥페이크 삭제·차단 의무 법안, 반대 의견 대량…좌표 가능성",
    source: "경향신문",
    date: "2026-02-19",
    category: "입법, 법률 개정 및 판결",
    summary: "딥페이크 대응 법안과 관련해 온라인 여론 형성 방식까지 함께 논의된 사례입니다. 기술 환경 변화에 맞춘 예방과 대응 체계가 중요해지고 있습니다.",
    point: "디지털 성범죄는 기술 이해와 예방 교육이 함께 가야 함을 보여줍니다. 제도 평가는 향후 변화 가능성이 있습니다.",
    url: "https://www.khan.co.kr/article/202602190600011"
  },
  {
    title: "대학원생 성폭행 혐의 전직 교수, 항소심 징역 5년",
    source: "연합뉴스",
    date: "2026-02-13",
    category: "입법, 법률 개정 및 판결",
    summary: "권력관계와 신뢰관계를 이용한 성폭력 문제의 심각성이 다시 확인된 사례입니다. 교육기관 내 관계 윤리와 책임이 중요하게 다뤄졌습니다.",
    point: "위계 관계에서의 성인지 감수성과 경계 교육의 필요성을 시사합니다. 사건별 법적 판단은 구체적 사실에 따라 다릅니다.",
    url: "https://www.yna.co.kr/view/AKR20260213077200053"
  },
  {
    title: "교회 교사-제자 관계 이용 성범죄, 1심 징역 6년",
    source: "연합뉴스",
    date: "2026-02-12",
    category: "아청법 사건",
    summary: "신뢰관계와 보호자적 위치가 범죄에 악용될 때 피해가 더 깊어질 수 있음을 보여주는 사례입니다. 관계의 비대칭성을 이해하는 교육이 중요합니다.",
    point: "관계 내 권한 차이와 성인지 교육의 필요성을 보여줍니다. 구체적 판단은 사건별로 달라질 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20260212077400061"
  },
  {
    title: "AI 기반 디지털성범죄 모니터링·삭제지원 자동화 정책",
    source: "대한민국 정책브리핑",
    date: "2026-02-12",
    category: "디지털 성범죄",
    summary: "AI를 활용한 탐지·삭제 지원 정책이 확대되는 흐름을 소개한 자료입니다. 기술 기반 대응이 중요한 축으로 자리잡고 있음을 보여줍니다.",
    point: "디지털 성범죄 대응은 예방 교육과 기술적 대응이 함께 가야 함을 시사합니다. 실제 적용 범위는 제도에 따라 달라질 수 있습니다.",
    url: "https://www.korea.kr/news/policyNewsView.do?newsId=148959267"
  },
  {
    title: "여성 신체 불법촬영한 전직 소방관, 2심 집행유예 감형",
    source: "연합뉴스",
    date: "2026-02-11",
    category: "입법, 법률 개정 및 판결",
    summary: "불법촬영 사건에서 양형 판단 요소가 어떻게 다뤄지는지 관심을 모은 사례입니다. 사건 이후 태도와 조치가 함께 검토되는 흐름을 생각하게 합니다.",
    point: "심리상담 기록과 변화 과정의 객관화가 중요할 수 있음을 시사합니다. 법적 판단은 사건별로 다를 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20260211129400056"
  },
  {
    title: "국립대 교수 상습 성추행 사건, 징역 2년 법정구속",
    source: "동아일보",
    date: "2026-02-11",
    category: "입법, 법률 개정 및 판결",
    summary: "반복성과 관계 내 권한 문제가 결합된 사건으로, 교육현장에서의 윤리와 책임이 다시 강조된 사례입니다.",
    point: "반복 행동에 대한 자기점검과 조기 개입의 중요성을 시사합니다. 구체적 법률 평가는 개별 사건 검토가 필요합니다.",
    url: "https://www.donga.com/news/Society/article/all/20260211/133343214/1"
  },
  {
    title: "불법촬영물 유통 사이트 수사…시청자 처벌 쟁점",
    source: "연합뉴스",
    date: "2026-02-07",
    category: "입법, 법률 개정 및 판결",
    summary: "불법촬영물 유통 구조와 소비 행위의 책임 범위가 사회적으로 다시 논의된 사례입니다. 단순 시청이라 여겨도 위험성이 작지 않다는 점을 떠올리게 합니다.",
    point: "디지털 콘텐츠 이용 습관에 대한 인식 점검이 필요함을 보여줍니다. 관련 판단은 사건 경위에 따라 달라질 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20260206126500061"
  },
  {
    title: "디지털성범죄·젠더폭력 대응 강화(연간 정책)",
    source: "대한민국 정책브리핑",
    date: "2026-01-30",
    category: "입법, 법률 개정 및 판결",
    summary: "정부 차원의 연간 대응 방향을 통해 디지털 성범죄와 젠더폭력 예방 정책이 강화되는 흐름을 정리한 자료입니다.",
    point: "예방 교육과 사회적 감수성 향상이 함께 필요하다는 점을 보여줍니다. 세부 제도는 계속 바뀔 수 있습니다.",
    url: "https://www.korea.kr/news/policyNewsView.do?newsId=148958837"
  },
  {
    title: "치과 엑스레이실 등 449회 불법촬영, 항소심 집행유예",
    source: "연합뉴스",
    date: "2026-01-26",
    category: "입법, 법률 개정 및 판결",
    summary: "반복된 불법촬영 사건에서 행위의 지속성과 양형 판단 요소가 함께 주목된 사례입니다. 행동 패턴의 누적성이 중요하게 보일 수 있음을 생각하게 합니다.",
    point: "반복 행동에 대한 재범위험 점검과 구조적 개입의 중요성을 시사합니다. 법적 판단은 사건별로 달라질 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20260123113600065"
  },
  {
    title: "어린이집 화장실 불법카메라 의혹…원장 남편 수사",
    source: "MBC",
    date: "2026-01-22",
    category: "아청법 사건",
    summary: "아동이 있는 공간에서의 불법촬영 의혹이 제기되며 사회적 불안이 커진 사례입니다. 보호 환경에서의 안전 관리가 중요함을 보여줍니다.",
    point: "예방 교육과 공간 안전 점검의 필요성을 시사합니다. 구체적 사실관계는 수사 결과에 따라 달라질 수 있습니다.",
    url: "https://imnews.imbc.com/replay/2026/nwtoday/article/6795367_37012.html"
  },
  {
    title: "수면제 먹여 성폭행·촬영한 BJ·피해자 남친, 1심 실형",
    source: "연합뉴스",
    date: "2026-01-22",
    category: "입법, 법률 개정 및 판결",
    summary: "약물, 촬영, 관계 악용이 결합된 중대한 사건으로, 피해 통제와 왜곡된 인식의 문제가 함께 드러난 사례입니다.",
    point: "왜곡된 관계 인식과 충동 통제 문제에 대한 심리적 개입 필요성을 시사합니다. 사건별 판단은 사실관계에 따라 달라집니다.",
    url: "https://www.yna.co.kr/view/AKR20260122107700061"
  },
  {
    title: "텔레그램 기반 성착취 ‘목사방’ 사건, 2심 첫 공판(1심 무기징역)",
    source: "동아일보",
    date: "2026-01-07",
    category: "아청법 사건",
    summary: "온라인 플랫폼을 매개로 한 조직적 성착취 범죄의 심각성이 계속 조명된 사례입니다. 익명성과 폐쇄성이 범죄를 강화할 수 있음을 보여줍니다.",
    point: "디지털 환경에서의 왜곡된 인식 교정과 강한 재범방지 교육의 필요성을 시사합니다. 구체적 법적 평가는 사건별로 다릅니다.",
    url: "https://www.donga.com/news/Society/article/all/20260107/133107710/1"
  },
  {
    title: "장기간 여성 교인 대상 성폭력 의혹 전직 목사 구속",
    source: "한겨레",
    date: "2026-01-06",
    category: "성인지 감수성",
    summary: "종교적 권위와 신뢰가 악용된 의혹이 제기된 사례로, 보호와 돌봄의 위치에 있는 사람의 책임이 다시 강조됐습니다.",
    point: "권위 관계 속 경계 교육과 자기점검의 중요성을 보여줍니다. 수사·재판 결과에 따라 평가는 달라질 수 있습니다.",
    url: "https://www.hani.co.kr/arti/society/society_general/1238359.html"
  },
  {
    title: "또래 여중생 집단 성폭행·불법촬영, 수년 후 실형 선고",
    source: "연합뉴스",
    date: "2025-12-22",
    category: "아청법 사건",
    summary: "청소년 집단 내 성폭력과 촬영 문제가 결합된 사건으로, 초기 행동의 심각성을 가볍게 여기면 안 된다는 점을 보여줍니다.",
    point: "청소년 대상 성인지 교육과 디지털 윤리 교육의 필요성을 시사합니다. 사건별 평가는 구체적 경위에 따라 다릅니다.",
    url: "https://www.yna.co.kr/view/AKR20251222111300063"
  },
  {
    title: "교사 딥페이크 성착취물 제작·유포, 항소심 징역 3년",
    source: "연합뉴스",
    date: "2025-12-19",
    category: "아청법 사건",
    summary: "딥페이크 기술을 악용한 성착취 범죄가 교육현장과 연결되어 사회적 충격을 준 사례입니다. 기술 활용 윤리와 예방 교육의 중요성이 커지고 있습니다.",
    point: "AI·딥페이크 관련 성인지 교육과 조기 개입의 필요성을 보여줍니다. 구체적 판단은 사건마다 다를 수 있습니다.",
    url: "https://www.yna.co.kr/view/AKR20251219064251065"
  },
  {
    title: "성인 화보 제작사 전 대표 성폭행·불법촬영, 징역 10년",
    source: "동아일보",
    date: "2025-12-19",
    category: "입법, 법률 개정 및 판결",
    summary: "촬영·제작 환경 안에서 동의와 권력 문제를 어떻게 봐야 하는지 다시 생각하게 한 사례입니다. 산업 현장에서도 경계와 책임이 핵심이라는 점이 드러납니다.",
    point: "동의 개념과 관계 내 권력 인식에 대한 교육의 필요성을 시사합니다. 법적 평가는 개별 사실관계에 따라 달라집니다.",
    url: "https://www.donga.com/news/Society/article/all/20251219/132999807/2"
  },
  {
    title: "전직 국회의원 보좌관 성추행 사건, 대법원 징역 1년 확정",
    source: "한겨레",
    date: "2025-12-11",
    category: "입법, 법률 개정 및 판결",
    summary: "직장 내 권력관계에서 발생하는 성추행 사건이 최종심까지 이어진 사례입니다. 조직 내 성인지 감수성과 구조적 예방이 중요함을 보여줍니다.",
    point: "직장 내 성인지 교육과 관계 경계 설정의 중요성을 시사합니다. 구체적 법적 판단은 사건별로 다릅니다.",
    url: "https://www.hani.co.kr/arti/society/women/1234068.html"
  }
];

const MediaArchive = () => {
  const [filter, setFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('최신순');

  const categories = ['전체', '재범방지', '심리상담', '사건대응', '양형자료', '디지털 성범죄', '성인지 감수성', '입법, 법률 개정 및 판결', '아청법 사건'];

  const filteredData = MEDIA_DATA
    .filter(item => (filter === '전체' || item.category === filter))
    .filter(item => (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    .sort((a, b) => {
      if (sortBy === '최신순') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === '카테고리순') return a.category.localeCompare(b.category);
      return 0;
    });

  const categoryStats = categories.filter(c => c !== '전체').map(cat => ({
    name: cat,
    count: MEDIA_DATA.filter(item => item.category === cat).length
  })).sort((a, b) => b.count - a.count);

  const monthlyArchive = Array.from(new Set(MEDIA_DATA.map(item => item.date.substring(0, 7))))
    .sort((a, b) => b.localeCompare(a));

  const stats = {
    total: MEDIA_DATA.length,
    topCategory: categoryStats[0]?.name || "-",
    lastUpdate: MEDIA_DATA.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
  };

  return (
    <div className="space-y-12">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "총 기사 수", value: `${stats.total}건`, icon: FileText },
          { label: "주요 카테고리", value: stats.topCategory, icon: BarChart3 },
          { label: "최근 업데이트", value: stats.lastUpdate, icon: Calendar }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <stat.icon className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Stats Graph */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-emerald-600">
            <PieChart className="w-6 h-6" />
            <h4 className="font-bold">카테고리별 분포</h4>
          </div>
          <div className="space-y-3">
            {categoryStats.slice(0, 4).map((stat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">{stat.name}</span>
                  <span className="text-emerald-600">{stat.count}건</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${(stat.count / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Archive */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-emerald-600">
            <Clock className="w-6 h-6" />
            <h4 className="font-bold">월별 아카이브</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {monthlyArchive.map((month, i) => (
              <div key={i} className="px-3 py-2 bg-slate-50 rounded-xl text-center">
                <span className="text-xs font-black text-slate-400">{month.replace('-', '.')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Area */}
      <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="최신순">최신순</option>
              <option value="카테고리순">카테고리순</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="기사 제목, 요약, 언론사 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-3xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
          />
        </div>
      </div>

      {/* Main Dashboard (Article Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredData.map((item, idx) => (
          <motion.div 
            key={idx}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-8 lg:p-10 flex-grow space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-black uppercase tracking-widest">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-bold text-emerald-500">{item.source}</p>
                <h3 className="text-xl lg:text-2xl font-black text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                {item.summary}
              </p>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">상담/대응 포인트</p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {item.point}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 lg:px-10 lg:pb-10">
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#059669] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#047857] transition-all group/btn shadow-lg shadow-emerald-100"
              >
                기사 원문 보기
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="py-32 text-center space-y-4 bg-slate-50 rounded-[48px] border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      {/* Footer Disclaimer */}
      <footer className="bg-slate-50 rounded-[48px] p-10 lg:p-16 text-slate-900 space-y-8 border border-slate-100">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-[#059669]" />
          <h4 className="text-xl font-bold">자료 이용 시 유의사항</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500 leading-relaxed">
          <ul className="space-y-3">
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
              본 페이지는 관련 기사 제목과 링크, 그리고 자체 작성한 짧은 정보 요약을 정리한 자료입니다.
            </li>
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
              기사 원문과 저작권은 각 언론사 및 저작권자에게 있습니다.
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
              구체적인 법률 판단은 사건별로 다를 수 있으며, 필요 시 변호사 상담이 필요할 수 있습니다.
            </li>
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
              심리상담은 사건 이후의 인식 변화, 재범방지 노력, 자기이해를 돕는 과정입니다.
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

const ArchivePage = ({ title, slug }: { title: string; slug: string }) => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<typeof COLUMN_POSTS[0] | null>(null);

  useEffect(() => {
    const handleReset = () => {
      setActivePost(null);
      setActiveTest(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('reset-column-page', handleReset);
    return () => {
      window.removeEventListener('reset-column-page', handleReset);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTest, activePost, slug]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div 
        className={`relative py-12 lg:py-24 border-b border-slate-100 overflow-hidden ${slug === 'media' ? 'bg-cover bg-center' : 'bg-slate-50'}`}
        style={slug === 'media' ? { backgroundImage: 'url(https://res.cloudinary.com/dxjz9ksjg/image/upload/v1785746399/f2ff459c6d7d4b51450ed22f0fd0ff29_mxcc8u.png)' } : {}}
      >
        {slug === 'media' && <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            {(activeTest || activePost) && (
              <button 
                onClick={() => {
                  setActiveTest(null);
                  setActivePost(null);
                }}
                className={`p-2 rounded-full border transition-colors ${slug === 'media' ? 'bg-white border-slate-200 text-slate-600 hover:text-[#059669]' : 'bg-white border-slate-200 text-slate-600 hover:text-[#059669]'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className={`font-bold ${slug === 'media' ? 'text-3xl lg:text-6xl text-slate-900' : 'text-2xl lg:text-4xl text-slate-900'}`}>
              {activeTest ? activeTest : activePost ? activePost.category : title}
            </h1>
          </div>
          <div className={`text-lg ${slug === 'media' ? 'text-slate-600' : 'text-slate-500'}`}>
            {activeTest 
              ? "객관적인 자가진단을 통해 자신의 상태를 점검해보세요." 
              : activePost
              ? activePost.title
              : slug === 'media'
              ? (
                <div className="space-y-4">
                  <span className="block whitespace-pre-line">
                    재범방지, 심리상담, 사건 대응, 성인지 교육과 관련된 주요 기사를 정리한 자료입니다.
                  </span>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${slug === 'media' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-emerald-50 text-emerald-600'}`}>
                    <Info className="w-4 h-4" />
                    기사 제목을 누르면 원문을 확인할 수 있습니다. 본 페이지는 기사 원문 재게시가 아닌 정보 정리 및 안내를 위한 자료입니다.
                  </div>
                </div>
              )
              : "부산 성범죄 예방과 교정을 위한 전문 지식과 사례를 공유합니다."
            }
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {slug === 'media' && (
          <MediaArchive />
        )}

        {slug === 'check' && !activeTest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "성인지 감수성 자가 체크", desc: "나의 성인지 관점은 객관적인가요?", items: 20, id: 'gender' },
              { title: "디지털 성범죄 위험도 체크", desc: "온라인 활동 중 위험 요소가 있나요?", items: 20, id: 'digital' },
              { title: "충동 조절 능력 평가", desc: "특정 상황에서 나의 통제력은 어느 정도인가요?", items: 20, id: 'impulse' },
              { title: "재범 위험성 간이 측정", desc: "전문 도구를 활용한 간이 위험도 체크", items: 20, id: 'recidivism' }
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary-deep flex items-center justify-center group-hover:bg-primary-deep group-hover:text-white transition-colors">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{item.items} 문항</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-8">{item.desc}</p>
                <button 
                  onClick={() => (item.id === 'gender' || item.id === 'digital' || item.id === 'impulse' || item.id === 'recidivism') && setActiveTest(item.title)}
                  className={`w-full py-4 font-bold rounded-2xl transition-colors ${
                    (item.id === 'gender' || item.id === 'digital' || item.id === 'impulse' || item.id === 'recidivism')
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {(item.id === 'gender' || item.id === 'digital' || item.id === 'impulse' || item.id === 'recidivism') ? '테스트 시작하기' : '준비 중입니다'}
                </button>
              </div>
            ))}
          </div>
        )}

        {slug === 'check' && activeTest === "성인지 감수성 자가 체크" && (
          <GenderSensitivityTest />
        )}

        {slug === 'check' && activeTest === "디지털 성범죄 위험도 체크" && (
          <DigitalRiskTest />
        )}

        {slug === 'check' && activeTest === "충동 조절 능력 평가" && (
          <ImpulseControlTest />
        )}

        {slug === 'check' && activeTest === "재범 위험성 간이 측정" && (
          <RecidivismRiskTest />
        )}

        {slug === 'column' && !activePost && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {COLUMN_POSTS.map((post, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer"
              onClick={() => post.content && setActivePost(post)}
            >
              <div className="aspect-video rounded-3xl bg-slate-100 mb-6 overflow-hidden relative">
                <img 
                  src={post.image || `https://picsum.photos/seed/${idx + 10}/800/450`} 
                  alt="Column" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#059669] transition-colors leading-snug">
                  {post.title}
                </h3>
                {post.content && (
                  <div className="flex items-center gap-2 text-[#059669] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기 <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {slug === 'column' && activePost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {activePost.category}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                {activePost.title}
              </h2>
              {activePost.subtitle && (
                <p className="text-2xl text-slate-500 font-medium italic">
                  “{activePost.subtitle}”
                </p>
              )}
            </div>

            <div className="aspect-video rounded-[40px] overflow-hidden mb-16 shadow-2xl">
              <img 
                src={activePost.image} 
                alt="Post Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-12">
              {activePost.content?.map((block, idx) => (
                <div key={idx}>
                  {block.type === 'header' ? (
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                      {block.value}
                    </h3>
                  ) : (
                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                      {block.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">변화는 혼자서 어렵지만, 함께라면 가능합니다.</h4>
              <p className="text-slate-500 mb-10 max-w-lg">
                우리 센터는 비난이 아닌 분석으로 접근합니다. <br />
                막연한 후회가 아니라 구체적인 변화 전략을 세우는 공간입니다.
              </p>
              <a 
                href={NAVER_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-[#059669] text-white text-center font-black rounded-2xl hover:bg-[#047857] transition-all shadow-xl shadow-emerald-100 active:scale-95"
              >
                전문가와 상담 시작하기
              </a>
            </div>
          </motion.div>
        )}

      {slug !== 'check' && slug !== 'column' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
  );
};

const ApplicationPage = () => {
  useEffect(() => {
    window.location.href = NAVER_PLACE_URL;
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-50 min-h-screen flex items-center justify-center py-24"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Calendar className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">네이버 예약으로 이동 중입니다</h1>
        <p className="text-slate-500 mb-8">잠시만 기다려 주세요...</p>
        <a 
          href={NAVER_PLACE_URL}
          className="px-8 py-4 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all"
        >
          이동하지 않는다면 여기를 클릭하세요
        </a>
      </div>
    </motion.div>
  );
};

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero />
    <HomeIntro />
    <CoreServices />
    <HomeExperts />
    <PartnerTeaser />
    <MediaAppearanceTeaser />
    <LegalSection />
    <ProcessSection />
    
    {/* Case Types Quick Grid */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">사건 유형별 전문 대응</h2>
          <p className="text-slate-500">각 사건의 특수성을 고려한 맞춤형 심리 개입 프로그램을 제공합니다.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {NAV_STRUCTURE[3].children?.map((child, idx) => (
            <Link 
              key={idx} 
              to={child.href}
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all text-center group relative z-10 cursor-pointer"
            >
              <span className="text-slate-900 font-bold group-hover:text-[#4F46E5]">{child.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </motion.div>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
  >
    <h1 className="text-4xl font-bold text-slate-900 mb-6">{title}</h1>
    <p className="text-xl text-slate-500 mb-12">이 페이지는 현재 준비 중입니다. 상세 기획안에 따라 곧 업데이트될 예정입니다.</p>
    <Link to="/" className="inline-flex items-center gap-2 text-[#4F46E5] font-bold hover:underline">
      <ArrowLeft className="w-5 h-5" />
      홈으로 돌아가기
    </Link>
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<SubstanceLabLandingPage />} />
            <Route path="/portal" element={<Home />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/media/appearance" element={<MediaAppearancePage />} />
            <Route path="/remote" element={<RemoteProgramPage />} />
            {/* About Routes */}
            {NAV_STRUCTURE[0].children?.filter(c => c.href !== '/partners' && c.href !== '/media/appearance').map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<AboutPage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Treatment Routes */}
            {NAV_STRUCTURE[1].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<TreatmentPage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Case Routes */}
            {NAV_STRUCTURE[3].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<CasePage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Legal Routes */}
            <Route path="/legal/info" element={<LegalPage />} />
            <Route path="/legal/assessment" element={<LegalAssessmentPage />} />
            <Route path="/legal/coaching" element={<CoachingPage />} />
            <Route path="/legal/collaboration" element={<CollaborationPage />} />
            {NAV_STRUCTURE[4].children?.filter(c => c.href !== '/legal/info' && c.href !== '/legal/assessment' && c.href !== '/legal/coaching' && c.href !== '/legal/collaboration').map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={child.href.includes('/education/') ? <EducationPage title={child.title} slug={child.href.split('/').pop() || ''} /> : <PlaceholderPage title={child.title} />} 
                />
              </React.Fragment>
            ))}

            {/* Guide Routes */}
            <Route path="/guide/faq" element={<GuidePage title="자주 묻는 질문" slug="faq" />} />
            <Route path="/guide/process" element={<CounselingProcessPage />} />
            <Route path="/guide/privacy" element={<ConfidentialityPage />} />
            {NAV_STRUCTURE[2].children?.filter(c => c.href !== '/guide/faq' && c.href !== '/guide/process' && c.href !== '/guide/privacy' && c.href !== '/remote').map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<GuidePage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}
            
            {/* Archive Routes */}
            {NAV_STRUCTURE[5].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<ArchivePage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Application Route */}
            <Route path="/apply" element={<ApplicationPage />} />

            {/* Dentistry Landing Page */}
            <Route path="/dentistry-landing" element={<DentistryLandingPage />} />
            <Route path="/substance-lab" element={<SubstanceLabLandingPage />} />
            <Route path="/substance-lab-landing" element={<SubstanceLabLandingPage />} />
            
            {/* Other Routes */}
            {NAV_STRUCTURE.filter((_, i) => i !== 0 && i !== 1 && i !== 2 && i !== 3 && i !== 4 && i !== 5).map(item => (
              <React.Fragment key={item.title}>
                {item.children?.map(child => (
                  <React.Fragment key={child.href}>
                    <Route 
                      path={child.href} 
                      element={<PlaceholderPage title={child.title} />} 
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}