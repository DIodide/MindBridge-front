'use client'

import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check } from "lucide-react"
import Link from 'next/link'


export default function Experience() {
  const topicData = {
    topics: ["React", "JavaScript", "Next.js"] 
  };
  const [checklist, setChecklist] = useState(
      topicData.topics.map((topic, index) => ({
        id: index + 1,
        text: topic,
        checked: false,
      }))
  )

  const handleCheckboxChange = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const handleNextClick = () => {
    console.log("Next button clicked")
    console.log("Checked items:", checklist.filter(item => item.checked))
  }

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      <Card className="w-full max-w-md mx-auto bg-gray-900 border-purple-500 border-2 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-purple-500/20 relative z-10">
        <CardHeader className="border-b border-purple-500 pb-4">
          <CardTitle className="text-2xl font-extrabold text-center text-purple-300 tracking-tight">
            What do you already know about this topic?
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <ul className="space-y-5">
            {checklist.map(item => (
              <li key={item.id} className="flex items-center space-x-3 group">
                <div className="relative">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={() => handleCheckboxChange(item.id)}
                    className="w-6 h-6 border-2 border-purple-400 rounded-md text-purple-600 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  />
                  {item.checked && (
                    <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400 w-4 h-4 pointer-events-none" />
                  )}
                  <div className="absolute inset-0 bg-purple-600 rounded-md transform scale-0 transition-transform duration-300 ease-in-out group-hover:scale-75 opacity-25 pointer-events-none"></div>
                </div>
                <label
                  htmlFor={`item-${item.id}`}
                  className={"text-lg font-semibold text-purple-200 transition-all duration-300 ease-in-out group-hover:text-purple-300 cursor-pointer"}
                >
                  {item.text}
                </label>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end mt-6">
          <Link href="/learn"> 
            <Button 
              onClick={handleNextClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
