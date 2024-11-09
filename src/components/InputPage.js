"use client"
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { generateTopics } from "@/app/actions";

export default function InputPage() {
  const topics = ["Front-end Development", "React", "APIs", "Python"]
  const [goal, setGoal] = useState("")
  const [topicData, setTopicData] = useState(null);
  const handlechange = (event) => {
    setGoal(event.target.value)
  }



  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6A0DAD" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9932CC" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d={`M${-200 + i * 150},1000 Q${300 + i * 100},${500 - i * 50} ${1200 - i * 100},0`}
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-purple-400">Learning Hub</h1>
          <div className="flex flex-col items-center space-y-6">
          <TextField fullWidth label = "What do you want to learn today?" variant="outlined" color="secondary" focused sx={{input:{color: 'white'}}} value ={goal} onChange={handlechange} />
          
          <Button variant = "contained" color="secondary" size="large"
            onClick={async () => {
    try {
      const roadmapData = await generateTopics(goal);
      
      // Pass the roadmapData to ExperiencePage (using a router or context)
      // ... (See step 4 for examples)

    } catch (error) {
      console.error('Error sending ChatGPT request:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
            }}
          >{"Let's Go!"}</Button>
          </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Popular Topics</h2>
          <div className="grid grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <div 
                key={index} 
                className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-purple-500 hover:bg-purple-700 transition-colors"
                onClick={() => {
                  setGoal("I want to learn about " + topic)
                }}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
