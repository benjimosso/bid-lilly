'use client';
import { Button } from '@/components/ui/button'
import React from 'react'

export default function ButtonSubmit({ handleSubmit }: { handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {
  return (
    <div>
     <Button onClick={(e) => handleSubmit(e)}>Update Stripe Price</Button>
    </div>
  )
}
