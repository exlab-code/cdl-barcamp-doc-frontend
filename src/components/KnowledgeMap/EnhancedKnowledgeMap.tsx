import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { simplifiedNodesData, simplifiedLinksData, simplifiedFilterOptions } from '../../data/simplifiedGraphData';
import { Node, Edge } from './types';
import CircularForceGraph from './CircularForceGraph';

const EnhancedKnowledgeMap: React.FC = () => {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState(new Set(['all']));
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<Edge | null>(null);

  const handleFilterChange = (filterId: string) => {
    const newFilters = new Set(selectedFilters);
    if (filterId === 'all') {
      newFilters.clear();
      newFilters.add('all');
    } else {
      if (newFilters.has('all')) newFilters.delete('all');
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
      } else {
        newFilters.add(filterId);
      }
      if (newFilters.size === 0) newFilters.add('all');
    }
    setSelectedFilters(newFilters);
  };

  const handleSessionNavigate = (sessionSlug: string) => {
    // Find the session node to get the document path
    const sessionNode = simplifiedNodesData.find(node => 
      node.type === 'session' && node.slug === sessionSlug
    );
    
    if (sessionNode?.metadata?.documentPath) {
      history.push(sessionNode.metadata.documentPath);
    }
  };

  const handleNodeSelect = (node: Node | null) => {
    setSelectedNode(node);
  };

  return (
    <div className="w-full max-w-none mx-auto p-8 bg-white rounded-xl shadow-xl shadow-slate-200/50 knowledge-map h-screen flex flex-col">
      <div className="mb-6 flex-shrink-0">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3">
            {simplifiedFilterOptions.map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 ${
                  selectedFilters.has(filter.id)
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
        </div>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* Knowledge Map - 2/3 width */}
        <div className="w-2/3">
          <CircularForceGraph
            nodes={simplifiedNodesData}
            edges={simplifiedLinksData}
            selectedFilters={selectedFilters}
            onNodeSelect={(node) => {
              if (node) {
                setSelectedNode(node);
                setHoveredNode(node);
              } else {
                setHoveredNode(null);
              }
            }}
          />
        </div>

        {/* Info Panel - Always visible, fixed width to prevent layout shifts */}
        <div className="w-1/3 min-w-[320px] max-w-[400px] p-6 bg-slate-50 rounded-xl overflow-y-auto space-y-6" style={{ width: '33.333%' }}>
            {/* Show hovered edge information */}
            {hoveredEdge && (
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  Verbindung
                </h3>
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    hoveredEdge.type === 'affects' ? 'bg-red-100 text-red-700' :
                    hoveredEdge.type === 'challenges' ? 'bg-red-100 text-red-700' :
                    hoveredEdge.type === 'core-theme' ? 'bg-purple-100 text-purple-700' :
                    hoveredEdge.type === 'vision' ? 'bg-green-100 text-green-700' :
                    hoveredEdge.type === 'symptom' ? 'bg-orange-100 text-orange-700' :
                    hoveredEdge.type === 'explores' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {hoveredEdge.type}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Verbindungstyp:</h4>
                  <p className="text-sm text-gray-600">{hoveredEdge.type}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Stärke:</h4>
                  <p className="text-sm text-gray-600">{hoveredEdge.strength.toFixed(1)}</p>
                </div>
                
                {hoveredEdge.evidence && hoveredEdge.evidence.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Belege:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {hoveredEdge.evidence.map((evidence, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {evidence}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Show hovered node information (priority over selected) */}
            {hoveredNode && !hoveredEdge && (
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {hoveredNode.label}
                </h3>
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    hoveredNode.type === 'session' ? 'bg-gray-700 text-white' :
                    hoveredNode.type === 'cross-concept' ? 'bg-purple-100 text-purple-700' :
                    hoveredNode.type === 'cross-challenge' ? 'bg-red-100 text-red-700' :
                    hoveredNode.type === 'concept' ? 'bg-blue-100 text-blue-700' :
                    hoveredNode.type === 'challenge' ? 'bg-red-100 text-red-700' :
                    hoveredNode.type === 'solution' ? 'bg-green-100 text-green-700' :
                    hoveredNode.type === 'example' ? 'bg-yellow-100 text-yellow-700' :
                    hoveredNode.type === 'tool' ? 'bg-indigo-100 text-indigo-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {hoveredNode.type}
                  </span>
                </div>
                
                {hoveredNode.metadata?.description && (
                  <p className="text-sm text-gray-600 mb-4 italic leading-relaxed">
                    {hoveredNode.metadata.description}
                  </p>
                )}
                
                {hoveredNode.metadata?.keyPoints && hoveredNode.metadata.keyPoints.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Schlüsselpunkte:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {hoveredNode.metadata.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="text-xs space-y-1 text-gray-500">
                  <div><strong>Typ:</strong> {hoveredNode.type}</div>
                  {hoveredNode.cluster && (
                    <div><strong>Cluster:</strong> {hoveredNode.cluster}</div>
                  )}
                  {hoveredNode.weight && (
                    <div><strong>Gewichtung:</strong> {hoveredNode.weight}</div>
                  )}
                  {hoveredNode.type === 'session' && hoveredNode.metadata?.documentPath && (
                    <div className="mt-4">
                      <button 
                        onClick={() => handleSessionNavigate(hoveredNode.slug)}
                        className="w-full bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
                      >
                        📖 Vollständige Dokumentation lesen
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Show selected node information (fallback when nothing is hovered) */}
            {selectedNode && !hoveredNode && !hoveredEdge && (
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {selectedNode.label}
                </h3>
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selectedNode.type === 'session' ? 'bg-gray-700 text-white' :
                    selectedNode.type === 'cross-concept' ? 'bg-purple-100 text-purple-700' :
                    selectedNode.type === 'cross-challenge' ? 'bg-red-100 text-red-700' :
                    selectedNode.type === 'concept' ? 'bg-blue-100 text-blue-700' :
                    selectedNode.type === 'challenge' ? 'bg-red-100 text-red-700' :
                    selectedNode.type === 'solution' ? 'bg-green-100 text-green-700' :
                    selectedNode.type === 'example' ? 'bg-yellow-100 text-yellow-700' :
                    selectedNode.type === 'tool' ? 'bg-indigo-100 text-indigo-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedNode.type}
                  </span>
                </div>
                
                {selectedNode.metadata?.description && (
                  <p className="text-sm text-gray-600 mb-4 italic leading-relaxed">
                    {selectedNode.metadata.description}
                  </p>
                )}
                
                {selectedNode.metadata?.keyPoints && selectedNode.metadata.keyPoints.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Schlüsselpunkte:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {selectedNode.metadata.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="text-xs space-y-1 text-gray-500">
                  <div><strong>Typ:</strong> {selectedNode.type}</div>
                  {selectedNode.cluster && (
                    <div><strong>Cluster:</strong> {selectedNode.cluster}</div>
                  )}
                  {selectedNode.weight && (
                    <div><strong>Gewichtung:</strong> {selectedNode.weight}</div>
                  )}
                  {selectedNode.type === 'session' && selectedNode.metadata?.documentPath && (
                    <div className="mt-4">
                      <button 
                        onClick={() => handleSessionNavigate(selectedNode.slug)}
                        className="w-full bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
                      >
                        📖 Vollständige Dokumentation lesen
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Default content when nothing is hovered or selected */}
            {!hoveredNode && !hoveredEdge && !selectedNode && (
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                  CDL Barcamp Wissenskarte
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Bewegen Sie die Maus über Sessions (dunkle Kreise) oder übergreifende Themen (farbige Kreise) um Details zu sehen.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Sessions:</h4>
                    <p className="text-xs text-gray-600">14 Barcamp-Sessions im äußeren Kreis</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Übergreifende Themen:</h4>
                    <p className="text-xs text-gray-600">6 zentrale Themen und Herausforderungen</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Verbindungen:</h4>
                    <p className="text-xs text-gray-600">Farbkodierte Linien zeigen thematische Beziehungen</p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedKnowledgeMap;
