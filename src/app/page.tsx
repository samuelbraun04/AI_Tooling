'use client'

import { useState, useEffect } from 'react'
import { ChartBarIcon, LightBulbIcon, VideoCameraIcon, HashtagIcon, DocumentTextIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import ContentIdeas from '@/components/ContentIdeas'
import ScriptGenerator from '@/components/ScriptGenerator'
import HashtagGenerator from '@/components/HashtagGenerator'
import Analytics from '@/components/Analytics'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'ideas', name: 'Content Ideas', icon: LightBulbIcon },
    { id: 'scripts', name: 'Scripts & Captions', icon: VideoCameraIcon },
    { id: 'hashtags', name: 'Hashtag Generator', icon: HashtagIcon },
    { id: 'reports', name: 'Performance Reports', icon: DocumentTextIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartPieIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">SMMA Pro</h1>
              {/* <span className="text-sm text-gray-500"></span> */}
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Content Ideas Generated</p>
                      <p className="text-3xl font-bold text-gray-900">1,247</p>
                    </div>
                    <LightBulbIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Scripts Created</p>
                      <p className="text-3xl font-bold text-gray-900">634</p>
                    </div>
                    <VideoCameraIcon className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Hashtag Sets</p>
                      <p className="text-3xl font-bold text-gray-900">892</p>
                    </div>
                    <HashtagIcon className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Viral Score Avg</p>
                      <p className="text-3xl font-bold text-gray-900">8.7</p>
                    </div>
                    <ChartBarIcon className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setActiveSection('ideas')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center"
                  >
                    <LightBulbIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Generate Content Ideas</p>
                    <p className="text-sm text-gray-600">AI-powered viral content concepts</p>
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('scripts')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
                  >
                    <VideoCameraIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Create Scripts</p>
                    <p className="text-sm text-gray-600">Hook-optimized video scripts</p>
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('hashtags')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center"
                  >
                    <HashtagIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Generate Hashtags</p>
                    <p className="text-sm text-gray-600">Optimized hashtag strategies</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ideas' && (
            <ContentIdeas onBack={() => setActiveSection('overview')} />
          )}

          {activeSection === 'scripts' && (
            <ScriptGenerator onBack={() => setActiveSection('overview')} />
          )}

          {activeSection === 'hashtags' && (
            <HashtagGenerator onBack={() => setActiveSection('overview')} />
          )}

          {activeSection === 'analytics' && (
            <Analytics onBack={() => setActiveSection('overview')} />
          )}

          {activeSection !== 'overview' && activeSection !== 'ideas' && activeSection !== 'scripts' && activeSection !== 'hashtags' && activeSection !== 'analytics' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {navigationItems.find(item => item.id === activeSection)?.name}
              </h2>
              <p className="text-gray-600">This section is coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
