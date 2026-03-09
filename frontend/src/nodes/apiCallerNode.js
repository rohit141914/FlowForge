// apiCallerNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const ApiCallerNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API Caller"
    color={NODE_COLORS.apiCaller}
    inputs={[{ id: 'body', label: 'body' }]}
    outputs={[{ id: 'response', label: 'response' }]}
    fields={[
      { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com/endpoint' },
      { key: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'] },
      { key: 'headers', label: 'Headers (JSON)', type: 'text', placeholder: '{"Authorization": "Bearer ..."}' },
    ]}
  />
);
