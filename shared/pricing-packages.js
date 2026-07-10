/**
 * Package definitions shared between the Home pricing teaser
 * (`home.pricing`) and the dedicated Pricing page (`pricing.*Section`).
 *
 * Single source of truth — edit a package's title / staff / period / features
 * here and both pages update together.
 *
 * NOTE: `serviceDetail.services[].pricing` intentionally does NOT source from
 * here — it uses a different, price-bearing shape ({ name, price, vat }).
 */

export const videoPackages = [
  {
    title: "비즈니스 유튜브 운영 대행 400",
    staff: "에디터 2~3인 / 전문 기획 1인",
    period: "14일 이내 (프로젝트에 따라 상이)",
    features: [
      { value: "미러리스, 오즈모 카메라 촬영" },
      { value: "촬영전 기획안 전달" },
      { value: "컷편집" },
      { value: "BGM 삽입" },
      { value: "기본 자막" },
      { value: "포인트 자막" },
      { value: "색보정 효과" },
      { value: "유튜브 썸네일 제작" },
      { value: "숏폼 제작 및 업로드 대행" },
    ],
  },
  {
    title: "개인 유튜브 운영 대행 300",
    staff: "에디터 1~2인 / 전문 기획 1인",
    period: "14일 이내 (프로젝트에 따라 상이)",
    features: [
      { value: "미러리스, 오즈모 카메라 촬영" },
      { value: "촬영전 기획안 전달" },
      { value: "컷편집" },
      { value: "BGM 삽입" },
      { value: "기본 자막" },
      { value: "포인트 자막" },
      { value: "색보정 효과" },
      { value: "유튜브 썸네일 제작" },
      { value: "숏폼 제작 및 업로드 대행" },
    ],
  },
  {
    title: "촬영없이 편집만 편당 50",
    staff: "에디터 1인 / 디자이너 1인",
    period: "10일 이내 (프로젝트에 따라 상이)",
    features: [
      { value: "컷편집" },
      { value: "BGM 삽입" },
      { value: "기본 자막" },
      { value: "포인트 자막" },
      { value: "색보정 효과" },
      { value: "유튜브 썸네일 제작" },
      { value: "최종 영상 편집 길이 8~12분" },
    ],
  },
];

export const shortformPackages = [
  {
    title: "비즈니스 숏폼 20건 제작 300",
    staff: "에디터 1~2인 / 전문 기획 1인",
    period: "10일 이내 (프로젝트에 따라 상이)",
    features: [
      { value: "미러리스, 오즈모 카메라 촬영" },
      { value: "컷편집" },
      { value: "기본 자막" },
      { value: "포인트 자막" },
      { value: "색보정 효과" },
      { value: "썸네일 제작 및 업로드 대행" },
    ],
  },
  {
    title: "개인 숏폼 20건 제작 250",
    staff: "에디터 1~2인 / 전문 기획 1인",
    period: "10일 이내 (프로젝트에 따라 상이)",
    features: [
      { value: "미러리스, 오즈모 카메라 촬영" },
      { value: "컷편집" },
      { value: "기본 자막" },
      { value: "포인트 자막" },
      { value: "색보정 효과" },
      { value: "썸네일 제작 및 업로드 대행" },
    ],
  },
  {
    title: "촬영없이 숏폼 편집만 편당 10",
    staff: "에디터 1인 / 분석가 1인",
    period: "10일 이내 (프로젝트에 따라 상이)",
    features: [
      { value: "컷편집" },
      { value: "기본 자막" },
      { value: "포인트 자막" },
      { value: "색보정 효과" },
      { value: "썸네일 제작" },
      { value: "최종 영상 편집 길이 1~2분" },
    ],
  },
];

// "이 외 서비스" — pricing page extra service cards (no fixed price)
export const otherPackages = [
  {
    title: "인플루언서 섭외",
    features: [
      { value: "소속 크리에이터 우선순위 매칭" },
      { value: "영향력 있는 인플루언서 섭외" },
    ],
  },
  {
    title: "기업 홍보 영상 제작",
    features: [
      { value: "브랜드의 성장을 위한 홍보영상 제작" },
      { value: "목적에 맞는 최적의 영상 콘텐츠" },
    ],
  },
  {
    title: "유튜브 채널 컨설팅",
    staff: "에디터 1인 / 전문 기획 1인",
    features: [
      { value: "유튜브 채널 진단 및 컨설팅" },
      { value: "편집스타일 및 방향 수립" },
    ],
  },
];
