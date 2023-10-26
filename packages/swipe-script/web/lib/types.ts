import type { Answer } from '@mr-ss/database'

export type SwipeDirection = 'left' | 'right'

export type ValidAnswer = Answer['id'] | SwipeDirection
