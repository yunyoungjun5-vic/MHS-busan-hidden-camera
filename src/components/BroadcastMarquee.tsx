import React from 'react';
import { motion } from 'motion/react';

const MEDIA_LIST = [
  "KBS 동행",
  "KBS 사랑의 가족",
  "MBC 실화탐사대",
  "MBN 특종세상",
  "EBS 나눔",
  "SBS 그것이 알고 싶다",
  "tvN 화성인 X파일",
  "TV조선 가족, 두 개의 문",
  "연합뉴스 뉴스Y채널 다문화공동프로젝트 하모니",
  "JTBC 위험한 마음",
  "KBS 굿모닝 대한민국",
  "MBC 생방송 오늘의 아침, 新가족기획",
  "MBN 파뿌리",
  "KBS 7시 뉴스 인터뷰",
  "MBN 천기누설",
  "MBC 언니가 돌아왔다",
  "tvN 엑소시스트",
  "KBS 라디오 「4시에 힐링타임」",
  "KBS 라디오 「생방송 정보스펀지」",
  "TBN 교통방송 「Talk 터놓고 말해요」",
  "TBN 교통방송 「가족의 세계」"
];

const BroadcastMarquee = () => {
  return (
    <section className="bg-white py-12 lg:py-16 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-emerald-100"></div>
          <div className="text-center">
            <span className="text-[10px] lg:text-xs font-black text-emerald-600 tracking-[0.3em] uppercase block mb-1">Broadcasting</span>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">대표원장님 방송 출연</h3>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-emerald-100"></div>
        </div>
      </div>

      <div className="relative group">
        {/* Left/Right Gradients for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex items-center gap-16 lg:gap-24 pl-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Double the list for seamless looping */}
            {[...MEDIA_LIST, ...MEDIA_LIST].map((item, idx) => {
              const words = item.split(' ');
              let brand = words[0];
              let program = words.slice(1).join(' ');

              // Check if second word is Radio or Traffic Broadcast to include in branding
              if (words[1] === '라디오' || words[1] === '교통방송') {
                brand = `${words[0]} ${words[1]}`;
                program = words.slice(2).join(' ');
              }

              return (
                <div key={idx} className="flex items-center gap-4 transition-transform hover:scale-105 duration-300">
                  <span className="text-lg lg:text-2xl font-black text-emerald-100 group-hover:text-emerald-500/20 transition-colors">/</span>
                  <div className="text-base lg:text-xl font-bold tracking-tight cursor-default whitespace-nowrap">
                    <span className="text-emerald-500 mr-2">{brand}</span>
                    <span className="text-slate-400 hover:text-slate-900 transition-colors">{program}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BroadcastMarquee;
