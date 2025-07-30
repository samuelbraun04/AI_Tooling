import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { idea, brand, tone } = await request.json()
    
    if (!idea || !brand) {
      return NextResponse.json(
        { error: 'Content idea and brand name are required' },
        { status: 400 }
      )
    }

    const script = await generateScript(idea, brand, tone || 'casual')
    
    return NextResponse.json({ script })
  } catch (error) {
    console.error('Error generating script:', error)
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    )
  }
}