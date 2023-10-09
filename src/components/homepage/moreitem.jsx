/** @jsx jsx */
import React, { useRef } from 'react'
import { Box, jsx, Text } from 'theme-ui'
import gsap from 'gsap'

export const MoreItem = ({ item }) => {
  const [isExpanded, setExpanded] = React.useState(false)
  const contentRef = useRef(null)
  const buttonTextRef = useRef(null)
  const enclosingBoxRef = useRef(null) // Added ref for enclosing box

  const handleButtonClick = event => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    toggleExpansion()
  }

  const toggleExpansion = () => {
    const element = contentRef.current
    const buttonTextElement = buttonTextRef.current
    const enclosingBox = enclosingBoxRef.current // Using ref

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
      // Color revert animations
      gsap.to(enclosingBox, { duration: 0.2, backgroundColor: '#F5DDCC' })
      gsap.to(enclosingBox.querySelectorAll('.colourAnimate'), {
        duration: 0.2,
        color: 'initial',
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
      // Color change animations
      gsap.to(enclosingBox, { duration: 0.2, backgroundColor: '#343743' })
      gsap.to(enclosingBox.querySelectorAll('.colourAnimate'), {
        duration: 0.2,
        color: '#F5DDCC',
      })
    }
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid #71788C',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={enclosingBoxRef}
        sx={{
          px: 6,
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
        onClick={toggleExpansion}
      >
        <h2
          sx={{
            fontSize: 3,
            width: '250px',
            fontWeight: 500,
            color: 'primary',
            my: 6,
          }}
          className="colourAnimate"
        >
          {item.title}
        </h2>

        <Text
          sx={{
            width: '250px',
            fontSize: '0.75em',
            fontWeight: 500,
            mx: 'auto',
          }}
          className="colourAnimate"
        >
          {item.tags}
        </Text>

        <Text
          onClick={handleButtonClick}
          sx={{
            background: 'white',
            borderRadius: '20px',
            border: '1.5px solid #71788C',
            py: '4px',
            fontSize: '0.75em',
            cursor: 'pointer',
            width: '80px',
            textAlign: 'center',
            textColor: '#343743 !important',
          }}
        >
          <span ref={buttonTextRef}>
            {isExpanded ? 'collapse↑' : 'expand→'}
          </span>
        </Text>
      </Box>
      <Box
        ref={contentRef}
        sx={{
          height: 0,
          padding: 0,
          display: 'inline-block',
          alignItems: 'center',
          opacity: 0,
        }}
      >
        <Text sx={{ fontSize: '0.75em', display: 'block', mt: 5, px: 6 }}>
          {item.paragraph}
        </Text>
      </Box>
    </Box>
  )
}
