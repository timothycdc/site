import React, { useState, useEffect, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import {navigate} from 'gatsby'

// if gatsby has an issue, I'll just do it myself
function backupSlugGen(filename) {
  // Remove file extension if present
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex !== -1) {
    filename = filename.substring(0, dotIndex);
  }

  // Find the first word (alphanumeric characters only)
  const match = filename.match(/\b\w+\b/);
  if (match) {
    const firstWord = match[0];

    // Convert to lowercase
    const slug = firstWord.toLowerCase();
    return slug;
  }

  return ''; // Return an empty string if no valid word found
}


function onClickEvent(node, event) {

  if (node.slug){
    navigate(node.slug)
  }
  else {
    // gatsby istg if your context DOESNT PROPERLY LOAD
    navigate(`/${backupSlugGen(node.id)}`)
  }
}



function LinkGraph(props) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const containerRef = useRef(null)

  // handle resize
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setDimensions({
          height: containerRef.current.offsetHeight,
          width: containerRef.current.offsetWidth,
        })
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize() // immediately update size
    return () => window.removeEventListener('resize', updateSize) // clean up on unmount
    
  }, []) // empty dependency array means this effect runs once on mount and clean up on unmount


  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ForceGraph2D
      onNodeClick = {(node, event) => onClickEvent(node, event)}
        graphData={props.graphData}
        width={dimensions.width}
        height={dimensions.height}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={0.01}
        linkDirectionalParticles={5}
        linkDirectionalParticleSpeed={0.001}
        
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id
          const fontSize = 12 / globalScale
          ctx.font = `${fontSize}px Sans-Serif`
          const textWidth = ctx.measureText(label).width
          const bckgDimensions = [textWidth, fontSize].map(
            n => n + fontSize * 0.2
          ) // some padding

          // Draw the node
          ctx.beginPath() // start path for the circle
          ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false) // draw the circle with smaller radius
          ctx.fillStyle = node.color // set the color
          ctx.fill() // fill the circle

          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y + 8 - bckgDimensions[1] / 2,
            ...bckgDimensions
          ) // Move the rectangle down

          

          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = node.color
          ctx.fillText(label, node.x, node.y + 8) // Move the text down

          node.__bckgDimensions = bckgDimensions // to re-use in nodePointerAreaPaint
        }}
      />
    </div>
  )
}

export default LinkGraph
