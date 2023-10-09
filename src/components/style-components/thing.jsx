/** @jsx jsx */
import React from 'react'
import '../../styles/thing.css'
import { jsx } from 'theme-ui'

const Thing = ({
  cx = '80',
  cy = '80',
  rx = '80',
  ry = '60',
  width = '160',
  height = '160',
  color1 = 'rgba(255, 255, 255, 0.7)',
  color2 = 'rgba(243, 160, 35, 0.7)',
  color3 = 'rgba(216, 50, 50, 0.7)',
  color4 = 'rgba(255, 255, 255, 0)',
}) => (
  <div
    sx={{
      position: 'relative',
      // width: `${width}px`,
      // height: `${height}px`,
      width: '164px',
      height: '164px',
      overflow: 'hidden',
    }}
    className="thing-wrapper"
  >
    <svg
      className="oval oval1"
      width={width}
      height={height}
      sx={{ fill: color1 }}
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
    <svg
      className="oval oval2"
      width={width}
      height={height}
      sx={{ fill: color2 }}
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
    <svg
      className="oval oval3"
      width={width}
      height={height}
      sx={{ fill: color3 }}
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
    <svg className="oval oval4" width={160} height={160} sx={{ fill: color4 }}>
      {/* Adjusted viewBox */}
      <ellipse cx="79" cy="79" rx="77" ry="57" />
    </svg>
  </div>
)

export default Thing
