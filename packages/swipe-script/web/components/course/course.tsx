'use client'

import type { CourseWithRelations } from '@mr-ss/database'
import { generateCurvePath } from '@mr/utils'
import { motion } from 'framer'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'

interface Props {
  course: CourseWithRelations
}

type Position = { x: number; y: number }

const nSteps = 6

export const Course = ({ course }: Props) => {
  const coursePathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [sectionPositions, setSectionPositions] = useState<Position[]>([])
  const [pathPositions, setPathPositions] = useState<Position[]>([])

  const curvePath = useMemo(() => generateCurvePath(course.sections.length), [])

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
    <div className="px-2 pt-4 text-lg">
      <h1>{course.title}</h1>

      <div className="w-full h-full relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 100 ${course.sections.length * 100}`}
          className="mt-40 overflow-visible"
        >
          <path ref={coursePathRef} d={curvePath} className="fill-none" />
          {pathPositions.map((position, i) => (
            <foreignObject
              x={position.x - 2}
              y={position.y - 2}
              width={4}
              height={4}
              key={i}
            >
              <div className="bg-white-accent opacity-70 rounded-full w-full h-full"></div>
            </foreignObject>
          ))}
        </svg>
        {sectionPositions.map((position, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              top: position.y * svgScale,
              left: position.x * svgScale,
            }}
          >
            <motion.div className="w-full h-full text-white-accent overflow-hidden">
              {course.sections[i].title}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
