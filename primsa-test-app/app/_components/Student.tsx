import { prisma } from "@/lib/db";

export const Student = async () => {
  const students = await prisma.student.findMany();
  return (
    <div>
      {students.map((student) => {
        return <div key={student.id}>{student.name}</div>;
      })}
    </div>
  );
};
