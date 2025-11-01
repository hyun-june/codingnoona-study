import "./App.css";
import counterStore from "./stores/counterStore";
// import numberStore from "./stores/numberStore";

function App() {
  const { count, increase, decrease, increaseBy, decreaseBy, reset } =
    counterStore();
  // const { num, text, numSelect, numReset, textSelect, prevNum } = numberStore();
  // const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const textList = ["+", "-", "x", "÷", "="];

  return (
    <div className="container">
      <h1>count:{count}</h1>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
      <button onClick={() => increaseBy(10)}>10씩 증가</button>
      <button onClick={() => decreaseBy(10)}>10씩 감소</button>
      <button onClick={() => reset()}>초기화</button>

      {/* <div className="wrapper">
        <div className="result">{num}</div>
        <div className="button_wrapper">
          <div className="number">
            {[...numberList].reverse().map((item, i) => (
              <button key={i} onClick={() => numSelect(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="result_btn">
            <button onClick={() => numReset()}>지우기</button>
            {textList.map((item, i) => (
              <button key={i} onClick={() => textSelect(item)}>
                {item}
              </button>
            ))}
          </div>
        </div> 
      </div>*/}
    </div>
  );
}

export default App;
