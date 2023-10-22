import { TRUTHY_OR_FALSY_QT_ID } from '@mr-ss/database'
import { NextRequest, NextResponse } from 'next/server'
import { getQuestions } from '../../backend/actions/get-questions'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const questions = await getQuestions({
    questionTypeId: TRUTHY_OR_FALSY_QT_ID,
    strategyData: { strategy: 'start' },
  })
  return NextResponse.json(questions)
}
