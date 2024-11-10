'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Undo, Edit3, Link, Maximize2, ChevronRight, Check, SkipForward, Bookmark } from "lucide-react"
import VisGraph from './visGraph'
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
  const [showBookmarks, setShowBookmarks] = useState(false)

  const toggleFullscreenCollapse = () => {
    setIsFullscreen(!isFullscreen)
    setIsCollapsed(!isCollapsed)
  }

  const toggleBookmarksView = () => {
    setShowBookmarks(!showBookmarks)
  }

  {/* const updateContent = (index, newContent) => {
    const updatedContent = [...content]
    updatedContent[index] = { ...updatedContent[index], ...newContent }
    setContent(updatedContent)
  } */}

  const updateContent = (nodeId) => {
    console.log(nodeId + "qwer")
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
        <p className="text-gray-300 mb-2">{item.content}</p>
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex">
        {/* Left section (expands when right section is collapsed) */}
        <div className={`bg-gray-900 rounded-l-2xl p-6 transition-all duration-300 ${isCollapsed ? 'w-full' : 'w-96'}`}>
          <Card className="h-full bg-transparent border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              {/* <Button variant="ghost" size="icon" onClick={() => console.log("Undo clicked")}>
                <Undo className="h-4 w-4 text-purple-300" />
              </Button> */}
              <CardTitle className="text-2xl font-bold text-purple-300">Learning Path</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={toggleBookmarksView}>
                  <Edit3 className="h-4 w-4 text-purple-300" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => console.log("Link clicked")}>
                  <Link className="h-4 w-4 text-purple-300" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleFullscreenCollapse}>
                  {isCollapsed ? <ChevronRight className="h-4 w-4 text-purple-300" /> : <Maximize2 className="h-4 w-4 text-purple-300" />}
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
        </div>

        {/* Right section (collapsible) */}
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0' : 'w-3/4'} bg-gray-800 rounded-r-2xl p-8 relative overflow-hidden`}>
          {!isCollapsed && (
            <>
              <h1 className="text-4xl font-bold text-purple-300 mb-4">Main Learning Area</h1>
              <VisGraph  onClickFunction={updateContent}>

              </VisGraph>
              <p className="text-gray-300">MindMap</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LearningDashboard
