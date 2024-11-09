"use client";

import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
// Component that loads the graph
export const LoadGraph = () => {
  const loadGraph = useLoadGraph(); // Hook to load the graph into the Sigma container

  useEffect(() => {
    // Create a new graph instance
    const graph = new Graph();

    // Add nodes to the graph
    graph.addNode("node1", { x: 0, y: 0, size: 15, label: "Node 1", color: "#FA4F40" });
    graph.addNode("node2", { x: 1, y: 1, size: 15, label: "Node 2", color: "#40FA4F" });
    graph.addNode("node3", { x: 1, y: 0, size: 15, label: "Node 3", color: "#40FA4F" });


    // Add edges between the nodes
    graph.addEdge("node1", "node2", { size: 5, color: "#4F40FA" }); // Edge from node1 to node2
    graph.addEdge("node2", "node1", { size: 5, color: "#4F40FA" }); // Edge from node2 to node1 
    graph.addEdge("node1", "node3", { size: 5, color: "#4F40FA" }); // Edge from node1 to node2


    // Load the graph into Sigma
    loadGraph(graph);
  }, [loadGraph]);

  return null; // This component doesn't render anything itself
};

const sigmaStyle = { height: "100vh", width: "100vh" };

// Component that display the graph
export const DisplayGraph = () => {
  return (
    <SigmaContainer className style={sigmaStyle}>
      <LoadGraph />
    </SigmaContainer>
  );
};


export default function Home() {
  return (
    <DisplayGraph></DisplayGraph>
  );
}