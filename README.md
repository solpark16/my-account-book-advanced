# 개인 지출 관리 애플리케이션

## 필수 구현 사항

- 지출 CRUD 구현 (작성, 조회, 수정, 삭제)
- 월별 지출 조회 기능 구현 (Home - Read)
- 월별 지출 항목 등록 구현 (Home - Create)
- 지출 상세 화면 구현 (Detail - Read)
- 상세화면에서 지출 항목 수정 구현 (Detail - Update)
- 상세화면에서 지출 항목 삭제 구현 (Detail - Delete)

## 필수 요구 사항

- styled-components 를 이용하여 스타일링
  - 인라인 스타일링이나 일반 css 파일을 이용한 스타일링 방식 지양 (이번 과제 한정)
  - 모든 태그를 styled-components 화 할 필요는 없으나 스타일링이 들어가는 경우는 styled-components 화 할 것
- styled-components에 props를 넘김으로 인한 조건부 스타일링 적용
  - 월 선택 탭에 적용해 보세요
- react-router-dom 을 이용해서 페이지 전환을 합니다.
  - 지출을 수정하기 위한 페이지 이동 시에 사용해주세요.
- useState, useEffect, useRef 사용
  - 과제 안내 순서에 각각 어디에서 사용되면 좋을지 가이드를 드렸습니다. 해당 부분에서 위의 기능들을 각각 사용해주세요
- 지출 항목 등록 시 id는 uuid 라이브러리를 이용
  (npm i uuid) or (yarn add uuid)

## 브랜치 설정

- 제출된 깃헙에는 props-drilling, context, redux 라는 이름의 각각의 브랜치명이 있어야 합니다.
- props-drilling 브랜치에서는 context나 redux 없이 useState만으로 상태관리해서 코드를 작성합니다.
- props-drilling 으로 코드를 모두 작성 및 커밋을 완료했으면 context 브랜치로 생성 및 이동합니다.
- context 브랜치에서는 props-drilling으로 작업한 코드에서 react context API를 사용하여 전역상태를 이용한 코드로 리팩터링합니다.
- context 브랜치에서 리팩터링 및 커밋을 완료했으면 redux 브랜치 생성 및 이동합니다.
- redux 브랜치에서는 context api로 전역상태를 관리한 코드를 모두 redux 라이브러리를 이용한 코드로 리팩터링합니다. 주의: Redux ducks 패턴을 사용하지 않고 Redux Toolkits 을 사용하도록 합니다.

## 과제 질문 답변

1. styled-components 는 CSS in JS 라이브러리 중 하나로 리액트 개발 시 자주 사용되는 방법입니다. 본인이 생각하는 styled-components의 장점과 단점을 말씀해 주세요.
   - 장점 : 기존의 css에서는 이용할 수 없었던 조건문, 변수 등 다양한 로직을 이용할 수 있다는 장점이 있습니다.
   - 단점 : jsx 파일 내에서 사용할 경우 코드가 너무 길어져 가독성이 떨어지는 단점이 있습니다.
2. props-drilling으로 전체를 먼저 구현하신 다음 context api와 redux로 리팩터링해서 전역 상태 관리를 경험해 보셨습니다. 어떤 상태들을 전역 상태로 관리하셨나요? context나 redux로 전역상태를 관리해봤을 때 어떤 문제를 해결해준다고 느끼셨나요?
   - 전체 지출 목록, 월 별로 화면에 보여줄 지출 목록, 선택된 월. 이 세가지 상태들을 전역 상태로 관리했습니다.
   - props-drilling 이용 시 해당 props가 필요없는 컴포넌트임에도 자식 요소에 props를 넘겨주기 위해 props를 가지고 있어야하는 번거로움이 있었는데, 전역 상태 관리를 하니 그럴 필요가 없고 필요한 컴포넌트에서 바로 가져다 쓸 수 있어 해당 번거로운 문제를 해결해준다고 느꼈습니다.
3. 지출을 등록/수정 하는 과정에서 useState 와 useRef 를 둘다 사용해봤는데요. 각각 언제 사용하면 좋을 지에 대한 생각을 공유해주세요.
   - 일단 useState와 useRef의 가장 큰 차이점은 상태가 변경될 때마다 리렌더링이 되는지, 안 되는지이기 때문에, input을 사용한다고 가정한다면 input창에 입력이 될 때마다 리렌더링이 되어야하는 경우 useState를 사용하는 것이 좋을 것 같고, 그게 아니라 일단 input을 입력하고 버튼을 클릭하거나 하면 기능이 동작하는 경우에는 꼭 리렌더링이 입력할 때마다 될 필요는 없기 때문에 useRef를 사용하는 것이 적절할 것 같습니다.
