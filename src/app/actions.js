'use server'

import { OpenAI } from "openai";
import { parse } from 'dotenv';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from 'zod';

import useTopicsStore from '../store/topicsStore';

const config = parse(process.env);

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

const TopicsSchema = z.object({
  topics: z.array(z.string()),
})

// Define Node and Edge structure for the roadmap
const NodeSchema = z.object({
  id: z.string(),             // Unique identifier for the node
  label: z.string(),          // Display label of the node
  description: z.string(),    // Additional info about the node
  level: z.number(),          // Level of knowledge or importance (optional)
});

const EdgeSchema = z.object({
  source: z.string(),         // ID of the source node
  target: z.string(),         // ID of the target node
  label: z.string().optional(), // Optional label for the edge
});

// Define the full roadmap schema with arrays of nodes and edges
const RoadmapSchema = z.object({
  nodes: z.array(NodeSchema), // Array of nodes
  edges: z.array(EdgeSchema), // Array of edges connecting nodes
});

export async function generateTopics(goal) {
    try {
      const store = useTopicsStore.getState();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Or a more suitable model // change to gpt-4o for pitch
        messages: [
        { role: 'system', content: 'You are helping users build a learning roadmap. Your first role is to return a list of topics, so that the user may identify topics that they already know so that they are not included in the final roadmap, your ' },
            { role: 'user', content: `Generate a learning roadmap for ${goal}.` },
        ],
        response_format: zodResponseFormat(TopicsSchema, "topics"), // Use zodResponseFormat
      temperature: 0.7, // Adjust for creativity
    });
    
      const parsed_response = JSON.parse(response.choices[0].message.content);
      console.log("The response: " + JSON.stringify(response))
      store.setTopics(parsed_response.topics); // Update topics in Zustand store
      return parsed_response;
  } catch (error) {
      console.error('Error sending ChatGPT request:', error);
      console.log("MyAPIKEY: " + config.OPENAI_API_KEY)
    throw error; // Re-throw the error to handle it in the frontend
  }
}
