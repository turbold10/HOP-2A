import { prisma } from "@/lib/db";
import { CreateClass } from "./_components/CreateClass";
import { CreateStudent } from "./_components/CreateStudent";
import { Grade } from "./_components/Grade";
import { Student } from "./_components/Student";

export default function Home() {
  return (
    <div>
      <div>home</div>
      <CreateClass />
      <CreateStudent />
      {/* <Grade /> */}
      <Student />
    </div>
  );
}
