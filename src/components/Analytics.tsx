'use client'

import { ChartPieIcon, ArrowTrendingUpIcon, EyeIcon, HeartIcon, ShareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

interface AnalyticsProps {
  onBack: () => void
}

export default function Analytics({ onBack }: AnalyticsProps) {
  const mockData = {
    overview: {
      totalReach: 2456789,
      engagement: 8.7,
      viralScore: 92,
      contentGenerated: 1247
    },
    platforms: [
      { name: 'TikTok', reach: 1200000, engagement: 12.3, color: 'bg-pink-500' },
      { name: 'Instagram', reach: 856000, engagement: 6.8, color: 'bg-purple-500' },
      { name: 'YouTube', reach: 340000, engagement: 4.2, color: 'bg-red-500' },
      { name: 'LinkedIn', reach: 60789, engagement: 3.1, color: 'bg-blue-500' },
    ],
    recentContent: [
      { title: '5 Productivity Hacks That Actually Work', views: 234567, likes: 12453, shares: 2341, comments: 567, viralScore: 94 },
      { title: 'Why Your Marketing Strategy Is Failing', views: 189234, likes: 8765, shares: 1876, comments: 432, viralScore: 88 },
      { title: 'The $100K Revenue Secret Nobody Talks About', views: 456789, likes: 23456, shares: 4567, comments: 1234, viralScore: 96 },
      { title: 'I Tried Every Productivity App for 30 Days', views: 123456, likes: 6789, shares: 1234, comments: 345, viralScore: 85 },
    ],
    trends: [
      { metric: 'Reach', change: 23.5, trend: 'up' },
      { metric: 'Engagement', change: 15.2, trend: 'up' },
      { metric: 'Viral Score', change: -2.1, trend: 'down' },
      { metric: 'Content Created', change: 45.8, trend: 'up' },
    ]
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
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
          <h2 className="text-3xl font-bold text-gray-900">Performance Analytics</h2>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Schedule Report
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(mockData.overview.totalReach)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                +23.5% vs last month
              </p>
            </div>
            <EyeIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Engagement</p>
              <p className="text-3xl font-bold text-gray-900">{mockData.overview.engagement}%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                +15.2% vs last month
              </p>
            </div>
            <HeartIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Viral Score</p>
              <p className="text-3xl font-bold text-gray-900">{mockData.overview.viralScore}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1 rotate-180" />
                -2.1% vs last month
              </p>
            </div>
            <ChartPieIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Content Generated</p>
              <p className="text-3xl font-bold text-gray-900">{mockData.overview.contentGenerated}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                +45.8% vs last month
              </p>
            </div>
            <ShareIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Platform Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Platform Performance</h3>
          <div className="space-y-4">
            {mockData.platforms.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{platform.name}</p>
                    <p className="text-sm text-gray-600">{formatNumber(platform.reach)} reach</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{platform.engagement}%</p>
                  <p className="text-sm text-gray-600">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Content</h3>
          <div className="space-y-4">
            {mockData.recentContent.map((content, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{content.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {formatNumber(content.views)}
                    </span>
                    <span className="flex items-center">
                      <HeartIcon className="h-4 w-4 mr-1" />
                      {formatNumber(content.likes)}
                    </span>
                    <span className="flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                      {formatNumber(content.comments)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-600 font-semibold">VS: {content.viralScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 AI Performance Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">🚀 What&apos;s Working</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Question-based hooks increase engagement by 34%</li>
              <li>• Content posted at 6-9 PM gets 2.3x more reach</li>
              <li>• Videos under 30 seconds have 45% higher completion rates</li>
              <li>• Trending audio increases virality score by 28%</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">💡 Recommendations</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Focus more on TikTok - highest engagement rate</li>
              <li>• Use more educational content formats</li>
              <li>• Increase posting frequency on weekends</li>
              <li>• Experiment with controversial topics (carefully)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}