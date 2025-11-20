"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { push } = useRouter();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <Button onClick={() => push("/users")}>Admin table</Button>
      {count}
      <Button onClick={handleClick}>add</Button>
    </div>
  );
};

export default Page;
