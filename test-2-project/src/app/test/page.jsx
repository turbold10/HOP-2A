"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([
    { task: "test", id: 1 },
    { task: "hii", id: 2 },
  ]);

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  const handleData = () => {
    console.log(data, "odoo bga data");
    console.log(value, "shineer nemeh data");
    console.log(...data);
    console.log({ task: value, id: Math.random() });
    setData([...data, { task: value, id: Math.random() }]);
  };

  return (
    <div>
      <Input
        className="w-4xl"
        placeholder="GG"
        value={value}
        onChange={(e) => handleValue(e)}
      />
      <Button onClick={() => handleData()}>add</Button>
      {data.map((el, index) => {
        return <div key={index}>{el.task}</div>;
      })}
    </div>
  );
};

export default Page;
