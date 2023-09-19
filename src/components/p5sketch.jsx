import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Sketch from 'react-p5'
import { openSimplexNoise } from '../utils/open-simplex-noise'

const P5Sketch = ({ canvasRef }) => {
  //initialize your variables here
  let locs = []
  let colours = []
  let rotates = []
  let t = 0
  let length = 5
  let res = 35
  let lineWeight = 3
  let noiseInc = 0.12
  let colourDelta = 0.2
  let delta = 0.005
  let ctx

  let p5Ref = useRef() // This ref will hold the p5 instance

  const setup = (p5, canvasParentRef) => {
    p5Ref.current = p5 // Save the p5 instance to the ref
    let cnv = p5.createCanvas(0, 0) // Initially set the size to 0
    cnv.style('display', 'block')
    cnv.parent(canvasParentRef) // Attach canvas to parent div
    ctx = cnv.canvas.getContext('2d')
  }

  const drawLines = p5 => {
    locs = []
    rotates = []
    let openSimplex = openSimplexNoise()
    let countX = Math.ceil(p5.width / res) + 1
    let countY = Math.ceil(p5.height / res) + 1
    let xOff = Math.random() * 1000

    for (let j = 0; j < countY; j++) {
      let yOff = 0
      xOff += noiseInc

      for (let i = 0; i < countX; i++) {
        const noise = openSimplex.noise2D(xOff, yOff)
        const rotate = p5.map(noise, -1, 1, 0, 6.283)
        locs.push(p5.createVector(res * i, res * j))
        rotates.push(rotate)
        colours.push(p5.map(noise, -1, 1, 0, 360))
        yOff += noiseInc
      }
    }
    p5.noFill()
    p5.strokeWeight(lineWeight)
  }

  const draw = p5 => {
    t += delta
    let listLength = rotates.length
    p5.clear()
    // p5.background('#ABC4F3');
    for (let i = locs.length - 1; i >= 0; i--) {
      let h = calcVec(locs[i].x - p5.width / 2, locs[i].y - p5.height / 2, p5)
      ctx.strokeStyle = '#fff' //`hsl(${360*p5.sin(colours[i]+colourDelta)}, 65%, 60%)`;
      // ctx.globalAlpha = 255*p5.sin(colours[i]+delta);
      ctx.globalAlpha = 1
      p5.line(
        locs[i].x + res / 2 - length * p5.sin(rotates[i] + t),
        locs[i].y + res / 4 - length * p5.cos(rotates[i] + t),
        locs[i].x + res / 2 + length * p5.sin(rotates[i] + t),
        locs[i].y + res / 4 + length * p5.cos(rotates[i] + t)
      )
      p5.line(
        locs[i].x - length * p5.sin(rotates[i] + t),
        locs[i].y - length * p5.cos(rotates[i] + t),
        locs[i].x + length * p5.sin(rotates[i] + t),
        locs[i].y + length * p5.cos(rotates[i] + t)
      )
    }
  }

  const calcVec = (x, y, p5) => {
    // return new p5.Vector(y - x, x + y);
    return p5.createVector(y - x, x + y)
  }

  const resizeP5Canvas = () => {
    if (p5Ref.current && canvasRef.current) {
      p5Ref.current.resizeCanvas(
        canvasRef.current.offsetWidth,
        canvasRef.current.offsetHeight
      )
      t = 0
      drawLines(p5Ref.current) // Draw lines on the resized canvas
    }
  }

  // race condition in gatsby where the canvasRef is not attached to the DOM yet
  // when refreshing no vectors are rendered until a resize occurs
  useEffect(() => {
    if (canvasRef.current && p5Ref.current && p5Ref.current.canvas) {
      resizeP5Canvas()
      setTimeout(() => drawLines(p5Ref.current), 100);
    } 
  }, [canvasRef, p5Ref, p5Ref.current ? p5Ref.current.canvas : null])

//   useLayoutEffect(() => {
//     // Call the resize function once the canvasRef is attached
//     resizeP5Canvas()
//     window.addEventListener('resize', resizeP5Canvas)
//     return () => {
//       window.removeEventListener('resize', resizeP5Canvas)
//     }
//   }, [])

  return <Sketch setup={setup} draw={draw} />
}

export default P5Sketch
