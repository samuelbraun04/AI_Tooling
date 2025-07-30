import { NextRequest, NextResponse } from 'next/server'
import { generateHashtags } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { content, platform, niche } = await request.json()
    
    if (!content || !platform || !niche) {
      return NextResponse.json(
        { error: 'Content, platform, and niche are required' },
        { status: 400 }
      )
    }

    const hashtags = await generateHashtags(content, platform, niche)
    
    return NextResponse.json({ hashtags })
  } catch (error) {
    console.error('Error generating hashtags:', error)
    return NextResponse.json(
      { error: 'Failed to generate hashtags' },
      { status: 500 }
    )
  }
}