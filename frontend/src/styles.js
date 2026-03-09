// styles.js — shared design tokens

export const COLORS = {
  bg: '#0f1117',
  surface: '#1a2235',
  surfaceHover: '#1e293b',
  border: '#2d3a4f',
  borderLight: '#3d4f6b',
  text: '#e2e8f0',
  textMuted: '#8899aa',
  accent: '#4f8ef7',
  accentHover: '#3b7de8',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  handleBg: '#4f8ef7',
};

// Per-node-type accent colors
export const NODE_COLORS = {
  customInput:  '#4f8ef7', // blue
  customOutput: '#22c55e', // green
  llm:          '#a855f7', // purple
  text:         '#f59e0b', // amber
  apiCaller:    '#06b6d4', // cyan
  fileReader:   '#84cc16', // lime
  transform:    '#f97316', // orange
  math:         '#ec4899', // pink
  conditional:  '#14b8a6', // teal
};

export const NODE_STYLE = {
  card: {
    background: '#1a2235',
    border: '1px solid #2d3a4f',
    borderRadius: '10px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    minWidth: '220px',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '13px',
    color: '#e2e8f0',
    overflow: 'visible',
  },
  header: {
    padding: '8px 12px',
    borderRadius: '10px 10px 0 0',
    fontWeight: 600,
    fontSize: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  body: {
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  label: {
    fontSize: '11px',
    color: '#8899aa',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  input: {
    background: '#0f1117',
    border: '1px solid #2d3a4f',
    borderRadius: '6px',
    color: '#e2e8f0',
    padding: '5px 8px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  select: {
    background: '#0f1117',
    border: '1px solid #2d3a4f',
    borderRadius: '6px',
    color: '#e2e8f0',
    padding: '5px 8px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  handleLabel: {
    position: 'absolute',
    fontSize: '10px',
    color: '#8899aa',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  },
};
