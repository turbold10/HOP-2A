'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createClass = async (formData: FormData) => {
  const className = formData.get('className') as string | null;
  const teacherName = formData.get('teacherName') as string | null;

  if (!className || !teacherName) {
    throw new Error("Missing required fields");
  }

  await prisma.class.create({
    data: {
      name: className,
      teacherName: teacherName
    }
  });

  revalidatePath('/');
};
