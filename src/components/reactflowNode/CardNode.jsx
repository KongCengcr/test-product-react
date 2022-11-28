/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { Handle, Position } from 'reactflow'

const handleStyle = { left: 10 }

function TextUpdaterNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Card sx={{ minWidth: 275 }}>
        <CardHeader className="card-header" title={data.title}></CardHeader>
        <CardContent>
          <Typography variant="p" color="text.secondary" component="div">
            {data.subtitle}
          </Typography>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
    </>
  )
}

export default TextUpdaterNode
