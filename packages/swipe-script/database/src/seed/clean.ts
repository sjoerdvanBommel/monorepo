import { prisma } from '../client'
import { clean } from './seed'

try {
  await clean()
} catch (error) {
  console.error(error)
  process.exit(1)
} finally {
  await prisma.$disconnect()
}
