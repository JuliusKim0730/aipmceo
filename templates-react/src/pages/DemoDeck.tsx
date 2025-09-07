import React from 'react';
import {
  TitleHero, Question, ThreeCard, Compare, CaseStudy,
  KPIBoard, Framework, Checklist, Quote, Summary
} from '@/templates';
import { ImageContext } from '@/templates/types';

const heroImg: ImageContext = { type:'url', src:'/images/ai-hero.webp', alt:'AI x Business', fit:'cover' };

export const DemoDeck: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Chapter 1. Intro (p1–p10) */}
      <TitleHero
        title="기획자가 AI로 창업할 수 있을까?"
        subTitle="시작보다 어려운 건, 끝까지 가는 것"
        imageContext={{ type:'none' }}
      />

      <Framework
        title="오늘의 여정"
        subTitle="문제 → 유형 → 장벽 → 차별화 → 가이드"
        steps={[
          { title:'문제' }, { title:'유형' }, { title:'장벽' }, { title:'차별화' }, { title:'가이드' }
        ]}
      />

      <Question
        title="여러분, AI 창업을 꿈꿔본 적 있으신가요?"
        subTitle="지금 떠오르는 첫 장면은 무엇인가요?"
        imageContext={{ type:'icon', name:'help-circle', label:'question' }}
      />

      <ThreeCard
        title="무엇을 상상하셨나요?"
        subTitle="앱 / 툴 / 인플루언서"
        items={[
          { label:'앱', desc:'모바일 MVP' },
          { label:'툴', desc:'업무자동화 SaaS' },
          { label:'인플루언서', desc:'AI 캐릭터/브랜드' }
        ]}
      />

      <Question
        title="아직 시작하지 못한 이유는?"
        subTitle="한 가지 이유가 전부는 아닙니다"
        imageContext={{ type:'icon', name:'user-question', label:'thinking' }}
      />

      <ThreeCard
        title="장벽 ① 자본"
        subTitle="초기비용·구독·서버·광고"
        items={[
          { label:'초기비용' },
          { label:'구독 비용' },
          { label:'서버/광고' }
        ]}
      />

      <ThreeCard
        title="장벽 ② 기술"
        subTitle="코드·스택·학습곡선"
        items={[
          { label:'코드' },
          { label:'스택' },
          { label:'학습곡선' }
        ]}
      />

      <ThreeCard
        title="장벽 ③ 두려움"
        subTitle="실패·시간손실·주변시선"
        items={[
          { label:'실패' },
          { label:'시간 손실' },
          { label:'주변 시선' }
        ]}
      />

      <Quote
        title="돈이 있어도 못하는 이유"
        subTitle="AI 창업도 본질은 같다"
      />

      <Summary
        title="시작은 쉽다"
        subTitle="어려운 건 지속과 수익화"
      />

      {/* Chapter 2. 유튜브 붐과 AI 창업의 닮은 점 (p11–p20) */}
      <TitleHero
        title="유튜브 붐과 AI 창업은 닮아있다"
        subTitle="Start Easy / Survive Hard"
        imageContext={{ type:'none' }}
      />

      <Compare
        title="진입은 쉬움"
        subTitle="도구 접근성은 높다"
        left={{ title:'스마트폰/카메라', bullets:['촬영·편집 앱', '간편 업로드', '저비용 시작'] }}
        right={{ title:'챗/툴 UI', bullets:['LLM 도구', '노코드', '빠른 프로토'] }}
      />

      <KPIBoard
        title="생존은 소수"
        subTitle="시작 대비 유지율 급감"
        kpis={[
          { label:'초기 시도', value:'100%' },
          { label:'3개월 유지', value:'~25%' },
          { label:'1년 지속', value:'<10%', hint:'가상의 수치' }
        ]}
      />

      <CaseStudy
        title="초기 유튜브"
        subTitle="누구나 시작, 소수만 생존"
        imageContext={{ type:'icon', name:'video', label:'thumbnail mosaic' }}
        points={[
          { label:'특징', desc:'낮은 진입장벽' },
          { label:'결과', desc:'상위 소수 집중' }
        ]}
      />

      <CaseStudy
        title="인스타 인플루언서"
        subTitle="빠른 성장, 급감도 흔했다"
        imageContext={{ type:'icon', name:'line-chart', label:'follower trend' }}
        points={[
          { label:'성장', desc:'플랫폼 파워' },
          { label:'변동', desc:'알고리즘 리스크' }
        ]}
      />

      <Summary
        title="AI 창업도 같은 함정"
        subTitle="시작은 쉬워도 유지가 어렵다"
      />

      <Compare
        title="유튜브 vs AI"
        subTitle="진입장벽 낮음 / 경쟁 극심"
        left={{ title:'유튜브', bullets:['누구나 촬영', '도구 풍부', '경쟁 과열'] }}
        right={{ title:'AI', bullets:['생태계 개방', 'LLM 활용', '차별화 관건'] }}
      />

      <Quote
        title="시도는 쉽다"
        subTitle="문제는 수익화다"
      />

      <Summary
        title="나 역시 ‘유지’가 어려웠다"
        subTitle="공감에서 솔루션으로"
      />

      <Summary
        title="핵심: 꾸준히 살아남기"
        subTitle="다음 챕터: 유형 탐색"
      />

      {/* Chapter 3. 유형 1 — 기획자동화 / SaaS / 직접 창업 (p21–p30) */}
      <TitleHero
        title="기획자의 AI 창업 유형 · Part 1"
        subTitle="자동화 / SaaS / 직접개발"
        imageContext={{ type:'none' }}
      />

      <ThreeCard
        title="유형① 기획 자동화"
        subTitle="더 많은 프로젝트를 받기 위한 기반"
        items={[
          { label:'리서치' },
          { label:'정리' },
          { label:'문서' }
        ]}
      />

      <Framework
        title="자동화 워크플로"
        subTitle="아이디어→리서치→와이어→요약→리뷰"
        steps={[
          { title:'아이디어' }, { title:'리서치' }, { title:'와이어' }, { title:'요약' }, { title:'리뷰' }
        ]}
      />

      <CaseStudy
        title="유형② SaaS"
        subTitle="‘내 도구’를 구독으로 판매"
        imageContext={{ type:'icon', name:'pricing', label:'pricing cards' }}
        points={[
          { label:'Starter', desc:'입문형' },
          { label:'Pro', desc:'전문가' }
        ]}
      />

      <KPIBoard
        title="SaaS 핵심지표"
        subTitle="MRR / Churn / ARPA"
        kpis={[
          { label:'MRR', value:'$12,340', delta:'+8.2%', hint:'MoM' },
          { label:'Churn', value:'3.1%', delta:'-0.4pt', hint:'Logo' },
          { label:'ARPA', value:'$27', hint:'Avg per account' }
        ]}
      />

      <ThreeCard
        title="유형③ 직접 개발"
        subTitle="노코드/바이브코딩으로 MVP"
        items={[
          { label:'노코드' },
          { label:'간단 DB' },
          { label:'오토메이션' }
        ]}
      />

      <Framework
        title="스타트업 스택"
        subTitle="디자인→프론트→LLM→결제→분석"
        steps={[
          { title:'디자인' }, { title:'프론트' }, { title:'LLM' }, { title:'결제' }, { title:'분석' }
        ]}
      />

      <CaseStudy
        title="Notion AI"
        subTitle="기능 내장형 AI 확장"
        imageContext={{ type:'icon', name:'notion', label:'notion' }}
        points={[
          { label:'핵심', desc:'문서작성/요약/리서치 내장' },
          { label:'BM', desc:'구독 기반' }
        ]}
      />

      <CaseStudy
        title="Jasper"
        subTitle="B2B 카피라이팅에서 확장"
        imageContext={{ type:'icon', name:'jasper', label:'jasper' }}
        points={[
          { label:'시장', desc:'B2B 카피' },
          { label:'확장', desc:'멀티 캠페인' }
        ]}
      />

      <Summary
        title="기획+AI = 포트폴리오"
        subTitle="모델 혼합으로 리스크 분산"
      />

      {/* Chapter 4. 유형 2 — 커머스 / 가상 인플루언서 / 교육 (p31–p40) */}
      <TitleHero
        title="기획자의 AI 창업 유형 · Part 2"
        subTitle="커머스 / 가상 인플루언서 / 교육"
        imageContext={{ type:'none' }}
      />

      <ThreeCard
        title="유형④ 가상 인플루언서"
        subTitle="팬덤 엔진으로서의 캐릭터"
        items={[
          { label:'페르소나' },
          { label:'톤' },
          { label:'세계관' }
        ]}
      />

      <CaseStudy
        title="대표 사례"
        subTitle="대형 팔로잉의 가상 인플루언서"
        imageContext={{ type:'icon', name:'profile', label:'sns card' }}
        points={[
          { label:'브랜딩', desc:'캐릭터 중심' },
          { label:'운영', desc:'UGC/협업' }
        ]}
      />

      <ThreeCard
        title="유형⑤ 커머스"
        subTitle="AI 콘텐츠→판매 연결"
        items={[
          { label:'상세페이지' },
          { label:'SNS 숏폼' },
          { label:'장바구니' }
        ]}
      />

      <Framework
        title="팬퍼스트 퍼널"
        subTitle="콘텐츠→팬덤→구독/제품→커뮤니티"
        steps={[
          { title:'콘텐츠' }, { title:'팬덤' }, { title:'구독/제품' }, { title:'커뮤니티' }
        ]}
        variant="funnel"
      />

      <ThreeCard
        title="유형⑥ 교육/부트캠프"
        subTitle="신뢰 기반의 성과형 커리큘럼"
        items={[
          { label:'커리큘럼' },
          { label:'수료증' },
          { label:'수강생' }
        ]}
      />

      <CaseStudy
        title="AI 교육 시장 트렌드"
        subTitle="확산과 한계(진정성/참여)"
        imageContext={{ type:'icon', name:'news', label:'article tiles' }}
      />

      <CaseStudy
        title="Artisan AI"
        subTitle="공격적 캠페인과 브랜드 상기"
        imageContext={{ type:'icon', name:'billboard', label:'billboard' }}
      />

      <Compare
        title="장단점"
        subTitle="교육=신뢰 / 커머스=물류"
        left={{ title:'교육', bullets:['신뢰/커리큘럼', '커뮤니티', '리텐션'] }}
        right={{ title:'커머스', bullets:['물류/CS', '마진 관리', '재고'] }}
      />

      <Summary
        title="모델은 무궁무진"
        subTitle="핵심은 브랜드·팬덤"
      />

      {/* Chapter 5. 누구나 할 수 있다, 누구나 따라할 수 있다 (p41–p50) */}
      <TitleHero
        title="누구나 만들 수 있다"
        subTitle="하지만, 누구나 베낄 수 있다"
        imageContext={{ type:'icon', name:'copy', label:'duplicate pattern' }}
      />

      <Checklist
        title="카페 비유"
        subTitle="집에서도 커피를 내릴 수 있다"
        numbered
        items={[
          { label:'홈브루', desc:'도구만 있으면 가능' },
          { label:'카페', desc:'경험/장소/브랜드' }
        ]}
      />

      <Checklist
        title="김치찌개 비유"
        subTitle="어디서든 먹을 수 있지만, ‘그 집’이 있다"
        items={[
          { label:'레시피' },
          { label:'재료' },
          { label:'경험/브랜드' }
        ]}
      />

      <Framework
        title="순대타운"
        subTitle="유명점포→유사점포→골목"
        steps={[
          { title:'유명점포' }, { title:'유사점포' }, { title:'골목 확산' }
        ]}
      />

      <Summary
        title="결론은 차별화"
        subTitle="맛/가격/속도/경험"
      />

      <Framework
        title="‘골목식당’ 모델"
        subTitle="오리지널 1 vs 카피 N"
        steps={[
          { title:'오리지널' }, { title:'카피' }, { title:'허브-스포크' }
        ]}
      />

      <CaseStudy
        title="ChatGPT 앱 클론"
        subTitle="하루 만에 비슷한 UI가 쏟아진다"
        imageContext={{ type:'icon', name:'grid', label:'app mosaic' }}
      />

      <CaseStudy
        title="이미지/프롬프트 클론"
        subTitle="상위 모델 종속·가격경쟁"
        imageContext={{ type:'icon', name:'before-after', label:'before/after' }}
      />

      <CaseStudy
        title="Perplexity"
        subTitle="검색 경험 자체의 차별화"
        imageContext={{ type:'icon', name:'quote', label:'citation card' }}
      />

      <Summary
        title="차별화 없는 창업 = 단명"
        subTitle="다음: 현실 장벽과 수치"
      />

      {/* Chapter 6. 현실적 장벽 (p51–p60) */}
      <TitleHero
        title="현실적 장벽"
        subTitle="기술보다 비즈니스가 어렵다"
        imageContext={{ type:'icon', name:'alert', label:'warning' }}
      />

      <Checklist
        title="빠른 복제"
        subTitle="오늘 만든 서비스, 내일이면 카피"
        items={[{ label:'카피 리스크' }, { label:'속도전' }, { label:'차별화' }]}
      />

      <KPIBoard
        title="자본의 압박"
        subTitle="광고·서버·인력·지원"
        kpis={[
          { label:'광고비', value:'↑' },
          { label:'서버', value:'↑' },
          { label:'인력', value:'↔︎/↑' }
        ]}
      />

      <Checklist
        title="법/보안"
        subTitle="데이터·저작권·개인정보"
        items={[{ label:'데이터' }, { label:'저작권' }, { label:'개인정보' }]}
      />

      <KPIBoard
        title="CAC vs LTV"
        subTitle="유입 비용 상승, LTV로 상쇄"
        kpis={[
          { label:'CAC', value:'상승' },
          { label:'LTV', value:'개선 필요' },
          { label:'마진', value:'관리' }
        ]}
      />

      <Summary
        title="반짝 트렌드의 소멸"
        subTitle="속도전: 반응→피드백→개선"
      />

      <CaseStudy
        title="학생 창업의 빠른 검증"
        subTitle="작은 성공/학습 축적"
        imageContext={{ type:'icon', name:'news', label:'tile' }}
      />

      <CaseStudy
        title="여행 AI의 과제"
        subTitle="주목은 쉬우나 수익화는 어려움"
        imageContext={{ type:'icon', name:'calendar', label:'itinerary' }}
      />

      <CaseStudy
        title="니치 공략"
        subTitle="특수 도메인에서의 확실한 가치"
        imageContext={{ type:'icon', name:'map', label:'niche' }}
      />

      <Summary
        title="문제는 기술이 아니라 비즈니스"
        subTitle="BM·브랜딩·유통·법무·운영"
      />

      {/* Chapter 7. 우리가 팔아야 하는 것 (p61–p70) */}
      <TitleHero
        title="우리가 팔아야 하는 것"
        subTitle="기술이 아닌, 상상력/시도/세계관"
        imageContext={{ type:'icon', name:'showcase', label:'showcase' }}
      />

      <Quote
        title="기술은 베껴진다"
        subTitle="기능은 곧 평준화된다"
      />

      <ThreeCard
        title="우리가 파는 것 = 상상력"
        subTitle="스토리텔링/톤/메시지"
        items={[{ label:'스토리텔링' }, { label:'톤' }, { label:'메시지' }]}
      />

      <ThreeCard
        title="우리가 파는 것 = 시도"
        subTitle="빈도·속도·학습"
        items={[{ label:'빈도' }, { label:'속도' }, { label:'학습' }]}
      />

      <ThreeCard
        title="우리가 파는 것 = 세계관"
        subTitle="브랜드 내러티브"
        items={[{ label:'세계관' }, { label:'상징' }, { label:'팬덤' }]}
      />

      <CaseStudy
        title="팬덤 파워"
        subTitle="협업·UGC·리텐션"
        imageContext={{ type:'icon', name:'tiles', label:'logos' }}
      />

      <KPIBoard
        title="팬덤 지표"
        subTitle="커뮤니티 활성/UGC/리텐션"
        kpis={[
          { label:'활성도', value:'↑' },
          { label:'UGC', value:'↑' },
          { label:'리텐션', value:'↑' }
        ]}
      />

      <Checklist
        title="멈추지 않는 변화"
        subTitle="릴리즈 노트 = 마케팅"
        items={[{ label:'반복' }, { label:'개선' }, { label:'공개' }]}
      />

      <Quote
        title="영원불멸한 비즈니스는 없다"
        subTitle="정체는 곧 후퇴"
      />

      <Summary
        title="움직이는 브랜드가 살아남는다"
        subTitle="다음: 실행 가이드"
      />

      {/* Chapter 8. 가이드 & 희망 (p71–p80) */}
      <TitleHero
        title="가이드 & 희망"
        subTitle="오늘부터 가능한 것들"
        imageContext={{ type:'none' }}
      />

      <Checklist
        title="시도해도 된다"
        subTitle="리스크는 낮게, 배움은 크게"
        items={[{ label:'작게 시작' }, { label:'빠른 피드백' }, { label:'반복' }]}
      />

      <Quote
        title="실패는 포트폴리오가 된다"
        subTitle="실패-로그 공개 문화"
      />

      <KPIBoard
        title="월 20달러 실험 패키지"
        subTitle="LLM+빌드툴로 MVP"
        kpis={[
          { label:'LLM', value:'$X' },
          { label:'빌드툴', value:'$Y' },
          { label:'합계', value:'~$20' }
        ]}
      />

      <Framework
        title="실행 사이클"
        subTitle="작게 시작→빠른 피드백→개선→확장"
        steps={[
          { title:'Start' }, { title:'Feedback' }, { title:'Improve' }, { title:'Scale' }
        ]}
        variant="cycle"
      />

      <Checklist
        title="오늘 시작할 5가지"
        subTitle="아이디어·프로토·SNS·팬 50명·반복"
        numbered
        items={[
          { label:'아이디어 도출' },
          { label:'프로토타입' },
          { label:'SNS 테스트' },
          { label:'팬 50명' },
          { label:'반복' }
        ]}
      />

      <CaseStudy
        title="차별화의 힘"
        subTitle="검색 경험 재정의 사례"
        imageContext={{ type:'icon', name:'quote', label:'citation' }}
      />

      <Quote
        title="AI는 기획자의 동반자"
        subTitle="대체가 아니라 증폭기"
      />

      <TitleHero
        title="여러분의 시도가 세상을 바꿀 수 있습니다"
        subTitle="오늘, 1개만 시작하세요"
        imageContext={{ type:'none' }}
      />

      <Summary
        title="감사합니다"
        subTitle="Q&A / 다운로드 버튼 노출"
      />
    </main>
  );
}


