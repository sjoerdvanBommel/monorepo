/**
 * termynal.js rewritten to a react component.
 * A lightweight, modern and extensible animated terminal window, using async/await.
 *
 * @author Ines Montani <ines@ines.io>, rewritten by Sjoerd van Bommel <sjoerd.van.bommel@hotmail.com>
 * @version 0.0.1
 * @license MIT
 */

import { useEffect, useRef } from 'react'
import './terminal.css'

interface LineData {
  value?: string
  type?: string
  prompt?: string
  typeDelay?: number
  progressChar?: string
}

interface Props {
  lineData: LineData[]
  /** Prefix to use for data attributes */
  dataAttributePrefix?: string
  /** Delay before animation, in ms */
  startDelay?: number
  /** Delay between each typed character, in ms */
  typeDelay?: number
  /** Delay between each line, in ms */
  lineDelay?: number
  /** Number of characters displayed as progress bar */
  progressLength?: number
  /** Max percent of progress */
  progressPercent?: number
  /** Character to use for progress bar, defaults to █ */
  progressChar?: string
  /** Character to use for cursor, defaults to ▋ */
  cursor?: string
  /** Don't initialise the animation */
  startTyping?: boolean
}

export const Terminal = ({
  dataAttributePrefix = 'data-ty',
  startDelay = 600,
  typeDelay = 90,
  lineDelay = 1500,
  progressLength = 40,
  progressPercent = 100,
  progressChar = '█',
  cursor = '▋',
  startTyping = false,
  lineData,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isAlreadyInitialized = container.hasAttribute('data-termynal')
    if (isAlreadyInitialized || !startTyping) return

    function lineDataToElements() {
      return lineData.map((line) => {
        let div = document.createElement('div')
        div.innerHTML = `<span ${generateAttributes(line)}>${
          line.value || ''
        }</span>`

        return div.firstElementChild!
      })
    }

    function generateAttributes(line: LineData) {
      let attrs = ''
      for (let prop in line) {
        attrs += dataAttributePrefix

        if (prop === 'type') {
          attrs += `="${line[prop]}" `
        } else if (prop !== 'value') {
          attrs += `-${prop}="${line[prop as keyof LineData]}" `
        }
      }

      return attrs
    }

    async function progress(line: Element) {
      if (!container) return

      const localProgressLength = +(
        line.getAttribute(`${dataAttributePrefix}-progressLength`) ||
        progressLength
      )
      const localProgressChar =
        line.getAttribute(`${dataAttributePrefix}-progressChar`) || progressChar
      const chars = localProgressChar.repeat(localProgressLength)
      const localProgressPercent = +(
        line.getAttribute(`${dataAttributePrefix}-progressPercent`) ||
        progressPercent
      )
      line.textContent = ''
      container.appendChild(line)

      for (let i = 1; i < chars.length + 1; i++) {
        await new Promise((resolve) => setTimeout(resolve, typeDelay))
        const percent = Math.round((i / chars.length) * 100)
        line.textContent = `${chars.slice(0, i)} ${percent}%`
        if (percent > localProgressPercent) {
          break
        }
      }
    }

    async function typeLine(line: Element) {
      if (!line.textContent || !container) return

      const chars = [...line.textContent]
      const delay = +(
        line.getAttribute(`${dataAttributePrefix}-typeDelay`) || typeDelay
      )
      line.textContent = ''
      container.appendChild(line)

      for (let char of chars) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        line.textContent += char
      }
    }

    /**
     * Start the animation and rener the lines depending on their data attributes.
     */
    async function start() {
      if (!container) return

      await new Promise((resolve) => setTimeout(resolve, startDelay))

      for (let line of lineDataToElements()) {
        const type = line.getAttribute(dataAttributePrefix)
        const delay = +(
          line.getAttribute(`${dataAttributePrefix}-delay`) || lineDelay
        )

        if (type == 'input') {
          line.setAttribute(`${dataAttributePrefix}-cursor`, cursor)
          await typeLine(line)
          await new Promise((resolve) => setTimeout(resolve, delay))
        } else if (type == 'progress') {
          await progress(line)
          await new Promise((resolve) => setTimeout(resolve, delay))
        } else {
          container.appendChild(line)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }

        line.removeAttribute(`${dataAttributePrefix}-cursor`)
      }
    }

    container.setAttribute('data-termynal', '')
    container.innerHTML = ''

    start()
  }, [lineData])

  return <div ref={containerRef} />
}
