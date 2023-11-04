import { getCourses } from '@/backend/actions/course-actions'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <>
      <h1 className="text-center m-6 mt-2 text-2xl">
        Which course do you want to follow today?
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {courses.map((course) => (
          <div
            className="relative aspect-square rounded-xl overflow-hidden"
            key={course.id}
          >
            <div
              className="absolute inset-0 bg-cover -z-[1]"
              style={{
                backgroundImage: `url(${course.imageUrl})`,
              }}
            />
            <Link
              className={cn(
                'h-full text-lg whitespace-pre-wrap text-center bg-gradient-radial from-black-accent/90 to-black-accent/50 flex justify-center items-center focus-visible:to-black-accent/60',
              )}
              href={`/courses/${course.slug}`}
            >
              {course.imageUrl && course.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
