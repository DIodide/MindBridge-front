'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Undo, Edit3, Link, Maximize2, Check, SkipForward, Bookmark } from "lucide-react"
import VisGraph from './visGraph'
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";
import { getRoadmap } from '@/app/actions'
const tags = []



const initialContent = [
  {
    type: 'article',
    title: 'Click on a node to get started on your journey...',
    
  }
  
]


// // ROAD MAP OBJ
// let roadmap = {
//   title: "Learning Roadmap",
//   description: "A roadmap for learning topics to reach a specific goal.",
//   nodes: [
//     {
//       topicName: "Introduction to Programming",
//       shortDescription: "Basics of programming and algorithms.",
//       id: 1,
//       completed: false,
//       skipped: false
//     },
//     {
//       topicName: "JavaScript Fundamentals",
//       shortDescription: "Introduction to JavaScript syntax and concepts.",
//       id: 2,
//       completed: true,
//       skipped: false
//     },
//     {
//       topicName: "React Basics",
//       shortDescription: "Learn the basics of building user interfaces with React.",
//       id: 3,
//       completed: false,
//       skipped: true
//     },
//     {
//       topicName: "Data Structures",
//       shortDescription: "Understanding essential data structures in programming.",
//       id: 4,
//       completed: false,
//       skipped: false
//     }
//   ],
//   edges: [
//     {
//       source: 1,
//       target: 2
//     },
//     {
//       source: 2,
//       target: 3
//     },
//     {
//       source: 3,
//       target: 4
//     }
//   ]
// };



    // Define the nodes and edges
    // const nodesList = new DataSet(roadmap.nodes);




const LearningDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [content, setContent] = useState(initialContent)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [bookmarkedContent, setBookmarkedContent] = useState([])
  const [isCompleteClicked, setIsCompleteClicked] = useState(false);
  const [isSkipClicked, setIsSkipClicked] = useState(false);
  let activeNodeID = null;
  let nodesList;
  let edgesList;
  let roadmap;




  useEffect(() => { 
    async function getServerRoadmap() { 
      roadmap = await getRoadmap();
      console.log("RIGHT AFTER THINGY THING")
      console.log(roadmap)
      nodesList = new DataSet(
        roadmap.nodes.map(node => {
          let nodeColor;
    
          // Use if-else to determine the color based on the 'completed' and 'skipepd' status
          if (node.completed) {
            nodeColor = 'green';  // Node is completed
          } else if (node.skipped) {
            nodeColor = 'orange';  // Node is skipped
          } else {
            nodeColor = 'blue';   // Node is not completed
          }
    
          return {
            id: node.id,
            label: node.topicName,  // Set label to the topic name
            title: node.shortDescription,  // Set title as the description for hover
            color: nodeColor  // Use the nodeColor variable for the color property
          };
        }
      
        )
      

      );
      console.log("AFTER THING2: " + JSON.stringify(nodesList))

    



      edgesList = new DataSet([
      { from: 1, to: 2, length: 200},
      { from: 1, to: 3, length: 200 },
      { from: 2, to: 4, length: 200 },
      { from: 2, to: 5, length: 200 },
    ]);
    }
    getServerRoadmap()
  }, [])
  console.log("After useEffect: " + nodesList)
  console.log("After useEffect: " + edgesList)


  const onClickSetActiveNodeID = (nodeId) => {
    activeNodeID = nodeId;
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
              <h1 className="text-4xl font-bold text-purple-300 mb-4"> Your Customized Roadmap</h1>
              <VisGraph  onClickFunction={onClickSetActiveNodeID} roadmap={roadmap} nodesList={nodesList} edgesList={edgesList}> 

              </VisGraph>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LearningDashboard
