/** @jsx jsx */
import React, { useState, useRef, useEffect } from 'react'
import { Box, Link, jsx } from 'theme-ui'
import '../../styles/thing.css'
import '../../styles/rotatebadge.css'
import Thing from '../style-components/thing'
import Marquee from 'react-fast-marquee'
import { debounce } from 'lodash'

export default function Section({
  id,
  title = 'title',
  showThing = true,
  showRotateBadge = false,
  color1 = 'rgba(255, 255, 255, 0.7)',
  color2 = 'rgba(243, 160, 35, 0.7)',
  color3 = 'rgba(216, 50, 50, 0.7)',
  color4 = 'rgba(255, 255, 255, 0)',
  children,
  bottomBorder = true,
}) {
  const textPattern = 'see all posts – '
  const repeatedText = textPattern.repeat(3)
  const TitleComponent = () => {
    return (
      <h2
        sx={{
          color: 'primary',
          variant: 'textStyles.special',
          mt: 0,
          p: 0,
          fontSize: 5,
          px: 6,

          mx: -1,
          // mb: 10, // RESPONSIVE CHANGE
        }}
      >
        {title}
      </h2>
    )
  }

  const FillingMarquee = () => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    const titleWidth = 60
    const bufferTitles = 3

    useEffect(() => {
      const handleResize = debounce(() => {
        setViewportWidth(window.innerWidth)
      }, 200) // 200ms delay

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, []) // Empty dependency array means this useEffect runs once on mount and cleanup on unmount

    const numberOfTitles = Math.ceil(viewportWidth / titleWidth) + bufferTitles

    return (
      <Marquee speed={10} style={{ marginBottom: '-1.65rem' }}>
        {Array(numberOfTitles)
          .fill(null)
          .map((_, index) => (
            <TitleComponent key={index} />
          ))}
      </Marquee>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        pb: 8,
        borderBottom: bottomBorder ? '1px solid' : '0px solid',
        borderColor: `primary`,
      }}
      id={id ? id : null}
    >
      <Box
        sx={{
          height: '3px',
        }}
      ></Box>
      {/* Inner-section 1: Title */}
      <Box
        sx={{
          // paddingTop: 5,
          borderTop: '5px solid',
          borderColor: `primary`,
        }}
      >
        <FillingMarquee />
        <Box
          sx={{
            height: '2px',
          }}
        ></Box>
        {/* Inner-section 1: Title */}
        <Box
          sx={{
            // paddingTop: 5,
            borderTop: '1px solid',
            borderColor: `borderPrimary`,
            mb: 8,
          }}
        ></Box>
      </Box>
      {/* Inner-section 2: Right-aligned Thing component */}
      {showThing ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Thing
            color1={color1}
            color2={color2}
            color3={color3}
            color4={color4}
          />
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
