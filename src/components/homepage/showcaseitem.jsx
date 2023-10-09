/** @jsx jsx */
import React, { useRef } from 'react'
import { Box, jsx, Text, Link } from 'theme-ui'
import gsap from 'gsap'

export const ShowcaseItem = ({ item }) => {
  const [isExpanded, setExpanded] = React.useState(false)
  const contentRef = useRef(null) // Reference to the content we want to animate
  const buttonTextRef = useRef(null)
  const handleButtonClick = event => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    toggleExpansion()
  }
  const toggleExpansion = () => {
    const element = contentRef.current
    const buttonTextElement = buttonTextRef.current
    gsap.to(buttonTextElement, {
      duration: 0.06,
      opacity: 0,
      onComplete: () => {
        setExpanded(prev => !prev)
        gsap.to(buttonTextElement, {
          duration: 0.06,
          opacity: 1,
        })
      },
    })

    if (isExpanded) {
      gsap.to(element, {
        duration: 0.1,
        height: 0,
        padding: '0',
        ease: 'power3',
        opacity: 0,
      })
    } else {
      gsap.set(element, {
        height: 'auto',
        padding: '0px 0px 10px 0px',
        opacity: 1,
      })
      gsap.from(element, {
        duration: 0.1,
        height: 0,
        ease: 'power3',
      })
    }
    // setExpanded(!isExpanded)
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid #71788C',
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        onClick={toggleExpansion}
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          zIndex: 1,
          // mb: 4,
        }}
      >
        <Text
          onClick={handleButtonClick} // Toggle state here
          sx={{
            background: 'white',
            borderRadius: '20px',
            border: '1.5px solid #71788C',
            p: '9px',
            fontSize: '0.75em',
            cursor: 'pointer',
            width: '90px', // Fixed width here
            textAlign: 'center', // Optional, to center the text within the button
            zIndex: 10,
          }}
        >
          <span ref={buttonTextRef}>
            {isExpanded ? 'collapse↑' : 'expand→'}
          </span>
        </Text>

        <h2
          sx={{
            fontSize: 4,
            width: '150px',
            fontWeight: 500,
            color: 'primary',
            variant: 'textStyles.special',
            ml: '5px',
          }}
        >
          {item.title}
        </h2>

        <Text sx={{ flex: 1, fontSize: '0.75em', fontWeight: 500, my: 6 }}>
          {item.description}
        </Text>

        <Link
          href="https://www.google.com"
          onClick={e => e.stopPropagation()}
          sx={{
            width: '65px',
            height: '65px',
            mr: '2px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 5,
            border: '1.3px solid',
            borderColor: `borderPrimary`,
            transition: 'transform 0.1s ease-in',
            ':hover': {
              transform: 'scale(1.03)',
            },
            ':hover > span': {
              // Assuming Text component renders to a <span>
              transform: 'translate(1.2px, -1.2px)',
            },
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'primary',
          }}
        >
          <img
            src="img/writing.png"
            alt="Writing"
            width="30"
            height="30"
            sx={{ ml: '2px' }}
          />
          <Text
            sx={{
              fontSize: 4,
              ml: '-5px',
              transition: 'transform 0.1s ease-in',
            }}
          >
            ↗
          </Text>
        </Link>
      </Box>
      <Box
        ref={contentRef} // Add the reference here
        sx={{
          height: 0,
          padding: 0,
          display: 'inline-block',
          alignItems: 'center',
          opacity: 0,
        }}
      >
        <Text sx={{ ml: '285px', fontSize: '0.75em', display: 'block' }}>
          {item.paragraph}
        </Text>
      </Box>
      {/* <Box
          ref={contentRef} // Add the reference here
          sx={{
            height: 0,
            padding: 0,
          }}
        >
          <Text sx={{ fontSize: '0.75em' }}>{item.paragraph}</Text>
        </Box> */}
    </Box>
  )
}
