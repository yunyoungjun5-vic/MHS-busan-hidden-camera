
export interface Partner {
  name: string;
  image: string;
  link: string;
}

export interface PartnerCategory {
  category: string;
  items: Partner[];
}

export const PARTNERS_DATA: PartnerCategory[] = [
  {
    category: "공공기관 및 유관기관",
    items: [
      { name: "검찰청", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208774/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-03_165954_iuzr0z.png", link: "https://www.spo.go.kr/" },
      { name: "경북북부교도소", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775029521/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_04_45_05_m125fo.png", link: "https://www.corrections.go.kr/" },
      { name: "부산가정법원", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775044656/logo_gibhqm.png", link: "https://dgfamily.scourt.go.kr/" },
      { name: "부산광역시", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775106397/%EC%8B%AC%EB%B2%8C%EB%A1%9C%EA%B3%A0%EC%A1%B0%ED%95%A9_dgtm0l.png", link: "https://www.daegu.go.kr/" },
      { name: "부산광역시교육청", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775034616/Daegu_Metropolitan_Office_of_Education_Logo__vertical.svg_de9yzu.png", link: "http://www.dge.go.kr/" },
      { name: "구미경찰서", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775049813/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_10_21_22_y3zmxw.png", link: "https://www.gbpolice.go.kr/gm/" },
      { name: "김천경찰서", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775035271/76761_46193_5823_jbroqw.jpg", link: "https://www.gbpolice.go.kr/gc/" },
      { name: "성주경찰서", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775371843/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_10_30_46_yi5w0l_paiqye.png", link: "https://www.gbpolice.go.kr/sj/" },
      { name: "경북자립지원전담기관", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775108360/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_03_52_15_qncqwz.png", link: "https://www.kbjarip.or.kr/" },
      { name: "경상북도소방본부", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775050128/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_10_28_38_tbz3pv.png", link: "https://gb119.go.kr/" },
      { name: "구미시", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775106397/2021051414001839942_l_zhbpdi.jpg", link: "https://www.gumi.go.kr/" },
      { name: "김천시", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775107339/1709611612765527_jhy58j.jpg", link: "https://www.gc.go.kr/" },
      { name: "한국산림복지진흥원", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775026406/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-01_155124_cun9ie.png", link: "https://www.fowi.or.kr/" },
      { name: "울산광역시교육청", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775106408/Ulsan_Metropolitan_Office_of_Education_Logo__vertical.svg_rxkoah.png", link: "https://use.go.kr/" },
      { name: "울산 도산도서관", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775026416/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_03_38_44_kta3nq.png", link: "https://www.ulsannamgu.go.kr/library" },
      { name: "한국교직원 공제회", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775110776/1-06_%EA%B5%AD%EB%AC%B8%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98_%EC%83%81%ED%95%98%EA%B8%B0%EB%B3%B8%ED%98%95_xaebzn.jpg", link: "https://www.ktcu.or.kr/index" },
      { name: "경북고용성장지원센터", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775370945/%EA%B2%BD%EB%B6%81%EA%B3%A0%EC%9A%A9%EC%84%B1%EC%9E%A5%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0_%EB%A1%9C%EA%B3%A0_1__2021102093716_ownuux.png", link: "http://kdscjob.or.kr" },
    ]
  },
  {
    category: "법률기관",
    items: [
      { name: "법무법인 로하스", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047909/KakaoTalk_20210501_115331134_1_ppiuf2.jpg", link: "https://lohas-law.com/" },
      { name: "법무법인 소울", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047795/%EC%86%8C%EC%9A%B8_%EB%A1%9C%EA%B3%A0_s6wvju.png", link: "https://www.soullaw.co.kr/" },
      { name: "법무법인(유)효성", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775048089/channels4_profile_xud3rd.jpg", link: "http://www.hyosunglaw.com/" },
      { name: "법무법인 안팍", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775046813/0D.43742774.1_pkrc6o.webp", link: "https://ahnparkcrime.com/" },
      { name: "법인법무 동주", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775046880/qakhuz_jvzw-h0clsn_logo_vrlnjr.png", link: "https://dongju-lawfirm.com/" },
      { name: "법무법인 YK", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775046992/8d2ece49bcd7fb061177e44e464b9c23_v3tz0f.png", link: "https://www.yklaw.net/" },
      { name: "법무법인 조율", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047068/20160906_182634_y7nrsj.jpg", link: "http://harmonylaw.co.kr/" },
      { name: "법무법인 예문정앤파트너스", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047313/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C_9_qv3cbr.jpg", link: "http://www.yemunlaw.com/" },
      { name: "법무법인 가나다", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047378/42233%EB%8C%80%EC%A7%80_169_bspdqq.jpg", link: "http://www.ganadalaw.com/" },
      { name: "법무법인 더 킴", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047490/profileImage_gizmtd.png", link: "http://www.더킴로펌.com/" },
      { name: "법무법인 대륜", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775047562/2021073014260111_izxbrm.avif", link: "https://www.daeryunlaw.com/" },
    ]
  },
  {
    category: "교육기관",
    items: [
      { name: "광운대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208775/Seal_3D-type_lkm7qd.png", link: "https://www.kw.ac.kr/" },
      { name: "구미대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208775/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-03_170130_tlytqt.png", link: "https://www.gumi.ac.kr/" },
      { name: "금오공과대학", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775106397/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-02_140559_wcwj90.png", link: "https://www.kumoh.ac.kr/" },
      { name: "동국대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775032778/symbol_01_1_jzh3rr.png", link: "https://www.dongguk.edu/" },
      { name: "영진사이버대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775218764/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_06_20_23_xzx7jj_u9pfha.png", link: "https://www.ycc.ac.kr/" },
      { name: "부산디지털대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775046633/%EC%A0%9C%EB%AA%A9_%EC%97%86%EC%9D%8C_lgknb0.png", link: "https://www.bdu.ac.kr/" },
      { name: "상주대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775277906/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C_1_v0kdya.jpg", link: "https://www.knu.ac.kr/" },
      { name: "부산외국어대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775282540/0S5zqzZ3OZ0sDrUNrwOY4VPNA0JXBATRC_lutxzgtHjFdn0EO1POXAi-yEwwEcbrM0xNxequghYxGTE-mYclqlBjbw_XVLmpWHom5V9tUnOlNeqT-jr-BgXzkF95zpKE5u_-htBqRvEAgSK6TcblOw_leu6dr.webp", link: "https://www.bufs.ac.kr/" },
      { name: "춘해보건대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775283202/2015_73076000_1440825192922_szd3ef.jpg", link: "https://www.ch.ac.kr/" },
      { name: "한국폴리텍 대학교", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775283430/2016-09-21_17-48-47_vclflo.jpg", link: "https://www.kopo.ac.kr/" },
    ]
  },
  {
    category: "기업",
    items: [
      { name: "삼성전자", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208762/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%EB%A1%9C%EA%B3%A0_taigm8.jpg", link: "https://www.samsung.com/" },
      { name: "삼성SDI", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208763/1307022_635021_74_thheyi.jpg", link: "https://www.samsungsdi.co.kr/" },
      { name: "삼성탈레스", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208754/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-03_172451_iv50pl.png", link: "https://www.hanwhasystems.com/" },
      { name: "LG전자", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775208754/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-03_172717_dpk2rd.png", link: "https://www.lge.co.kr/" },
      { name: "기아자동차", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775283654/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-04_151917_itkmwn.png", link: "https://www.kia.com/" },
      { name: "코웨이", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775029714/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-01_164820_w6ohae.png", link: "https://www.coway.com/" },
      { name: "코레일", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775032592/sign_4_mgmxmn.png", link: "https://www.letskorail.com/" },
      { name: "성진포머", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775031588/%EB%A1%9C%EA%B3%A0_20080213083914_phbofg.jpg", link: "https://www.sjfoma.com/" },
      { name: "한화시스템", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775030072/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2026-04-01_165426_vfbzcq.png", link: "https://www.hanwhasystems.com/" },
      { name: "순천향대학교 구미병원", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775029928/%EC%88%9C%EC%B2%9C%ED%96%A5%EB%8C%80%ED%95%99%EA%B5%90_%EA%B5%AC%EB%AF%B8%EB%B3%91%EC%9B%90_%EA%B5%AD%EB%AC%B8_%EC%84%B8%EB%A1%9C_j8brvd.jpg", link: "https://www.schmc.ac.kr/gumi/index.do" },
      { name: "코리아세븐", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775118793/18680416d1909c8dc0450c8e1b3c074d131f32a688076fc4db8edca1d879518c_warzh9.webp", link: "https://www.7-eleven.co.kr/" },
      { name: "아모레퍼시픽", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775119159/7083658_180942_2659_rxrac8.jpg", link: "https://www.amorepacific.com/" },
      { name: "쿠팡", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775119160/coupang-bi-brand-logo-230109-01_szk7vn.jpg", link: "https://www.coupang.com/" },
    ]
  },
  {
    category: "심리상담 및 웰니스 기관",
    items: [
      { name: "TELUS Health", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775112935/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_2%EC%9D%BC_%EC%98%A4%ED%9B%84_03_55_33_garp5i.png", link: "https://www.telushealth.com/ko-kr" },
      { name: "한국심리상담센터 KPCC", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775031507/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C_wcijfi.png", link: "https://www.mykpcc.com/" },
      { name: "구미Wee 센터", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775033817/ChatGPT_Image_2026%EB%85%84_4%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_05_55_15_gsvezi.png", link: "https://www.gbe.kr/gumi/main.do" },
      { name: "이지앤웰니스", image: "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1775218297/2102151025114130_a8a7lk.jpg", link: "http://www.eznwellness.com/" },
    ]
  }
];

const getPartnerByName = (categoryIdx: number, name: string) => {
  return PARTNERS_DATA[categoryIdx].items.find(p => p.name === name) || PARTNERS_DATA[categoryIdx].items[0];
};

export const getLogoHeight = (name: string) => {
  switch (name) {
    case '성주경찰서':
    case '김천경찰서':
    case '부산가정법원':
    case '검찰청':
    case '경북북부교도소':
    case '구미경찰서':
    case '경북자립지원전담기관':
    case '경상북도소방본부':
    case '한국산림복지진흥원':
    case '울산광역시교육청':
    case '울산 도산도서관':
    case '경북고용성장지원센터':
    case '광운대학교':
    case '구미대학교':
    case '한국폴리텍 대학교':
    case '기아자동차':
    case '춘해보건대학교':
    case '영진사이버대학교':
    case '부산디지털대학교':
    case '금오공과대학':
    case '상주대학교':
      return 'h-[110px] md:h-[80px] lg:h-[100px]';
    case '부산광역시':
    case '구미시':
    case '김천시':
    case 'TELUS Health':
    case '한국교직원 공제회':
    case '삼성전자':
    case '삼성SDI':
    case '삼성탈레스':
    case 'LG전자':
    case '이지앤웰니스':
    case '코리아세븐':
    case '아모레퍼시픽':
    case '쿠팡':
    case '순천향대학교 구미병원':
      return 'h-[100px] md:h-[70px] lg:h-[90px]';
    default:
      return 'h-[90px] md:h-[65px] lg:h-[80px]';
  }
};

// For teaser, we take the specific items requested by the user in order
export const TEASER_PARTNERS = [
  getPartnerByName(0, "검찰청"),
  getPartnerByName(1, "법무법인 로하스"),
  getPartnerByName(1, "법무법인 소울"),
  getPartnerByName(0, "부산가정법원"),
  getPartnerByName(0, "경북북부교도소"),
  getPartnerByName(0, "구미경찰서"),
  getPartnerByName(0, "김천경찰서"),
  getPartnerByName(0, "성주경찰서"),
  getPartnerByName(0, "경상북도소방본부"),
  getPartnerByName(3, "삼성전자"),
  getPartnerByName(3, "순천향대학교 구미병원"),
  getPartnerByName(0, "경북자립지원전담기관"),
];
