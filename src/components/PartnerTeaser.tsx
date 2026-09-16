
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TEASER_PARTNERS, getLogoHeight } from '../constants/partners';

const PartnerTeaser = () => {
  return (
    <section className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[340px] md:max-w-none mx-auto px-[20px] md:px-0 text-[30px] lg:text-4xl font-black text-slate-900 mb-6 tracking-[-0.02em] leading-[1.3] text-center break-keep font-display"
          >
            협력 · 협약 · 출강 기관
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-[800px] mx-auto px-[24px] text-[16px] md:text-[18px] text-slate-600 leading-[1.8] text-center break-keep tracking-[-0.01em]"
          >
            MHS 심리상담센터 산하 부산 성범죄심리상담센터는<br className="hidden md:block" />
            27년 이상의 임상 경험과 200여 개 공공기관·법률기관·교육기관·기업과의 협력 실적을 기반으로<br className="hidden md:block" />
            신뢰할 수 있는 전문 상담과 재범방지 교육을 제공하고 있습니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[35px] md:gap-12 lg:gap-[60px] place-items-center mb-12 md:mb-20">
          {TEASER_PARTNERS.map((partner, idx) => (
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

        <div className="text-center">
          <Link 
            to="/partners" 
            className="inline-flex items-center gap-2 text-primary-deep font-bold hover:gap-3 transition-all group"
          >
            협력기관 전체 보기 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnerTeaser;
