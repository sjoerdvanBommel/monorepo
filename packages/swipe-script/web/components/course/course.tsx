'use client'

import { buttonVariants } from '@/components/ui/button'
import { generateCurvePath } from '@/lib/utils'
import type { CourseSection, CourseWithRelations } from '@mr-ss/database'
import Image from 'next/image'
import Link from 'next/link'
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'

interface Props {
  course: CourseWithRelations
}

type Position = { x: number; y: number }

const nSteps = 3
const svgOptions = {
  xMargin: 5,
  width: 100,
  startX: 50,
  startY: 0,
  yOffset: 50,
  yRandomOffset: 5,
}

export const Course = ({ course }: Props) => {
  const coursePathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [sectionPositions, setSectionPositions] = useState<Position[]>([])
  const [pathPositions, setPathPositions] = useState<Position[]>([])

  const curvePath = useMemo(
    () => generateCurvePath(course.sections.length, svgOptions),
    [],
  )

  useLayoutEffect(() => {
    const pathLength = coursePathRef.current!.getTotalLength()
    const spacing = pathLength / (course.sections.length - 1)
    const sectionPositions: Position[] = []
    const pathPositions: Position[] = []

    course.sections.forEach((_, i) => {
      const coords = coursePathRef.current!.getPointAtLength(i * spacing)

      if (i < course.sections.length - 1) {
        for (let j = 0; j < nSteps; j++) {
          pathPositions.push(
            coursePathRef.current!.getPointAtLength(
              i * spacing + (spacing / (nSteps + 1)) * (j + 1),
            ),
          )
        }
      }

      sectionPositions.push(coords)
    })

    setSectionPositions(sectionPositions)
    setPathPositions(pathPositions)
  }, [curvePath])

  const svgScale = (svgRef?.current?.clientWidth ?? 100) / 100

  return (
    <div className="text-lg flex flex-col gap-4">
      <div className="flex gap-3 justify-between">
        <h1>{course.title}</h1>
        {course.imageUrl && (
          <div className="w-12 h-12 flex-shrink-0 relative mt-1">
            <Image
              src={course.imageUrl}
              alt="Course image"
              fill
              sizes=""
              className="flex-shrink"
            />
          </div>
        )}
      </div>
      <p className="text-sm hyphens-auto text-justify">{course.description}</p>

      <div className="w-full h-full relative my-10">
        <svg
          ref={svgRef}
          viewBox={`0 0 100 ${
            (course.sections.length - 1) * svgOptions.yOffset
          }`}
          className="overflow-visible"
        >
          <path ref={coursePathRef} d={curvePath} className="fill-none" />
        </svg>
        {pathPositions.map((position, i) => (
          <div
            key={i}
            style={{ left: position.x * svgScale, top: position.y * svgScale }}
            className="absolute bg-secondary/20 rounded-full w-3 h-3 -translate-x-1/2 -translate-y-1/2"
          ></div>
        ))}
        {sectionPositions.map((position, i) => (
          <Section
            key={i}
            href={`/courses/${course.slug}/${course.sections[i].slug}`}
            position={{ x: position.x * svgScale, y: position.y * svgScale }}
            section={course.sections[i]}
            svgRef={svgRef}
          />
        ))}
      </div>
    </div>
  )
}

function Section({
  href,
  section,
  position,
  svgRef,
}: {
  href: string
  section: CourseSection
  position: Position
  svgRef: RefObject<SVGSVGElement>
}) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const isLeftOutsideOfParent =
    sectionRef.current &&
    svgRef.current &&
    sectionRef.current.offsetLeft - sectionRef.current.clientWidth / 2 < 0

  const isRightOutsideOfParent =
    sectionRef.current &&
    svgRef.current &&
    sectionRef.current.offsetLeft + sectionRef.current.clientWidth / 2 >
      svgRef.current.clientWidth

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
      ref={sectionRef}
      style={{
        top: position.y,
        left: isLeftOutsideOfParent
          ? sectionRef.current.clientWidth / 2
          : isRightOutsideOfParent
          ? svgRef.current.clientWidth - sectionRef.current.clientWidth / 2
          : position.x,
      }}
    >
      <Link
        href={href}
        className={`w-full h-full text-white-accent overflow-hidden shadow-secondary shadow-glow ${buttonVariants(
          { variant: 'secondary' },
        )}`}
      >
        {section.title}
      </Link>
    </div>
  )
}
