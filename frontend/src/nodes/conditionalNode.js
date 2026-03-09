// conditionalNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const ConditionalNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Conditional"
    color={NODE_COLORS.conditional}
    inputs={[{ id: 'value', label: 'value' }]}
    outputs={[
      { id: 'true', label: 'true' },
      { id: 'false', label: 'false' },
    ]}
    fields={[
      {
        key: 'condition',
        label: 'Condition',
        type: 'select',
        options: ['== (equals)', '!= (not equals)', '> (greater)', '>= (greater or eq)', '< (less)', '<= (less or eq)'],
      },
      { key: 'threshold', label: 'Threshold', type: 'text', placeholder: '0' },
    ]}
  />
);
