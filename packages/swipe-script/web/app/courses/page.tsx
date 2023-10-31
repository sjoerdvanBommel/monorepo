import { getCourses } from '@/backend/actions/course-actions'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <>
      <h1 className="text-center m-6 text-2xl">
        Which course do you want to follow today?
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {courses.map((course) => (
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-full text-lg whitespace-pre-wrap text-center aspect-square bg-cover',
            )}
            key={course.id}
            style={{
              backgroundImage: `url(${course.imageUrl})`,
            }}
            href={`/courses/${course.slug}`}
          >
            {course.imageUrl && course.title}
          </Link>
        ))}
      </div>
    </>
  )
}
