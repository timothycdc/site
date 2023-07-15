/** @jsx jsx */
import React from 'react'
import { Box, jsx } from 'theme-ui'

export default function Nav({ children, title, type, ...props }) {
  return (
<>
      {/* <Header title={title} type={type} /> */}
      <Box sx = {{m:4, border: '2px solid black'}}>
        <h1>Da Nav</h1>
      </Box>
</>
  )
}