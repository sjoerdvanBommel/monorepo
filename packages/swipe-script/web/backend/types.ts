export type StartStrategyData = { strategy: 'start' }
export type AdaptiveStrategyData = { strategy: 'adaptive'; userScore: number }

export type StrategyData = StartStrategyData | AdaptiveStrategyData
