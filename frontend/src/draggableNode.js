// draggableNode.js

import { COLORS } from './styles';

export const DraggableNode = ({ type, label, color = COLORS.accent }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      style={{
        backgroundColor: `${color}11`,
        border: `1px solid ${color}55`,
        borderLeft: `3px solid ${color}`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${color}22`; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${color}11`; }}
      draggable
    >
      <span className="draggable-node-label" style={{ color }}>
        {label}
      </span>
    </div>
  );
};
