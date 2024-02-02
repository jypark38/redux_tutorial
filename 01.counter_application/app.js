import { createStore } from "https://unpkg.com/redux@latest/dist/redux.browser.mjs";
// Define an initial state value for the app
const initialState = {
  value: 0,
};
/*
 * initialState
 * counter의 현재 값을 추척한다
 * 리덕스 앱은 상태의 루트 요소로 js객체를 가지며, 해당 객체 내부에 다른 값들이 들어간다
 */

// ####################################################################################

/*
 * reducer
 * 리듀서를 정의한다
 * 리듀서는 두 인자를 받는다
 * 1. state
 * 2. action : 무슨 일이 일어났는지 설명하는 객체
 * 리덕스 앱이 시작될 때는 어떤 상태를 갖고 있는게 아니라서, 이 리듀서에 대한 기본 값으로 initialState를 제공한다.
 */
function counterReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case "counter/incremented":
      return { ...state, value: state.value + 1 };
    case "counter/decremented":
      return { ...state, value: state.value - 1 };
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state;
  }
}
/*
 * action
 * action 객체는 항상 type 필드를 가져야 한다.
 * 동작의 고유한 이름으로 작용하는 문자열이다.
 * 동작에 대해 가독성 있게 짓는 것이 중요하다
 *
 * 이 문제의 경우, counter/incremented 의 식으로 정의한다
 *
 * 액션의 타입에 따라 새로운 상태 결과가 될 새로운 객체를 반환해야하거나,
 * 아무것도 변경되지 않아야 하는 경우에 기존 상태를 반환해야 한다.
 *
 * 주의할 점은, 기존 객체를 직접 수정하는 대신에 복사본을 업데이트하는 방향으로 작성하는 것이다.
 */

// ####################################################################################

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = createStore(counterReducer);

/*
 * store
 * 리듀서 함수가 준비됐으니까, redux library의 createStore API를 호출해서 스토어 인스턴스를 생성한다
 * createStore에 리듀서 함수를 전달한다
 * createStore는 이 리듀서 함수를 사용해서 초기 상태를 생성하고 추후 업데이트를 계산한다.
 */

// ####################################################################################

/**
 * 동작에 따라 UI를 업데이트하는 부분
 */

// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById("value");

// Whenever the store state changes, update the UI by
// reading the latest store state and showing new data
function render() {
  const state = store.getState();
  valueEl.innerHTML = state.value.toString();
}

/*
 * 이 예제에서는 UI로서 몇 가지 기본 HTML 요소만 사용한다.
 *
 * 그래서 redux 스토어에서 가장 최신의 상태를 가져오는 함수를 작성한다.
 * => store.getState
 * 그리고, 그 값으로 UI를 업데이트해서 값을 표시한다.
 */

// Update the UI with the initial data
render();
// And subscribe to redraw whenever the data changes in the future
store.subscribe(render);

/*
 * 또한 redux store는 store.subscribe 를 호출하고 스토어가 업데이트될 때마다 호출될 subscribe 콜백 함수를 전달한다.
 * 그래서, 렌더 함수를 subscribe에 전달하여, 스토어가 업데이트 될때마다 최신 값으로 UI를 업데이트할 수 있게 한다.
 */

// ####################################################################################

// Handle user inputs by "dispatching" action objects,
// which should describe "what happened" in the app
document.getElementById("increment").addEventListener("click", function () {
  store.dispatch({ type: "counter/incremented" });
});

document.getElementById("decrement").addEventListener("click", function () {
  store.dispatch({ type: "counter/decremented" });
});

document.getElementById("incrementIfOdd").addEventListener("click", function () {
  // We can write logic to decide what to do based on the state
  if (store.getState().value % 2 !== 0) {
    store.dispatch({ type: "counter/incremented" });
  }
});

document.getElementById("incrementAsync").addEventListener("click", function () {
  // We can also write async logic that interacts with the store
  setTimeout(function () {
    store.dispatch({ type: "counter/incremented" });
  }, 1000);
});

/*
 * dispatch
 * 사용자 입력에 응답하기 위해 무슨 일이 발생했는지 설명하는 액션 객체를 만들고, 이를 스토어에 dispatch 해주어야 한다.
 * store.dispatch(action) 을 호출하면 스토어가 리듀서를 실행하고,
 * 업데이트된 상태를 계산하며 subscribe를 실행해서 UI를 업데이트 한다.
 *
 * 특정 조건에 따라 action을 dispatch하는 코드를 작성하거나 (incrementIfOdd)
 * 지연 후에 액션을 dispatch하는 비동기 코드를 작성할수도 있다 (incrementAsync).
 */
