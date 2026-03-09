// inputNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const InputNode = ({ id, data, selected }) => (
  <BaseNode
    id={id}
    data={{ inputName: data?.inputName || id.replace('customInput-', 'input_'), inputType: data?.inputType || 'Text', ...data }}
    selected={selected}
    title="Input"
    color={NODE_COLORS.customInput}
    outputs={[{ id: 'value', label: 'value' }]}
    fields={[
      { key: 'inputName', label: 'Name', type: 'text', placeholder: 'input_1' },
      { key: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'] },
    ]}
  />
);
