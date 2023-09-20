/** @jsx jsx */
import React from 'react'
import { Box, Link, jsx } from 'theme-ui'
import Thing from './style-components/thing'
import '../thing.css'
import '../rotatebadge.css'

export default function rotatingBadge({}) {
  return (
    <Link className="circle-arrow-container basic" sx={{ cursor: 'pointer' }}>
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
  )
}
