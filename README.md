# DevTrend
항상 새로운 것을 배우고 싶어하는 개발자들, 혹은 이제 막 개발을 시작해 지식의 홍수 속에서 무엇을 공부해야 할지 막막한 개발자들을 위한 개발 관련 최신 키워드 분석 서비스입니다.

### Prerequisite
#### 1. CORS
상상치도 못했던 이슈인데, 그냥 request를 보내면 CORS policy에 막혀버려서 크롬 확장 기능인 moesif를 이용해야 한다. 기존에 기술 검토를 할 때 postman으로 요청을 보내서 성공적으로 응답을 받는 것까지 확인했는데, 실제 브라우저에서 요청을 보내보는 것을 사전에 확인해 보지 못했던 것이다 ㅠㅠ 실습 사이트여서 open API일 것이라 생각했지만 그렇지 않았고, 이 문제 때문에 이 프로젝트는 실 배포까지는 불가능할 것 같다.

#### 2. Google Recaptcha
SEDE 서비스는 정상적으로 이용하기 위해서 google recaptcha를 통해 본인이 로봇이 아님을 인증해야 한다. 따라서 인증을 하지 않고 보내는 요청은 당연히 실패한다. 이에 대한 해결 방법으로 recaptcha 서비스를 나의 프로젝트에도 적용해 정상적으로 인증된 token을 가지고 이와 함께 요청을 보내보면 성공하지 않을까 생각했었는데, recaptcha 서비스마다 고유한 site_key를 가지고 있기 때문에 나의 사이트에서 발급된 token은 SEDE 서비스에서 인증에 실패한다. 그래서 아쉽지만 recaptcha인증이 안되어 있을 시에는 SEDE 사이트에 가서 인증을 하고 오라는 내용의 alert를 띄우도록 했다.

### Intro

![devtrend1.PNG](https://images.velog.io/post-images/dvmflstm/65d92e30-f9f0-11e9-babc-99764141d905/devtrend1.PNG)
인트로 페이지. 특정 언어를 선택 또는 선택하지 않고, 원하는 기간을 선택해 search 버튼을 눌러본다.

![devtrend2.PNG](https://images.velog.io/post-images/dvmflstm/8047e260-f9f1-11e9-babc-99764141d905/devtrend2.PNG)
맨 처음 search 버튼을 누르면 위와 같은 메세지가 뜬다. 저 url로 들어가서 recaptcha인증을 하고 오면 정상적으로 검색이 가능하다.

### Search
![devtrend5.PNG](https://images.velog.io/post-images/dvmflstm/9fb71080-f9f1-11e9-babc-99764141d905/devtrend5.PNG)
검색 중.. 평균적으로 sql query문을 처리하는 데 약 20초 정도가 걸리는 것 같다.

### Pie Chart
![devtrend10.PNG](https://images.velog.io/post-images/dvmflstm/d3343780-f9f1-11e9-ac41-d980f8c23229/devtrend10.PNG)
언어를 javascript, 기간을 6개월로 검색해 본 결과이다.
Overall Popularity는 지난 3년간의 랭킹을, Recent Popularity는 지난 6개월간의 랭킹을 나타내준다.
그리고 Rising Keywords는 이 두 랭킹을 비교해 태그 수의 증가율이 높은 순으로 순위를 매긴 차트이다.
javascript에서는 역시 react와 vue가 최근에 많은 관심을 받고 있는 것으로 보인다.

![devtrend4.PNG](https://images.velog.io/post-images/dvmflstm/4de89200-f9f2-11e9-ac6e-c3097bad8d76/devtrend4.PNG)
위 nav Bar는 우측의 버튼을 통해 접었다 폈다 할 수 있으며, 이 곳에서 계속해서 검색이 가능하도록 했다.
그리고 overall popularity 차트와 recent popularity 차트의 좌측에 있는 show detail 버튼을 누르면 더 자세한 정보를 확인할 수 있는 bubble chart 페이지로 이동한다.

### Bubble Chart
![devtrend9.PNG](https://images.velog.io/post-images/dvmflstm/a3476dc0-f9f2-11e9-ac6e-c3097bad8d76/devtrend9.PNG)
javascript에 관한 overall popularity를 보여주는 bubble chart이다. 각 bubble의 크기는 popularity를 반영하도록 만들었다. jquery와 html이 압도적인 인기를 보여주는 것 같다.


![devtrend11.PNG](https://images.velog.io/post-images/dvmflstm/d4dd5e30-f9f2-11e9-ac6e-c3097bad8d76/devtrend11.PNG)
java에 관한 overall popularity는 위와 같다. javascript는 검색어들의 분포가 비교적 고른 데에 비해, java는 android와 spring 및 spring-boot 말고는 검색어들의 태그 수가 많지 않아보인다.

### 프로젝트를 통해 배운 점
- context API를 통한 전역적인 상태 관리 및 효율적인 컴포넌트 구조 설계
- typescript 문법 숙지
- d3 및 canvas를 이용한 data visualization
- open API에 관한 이해
- 복잡한 sql query 최적화 경험
- SEDE api 사용 경험
- google recaptcha 서비스 학습
- rxJS를 통한 비동기 처리, reactive programming 방식 학습
