'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Undo, Edit3, Link, Maximize2, Check, SkipForward, Bookmark } from "lucide-react"

const tags = ['JavaScript', 'React', 'Node.js']

const initialContent = [
  {
    type: 'video',
    title: 'Introduction to React',
    completed: false,
    bookmarked: false,
    content: 'https://example.com/intro-to-react-video'
  },
  {
    type: 'article',
    title: 'Understanding Hooks',
    completed: false,
    bookmarked: false,
    content: 'React Hooks are a powerful feature that allows you to use state and other React features without writing a class...'
  },
  {
    type: 'practice',
    title: 'Create a Counter Component',
    completed: false,
    bookmarked: false,
    content: 'Write a React component that implements a counter with increment and decrement buttons.'
  }
]

const LearningDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [content, setContent] = useState(initialContent)
  const [userInput, setUserInput] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const handleComplete = (index) => {
    const newContent = [...content]
    newContent[index].completed = true
    setContent(newContent)
  }

  const handleSkip = (index) => {
    const newContent = [...content]
    newContent.push(newContent.splice(index, 1)[0])
    setContent(newContent)
  }

  const handleUserInput = (index, value) => {
    setUserInput(value)
  }

  const handleBookmark = (index) => {
    const newContent = [...content]
    newContent[index].bookmarked = !newContent[index].bookmarked
    setContent(newContent)
  }

  const toggleBookmarksView = () => {
    setShowBookmarks(!showBookmarks)
  }

  const renderContent = () => {
    const contentToRender = showBookmarks ? content.filter(item => item.bookmarked) : content
    return contentToRender.map((item, index) => (
      <div key={index} className="mb-6 p-4 bg-gray-800 rounded-lg relative">
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${item.bookmarked ? 'text-red-500' : 'text-gray-400'}`}
          onClick={() => handleBookmark(index)}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-semibold text-purple-300 mb-2">{item.title}</h3>
        {item.type === 'video' && (
          <div className="aspect-w-16 aspect-h-9 mb-2">
            <iframe src={item.content} className="w-full h-full rounded" allowFullScreen></iframe>
          </div>
        )}
        {item.type === 'article' && (
          <p className="text-gray-300 mb-2">{item.content}</p>
        )}
        {item.type === 'practice' && (
          <div>
            <p className="text-gray-300 mb-2">{item.content}</p>
            <Textarea 
              placeholder="Write your code here..."
              className="w-full mt-2 bg-gray-700 text-gray-200"
              value={userInput}
              onChange={(e) => handleUserInput(index, e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Button 
            onClick={() => handleComplete(index)} 
            className={`bg-green-600 hover:bg-green-700 ${item.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={item.completed}
          >
            <Check className="mr-2 h-4 w-4" /> Complete
          </Button>
          <Button 
            onClick={() => handleSkip(index)} 
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            <SkipForward className="mr-2 h-4 w-4" /> Skip
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto flex">
        {/* Left section (collapsible side window) */}
        <div className={`bg-gray-900 rounded-l-2xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-12' : isFullscreen ? 'w-full absolute inset-0' : 'w-96'}`}>
          <Button 
            onClick={toggleCollapse} 
            className="absolute top-4 -right-4 bg-purple-600 hover:bg-purple-700 rounded-full p-2 z-10"
          >
            {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>

          {!isCollapsed && (
            <Card className="h-full bg-transparent border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Button variant="ghost" size="icon" onClick={() => console.log("Undo clicked")}>
                  <Undo className="h-4 w-4 text-purple-300" />
                </Button>
                <CardTitle className="text-2xl font-bold text-purple-300">Learning Path</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={toggleBookmarksView}>
                    <Edit3 className="h-4 w-4 text-purple-300" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => console.log("Link clicked")}>
                    <Link className="h-4 w-4 text-purple-300" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    <Maximize2 className="h-4 w-4 text-purple-300" />
                  </Button>
                </div>
              </CardHeader>

              <div className="px-6 py-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Button key={index} variant="outline" size="sm" className="text-purple-300 border-purple-500 hover:bg-purple-700">
                    {tag}
                  </Button>
                ))}
              </div>

              <CardContent className="overflow-y-auto h-[calc(100vh-200px)]">
                {renderContent()}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right section (main content area) */}
        <div className="flex-grow bg-gray-800 rounded-r-2xl p-8">
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Main Learning Area</h1>
          <p className="text-gray-300">MindMap</p>
        </div>
      </div>
    </div>
  )
}

export default LearningDashboard