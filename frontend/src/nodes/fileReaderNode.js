// fileReaderNode.js

import { BaseNode } from './BaseNode';
import { NODE_COLORS } from '../styles';

export const FileReaderNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="File Reader"
    color={NODE_COLORS.fileReader}
    inputs={[{ id: 'file', label: 'file' }]}
    outputs={[{ id: 'content', label: 'content' }]}
    fields={[
      { key: 'fileType', label: 'File Type', type: 'select', options: ['CSV', 'JSON', 'TXT', 'PDF'] },
      { key: 'delimiter', label: 'Delimiter (CSV)', type: 'text', placeholder: ',' },
      { key: 'encoding', label: 'Encoding', type: 'select', options: ['UTF-8', 'UTF-16', 'ASCII'] },
    ]}
  />
);
