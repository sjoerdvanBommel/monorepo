import type { CourseSectionWithRelationsAndMetadata } from '@/backend/actions/course-section-actions'
import { ArrowBackIcon } from '@/components/icons/arrow-back-icon'
import { Link } from '@/components/ui/link'
import type { PropsWithChildren } from 'react'

interface Props {
  section: CourseSectionWithRelationsAndMetadata
}

export default function CourseSection({
  section,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col flex-grow gap-2 [&_p]:text-justify [&_p]:hyphens-auto">
      <h1 className="text-2xl text-transparent bg-gradient-to-br from-primary to-secondary bg-clip-text">
        {section.title}
      </h1>
      <div className="flex-1">{children}</div>
      <div>
        {section.quizzes.map((quiz) => (
          <div key={quiz.id}>
            {quiz.title}
            <Link href={`./${section.slug}/${quiz.slug}`}>Start quiz</Link>
          </div>
        ))}
      </div>

      <div className="flex gap-2 text-center">
        {section.previousSection && (
          <Link
            variant="outline-fancy"
            href={`./${section.previousSection.slug}`}
          >
            <ArrowBackIcon className="stroke-white-accent w-5 flex-shrink-0" />
            <span>{section.previousSection.title}</span>
          </Link>
        )}
        {section.nextSection && (
          <Link
            variant="outline-fancy"
            href={`./${section.nextSection.slug}`}
            className="bg-gradient-to-bl"
          >
            <span>{section.nextSection.title}</span>
            <ArrowBackIcon className="rotate-180 stroke-white-accent w-5 flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  )
}
