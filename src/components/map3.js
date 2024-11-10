'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Undo, Edit3, Link, Maximize2, Check, SkipForward, Bookmark } from "lucide-react"
import VisGraph from './visGraph'
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";
import { generateNodeInfo, getRoadmap } from '@/app/actions'
const tags = []



const initialContent = [
  {
    type: 'article',
    title: 'Click on a node to get started on your journey...',
    
  }
  
]

const updateContent = [
    {
        type: 'text',
        title: 'Introduction',
        completed: false,
        bookmarked: false,
        content: 'Write a React component that implements a counter with increment and decrement buttons.'
    },
    
    {
    type: 'video',
    title: 'Tutorial',
    completed: false,
    bookmarked: false,
    content: 'https://example.com/intro-to-react-video'
},
  {
    type: 'article',
    title: 'Example',
    completed: false,
    bookmarked: false,
    content: 'Write a React component that implements a counter with increment and decrement buttons.'
  },

  {
    type: 'article',
    title: 'Learn More',
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
  const [bookmarkedContent, setBookmarkedContent] = useState([])
  const [isCompleteClicked, setIsCompleteClicked] = useState(false);
  const [isSkipClicked, setIsSkipClicked] = useState(false);
  const [roadmap, setRoadmap] = useState(null); // Store roadmap data in state
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  let activeNodeID = null;






  useEffect(() => { 
    async function getServerRoadmap() { 
      setIsLoading(true); // Start loading
      const roadmapData = await getRoadmap();
      setRoadmap(roadmapData); // Update roadmap state
      setIsLoading(false); // Done loading
    
    }
    getServerRoadmap()
  }, [])


  const onClickSetActiveNodeID = async (nodeId) => {
    activeNodeID = nodeId;
    const node = roadmap.nodes.find(node => node.id === activeNodeID);
    console.log(node.shortDescription);
    console.log("topicname: " + node.topicName);
    const nodeInfo = await generateNodeInfo(node.topicName, node.shortDescription);
    console.log("NODEINFO:")
    console.log(nodeInfo);
    const updateContent = [
    {
        type: 'text',
        title: 'Introduction',
        completed: false,
        bookmarked: false,
        content: nodeInfo.summary,
    },
    
    {
    type: 'video',
    title: 'Tutorial',
    completed: false,
    bookmarked: false,
    content: 'https://example.com/intro-to-react-video'
},
  {
    type: 'article',
    title: 'Example',
    completed: false,
    bookmarked: false,
    content: nodeInfo.example
  },

  {
    type: 'article',
    title: 'Learn More',
    completed: false,
    bookmarked: false,
    content: nodeInfo.learnMoreInformation
      } 
  
]
    setContent(updateContent)
    console.log(content)
    setIsCompleteClicked(false);
    setIsSkipClicked(false);
  }

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)
  
  const toggleFullscreenCollapse = () => {
    setIsFullscreen(!isFullscreen)
    setIsCollapsed(!isCollapsed)
  }
  const handleComplete = () => {
    setIsCompleteClicked(true);
    if(activeNodeID) {
        // Find the node with the given nodeId and update its skipped value to true
        const node = roadmap.nodes.find(node => node.id === activeNodeID);
        
        if (node) {
          node.completed = true;  // Set skipped to true for the found node

          // Update the node in the vis.DataSet (assuming nodes is a vis.DataSet object)
          nodesList.update({
            id: activeNodeID,  // Ensure we're updating the correct node
            completed: true,  // Set skipped to true
            color: 'green'  // Optionally, change the color to indicate the node is skipped
          });

          console.log(`Node ${activeNodeID} marked as skipped.`);
        } else {
          console.log(`Node with id ${activeNodeID} not found.`);
        }
    }
    // setTimeout(() => setIsCompleteClicked(false), 300); Reset state after 300ms
  }

  const handleSkip = () => {
    setIsSkipClicked(true);
    if(activeNodeID) {
      // Find the node with the given nodeId and update its skipped value to true
      const node = roadmap.nodes.find(node => node.id === activeNodeID);
      
      if (node) {
        node.skipped = true;  // Set skipped to true for the found node

        // Update the node in the vis.DataSet (assuming nodes is a vis.DataSet object)
        nodesList.update({
          id: activeNodeID,  // Ensure we're updating the correct node
          skipped: true,  // Set skipped to true
          color: 'orange'  // Optionally, change the color to indicate the node is skipped
        });

        console.log(`Node ${activeNodeID} marked as skipped.`);
      } else {
        console.log(`Node with id ${activeNodeID} not found.`);
      }
    }
    // setTimeout(() => setIsSkipClicked(false), 300); // Reset state after 300ms
  }

  const isActiveNodeIdValid = (activeNodeId) => {
    return activeNodeId !== null;
  };

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

  const toggleBookmarksView = () => {
    setShowBookmarks(!showBookmarks)
  }


    // ... other functions (handleComplete, handleSkip, etc.)

  // Create DataSet instances based on roadmap data
  const nodesList = roadmap ? new DataSet(
    roadmap.nodes.map(node => ({
      id: node.id,
      label: node.topicName,
      title: node.shortDescription,
      // color: node.completed ? 'green' : node.skipped ? 'orange' : 'blue'
      // color: {
      //   border: '#FFFFFF', // White border for better contrast
      //   background: '#4285F4', // A darker purple for a more modern look
      //   highlight: {
      //     border: '#FFFFFF',
      //     background: '#B93CF6', // A brighter purple on hover
      //   },
      // },
      borderWidth: 3,
      // shadow: { enabled: true, color: "orange", size: 10 },
    }))
  ) : new DataSet([]); // Initialize with empty DataSet if roadmap is null

  const edgesList = roadmap ? new DataSet(
    roadmap.edges.map(node => ({
      from: node.source,
      to: node.target
    }))
  ) : new DataSet([]); // Initialize with empty DataSet if roadmap is null

  // ... rest of your component


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
         <p className="text-gray-300 mb-2">{item.content}</p> 
    <div className="flex justify-between mt-4">
          {/* <Button 
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
          </Button> */}
        </div>
      </div>
    ))
  }

  console.log(nodesList)
  console.log(edgesList);
  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Background animation */}
      {/*<div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div> */}
      
      <div className="w-full mx-auto flex">
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

            {isActiveNodeIdValid(activeNodeID) &&
        
            <CardFooter className="flex justify-between mt-4">
            <Button
                onClick={handleComplete}
                className={`bg-green-600 hover:bg-green-700 ${
                isCompleteClicked ? 'bg-green-800 opacity-75' : ''
                }`}
            >
                Complete
            </Button>
            <Button
                onClick={handleSkip}
                className={`bg-yellow-600 hover:bg-yellow-700 ${
                isSkipClicked ? 'bg-yellow-800 opacity-75' : ''
                }`}
            >
                Skip All
            </Button>
            </CardFooter> }
          </Card>
        </div>

        {/* Right section (collapsible) */}
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0' : 'w-3/4'} bg-gray-800 rounded-r-2xl p-8 relative overflow-hidden`}>
        {!isCollapsed && (
            <>
              <h1 className="text-4xl font-bold text-purple-300 mb-4">Main Learning Area</h1>
              {isLoading ? ( // Show loading indicator
                <p className='text-white'>Loading roadmap...</p> 
              ) : (
                <VisGraph
                  onClickFunction={onClickSetActiveNodeID}
                  roadmap={roadmap}
                  nodesList={nodesList}
                  edgesList={edgesList}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LearningDashboard
