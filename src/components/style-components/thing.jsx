/** @jsx jsx */
import React from 'react'
import '../../thing.css'
import { jsx } from 'theme-ui'

const Thing = ({
  cx = '80',
  cy = '80',
  rx = '80',
  ry = '60',
  width = '160',
  height = '160',
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
    <svg className="oval oval1" width={width} height={height}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
    <svg className="oval oval2" width={width} height={height}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
    <svg className="oval oval3" width={width} height={height}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
    </svg>
    <svg className="oval oval4" width={160} height={160}>
      {/* Adjusted viewBox */}
      <ellipse cx="79" cy="79" rx="77" ry="57" />
    </svg>
  </div>
)

export default Thing
