import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Initialize the OpenAI client
const openai = new OpenAI();

// Define the Node and Edge schemas with zod
const Node = z.object({
  id: z.string(),             // Unique identifier for each node
  label: z.string(),          // Label or name of the node
  size: z.number().optional(), // Optional size property for visualization
});

const Edge = z.object({
  source: z.string(),         // ID of the source node
  target: z.string(),         // ID of the target node
});

// Define the Roadmap schema to include nodes and edges arrays
const RoadmapSchema = z.object({
  nodes: z.array(Node),       // Array of Node objects
  edges: z.array(Edge),       // Array of Edge objects representing relationships
});

async function generateRoadmap(knowledge, goals) {
  // Request roadmap generation with structured output using zod validation
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4-0613",
    messages: [
      { role: "system", content: "Generate a learning roadmap with nodes and edges connecting concepts based on dependencies. Return data in JSON format with 'nodes' and 'edges' arrays." },
      { role: "user", content: `I know ${knowledge} and want to learn ${goals}.` },
    ],
    response_format: zodResponseFormat(RoadmapSchema, "roadmap"),
  });

  // Extract the structured roadmap data from the response
  const roadmap = completion.choices[0].message.parsed;

  return roadmap;
}

// Example usage:
const knowledge = "basic programming";
const goals = "web development with React";

generateRoadmap(knowledge, goals).then((roadmap) => {
  console.log("Generated Roadmap:", roadmap);
  /*
  Expected output structure:
  {
    nodes: [
      { id: "1", label: "JavaScript Basics" },
      { id: "2", label: "HTML & CSS" },
      { id: "3", label: "React Basics" }
    ],
    edges: [
      { source: "1", target: "2" },
      { source: "2", target: "3" }
    ]
  }
  */
});