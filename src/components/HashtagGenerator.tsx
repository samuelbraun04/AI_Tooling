'use client'

import { useState, useEffect } from 'react'
import { HashtagIcon, SparklesIcon, ClipboardDocumentIcon, TagIcon } from '@heroicons/react/24/outline'

interface HashtagGeneratorProps {
  onBack: () => void
}

export default function HashtagGenerator({ onBack }: HashtagGeneratorProps) {
  const [content, setContent] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [niche, setNiche] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGenerate = async () => {
    if (!content.trim() || !niche.trim()) {
      alert('Please enter both content description and niche')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          platform,
          niche: niche.trim(),
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setHashtags(data.hashtags)
      } else {
        alert(data.error || 'Failed to generate hashtags')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while generating hashtags')
    } finally {
      setLoading(false)
    }
  }

  const platformOptions = [
    { value: 'instagram', label: 'Instagram', limit: '30 hashtags max' },
    { value: 'tiktok', label: 'TikTok', limit: '20 hashtags recommended' },
    { value: 'linkedin', label: 'LinkedIn', limit: '3-5 hashtags recommended' },
    { value: 'twitter', label: 'Twitter/X', limit: '2-3 hashtags recommended' },
    { value: 'youtube', label: 'YouTube', limit: '15-20 hashtags max' },
  ]

  const formatHashtags = (hashtagText: string) => {
    return hashtagText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.trim())
      .join(' ')
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
          <h2 className="text-3xl font-bold text-gray-900">Hashtag Generator</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-2 mb-6">
            <HashtagIcon className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900">Generate Optimized Hashtags</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content Description
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="e.g., Workout video showing 5 home exercises for building core strength"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label htmlFor="niche" className="block text-sm font-medium text-gray-700 mb-2">
                Niche/Industry
              </label>
              <input
                type="text"
                id="niche"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., fitness, tech, beauty, business"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {platformOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.limit})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !content.trim() || !niche.trim()}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Hashtags...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Generate Hashtags</span>
                </>
              )}
            </button>
          </div>

          {/* Hashtag Strategy Tips */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2"># Hashtag Strategy</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Mix high, medium, and low competition tags</li>
              <li>• Use niche-specific and trending hashtags</li>
              <li>• Avoid banned or shadowbanned hashtags</li>
              <li>• Research competitors&apos; successful tags</li>
            </ul>
          </div>
        </div>

        {/* Generated Hashtags Display */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Hashtags</h3>
          
          {hashtags ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">{hashtags}</pre>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <button
                  onClick={() => {
                    if (mounted && navigator.clipboard) {
                      navigator.clipboard.writeText(hashtags)
                    }
                  }}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <ClipboardDocumentIcon className="h-4 w-4" />
                  <span>Copy All</span>
                </button>
                <button
                  onClick={() => {
                    if (mounted && navigator.clipboard) {
                      navigator.clipboard.writeText(formatHashtags(hashtags))
                    }
                  }}
                  className="flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  <TagIcon className="h-4 w-4" />
                  <span>Copy as Single Line</span>
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  Generate New Set
                </button>
                <button
                  onClick={() => {
                    const tagCount = hashtags.split('#').length - 1
                    const charCount = formatHashtags(hashtags).length
                    alert(`Hashtag count: ${tagCount}\nCharacter count: ${charCount}\n\nPlatform limits:\n• Instagram: 30 hashtags, 2200 chars\n• TikTok: 20 hashtags, 100 chars\n• LinkedIn: 3-5 hashtags recommended`)
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  Check Limits
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <HashtagIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Enter your content description and niche to generate hashtags</p>
              <p className="text-sm mt-2">AI will create optimized hashtag sets for maximum reach</p>
            </div>
          )}
        </div>
      </div>

      {/* Hashtag Strategy Guide */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4"># Hashtag Strategy Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="font-semibold text-green-900 mb-2">High-Volume Tags</div>
            <div className="text-gray-700">5-7 popular hashtags (1M+ posts) for broad reach. Competitive but high visibility.</div>
            <div className="text-xs text-green-600 mt-2">Example: #fitness #workout #motivation</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="font-semibold text-green-900 mb-2">Medium-Volume Tags</div>
            <div className="text-gray-700">10-15 niche-specific tags (100K-1M posts) for targeted audience engagement.</div>
            <div className="text-xs text-green-600 mt-2">Example: #homeworkout #corestrength #fitnessjourney</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="font-semibold text-green-900 mb-2">Low-Volume Tags</div>
            <div className="text-gray-700">5-8 specific tags (0-100K posts) for community building and higher engagement rates.</div>
            <div className="text-xs text-green-600 mt-2">Example: #beginnerworkout #fitnessmotivation2024</div>
          </div>
        </div>
      </div>
    </div>
  )
}