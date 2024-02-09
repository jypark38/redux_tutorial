## 요구사항

- UI는 세가지 섹션으로 구성된다
  - 새로운 할 일 항목의 텍스트를 입력할수 있는 Input box
  - 기존 할일 항목의 목록
  - 완료되지 않은 할 일 항목 수와 필터 옵션을 표시하는 footer section
- 할 일 목록 항목은 ‘완료’ 상태를 토글할 수 있는 체크박스에 가져야 한다.
- 미리 정의된 색상 목록을 위한 색상 코드 카테고리 태그를 추가하고 할 일 항목을 삭제할 수 있어야 한다.
- 카운터는 활성화된 할 일 항목의 수를 복수화 한다
- 모든 할일을 완료로 표시하고 완료된 할 일을 모두 지우고, 삭제할 수 있는 버튼이 필요하다
- 표시된 할 일을 필터링하는 두 가지 방법
  - 모두, 활성화, 완료 할 일을 표시하는 필터링
  - 하나 이상의 색상을 선택하고 해당 색상과 일치하는 태그를 가진 할 일을 표시하는 필터링

## design state

접근

1. 현재 할 일 항목의 목록
2. 현재 필터링 옵션

또한 사용자가 ‘추가’ 인풋에 입력한 데이터를 추적해야 하는데, 이건 지금 고려할 사항은 아니다.

각 할 일 항목에 대한 데이터

1. 사용자가 입력한 텍스트
2. 완료 여부를 나타내는 boolean
3. 고유 id
4. (선택한 경우) 색상 카테고리

필터링 동작

1. 완료 상태 : ‘all’, ‘active’, ‘completed’
2. 색상 : ‘red’, ‘yellow’, ‘green’, ‘blue’, ‘orange’, ‘purple’

위 값들로 보면 할 일은 ‘앱 상태’ 라고 할 수 있다 → 앱이 작동하는 핵심 데이터

필터링 값은 ‘UI 상태’ 라고 할 수 있다. → 앱이 현재 뭘 하는지 설명하는 상태

## design action

액션은 앱에서 발생한 일을 설명하는 이벤트로 생각할 수 있다.

일반적으로 액션에 발생한 일을 설명하는 데 필요한 추가 데이터를 action.payload 에 넣는다

{type: 'todos/todoAdded', payload: todoText}
{type: 'todos/todoToggled', payload: todoId}
{type: 'todos/colorSelected', payload: {todoId, color}}
{type: 'todos/todoDeleted', payload: todoId}
{type: 'todos/allTodosCompleted'}
{type: 'todos/completedCleared'}
{type: 'filters/statusFilterChanged', payload: filterValue}
{type: 'filters/colorFilterChanged', payload: {color, changeType}}

## Component Tree

- `<App>` : 루트 컴포넌트
  - `<Header>` : ‘next todo’ input과 ‘complete all todos’ checkbox를 갖는다
  - `<TodoList>` : 필터링된 결과를 기반으로 todo item을 보여준다
    - `<TodoListItem>`
      list item의 단일 컴포넌트
      todo의 완료 상태를 토글할 수도 있고, 색상 카테고리를 선택할 수도 있다
  - `<Footer>`  
    활성화된 todo의 수를 보여주고, 색상 카테고리와 완료 상태를 기반으로 필터링을 제어한다
