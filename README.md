# 🐾 펫토리 (Petory) - 반려동물 통합 플랫폼

반려동물과 함께하는 따뜻한 일상을 위한 통합 플랫폼입니다.

## 🎨 디자인 원칙

- **Warm & Trust**: 따뜻한 감성과 신뢰감을 주는 컬러 팔레트
  - Main Color: #FF9F43 (Sunset Orange)
  - Sub Color: #48C9B0 (Mint Green)
- **One-Hand Operation**: 한 손으로도 조작하기 쉬운 UX
- **Data Visualization**: 직관적인 아이콘과 그래프 활용

## 🚀 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com)에 접속하여 애플리케이션을 등록합니다.
2. JavaScript 키를 발급받습니다.
3. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key_here
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

> **참고**: Kakao Map API 키가 없어도 앱은 실행되지만, 지도 기능은 작동하지 않습니다. 개발 단계에서는 기본 위치(서울시청)가 표시됩니다.

## 📱 주요 기능

### 1. 메인 화면 (Dashboard)
- 반려동물 프로필 및 기분 표시
- 산책 퀵 버튼 (FAB)
- 건강 체크박스 (사료 급여, 약 복용)
- 컨텍스트 배너 (날씨/미세먼지 정보)
- 통계 카드 (산책 횟수, 포인트)

### 2. 산책 & 랜드마크
- **실제 지도 표시** (Kakao Map API 연동)
- **현재 위치 추적** (Geolocation API)
- **실시간 산책 경로 그리기** (Polyline)
- **랜드마크 마커** (카페, 병원 등)
- **강아지 출입 금지 구역 표시** (원형 오버레이)
- **산책 통계** (거리, 시간, 포인트 자동 계산)
- 랜드마크 팝업 알림
- 산책 경로 기록 및 공유

### 3. 건강 관리 & 진단
- AI 카메라 진단 (눈/피부 건강)
- 몸무게 추이 그래프
- 건강 기록 타임라인
- 접종 알림

### 4. 예약 & 커뮤니티
- 필터 시스템 (주차 가능, 대형견 가능, 노키즈존)
- 실시간 예약 현황
- 동네 친구 (현재 산책 중인 강아지 정보)

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Maps**: react-kakao-maps-sdk (Kakao Map API)

## 📁 프로젝트 구조

```
Petory/
├── app/
│   ├── page.tsx          # 메인 화면
│   ├── walk/
│   │   └── page.tsx      # 산책 & 랜드마크
│   ├── health/
│   │   └── page.tsx      # 건강 관리 & 진단
│   ├── service/
│   │   └── page.tsx      # 예약 & 커뮤니티
│   ├── layout.tsx        # 루트 레이아웃
│   └── globals.css       # 전역 스타일
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🎯 다음 단계

- [x] 실제 지도 API 연동 (Kakao Map)
- [ ] 날씨 API 연동
- [ ] 백엔드 API 연동
- [ ] 사용자 인증 시스템
- [ ] 푸시 알림 기능
- [ ] 이미지 업로드 및 저장
- [ ] 산책 경로 저장 및 히스토리
- [ ] 랜드마크 데이터베이스 연동

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

