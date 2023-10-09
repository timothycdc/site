/** @jsx jsx */
import React from 'react'
import { Box, jsx } from 'theme-ui'
import Header from './header'
import Nav from './nav'
import CustomCursor from '../components/customcursor'

export default function Layout({ children, title, type, ...props }) {
  return (
    <>
      <Header title={title} type={type} />
      <CustomCursor />
      <Box
        sx={{
          mr: [6, 8, 8],
          ml: [6, 8, 8],
        }}
      >
        <Box
          sx={{
            mt: 8,
            mb: 8,
            ml: 'auto',
            mr: 'auto',
            maxWidth: ['500px', '800px', '1100px'],
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                width: '200px', // Adjust the width according to your needs
                display: ['none', 'block', 'block'], // Hide sidebar on smaller screens
                // Add additional styling properties for the sidebar
              }}
            >
              <Nav />
            </Box>
            <Box className="columns is-centered" sx={{ width: '100%' }}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
