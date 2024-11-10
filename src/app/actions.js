'use server'

import { OpenAI } from "openai";
import { parse } from 'dotenv';
import { zodResponseFormat } from "openai/helpers/zod";
import { any, z } from 'zod';
import { cookies } from 'next/headers'

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

const NodeInfoSchema = z.object({
  summary: z.string(),
  example: z.string(),
  learnMoreInformation: z.string(),
})

export async function generateTopics(goal, maxTopics=10) {
  try {
      (await cookies()).set('goal', JSON.stringify(goal))
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or a more suitable model // change to gpt-4o for pitch
        messages: [
        { role: 'system', content: `You are helping users build a learning roadmap. Please return a list of up to ${maxTopics} topics relevant to the goal without any extra information or explanation.`  },
            { role: 'user', content: `Generate a learning roadmap for ${goal}.` },
        ],
        response_format: zodResponseFormat(TopicsSchema, "topics"), // Use zodResponseFormat
      temperature: 0.7, // Adjust for creativity
    });
    
    const parsed_response = JSON.parse(response.choices[0].message.content);
    (await cookies()).set('topics', JSON.stringify(parsed_response))
      //console.log("The response: " + JSON.stringify(response))
      return parsed_response;
  } catch (error) {
      console.error('Error sending ChatGPT request:', error);
      console.log("MyAPIKEY: " + config.OPENAI_API_KEY)
    throw error; // Re-throw the error to handle it in the frontend
  }
}

export async function generateRoadmap(preferences) { 
  const cookieStore = await cookies();
  const topics = cookieStore.get('topics').value.topics;
  const goal = cookieStore.get('goal').value;
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o', // Or a more suitable model // change to gpt-4o for pitch
          messages: [
          { role: 'system', content: `You are helping users build a learning roadmap. The user has already asked you what you want to learn, and you have asked the user for their background knowledge. Now, you will generate a roadmap, with the user's background knowledge in mind, meaning that you will not repeat topics in the roadmap that the user has said they already know. Consider the learning preferences very little, they shouldn't have too much impact on your roadmap, but they should be considered.`  },
              { role: 'user', content: `Generate a learning roadmap for ${goal}. I have already learned the following topics: ${topics}. There should be 10 nodes. My learning preferences on a scale of [1, 5] are as follows: ${JSON.stringify(preferences)}.` },
          ],
          response_format: zodResponseFormat(RoadmapSchema, "roadmap"), // Use zodResponseFormat
        temperature: 0.7, // Adjust for creativity
      });
      const parsed_response = JSON.parse(response.choices[0].message.content);
      cookieStore.set('roadmap', JSON.stringify(parsed_response))
    
     
  } catch (error) {
      console.error('Error sending ChatGPT request:', error);
      console.log("MyAPIKEY: " + config.OPENAI_API_KEY)
    throw error; // Re-throw the error to handle it in the frontend
  }
}

export async function generateNodeInfo(topic, description) { 
  const cookieStore = await cookies();
  const goal = cookieStore.get('goal')
  const goalData = JSON.parse(decodeURIComponent(goal.value))
  console.log("goal data: " + goal)

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or a more suitable model // change to gpt-4o for pitch
        messages: [
        { role: 'system', content: `You are helping users build a learning roadmap. You have already provided a roadmap to the user for the given goal: ${goalData}`  },
            { role: 'user', content: `Generate a learning roadmap for ${topic}, the description of the node you previously gave was ${description}. You should provide me a summary with some information about the given topic, an example usage that is in context of the given topic, and advice on what resources or avenues I should explore to learn more, this can be either online or other general resources depending on the topic at hand` },
        ],
        response_format: zodResponseFormat(NodeInfoSchema, "info"), // Use zodResponseFormat
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


export async function getGoal() { 
  const cookieStore = await cookies();
  const goal = cookieStore.get('goal')
  return JSON.parse(decodeURIComponent(goal.value));
}

export async function getTopics() {
  const cookieStore = await cookies();
  const topics = cookieStore.get('topics');
  return JSON.parse(decodeURIComponent(topics.value));;
}


export async function setTopics(topics) { 
  (await cookies()).set('topics', JSON.stringify(topics))
}


export async function getRoadmap() { 
  const cookieStore = await cookies();
  const roadmap = cookieStore.get('roadmap');
  return JSON.parse(decodeURIComponent(roadmap.value));

}