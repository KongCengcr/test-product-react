import { Box, Button, FormControl, Modal, TextField } from '@mui/material'
import React, { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel
} from 'reactflow'
import Sidebar from 'components/Sidebar'

import 'reactflow/dist/style.css'
import CardNode from 'components/reactflowNode/CardNode'
import { Add } from '@mui/icons-material'
import 'components/reactflowNode/card-node.css'

const nodeTypes = { card: CardNode }

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
}

const initialNodes = [
  {
    id: '1',
    type: 'card',
    data: { title: 'Menu', subtitle: 'Control interno de la pagina' },
    position: { x: 250, y: 5 }
  },
  {
    id: '2',
    type: 'card',
    data: { title: 'Blog', subtitle: 'Info de la Pagina' },
    position: { x: 600, y: -50 }
  },
  {
    id: '3',
    type: 'card',
    data: { title: 'Acerca De', subtitle: 'Info de la Pagina' },
    position: { x: 600, y: 100 }
  },
  {
    id: '4',
    type: 'card',
    data: { title: 'Products', subtitle: 'Info de los productos' },
    position: { x: 600, y: 250 }
  }
]

const initialEdges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '1-3', source: '1', target: '3' },
  { id: '1-4', source: '1', target: '4' }
]

let id = 0
const getId = () => `dndnode_${id++}`

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [open, setOpen] = useState(false)
  const [addNode, setAddNode] = useState({ title: '', subtitle: '' })
  const reactFlowWrapper = useRef()

  const handleOpenModal = () => setOpen(true)

  const handleCloseModal = () => setOpen(false)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')
      const title = event.dataTransfer.getData('title/reactflow')
      const subtitle = event.dataTransfer.getData('subtitle/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      })
      const newNode = {
        id: getId(),
        type,
        position,
        data: { title, subtitle }
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  const handleAddNode = (e) => {
    const { value, name } = e.target
    setAddNode({ ...addNode, [name]: value })
  }

  const handleSaveNode = () => {
    const newNode = {
      id: getId(),
      type: 'card',
      position: { x: 450, y: 15 },
      data: { title: addNode.title, subtitle: addNode.subtitle }
    }

    setNodes((nds) => nds.concat(newNode))
    setAddNode({ title: '', subtitle: '' })
    handleCloseModal()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <FormControl fullWidth variant="standard">
            <TextField
              id="title-text-field"
              label="Title"
              variant="standard"
              name="title"
              onChange={(e) => handleAddNode(e)}
              fullWidth
              value={addNode.title || ''}
            />
            <TextField
              id="subtitle-text-field"
              label="Subtitle"
              variant="standard"
              name="subtitle"
              onChange={(e) => handleAddNode(e)}
              fullWidth
              sx={{ mt: 2, mb: 4 }}
              value={addNode.subtitle || ''}
            />
            <Button onClick={() => handleSaveNode()} variant="contained">
              Save
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <div style={{ width: '100%', height: '500px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
            <Panel position="top-right">
              <Sidebar />
            </Panel>
            <Panel position="top-left">
              <Button
                onClick={handleOpenModal}
                variant="contained"
                startIcon={<Add />}
              >
                Add
              </Button>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </>
  )
}

export default Flow
