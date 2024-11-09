"use client";

// VisGraph.js
import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

function returnRoadmap() {
  return roadmap;
}

function markNodeAsSkipped(nodeId) {
  // Find the node with the given nodeId and update its skipped value to true
  const node = roadmap.nodes.find(node => node.id === nodeId);
  
  if (node) {
    node.skipped = true;  // Set skipped to true for the found node

    // Update the node in the vis.DataSet (assuming nodes is a vis.DataSet object)
    nodesList.update({
      id: nodeId,  // Ensure we're updating the correct node
      skipped: true,  // Set skipped to true
      color: 'red'  // Optionally, change the color to indicate the node is skipped
    });

    console.log(`Node ${nodeId} marked as skipped.`);
  } else {
    console.log(`Node with id ${nodeId} not found.`);
  }
}

const roadmap = {
  title: "Learning Roadmap",
  description: "A roadmap for learning topics to reach a specific goal.",
  nodes: [
    {
      topicName: "Introduction to Programming",
      shortDescription: "Basics of programming and algorithms.",
      id: 1,
      completed: false,
      skipped: false
    },
    {
      topicName: "JavaScript Fundamentals",
      shortDescription: "Introduction to JavaScript syntax and concepts.",
      id: 2,
      completed: true,
      skipped: false
    },
    {
      topicName: "React Basics",
      shortDescription: "Learn the basics of building user interfaces with React.",
      id: 3,
      completed: false,
      skipped: true
    },
    {
      topicName: "Data Structures",
      shortDescription: "Understanding essential data structures in programming.",
      id: 4,
      completed: false,
      skipped: false
    }
  ],
  edges: [
    {
      source: 1,
      target: 2
    },
    {
      source: 2,
      target: 3
    },
    {
      source: 3,
      target: 4
    }
  ]
};


const VisGraph = ( {onClickFunction} ) => {
  const visJsRef = useRef(null);


  useEffect(() => {
    // Define the nodes and edges
    // const nodesList = new DataSet(roadmap.nodes);

    const nodesList = new DataSet(
      roadmap.nodes.map(node => {
        let nodeColor;
    
        // Use if-else to determine the color based on the 'completed' and 'skipepd' status
        if (node.completed) {
          nodeColor = 'green';  // Node is completed
        } else if(node.skipped) {
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
      })
    );



    const edgesList = new DataSet([
      { from: 1, to: 2, length: 200},
      { from: 1, to: 3, length: 200 },
      { from: 2, to: 4, length: 200 },
      { from: 2, to: 5, length: 200 },
    ]);

    // Define the network options
    const options = {
      nodes: {
        shape: "box",  // Use a box shape for the node to make it better for text fitting
        font: { 
          color: "#ffffff", 
          size: 14,          // Font size for the label
          multi: "html",     // Allow for multi-line labels if needed
        },
        widthConstraint: {
          minimum: 100,     // Minimum width of the node
        },
        heightConstraint: {
          minimum: 40,      // Minimum height of the node
        },
        margin: 10,         // Margin around the label text to avoid clipping
        size: 20,           // Base size of the node (this can be adjusted)
      },
      edges: {
        color: { color: "#848484" },
        width: 3, // Edge thickness
        font: { color: "#343434", size: 12, align: "horizontal" },
        smooth: {
          enabled: true, // Enables smooth edges
          type: "continuous", // You can use "dynamic" or "discrete" for different effects
          roundness: 0.5, // Adjust the roundness of the smooth edges
        },
        arrows: {
          to: { enabled: true, scaleFactor: 0.5 }, // Arrow at the target node (to)
        },
      },
      physics: {
        barnesHut: {
          centralGravity: 0.3, // Moderate central gravity for better stability
          springLength: 200,   // Increase to give more space between nodes
          springConstant: 0.04, // Adjust for balanced attraction between nodes
          damping: 0.1,         // Increase damping for smoother motion (reduce wobble)
          avoidOverlap: 1.5     // Higher value for stronger overlap avoidance
        },
        stabilization: {
          enabled: true,       // Enable stabilization
          iterations: 2000,    // Increase iterations for more stable positioning
          updateInterval: 25   // Reduce update interval to slow down stabilization
        }
      }
    };

    const data = {
      nodes: nodesList,
      edges: edgesList,
    };

    // Initialize the network
    const network = new Network(visJsRef.current, data, options);


    // Register the click event listener
    network.on("click", function (event) {
      const { nodes, edges } = event;

      console.log(event)


      if (nodes.length > 0) {
        console.log("Node clicked: " + nodes[0]);
        // network.deleteSelected();
        // nodesList.remove(nodes[0]);
        nodesList.updateOnly({id: nodes[0], label: "updated"});
        onClickFunction(nodes[0]);

      } else if (edges.length > 0) {
        console.log("Edge clicked: " + edges[0]);
        let newId = nodesList.max("id").id + 1;
        console.log(newId);
        nodesList.add({id: newId, label: 'Test'})
        edgesList.add({id: newId, from: 1, to: newId})
      } else {
        console.log("Background clicked");
      }

    });

    // Clean up on unmount
    return () => {
      network.destroy();
    };
  }, []);

  return <div ref={visJsRef} style={{ height: "500px", width: "1000px" }} />;
};

export default VisGraph