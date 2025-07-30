import { NextRequest, NextResponse } from 'next/server'
import { generateContentIdeas } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { niche, platform, count } = await request.json()
    
    if (!niche || !platform) {
      return NextResponse.json(
        { error: 'Niche and platform are required' },
        { status: 400 }
      )
    }

    const ideas = await generateContentIdeas(niche, platform, count || 5)
    
    return NextResponse.json({ ideas })
  } catch (error) {
    console.error('Error generating content ideas:', error)
    return NextResponse.json(
      { error: 'Failed to generate content ideas' },
      { status: 500 }
    )
  }
}