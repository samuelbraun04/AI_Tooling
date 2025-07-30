'use client'

import { useState, useEffect } from 'react'
import { VideoCameraIcon, SparklesIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'

interface ScriptGeneratorProps {
  onBack: () => void
}

export default function ScriptGenerator({ onBack }: ScriptGeneratorProps) {
  const [idea, setIdea] = useState('')
  const [brand, setBrand] = useState('')
  const [tone, setTone] = useState('casual')
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGenerate = async () => {
    if (!idea.trim() || !brand.trim()) {
      alert('Please enter both content idea and brand name')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: idea.trim(),
          brand: brand.trim(),
          tone,
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setScript(data.script)
      } else {
        alert(data.error || 'Failed to generate script')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while generating script')
    } finally {
      setLoading(false)
    }
  }

  const toneOptions = [
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'energetic', label: 'Energetic & Fun' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'humorous', label: 'Humorous' },
  ]

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
          <h2 className="text-3xl font-bold text-gray-900">Script & Caption Generator</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-2 mb-6">
            <VideoCameraIcon className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900">Create Hook-Optimized Scripts</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                Content Idea
              </label>
              <textarea
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., 5 home workout exercises that burn more calories than running"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Brand/Creator Name
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., FitLife Coaching, @yourhandle"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                Tone & Style
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !idea.trim() || !brand.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Script...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Generate Script</span>
                </>
              )}
            </button>
          </div>

          {/* Script Writing Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">🎬 Script Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Hook viewers in the first 3 seconds</li>
              <li>• Use pattern interrupts to stop scrolling</li>
              <li>• Include visual cues and directions</li>
              <li>• End with a strong call-to-action</li>
            </ul>
          </div>
        </div>

        {/* Generated Script Display */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Script</h3>
          
          {script ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">{script}</pre>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <button
                  onClick={() => {
                    if (mounted && navigator.clipboard) {
                      navigator.clipboard.writeText(script)
                    }
                  }}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <ClipboardDocumentIcon className="h-4 w-4" />
                  <span>Copy Script</span>
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  Generate New Version
                </button>
                <button
                  onClick={() => {
                    const words = script.split(' ').length
                    const readTime = Math.ceil(words / 150) // ~150 words per minute speaking
                    alert(`Estimated reading time: ${readTime} minute(s)\nWord count: ${words} words`)
                  }}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  Script Stats
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <VideoCameraIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Enter your content idea and brand to generate a script</p>
              <p className="text-sm mt-2">AI will create hook-optimized scripts for maximum engagement</p>
            </div>
          )}
        </div>
      </div>

      {/* Script Structure Guide */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">📝 Viral Script Structure</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">1. Hook (0-3s)</div>
            <div className="text-gray-700">Pattern interrupt that stops scrolling. Make a bold claim or ask compelling question.</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">2. Promise (3-7s)</div>
            <div className="text-gray-700">Tell them what they'll learn or gain. Set clear expectations.</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">3. Content (7-45s)</div>
            <div className="text-gray-700">Deliver value. Keep it visual, actionable, and engaging.</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-900 mb-2">4. CTA (45-60s)</div>
            <div className="text-gray-700">Clear call-to-action. Follow, like, share, or visit link.</div>
          </div>
        </div>
      </div>
    </div>
  )
}