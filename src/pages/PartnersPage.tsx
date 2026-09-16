
import React from 'react';
import { motion } from 'motion/react';
import { PARTNERS_DATA, getLogoHeight } from '../constants/partners';

const PartnersPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-50/50 min-h-screen pt-16 pb-32"
    >
      <div className="container-custom">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[340px] md:max-w-none mx-auto px-[20px] md:px-0 text-[30px] md:text-4xl lg:text-6xl font-black text-slate-900 mb-6 md:mb-8 tracking-[-0.02em] leading-[1.3] text-center break-keep font-display"
          >
            협력 · 협약 · 출강 기관
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-[800px] mx-auto px-[24px] text-[16px] md:text-[18px] text-slate-500 leading-[1.8] text-center break-keep font-medium tracking-[-0.01em]"
          >
            MHS 심리상담센터 산하 부산 성범죄심리상담센터는<br className="hidden md:block" />
            27년 이상의 임상 경험과 200여 개 공공기관·법률기관·교육기관·기업과의 협력 실적을 기반으로<br className="hidden md:block" />
            신뢰할 수 있는 전문 상담과 재범방지 교육을 제공하고 있습니다.
          </motion.p>
        </div>

        <div className="space-y-[80px]">
          {PARTNERS_DATA.map((category, catIdx) => (
            <div key={catIdx} className="relative">
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-2xl font-black text-slate-900 font-display shrink-0">{category.category}</h2>
                <div className="h-px bg-slate-200 w-full" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[35px] md:gap-12 lg:gap-[60px] place-items-center">
                {category.items.map((partner, idx) => (
                  <motion.a
                    key={idx}
                    href={partner.link && partner.link !== '#' ? partner.link : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group transition-transform duration-300 hover:scale-[1.08] flex items-center justify-center w-full ${partner.link && partner.link !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className={`w-auto max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain object-center ${getLogoHeight(partner.name)}`}
                      referrerPolicy="no-referrer"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PartnersPage;
