/** @jsx jsx */
import React from 'react'
import { Box, jsx } from 'theme-ui'
import Header from './header'
import Nav from './nav'

export default function Layout({ children, title, type, ...props }) {
  return (
    <>
      <Header title={title} type={type} />
      <Box sx={{ mr: [6, 8, 8], ml: [6, 8, 8] }}>
        <Box sx={{ mt: 8, mb: 8, ml: 'auto', mr: 'auto', maxWidth: '900px ' }}>
          <Box sx={{ display: 'flex'}}>
            <Box
              sx={{
                width: '250px', // Adjust the width according to your needs
                display: ['block', 'block', 'block'], // Hide sidebar on smaller screens
                // Add additional styling properties for the sidebar
              }}
            >
              <Nav />
            </Box>
            <div className="columns is-centered">{children}</div>
          </Box>
        </Box>
      </Box>
    </>
  )
}
