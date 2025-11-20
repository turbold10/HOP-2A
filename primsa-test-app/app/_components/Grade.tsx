// "use client";
import { prisma } from "@/lib/db";

export const Grade = async () => {
  // const [classes, setClasses] = useState<Class[]>([]);

  // useEffect(() => {
  //   const getClasses = async () => {
  //     const res = await fetch("/api/class");
  //     const classes = await res.json();
  //     setClasses(classes);
  //   };

  //   getClasses();
  // }, []);
  const classes = await prisma.class.findMany();

  return (
    <div>
      {classes.map((item) => {
        return (
          <div key={item.id} className="flex flex-col">
            <div>class name:{item.name}</div>
            <div>teacher name:{item.teacherName}</div>
          </div>
        );
      })}
    </div>
  );
};
