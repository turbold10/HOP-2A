"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [op, setOp] = useState("+");
  const [res, setRes] = useState(null);

  const handleNum1 = (event) => {
    setNum1(event.target.value);
  };

  const handleNum2 = (event) => {
    setNum2(event.target.value);
  };

  const handleOp = (event) => {
    setOp(event.target.value);
  };

  const cal = () => {
    if (op === "+") {
      setRes(Number(num1) + Number(num2));
    } else if (op === "-") {
      setRes(Number(num1) - Number(num2));
    }
  };

  useEffect(() => {
    cal();
  }, [num1, num2, op]);

  return (
    <div>
      <input
        placeholder="num1"
        type="number"
        value={num1}
        onChange={(e) => handleNum1(e)}
      />

      <select value={op} onChange={(e) => handleOp(e)}>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>

      <input
        placeholder="num2"
        type="number"
        value={num2}
        onChange={(e) => handleNum2(e)}
      />
      {/* <button onClick={() => cal()}>=</button> */}
      <p>{res}</p>
    </div>
  );
};

export default Page;
