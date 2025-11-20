"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <>
      <div>{timer}</div>
      <button onClick={() => setIsActive(true)}>start</button>
      <button onClick={() => setIsActive(false)}>stop</button>
      <button onClick={() => setTimer(0)}>restart</button>
    </>
  );
};

export default Page;
