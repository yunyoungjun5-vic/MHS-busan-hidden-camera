import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, PhoneCall, MessageSquare, Play, X } from 'lucide-react';

const CATEGORIES = ["전체", "방송 출연", "강연 및 특강", "라디오 및 인터뷰", "교육 및 프로그램"];

const MEDIA_DATA = [
  {
    id: 207,
    category: "방송 출연",
    title: "KBS 동행 441회 후반부에 437회 ‘윤정이의 겨울 붕어빵’ 후기 방송분 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307821/F677_5_z8bltz.png",
    summary: "KBS 동행 441회 후기 방송분 출연 1",
    featured: true
  },
  {
    id: 209,
    category: "방송 출연",
    title: "KBS 동행 441회 후반부에 437회 ‘윤정이의 겨울 붕어빵’ 후기 방송분 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307789/KakaoTalk_20241207_200825917_01_kczsra.jpg",
    summary: "KBS 동행 441회 후기 방송분 출연 3",
    featured: true
  },
  {
    id: 3,
    category: "라디오 및 인터뷰",
    title: "TBN 교통방송 라디오 심리상담 코너",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775293165/20191213_093243_upohwz.jpg",
    summary: "현대인의 충동 조절과 심리 분석",
    featured: true
  },
  {
    id: 206,
    category: "방송 출연",
    title: "KBS1 '사랑의 가족' 방영분 3030회 ’집착하는 아내와 수상한 남편’3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775293098/%EC%82%AC%EB%9E%91%EC%9D%98_%EA%B0%80%EC%A1%B1_%EC%B5%9C%EB%A9%B4_vzfbjx.png",
    summary: "KBS1 '사랑의 가족' 3030회 출연 3",
    featured: true
  },
  {
    id: 14,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 05월 24일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292908/%EC%97%B0%EC%95%A0%ED%95%A0_%EB%95%8C_%EC%95%A0%EC%B0%A9_%EC%9C%A0%ED%98%95%EC%9D%B4_%EB%AF%B8%EC%B9%98%EB%8A%94_%EC%98%81%ED%96%A5_ss3jmj.jpg",
    summary: "『연애할 때 애착 유형이 미치는 영향』 이라는 주제로 방송하였습니다.",
    featured: true
  },
  {
    id: 303,
    category: "강연 및 특강",
    title: "문경소방대원 상담 및 강의",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775294966/1_cmgsnr.jpg",
    summary: "문경소방대원 상담 및 강의",
    featured: true
  },
  {
    id: 201,
    category: "방송 출연",
    title: "MBC 실화탐사대 284회 마음을 닫아버린 딸 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775306761/F113_GOMCAM_20241024_2238470227_mc9xrf.png",
    summary: "MBC 실화탐사대 284회 '마음을 닫아버린 딸' 출연 및 자문 1",
    featured: false
  },
  {
    id: 202,
    category: "방송 출연",
    title: "MBC 실화탐사대 284회 마음을 닫아버린 딸 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775306677/F112_GOMCAM_20241024_2240580615_ekst3i.png",
    summary: "MBC 실화탐사대 284회 '마음을 닫아버린 딸' 출연 및 자문 2",
    featured: false
  },
  {
    id: 203,
    category: "방송 출연",
    title: "MBC 실화탐사대 284회 마음을 닫아버린 딸 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775306676/F114_GOMCAM_20241024_2245280054_bvc0fo.png",
    summary: "MBC 실화탐사대 284회 '마음을 닫아버린 딸' 출연 및 자문 3",
    featured: false
  },
  {
    id: 204,
    category: "방송 출연",
    title: "KBS1 '사랑의 가족' 방영분 3030회 ’집착하는 아내와 수상한 남편’1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307101/KakaoTalk_20240803_113845133_01_ucklcc.png",
    summary: "KBS1 '사랑의 가족' 3030회 출연 1",
    featured: false
  },
  {
    id: 205,
    category: "방송 출연",
    title: "KBS1 '사랑의 가족' 방영분 3030회 ’집착하는 아내와 수상한 남편’2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775293104/%EC%82%AC%EB%9E%91%EC%9D%98_%EA%B0%80%EC%A1%B1_%EC%9C%A4%EC%9B%90%EC%9E%A5%EB%8B%98_%EC%A0%95%EB%A9%B4_fr1576.png",
    summary: "KBS1 '사랑의 가족' 3030회 출연 2",
    featured: false
  },
  {
    id: 208,
    category: "방송 출연",
    title: "KBS 동행 441회 후반부에 437회 ‘윤정이의 겨울 붕어빵’ 후기 방송분 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307827/F674_2_ysucnz.png",
    summary: "KBS 동행 441회 후기 방송분 출연 2",
    featured: false
  },
  {
    id: 210,
    category: "방송 출연",
    title: "특종세상 351회 20년째 허리 굽은 채 통나무를 나르며 살아온 할머니1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307402/F136_GOMCAM_20250102_1950400666_xqosa0.png",
    summary: "특종세상 351회 출연 및 자문 1",
    featured: false
  },
  {
    id: 211,
    category: "방송 출연",
    title: "특종세상 351회 20년째 허리 굽은 채 통나무를 나르며 살아온 할머니2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307399/F137_GOMCAM_20250102_1951510757_cnfafa.png",
    summary: "특종세상 351회 출연 및 자문 2",
    featured: false
  },
  {
    id: 212,
    category: "방송 출연",
    title: "특종세상 351회 20년째 허리 굽은 채 통나무를 나르며 살아온 할머니3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307405/F138_GOMCAM_20250102_1953330454_ayqrv4.png",
    summary: "특종세상 351회 출연 및 자문 3",
    featured: false
  },
  {
    id: 213,
    category: "방송 출연",
    title: "SBS '그것이 알고 싶다' 방영분 1420회 세 용의자의 진실게임 - 영도 청학동 살인 사건 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775295062/KakaoTalk_20241207_211912951_08_evmvb8.jpg",
    summary: "SBS '그것이 알고 싶다' 1420회 출연 및 자문 1",
    featured: false
  },
  {
    id: 214,
    category: "방송 출연",
    title: "SBS '그것이 알고 싶다' 방영분 1420회 세 용의자의 진실게임 - 영도 청학동 살인 사건2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775295063/KakaoTalk_20241207_211912951_09_wj9ntc.jpg",
    summary: "SBS '그것이 알고 싶다' 1420회 출연 및 자문 2",
    featured: false
  },
  {
    id: 215,
    category: "방송 출연",
    title: "SBS '그것이 알고 싶다' 방영분 1420회 세 용의자의 진실게임 - 영도 청학동 살인 사건 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775295065/KakaoTalk_20241207_211912951_07_kzyycr.jpg",
    summary: "SBS '그것이 알고 싶다' 1420회 출연 및 자문 3",
    featured: false
  },
  {
    id: 401,
    category: "방송 출연",
    title: "EBS 나눔 0700 644회 상처투성이 엄마에게 온 선물 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775438137/EBS_%EB%82%98%EB%88%94_0700_644%ED%9A%8C_%EC%83%81%EC%B2%98%ED%88%AC%EC%84%B1%EC%9D%B4_%EC%97%84%EB%A7%88%EC%97%90%EA%B2%8C_%EC%98%A8_%EC%84%A0%EB%AC%BC_1_pjjrvv.png",
    summary: "EBS 나눔 0700 644회 출연 1",
    featured: false
  },
  {
    id: 402,
    category: "방송 출연",
    title: "EBS 나눔 0700 644회 상처투성이 엄마에게 온 선물 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775438136/EBS_%EB%82%98%EB%88%94_0700_644%ED%9A%8C_%EC%83%81%EC%B2%98%ED%88%AC%EC%84%B1%EC%9D%B4_%EC%97%84%EB%A7%88%EC%97%90%EA%B2%8C_%EC%98%A8_%EC%84%A0%EB%AC%BC_2_v5x5ux.png",
    summary: "EBS 나눔 0700 644회 출연 2",
    featured: false
  },
  {
    id: 403,
    category: "방송 출연",
    title: "EBS 나눔 0700 644회 상처투성이 엄마에게 온 선물 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775438142/EBS_%EB%82%98%EB%88%94_0700_644%ED%9A%8C_%EC%83%81%EC%B2%98%ED%88%AC%EC%84%B1%EC%9D%B4_%EC%97%84%EB%A7%88%EC%97%90%EA%B2%8C_%EC%98%A8_%EC%84%A0%EB%AC%BC_oerezb.png",
    summary: "EBS 나눔 0700 644회 출연 3",
    featured: false
  },
  {
    id: 404,
    category: "방송 출연",
    title: "TVN 화성인 X 파일 - 쓰레기집 2부작 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399476/TVN_%ED%99%94%EC%84%B1%EC%9D%B8_X_%ED%8C%8C%EC%9D%BC_-_%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91_2%EB%B6%80%EC%9E%91_1_wzz0z2.jpg",
    summary: "TVN 화성인 X 파일 출연 1",
    featured: false
  },
  {
    id: 405,
    category: "방송 출연",
    title: "TVN 화성인 X 파일 - 쓰레기집 2부작 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399478/TVN_%ED%99%94%EC%84%B1%EC%9D%B8_X_%ED%8C%8C%EC%9D%BC_-_%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91_2%EB%B6%80%EC%9E%91_2_oxiptx.jpg",
    summary: "TVN 화성인 X 파일 출연 2",
    featured: false
  },
  {
    id: 406,
    category: "방송 출연",
    title: "TVN 화성인 X 파일 - 쓰레기집 2부작 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399482/TVN_%ED%99%94%EC%84%B1%EC%9D%B8_X_%ED%8C%8C%EC%9D%BC_-_%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91_2%EB%B6%80%EC%9E%91_3_l6j9ls.jpg",
    summary: "TVN 화성인 X 파일 출연 3",
    featured: false
  },
  {
    id: 407,
    category: "방송 출연",
    title: "TV조선 가족 두 개의 문 - 화목하지 않은 부부와 그 사이에서 상처받아 온 아들의 이야기",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399498/TV%EC%A1%B0%EC%84%A0_%EA%B0%80%EC%A1%B1_%EB%91%90_%EA%B0%9C%EC%9D%98_%EB%AC%B8_%ED%99%94%EB%AA%A9%ED%95%98%EC%A7%80_%EC%95%8A%EC%9D%80_%EB%B6%80%EB%B6%80%EC%99%80_%EA%B7%B8_%EC%82%AC%EC%9D%B4%EC%97%90%EC%84%9C_%EC%83%81%EC%B2%98%EB%B0%9B%EC%95%84_%EC%98%A8_%EC%95%84%EB%93%A4%EC%9D%98_%EC%9D%B4%EC%95%BC%EA%B8%B0_gv9cgk.jpg",
    summary: "TV조선 가족 두 개의 문 출연 및 자문",
    featured: false
  },
  {
    id: 408,
    category: "방송 출연",
    title: "부부수업 파뿌리 16회 - 귀농 부부 전쟁의 시작 방송 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399502/%EB%B6%80%EB%B6%80%EC%88%98%EC%97%85_%ED%8C%8C%EB%BF%8C%EB%A6%AC_16%ED%9A%8C_-_%EA%B7%80%EB%86%8D_%EB%B6%80%EB%B6%80_%EC%A0%84%EC%9F%81%EC%9D%98_%EC%8B%9C%EC%9E%91_%EB%B0%A9%EC%86%A1_1_ejsu6t.jpg",
    summary: "부부수업 파뿌리 16회 출연 1",
    featured: false
  },
  {
    id: 410,
    category: "방송 출연",
    title: "부부수업 파뿌리 16회 - 귀농 부부 전쟁의 시작 방송 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399505/%EB%B6%80%EB%B6%80%EC%88%98%EC%97%85_%ED%8C%8C%EB%BF%8C%EB%A6%AC_16%ED%9A%8C_-_%EA%B7%80%EB%86%8D_%EB%B6%80%EB%B6%80_%EC%A0%84%EC%9F%81%EC%9D%98_%EC%8B%9C%EC%9E%91_%EB%B0%A9%EC%86%A1_2_l0glvd.jpg",
    summary: "부부수업 파뿌리 16회 출연 2",
    featured: false
  },
  {
    id: 411,
    category: "방송 출연",
    title: "연합뉴스 뉴스Y채널 다문화공동프로젝트 하모니",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399509/%EC%97%B0%ED%95%A9%EB%89%B4%EC%8A%A4_%EB%89%B4%EC%8A%A4Y%EC%B1%84%EB%84%90_%EB%8B%A4%EB%AC%B8%ED%99%94%EA%B3%B5%EB%8F%99%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%ED%95%98%EB%AA%A8%EB%8B%88_ygwkfc.jpg",
    summary: "연합뉴스 뉴스Y채널 하모니 출연",
    featured: false
  },
  {
    id: 412,
    category: "방송 출연",
    title: "JTBC 방송 위험한마음 3회 내아들은 시한 폭탄 부제 - 심리 치유 프로젝트 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399518/JTBC_%EB%B0%A9%EC%86%A1_%EC%9C%84%ED%97%98%ED%95%9C%EB%A7%88%EC%9D%8C_3%ED%9A%8C_%EB%82%B4%EC%95%84%EB%93%A4%EC%9D%80_%EC%8B%9C%ED%95%9C_%ED%8F%AD%ED%83%84_%EB%B6%80%EC%A0%9C_-_%EC%8B%AC%EB%A6%AC_%EC%B9%98%EC%9C%A0_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_1_m6n8pt.jpg",
    summary: "JTBC 위험한마음 3회 출연 1",
    featured: false
  },
  {
    id: 413,
    category: "방송 출연",
    title: "JTBC 방송 위험한마음 3회 내아들은 시한 폭탄 부제 - 심리 치유 프로젝트 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399521/JTBC_%EB%B0%A9%EC%86%A1_%EC%9C%84%ED%97%98%ED%95%9C%EB%A7%88%EC%9D%8C_3%ED%9A%8C_%EB%82%B4%EC%95%84%EB%93%A4%EC%9D%80_%EC%8B%9C%ED%95%9C_%ED%8F%AD%ED%83%84_%EB%B6%80%EC%A0%9C_-_%EC%8B%AC%EB%A6%AC_%EC%B9%98%EC%9C%A0_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_2_cdrnc4.jpg",
    summary: "JTBC 위험한마음 3회 출연 2",
    featured: false
  },
  {
    id: 414,
    category: "방송 출연",
    title: "JTBC 방송 위험한마음 3회 내아들은 시한 폭탄 부제 - 심리 치유 프로젝트 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399526/JTBC_%EB%B0%A9%EC%86%A1_%EC%9C%84%ED%97%98%ED%95%9C%EB%A7%88%EC%9D%8C_3%ED%9A%8C_%EB%82%B4%EC%95%84%EB%93%A4%EC%9D%80_%EC%8B%9C%ED%95%9C_%ED%8F%AD%ED%83%84_%EB%B6%80%EC%A0%9C_-_%EC%8B%AC%EB%A6%AC_%EC%B9%98%EC%9C%A0_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_3_l0crs1.jpg",
    summary: "JTBC 위험한마음 3회 출연 3",
    featured: false
  },
  {
    id: 415,
    category: "방송 출연",
    title: "KBS 굿모닝 대한민국 - 아내에게 집착하는 남편 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399534/KBS_%EA%B5%BF%EB%AA%A8%EB%8B%9D_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_-_%EC%95%84%EB%82%B4%EC%97%90%EA%B2%8C_%EC%A7%91%EC%B0%A9%ED%95%98%EB%8A%94_%EB%82%A8%ED%8E%B8_1_to9zqm.jpg",
    summary: "KBS 굿모닝 대한민국 출연 1",
    featured: false
  },
  {
    id: 416,
    category: "방송 출연",
    title: "KBS 굿모닝 대한민국 - 아내에게 집착하는 남편 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399538/KBS_%EA%B5%BF%EB%AA%A8%EB%8B%9D_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_-_%EC%95%84%EB%82%B4%EC%97%90%EA%B2%8C_%EC%A7%91%EC%B0%A9%ED%95%98%EB%8A%94_%EB%82%A8%ED%8E%B8_2_oag0d7.jpg",
    summary: "KBS 굿모닝 대한민국 출연 2",
    featured: false
  },
  {
    id: 417,
    category: "방송 출연",
    title: "KBS 굿모닝 대한민국 - 아내에게 집착하는 남편 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399542/KBS_%EA%B5%BF%EB%AA%A8%EB%8B%9D_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_-_%EC%95%84%EB%82%B4%EC%97%90%EA%B2%8C_%EC%A7%91%EC%B0%A9%ED%95%98%EB%8A%94_%EB%82%A8%ED%8E%B8_3_emyofh.jpg",
    summary: "KBS 굿모닝 대한민국 출연 3",
    featured: false
  },
  {
    id: 418,
    category: "방송 출연",
    title: "KBS2 굿모닝 대한민국 - 패밀리 상담소 - 공주병 아내 좀 말려주세요 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399546/KBS2_%EA%B5%BF%EB%AA%A8%EB%8B%9D_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_-_%ED%8C%A8%EB%B0%80%EB%A6%AC_%EC%83%81%EB%8B%B4%EC%86%8C_-%EA%B3%B5%EC%A3%BC%EB%B3%91_%EC%95%84%EB%82%B4_%EC%A2%80_%EB%A7%90%EB%A0%A4%EC%A3%BC%EC%84%B8%EC%9A%94_1_lvjrur.jpg",
    summary: "KBS2 굿모닝 대한민국 패밀리 상담소 출연 1",
    featured: false
  },
  {
    id: 419,
    category: "방송 출연",
    title: "KBS2 굿모닝 대한민국 - 패밀리 상담소 - 공주병 아내 좀 말려주세요 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399549/KBS2_%EA%B5%BF%EB%AA%A8%EB%8B%9D_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_-_%ED%8C%A8%EB%B0%80%EB%A6%AC_%EC%83%81%EB%8B%B4%EC%86%8C_-%EA%B3%B5%EC%A3%BC%EB%B3%91_%EC%95%84%EB%82%B4_%EC%A2%80_%EB%A7%90%EB%A0%A4%EC%A3%BC%EC%84%B8%EC%9A%94_2_mhpgup.jpg",
    summary: "KBS2 굿모닝 대한민국 패밀리 상담소 출연 2",
    featured: false
  },
  {
    id: 420,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 - 아내 노트의 비밀 출연 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399553/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%95%84%EB%82%B4_%EB%85%B8%ED%8A%B8%EC%9D%98_%EB%B9%84%EB%B0%80_%EC%B6%9C%EC%97%B0_1_dume9m.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 1",
    featured: false
  },
  {
    id: 421,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 - 아내 노트의 비밀 출연 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399557/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%95%84%EB%82%B4_%EB%85%B8%ED%8A%B8%EC%9D%98_%EB%B9%84%EB%B0%80_%EC%B6%9C%EC%97%B0_2_xyebjx.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 2",
    featured: false
  },
  {
    id: 422,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 - 외간남자 부를까 봐 집 지키는 남편 출연 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399561/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%99%B8%EA%B0%84%EB%82%A8%EC%9E%90_%EB%B6%80%EB%A5%BC%EA%B9%8C_%EB%B4%90_%EC%A7%91_%EC%A7%80%ED%82%A4%EB%8A%94_%EB%82%A8%ED%8E%B8_%EC%B6%9C%EC%97%B0_1_kwexhw.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 3",
    featured: false
  },
  {
    id: 423,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 - 외간남자 부를까 봐 집 지키는 남편 출연 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399565/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%99%B8%EA%B0%84%EB%82%A8%EC%9E%90_%EB%B6%80%EB%A5%BC%EA%B9%8C_%EB%B4%90_%EC%A7%91_%EC%A7%80%ED%82%A4%EB%8A%94_%EB%82%A8%ED%8E%B8_%EC%B6%9C%EC%97%B0_2_nzfnxq.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 4",
    featured: false
  },
  {
    id: 424,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 - 친정엄마 짝사랑 하는 딸 그녀가 친정에 못가는 이유 출연 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399568/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%B9%9C%EC%A0%95%EC%97%84%EB%A7%88_%EC%A7%9D%EC%82%AC%EB%9E%91_%ED%95%98%EB%8A%94_%EB%94%B8_%EA%B7%B8%EB%85%80%EA%B0%80_%EC%B9%9C%EC%A0%95%EC%97%90_%EB%AA%BB%EA%B0%80%EB%8A%94_%EC%9D%B4%EC%9C%A0_%EC%B6%9C%EC%97%B0_1_ihihbj.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 5",
    featured: false
  },
  {
    id: 425,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 - 친정엄마 짝사랑 하는 딸 그녀가 친정에 못가는 이유 출연",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399572/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%B9%9C%EC%A0%95%EC%97%84%EB%A7%88_%EC%A7%9D%EC%82%AC%EB%9E%91_%ED%95%98%EB%8A%94_%EB%94%B8_%EA%B7%B8%EB%85%80%EA%B0%80_%EC%B9%9C%EC%A0%95%EC%97%90_%EB%AA%BB%EA%B0%80%EB%8A%94_%EC%9D%B4%EC%9C%A0_%EC%B6%9C%EC%97%B0_ok89bv.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 6",
    featured: false
  },
  {
    id: 426,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 나이 많은 게 죄인가요 스킨십 안 해주는 남편 출연 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399576/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EB%82%98%EC%9D%B4_%EB%A7%8E%EC%9D%80_%EA%B2%8C_%EC%A3%84%EC%9D%B8%EA%B0%80%EC%9A%94_%EC%8A%A4%ED%82%A8%EC%8B%AD_%EC%95%88_%ED%95%B4%EC%A3%BC%EB%8A%94_%EB%82%A8%ED%8E%B8_%EC%B6%9C%EC%97%B0_1_bh6d3q.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 7",
    featured: false
  },
  {
    id: 427,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 나이 많은 게 죄인가요 스킨십 안 해주는 남편 출연 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399580/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EB%82%98%EC%9D%B4_%EB%A7%8E%EC%9D%80_%EA%B2%8C_%EC%A3%84%EC%9D%B8%EA%B0%80%EC%9A%94_%EC%8A%A4%ED%82%A8%EC%8B%AD_%EC%95%88_%ED%95%B4%EC%A3%BC%EB%8A%94_%EB%82%A8%ED%8E%B8_%EC%B6%9C%EC%97%B0_2_u3sg2x.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 8",
    featured: false
  },
  {
    id: 428,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 新 가족기획 나이 많은 게 죄인가요 스킨십 안 해주는 남편 출연 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399583/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EB%82%98%EC%9D%B4_%EB%A7%8E%EC%9D%80_%EA%B2%8C_%EC%A3%84%EC%9D%B8%EA%B0%80%EC%9A%94_%EC%8A%A4%ED%82%A8%EC%8B%AD_%EC%95%88_%ED%95%B4%EC%A3%BC%EB%8A%94_%EB%82%A8%ED%8E%B8_%EC%B6%9C%EC%97%B0_3_nog0hx.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 9",
    featured: false
  },
  {
    id: 429,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 출연 新 가족기획 자식만 줄줄이 낳아 놓고. 나몰라라 철없는 남편 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399588/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%EC%B6%9C%EC%97%B0_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EC%9E%90%EC%8B%9D%EB%A7%8C_%EC%A4%84%EC%A4%84%EC%9D%B4_%EB%82%B3%EC%95%84_%EB%86%93%EA%B3%A0._%EB%82%98%EB%AA%B0%EB%9D%BC%EB%9D%BC_%EC%B2%A0%EC%97%86%EB%8A%94_%EB%82%A8%ED%8E%B8_1_nvt6mg.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 10",
    featured: false
  },
  {
    id: 430,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 출연 新 가족기획 자식만 줄줄이 낳아 놓고. 나몰라라 철없는 남편 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399592/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%EC%B6%9C%EC%97%B0_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EC%9E%90%EC%8B%9D%EB%A7%8C_%EC%A4%84%EC%A4%84%EC%9D%B4_%EB%82%B3%EC%95%84_%EB%86%93%EA%B3%A0._%EB%82%98%EB%AA%B0%EB%9D%BC%EB%9D%BC_%EC%B2%A0%EC%97%86%EB%8A%94_%EB%82%A8%ED%8E%B8_2_quqd8o.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 11",
    featured: false
  },
  {
    id: 431,
    category: "방송 출연",
    title: "MBC 생방송 오늘의 아침 출연 新 가족기획 자식만 줄줄이 낳아 놓고. 나몰라라 철없는 남편 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399595/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%98%A4%EB%8A%98%EC%9D%98_%EC%95%84%EC%B9%A8_%EC%B6%9C%EC%97%B0_%E6%96%B0_%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EC%9E%90%EC%8B%9D%EB%A7%8C_%EC%A4%84%EC%A4%84%EC%9D%B4_%EB%82%B3%EC%95%84_%EB%86%93%EA%B3%A0._%EB%82%98%EB%AA%B0%EB%9D%BC%EB%9D%BC_%EC%B2%A0%EC%97%86%EB%8A%94_%EB%82%A8%ED%8E%B8_3_bc1igk.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 12",
    featured: false
  },
  {
    id: 432,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 - 심리상황극 방송 촬영 0331 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399611/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%8B%AC%EB%A6%AC%EC%83%81%ED%99%A9%EA%B7%B9_%EB%B0%A9%EC%86%A1_%EC%B4%AC%EC%98%81_0331_1_hrvcvn.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 13",
    featured: false
  },
  {
    id: 433,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 - 심리상황극 방송 촬영 0331 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399599/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%8B%AC%EB%A6%AC%EC%83%81%ED%99%A9%EA%B7%B9_%EB%B0%A9%EC%86%A1_%EC%B4%AC%EC%98%81_0331_2_fwsc8n.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 14",
    featured: false
  },
  {
    id: 434,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 - 내 남편의 이중생활 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399604/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EB%82%B4_%EB%82%A8%ED%8E%B8%EC%9D%98_%EC%9D%B4%EC%A4%91%EC%83%9D%ED%99%9C_1_azca0p.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 15",
    featured: false
  },
  {
    id: 435,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 - 내 남편의 이중생활 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399607/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EB%82%B4_%EB%82%A8%ED%8E%B8%EC%9D%98_%EC%9D%B4%EC%A4%91%EC%83%9D%ED%99%9C_2_szpzgw.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 16",
    featured: false
  },
  {
    id: 436,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 20150126 맨몸으로 나가라는 남편 30년전 일 때문에",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399615/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_20150126_%EB%A7%A8%EB%AA%B8%EC%9C%BC%EB%A1%9C_%EB%82%98%EA%B0%80%EB%9D%BC%EB%8A%94_%EB%82%A8%ED%8E%B8_30%EB%85%84%EC%A0%84_%EC%9D%BC_%EB%95%8C%EB%AC%B8%EC%97%90_xmn0so.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 17",
    featured: false
  },
  {
    id: 437,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 방송 - 무시당해도 참는 아내 촬영 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399619/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EB%B0%A9%EC%86%A1_-_%EB%AC%B4%EC%8B%9C%EB%8B%B9%ED%95%B4%EB%8F%84_%EC%B0%B8%EB%8A%94_%EC%95%84%EB%82%B4_%EC%B4%AC%EC%98%81_0311_1_skamfc.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 18",
    featured: false
  },
  {
    id: 438,
    category: "방송 출연",
    title: "MBC 생방송오늘아침 新가족기획 방송 - 무시당해도 참는 아내 촬영 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399623/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_%EB%B0%A9%EC%86%A1_-_%EB%AC%B4%EC%8B%9C%EB%8B%B9%ED%95%B4%EB%8F%84_%EC%B0%B8%EB%8A%94_%EC%95%84%EB%82%B4_%EC%B4%AC%EC%98%81_0311_2_ug5zr0.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 19",
    featured: false
  },
  {
    id: 439,
    category: "방송 출연",
    title: "MBC 생방송오늘의아침 新가족기획 - 젊어서는 바람피고 늙어서는 잔소리하는 남편 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399626/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%9D%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%A0%8A%EC%96%B4%EC%84%9C%EB%8A%94_%EB%B0%94%EB%9E%8C%ED%94%BC%EA%B3%A0_%EB%8A%99%EC%96%B4%EC%84%9C%EB%8A%94_%EC%9E%94%EC%86%8C%EB%A6%AC%ED%95%98%EB%8A%94_%EB%82%A8%ED%8E%B8_1_whe9kn.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 20",
    featured: false
  },
  {
    id: 440,
    category: "방송 출연",
    title: "MBC 생방송오늘의아침 新가족기획 - 젊어서는 바람피고 늙어서는 잔소리하는 남편 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399630/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%9D%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%A0%8A%EC%96%B4%EC%84%9C%EB%8A%94_%EB%B0%94%EB%9E%8C%ED%94%BC%EA%B3%A0_%EB%8A%99%EC%96%B4%EC%84%9C%EB%8A%94_%EC%9E%94%EC%86%8C%EB%A6%AC%ED%95%98%EB%8A%94_%EB%82%A8%ED%8E%B8_2_mmycxc.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 21",
    featured: false
  },
  {
    id: 441,
    category: "방송 출연",
    title: "MBC 생방송오늘의아침 新가족기획 - 젊어서는 바람피고 늙어서는 잔소리하는 남편",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399634/MBC_%EC%83%9D%EB%B0%A9%EC%86%A1%EC%98%A4%EB%8A%98%EC%9D%98%EC%95%84%EC%B9%A8_%E6%96%B0%EA%B0%80%EC%A1%B1%EA%B8%B0%ED%9A%8D_-_%EC%A0%8A%EC%96%B4%EC%84%9C%EB%8A%94_%EB%B0%94%EB%9E%8C%ED%94%BC%EA%B3%A0_%EB%8A%99%EC%96%B4%EC%84%9C%EB%8A%94_%EC%9E%94%EC%86%8C%EB%A6%AC%ED%95%98%EB%8A%94_%EB%82%A8%ED%8E%B8_mnjl18.jpg",
    summary: "MBC 생방송 오늘의 아침 출연 22",
    featured: false
  },
  {
    id: 442,
    category: "방송 출연",
    title: "MBN 파뿌리 5회 - 어린 부부의 과속 스캔들",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399645/MBN_%ED%8C%8C%EB%BF%8C%EB%A6%AC_5%ED%9A%8C_-_%EC%96%B4%EB%A6%B0_%EB%B6%80%EB%B6%80%EC%9D%98_%EA%B3%BC%EC%86%8D_%EC%8A%A4%EC%BA%94%EB%93%A4_yhb2d4.jpg",
    summary: "MBN 파뿌리 5회 출연",
    featured: false
  },
  {
    id: 443,
    category: "방송 출연",
    title: "MBN 파뿌리 12회 - 채팅부부의 비밀",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399648/MBN_%ED%8C%8C%EB%BF%8C%EB%A6%AC_12%ED%9A%8C_-_%EC%B1%84%ED%8C%85%EB%B6%80%EB%B6%80%EC%9D%98_%EB%B9%84%EB%B0%80_zi5lvn.jpg",
    summary: "MBN 파뿌리 12회 출연",
    featured: false
  },
  {
    id: 444,
    category: "방송 출연",
    title: "TV 조선 가족 두개의 문 아내의 집착 남편의 거짓말 편 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399652/TV_%EC%A1%B0%EC%84%A0_%EA%B0%80%EC%A1%B1_%EB%91%90%EA%B0%9C%EC%9D%98_%EB%AC%B8_%EC%95%84%EB%82%B4%EC%9D%98_%EC%A7%91%EC%B0%A9_%EB%82%A8%ED%8E%B8%EC%9D%98_%EA%B1%B0%EC%A7%93%EB%A7%90_%ED%8E%B8_%EC%9C%A4%EC%98%81%EC%A4%80_%EC%9B%90%EC%9E%A5%EB%8B%98_%EC%B6%9C%EC%97%B0_1_kg20sz.jpg",
    summary: "TV조선 가족 두 개의 문 출연 1",
    featured: false
  },
  {
    id: 445,
    category: "방송 출연",
    title: "TV 조선 가족 두개의 문 아내의 집착 남편의 거짓말 편 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399657/TV_%EC%A1%B0%EC%84%A0_%EA%B0%80%EC%A1%B1_%EB%91%90%EA%B0%9C%EC%9D%98_%EB%AC%B8_%EC%95%84%EB%82%B4%EC%9D%98_%EC%A7%91%EC%B0%A9_%EB%82%A8%ED%8E%B8%EC%9D%98_%EA%B1%B0%EC%A7%93%EB%A7%90_%ED%8E%B8_%EC%9C%A4%EC%98%81%EC%A4%80_%EC%9B%90%EC%9E%A5%EB%8B%98_%EC%B6%9C%EC%97%B0_2_olc6or.jpg",
    summary: "TV조선 가족 두 개의 문 출연 2",
    featured: false
  },
  {
    id: 446,
    category: "방송 출연",
    title: "KBS 7시 뉴스 인터뷰 - 주택가 파고든 홀덤펍 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400752/%EB%89%B4%EC%8A%A4_%EC%9D%B8%ED%84%B0%EB%B7%B0_-_%EC%A3%BC%ED%83%9D%EA%B0%80_%ED%8C%8C%EA%B3%A0%EB%93%A0_%ED%99%80%EB%8D%A4%ED%8E%8D_1_tzxldz.jpg",
    summary: "KBS 7시 뉴스 인터뷰 1",
    featured: false
  },
  {
    id: 447,
    category: "방송 출연",
    title: "KBS 7시 뉴스 인터뷰 - 주택가 파고든 홀덤펍 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400749/%EB%89%B4%EC%8A%A4_%EC%9D%B8%ED%84%B0%EB%B7%B0_-_%EC%A3%BC%ED%83%9D%EA%B0%80_%ED%8C%8C%EA%B3%A0%EB%93%A0_%ED%99%80%EB%8D%A4%ED%8E%8D_2_gp4n2a.jpg",
    summary: "KBS 7시 뉴스 인터뷰 2",
    featured: false
  },
  {
    id: 448,
    category: "방송 출연",
    title: "MBN 천기누설 6화 - 멈출 수 없는 식탐 폭식증 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775443249/MBN_%EC%B2%9C%EA%B8%B0%EB%88%84%EC%84%A4_6%ED%99%94_-_%EB%A9%88%EC%B6%9C_%EC%88%98_%EC%97%86%EB%8A%94_%EC%8B%9D%ED%83%90_%ED%8F%AD%EC%8B%9D%EC%A6%9D_1_chnjuc.png",
    summary: "MBN 천기누설 6화 출연 1",
    featured: false
  },
  {
    id: 449,
    category: "방송 출연",
    title: "MBN 천기누설 6화 - 멈출 수 없는 식탐 폭식증 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775443248/MBN_%EC%B2%9C%EA%B8%B0%EB%88%84%EC%84%A4_6%ED%99%94_-_%EB%A9%88%EC%B6%9C_%EC%88%98_%EC%97%86%EB%8A%94_%EC%8B%9D%ED%83%90_%ED%8F%AD%EC%8B%9D%EC%A6%9D_2_zxtoup.png",
    summary: "MBN 천기누설 6화 출연 2",
    featured: false
  },
  {
    id: 450,
    category: "방송 출연",
    title: "MBC 언니가 돌아왔다 재취업 프로젝트 방송 촬영",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399637/MBC_%EC%96%B8%EB%8B%88%EA%B0%80_%EB%8F%8C%EC%95%84%EC%99%94%EB%8B%A4_%EC%9E%AC%EC%B7%A8%EC%97%85_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%EB%B0%A9%EC%86%A1_%EC%B4%AC%EC%98%81_zkwalz.jpg",
    summary: "MBC 언니가 돌아왔다 출연",
    featured: false
  },
  {
    id: 451,
    category: "방송 출연",
    title: "tvN 엑소시스트 99회 색귀와 싸우는 여자",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399661/tvN_%EC%97%91%EC%86%8C%EC%8B%9C%EC%8A%A4%ED%8A%B8_99%ED%9A%8C_%EC%83%89%EA%B7%80%EC%99%80_%EC%8B%B8%EC%9A%B0%EB%8A%94_%EC%97%AC%EC%9E%90_cqh06a.jpg",
    summary: "tvN 엑소시스트 99회 출연",
    featured: false
  },
  {
    id: 452,
    category: "방송 출연",
    title: "tvN 엑소시스트 125화 고개가 뒤로 넘어가는 남자 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400768/tvN_%EC%97%91%EC%86%8C%EC%8B%9C%EC%8A%A4%ED%8A%B8_125%ED%99%94_%EA%B3%A0%EA%B0%9C%EA%B0%80_%EB%92%A4%EB%A1%9C_%EB%84%98%EC%96%B4%EA%B0%80%EB%8A%94_%EB%82%A8%EC%9E%90_1_np74t5.png",
    summary: "tvN 엑소시스트 125화 출연 1",
    featured: false
  },
  {
    id: 453,
    category: "방송 출연",
    title: "tvN 엑소시스트 125화 고개가 뒤로 넘어가는 남자 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400772/tvN_%EC%97%91%EC%86%8C%EC%8B%9C%EC%8A%A4%ED%8A%B8_125%ED%99%94_%EA%B3%A0%EA%B0%9C%EA%B0%80_%EB%92%A4%EB%A1%9C_%EB%84%98%EC%96%B4%EA%B0%80%EB%8A%94_%EB%82%A8%EC%9E%90_2_oxvile.png",
    summary: "tvN 엑소시스트 125화 출연 2",
    featured: false
  },
  {
    id: 454,
    category: "방송 출연",
    title: "tvN 엑소시스트 103화 매일 자살을 시도하는 여자 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400794/tvN_%EC%97%91%EC%86%8C%EC%8B%9C%EC%8A%A4%ED%8A%B8103%ED%99%94%EB%A7%A4%EC%9D%BC%EC%9E%90%EC%82%B4%EC%9D%84%EC%8B%9C%EB%8F%84%ED%95%98%EB%8A%94%EC%97%AC%EC%9E%90_1_loohb6.png",
    summary: "tvN 엑소시스트 103화 출연 1",
    featured: false
  },
  {
    id: 455,
    category: "방송 출연",
    title: "tvN 엑소시스트 103화 매일 자살을 시도하는 여자 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400798/tvN_%EC%97%91%EC%86%8C%EC%8B%9C%EC%8A%A4%ED%8A%B8103%ED%99%94%EB%A7%A4%EC%9D%BC%EC%9E%90%EC%82%B4%EC%9D%84%EC%8B%9C%EB%8F%84%ED%95%98%EB%8A%94%EC%97%AC%EC%9E%90_2_eluxsm.png",
    summary: "tvN 엑소시스트 103화 출연 2",
    featured: false
  },
  {
    id: 456,
    category: "방송 출연",
    title: "tvN 엑소시스트 103화 매일 자살을 시도하는 여자 3",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775400790/tvN_%EC%97%91%EC%86%8C%EC%8B%9C%EC%8A%A4%ED%8A%B8103%ED%99%94%EB%A7%A4%EC%9D%BC%EC%9E%90%EC%82%B4%EC%9D%84%EC%8B%9C%EB%8F%84%ED%95%98%EB%8A%94%EC%97%AC%EC%9E%90_3_icxtd9.jpg",
    summary: "tvN 엑소시스트 103화 출연 3",
    featured: false
  },
  {
    id: 457,
    category: "방송 출연",
    title: "주간 인물 Weekly People 선정 - 윤영준 원장님",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775399514/%EC%9D%B8%EB%AC%BC_%EC%8B%9C%EC%82%AC_%EC%A3%BC%EA%B0%84%EC%A7%80_Weekly_People_%EC%A3%BC%EA%B0%84_%EC%9D%B8%EB%AC%BC_%EC%84%A0%EC%A0%95_%EC%9C%A4%EC%98%81%EC%A4%80_%EC%9B%90%EC%9E%A5%EB%8B%98_ypsquf.jpg",
    summary: "인물 시사 주간지 Weekly People 주간 인물 선정",
    featured: false
  },
  {
    id: 101,
    category: "강연 및 특강",
    title: "울산 도산도서관 명상 강의",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775294462/%EB%8F%84%EC%82%B0%EB%8F%84%EC%84%9C%EA%B4%80_aslywn.jpg",
    summary: "울산 도산도서관에서 진행한 명상 강의",
    featured: false
  },
  {
    id: 102,
    category: "강연 및 특강",
    title: "고용지원센터-자문자답테라피&집단상담 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775304810/%EA%B3%A0%EC%9A%A9%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0-%EC%9E%90%EB%AC%B8%EC%9E%90%EB%8B%B5%ED%85%8C%EB%9D%BC%ED%94%BC_%EC%A7%91%EB%8B%A8%EC%83%81%EB%8B%B4_1_rswxtk.jpg",
    summary: "고용지원센터 자문자답테라피 및 집단상담 1차",
    featured: false
  },
  {
    id: 103,
    category: "강연 및 특강",
    title: "고용지원센터-자문자답테라피&집단상담 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298852/%EA%B3%A0%EC%9A%A9%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0-%EC%9E%90%EB%AC%B8%EC%9E%90%EB%8B%B5%ED%85%8C%EB%9D%BC%ED%94%BC_%EC%A7%91%EB%8B%A8%EC%83%81%EB%8B%B4_2_xfxh1o.jpg",
    summary: "고용지원센터 자문자답테라피 및 집단상담 2차",
    featured: false
  },
  {
    id: 104,
    category: "강연 및 특강",
    title: "경북권 경찰기동대 상담 및 강의 영천, 구미, 김천",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298845/%EA%B2%BD%EB%B6%81%EA%B6%8C_%EA%B2%BD%EC%B0%B0%EA%B8%B0%EB%8F%99%EB%8C%80_%EC%83%81%EB%8B%B4_%EB%B0%8F_%EA%B0%95%EC%9D%98_%EC%98%81%EC%B2%9C_%EA%B5%AC%EB%AF%B8_%EA%B9%80%EC%B2%9C_re6thi.jpg",
    summary: "경북권 경찰기동대 상담 및 강의 (영천, 구미, 김천)",
    featured: false
  },
  {
    id: 105,
    category: "강연 및 특강",
    title: "경북권 경찰기동대 상담 및 강의 영천, 구미, 김천 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775301930/%EA%B2%BD%EB%B6%81%EA%B6%8C_%EA%B2%BD%EC%B0%B0%EA%B8%B0%EB%8F%99%EB%8C%80_%EC%83%81%EB%8B%B4_%EB%B0%8F_%EA%B0%95%EC%9D%98_%EC%98%81%EC%B2%9C_%EA%B5%AC%EB%AF%B8_%EA%B9%80%EC%B2%9C_2_g39hpf.jpg",
    summary: "경북권 경찰기동대 상담 및 강의 (영천, 구미, 김천) 2차",
    featured: false
  },
  {
    id: 106,
    category: "강연 및 특강",
    title: "경북고용성장지원센터 내면아이 및 미해결과제 실습 및 강의1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298856/%EA%B2%BD%EB%B6%81%EA%B3%A0%EC%9A%A9%EC%84%B1%EC%9E%A5%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0_%EB%82%B4%EB%A9%B4%EC%95%84%EC%9D%B4_%EB%B0%8F_%EB%AF%B8%ED%95%B4%EA%B2%B0%EA%B3%BC%EC%A0%9C_%EC%8B%A4%EC%8A%B5_%EB%B0%8F_%EA%B0%95%EC%9D%981_djkplp.jpg",
    summary: "경북고용성장지원센터 내면아이 및 미해결과제 실습 및 강의 1차",
    featured: false
  },
  {
    id: 107,
    category: "강연 및 특강",
    title: "경북고용성장지원센터 내면아이 및 미해결과제 실습 및 강의2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298854/%EA%B2%BD%EB%B6%81%EA%B3%A0%EC%9A%A9%EC%84%B1%EC%9E%A5%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0_%EB%82%B4%EB%A9%B4%EC%95%84%EC%9D%B4_%EB%B0%8F_%EB%AF%B8%ED%95%B4%EA%B2%B0%EA%B3%BC%EC%A0%9C_%EC%8B%A4%EC%8A%B5_%EB%B0%8F_%EA%B0%95%EC%9D%982_ze6kjn.jpg",
    summary: "경북고용성장지원센터 내면아이 및 미해결과제 실습 및 강의 2차",
    featured: false
  },
  {
    id: 108,
    category: "강연 및 특강",
    title: "경북선거관리위원회 강의 실시1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298887/%EA%B2%BD%EB%B6%81%EC%84%A0%EA%B1%B0%EA%B4%80%EB%A6%AC%EC%9C%84%EC%9B%90%ED%9A%8C_%EA%B0%95%EC%9D%98_%EC%8B%A4%EC%8B%9C1_vskzrc.jpg",
    summary: "경북선거관리위원회 강의 실시 1차",
    featured: false
  },
  {
    id: 109,
    category: "강연 및 특강",
    title: "경북선거관리위원회 강의 실시2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298885/%EA%B2%BD%EB%B6%81%EC%84%A0%EA%B1%B0%EA%B4%80%EB%A6%AC%EC%9C%84%EC%9B%90%ED%9A%8C_%EA%B0%95%EC%9D%98_%EC%8B%A4%EC%8B%9C2_qft41o.jpg",
    summary: "경북선거관리위원회 강의 실시 2차",
    featured: false
  },
  {
    id: 110,
    category: "강연 및 특강",
    title: "경북지방경찰청 기동1중대 전, 의경 심리교육",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298897/%EA%B2%BD%EB%B6%81%EC%A7%80%EB%B0%A9%EA%B2%BD%EC%B0%B0%EC%B2%AD_%EA%B8%B0%EB%8F%991%EC%A4%91%EB%8C%80_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%8B%AC%EB%A6%AC%EA%B5%90%EC%9C%A1_wjm5ig.jpg",
    summary: "경북지방경찰청 기동1중대 전, 의경 심리교육",
    featured: false
  },
  {
    id: 111,
    category: "강연 및 특강",
    title: "경북칠곡경찰서 전, 의경 집단 및 개인상담 진행 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298891/%EA%B2%BD%EB%B6%81%EC%B9%A0%EA%B3%A1%EA%B2%BD%EC%B0%B0%EC%84%9C_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%A7%91%EB%8B%A8_%EB%B0%8F_%EA%B0%9C%EC%9D%B8%EC%83%81%EB%8B%B4_%EC%A7%84%ED%96%89_1_xgtat9.jpg",
    summary: "경북칠곡경찰서 전, 의경 집단 및 개인상담 진행 1차",
    featured: false
  },
  {
    id: 112,
    category: "강연 및 특강",
    title: "경북칠곡경찰서 전, 의경 집단 및 개인상담 진행 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298889/%EA%B2%BD%EB%B6%81%EC%B9%A0%EA%B3%A1%EA%B2%BD%EC%B0%B0%EC%84%9C_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%A7%91%EB%8B%A8_%EB%B0%8F_%EA%B0%9C%EC%9D%B8%EC%83%81%EB%8B%B4_%EC%A7%84%ED%96%89_2_hhhmnm.jpg",
    summary: "경북칠곡경찰서 전, 의경 집단 및 개인상담 진행 2차",
    featured: false
  },
  {
    id: 113,
    category: "강연 및 특강",
    title: "경상북도 소방공무원 찾아가는 상담실",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298861/%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84_%EC%86%8C%EB%B0%A9%EA%B3%B5%EB%AC%B4%EC%9B%90_%EC%B0%BE%EC%95%84%EA%B0%80%EB%8A%94_%EC%83%81%EB%8B%B4%EC%8B%A4_wqbqtt.jpg",
    summary: "경상북도 소방공무원 대상 찾아가는 상담실 운영",
    featured: false
  },
  {
    id: 114,
    category: "강연 및 특강",
    title: "경주경찰서 전, 의경 심리교육 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298894/%EA%B2%BD%EC%A3%BC%EA%B2%BD%EC%B0%B0%EC%84%9C_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%8B%AC%EB%A6%AC%EA%B5%90%EC%9C%A1_1_vh0eap.jpg",
    summary: "경주경찰서 전, 의경 심리교육 1차",
    featured: false
  },
  {
    id: 115,
    category: "강연 및 특강",
    title: "경주경찰서 전, 의경 심리교육 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298892/%EA%B2%BD%EC%A3%BC%EA%B2%BD%EC%B0%B0%EC%84%9C_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%8B%AC%EB%A6%AC%EA%B5%90%EC%9C%A1_2_um3gbf.jpg",
    summary: "경주경찰서 전, 의경 심리교육 2차",
    featured: false
  },
  {
    id: 116,
    category: "강연 및 특강",
    title: "계명문화대학교 고객심리 특강",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298898/%EA%B3%84%EB%AA%85%EB%AC%B8%ED%99%94%EB%8C%80%ED%95%99%EA%B5%90_%EA%B3%A0%EA%B0%9D%EC%8B%AC%EB%A6%AC_%ED%8A%B9%EA%B0%95_tdtkxg.jpg",
    summary: "계명문화대학교 고객심리 특강 진행",
    featured: false
  },
  {
    id: 117,
    category: "강연 및 특강",
    title: "구미 경찰서 방범순찰대 전, 의경 정신건강상담 특강 진행 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298848/%EA%B5%AC%EB%AF%B8_%EA%B2%BD%EC%B0%B0%EC%84%9C_%EB%B0%A9%EB%B2%94%EC%88%9C%EC%B0%B0%EB%8C%80_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%A0%95%EC%8B%A0%EA%B1%B4%EA%B0%95%EC%83%81%EB%8B%B4_%ED%8A%B9%EA%B0%95_%EC%A7%84%ED%96%89_151119_y1ehyl.jpg",
    summary: "구미 경찰서 방범순찰대 전, 의경 정신건강상담 특강 1차",
    featured: false
  },
  {
    id: 118,
    category: "강연 및 특강",
    title: "구미 경찰서 방범순찰대 전, 의경 정신건강상담 특강 진행 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298846/%EA%B5%AC%EB%AF%B8_%EA%B2%BD%EC%B0%B0%EC%84%9C_%EB%B0%A9%EB%B2%94%EC%88%9C%EC%B0%B0%EB%8C%80_%EC%A0%84_%EC%9D%98%EA%B2%BD_%EC%A0%95%EC%8B%A0%EA%B1%B4%EA%B0%95%EC%83%81%EB%8B%B4_%ED%8A%B9%EA%B0%95_%EC%A7%84%ED%96%89_151119_2_owk3hy.jpg",
    summary: "구미 경찰서 방범순찰대 전, 의경 정신건강상담 특강 2차",
    featured: false
  },
  {
    id: 119,
    category: "강연 및 특강",
    title: "구미경찰서 특강1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298900/%EA%B5%AC%EB%AF%B8%EA%B2%BD%EC%B0%B0%EC%84%9C_%ED%8A%B9%EA%B0%951_rknhyg.jpg",
    summary: "구미경찰서 특강 1차",
    featured: false
  },
  {
    id: 120,
    category: "강연 및 특강",
    title: "구미정보고등학교 심리검사&진로적성검사와 진로교육 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298859/%EA%B5%AC%EB%AF%B8%EC%A0%95%EB%B3%B4%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90_%EC%8B%AC%EB%A6%AC%EA%B2%80%EC%82%AC_%EC%A7%84%EB%A1%9C%EC%A0%81%EC%84%B1%EA%B2%80%EC%82%AC%EC%99%80_%EC%A7%84%EB%A1%9C%EA%B5%90%EC%9C%A1_1_eiqyij.jpg",
    summary: "구미정보고등학교 심리검사 및 진로교육 1차",
    featured: false
  },
  {
    id: 121,
    category: "강연 및 특강",
    title: "구미정보고등학교 심리검사&진로적성검사와 진로교육 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298858/%EA%B5%AC%EB%AF%B8%EC%A0%95%EB%B3%B4%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90_%EC%8B%AC%EB%A6%AC%EA%B2%80%EC%82%AC_%EC%A7%84%EB%A1%9C%EC%A0%81%EC%84%B1%EA%B2%80%EC%82%AC%EC%99%80_%EC%A7%84%EB%A1%9C%EA%B5%90%EC%9C%A1_2_vmfwmi.jpg",
    summary: "구미정보고등학교 심리검사 및 진로교육 2차",
    featured: false
  },
  {
    id: 122,
    category: "강연 및 특강",
    title: "김천경찰서 315전경대 개인 및 집단 상담",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298883/%EA%B9%80%EC%B2%9C%EA%B2%BD%EC%B0%B0%EC%84%9C_315%EC%A0%84%EA%B2%BD%EB%8C%80_%EA%B0%9C%EC%9D%B8_%EB%B0%8F_%EC%A7%91%EB%8B%A8_%EC%83%81%EB%8B%B4_xfirab.jpg",
    summary: "김천경찰서 315전경대 개인 및 집단 상담 진행",
    featured: false
  },
  {
    id: 123,
    category: "강연 및 특강",
    title: "서부산 다문화 가족 지원센터 출강",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775302611/%EC%84%9C%EB%8C%80%EA%B5%AC_%EB%8B%A4%EB%AC%B8%ED%99%94_%EA%B0%80%EC%A1%B1_%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0_%EC%B6%9C%EA%B0%95_%EC%9C%A4%EC%98%81%EC%A4%80_%EC%9B%90%EC%9E%A5%EB%8B%98_ebdfvg.jpg",
    summary: "서부산 다문화 가족 지원센터 출강 강의",
    featured: false
  },
  {
    id: 124,
    category: "강연 및 특강",
    title: "양산교육지원청Wee센터 부모교육",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298867/%EC%96%91%EC%82%B0%EA%B5%90%EC%9C%A1%EC%A7%80%EC%9B%90%EC%B2%ADWee%EC%84%BC%ED%84%B0_%EB%B6%80%EB%AA%A8%EA%B5%90%EC%9C%A1_hut8b6.jpg",
    summary: "양산교육지원청 Wee센터 부모교육 특강",
    featured: false
  },
  {
    id: 125,
    category: "강연 및 특강",
    title: "울산 동구 정신건강증진센터에서 부모교육 특강실시 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298843/%EC%9A%B8%EC%82%B0_%EB%8F%99%EA%B5%AC_%EC%A0%95%EC%8B%A0%EA%B1%B4%EA%B0%95%EC%A6%9D%EC%A7%84%EC%84%BC%ED%84%B0%EC%97%90%EC%84%9C_%EB%B6%80%EB%AA%A8%EA%B5%90%EC%9C%A1_%ED%8A%B9%EA%B0%95%EC%8B%A4%EC%8B%9C_1_sv6nrl.jpg",
    summary: "울산 동구 정신건강증진센터 부모교육 1차",
    featured: false
  },
  {
    id: 126,
    category: "강연 및 특강",
    title: "울산 동구 정신건강증진센터에서 부모교육 특강실시 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298841/%EC%9A%B8%EC%82%B0_%EB%8F%99%EA%B5%AC_%EC%A0%95%EC%8B%A0%EA%B1%B4%EA%B0%95%EC%A6%9D%EC%A7%84%EC%84%BC%ED%84%B0%EC%97%90%EC%84%9C_%EB%B6%80%EB%AA%A8%EA%B5%90%EC%9C%A1_%ED%8A%B9%EA%B0%95%EC%8B%A4%EC%8B%9C_2_uins69.jpg",
    summary: "울산 동구 정신건강증진센터 부모교육 2차",
    featured: false
  },
  {
    id: 127,
    category: "강연 및 특강",
    title: "울산 삼남중학교 생명사랑존중교육 강의 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298876/%EC%9A%B8%EC%82%B0_%EC%82%BC%EB%82%A8%EC%A4%91%ED%95%99%EA%B5%90_%EC%83%9D%EB%AA%85%EC%82%AC%EB%9E%91%EC%A1%B4%EC%A4%91%EA%B5%90%EC%9C%A1_%EA%B0%95%EC%9D%98_1_utw9wt.jpg",
    summary: "울산 삼남중학교 생명사랑존중교육 1차",
    featured: false
  },
  {
    id: 128,
    category: "강연 및 특강",
    title: "울산 삼남중학교 생명사랑존중교육 강의 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298874/%EC%9A%B8%EC%82%B0_%EC%82%BC%EB%82%A8%EC%A4%91%ED%95%99%EA%B5%90_%EC%83%9D%EB%AA%85%EC%82%AC%EB%9E%91%EC%A1%B4%EC%A4%91%EA%B5%90%EC%9C%A1_%EA%B0%95%EC%9D%98_2_sqwu8l.jpg",
    summary: "울산 삼남중학교 생명사랑존중교육 2차",
    featured: false
  },
  {
    id: 129,
    category: "강연 및 특강",
    title: "전국 코레일 전담 심리상담사 워크샵",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298872/%EC%A0%84%EA%B5%AD_%EC%BD%94%EB%A0%88%EC%9D%BC_%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%82%AC_%EC%9B%8C%ED%81%AC%EC%83%B5_al2doc.jpg",
    summary: "전국 코레일 전담 심리상담사 워크샵 참여 및 강의",
    featured: false
  },
  {
    id: 130,
    category: "강연 및 특강",
    title: "울산 시청 특강 실시 하였습니다 주제 트라우마",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775302879/%EC%9A%B8%EC%82%B0_%EC%8B%9C%EC%B2%AD_%ED%8A%B9%EA%B0%95_%EC%8B%A4%EC%8B%9C_%ED%95%98%EC%98%80%EC%8A%B5%EB%8B%88%EB%8B%A4_%EC%A3%BC%EC%A0%9C%ED%8A%B8%EB%9D%BC%EC%9A%B0%EB%A7%88_rntnhp.jpg",
    summary: "울산 시청 특강 (주제: 트라우마)",
    featured: false
  },
  {
    id: 131,
    category: "강연 및 특강",
    title: "월서 중학교 진로 특강 입니다",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298881/%EC%9B%94%EC%84%9C_%EC%A4%91%ED%95%99%EA%B5%90_%EC%A7%84%EB%A1%9C_%ED%8A%B9%EA%B0%95_%EC%9E%85%EB%8B%88%EB%8B%A4_v72hh1.jpg",
    summary: "월서 중학교 진로 특강 진행",
    featured: false
  },
  {
    id: 132,
    category: "강연 및 특강",
    title: "직업인 초청 특강 동문고등학교에서 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298880/%EC%A7%81%EC%97%85%EC%9D%B8_%EC%B4%88%EC%B2%AD_%ED%8A%B9%EA%B0%951_%EB%8F%99%EB%AC%B8%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90%EC%97%90%EC%84%9C_kfs9e2.jpg",
    summary: "동문고등학교 직업인 초청 특강 1차",
    featured: false
  },
  {
    id: 133,
    category: "강연 및 특강",
    title: "직업인 초청 특강 동문고등학교에서 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298878/%EC%A7%81%EC%97%85%EC%9D%B8_%EC%B4%88%EC%B2%AD_%ED%8A%B9%EA%B0%951_%EB%8F%99%EB%AC%B8%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90%EC%97%90%EC%84%9C_2_yf9bic.jpg",
    summary: "동문고등학교 직업인 초청 특강 2차",
    featured: false
  },
  {
    id: 134,
    category: "강연 및 특강",
    title: "칠곡소방서 집단상담 1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298865/%EC%B9%A0%EA%B3%A1%EC%86%8C%EB%B0%A9%EC%84%9C_%EC%A7%91%EB%8B%A8%EC%83%81%EB%8B%B4_1_suugoy.jpg",
    summary: "칠곡소방서 집단상담 1차",
    featured: false
  },
  {
    id: 135,
    category: "강연 및 특강",
    title: "칠곡소방서 집단상담 2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298863/%EC%B9%A0%EA%B3%A1%EC%86%8C%EB%B0%A9%EC%84%9C_%EC%A7%91%EB%8B%A8%EC%83%81%EB%8B%B4_2_gr4ndu.jpg",
    summary: "칠곡소방서 집단상담 2차",
    featured: false
  },
  {
    id: 136,
    category: "강연 및 특강",
    title: "학남중 진로특강 실시1",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298870/%ED%95%99%EB%82%A8%EC%A4%91_%EC%A7%84%EB%A1%9C%ED%8A%B9%EA%B0%95_%EC%8B%A4%EC%8B%9C1_anfyva.jpg",
    summary: "학남중 진로특강 1차",
    featured: false
  },
  {
    id: 137,
    category: "강연 및 특강",
    title: "학남중 진로특강 실시2",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775298869/%ED%95%99%EB%82%A8%EC%A4%91_%EC%A7%84%EB%A1%9C%ED%8A%B9%EA%B0%95_%EC%8B%A4%EC%8B%9C2_yiigii.jpg",
    summary: "학남중 진로특강 2차",
    featured: false
  },
  {
    id: 1,
    category: "방송 출연",
    title: "KBS 뉴스 인터뷰 출연",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=600",
    summary: "성범죄 심리상담 관련 전문가 인터뷰",
    featured: false
  },
  {
    id: 2,
    category: "강연 및 특강",
    title: "공공기관 심리교육 특강",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600",
    summary: "재범방지 교육 및 심리치료 강연",
    featured: false
  },
  {
    id: 4,
    category: "교육 및 프로그램",
    title: "기업 임직원 성인지 감수성 교육",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600",
    summary: "건강한 조직 문화를 위한 특강",
    featured: false
  },
  {
    id: 5,
    category: "방송 출연",
    title: "SBS 시사교양 프로그램 자문",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=600",
    summary: "범죄 심리 분석 및 행동 교정 자문",
    featured: false
  },
  {
    id: 6,
    category: "강연 및 특강",
    title: "대학교 범죄심리학 특강",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    summary: "심리치료의 실제와 임상 사례",
    featured: false
  },
  {
    id: 7,
    category: "라디오 및 인터뷰",
    title: "TBN 교통방송 PD 님과 함께, 심리상담 코너 진행",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775294702/20190607_094719_fx6e6a.jpg",
    summary: "TBN 교통방송 PD 님과 함께, 심리상담 코너 진행",
    featured: false
  },
  {
    id: 8,
    category: "교육 및 프로그램",
    title: "교정시설 재소자 교화 프로그램",
    image: "https://images.unsplash.com/photo-1577563908411-50cb989766a3?auto=format&fit=crop&q=80&w=600",
    summary: "인지왜곡 수정 및 행동 통제 훈련",
    featured: false
  },
  {
    id: 9,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 03월 15일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292903/%EB%8C%80%ED%86%B5%EB%A0%B9_%EC%84%A0%EA%B1%B0%EB%A5%BC_%ED%86%B5%ED%95%B4%EC%84%9C_%EB%90%98%EC%A7%9A%EC%96%B4%EB%B3%B4%EB%8A%94_%ED%88%AC%ED%91%9C_%EC%8B%AC%EB%A6%AC_zpm2rh.png",
    summary: "『대통령 선거를 통해서 되짚어보는 투표 심리』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 10,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 03월 29일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292907/%EC%8B%AC%EB%A6%AC%ED%95%99_%EA%B4%80%EC%A0%90%EC%97%90%EC%84%9C_%EB%B0%94%EB%9D%BC%EB%B3%B4%EB%8A%94_%EC%8B%9C%EA%B0%84_dyn5uz.jpg",
    summary: "『심리학 관점에서 바라보는 ‘시간’』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 11,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 04월 12일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292905/%EB%B4%84%EB%A7%8C_%EB%90%98%EB%A9%B4_%EC%99%9C_%EC%9A%B0%EC%9A%B8%ED%95%A0%EA%B9%8C_%EA%B3%84%EC%A0%88%EC%84%B1_%EC%9A%B0%EC%9A%B8_jur08i.png",
    summary: "『’봄만 되면 왜 우울할까? ‘계절성 우울’』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 12,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 04월 26일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292910/%EB%82%B4%EA%B0%80_%ED%95%98%EB%A9%B4_%EB%A1%9C%EB%A7%A8%EC%8A%A4_%EB%82%A8%EC%9D%B4_%ED%95%98%EB%A9%B4_%EB%B6%88fbs_ysvvoh.jpg",
    summary: "『내가 하면 로맨스, 남이 하면 불륜?! ‘내로남불’심리』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 13,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 05월 10일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292904/%EB%A7%88%EC%8A%A4%ED%81%AC%EC%8B%AC%EB%A6%AC_cvkl4y.png",
    summary: "『마스크를 쓰고 벗는 얼굴속에 감춰진 심리』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 15,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 06월 07일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292909/%EA%B1%B4%EA%B0%95%ED%95%9C_%ED%8C%AC%EB%8D%A4_eoj2le.png",
    summary: "『건강한 팬덤 문화를 위한 심리적 조언』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 16,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 07월 05일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292906/%EC%84%B1%EC%9D%B8%EC%95%84%EC%9D%B4_jcuxyn.png",
    summary: "『몸은 어른, 마음은 아이 ‘ 성인아이’』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 17,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 07월 19일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292905/%EB%B6%80%EB%B6%80%EC%9D%98%EC%82%AC%EC%86%8C%ED%86%B5_wzc83z.png",
    summary: "『부부간 의사소통을 위한 심리 조언』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 18,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 08월 02일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292905/%EB%B9%84%EC%96%B8%EC%96%B4_jw6jea.png",
    summary: "『비언어적 의사소통』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 19,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 08월 16일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775300334/%EC%BD%9C%ED%8F%AC%EB%B9%84%EC%95%84_w16bxn.png",
    summary: "『전화 공포증 ‘콜 포비아’』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 20,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 08월 30일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292907/%EC%95%84%EC%9D%B4%EC%97%90%EA%B2%8C_%ED%99%94%EB%82%B4%EB%8A%94_ykgs0e.png",
    summary: "『아이에게 화를 내는 부모의 심리』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 21,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 09월 13일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292909/%EA%B0%80%EC%A1%B1%EC%9D%98_%EC%9D%98%EB%AF%B8_lksrzx.png",
    summary: "『명절 연휴를 통해 되짚어보는 가족의 의미』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 22,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 09월 27일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292910/%EB%82%A8%EC%9D%84_%ED%96%89%EB%B3%B5%ED%95%98%EA%B2%8C_k7jubj.png",
    summary: "『남을 행복하게 해주려는 마음』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 23,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 10월 11일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775300469/%EC%B2%AD%EA%B0%9C%EA%B5%AC%EB%A6%AC_ejqpsc.png",
    summary: "『반대로 하고 싶은 ‘청개구리 심리’』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 24,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 10월 25일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292906/%EC%86%8C%EB%B9%84%EC%8B%AC%EB%A6%AC%EC%9C%84%EC%B6%95_zvqo4w.png",
    summary: "『위축되는 소비심리… 이유는?』 이라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 25,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 11월 08일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292911/%EB%8B%A4%EB%A5%B8_%EC%82%AC%EB%9E%8C%EA%B3%BC_%EB%B9%84%EA%B5%90_bedyv9.png",
    summary: "『다른 사람과 비교하는 심리』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 26,
    category: "라디오 및 인터뷰",
    title: "라디오세상 울산만사 [ 2022년 11월 22일]",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775292906/%EC%8B%AB%EC%96%B4%ED%95%98%EB%8A%94_%EC%82%AC%EB%9E%8C%EC%9D%84_%EB%8B%AE%EB%8A%94_%EC%9D%B4%EC%9C%A0_lebvhk.png",
    summary: "『사람들은 왜 싫어하는 사람을 닮아갈까?』 라는 주제로 방송하였습니다.",
    featured: false
  },
  {
    id: 301,
    category: "강연 및 특강",
    title: "문수실버복지관 강의",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775308068/%EB%AC%B8%EC%88%98%EC%8B%A4%EB%B2%84%EB%B3%B5%EC%A7%80%EA%B4%80_%EA%B0%95%EC%9D%98_ux66dl.png",
    summary: "문수실버복지관 강의",
    featured: false
  },
  {
    id: 302,
    category: "강연 및 특강",
    title: "상주경찰서 의경 대상 심리상담 강의",
    image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775307954/%EC%83%81%EC%A3%BC%EA%B2%BD%EC%B0%B0%EC%84%9C%EC%97%90%EC%84%9C_%EC%9D%98%EA%B2%BD%EC%9D%84_%EB%8C%80%EC%83%81%EC%9C%BC%EB%A1%9C_%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%9D%98_%EC%8B%A4%EC%A0%9C%EC%97%90_%EB%8C%80%ED%95%B4_%EA%B0%95%EC%9D%98%EB%A5%BC_%ED%95%98%EC%98%80%EC%8A%B5%EB%8B%88%EB%8B%A4._mi1jtl.jpg",
    summary: "상주경찰서에서 의경을 대상으로 심리상담의 실제에 대해 강의를 하였습니다.",
    featured: false
  }
];

const MediaAppearancePage = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const categoryMenuRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "전체") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Wait for layout update (Section 3 removal)
      setTimeout(() => {
        if (galleryRef.current) {
          const element = galleryRef.current;
          // Offset: Navbar (80px) + Sticky Menu height (~100px)
          const offset = 180; 
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const filteredData = activeCategory === "전체" 
    ? MEDIA_DATA 
    : MEDIA_DATA.filter(item => item.category === activeCategory);

  const featuredData = MEDIA_DATA.filter(item => item.featured);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section 
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775281989/5cb3f455097954a32bb3e0d4ff55aaad_vifxd5.png")' }}
      >
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-black mb-6 font-display backdrop-blur-md border border-white/30"
            >
              <Play className="w-4 h-4" />
              Official Archive
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight break-keep font-display drop-shadow-lg"
            >
              대표원장 방송 출연 · 강연
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 leading-relaxed break-keep font-medium drop-shadow-md"
            >
              윤영준 대표원장의 방송 출연, 강연, 인터뷰, 라디오, 교육 활동을 체계적으로 정리한 공식 아카이브 페이지입니다. 방송, 강연, 인터뷰, 교육 프로그램 등 다양한 현장에서의 실제 활동 기록을 확인하실 수 있습니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Category Filter */}
      <section 
        ref={categoryMenuRef}
        className="py-8 sticky top-20 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="container-custom">
          <div className="flex flex-wrap md:flex-nowrap md:overflow-x-auto hide-scrollbar gap-2 md:gap-3 pb-2 -mb-2 justify-center md:justify-start">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`whitespace-nowrap px-3.5 py-2 md:px-6 md:py-2.5 rounded-full text-[13px] md:text-sm font-bold transition-all ${
                  activeCategory === category
                    ? 'bg-primary-deep text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-deep/30 hover:bg-emerald-50/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Section */}
      {activeCategory === "전체" && (
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-black text-slate-900 font-display">대표 활동</h2>
              <div className="h-px bg-slate-200 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featuredData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div 
                    className="aspect-video rounded-2xl overflow-hidden mb-5 relative bg-slate-200"
                    onClick={() => setSelectedImage(item.image)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-black text-primary-deep tracking-wider uppercase">{item.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-deep transition-colors line-clamp-2 break-keep">{item.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{item.summary}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. All Archive Gallery */}
      <section ref={galleryRef} className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-slate-900 font-display">
              {activeCategory === "전체" ? "전체 아카이브" : activeCategory}
            </h2>
            <div className="h-px bg-slate-200 flex-grow" />
          </div>
          
          {activeCategory === "전체" ? (
            <div className="space-y-16">
              {CATEGORIES.filter(c => c !== "전체").map((category) => {
                const categoryItems = MEDIA_DATA.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 font-display border-l-4 border-primary-deep pl-3">
                      {category}
                    </h3>
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                      <AnimatePresence mode="popLayout">
                        {categoryItems.slice(0, 8).map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group cursor-pointer"
                          >
                            <div 
                              className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-slate-100"
                              onClick={() => setSelectedImage(item.image)}
                            >
                              <img 
                                src={item.image} 
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase">{item.category}</span>
                              <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-deep transition-colors line-clamp-2 break-keep leading-snug">{item.title}</h3>
                              <p className="text-sm text-slate-500 line-clamp-1">{item.summary}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                    
                    {categoryItems.length > 8 && (
                      <div className="mt-10 flex justify-center">
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className="px-8 py-3 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-primary-deep/30 transition-all flex items-center gap-2"
                        >
                          {category} 더보기
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              <AnimatePresence mode="popLayout">
                {filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-pointer"
                  >
                    <div 
                      className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-slate-100"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase">{item.category}</span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-deep transition-colors line-clamp-2 break-keep leading-snug">{item.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{item.summary}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. SEO Text Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 font-display">대표원장 방송 출연 및 강연 기록</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed break-keep">
              <p>
                본 페이지는 윤영준 대표원장의 방송 출연, 심리상담 관련 인터뷰, 공공기관 및 교육기관 강연, 재범방지 교육 활동 등을 기록한 공식 아카이브입니다.
              </p>
              <p>
                윤영준 대표원장은 <span className="font-bold text-slate-900">MBC, KBS, EBS, JTBC, MBN, tvN, 채널A, TV조선, TBN 교통방송, 연합뉴스</span> 등 국내 주요 방송사 및 언론에 80회 이상 출연하며 심리상담 전문가로서 다양한 현장에서 사람들의 이야기를 함께 나누어 왔습니다.
              </p>
              <p>
                특히 <span className="font-bold text-slate-900">KBS 라디오 「4시에 힐링타임」, 「생방송 정보스펀지」, TBN 교통방송 「Talk 터놓고 말해요」, 「가족의 세계(심리코너)」</span> 등 여러 프로그램을 8년 이상 진행하며, 누구나 공감할 수 있는 언어로 마음을 이해하고 풀어내는 시간을 이어왔습니다.
              </p>
              <p>
                이러한 방송과 강연은 단순한 정보 전달을 넘어, 실제 삶에 도움이 되는 방향을 함께 찾아가는 과정이었습니다.
              </p>
              <p>
                일부 자료는 현재도 재방영 및 온라인을 통해 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-display">전문 강연 및 방송 출연이 필요하신가요?</h2>
          <p className="text-lg text-slate-400 mb-10">공공기관, 기업, 교육기관을 위한 심리교육 및 특강을 진행하고 있습니다.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:0507-1380-0028" className="btn-primary flex items-center justify-center gap-2">
              <PhoneCall className="w-5 h-5" />
              문의하기 0507-1380-0028
            </a>
            <a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4/place/2050622926?searchType=place&lng=128.9705167&lat=35.1246838&placePath=/booking?bookingRedirectUrl=https://m.booking.naver.com/booking/13/bizes/1643592?theme=place&entry=pll&lang=ko&service-target=map-pc&pcmap=1&area=pll&c=15.00,0,0,0,dh" target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              상담 신청
            </a>
          </div>
        </div>
      </section>

      {/* 7. Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-primary-light transition-colors p-2"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaAppearancePage;
