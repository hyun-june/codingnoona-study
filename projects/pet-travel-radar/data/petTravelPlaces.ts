export type PetTravelPlace = {
  id: string;
  name: string;
  category: 'Cafe' | 'Walk' | 'Stay' | 'Tour' | 'Food';
  lat: number;
  lng: number;
  distanceM: number;
  bearingDeg: number;
  petPolicy: string;
  address: string;
  openNow: boolean;
  tags: string[];
  tip: string;
};

export const scanRadiusM = 420;

export const petTravelPlaces: PetTravelPlace[] = [
  {
    id: 'cafe-01',
    name: '바우라운지 북촌',
    category: 'Cafe',
    lat: 37.5797,
    lng: 126.9869,
    distanceM: 140,
    bearingDeg: 22,
    petPolicy: '소형견 실내 동반 가능, 리드줄 필수',
    address: '서울 종로구 북촌로 7길',
    openNow: true,
    tags: ['실내동반', '물그릇', '포토존'],
    tip: '한옥 골목 산책 뒤 쉬어가기 좋은 카페예요.',
  },
  {
    id: 'walk-01',
    name: '청계천 펫 산책길',
    category: 'Walk',
    lat: 37.5692,
    lng: 126.9782,
    distanceM: 260,
    bearingDeg: 105,
    petPolicy: '야외 산책 가능, 배변봉투 지참',
    address: '서울 중구 청계천로',
    openNow: true,
    tags: ['산책', '야외', '그늘길'],
    tip: '초행인 반려동물도 부담이 적은 평탄한 코스예요.',
  },
  {
    id: 'tour-01',
    name: '달빛정원 반려동물 쉼터',
    category: 'Tour',
    lat: 37.5719,
    lng: 126.9912,
    distanceM: 390,
    bearingDeg: 248,
    petPolicy: '야외 구역 동반 가능, 실내 전시관 제외',
    address: '서울 종로구 율곡로',
    openNow: true,
    tags: ['관광지', '야외석', '사진명소'],
    tip: '사람이 붐비기 전 오전 방문을 추천해요.',
  },
  {
    id: 'food-01',
    name: '꼬리별 브런치',
    category: 'Food',
    lat: 37.5644,
    lng: 126.9821,
    distanceM: 470,
    bearingDeg: 166,
    petPolicy: '테라스석 동반 가능, 대형견은 사전 문의',
    address: '서울 중구 명동길',
    openNow: false,
    tags: ['테라스', '브런치', '예약추천'],
    tip: '영업 전이라 코스 후반 후보로 저장해두면 좋아요.',
  },
  {
    id: 'stay-01',
    name: '포포인 펫 스테이',
    category: 'Stay',
    lat: 37.5755,
    lng: 126.9704,
    distanceM: 610,
    bearingDeg: 304,
    petPolicy: '10kg 이하 반려견 1마리 동반 가능',
    address: '서울 종로구 새문안로',
    openNow: true,
    tags: ['숙소', '어메니티', '주차'],
    tip: '숙박형 코스로 확장할 때 보여주기 좋은 데이터예요.',
  },
  {
    id: 'tour-02',
    name: '한강 펫 피크닉존',
    category: 'Tour',
    lat: 37.5261,
    lng: 126.9341,
    distanceM: 780,
    bearingDeg: 205,
    petPolicy: '야외 피크닉 가능, 돗자리 구역 이용',
    address: '서울 영등포구 여의동로',
    openNow: true,
    tags: ['피크닉', '강변', '넓은공간'],
    tip: '반경 밖 장소도 다음 이동 후보로 보여줄 수 있어요.',
  },
];
