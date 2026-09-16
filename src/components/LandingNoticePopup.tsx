import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const STORAGE_KEY = 'mhs_landing_popup_dismissed_until';
const POPUP_IMAGE_URL = "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1789546171/ChatGPT_Image_2026%EB%85%84_9%EC%9B%94_16%EC%9D%BC_%EC%98%A4%ED%9B%84_05_08_55_fjzbad.png";
const NAVER_BOOKING_URL = "https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84/place/2050622926?searchType=place&lng=129.0357115&lat=35.1045449&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh";

interface LandingNoticePopupProps {
  onConsultationClick?: () => void;
}

export const LandingNoticePopup: React.FC<LandingNoticePopupProps> = ({ onConsultationClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for "오늘 하루 보지 않기"
    try {
      const dismissedUntil = localStorage.getItem(STORAGE_KEY);
      if (dismissedUntil) {
        const timestamp = parseInt(dismissedUntil, 10);
        if (Date.now() < timestamp) {
          return; // Still dismissed for today
        }
      }
    } catch {
      // Ignore localStorage errors in private browsing
    }

    // Small delay for smooth entry after initial page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDismissToday = () => {
    try {
      // Set expiry to end of today (23:59:59.999)
      const now = new Date();
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();
      localStorage.setItem(STORAGE_KEY, endOfToday.toString());
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  const handleConsultation = () => {
    if (onConsultationClick) {
      onConsultationClick();
    } else {
      window.open(NAVER_BOOKING_URL, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          {/* Backdrop click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 w-[90vw] sm:w-[480px] md:w-[520px] lg:w-[530px] max-w-[540px] max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Circular Close Button at Top Right */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-2.5 right-2.5 md:top-3 md:right-3 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="팝업창 닫기"
            >
              <X className="w-4 h-4 md:w-4.5 md:h-4.5" />
            </button>

            {/* Scrollable Image Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain bg-white p-2.5 sm:p-3.5 pb-0">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 bg-[#F8FAFC]">
                <img
                  id="popup-title"
                  src={POPUP_IMAGE_URL}
                  alt="통합 양형자료 안내 - 상담·교육·서류 준비 패키지"
                  className="w-full h-auto object-contain block select-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
            </div>

            {/* CTA Button Section */}
            <div className="px-3.5 sm:px-4.5 pt-3 pb-2.5 bg-white">
              <button
                type="button"
                onClick={handleConsultation}
                className="w-full py-3 md:py-3.5 px-4 bg-[#1E3A5F] hover:bg-[#152C48] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#1E3A5F]/20 cursor-pointer"
              >
                <span>상담 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Utility Bar: 오늘 하루 보지 않기 | 닫기 */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[12px] sm:text-[13px] text-slate-500 select-none">
              <button
                type="button"
                onClick={handleDismissToday}
                className="hover:text-slate-800 transition-colors py-1 cursor-pointer font-medium"
              >
                오늘 하루 보지 않기
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleClose}
                className="hover:text-slate-800 transition-colors py-1 cursor-pointer font-medium"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LandingNoticePopup;
