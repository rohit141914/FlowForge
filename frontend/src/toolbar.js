// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODE_COLORS } from './styles';

export const PipelineToolbar = () => (
  <div className="toolbar">
    <div className="toolbar-logo">VectorShift</div>
    <div className="toolbar-divider" />
    <div className="toolbar-palette">
      <span className="toolbar-palette-label">Nodes</span>
      <DraggableNode type='customInput'  label='Input'       color={NODE_COLORS.customInput}  />
      <DraggableNode type='llm'          label='LLM'         color={NODE_COLORS.llm}          />
      <DraggableNode type='customOutput' label='Output'      color={NODE_COLORS.customOutput} />
      <DraggableNode type='text'         label='Text'        color={NODE_COLORS.text}         />
      <DraggableNode type='apiCaller'    label='API Caller'  color={NODE_COLORS.apiCaller}    />
      <DraggableNode type='fileReader'   label='File Reader' color={NODE_COLORS.fileReader}   />
      <DraggableNode type='transform'    label='Transform'   color={NODE_COLORS.transform}    />
      <DraggableNode type='math'         label='Math'        color={NODE_COLORS.math}         />
      <DraggableNode type='conditional'  label='Conditional' color={NODE_COLORS.conditional}  />
    </div>
  </div>
);
