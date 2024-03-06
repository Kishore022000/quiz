import React, { useRef, useState } from "react";
import "../Quiz/Quiz.css";
import datas from "../../assets/data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(datas[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  function checkAns(e, ans){
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prevScore =>prevScore+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  function handleClick () {
    if (lock === true) {
        if (index === datas.length -1) {
        setResult(true);
        return 0;
      }
      setIndex(1+index);
      setQuestion(datas[index]);
      setLock(false);
      option_array.map(option => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };
  function handleReset () {
    setIndex(0);
    setQuestion(datas[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      { result? <></>:<>
          <h2>{index + 1}.{question.Question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => {checkAns(e, 1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e) => {checkAns(e, 2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e) => {checkAns(e, 3);}}>{question.option3}</li>
            <li ref={option4} onClick={(e) => {checkAns(e, 4)}}>{question.option4}</li>
          </ul>
          <button onClick={handleClick}>Next</button>
          <div className="index">{index + 1} of {datas.length} Questions</div>
        </>}
      {result ? <><h2>You scored {score} out of {datas.length}</h2>
                <button onClick={handleReset}>Reset</button>
        </>:<></>}
    </div>
  );
};

export default Quiz;
