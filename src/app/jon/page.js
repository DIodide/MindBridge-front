"use client";

// VisGraph.js
import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

function removeNode(nodeId) {

}

const VisGraph = () => {
  const visJsRef = useRef(null);


  useEffect(() => {
    // Define the nodes and edges
    const nodesList = new DataSet([
      { id: 1, label: "Node 1"  },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3"},
      { id: 4, label: "Node 4"  },
      { id: 5, label: "Node 5" },
    ]);




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
        enabled: false,
      },
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

  return <div ref={visJsRef} style={{ height: "500px", width: "500px" }} />;
};

const Main = () => {
  return <VisGraph />;
};


export default Main;
