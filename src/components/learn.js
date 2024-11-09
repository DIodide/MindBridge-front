'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from 'next/link'
import './ui/styles.css'

const Style = () => {
  const [preferences, setPreferences] = useState({
    visual: 3,
    auditory: 3,
    reading: 3,
    kinesthetic: 3,
  })

  const handleSliderChange = (value, key) => {
    setPreferences(prev => ({ ...prev, [key]: value[0] }))
  }

  const handleNextClick = () => {
    console.log("Generate Roadmap clicked", preferences)
    // Add your roadmap generation logic here
  }

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-purple-500 border-2 rounded-2xl shadow-2xl">
        <CardHeader className="border-b border-purple-500 pb-4">
          <CardTitle className="text-2xl font-extrabold text-center text-purple-300 tracking-tight">
            How do you learn best?
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6 space-y-8">
          {Object.entries(preferences).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <Label htmlFor={key} className="text-lg font-semibold text-purple-200 capitalize">
                {key} Learning
              </Label>
              <Slider
                id={key}
                min={1}
                max={5}
                step={1}
                value={[value]}
                onValueChange={(newValue) => handleSliderChange(newValue, key)}
                // className="w-full"
                className="SliderTrack"
                style={{ '--slider-fill': `${(value - 1) * 25}%` }}
              />
              {/* <style jsx>{`
                #${key} .slider-track {
                  background: linear-gradient(to right, black, white);
                }

                #${key} .SliderTrack {
                    position: relative;
                    flex-grow: 1;
                    background-color: grey;
                }
                #${key} .slider-thumb {
                  background-color: ${value === 1 ? 'black' : value === 5 ? 'white' : `rgba(255, 255, 255, ${(value - 1) / 4})`};
                  border: 2px solid purple;
                }

                
              `}</style> */}

              <div className="flex justify-between text-sm text-purple-400">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end mt-6">
        <Link href = "/map">
          <Button 
            onClick={handleNextClick}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Generate Roadmap
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Style