import React from 'react'
import { Link, navigate } from 'gatsby'
// import { Graph } from 'react-d3-graph'
// import Graph from "react-graph-vis"
import LinkGraph from '../components/linkgraph'
import Layout from '../layout/layout'
import '../styles/graph.css'

export default function NoteMap({ pageContext }) {

    // Create the data for the graph visualisation for the note linking.
  const graph = {
    nodes: Object.keys(pageContext.allRefersTo).map((title) => {
      return { id: title, label: title }
    }),
    edges: []
  }

  const d3GraphData = {
    nodes: Object.keys(pageContext.allRefersTo).map((title) => {
      return { id: title, label: title, slug: pageContext.allRefersTo[title].slug,  color: 'black' }
    }),
    links: []
  }

  // Set up the linkages between the notes.
  for (let noteTitle in pageContext.allRefersTo) {
    const refNoteTitles = pageContext.allRefersTo[noteTitle]

    for (let i in refNoteTitles) {
      const refNoteTitle = refNoteTitles[i]

      // Show links to only the notes that exists. There will be some linking to non existing notes - that will break the graph.
      if (pageContext.allRefersTo[refNoteTitle] !== undefined) {
        // graphData.links.push({ source: noteTitle, target: refNoteTitle })
        graph.edges.push({ from: noteTitle, to: refNoteTitle })
        d3GraphData.links.push({ source: noteTitle, target: refNoteTitle })
      }
    }
  }



  return (
    <Layout>
      <div className="column is-half">
        <h1>Knowledge Graph</h1>

        <p>
          Total Notes:{' '}
          <Link to="/sitemap">
            <strong>{Object.keys(pageContext.allRefersTo).length}</strong>
          </Link>
        </p>

        <div id="graph-container">
          {/* <Graph
            graph={graph}
            options={options}
            events={events}

          /> */}
          <LinkGraph graphData = {d3GraphData}/>
        </div>
      </div>
    </Layout>
  )
}
