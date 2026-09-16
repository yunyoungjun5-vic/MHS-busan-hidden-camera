import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Video, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Laptop, 
  UserCheck, 
  Settings, 
  MessageSquare,
  ArrowRight,
  BrainCircuit,
  Eye,
  Repeat,
  HeartPulse,
  Map,
  Scale,
  Award,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RemoteProgramPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO 섹션 */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=2000" 
            alt="고뇌하는 남성" 
            className="w-full h-full object-cover brightness-125"
          />
          <div className="absolute inset-0 bg-remote-primary/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-remote-primary via-remote-primary/20 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative"
          >
            {/* 텍스트 가독성을 위한 얇은 반투명 레이어 */}
            <div className="absolute inset-0 -inset-y-10 bg-black/25 blur-3xl rounded-full -z-10"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white mb-8">
              <Video className="w-4 h-4 text-remote-mint" />
              <span className="text-sm font-bold tracking-wide">부산 비대면 원격 프로그램</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 leading-tight font-display tracking-[0.02em] break-keep text-shadow-premium">
              성범죄 가해자 심리상담 · 재범방지 교육<br />
              <span className="text-remote-mint">실시간 1:1 원격 심리개입 프로그램</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-12 leading-[1.7] font-medium break-keep">
              단순 영상 교육이 아닙니다.<br className="hidden md:block" />
              실시간 상담을 통해 행동의 원인을 분석하고<br className="hidden md:block" />
              재범을 방지하는 실질적 개입 프로그램입니다.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
              {[
                "대면 수준 실시간 상담",
                "상담확인서 · 교육이수확인서 발급",
                "법원 제출 상담의견서 가능"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 text-white break-keep w-full sm:w-auto justify-center sm:justify-start shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-remote-mint shrink-0 drop-shadow-sm" />
                  <span className="font-bold text-sm sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4 sm:px-0">
              <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-remote-mint hover:bg-remote-mint-hover text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(31,199,182,0.3)] flex items-center justify-center gap-2 break-keep">
                실시간 상담 예약하기
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 핵심 차별성 섹션 */}
      <section className="py-24 bg-remote-bg-light">
        <div className="container-custom">
          <div className="text-center mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-remote-primary mb-4 font-display break-keep">일방향 교육 vs 양방향 상담</h2>
            <p className="text-base sm:text-lg text-slate-600 break-keep">녹화된 영상을 보는 것만으로는 행동을 바꿀 수 없습니다.</p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              {/* 좌측: 수동적 교육 */}
              <div className="relative rounded-3xl overflow-hidden group">
                <div className="aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000" 
                    alt="수동적인 영상 시청" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/40"></div>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="bg-white/40 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/50 shadow-md">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-2 flex items-center gap-2 break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      <span className="text-red-400 shrink-0 drop-shadow-sm">✕</span> 일반적인 온라인 교육
                    </h3>
                    <p className="text-white text-sm break-keep leading-[1.7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-bold">녹화된 영상을 수동적으로 시청하며, 개인의 특성과 사건의 맥락이 전혀 고려되지 않습니다.</p>
                  </div>
                </div>
              </div>

              {/* 우측: 능동적 상담 */}
              <div className="relative rounded-3xl overflow-hidden group shadow-2xl shadow-remote-primary/20 ring-4 ring-remote-mint/20">
                <div className="aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000" 
                    alt="능동적인 화상 상담" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-remote-primary/30"></div>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="bg-white/50 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/60 shadow-xl group-hover:bg-white/60 transition-colors">
                    <h3 className="text-lg sm:text-xl font-black text-white mb-2 flex items-center gap-2 break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      <span className="text-remote-mint shrink-0 drop-shadow-sm">✓</span> 1:1 원격 심리개입
                    </h3>
                    <p className="text-white text-sm break-keep leading-[1.7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-bold">전문가와 실시간으로 소통하며, 사건의 원인을 분석하고 맞춤형 재범방지 전략을 수립합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 중앙 VS 뱃지 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-16 h-16 bg-white rounded-full shadow-xl items-center justify-center z-10 font-black text-2xl text-slate-300 font-display">
              VS
            </div>
          </div>

          <div className="mt-16 text-center px-4">
            <div className="inline-block px-6 sm:px-8 py-4 bg-remote-primary text-white rounded-2xl shadow-xl w-full sm:w-auto">
              <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight break-keep">
                “보는 교육이 아니라, <span className="text-remote-mint">바꾸는 상담</span>입니다.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 대면 동일성 강조 섹션 */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2000" 
            alt="대면 상담" 
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-remote-primary/35 backdrop-blur-[2px]"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-6 font-display leading-tight break-keep text-shadow-premium">
              비대면이지만,<br />
              대면 상담과 다르지 않습니다
            </h2>
            <p className="text-base sm:text-lg text-white/90 break-keep leading-[1.7]">
              물리적 거리만 다를 뿐, 전문가의 깊이 있는 개입과<br className="hidden md:block" />
              치료적 효과는 대면 상담과 동일하게 이루어집니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 drop-shadow-lg ring-1 ring-white/50">
                <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775717095/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_9%EC%9D%BC_%EC%98%A4%ED%9B%84_03_44_17_v2lpjv.png" alt="대면 상담" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 text-center break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">대면 상담</h3>
              <p className="text-white text-center text-sm break-keep drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-bold">직접 방문하여 진행되는 심층 상담</p>
            </div>
            
            <div className="bg-teal-500/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-teal-300/60 ring-2 ring-teal-300/40 shadow-[0_0_40px_rgba(31,199,182,0.4)]">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative drop-shadow-lg ring-1 ring-white/30">
                <img src="https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775717095/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_9%EC%9D%BC_%EC%98%A4%ED%9B%84_03_44_30_wbvxha.png" alt="화상 상담" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-2 py-1 rounded animate-pulse shadow-md">
                  REC
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 text-center break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">실시간 화상 상담</h3>
              <p className="text-white text-center text-sm break-keep drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-bold">어디서든 접속 가능한 1:1 심층 개입</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 상담 방식 섹션 */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-remote-mint/10 text-remote-mint mb-6">
              <Laptop className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-remote-primary mb-4 font-display break-keep">어떻게 진행되나요?</h2>
            <p className="text-base sm:text-lg text-slate-600 break-keep">안전하고 편리한 환경에서 전문가와 연결됩니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              { icon: Video, title: "실시간 연결", desc: "PC나 스마트폰을 통해 지정된 시간에 화상 회의실로 접속합니다." },
              { icon: UserCheck, title: "상담자 직접 개입", desc: "녹화 영상이 아닌, 담당 전문가가 실시간으로 대화하며 개입합니다." },
              { icon: Settings, title: "맞춤형 상담 진행", desc: "개인의 사건 내용과 심리적 특성에 맞춘 1:1 커리큘럼이 적용됩니다." }
            ].map((item, i) => (
              <div key={i} className="bg-remote-bg-light p-6 sm:p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-remote-mint mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-remote-primary mb-3 break-keep">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-[1.7] break-keep">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-remote-bg-light py-8 rounded-3xl border border-slate-100 max-w-3xl mx-auto">
            <p className="text-sm font-bold text-slate-400 mb-4 tracking-widest uppercase">Supported Platforms</p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-lg">
                <Video className="w-6 h-6 text-blue-500" /> Zoom
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center gap-2 text-slate-700 font-bold text-lg">
                <Video className="w-6 h-6 text-green-500" /> Google Meet
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 상담 내용 섹션 */}
      <section className="py-24 bg-remote-primary">
        <div className="container-custom">
          <div className="text-center mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 font-display break-keep text-shadow-premium">무엇을 다루나요?</h2>
            <p className="text-base sm:text-lg text-white/70 break-keep">체계적이고 과학적인 5단계 심리개입 프로세스</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: BrainCircuit, 
                title: "사건 구조 분석", 
                desc: "사건 발생 당시의 인지적, 정서적, 환경적 요인을 객관적으로 분석합니다.",
                img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=800"
              },
              { 
                icon: Eye, 
                title: "성인지 왜곡 교정", 
                desc: "타인과 성적 권리에 대한 잘못된 신념과 인지적 오류를 찾아내고 교정합니다.",
                img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800"
              },
              { 
                icon: Repeat, 
                title: "충동 및 반복 패턴", 
                desc: "문제 행동을 유발하는 충동의 트리거를 파악하고, 반복되는 루프를 끊어냅니다.",
                img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800"
              },
              { 
                icon: HeartPulse, 
                title: "감정 구조 분석", 
                desc: "기저에 깔린 분노, 우울, 스트레스 등 감정적 취약성을 다루고 조절력을 향상시킵니다.",
                img: "https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&q=80&w=800"
              },
              { 
                icon: Map, 
                title: "재범방지 전략", 
                desc: "위험 상황을 예측하고 대처할 수 있는 구체적이고 실현 가능한 행동 계획을 수립합니다.",
                img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
              }
            ].map((item, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden group h-[320px] shadow-xl ring-1 ring-white/20">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#31a393]/95 via-[#31a393]/70 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4 border border-white/50 shadow-md">
                    <item.icon className="w-6 h-6 drop-shadow-md" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mb-2 break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{item.title}</h3>
                  <p className="text-white text-sm leading-[1.7] break-keep drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] font-bold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 법원 제출 섹션 */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000" 
            alt="법원 서류" 
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-remote-primary/35 backdrop-blur-[2px]"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto bg-[#36b3a1]/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[32px] md:rounded-[40px] border border-white/40 shadow-2xl drop-shadow-2xl">
            <div className="text-center mb-10 px-2">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-4 drop-shadow-md" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 font-display break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">법원·검찰 제출용 서류 발급</h2>
              <p className="text-white text-base sm:text-lg break-keep leading-[1.7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-bold">비대면 프로그램 이수 시에도 대면 상담과 동일한 효력의 서류가 발급됩니다.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "상담확인서", desc: "상담 진행 사실 및 출석 현황 증명" },
                { title: "교육이수확인서", desc: "재범방지 교육 과정 수료 증명" },
                { title: "상담의견서", desc: "전문가의 심층 평가 및 교정 경과 소견" }
              ].map((item, i) => (
                <div key={i} className="bg-white/40 p-5 sm:p-6 rounded-2xl border border-white/50 text-center hover:bg-white/50 transition-colors shadow-md">
                  <FileText className="w-8 h-8 text-white drop-shadow-md mx-auto mb-4 shrink-0" />
                  <h3 className="text-lg sm:text-xl font-black text-white mb-2 break-keep drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{item.title}</h3>
                  <p className="text-white text-sm break-keep leading-[1.7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. 대상 안내 섹션 */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-remote-primary mb-4 font-display break-keep">이런 분들께 권장합니다</h2>
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
            {[
              "거리가 멀어 센터 방문이 어려우신 분",
              "직장 업무 등으로 주간 방문이 불가능하신 분",
              "해외 체류 중이거나 타 지역에 거주하시는 분",
              "대면 상담에 대한 심리적 부담이 크신 분",
              "신분 노출에 대한 우려가 크신 분",
              "빠른 시일 내에 교육 이수가 필요하신 분"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-remote-bg-light border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-remote-mint/10 text-remote-mint flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-700 text-sm sm:text-base break-keep leading-[1.7]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 신뢰도 섹션 */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="전문 기관" 
            className="w-full h-full object-cover opacity-40 grayscale brightness-125"
          />
          <div className="absolute inset-0 bg-remote-primary/90"></div>
        </div>

        <div className="container-custom relative z-10 text-center px-4">
          <Award className="w-12 h-12 sm:w-16 sm:h-16 text-remote-mint mx-auto mb-6 shrink-0" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6 font-display break-keep text-shadow-premium">검증된 전문가의 프리미엄 상담</h2>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-[1.7] break-keep">
            법원 및 검찰청 연계 기관의 풍부한 임상 경험을 바탕으로,<br className="hidden md:block" />
            가장 전문적이고 체계적인 비대면 심리개입을 제공합니다.
          </p>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=2000" 
            alt="희망의 빛" 
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-remote-primary/35 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-remote-primary/80 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10 text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 font-display tracking-[0.02em] break-keep text-shadow-premium">
            지금 중요한 것은<br />
            <span className="text-remote-mint">처벌이 아니라 변화입니다</span>
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto break-keep leading-[1.7]">
            망설이는 지금 이 순간에도 시간은 흐르고 있습니다.<br className="hidden md:block" />
            전문가와 함께 올바른 변화의 첫 걸음을 시작하세요.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-remote-mint hover:bg-remote-mint-hover text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(31,199,182,0.3)] flex items-center justify-center gap-2 break-keep">
              실시간 상담 예약하기
              <ArrowRight className="w-5 h-5 shrink-0" />
            </a>
            <a href="tel:0507-1380-0028" className="w-full sm:w-auto px-10 py-5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 break-keep">
              <MessageSquare className="w-5 h-5 shrink-0" />
              상담 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RemoteProgramPage;
