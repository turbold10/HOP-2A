import { prisma } from "@/lib/db";
import { createStudentAction } from "../actions/create-student";

export const CreateStudent = async () => {
  const classes = await prisma.class.findMany();
  return (
    <form action={createStudentAction}>
      <input placeholder="student name" name="student_name" />
      <input placeholder="student code" name="student_code" />
      <select name="class">
        {classes.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <button>create student</button>
    </form>
  );
};
