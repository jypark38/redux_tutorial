// 1. 리덕스 스토어 만들기
import { createStore } from 'redux'
const store = createStore(counterReducer)

// 2. 데이터가 변경될때마다 새로 그리도록 구독하기
store.subscribe(render)

const valueEl = document.getElementById('value')

// 3. 구독 콜백함수 정의
function render() {
  const state = store.getState()
  const newValue = state.value.toString()

  valueEl.innerHTML = newValue
}

// 4. 초기 상태로 UI 그리기
render()

// 5. UI 입력에 기반하여 dispatch하기

document.getElementById('increment').addEventListener('click', () => {
  store.dispatch({ type: 'counter/incremented' })
})
