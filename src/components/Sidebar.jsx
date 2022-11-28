import { ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import React, { useState } from 'react'

import dataPanel from 'services/Diagrams'

const Sidebar = () => {
  const [panel, setPanel] = useState(dataPanel)

  const onDragStart = (event, nodeType, title, subtitle) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.setData('title/reactflow', title)
    event.dataTransfer.setData('subtitle/reactflow', subtitle)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Paper sx={{ width: 100 }}>
      <MenuList
        sx={{
          background: '#1976d2',
          color: '#fff'
        }}
      >
        {panel.map((item) => (
          <MenuItem
            key={item.title}
            onDragStart={(event) =>
              onDragStart(event, 'card', item.title, item.subTitle)
            }
            draggable
          >
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  )
}

export default Sidebar
