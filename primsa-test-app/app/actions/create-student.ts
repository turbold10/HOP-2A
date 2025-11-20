'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createStudentAction = async (formData: FormData) => {
  const studentName = formData.get('student_name') as string
  const studentCode = formData.get('student_code') as string
  const classId = formData.get('class') as string

  await prisma.student.create({
    data: {
      studentCode,
      name: studentName,
      classId
    }
  })


  revalidatePath('/')
}