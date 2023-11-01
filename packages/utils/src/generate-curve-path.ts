function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateCurvePath(nSections: number) {
  const width = 100
  const startX = width / 2
  const startY = 0
  const yOffset = 100

  if (nSections === 2) {
    return `M ${startX} ${startY} ${getRandomInt(0, width)} ${
      yOffset + getRandomInt(-10, 10)
    }`
  }

  let curvePath: string = `M ${startX} ${startY} C`

  for (let i = 0; i < nSections; i++) {
    const controlPoint1X = getRandomInt(0, width)
    const controlPoint1Y = (i + 1) * yOffset + getRandomInt(-10, 10)

    curvePath += ` ${controlPoint1X} ${controlPoint1Y}`
  }

  return curvePath
}
