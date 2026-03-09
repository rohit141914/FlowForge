// transformNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Transform"
    color={NODE_COLORS.transform}
    inputs={[{ id: 'input', label: 'input' }]}
    outputs={[{ id: 'output', label: 'output' }]}
    fields={[
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        options: ['uppercase', 'lowercase', 'trim', 'reverse', 'stringify', 'parse JSON'],
      },
    ]}
  />
);
