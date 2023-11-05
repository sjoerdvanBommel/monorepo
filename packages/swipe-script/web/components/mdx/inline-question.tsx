import { getQuestion } from '@/backend/actions/question-actions'
import { Button } from '@/components/ui/button'
import type { Quiz } from '@mr-ss/database'

interface Props {
  id: Quiz['id']
}

export const InlineQuestion = async ({ id }: Props) => {
  const question = await getQuestion(id)

  return (
    <div className="p-6 my-6 border border-border rounded-lg">
      {!question ? (
        <span className="text-error-200">
          Question not found. Sorry for the inconvenience 😟
        </span>
      ) : (
        <div className="flex flex-col w-full items-center gap-2">
          <span>{question.questionText}</span>
          <div className="w-full flex justify-between gap-4">
            {question.answers.map((q) => (
              <Button
                key={q.id}
                variant={'outline'}
                className="border-secondary"
              >
                {q.answerText}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
