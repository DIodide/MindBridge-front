'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Undo, Edit3, Link, Maximize2, Check, SkipForward, Bookmark } from "lucide-react"
import VisGraph from './visGraph'

const tags = ['JavaScript', 'React', 'Node.js']

const initialContent = {
  1: [
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
      content: 'React Hooks are a powerful feature that allows you to use state and other React features without writing a class. They let you use state and other React features without writing a class. Here are some key points:\n\n• Hooks are functions that let you "hook into" React state and lifecycle features from function components.\n• useState is a Hook that lets you add React state to function components.\n• useEffect is a Hook that lets you perform side effects in function components.\n• Custom Hooks let you create reusable stateful logic that you can share between components.\n\nFor more information, check out the [official React documentation](https://reactjs.org/docs/hooks-intro.html).'
    },
    {
      type: 'practice',
      title: 'Create a Counter Component',
      completed: false,
      bookmarked: false,
      content: 'Write a React component that implements a counter with increment and decrement buttons. Use the useState hook to manage the counter state.'
    }
  ],
  2: [
    {
      type: 'article',
      title: 'Advanced React Patterns',
      completed: false,
      bookmarked: false,
      content: 'This section covers advanced React patterns such as Render Props, Higher-Order Components, and Compound Components. These patterns allow for more flexible and reusable component designs.'
    },
    {
      type: 'video',
      title: 'React Performance Optimization',
      completed: false,
      bookmarked: false,
      content: 'https://example.com/react-performance-video'
    },
    {
      type: 'practice',
      title: 'Implement a Custom Hook',
      completed: false,
      bookmarked: false,
      content: 'Create a custom hook called useFetch that handles data fetching and loading states. Use this hook in a component to fetch and display data from an API.'
    }
  ]
}

const LearningDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [content, setContent] = useState(initialContent[1])
  const [userInput, setUserInput] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [nodeId, setNodeId] = useState(1)
  const [bookmarkedContent, setBookmarkedContent] = useState([])

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
    
    if (newContent[index].bookmarked) {
      setBookmarkedContent([...bookmarkedContent, newContent[index]])
    } else {
      setBookmarkedContent(bookmarkedContent.filter(item => item.title !== newContent[index].title))
    }
  }

  const toggleFullscreenCollapse = () => {
    setIsFullscreen(!isFullscreen)
    setIsCollapsed(!isCollapsed)
  }

  const toggleBookmarksView = () => {
    setShowBookmarks(!showBookmarks)
  }

  const updateContent = (newNodeId) => {
    setNodeId(newNodeId)
    setContent(initialContent[newNodeId])
    console.log(nodeId + "qwer")
  }

  const renderContent = () => {
    const contentToRender = showBookmarks ? bookmarkedContent : content
    return contentToRender.map((item, index) => (
      <div key={index} className="mb-6 p-4 bg-gray-800 rounded-lg relative border-2 border-transparent hover:border-purple-500 transition-all duration-300">
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
          <div className="text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br>').replace(/\[([^\]]+)\]$$([^$$]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300">$1</a>') }} />
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4 flex items-center justify-center relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto flex">
        {/* New Left section (collapsible side window) */}
        <div className={`bg-gray-900 rounded-l-2xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-12' : isFullscreen ? 'w-full absolute inset-0' : 'w-96'}`}>
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

          {/* [OLD<Button 
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
              </CardHeader> */}

              <div className="px-6 py-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Button key={index} variant="outline" size="sm" className="text-purple-300 border-purple-500 hover:bg-purple-700">
                    {tag}
                  </Button>
                ))}
              </div>

              <CardContent className="overflow-y-auto h-[calc(100vh-280px)]">
                {renderContent()}
              </CardContent>

              <CardFooter className="flex justify-between mt-4">
                <Button 
                  onClick={() => updateContent(nodeId === 1 ? 2 : 1)} 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {nodeId === 1 ? 'Next Section' : 'Previous Section'}
                </Button>
                <Button 
                  onClick={() => console.log("Skip All clicked")} 
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Skip All
                </Button>
              </CardFooter>
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

        {/* Old Right section (main content area) */}
        {/* <div className="flex-grow bg-gray-800 rounded-r-2xl p-8">
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Main Learning Area</h1>
          <VisGraph  onClickFunction={updateContent}>

              </VisGraph>
        </div> */}
      </div>
    </div>
  )
}

export default LearningDashboard