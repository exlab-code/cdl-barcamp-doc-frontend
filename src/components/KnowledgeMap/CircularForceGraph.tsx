import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { Node, Edge } from './types';

interface CircularForceGraphProps {
  nodes: Node[];
  edges: Edge[];
  selectedFilters: Set<string>;
  onNodeSelect: (node: Node | null) => void;
}

const CircularForceGraph: React.FC<CircularForceGraphProps> = React.memo(({
  nodes,
  edges,
  selectedFilters,
  onNodeSelect
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<any>(null);

  // Filter nodes based on selected filters
  const shouldShowNode = useCallback((node: Node): boolean => {
    if (selectedFilters.has('all')) return true;
    
    // Show if node ID is in filters
    if (selectedFilters.has(node.id)) return true;
    
    // Show cross-cutting themes if 'cross' filter is selected
    if (selectedFilters.has('cross') && (node.type === 'cross-concept' || node.type === 'cross-challenge')) return true;
    
    // Show challenges if 'challenges' filter is selected
    if (selectedFilters.has('challenges') && (node.type === 'challenge' || node.type === 'cross-challenge')) return true;
    
    // Show solutions if 'solutions' filter is selected
    if (selectedFilters.has('solutions') && node.type === 'solution') return true;
    
    return false;
  }, [selectedFilters]);

  // Memoize filtered data
  const { visibleNodes, visibleLinks } = React.useMemo(() => {
    const filteredNodes = nodes.filter(shouldShowNode);
    const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
    
    // Handle both string IDs and D3 node objects for source/target
    const filteredLinks = edges.filter(l => {
      const sourceId = typeof l.source === 'string' ? l.source : (l.source as any)?.id;
      const targetId = typeof l.target === 'string' ? l.target : (l.target as any)?.id;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });
    
    
    return {
      visibleNodes: filteredNodes,
      visibleLinks: filteredLinks
    };
  }, [nodes, edges, shouldShowNode]);

  // Color functions
  const getNodeColor = useCallback((node: Node): string => {
    switch (node.type) {
      case 'session': return '#1f2937'; // Dark gray for sessions
      case 'cross-concept': return '#8b5cf6'; // Purple for cross-cutting concepts
      case 'cross-challenge': return '#ef4444'; // Red for cross-cutting challenges
      default: return '#6b7280'; // Gray for others
    }
  }, []);

  const getEdgeColor = useCallback((edge: Edge): string => {
    switch (edge.type) {
      case 'affects': return '#ef4444'; // Red
      case 'challenges': return '#dc2626'; // Dark red
      case 'core-theme': return '#8b5cf6'; // Purple
      case 'vision': return '#10b981'; // Green
      case 'symptom': return '#f97316'; // Orange
      case 'explores': return '#059669'; // Dark green
      default: return '#9ca3af'; // Gray
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current || visibleNodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1800;
    const height = 1200;
    const centerX = width / 2;
    const centerY = height / 2;

    // Set up zoom
    const g = svg.append('g');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    // Calculate circular positions
    const sessionNodes = visibleNodes.filter(n => n.type === 'session');
    const centralNodes = visibleNodes.filter(n => n.type === 'cross-concept' || n.type === 'cross-challenge');
    
    // Position sessions in outer circle - initial positions only
    const sessionRadius = 280;
    sessionNodes.forEach((node, i) => {
      const angle = (i * 2 * Math.PI) / sessionNodes.length;
      (node as any).x = centerX + sessionRadius * Math.cos(angle);
      (node as any).y = centerY + sessionRadius * Math.sin(angle);
      // Don't fix positions - let them be interactive
    });

    // Position central themes in inner circle - initial positions only
    const centralRadius = 80;
    centralNodes.forEach((node, i) => {
      const angle = (i * 2 * Math.PI) / centralNodes.length;
      (node as any).x = centerX + centralRadius * Math.cos(angle);
      (node as any).y = centerY + centralRadius * Math.sin(angle);
      // Don't fix positions - let them be interactive
    });

    // Claude's continuous simulation approach
    const simulation = d3.forceSimulation(visibleNodes as any)
      .force('link', d3.forceLink(visibleLinks as any)
        .id((d: any) => d.id)
        .distance((d: any) => {
          if (d.type === 'primary') return 60;
          if (['affects', 'challenges', 'core-theme', 'vision'].includes(d.type)) return 200;
          return 100;
        }))
      .force('charge', d3.forceManyBody()
        .strength((d: any) => {
          if (d.type === 'session') return -2000;
          if (d.type === 'cross-concept' || d.type === 'cross-challenge') return -800;
          return -600;
        }))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collision', d3.forceCollide()
        .radius((d: any) => {
          if (d.type === 'session') return Math.max(25, Math.min(40, Math.sqrt(d.weight || 1) * 8)) + 20;
          return 20 + 20;
        }))
      .force('cluster', () => {
        // 14 Sessions in circular arrangement + center
        const clusters: { [key: string]: { x: number; y: number } } = {
          'session-medizin': { x: centerX + sessionRadius * Math.cos(0 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(0 * Math.PI / 7) },
          'session-lokale-llms': { x: centerX + sessionRadius * Math.cos(2 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(2 * Math.PI / 7) },
          'session-eu-ai-act': { x: centerX + sessionRadius * Math.cos(4 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(4 * Math.PI / 7) },
          'session-ground-truth': { x: centerX + sessionRadius * Math.cos(6 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(6 * Math.PI / 7) },
          'session-communities': { x: centerX + sessionRadius * Math.cos(8 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(8 * Math.PI / 7) },
          'session-second-brain': { x: centerX + sessionRadius * Math.cos(10 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(10 * Math.PI / 7) },
          'session-ki-salami': { x: centerX + sessionRadius * Math.cos(12 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(12 * Math.PI / 7) },
          'session-nachhaltigkeitsdaten': { x: centerX + sessionRadius * Math.cos(1 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(1 * Math.PI / 7) },
          'session-datenprojekt': { x: centerX + sessionRadius * Math.cos(3 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(3 * Math.PI / 7) },
          'session-globale-uebersichten': { x: centerX + sessionRadius * Math.cos(5 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(5 * Math.PI / 7) },
          'session-data-governance': { x: centerX + sessionRadius * Math.cos(7 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(7 * Math.PI / 7) },
          'session-staat-zivilgesellschaft': { x: centerX + sessionRadius * Math.cos(9 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(9 * Math.PI / 7) },
          'session-interne-governance': { x: centerX + sessionRadius * Math.cos(11 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(11 * Math.PI / 7) },
          'session-ml-fundraising': { x: centerX + sessionRadius * Math.cos(13 * Math.PI / 7), y: centerY + sessionRadius * Math.sin(13 * Math.PI / 7) },
          'center': { x: centerX, y: centerY }
        };
        
        visibleNodes.forEach((node: any) => {
          const cluster = clusters[node.id] || clusters['center'];
          if (cluster) {
            const dx = cluster.x - node.x;
            const dy = cluster.y - node.y;
            const strength = 0.05;
            node.vx = (node.vx || 0) + dx * strength;
            node.vy = (node.vy || 0) + dy * strength;
          }
        });
      });

    simulationRef.current = simulation;

    // Create links
    const links = g.append('g')
      .selectAll('line')
      .data(visibleLinks)
      .enter().append('line')
      .attr('stroke', getEdgeColor)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => {
        if (['affects', 'challenges', 'core-theme'].includes(d.type)) return 2.5;
        return 1.5;
      })
      .style('cursor', 'pointer');

    // Create node groups
    const nodeGroups = g.append('g')
      .selectAll('g')
      .data(visibleNodes)
      .enter().append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles
    nodeGroups.append('circle')
      .attr('r', d => {
        if (d.type === 'session') return Math.max(25, Math.min(40, Math.sqrt(d.weight || 1) * 8));
        return 20;
      })
      .attr('fill', getNodeColor)
      .attr('stroke', '#fff')
      .attr('stroke-width', d => d.type === 'session' ? 3 : 2)
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeSelect(d);
      })
      .on('mouseover', (event, d) => {
        onNodeSelect(d);

        // Highlight connected elements
        const connectedNodeIds = new Set<string>();
        visibleLinks.forEach(link => {
          if (link.source === d.id || (typeof link.source === 'object' && (link.source as any).id === d.id)) {
            const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;
            connectedNodeIds.add(targetId);
          }
          if (link.target === d.id || (typeof link.target === 'object' && (link.target as any).id === d.id)) {
            const sourceId = typeof link.source === 'object' ? (link.source as any).id : link.source;
            connectedNodeIds.add(sourceId);
          }
        });

        // Fade non-connected elements
        nodeGroups.style('opacity', n => n.id === d.id || connectedNodeIds.has(n.id) ? 1 : 0.3);
        links.style('opacity', l => {
          const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          return sourceId === d.id || targetId === d.id ? 1 : 0.1;
        });
      })
      .on('mouseout', () => {
        nodeGroups.style('opacity', 1);
        links.style('opacity', 0.6);
      });

    // Add labels
    nodeGroups.append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', d => {
        const radius = d.type === 'session' ? Math.max(25, Math.min(40, Math.sqrt(d.weight || 1) * 8)) : 20;
        return radius + 15;
      })
      .attr('font-size', d => d.type === 'session' ? '11px' : '9px')
      .attr('font-weight', d => d.type === 'session' ? 'bold' : 'normal')
      .attr('fill', '#374151')
      .style('pointer-events', 'none')
      .each(function(d) {
        // Wrap long text
        const text = d3.select(this);
        const words = d.label.split(/\s+/);
        if (words.length > 2) {
          text.text('');
          const tspan1 = text.append('tspan').text(words.slice(0, 2).join(' '));
          if (words.length > 2) {
            text.append('tspan')
              .attr('x', 0)
              .attr('dy', '1.2em')
              .text(words.slice(2).join(' '));
          }
        }
      });

    // Update positions on tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      nodeGroups
        .attr('transform', d => `translate(${(d as any).x},${(d as any).y})`);
    });

    // Cleanup
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [selectedFilters]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1800 1200"
        className="border border-slate-200 rounded-xl bg-white shadow-sm"
      />
    </div>
  );
});

CircularForceGraph.displayName = 'CircularForceGraph';

export default CircularForceGraph;
