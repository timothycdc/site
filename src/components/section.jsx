/** @jsx jsx */
import React from 'react'
import { Box, Link, jsx } from 'theme-ui'
import Thing from './style-components/thing'
import '../thing.css'
import '../rotatebadge.css'

export default function Section({
  title = 'title',
  showThing = true,
  showRotateBadge = false,
  children,
}) {
  const textPattern = 'see all posts – '
  const repeatedText = textPattern.repeat(3)
  return (
    <Box
      sx={{
        width: '100%',
        pb: 8,
        borderBottom: '1px solid',
        borderColor: `borderPrimary`,
      }}
    >
      <Box
        sx={{
          height: '1.5px',
        }}
      ></Box>
      {/* Inner-section 1: Title */}
      <Box
        sx={{
          paddingTop: 6,
          borderTop: '1px solid',
          borderColor: `borderPrimary`,
        }}
      >
        <h2
          sx={{
            color: 'primary',
            variant: 'textStyles.special',
            mt: 1,
            p: 0,
            // mb: 10, // RESPONSIVE CHANGE
          }}
        >
          {title}
        </h2>
      </Box>
      {/* Inner-section 2: Right-aligned Thing component */}
      {showThing ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Thing />
        </Box>
      ) : null}

      {showRotateBadge ? (
        <Box
          className="basic"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 8,
          }}
        >
          <Link
            className="circle-arrow-container basic"
            sx={{ cursor: 'pointer' }}
          >
            <div className="white-circle">
              <div className="centered-image">
                <img src="/img/writing.png" alt="Writing" />
              </div>
              <div className="rotating-badge">
                <svg className="rotate-textcircle" viewBox="0 0 500 500">
                  <defs>
                    <path
                      id="rotate-textcircle"
                      d="M250,425 a175,175 0 0,1 0,-350a175,175 0 0,1 0,350Z"
                    />
                  </defs>
                  <text className="rotate-scroll-text">
                    <textPath xlinkHref="#rotate-textcircle" textLength="1075">
                      {repeatedText}
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
            <div className="arrow-icon">→</div>
          </Link>
        </Box>
      ) : null}

      {/* Inner-section 3: Two-column section */}
      {children}
    </Box>
  )
}
