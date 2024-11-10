'use server'

import { OpenAI } from "openai";
import { parse } from 'dotenv';
import { zodResponseFormat } from "openai/helpers/zod";
import { any, z } from 'zod';

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
  topicName: z.string(),          // Display label of the node
  shortDescription: z.string(),    // Additional info about the node
  level: z.number(),          // Level of knowledge or importance (optional)
});

const EdgeSchema = z.object({
  source: z.number(),         // ID of the source node
  target: z.number(),         // ID of the target node
  label: z.string(),          // Label for the edge (optional)
});

// Define the full roadmap schema with arrays of nodes and edges
const RoadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  nodes: z.array(NodeSchema), // Array of nodes
  edges: z.array(EdgeSchema), // Array of edges connecting nodes
});

export async function generateTopics(goal, maxTopics=10) {
    try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Or a more suitable model // change to gpt-4o for pitch
        messages: [
        { role: 'system', content: `You are helping users build a learning roadmap. Please return a list of up to ${maxTopics} topics relevant to the goal without any extra information or explanation.`  },
            { role: 'user', content: `Generate a learning roadmap for ${goal}.` },
        ],
        response_format: zodResponseFormat(TopicsSchema, "topics"), // Use zodResponseFormat
      temperature: 0.7, // Adjust for creativity
    });
    
      const parsed_response = JSON.parse(response.choices[0].message.content);
      //console.log("The response: " + JSON.stringify(response))
      return parsed_response;
  } catch (error) {
      console.error('Error sending ChatGPT request:', error);
      console.log("MyAPIKEY: " + config.OPENAI_API_KEY)
    throw error; // Re-throw the error to handle it in the frontend
  }
}

export async function generateRoadmap(topics, goal) { 
  topics = topics.join(" ");
    try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Or a more suitable model // change to gpt-4o for pitch
        messages: [
        { role: 'system', content: `You are helping users build a learning roadmap. The user has already asked you what you want to learn, and you have asked the user for their background knowledge. Now, you will generate a roadmap, with the user's background knowledge in mind, meaning that you will not repeat topics in the roadmap that the user has said they already know`  },
            { role: 'user', content: `Generate a learning roadmap for ${goal}. I have already learned the following topics: ${topics}.` },
        ],
        response_format: zodResponseFormat(RoadmapSchema, "roadmap"), // Use zodResponseFormat
      temperature: 0.7, // Adjust for creativity
    });
    
      const parsed_response = JSON.parse(response.choices[0].message.content);
      console.log("The roadmap response: " + JSON.stringify(parsed_response))
      return parsed_response;
  } catch (error) {
      console.error('Error sending ChatGPT request:', error);
      console.log("MyAPIKEY: " + config.OPENAI_API_KEY)
    throw error; // Re-throw the error to handle it in the frontend
  }
}