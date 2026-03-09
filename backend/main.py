from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://flow-forge-beige.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: list[Any]
    edges: list[Any]


def check_is_dag(nodes: list, edges: list) -> bool:
    """Return True if the directed graph formed by nodes+edges is a DAG (no cycles).

    Uses iterative DFS with an explicit stack to avoid Python's recursion limit
    on large or deeply chained pipelines.
    """
    graph: dict[str, list[str]] = {n["id"]: [] for n in nodes}
    for e in edges:
        src = e.get("source")
        tgt = e.get("target")
        if src in graph:
            graph[src].append(tgt)

    state: dict[str, int] = {node_id: 0 for node_id in graph}

    for start in graph:
        if state[start] != 0:
            continue

        stack = [(start, iter(graph.get(start, [])))]
        state[start] = 1

        while stack:
            node, neighbors = stack[-1]
            try:
                neighbor = next(neighbors)
                n_state = state.get(neighbor, 2)
                if n_state == 1:
                    return False  # back edge → cycle
                if n_state == 0:
                    state[neighbor] = 1
                    stack.append((neighbor, iter(graph.get(neighbor, []))))
            except StopIteration:
                state[node] = 2
                stack.pop()

    return True


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
