// textNode.js — Part 3: auto-resize + {{variable}} dynamic handles

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { NODE_COLORS } from '../styles';
import './nodes.css';

// Extract unique valid JS variable names from {{varName}} patterns
const extractVariables = (text) => {
  const matches = [...text.matchAll(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g)];
  return [...new Set(matches.map((m) => m[1]))];
};

// Calculate the longest line width (in characters) for horizontal sizing
const longestLineLength = (text) => {
  const lines = text.split('\n');
  return Math.max(...lines.map((l) => l.length), 0);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Auto-resize textarea height as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    updateNodeField(id, 'text', val);
  };

  // Dynamic width — must stay inline
  const nodeWidth = Math.max(220, longestLineLength(currText) * 8 + 48);

  // Evenly space variable handles — top must stay inline (computed)
  const handleTop = (index) => {
    if (variables.length === 1) return '50%';
    const step = 100 / (variables.length + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div className="node-card" style={{ width: nodeWidth }}>
      {/* Dynamic variable input handles */}
      {variables.map((varName, i) => (
        <div
          key={varName}
          className="node-handle-wrapper node-handle-wrapper--left"
          style={{ top: handleTop(i) }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            className="node-handle-dot"
            style={{ background: NODE_COLORS.text }}
          />
          <span className="node-handle-label node-handle-label--left">
            {varName}
          </span>
        </div>
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle-dot"
        style={{ background: NODE_COLORS.text, top: '50%' }}
      />

      {/* Header */}
      <div className="node-header" style={{ background: NODE_COLORS.text }}>
        <span>Text</span>
      </div>

      {/* Body */}
      <div className="node-body">
        <div className="node-field">
          <label className="node-field-label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleChange}
            rows={3}
            placeholder="Type text. Use {{variableName}} to create input handles."
          />
        </div>
        {variables.length > 0 && (
          <div className="text-node-vars-row">
            Variables:{' '}
            {variables.map((v) => (
              <span
                key={v}
                className="text-node-var-badge"
                style={{ border: `1px solid ${NODE_COLORS.text}44`, color: NODE_COLORS.text }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
