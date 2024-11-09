// app/page.js
'use client';

import React, { useState } from 'react';
import RoadmapGraph from '@/components/RoadMapGraph';

export default function RoadmapForm() {
  const [knowledge, setKnowledge] = useState('');
  const [goals, setGoals] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/generateRoadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ knowledge, goals }),
      });

      const data = await response.json();
      if (response.ok) {
        setRoadmap(data);
      } else {
        console.error("Failed to generate roadmap:", data.error);
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          What you know:
          <input
            type="text"
            value={knowledge}
            onChange={(e) => setKnowledge(e.target.value)}
            required
          />
        </label>
        <label>
          What you want to learn:
          <input
            type="text"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </form>

      {roadmap && (
        <div>
          <h2>Learning Roadmap</h2>
          <RoadmapGraph roadmap={roadmap} />
        </div>
      )}
    </div>
  );
}