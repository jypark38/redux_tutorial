// actions

/**
 * 액션은 type 필드를 갖는 일반적인 객체이다.

액션은 이벤트라고 생각해볼 수 있다.

- type 필드는 `todos/todoAdded` 같은 액션에 설명적인 이름을 부여하는 문자열이어야 한다
- 일반적으로 ‘domain/event’ 같은 형식으로 작성한다
    - domain : 액션이 속한 특징이나 범주
    - event : 구체적인 사건
- 액션 객체에는 발생한 사건에 대한 추가 정보를 담은 다른 필드가 있을 수 있다.
- 관례적으로 그 정보를 payload 필드에 넣는다
 */

const addTodoAction = {
  type: "todos/todoAdded",
  payload: "Buy milk",
};

// ######################################################################

// reducers

/**

리듀서는 현재 상태와 액션 객체를 받고 필요한 경우 상태를 어떻게 업데이트할지 결정하고 새로운 상태를 반환하는 함수이다.

- `(state, action) => newState`

**리듀서는 받은 액션의 유형에 따라 처리하는 이벤트 리스너라고 생각해볼 수 있다**

**리듀서의 규칙**

1. 상태와 액션 인자를 기반으로 새로운 상태 값을 계산해야한다.
2. 기존 상태를 수정하는 것은 허용하지 않는다.
기존 상태를 복사하고 복사된 값을 변경해서 불변 업데이트를 진행해야 한다.
3. 비동기 로직, 무작위 값 계산, side effect를 일으키는 행위는 허용하지 않는다.

리듀서 함수의 로직은 일반적으로 다음의 단계를 따른다.

1. 이 리듀서가 액션에 관심있는지 확인한다
2. 그렇다면, 상태의 복사본을 만들고 그 값을 새로운 값으로 업데이트한 다음 반환한다
3. 그렇지 않다면 기존 상태를 변경하지 않고 그대로 반환한다.

 */

const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === "counter/incremented") {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    };
  }
  // otherwise return the existing state unchanged
  return state;
}

// ######################################################################

// store

/*
현재 리덕스 상태는 store라는 객체에 있다.

store는 reducer를 전달하여 생성되고, 현재 상태 값을 반환하는 getState 메서드를 가지고 있다
*/

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

console.log(store.getState());
// {value: 0}

// ######################################################################

// dispatch

/*
store 에는 dispatch 메서드가 있다.

상태를 업데이트하는 방법은 store.dispatch()를 호출하고 액션 객체를 전달하는 것이다.

스토어는 리듀서 함수를 실행하고 새로운 상태를 저장하며, getState()를 호출해서 업데이트된 값ㅇ르 가져올 수 있다.

액션을 디스패치 하는 것은 app에서 **‘이벤트를 트리거하는 것’**으로 생각해볼 수 있다.

어떤 일이 발생했고, 그것을 스토어가 알아야 한다

리듀서는 이벤트 리스너처럼 작동해서, 관심있는 액션을 감지하면 상태를 업데이트한다.
*/

store.dispatch({ type: "counter/incremented" });

console.log(store.getState());
// {value: 1}

// ######################################################################

// selectors

/*
셀렉터는 스토어 상태 값에서 특정 정보를 추출하는 방법을 아는 함수들이다.

app이 커질수록 서로 다른 부분에서 동일한 데이터를 읽어야 하는 경우에 반복되는 로직을 피하는데 도움이 될 수 있다.
*/

const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
console.log(currentValue);
// 2
