# FlowForge — Visual AI Pipeline Builder

A drag-and-drop pipeline editor for composing AI workflows visually. Wire together nodes — inputs, outputs, LLMs, text transformers, API callers, and more — then validate the pipeline structure against a FastAPI backend.

---

## Features

- **9 built-in node types** — Input, Output, LLM, Text, API Caller, File Reader, Transform, Math, Conditional
- **Reusable node abstraction** — All nodes share a `BaseNode` component; new nodes are added in ~10 lines
- **Dynamic Text node** — Automatically resizes as you type; `{{variableName}}` syntax creates live input handles
- **Dark theme UI** — Consistent design system with per-node accent colors, CSS classes, and no inline style bloat
- **Pipeline analysis** — Submit button sends the graph to the backend, which returns node count, edge count, and DAG validity
- **DAG validation** — Iterative DFS cycle detection (no recursion limit issues) with a styled result modal
- **Axios API client** — Centralized backend calls in `api.js` with environment-based base URL

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, ReactFlow 11, Zustand, Axios |
| Backend | Python, FastAPI, Uvicorn, Pydantic |
| Styling | Plain CSS (class-based), no UI library |

---

## Project Structure

```
VectorShift/
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js          # Shared node abstraction
│       │   ├── nodes.css            # All node styles
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js          # Dynamic resize + {{variable}} handles
│       │   ├── apiCallerNode.js
│       │   ├── fileReaderNode.js
│       │   ├── transformNode.js
│       │   ├── mathNode.js
│       │   └── conditionalNode.js
│       ├── api.js                   # Axios client (baseURL from .env)
│       ├── store.js                 # Zustand global state
│       ├── ui.js                    # ReactFlow canvas
│       ├── toolbar.js               # Node palette
│       ├── draggableNode.js         # Draggable chip component
│       ├── submit.js                # Submit button + result modal
│       ├── App.js
│       ├── app.css                  # App-level styles
│       ├── index.css                # Global resets + ReactFlow overrides
│       └── styles.js                # Design tokens (colors, NODE_COLORS)
├── backend/
│   └── main.py                      # FastAPI app + DAG validation
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

Runs on [http://localhost:8000](http://localhost:8000)

### Environment

The frontend reads the backend URL from `frontend/.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

Update this value when deploying to a different environment. Restart `npm start` after any `.env` change.

---

## Usage

1. **Drag** a node from the toolbar onto the canvas
2. **Connect** nodes by dragging from an output handle (right side) to an input handle (left side)
3. **Configure** nodes using the fields inside each card
4. **Text node** — type `{{variableName}}` to dynamically create input handles
5. **Click Submit Pipeline** — a modal displays the node count, edge count, and whether the pipeline is a valid DAG

---

## API

### `POST /pipelines/parse`

**Request body**
```json
{
  "nodes": [ { "id": "customInput-1", ... } ],
  "edges": [ { "source": "customInput-1", "target": "llm-1", ... } ]
}
```

**Response**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

`is_dag` is `false` if the pipeline contains any cycle (including self-loops).

---

## Adding a New Node

1. Create `frontend/src/nodes/myNode.js`:

```jsx
import { BaseNode } from './BaseNode';

export const MyNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="My Node"
    color="#your-color"
    inputs={[{ id: 'input', label: 'input' }]}
    outputs={[{ id: 'output', label: 'output' }]}
    fields={[
      { key: 'myField', label: 'Field', type: 'text', placeholder: '...' },
    ]}
  />
);
```

2. Register it in `ui.js` → `nodeTypes`
3. Add a `<DraggableNode>` entry in `toolbar.js`
4. Add a color entry in `styles.js` → `NODE_COLORS`
