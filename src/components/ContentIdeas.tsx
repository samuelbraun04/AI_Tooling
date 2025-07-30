'use client'

import { useState, useEffect } from 'react'
import { LightBulbIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface ContentIdeasProps {
  onBack: () => void
}

export default function ContentIdeas({ onBack }: ContentIdeasProps) {
  const [niche, setNiche] = useState('')
  const [platform, setPlatform] = useState('tiktok')
  const [count, setCount] = useState(5)
  const [ideas, setIdeas] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGenerate = async () => {
    if (!niche.trim()) {
      alert('Please enter a niche')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niche: niche.trim(),
          platform,
          count,
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setIdeas(data.ideas)
      } else {
        alert(data.error || 'Failed to generate ideas')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while generating ideas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Content Ideas Generator</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-2 mb-6">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-900">Generate Viral Ideas</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="niche" className="block text-sm font-medium text-gray-700 mb-2">
                Niche/Industry
              </label>
              <input
                type="text"
                id="niche"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., fitness, tech, fashion, finance"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube Shorts</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter/X</option>
              </select>
            </div>

            <div>
              <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Ideas
              </label>
              <select
                id="count"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={3}>3 Ideas</option>
                <option value={5}>5 Ideas</option>
                <option value={10}>10 Ideas</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !niche.trim()}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Ideas...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Generate Viral Ideas</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Ideas Display */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Ideas</h3>
          
          {ideas ? (
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans">{ideas}</pre>
              </div>
              <div className="flex space-x-2 pt-4 border-t">
                <button
                  onClick={() => {
                    if (mounted && navigator.clipboard) {
                      navigator.clipboard.writeText(ideas)
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Copy All
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                >
                  Generate New
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <LightBulbIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Enter your niche and click 'Generate Viral Ideas' to get started</p>
              <p className="text-sm mt-2">AI will create pattern-interrupt content that stops scrolling</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips for Better Ideas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Be Specific:</strong> Instead of &quot;fitness&quot;, try &quot;home workouts for busy moms&quot; or &quot;muscle building for beginners&quot;
          </div>
          <div>
            <strong>Think Trends:</strong> Include current events, seasons, or trending topics in your niche
          </div>
          <div>
            <strong>Know Your Platform:</strong> TikTok loves entertainment, LinkedIn prefers professional insights
          </div>
          <div>
            <strong>Pattern Interrupt:</strong> The best ideas challenge expectations and make people stop scrolling
          </div>
        </div>
      </div>
    </div>
  )
}