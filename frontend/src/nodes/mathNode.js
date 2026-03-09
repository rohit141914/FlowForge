// mathNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const MathNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Math"
    color={NODE_COLORS.math}
    inputs={[
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
    ]}
    outputs={[{ id: 'result', label: 'result' }]}
    fields={[
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        options: ['add (+)', 'subtract (−)', 'multiply (×)', 'divide (÷)', 'modulo (%)', 'power (^)'],
      },
    ]}
  />
);
