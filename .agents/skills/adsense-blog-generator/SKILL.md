---
name: adsense-blog-generator
description: 구글 애드센스 수익화 및 구글 SEO 최적화 블로그 포스트 생성, HTML 템플릿 작성, 광고 슬롯 배치 및 자동 발행 스크립트 연동 가이드
---

# 구글 애드센스 & SEO 최적화 블로그 글 생성 스킬 (Starrope Blog System)

이 스킬은 Starrope 네트워크의 7개 구글 애드센스 수익화 블로그에 구글 SEO 최적화 글을 작성하고, 광고 수익 극대화 요소를 자동으로 적용하여 발행하는 규격화된 지침입니다.

---

## 1. 🌐 7개 블로그 도메인 및 주제 정의

| 블로그 번호 | 폴더명 | 도메인 | 주요 주제 및 타겟 키워드 |
| :--- | :--- | :--- | :--- |
| **블로그 1** | `1)_애드센스_블로그_1` | `blog1.starrope2023.com` | IT, 개발, AI 툴, 코딩, 애드센스 수익화 노하우 |
| **블로그 2** | `2)_애드센스_블로그_2` | `blog2.starrope2023.com` | AI 신기술, 에이전틱 코딩, 딥시크/클로드/GPT 비교 분석 |
| **블로그 3** | `3)_애드센스_블로그_3` | `blog3.starrope2023.com` | 경제, 재테크, 아파트 청약, 부동산, 앱테크, 생활 정보 |
| **블로그 4** | `4)_애드센스_블로그_4` | `blog4.starrope2023.com` | 금융, 코인, Web3, 핀테크, 주식, 퀀트 투자 |
| **블로그 5** | `5)_애드센스_블로그_5` | `blog5.starrope2023.com` | 건강, 영양제, 관절/맥주효모/아르기닌, 시니어 헬스케어 |
| **블로그 6** | `6)_애드센스_블로그_6` | `blog6.starrope2023.com` | 항노화, 보충제, 아피제닌/아슈와간다/베르베린, 바이오 |
| **블로그 7** | `7)_애드센스_블로그_7` | `blog7.starrope2023.com` | 정부 지원금, 복지 정책, 틀니/임플란트, 청년/시니어 혜택 |

---

## 2. 💡 애드센스 공통 광고 설정 및 전면 광고 트리거 구조

- **AdSense Publisher ID**: `ca-pub-1692428092138510`
- **Auto Ads Script**:
  ```html
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1692428092138510" crossorigin="anonymous"></script>
  ```

### 필수 광고 위치 (Ad Placement)
1. **본문 상단 반응형 광고 (Header Ad)**:
   ```html
   <ins class="adsbygoogle ad-slot ad-header"
        style="display:block"
        data-ad-client="ca-pub-1692428092138510"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```
2. **본문 중간 인피드/아티클 광고 (In-Content Ad)**:
   ```html
   <ins class="adsbygoogle ad-slot ad-content"
        style="display:block; text-align:center;"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-1692428092138510"
        data-ad-slot="5566778899"></ins>
   ```
3. **전면 광고 100% 트리거 브릿지 상자 (High-Converting Redirect Box)**:
   독자가 외부 공식 사이트(신청 페이지 등)로 이동 시 `apply.html` 브릿지 페이지를 거쳐 100% 전면 광고를 노출시키는 고수익 CTA 구조입니다.
   ```html
   <div class="redirect-box">
     <h3 class="redirect-title">📍 [공식 신청/상세 보기 페이지] 바로가기</h3>
     <p class="redirect-desc">
       아래 버튼을 클릭하시면 공식 신청 페이지(안전 연결)로 즉시 이동합니다.<br>
       (이동 시 1~2초간 보안 점검 및 로딩이 진행될 수 있습니다.)
     </p>
     <a href="../apply.html?target=https://실제이동할공식URL" class="redirect-cta-btn" target="_blank" rel="noopener">
       공식 사이트 바로가기 ➔
     </a>
   </div>
   ```

---

## 3. 🎯 구글 SEO 최적화 작성 규칙

1. **타이틀(Title) 규칙**:
   - 검색엔진 검색 결과에서 클릭을 유도할 수 있도록 **해당 연도(예: 2026년)**, **핵심 대상(어르신/청년/소상공인 등)**, **핵심 혜택/조건/신청방법** 키워드를 조합.
   - 예시: `2026년 노인 틀니 임플란트 건강보험 지원 본인부담금 나이 조건 총정리`

2. **메타 설명(Meta Description)**:
   - 80~120자 내외로 글 전체를 핵심 요약하며 검색 유저의 궁금증을 유발하는 문장 구성.

3. **구조화 표 (Summary Table)**:
   - 글 상단 서론 직후 `<table>` 태그를 활용해 지원 대상, 혜택, 신청 방법, 신청 기간 등을 한눈에 파악할 수 있는 요약표 수록.

4. **추천 스니펫 타겟팅 (FAQ 섹션)**:
   - 글 하단에 자주 묻는 질문(FAQ) 3~4개를 `Q&A` 형식으로 작성하여 구글 피처드 스니펫 최상단 노출 유도.

5. **인용구(Quote) 및 강조**:
   - `<blockquote>` 태그로 핵심 주의사항 및 팁을 강조하고, 주요 수치나 액수는 `<strong>` 처리.

6. **에디터 프로필 (Author Profile Box)**:
   - 글 하단에 블로그 성격에 맞는 에디터 프로필 박스를 수록하여 E-E-A-T (경험, 전문성, 권위성, 신뢰성) 충족.

---

## 4. 📝 포스트 작성 및 시스템 반영 절차

글 생성 요청을 받으면 아래 절차에 따라 처리합니다.

1. **주제 및 블로그 선택**: 요청 내용에 맞춰 1~7번 블로그 중 적합한 대상 선택.
2. **HTML 파일 생성**: 대상 블로그의 `posts/` 디렉토리에 SEO 규격 HTML 파일 생성.
3. **`schedule.json` 반영**: 포스트 제목, 파일명, 날짜, 이미지 URL, 카테고리 등 메타데이터 추가.
4. **발행/동기화 실행**: `scripts/publish.py` 또는 `update_blog7.py` 실행을 통해 `index.html` 및 `sitemap.xml`에 새 포스트 카드 자동 등록.

---
