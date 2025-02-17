"use client";

import { color } from "framer-motion";
// VisGraph.js
import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";




const VisGraph = ( {onClickFunction, roadmap, nodesList, edgesList} ) => {

  const visJsRef = useRef(null);


  useEffect(() => {


    // Define the network options
    const options = {
      nodes: {
        color: {
          border: '#FFFFFF', // White border for better contrast
          background: '#551A8B', // A darker purple for a more modern look
          highlight: {
            border: '#FFFFFF',
            background: '#B93CF6', // A brighter purple on hover
          },
        },
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
        color: { 
          color: "#848484", 
          highlight: '#B93CF6', // Highlight with the brighter purple
        },
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
        // console.log("Node clicked: " + nodes[0]);
        // network.deleteSelected();
        // nodesList.remove(nodes[0]);
        // nodesList.updateOnly({id: nodes[0], label: "updated"});
        onClickFunction(nodes[0]);

      } else if (edges.length > 0) {
        // console.log("Edge clicked: " + edges[0]);
        // let newId = nodesList.max("id").id + 1;
        // console.log(newId);
        // nodesList.add({id: newId, label: 'Test'})
        // edgesList.add({id: newId, from: 1, to: newId})
      } else {
        console.log("Background clicked");
      }

    });

    // Clean up on unmount
    return () => {
      network.destroy();
    };
  }, []);

  return <div ref={visJsRef} style={{ height: "83vh", width: "60vw" }} />;
};

export default VisGraph