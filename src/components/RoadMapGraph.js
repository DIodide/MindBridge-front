// components/RoadmapGraph.js
'use client';

import React from 'react';
import { SigmaContainer, useSigma } from 'react-sigma';
import { MultiGraph } from 'graphology';

export default function RoadmapGraph({ roadmap }) {
  const sigma = useSigma();

  React.useEffect(() => {
    // Clear any existing graph data before adding new nodes and edges
    sigma.getGraph().clear();

    // Add nodes to the graph
    roadmap.nodes.forEach((node) => {
      sigma.getGraph().addNode(node.id, {
        label: node.label,
        size: node.size || 10, // Default size if not provided
      });
    });

    // Add edges to the graph
    roadmap.edges.forEach((edge) => {
      sigma.getGraph().addEdge(edge.source, edge.target);
    });

    // Refresh the graph layout
    sigma.refresh();
  }, [roadmap, sigma]);

  return <SigmaContainer style={{ width: '100%', height: '500px' }} />;
}