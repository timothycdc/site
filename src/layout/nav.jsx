/** @jsx jsx */

import { Box, jsx, Link } from 'theme-ui'

export default function Nav({ children, title = 'Home', type, ...props }) {
  return (
    <Box sx={{ mr: 8, position: 'sticky', top: 9 }}>
      {/* <Header title={title} type={type} /> */}

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          borderTop: '1px solid',
          borderColor: `borderPrimary`,
        }}
      >
        {/* Left-aligned, top-aligned Circle */}
        <Box
          sx={{
            width: '80px',
            height: '80px',
            marginTop: '20px',
            borderRadius: '50%',
            backgroundColor: '#A0C0DD',
            zIndex: 2, // to appear on top, if needed
          }}
        ></Box>

        {/* Nav list */}
        <Box
          sx={{
            position: 'relative',
            top: 60,
            left: 0,
            fontFamily: 'Inter',
          }}
        >
          <Box sx={{ fontWeight: 600 }}>{title}</Box>
          <ul
            sx={{
              marginBlockStart: '0em',
              marginBlockEnd: '0em',
              paddingInlineStart: '0px',
              paddingInlineEnd: '0px',
              mt: '10px',
            }}
          >
            {['Writing', 'Work', 'Resume', 'LinkedIn'].map((item, index) => (
              <li
                key={index}
                sx={{
                  listStyle: 'none',
                  mb: 2,
                  ml: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  sx={{
                    textDecoration: 'none',
                    borderBottom: 'none',
                    lineHeight: '1.5em',
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </Link>
                <span>→</span>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  )
}
