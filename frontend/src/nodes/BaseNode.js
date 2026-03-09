// BaseNode.js — shared abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './nodes.css';

/**
 * BaseNode — generic node card.
 *
 * Props:
 *  id        – ReactFlow node id
 *  data      – ReactFlow node data (initial field values)
 *  title     – display name shown in header
 *  color     – hex accent color for the header strip
 *  inputs    – array of { id, label? } — rendered as target handles on the left
 *  outputs   – array of { id, label? } — rendered as source handles on the right
 *  fields    – array of field descriptors:
 *                { key, label, type: 'text'|'select'|'textarea', options?, placeholder?, rows? }
 *  children  – optional custom body content rendered below fields
 *  style     – extra inline styles merged onto the card (for dynamic overrides)
 */
export const BaseNode = ({
  id,
  data,
  title,
  color = '#4f8ef7',
  inputs = [],
  outputs = [],
  fields = [],
  children,
  style = {},
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (key, value) => {
    updateNodeField(id, key, value);
  };

  // top % must stay inline — computed from handle count
  const inputTop = (index) => {
    if (inputs.length === 1) return '50%';
    const step = 100 / (inputs.length + 1);
    return `${step * (index + 1)}%`;
  };

  const outputTop = (index) => {
    if (outputs.length === 1) return '50%';
    const step = 100 / (outputs.length + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div className="node-card" style={style}>
      {/* Input handles */}
      {inputs.map((handle, i) => (
        <div
          key={handle.id}
          className="node-handle-wrapper node-handle-wrapper--left"
          style={{ top: inputTop(i) }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            className="node-handle-dot"
            style={{ background: color }}
          />
          {handle.label && (
            <span className="node-handle-label node-handle-label--left">
              {handle.label}
            </span>
          )}
        </div>
      ))}

      {/* Output handles */}
      {outputs.map((handle, i) => (
        <div
          key={handle.id}
          className="node-handle-wrapper node-handle-wrapper--right"
          style={{ top: outputTop(i) }}
        >
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            className="node-handle-dot"
            style={{ background: color }}
          />
          {handle.label && (
            <span className="node-handle-label node-handle-label--right">
              {handle.label}
            </span>
          )}
        </div>
      ))}

      {/* Header — background is dynamic per node color */}
      <div className="node-header" style={{ background: color }}>
        <span>{title}</span>
      </div>

      {/* Body */}
      <div className="node-body">
        {fields.map((field) => (
          <div key={field.key} className="node-field">
            <label className="node-field-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                className="node-select"
                value={data?.[field.key] ?? field.options?.[0] ?? ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                className="node-textarea"
                rows={field.rows || 3}
                placeholder={field.placeholder || ''}
                value={data?.[field.key] ?? ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="node-input"
                placeholder={field.placeholder || ''}
                value={data?.[field.key] ?? ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};
