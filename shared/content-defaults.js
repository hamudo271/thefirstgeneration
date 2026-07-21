/**
 * Default content for every page.
 *
 * Mirrors `content-schema.js`. Each top-level key corresponds to ONE row
 * in `content_entries` (key → JSONB value). Used:
 *   • as the seed when the DB is empty,
 *   • as the in-memory fallback when /api/content fails or DB is off,
 *   • as the starting point for the admin UI if a page has never been saved.
 *
 * Extracted verbatim from the original JSX (Nov 2024).
 */

import { videoPackages, shortformPackages, otherPackages } from "./pricing-packages.js";

export const defaults = {
  // ───────────────────────────────────────────────────────────── Home
  home: {
    seo: {
      title: "광주 영상 제작·크리에이터 MCN 전문 기업",
      description:
        "영상 제작부터 크리에이터 매니지먼트, 광고 콘텐츠까지. 누적 조회수 3억 1천만 회의 더퍼스트제너레이션이 기획·촬영·편집·마케팅을 올인원으로 제공합니다.",
    },
    hero: {
      badge: "Creative Content & MCN",
      headlineLine1: "THE FIRST",
      headlineLine2: "GENERATION.",
      subhead:
        "세상을 사로잡는 콘텐츠 제작 파트너.\n기업과 소비자의 마음을 움직이는 성공적인 콘텐츠를 만듭니다.",
      ctaButton: "Start Project",
    },
    heroSlides: {
      bgVideo: "/hero/bg.mp4",
      bgVideoPoster: "/hero/bg-poster.jpg",
      items: [
        {
          eyebrow: "GWANGJU MCN NO.1",
          title: "광주 MCN 점유율 1위,\n더퍼스트제너레이션입니다",
          accent: "더퍼스트제너레이션",
          desc: "영상 제작부터 크리에이터 매니지먼트, 광고 콘텐츠까지.\n세상을 사로잡는 콘텐츠 제작 파트너.",
          image: "/hero/brand-dark.jpg",
        },
        {
          eyebrow: "TOTAL VIEWS 310,000,000+",
          title: "유튜브 7년차의 노하우로\n채널 성장을 돕습니다",
          accent: "7년차",
          desc: "성장하지 않는 채널에는 이유가 있습니다.\n채널에 맞는 성장 전략을 제안합니다.",
          image: "/hero/galaxy.jpg",
        },
        {
          eyebrow: "CASE · 크리에이터",
          title: "총합 팔로워 72만, 20명의 크리에이터들은\n왜 더퍼스트제너레이션과 함께할까요?",
          accent: "더퍼스트제너레이션",
          desc: "단순 조회수가 아닌,\n지속 가능한 성장을 만들기 때문입니다.",
          image: "/hero/building.jpg",
        },
        {
          eyebrow: "CREATIVE · VALUE · IMAGINE",
          title: "좋은 회사보다 잘 발견되는 회사가\n성공할 확률이 높습니다",
          accent: "잘 발견되는 회사",
          desc: "나의 브랜드를 세상에 알리세요.\n이제는 콘텐츠가 경쟁력입니다.",
          image: "/hero/brand-light.jpg",
        },
      ],
      ctaPrimary: "무료 상담 받기",
      ctaSecondary: "제작 사례 보기",
    },
    scarcity: {
      viewingPrefix: "지금",
      viewingSuffix: "명이 함께 보고 있어요",
      baseViewers: 11,
      remainingLabel: "이번 달 잔여 제작",
      remainingCount: 2,
      remainingUnit: "건",
      note: "매월 20건 한정",
      button: "빠른 문의",
    },
    brandIntro: {
      eyebrow: "RESEARCH-DRIVEN",
      headline: "화려한 영상에\n제발 속지마세요",
      accent: "제발",
      body: "영상을 단순하게 예쁘게 만드는 것과\n채널을 성장시키는 것은 확연히 다릅니다.",
      stats: [
        { value: "3.1억+", label: "누적 조회수" },
        { value: "20명", label: "소속 크리에이터" },
        { value: "72만", label: "총합 팔로워" },
        { value: "1위", label: "광주 MCN 점유율" },
      ],
    },
    cases: {
      eyebrow: "실제 콘텐츠",
      headline: "더퍼스트제너레이션은 지금까지\n1000개 이상의 영상을 제작했습니다",
      accent: "1000개 이상",
      subhead: "썸네일을 누르면 소속 크리에이터의 실제 콘텐츠를 바로 확인하실 수 있습니다.",
      moreLabel: "제작 사례 더 보기",
      morePath: "/portfolio",
      items: [
        { videoId: "9mGcuTiI7P8", tag: "푸드" },
        { videoId: "tPocanxfvyU", tag: "푸드" },
        { videoId: "6cnDaTTy45s", tag: "푸드" },
        { videoId: "t3CiTdjY2hE", tag: "푸드 쇼츠" },
        { videoId: "RF5HbcwfS5c", tag: "기업 홍보영상" },
        { videoId: "6HE9piaR9zU", tag: "기업 홍보영상" },
        { videoId: "hAYRu6sdANA", tag: "기업 홍보영상" },
        { videoId: "RYGg_WwEPkc", tag: "기업 홍보영상" },
      ],
    },
    partners: {
      eyebrow: "Our Creators",
      headline: "18명의 크리에이터가\n더퍼스트제너레이션과 함께합니다",
      accent: "더퍼스트제너레이션",
      items: [
        { name: "1분맛집", channel: "유튜브", followers: "9.64만명", desc: "맛집 소개", href: "https://www.youtube.com/@1분광주맛집", image: "/creators/1min-matjib.png" },
        { name: "광주푸드스탑", channel: "인스타", followers: "12.6만명", desc: "맛집 소개", href: "https://www.instagram.com/gwangju_food_stop", image: "/creators/gwangju-foodstop.png" },
        { name: "광주일번 인싸영감", channel: "유튜브", followers: "5.92천명", desc: "맛집 소개", href: "https://www.youtube.com/@광주일번", image: "/creators/gwangju-inssa.png" },
        { name: "광주스토리", channel: "인스타", followers: "3.3만명", desc: "맛집 소개", href: "https://www.instagram.com/gwangju.story" },
        { name: "제대로농수산", channel: "유튜브", followers: "3.28천명", desc: "농수산물 유통", href: "https://www.youtube.com/@제대로농수산", image: "/creators/jedaero.png" },
        { name: "태인핏", channel: "인스타", followers: "1.4만명", desc: "헬스 인플루언서", href: "https://www.instagram.com/taein_fit/" },
        { name: "예찬하다 | YECHAN", channel: "유튜브", followers: "2.33천명", desc: "커플/호텔 브이로그", href: "https://www.youtube.com/@예찬하다94", image: "/creators/yechan.png" },
        { name: "로드니", channel: "인스타", followers: "7.1만명", desc: "맛집 소개", href: "https://www.instagram.com/roadney_" },
        { name: "스튜디오워매", channel: "인스타", followers: "5.4만명", desc: "맛집 소개", href: "https://www.instagram.com/studio_wamae/" },
        { name: "아따광주", channel: "인스타", followers: "2.4만명", desc: "맛집 소개", href: "https://www.instagram.com/adda_gwangju" },
        { name: "성공인사이드", channel: "유튜브", followers: "1.41만명", desc: "사업가 소개", href: "https://www.youtube.com/@성공인사이드", image: "/creators/success-inside.png" },
        { name: "하늘고마", channel: "유튜브", followers: "4.76만명", desc: "부업/어플/가상화폐", href: "https://www.youtube.com/@skygoma062", image: "/creators/haneulgoma.png" },
        { name: "김수민 작가", channel: "인스타", followers: "3.5만명", desc: "작가/에세이", href: "https://www.instagram.com/youloveday/", image: "/creators/kim-sumin.png" },
        { name: "장첸-길출신 아기고양이", channel: "유튜브", followers: "1.82만명", desc: "반려동물/고양이", href: "https://www.youtube.com/@장첸", image: "/creators/jangchen.png" },
        { name: "무명감독이지만", channel: "유튜브", followers: "1천명", desc: "맛집 소개", href: "https://www.youtube.com/@아직무명감독이지만", image: "/creators/mumyeong.png" },
        { name: "광주핫걸", channel: "인스타", followers: "4.8천명", desc: "맛집 소개", href: "https://www.instagram.com/gwangju_hotgirl" },
        { name: "수드래곤형님", channel: "유튜브", followers: "121명", desc: "수산물/요리", href: "https://www.youtube.com/@sudragonpark", image: "/creators/sudragon.png" },
        { name: "스커드", channel: "유튜브", followers: "2.7만명", desc: "맛집 소개 / 게임", href: "https://www.youtube.com/@스커드", image: "/creators/skud.png" },
      ],
    },
    testimonials: {
      eyebrow: "더퍼스트제너레이션이 자신감이 넘치는 이유?",
      headline: "실시간 이용 고객 분들의\n실제 후기입니다",
      accent: "실제 후기",
      items: [
        {
          name: "임**",
          rating: 5.0,
          brand: "",
          body: "제 채널의 컨셉에 맞는 콘텐츠를 쉽게 만들 수 있었어요. 이전에 다른 업체에서 작업한 경험이 있는데, 제가 원하는 스타일을 잘 이해하지 못했거든요. 그래서 답답한 마음에 찾았는데, 제가 원하는 스타일을 파악하고, 퀄리티 좋게 뽑아주셨습니다 :)",
        },
        {
          name: "김**",
          rating: 5.0,
          brand: "",
          body: "상담을 받을 때부터 전문적인 느낌이 확 들었습니다. 제 의견을 충분히 반영할 수 있었고, 무엇보다도 성과가 없을 경우 100% 환불 보장이라는 점이 정말 마음에 들었어요. 자신감 있게 서비스를 제공하는 업체는 흔치 않은데...감격했네요.",
        },
        {
          name: "지**",
          rating: 5.0,
          brand: "",
          body: "유튜브 대행하는 타 업체들이 너무 못해서 직접 영상을 제작해야 한다고 생각했습니다. 영상 하나에 2~3일 정도 편집했었는데.. 더퍼스트제너레이션에 맡기고 난 이후로는 영상 편집할 시간에 다른 일을 할 수 있어서 정말 만족합니다!",
        },
        {
          name: "박**",
          rating: 5.0,
          brand: "",
          body: "기획안부터 남달랐습니다. 그냥 '영상 만들어 드릴게요'가 아니라, 우리 브랜드가 어떤 메시지를 줘야 하는지를 먼저 고민해 주셨어요. 덕분에 조회수뿐 아니라 실제 문의까지 늘었습니다.",
        },
        {
          name: "최**",
          rating: 5.0,
          brand: "",
          body: "수정 요청에도 빠르고 정확하게 반영해 주셔서 일정에 차질이 없었습니다. 무한 수정으로 지치는 경험이 많았는데, 집중 구간을 명확히 잡아주시니 결과물 완성도가 확실히 달랐어요.",
        },
        {
          name: "정**",
          rating: 5.0,
          brand: "",
          body: "공공기관 특성상 까다로운 요구가 많았는데도 끝까지 책임감 있게 진행해 주셨습니다. 사후 관리까지 챙겨주셔서 다음 프로젝트도 믿고 맡길 생각입니다.",
        },
      ],
    },
    finalCta: {
      eyebrow: "영상만 필요하다면\n다른 회사를 선택하셔도 됩니다.",
      headline: "크리에이터가 되고 싶다면\n아래 버튼을 클릭하세요",
      bullets: [
        "상세하고 정확하게 문의 폼을 작성해주셔야 정확한 상담이 가능합니다.",
        "문의 및 작업량이 많아 순차적으로 답변을 진행하고 있습니다.",
        "레퍼런스 채널들을 미리 준비해주세요.",
      ],
      closing: "좋은 콘텐츠는 절대 우연히 만들어지지 않습니다.\n지금 당신의 이야기를 들려주세요.",
      button: "상담 받기",
    },
    marquee: {
      clients: [
        { name: "Samsung" },
        { name: "LG" },
        { name: "Hyundai" },
        { name: "SK" },
        { name: "Naver" },
        { name: "Kakao" },
        { name: "Coupang" },
        { name: "Woowa Bros" },
        { name: "Toss" },
        { name: "Krafton" },
      ],
    },
    secrets: {
      eyebrow: "Why Us",
      headline: "더퍼스트제너레이션의\n비결은 무엇일까요?",
      items: [
        {
          title: "잘팔리는 영상만 취급합니다",
          desc: "단순히 예쁜 영상이 아닌, 시청자의 행동을 유도하고 구매로 이어지는 '성과 중심'의 영상을 제작합니다.",
        },
        {
          title: "더퍼스트제너레이션과 함께합니다",
          desc: "20명의 소속 크리에이터 채널을 직접 운영하며 얻은 노하우로 클라이언트의 성장을 함께 고민합니다.",
        },
        {
          title: "실제 후기입니다",
          desc: "소비자 중심 경영철칙을 바탕으로 수많은 클라이언트와 신뢰를 쌓아가고 있습니다.",
        },
      ],
    },
    growth: {
      eyebrow: "Growth Strategy",
      headline: "유튜브 성장만을\n추구합니다.",
      steps: [
        {
          step: "Step 1",
          title: "유튜브의 채널 자체를 직접 기획합니다.",
          desc: [
            { value: "영상 기획부터 촬영, 편집까지 원스톱으로 진행 가능" },
            { value: "단순히 감으로 하는게 아닌 데이터 분석을 통해 소재를 발굴하고 기획" },
            { value: "맛집, 관광지, 자동차, 교육, 비즈니스 등 다양한 카테고리 경험 및 운영중" },
          ],
        },
        {
          step: "Step 2",
          title: "모든 영상이 조회수가 잘 나온다고 하면 그건 사기입니다.",
          desc: [
            { value: "조회수가 잘 나올 수 있도록 '확률'을 높여드립니다" },
            { value: "시청자에게 유익하거나 재밌는 영상들이 구독으로 연결됩니다" },
            { value: "채널에 출연하는 당사자가 얼마나 몰입하고 있는가가 중요합니다" },
          ],
        },
        {
          step: "Step 3",
          title: "논리적인 편집 프로세스.",
          desc: [
            { value: "단순히 눈에 즐거운 편집이 아닌, 프레임마다 명확한 기획 의도 반영" },
            { value: "컷 구성과 디자인 방향을 심리학적 요소 기반으로 판단" },
            { value: "회사 내부에서 꼼꼼한 작업과 검수를 통해 결과물을 전달드립니다" },
          ],
        },
        {
          step: "Step 4",
          title: "영상을 완성했다고, '띡' 하고 끝내지 않습니다.",
          desc: [
            { value: "영상 완성 후 책임 없는 작업 종료가 대부분인 기존 편집 시스템" },
            { value: "롱폼 제작시 최대한 숏폼을 많이 만들어드립니다" },
            { value: "제작하신 영상이 바이럴 될 수 있도록 돕습니다" },
          ],
        },
        {
          step: "Step 5",
          title: "쿼터제로 협업합니다.",
          desc: [
            { value: "유튜브는 양보다 '영상 하나의 완성도'가 더욱 중요시" },
            { value: "공장처럼 많은 채널과 영상들을 작업하게 되면 퀄리티 저하" },
            { value: "기존 고객 품질 유지를 위해 월 제한된 수량만 제작 진행" },
          ],
        },
      ],
    },
    safety: {
      headline: "안심하셔도 좋습니다",
      accent: "안심",
      subhead: "돈을 지불하고 나면 불안해.. 의견이 잘 반영 안되던데...?",
      card1Title: "자체 영상 제작",
      card1Body:
        "우리는 프리랜서나 다른 회사에 99% 외주 작업을 주지 않습니다.\n직접 영상을 제작하기 때문에 수정 작업과 피드백이 빠릅니다.",
      card2Title: "납품이 아닌 성장이 목표",
      card2Body:
        "더퍼스트제너레이션은 크리에이터와 함께 성장합니다.\n크리에이터의 성공이 저희 회사의 성공입니다.",
    },
    process: {
      eyebrow: "Workflow",
      headline: "작업 프로세스",
      steps: [
        { step: "01", title: "상담", desc: "채널의 목적을 명확히 하고 방향을 잡아드립니다." },
        { step: "02", title: "계약", desc: "모든 프로젝트는 선입금 확인 후 진행됩니다." },
        { step: "03", title: "기획안 전달", desc: "프로젝트 시작 전, 진행 계획이 담긴 기획안을 제공해드립니다." },
        { step: "04", title: "촬영 진행", desc: "일정을 조율하여 촬영을 진행합니다." },
        { step: "05", title: "영상 편집", desc: "크리에이터 또는 브랜드의 개성을 살린 편집스타일로 편집을 진행합니다." },
        { step: "06", title: "피드백 및 수정작업", desc: "검수 작업 및 수정작업을 진행합니다." },
        { step: "07", title: "완성", desc: "최종본을 전달하고 업로드를 진행합니다." },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      headline: "가격이 궁금하신가요?",
      subhead: "옵션은 더하고, 부담은 줄였습니다. 투명한 가격으로 안내드립니다.",
      videoSectionTitle: "유튜브 패키지",
      shortformSectionTitle: "숏폼 패키지",
      staffLabel: "참여 인원:",
      periodLabel: "제작 기간:",
      videoPackages,
      shortformPackages,
    },
    faq: {
      eyebrow: "Q&A",
      headline: "자주 묻는 질문",
      items: [
        {
          q: "영상이 마음에 들지 않으면 어떡하나요?",
          a: "걱정하지 마세요. 만족하실 때까지 수정 작업해드립니다.",
        },
        {
          q: "작업절차를 알고 싶어요",
          a: "더퍼스트제너레이션은 총 8개의 작업 절차가 있습니다.\n1. 전문 설문지 작성\n2. 상담\n3. 계약\n4. 기획안 전달\n5. 촬영 진행\n6. 영상 편집\n7. 피드백 및 수정 작업\n8. 완성",
        },
        {
          q: "기한은 얼마나 걸리나요?",
          a: "원하시는 서비스에 따라 기간은 다르게 책정됩니다. 편집 영업일 기준 평균 7-10일 소요. 촬영 포함 영업일 기준 평균 15일 소요.\n상위에 기재되어 있는 기한은 평균적인 수치입니다.\n고객사의 피드백 속도에 따라 더 당겨지거나, 늘어날 수 있는 점 참고 부탁드립니다",
        },
        {
          q: "저작권은 어떻게 관리하시나요?",
          a: "영상의 경우 엄중한 저작권 관리가 필수입니다.\n지금까지 진행한 프로젝트 중 저작권 문제 발생은 0건입니다.",
        },
        {
          q: "서비스 종류랑 범위는 어떻게 되나요?",
          a: "저희는 고객님이 원하는 깊이에 따라 크게 세 가지로 나눠서 도와드립니다.\n- 유튜브 채널 운영 대행: 채널 기획부터 촬영, 편집, 운영 전략까지 한꺼번에 맡기시는 서비스입니다. 유튜브 7년 노하우로 채널을 성장시킵니다.\n- 숏폼 영상 제작: 틱톡, 릴스, 쇼츠, 클립에 올라갈 짧은 영상들을 제작해드립니다. 해당 서비스는 '편집'만 의뢰도 가능합니다.\n- 인플루언서 섭외: 소속 크리에이터 또는 영향력 있는 인플루언서를 빠른 일정으로 섭외해드립니다.",
        },
        {
          q: "채널 성장이나 성과를 보장해 주시나요?",
          a: "솔직하게 말씀드리면, 유튜브 알고리즘은 변수가 많고 고객사별 성향이 다르기 때문에 '구독자 몇 명 달성!'이라고 수치로 보장해 드리긴 어렵습니다.\n하지만 저희의 강점은 '성과를 만드는 전략'에 있습니다. 단순히 예쁜 영상이 아니라, '시청자가 원하는 영상'과 '유튜브가 원하는 영상'이라는 두 가지 핵심에 집중해서 기획합니다. 이에 성장할 수밖에 없는 구조를 만들어 드리는 데 초점을 맞추고 있습니다.\n그리고 이렇게 기획 된 채널은 평균적으로 6개월 안에 큰 효과를 보십니다.",
        },
        {
          q: "영상 수정은 몇 번까지 가능하고, 추가 비용은 없나요?",
          a: "저희 프로세스에 피드백 및 수정 작업은 기본으로 들어가 있습니다.일반적으로 계약하실 때 수정 횟수(3회 정도)를 정하고 진행하며, 이 횟수 내에서는 추가 비용이 발생하지 않습니다.다만, 이미 편집이 거의 끝났는데 '처음 기획했던 내용과 완전히 다르게 바꿔주세요' 같은 대대적인 수정을 요청하시면, 추가 비용이 발생할 수 있으니 참고바랍니다.",
        },
        {
          q: "유튜브 콘텐츠를 의뢰하고 싶은데 어떤 걸 준비하면 될까요?",
          a: "상세하고 정확하게 문의 폼을 작성해주셔야 정확한 상담이 가능합니다.\n문의 및 작업량이 많아 순차적으로 답변을 진행하고 있습니다.\n레퍼런스 채널들을 미리 준비해주세요.",
        },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Company
  company: {
    seo: {
      title: "회사 소개",
      description:
        "더퍼스트제너레이션의 정체성, 팀 구성, 그리고 브랜드가 집착하는 가치를 소개합니다.",
    },
    hero: {
      eyebrow: "About Us",
      headline: "과하게 포장된\n말이 아닌,",
      subhead:
        "더퍼스트제너레이션은 유튜브 플랫폼의 분석과 콘텐츠 제작, 크리에이터 매니지먼트까지 각 분야별 세부적인 부분을 다룹니다.\n단순하게 시간을 녹여 낸 작업이 아닌, 항상 소비자의 시선을 생각해서 콘텐츠를 제작합니다.",
    },
    whyObsessed: {
      headline: "왜 그렇게 집착할까요?",
      subhead: "더퍼스트제너레이션의 핵심 가치",
      card1Title: "01. CREATIVE · VALUE",
      card1Strong: "우리는 프로젝트마다 창의적인 기획으로, 진짜 도움이 되는 가치 있는 콘텐츠를 만듭니다.",
      card1Body:
        "주변에서 말렸습니다. 시장에서 살아남을 수 없을 것이라고 했습니다. 하지만 우리는 '단순하게 사고하기'로 했습니다. 과장하지 않고 겸손하게 본질만 생각하기로 했습니다. 우리는 단순함이라는 무기를 가진, 본질과 기본에 충실한 팀입니다.",
      card2Title: "02. IMAGINE",
      card2Strong: "우리는 기업과 소비자의 마음을 움직이는 상상을 현실로 만듭니다.",
      card2Body:
        '우리가 생각하는 트렌드는 "돈의 흐름과 사람들의 심리를 파악하고 가장 우리의 것을 제작하는 것"입니다. 젊지만 수많은 경험으로 다져진 감각으로 브랜드 가치를 만드는 것, 그것이 더퍼스트제너레이션만의 차별점입니다.',
    },
    teamwork: {
      headline: "우리는 함께 언제나 도전합니다.",
      subhead:
        "광주에서 시작한 더퍼스트제너레이션은 지금 20명의 크리에이터, 그리고 뜻을 함께하는 동료들과 함께합니다.\n혼자의 힘으로는 모든 사람들을 만족시킬 수 없었지만, 팀의 힘으로 광고주분들이 추구하는 가치를 전달할 수 있었습니다.",
    },
    team: {
      eyebrow: "Our Team",
      headline: "당신을 위한 최고의 팀",
      members: [
        {
          role: "콘텐츠 기획자",
          desc: "클라이언트의 요구를 뛰어넘는 최고의 기획을 목표로 합니다. 브랜드 특성과 트렌드에 맞는 마케팅 전략을 세워 새로운 소재를 기획합니다.",
        },
        {
          role: "콘텐츠 디자이너",
          desc: "색채 심리학과 논리적인 근거를 바탕으로 디자인을 진행합니다. 눈에 보기 예쁜 디자인이 아닌, 팔리는 디자인을 추구합니다.",
        },
        {
          role: "크리에이터 매니저",
          desc: "소속 크리에이터 20명의 채널 방향과 성장을 함께 설계합니다. 콘텐츠 기획부터 브랜드 광고 협업까지 크리에이터의 모든 순간을 지원합니다.",
        },
        {
          role: "수치 분석가",
          desc: "모든 마케팅 중 분석이 가장 중요합니다. 더퍼스트제너레이션은 분석에 큰 비중을 두어 철저히 분석하여 간단한 지표로 그립니다.",
        },
      ],
    },
    cta: {
      headline: "돈되는 유튜브,\n그 비결을 알고 싶으신가요?",
      subhead: "더퍼스트제너레이션의 모든 연구 성과, 이제는 당신이 주인공이 될 차례입니다.",
      button: "전문상담 받기",
    },
  },

  // ───────────────────────────────────────────────────────────── Service
  service: {
    seo: {
      title: "서비스 소개 — 영상 제작·크리에이터·광고 콘텐츠",
      description:
        "유튜브 채널 매니지먼트부터 숏폼·영상 제작, 광고 콘텐츠까지. 더퍼스트제너레이션의 서비스와 제작 철칙을 확인해 보세요.",
    },
    hero: {
      eyebrow: "Our Service",
      headlineLine1: "콘텐츠 기획형",
      headlineLine2: "MCN",
      subhead:
        "94%가 이용하고 월 평균 사용시간 1136억분인 유튜브를.. 아직도 시작하지 않으셨나요?\n시대가 바뀌었습니다. 이제는 식당 사장님들도 의사도 변호사도 '크리에이터'로 활동하는 시대입니다.",
    },
    failure: {
      eyebrow: "Problem",
      headline: "왜 지금까지 실패했을까요?",
      subhead: "당신의 유튜브 채널이 성장하지 못했던 이유를 알려드립니다.",
      reasons: [
        {
          title: "콘텐츠가 재미없습니다.",
          desc: "하고 싶은 말만 구구절절 하는 대부분의 콘텐츠들은 사람들이 원하지 않기 때문에 체류 시간이 떨어집니다.",
        },
        {
          title: "유튜브를 해보지 않은 편집자",
          desc: "유튜브 채널 경험이 없는 편집자가 영상을 편집하면 유튜브 지식은 일체 없이 작업을 끝내기에 급합니다. 당연히 전문성이 떨어질 수밖에 없습니다.",
        },
        {
          title: "채널 방향성 부재",
          desc: "예쁜 영상에 현혹되면 안 됩니다. 운전할 때, 내가 어디로 가야 할지 목적지를 정확하게 설정하는 것이 중요합니다.",
        },
        {
          title: "개성을 살리지 못하는 영상",
          desc: "사람마다, 그리고 브랜드마다 각자의 개성이 있습니다. 개성을 놓친 영상은 결국 누구의 기억에도 남지 않습니다.",
        },
      ],
    },
    principles: {
      eyebrow: "Focus",
      headline: "유튜브에서 중요한 것",
      subhead: "좋은 콘텐츠는 기본에서 시작됩니다.",
      items: [
        {
          num: "01",
          title: "기획 (Direction)",
          desc: "내가 만들고 싶은 영상보다는 '대중들이 좋아하는 영상'을 기획해야 합니다.",
        },
        {
          num: "02",
          title: "촬영 (Shoot)",
          desc: "유튜브에서 좋은 촬영은 단순히 화질이 좋은 것이 아니라 시청자가 끝까지 보게 만드는 영상을 촬영하는 것입니다.",
        },
        {
          num: "03",
          title: "컷 편집 (The Core)",
          desc: "컷 편집이 영상 완성도의 80%를 좌우합니다. 기본에 충실한 편집만이 성공 확률을 200% 높입니다.",
        },
        {
          num: "04",
          title: "알고리즘 (Human Context)",
          desc: "우리는 유튜브의 입장에서 생각해봐야 합니다. '이 영상을 추천했을 때, 사람들이 만족할까?'",
        },
      ],
    },
    process: {
      eyebrow: "Workflow",
      headline: "작업 프로세스",
      steps: [
        { step: "01", title: "상담", desc: "채널의 목적을 명확히 하고 방향을 잡아드립니다." },
        { step: "02", title: "계약", desc: "모든 프로젝트는 선입금 확인 후 진행됩니다." },
        { step: "03", title: "기획안 전달", desc: "프로젝트 시작 전, 진행 계획이 담긴 기획안을 제공해드립니다." },
        { step: "04", title: "촬영 진행", desc: "일정을 조율하여 촬영을 진행합니다." },
        { step: "05", title: "영상 편집", desc: "크리에이터 또는 브랜드의 개성을 살린 편집스타일로 편집을 진행합니다." },
        { step: "06", title: "피드백 및 수정작업", desc: "검수 작업 및 수정작업을 진행합니다." },
        { step: "07", title: "완성", desc: "최종본을 전달하고 업로드를 진행합니다." },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Service Detail (4)
  serviceDetail: {
    shared: {
      notFoundTitle: "Service Not Found",
      notFoundLink: "Back to Services",
      pricingEyebrow: "Pricing",
      pricingHeadline: "가격 안내",
      priceUnit: "/ 건",
      currencySymbol: "₩",
      inquiryButton: "문의하기",
      ctaHeadline: "돈되는 유튜브,\n그 비결을 알고 싶으신가요?",
      ctaSubhead: "더퍼스트제너레이션의 모든 연구 성과, 이제는 당신이 주인공이 될 차례입니다.",
      ctaButton: "전문상담 받기",
    },
    services: {
      items: [
        {
          id: "service-1",
          title: "유튜브 채널 운영 대행",
          subtitle: "YouTube Channel Management",
          desc: "채널 기획부터 촬영·편집·운영 전략까지, 유튜브 7년차 노하우로 채널의 성장을 책임집니다.",
          heroImage: "/services/youtube-management.jpg",
          introTitle: "성장 속도가 확연히 다릅니다",
          introText:
            '혹시 그거 아시나요? 인스타그램으로 팔로워 수십만을 달성해도 유튜브로 성공하기는 하늘에 별따기입니다. 각 플랫폼마다 원하는 바가 다르기 때문입니다. 더퍼스트제너레이션은 유튜브를 7년간 직접 운영해 온 노하우로, 소속 크리에이터 20명과 누적 조회수 3억 1천만 회를 만들었습니다. 우리의 목적은 간단합니다. 오로지 "채널의 성공"입니다.',
          pricing: [
            {
              name: "종합관리형 250",
              price: "2,500,000",
              vat: "VAT별도",
              features: [
                { value: "전담 에디터 1인" },
                { value: "전문 기획 1인" },
                { value: "디자이너 1인" },
                { value: "분석 1인" },
                { value: "촬영 1인" },
              ],
            },
            {
              name: "프리미엄 종합관리형 350",
              price: "3,500,000",
              vat: "VAT별도",
              features: [
                { value: "전담 에디터 1인" },
                { value: "전문 기획 1인" },
                { value: "디자이너 1인" },
                { value: "분석 1인" },
                { value: "촬영 1인" },
                { value: "고급 퀄리티 보장" },
              ],
            },
            {
              name: "초격차 종합관리형 550",
              price: "5,500,000",
              vat: "VAT별도",
              features: [
                { value: "대표 참여" },
                { value: "전담 에디터 1인" },
                { value: "전문 기획 1인" },
                { value: "디자이너 1인" },
                { value: "분석 1인" },
                { value: "촬영 1인" },
                { value: "최상위 퀄리티" },
              ],
            },
          ],
        },
        {
          id: "service-2",
          title: "숏폼 영상 제작",
          subtitle: "Short Form Video Production",
          desc: "SNS에서 살아남는 숏폼 영상 제작, 핵심인 거 모르는 사람도 있나요?",
          heroImage: "/services/shortform.jpg",
          introTitle: "핵심인 거 모르는 사람도 있나요..?",
          introText:
            "혹시 그거 아시나요? 짧은 영상은 이제 인스타그램에서만 사용하고 있지 않습니다. 네이버, 유튜브, 틱톡 등 현재 SNS에서 가장 큰 영향력을 가지고 있습니다. 숏폼 제작 서비스는 더퍼스트제너레이션에서 릴스를 직접 기획부터 편집까지 진행하는 서비스입니다. 소비자의 구매 포인트 분석을 통해 구매전환이 이루어질 수 있도록 제작해 드립니다.",
          pricing: [
            { name: "전문 숏폼 30", price: "330,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인" }] },
            { name: "전문 숏폼 50", price: "550,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 분석가 1인" }] },
            { name: "전문 숏폼 100", price: "1,100,000", vat: "VAT포함", features: [{ value: "에디터 2인 / 전문 기획 1인 / 분석가 1인" }] },
            { name: "전문 숏폼 200", price: "2,200,000", vat: "VAT포함", features: [{ value: "에디터 2인 / 전문 기획 3인 / 전문 분석 1인" }] },
            { name: "브랜디드 숏폼 300", price: "3,300,000", vat: "VAT포함", features: [{ value: "촬영감독 1인 / 에디터 2인 / 전문 기획 1인 / 분석가 1인" }] },
            { name: "브랜디드 숏폼 500", price: "5,500,000", vat: "VAT포함", features: [{ value: "촬영감독 3인 / 에디터 2인 / 전문 기획 3인 / 전문 분석 1인" }] },
          ],
        },
        {
          id: "service-3",
          title: "인플루언서 섭외",
          subtitle: "Influencer Marketing",
          desc: "영향력 있는 인플루언서들을 빠른 일정으로 섭외해드립니다.",
          heroImage: "/services/promo-video.jpg",
          introTitle: "전문가의 편집스타일은 뭐가 다를까요?",
          introText:
            '혹시 그거 아시나요? 요즘 영상 하나 잘 만들면, 브랜드 인지도가 확 올라갑니다. 지금 유행하는 편집 스타일, 그 흐름을 정확히 읽고 있어야 가능한 이야기죠. 더퍼스트제너레이션은 트렌디한 영상미와 빠른 전달력을 갖춘 전문 영상 편집 대행 서비스를 제공합니다. 기획부터 편집, 자막 디자인까지 "딱 요즘 스타일"이 필요하다면, 바로 저희입니다.',
          pricing: [
            { name: "전문 영상편집 50", price: "550,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 디자이너 1인" }] },
            { name: "전문 영상편집 77", price: "770,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 분석가 1인" }] },
            { name: "고급 모션 영상편집 300", price: "3,300,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 분석가 1인" }, { value: "고급 모션그래픽" }] },
          ],
        },
        {
          id: "service-4",
          title: "기업 홍보 영상 제작",
          subtitle: "Corporate Video",
          desc: "브랜드의 가치를 영상으로 전달합니다.",
          heroImage: "/services/video-editing.jpg",
          introTitle: "프로덕션을 거쳐 수치 분석까지",
          introText:
            "혹시 그거 아시나요? 요즘 영상은 그냥 '예쁘게'만 만들면 안 됩니다. 기획부터 촬영, 편집, 자막, 음악, 콘텐츠 전략까지 요즘 유행하는 영상 제작의 모든 과정, 더퍼스트제너레이션에서 올인원으로 제공합니다. 콘텐츠 하나를 만들더라도 브랜드의 목적, 고객의 반응, SNS 알고리즘까지 전부 고려해서 제작해야 제대로 퍼질 수 있습니다.",
          pricing: [
            { name: "영상 제작 110", price: "1,100,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 디자이너 1인 / 카메라 1대" }] },
            { name: "영상 제작 220", price: "2,200,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 분석가 1인 / 카메라 2대" }] },
            { name: "브랜드 광고 영상", price: "11,000,000", vat: "VAT포함", features: [{ value: "에디터 1인 / 전문 기획 1인 / 분석가 1인" }, { value: "CF급 퀄리티" }] },
          ],
        },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Portfolio
  portfolio: {
    seo: {
      title: "제작 사례 — 소속 크리에이터 콘텐츠",
      description:
        "맛집·푸드부터 재테크, 반려동물, 비즈니스까지. 더퍼스트제너레이션 소속 크리에이터 20명의 실제 콘텐츠를 확인해 보세요.",
    },
    hero: {
      eyebrow: "Portfolio",
      headline: "백문이\n불여일견",
      subhead: "눈으로 직접 확인하시는 것이 좋습니다.",
    },
    filters: {
      items: [
        { name: "전체" },
        { name: "푸드" },
        { name: "일상" },
        { name: "홍보영상" },
        { name: "비즈니스" },
      ],
    },
    projects: {
      moreLabel: "제작 사례 더 보기",
      items: [
        { videoId: "RF5HbcwfS5c", category: "홍보영상" },
        { videoId: "RuF7v9K-Qac", category: "푸드" },
        { videoId: "k9OJDQQ3Crs", category: "홍보영상" },
        { videoId: "RYGg_WwEPkc", category: "비즈니스" },
        { videoId: "e_KaIr-JU_k", category: "푸드" },
        { videoId: "JRkYaUHjkzU", category: "홍보영상" },
        { videoId: "BM7rhHGTDbs", category: "비즈니스" },
        { videoId: "91koGLbtAdQ", category: "푸드" },
        { videoId: "6HE9piaR9zU", category: "홍보영상" },
        { videoId: "jFswrZtc4_I", category: "홍보영상" },
        { videoId: "t3CiTdjY2hE", category: "푸드" },
        { videoId: "hAYRu6sdANA", category: "홍보영상" },
        { videoId: "pp2CMg6DTGM", category: "일상" },
        { videoId: "5f7S8SULr3Y", category: "비즈니스" },
        { videoId: "EWSLTiMcxUo", category: "푸드" },
        { videoId: "EHdhUTT_3ng", category: "비즈니스" },
        { videoId: "fbsRhxsvRUk", category: "비즈니스" },
        { videoId: "6Y6ahn6hL1E", category: "푸드" },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Column
  column: {
    seo: {
      title: "칼럼 — MCN·크리에이터·숏폼 인사이트",
      description:
        "크리에이터 20명, 누적 조회수 3억 1천만 회의 운영 경험에서 나온 유튜브·숏폼·로컬 마케팅 인사이트를 확인해 보세요.",
    },
    hero: {
      eyebrow: "Insights",
      headline: "미디어 인사이트",
      subhead: "크리에이터 20명, 누적 조회수 3억 1천만 회의 운영 경험에서 나온 인사이트를 공유합니다.",
    },
    list: {
      readMore: "READ MORE →",
      items: [
        {
          badge: "MCN 인사이트",
          title: "크리에이터 20명, 누적 조회수 3억 1천만: 광주에서 만든 숫자입니다",
          desc: "MCN은 정확히 무슨 일을 할까요? 채널 기획부터 광고 연결까지, 크리에이터와 함께 성장하는 구조를 공개합니다.",
          date: "2026.06.15",
        },
        {
          badge: "채널 성장",
          title: "유튜브 7년의 결론: 채널이 크는 속도는 '구조'가 결정합니다",
          desc: "열심히만 올리는 채널과 설계된 채널의 성장 곡선은 다릅니다. 직접 운영하며 검증한 채널 설계 원칙을 정리했습니다.",
          date: "2026.03.25",
        },
        {
          badge: "숏폼",
          title: "콘텐츠 하나로 달라지는 경쟁력과 힘",
          desc: "광주 맛집 쇼츠가 수백만 조회수를 만드는 이유. 후킹·전개·CTA로 이어지는 전환형 숏폼 구조를 공개합니다.",
          date: "2026.02.10",
        },
        {
          badge: "광고·브랜디드",
          title: "광고는 레퍼런스가 전부입니다: 눈으로 확인시켜야 팔립니다",
          desc: "브랜드 광고 영상을 맡기기 전 반드시 봐야 할 것. 좋은 광고 레퍼런스를 구별하는 기준을 정리했습니다.",
          date: "2026.01.20",
        },
        {
          badge: "로컬 마케팅",
          title: "사장님이 인플루언서 마케팅으로 매출을 올리는 법",
          desc: "지역 기반 크리에이터와의 협업은 비용 대비 효과가 다릅니다. 로컬 인플루언서 마케팅 실전 가이드입니다.",
          date: "2025.12.05",
        },
        {
          badge: "채널 시작",
          title: "유튜브 채널 0에서 시작하기: 첫 90일 성장 로드맵",
          desc: "구독자 0에서 시작하는 채널을 위한 90일 플랜. 무엇을, 어떤 순서로 해야 하는지 단계별로 안내합니다.",
          date: "2025.11.12",
        },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────── Pricing
  pricing: {
    seo: {
      title: "가격 안내",
      description:
        "영상 편집부터 브랜디드 숏폼까지, 더퍼스트제너레이션의 패키지별 가격과 구성을 확인해 보세요.",
    },
    hero: {
      eyebrow: "Pricing",
      headline: "가격이\n궁금하신가요?",
      subhead: "옵션은 더하고, 부담은 줄였습니다.\n투명한 가격으로 안내드립니다.",
    },
    videoSection: {
      title: "유튜브 패키지",
      staffLabel: "참여 인원:",
      periodLabel: "제작 기간:",
      packages: videoPackages,
    },
    shortformSection: {
      title: "숏폼 패키지",
      packages: shortformPackages,
    },
    otherSection: {
      title: "이 외 서비스",
      packages: otherPackages,
    },
  },

  // ───────────────────────────────────────────────────────────── Contact
  contact: {
    seo: {
      title: "문의하기",
      description:
        "프로젝트 상담을 원하신다면 지금 바로 더퍼스트제너레이션에 연락해 주세요. 담당자가 빠르게 응답합니다.",
    },
    hero: {
      headline: "Contact Us",
      subhead: "성공적인 프로젝트의 시작, 더퍼스트제너레이션과 함께하세요.",
    },
    info: {
      sectionTitle: "Get in Touch",
      items: [
        { title: "Email", value: "dlwjdghks1107@naver.com" },
        { title: "Phone", value: "010-5208-0048" },
        { title: "Address", value: "광주광역시 서구 운천로 247 4층" },
        { title: "Business Hours", value: "Mon - Fri, 10:00 - 19:00" },
      ],
    },
    form: {
      sectionTitle: "프로젝트 문의",
      notice:
        "더퍼스트제너레이션은 무엇보다 진정성을 원합니다. 상세하고 정확하게 작성해주셔야 정확한 상담이 가능합니다.",
      brandLabel: "브랜드명",
      brandPlaceholder: "브랜드 / 회사명을 입력해주세요",
      managerLabel: "담당자 성함",
      managerPlaceholder: "홍길동",
      positionLabel: "담당자 직책",
      positionPlaceholder: "예) 마케팅팀 매니저 (선택)",
      phoneLabel: "연락처",
      phonePlaceholder: "010-0000-0000",
      channelLabel: "운영 중인 채널 URL",
      channelPlaceholder: "https://youtube.com/@yourchannel",
      bizLabel: "현재 운영 중인 기업·사업체 소개",
      bizPlaceholder: "어떤 사업을 하고 계신지 간단히 소개해주세요.",
      benchLabel: "벤치마킹 중인 채널 URL",
      benchPlaceholder: "참고하고 싶은 채널이 있다면 남겨주세요.",
      budgetLabel: "투자 가능한 월 예산",
      budgetPlaceholder: "선택해주세요",
      budgetOptions: [
        { value: "over_30m", label: "3,000만원 이상" },
        { value: "20_30m", label: "2,000만원 ~ 3,000만원" },
        { value: "10_20m", label: "1,000만원 ~ 2,000만원" },
        { value: "3_10m", label: "300만원 ~ 1,000만원" },
        { value: "under_3m", label: "300만원 이하" },
      ],
      serviceLabel: "어떤 서비스를 원하시나요?",
      servicePlaceholder: "선택해주세요",
      serviceOptions: [
        { value: "ad", label: "광고·브랜디드 콘텐츠 문의" },
        { value: "creator", label: "크리에이터 소속 문의" },
        { value: "production", label: "유튜브 영상 제작 문의" },
        { value: "management", label: "유튜브 채널 매니지먼트 문의" },
        { value: "etc", label: "기타 문의" },
      ],
      reasonLabel: "더퍼스트제너레이션에게 의뢰하신 이유",
      reasonPlaceholder: "저희를 선택해주신 이유를 알려주세요.",
      goalLabel: "유튜브를 운영하는 가장 큰 이유",
      goalPlaceholder: "유튜브를 통해 이루고 싶은 목표를 적어주세요.",
      sourceLabel: "더퍼스트제너레이션을 어떻게 알게 되셨나요?",
      sourcePlaceholder: "선택해주세요",
      sourceOptions: [
        { value: "naver", label: "네이버 검색" },
        { value: "blog", label: "블로그" },
        { value: "community", label: "온라인 커뮤니티" },
        { value: "referral", label: "지인 추천" },
        { value: "google", label: "구글" },
        { value: "etc", label: "기타" },
      ],
      consentLabel: "개인정보 수집 및 이용에 동의합니다.",
      submitButton: "작성 완료",
    },
  },

  // ───────────────────────────────────────────────────────────── NotFound
  notFound: {
    seo: { title: "페이지를 찾을 수 없음" },
    main: {
      code: "404",
      headline: "Page Not Found",
      body: "요청하신 페이지를 찾을 수 없습니다.\n입력하신 주소가 정확한지 다시 한 번 확인해주세요.",
      homeButton: "Back to Home",
    },
  },

  // ───────────────────────────────────────────────────────────── Global
  global: {
    site: {
      siteName: "더퍼스트제너레이션",
      defaultTitle: "더퍼스트제너레이션 | 세상을 사로잡는 콘텐츠 제작 파트너",
      defaultDescription:
        "더퍼스트제너레이션은 영상 제작·크리에이터 매니지먼트·광고 콘텐츠를 원스톱으로 제공하는 광주 기반 MCN 전문 기업입니다.",
      siteUrl: "https://thefirstmcn.com",
      ogImage: "/og-image.png",
    },
    header: {
      brand: "THE FIRST GENERATION",
      nav: [
        { name: "회사 소개", path: "/company" },
        { name: "서비스 소개", path: "/service" },
        { name: "제작 사례", path: "/portfolio" },
        { name: "칼럼", path: "/column" },
        { name: "가격 안내", path: "/pricing" },
        { name: "문의하기", path: "/contact" },
      ],
      themeToggleAria: "Toggle Theme",
    },
    footer: {
      brand: "THE FIRST GENERATION",
      tagline:
        "We create impactful media that drives growth.\nYour partner in digital transformation.",
      ctaButton: "Contact Us",
      socials: [
        { type: "instagram", label: "Instagram", href: "https://www.instagram.com/thefirstmcn/" },
        { type: "youtube", label: "YouTube", href: "https://www.youtube.com/@thefirstmcn" },
        { type: "naver", label: "네이버 블로그", href: "https://blog.naver.com/thefirstmcn" },
      ],
      addressLabel: "Address",
      address: "광주광역시 서구 운천로 247 4층",
      contactLabel: "Contact",
      phone: "Tel: 010-5208-0048",
      email: "E-mail: dlwjdghks1107@naver.com",
      infoLabel: "Info",
      businessName: "상호명: 더퍼스트제너레이션 | 대표: 이정환",
      businessNumber: "사업자 등록 번호: 867-08-02746",
      copyright: "Copyright ⓒ 2026 THE FIRST GENERATION. All Rights Reserved.",
      termsLink: "Terms of Use",
      termsPath: "/policy",
      privacyLink: "Privacy Policy",
      privacyPath: "/privacy",
    },
  },
};

/** Deep clone helper so callers can mutate without affecting defaults. */
export function cloneDefaults(key) {
  const src = key ? defaults[key] : defaults;
  return JSON.parse(JSON.stringify(src));
}
