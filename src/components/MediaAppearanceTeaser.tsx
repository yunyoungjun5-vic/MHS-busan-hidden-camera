import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const MEDIA_TEASER_DATA = [
  {
    id: 207,
    category: "방송 출연",
    title: "KBS 동행 441회 후반부에 437회 ‘윤정이의 겨울 붕어빵’ 후기 방송분 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307821/F677_5_z8bltz.png",
    summary: "KBS 동행 441회 후기 방송분 출연 1",
  },
  {
    id: 209,
    category: "방송 출연",
    title: "KBS 동행 441회 후반부에 437회 ‘윤정이의 겨울 붕어빵’ 후기 방송분 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307789/KakaoTalk_20241207_200825917_01_kczsra.jpg",
    summary: "KBS 동행 441회 후기 방송분 출연 3",
  },
  {
    id: 3,
    category: "라디오 및 인터뷰",
    title: "TBN 교통방송 라디오 심리상담 코너",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775293165/20191213_093243_upohwz.jpg",
    summary: "현대인의 충동 조절과 심리 분석",
  },
  {
    id: 206,
    category: "방송 출연",
    title: "KBS1 '사랑의 가족' 방영분 3030회 ’집착하는 아내와 수상한 남편’3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775293098/%EC%82%AC%EB%9E%91%EC%9D%98_%EA%B0%80%EC%A1%B1_%EC%B5%9C%EB%A9%B4_vzfbjx.png",
    summary: "KBS1 '사랑의 가족' 3030회 출연 3",
  },
  {
    id: 14,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 05월 24일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292908/%EC%97%B0%EC%95%A0%ED%95%A0_%EB%95%8C_%EC%95%A0%EC%B0%A9_%EC%9C%A0%ED%98%95%EC%9D%B4_%EB%AF%B8%EC%B9%98%EB%8A%94_%EC%98%81%ED%96%A5_ss3jmj.jpg",
    summary: "『연애할 때 애착 유형이 미치는 영향』 이라는 주제로 방송하였습니다.",
  },
  {
    id: 303,
    category: "강연 및 특강",
    title: "문경소방대원 상담 및 강의",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775294966/1_cmgsnr.jpg",
    summary: "문경소방대원 상담 및 강의",
  }
];

const MediaAppearanceTeaser = () => {
  return (
    <section className="pt-24 pb-24 bg-white border-t border-slate-100/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight font-display"
          >
            대표원장 방송 출연 · 대외활동
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 break-keep font-medium"
          >
            방송, 강연, 인터뷰, 교육 현장에서의 실제 활동 일부를 소개합니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {MEDIA_TEASER_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to="/media/appearance" className="group block">
                <div className="aspect-video rounded-2xl overflow-hidden mb-5 relative bg-slate-200">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase">{item.category}</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-deep transition-colors line-clamp-2 break-keep leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-1">{item.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/media/appearance" 
            className="inline-flex items-center gap-2 text-primary-deep font-bold hover:gap-3 transition-all group"
          >
            방송·대외활동 전체 보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaAppearanceTeaser;
