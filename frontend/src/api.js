// api.js — backend API client

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Send pipeline nodes and edges to the backend for analysis.
 * @param {Array} nodes - ReactFlow nodes array
 * @param {Array} edges - ReactFlow edges array
 * @returns {Promise<{ num_nodes: number, num_edges: number, is_dag: boolean }>}
 */
export const parsePipeline = async (nodes, edges) => {
  const { data } = await apiClient.post('/pipelines/parse', { nodes, edges });
  return data;
};

export const pingBackend = () => apiClient.get('/');
