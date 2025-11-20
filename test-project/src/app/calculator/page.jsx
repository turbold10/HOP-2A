"use client";
import { useState } from "react";

const Page = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (operator === "+") {
      setResult(Number(num1) + Number(num2));
    } else if (operator === "-") {
      setResult(Number(num1) - Number(num2));
    }
  };

  return (
    <div>
      <input
        placeholder="num1"
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>

      <input
        placeholder="num2"
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <button onClick={calculate}>=</button>
      <p>{result !== null ? result : "result"}</p>
    </div>
  );
};

export default Page;
