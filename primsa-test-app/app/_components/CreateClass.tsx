import { createClass } from "../actions/create-class";

export const CreateClass = () => {
  return (
    <div>
      <form action={createClass}>
        <input placeholder="class name" name="className" />
        <input placeholder="teacher name" name="teacherName" />
        <button>create class</button>
      </form>
    </div>
  );
};
