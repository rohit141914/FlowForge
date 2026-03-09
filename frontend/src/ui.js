// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ApiCallerNode } from './nodes/apiCallerNode';
import { FileReaderNode } from './nodes/fileReaderNode';
import { TransformNode } from './nodes/transformNode';
import { MathNode } from './nodes/mathNode';
import { ConditionalNode } from './nodes/conditionalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  apiCaller: ApiCallerNode,
  fileReader: FileReaderNode,
  transform: TransformNode,
  math: MathNode,
  conditional: ConditionalNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      return { id: nodeID, nodeType: `${type}` };
    };

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;

            if (typeof type === 'undefined' || !type) {
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ flex: 1, width: '100vw' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                style={{ background: '#0f1117' }}
            >
                <Background color="#2d3a4f" gap={gridSize} variant="dots" />
                <Controls />
                <MiniMap
                  nodeColor={(node) => {
                    const colors = {
                      customInput: '#4f8ef7',
                      llm: '#a855f7',
                      customOutput: '#22c55e',
                      text: '#f59e0b',
                      apiCaller: '#06b6d4',
                      fileReader: '#84cc16',
                      transform: '#f97316',
                      math: '#ec4899',
                      conditional: '#14b8a6',
                    };
                    return colors[node.type] || '#4f8ef7';
                  }}
                  style={{ background: '#1a2235' }}
                  maskColor="rgba(15,17,23,0.7)"
                />
            </ReactFlow>
        </div>
    );
};
