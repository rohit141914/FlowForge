// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { COLORS } from './styles';
import { parsePipeline } from './api';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

// ── Result Modal ─────────────────────────────────────────────────────────────
const ResultModal = ({ result, error, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      {error ? (
        <>
          <div className="modal-title-row modal-title-row--error">
            <span className="modal-icon">⚠️</span>
            <h2 className="modal-title modal-title--error">Error</h2>
          </div>
          <p className="modal-error-msg">{error}</p>
          <p className="modal-error-hint">
            Make sure the backend is running:<br />
            uvicorn main:app --reload
          </p>
        </>
      ) : (
        <>
          <div className="modal-title-row">
            <span className="modal-icon">🔍</span>
            <h2 className="modal-title">Pipeline Analysis</h2>
          </div>

          <div className="modal-stats-grid">
            <StatCard label="Nodes" value={result.num_nodes} color="#4f8ef7" />
            <StatCard label="Edges" value={result.num_edges} color="#a855f7" />
          </div>

          <div
            className="modal-dag-row"
            style={{
              background: result.is_dag ? '#14532d33' : '#7f1d1d33',
              border: `1px solid ${result.is_dag ? '#22c55e44' : '#ef444444'}`,
            }}
          >
            <span className="modal-dag-label">Valid DAG</span>
            <span className="modal-dag-value" style={{ color: result.is_dag ? '#22c55e' : '#ef4444' }}>
              {result.is_dag ? 'Yes ✓' : 'No ✗'}
            </span>
          </div>

          {!result.is_dag && (
            <p className="modal-cycle-warning">
              The pipeline contains a cycle. DAG pipelines must have no circular dependencies.
            </p>
          )}
        </>
      )}

      <button className="modal-close-btn" onClick={onClose}>Close</button>
    </div>
  </div>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color }) => (
  <div
    className="stat-card"
    style={{ background: `${color}11`, border: `1px solid ${color}33` }}
  >
    <div className="stat-card-label">{label}</div>
    <div className="stat-card-value" style={{ color }}>{value}</div>
  </div>
);

// ── Submit button ─────────────────────────────────────────────────────────────
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await parsePipeline(nodes, edges);
      setModal({ result: data });
    } catch (err) {
      const message = err.response
        ? `Server error: ${err.response.status}`
        : err.message;
      setModal({ error: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modal && (
        <ResultModal
          result={modal.result}
          error={modal.error}
          onClose={() => setModal(null)}
        />
      )}

      <div className="submit-bar">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? COLORS.border : COLORS.accent,
            boxShadow: loading ? 'none' : `0 2px 12px ${COLORS.accent}55`,
          }}
        >
          {loading ? 'Analyzing...' : 'Submit Pipeline'}
        </button>
      </div>
    </>
  );
};
