// outputNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={{ outputName: data?.outputName || id.replace('customOutput-', 'output_'), outputType: data?.outputType || 'Text', ...data }}
    title="Output"
    color={NODE_COLORS.customOutput}
    inputs={[{ id: 'value', label: 'value' }]}
    fields={[
      { key: 'outputName', label: 'Name', type: 'text', placeholder: 'output_1' },
      { key: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'] },
    ]}
  />
);
