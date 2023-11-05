'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const CounterButton = () => {
  const [count, setCount] = useState(0)

  return (
    <Button size={'icon'} onClick={() => setCount(count + 1)}>
      {count}
    </Button>
  )
}
