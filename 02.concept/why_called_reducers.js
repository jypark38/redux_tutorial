/**
 Array.reduce() 메서드는 값을 하나씩 처리하고 최종 결과를 반환하는 배열을 만들 수 있다.
 
 즉, 배열을 하나의 값으로 축소한다고 생각해볼 수 있다.
 
 이 함수는 콜백을 인자로 받고, 배열의 각 항목에 대해 콜백을 한 번씩 호출한다.
 
 콜백함수는 다음과 같은 인자를 갖는다.
 
 1. previousResult
 2. currentItem
 */

const numbers = [2, 5, 8];

const addNumbers = (previousResult, currentItem) => {
  console.log({ previousResult, currentItem });
  return previousResult + currentItem;
};

const initialValue = 0;

const total = numbers.reduce(addNumbers, initialValue);
// {previousResult: 0, currentItem: 2}
// {previousResult: 2, currentItem: 5}
// {previousResult: 7, currentItem: 8}

console.log(total);
// 15

// ##############################################################################

/**
여기서, addNumbers “reduce callback” 함수가 스스로 아무 것도 추적할 필요가 없다는 것이다.

이는 previousResult와 currentItem 인자를 가져와서 얘네로 뭔가 수행하고 새로운 결과를 반환한다.

리덕스의 리듀서 함수는 이 “reduce callback” 함수와 같은 개념이다

**이전 결과(state)**와 **현재 항목(action)**을 가져와서 그 인수를 기반으로 새로운 상태 값을 결정하고 해당 새로운 상태를 반환한다.

redux 액션들의 배열을 만들고 reduce()를 호출하고 리듀서 함수를 전달하면 동일한 방식으로 최종 결과를 얻을 수 있다.
 */

const actions = [{ type: "counter/incremented" }, { type: "counter/incremented" }, { type: "counter/incremented" }];

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

const finalResult = actions.reduce(counterReducer, initialState);
console.log(finalResult);
// {value: 3}
