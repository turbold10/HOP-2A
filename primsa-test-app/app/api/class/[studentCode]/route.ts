import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { teacherName, name } = body

  const res = await prisma.class.create({
    data: {
      teacherName,
      name
    }
  })

  return NextResponse.json(res)
}

export const GET = async (req: NextRequest, context: { params: { studentCode: string }; }) => {
  const params = await context.params
  const body = await req.json()
  const { studentId } = body

  const { studentCode } = params

  const classes = await prisma.student.findUnique({
    where: {
      studentCode
    },
    include: {
      class: true
    }
  })

  return NextResponse.json(classes)
}