import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/customcursor.css'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  const moveCursor = e => {
    gsap.to(cursorRef.current, {
      duration: 0.2,
      x: e.clientX,
      y: e.clientY - 20,
      opacity: 1, // Make sure cursor is fully opaque when moving
    })
    gsap.to(followerRef.current, {
      duration: 0.3,
      x: e.clientX,
      y: e.clientY - 20,
      opacity: 1, // Make sure follower is fully opaque when moving
    })
  }

  const enlargeFollower = () => {
    gsap.to(followerRef.current, {
      duration: 0.3,
      width: '65px',
      height: '65px',
      ease: 'power3',
    })
  }

  const shrinkFollower = () => {
    gsap.to(followerRef.current, {
      duration: 0.3,
      width: '40px',
      height: '40px',
      ease: 'power3',
    })
  }

  const hideCursor = () => {
    gsap.to([cursorRef.current, followerRef.current], {
      opacity: 0, // Set both cursor and follower to be fully transparent
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', hideCursor)
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      link.addEventListener('mouseover', enlargeFollower)
      link.addEventListener('mouseout', shrinkFollower)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', hideCursor)

      links.forEach(link => {
        link.removeEventListener('mouseover', enlargeFollower)
        link.removeEventListener('mouseout', shrinkFollower)
      })
    }
  }, [])

  return (
    <div>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="follower"></div>
    </div>
  )
}

export default CustomCursor
