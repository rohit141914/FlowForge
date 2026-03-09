// llmNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="LLM"
    color={NODE_COLORS.llm}
    inputs={[
      { id: 'system', label: 'system' },
      { id: 'prompt', label: 'prompt' },
    ]}
    outputs={[{ id: 'response', label: 'response' }]}
    fields={[
      { key: 'model', label: 'Model', type: 'select', options: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo', 'claude-3-5-sonnet'] },
    ]}
  />
);
