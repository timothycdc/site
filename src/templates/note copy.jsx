import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
// import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Graph as D3Graph } from 'react-d3-graph'
import Graph from 'react-graph-vis'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import mdxMermaid from 'mdx-mermaid'
import { Mermaid } from 'mdx-mermaid/lib/Mermaid'
import rehypePrism from 'rehype-prism'

import remarkFootnotes from 'remark-footnotes'

import Tooltip from '../components/tooltip'
import TooltipBacklink from '../components/tooltipbacklink'
import Layout from '../layout/layout'
import '../styles/note.css'
import '../styles/graph.css'
import MyMDX from '../components/mymdx'
import { compileSync } from '@mdx-js/mdx'
const remarkWikiLink = require('remark-wiki-link')
const makeSlug = require('../utils/make-slug')
const moment = require('moment')
const remarkGfm = require('remark-gfm')

let titles = []
const makeId = title => {
  titles.push(title)
  return title
}

const nodeExists = title => {
  return titles.includes(title)
}

export default function Note({ pageContext, data, children }) {
  const post = data.mdx

  // Create the data for the graph visualisation for the note linking.
  const graph = {
    nodes: [
      {
        id: makeId(post.fields.title),
        label: post.fields.title,
        slug: post.fields.slug,
      },
    ],
    edges: [],
  }

  const d3GraphData = {
    nodes: [{ id: post.fields.title, color: 'black', slug: post.fields.slug }],
    links: [],

    focusedNodeId: post.fields.title,
  }

  console.log('linkedNotes', pageContext.linkedNotes)

  // Links to the current Note
  // console.log('pageContext.referredBy', pageContext.referredBy)
  for (let i = 0; i < pageContext.referredBy.length; i++) {
    const refNoteTitle = pageContext.referredBy[i].title
    console.log('this is my damn context', pageContext)

    d3GraphData.nodes.push({
      id: refNoteTitle,
      color: 'black',
      // slug: pageContext.linkedNotes[pageContext.referredBy[i].toLowerCase()].slug,
    })
    d3GraphData.links.push({ source: refNoteTitle, target: post.fields.title })

    if (!nodeExists(refNoteTitle)) {
      console.log('referredByNode exists: ', pageContext.referredBy[i])
      graph.nodes.push({
        id: makeId(refNoteTitle),
        label: refNoteTitle,
        slug: pageContext.referredBy[i].slug,
      })
      graph.edges.push({
        from: makeId(refNoteTitle),
        to: makeId(post.fields.title),
      })
    }
  }

  // Links from the current Note
  // console.log('pageContext.refersTo', pageContext.refersTo)
  for (let i = 0; i < pageContext.refersTo.length; i++) {
    const refNoteTitle = pageContext.refersTo[i]

    d3GraphData.nodes.push({
      id: refNoteTitle,
      color: 'black',
      // slug: pageContext.linkedNotes[pageContext.refersTo[i].toLowerCase()].slug,
    })
    d3GraphData.links.push({ source: post.fields.title, target: refNoteTitle })

    if (!nodeExists(refNoteTitle)) {
      console.log('refersToNode exists ', pageContext.refersTo[i])
      graph.nodes.push({
        id: makeId(refNoteTitle),
        label: refNoteTitle,
        slug: pageContext.refersTo[i].slug,
      })
      graph.edges.push({
        from: makeId(post.fields.title),
        to: makeId(refNoteTitle),
      })
    }
  }

  if (d3GraphData.nodes.length === 1) {
    d3GraphData.nodes.push({
      id: 'No links',
      color: '#eee',
      slug: post.fields.slug,
      fontColor: '#999',
    })
    d3GraphData.links.push({
      source: post.fields.title,
      target: 'No links',
      color: '#eee',
    })
  }

  const graphConfig = {
    automaticRearrangeAfterDropNode: true,
    directed: true,
    initialZoom: 1.4,
    node: {
      color: 'gray',
      size: 120,
      fontSize: 10,
    },
  }

  console.log('@@@@@PageContext', pageContext)

  const options = {
    nodes: {
      shape: 'dot',
      size: 8,
      font: {
        color: '#aaa',
      },
      color: {
        // border: "#aaa",
        background: '#aaa',
        highlight: {
          // border: "#ddd",
          background: '#999',
        },
      },
    },
    edges: {
      color: {
        // border: "#aaa"
      },
      arrows: 'middle',
    },
    layout: {
      hierarchical: {
        enabled: true,
      },
    },
  }

  const events = {
    select: function (event) {
      var { nodes } = event
      // console.log('EVENT node',event, nodes[0])
      // console.log('slug from graph', graph.nodes.find(node => node.id === nodes[0]).slug)
      // const id = nodes[0].toString().toLowerCase()
      // const node = pageContext.linkedNotes[id]
      // console.log(graph.nodes.find(node => node.id === nodes[0]).slug)
      const dest = graph.nodes.find(node => node.id === nodes[0]).slug
      console.log('dest', dest)
      if (dest) navigate(dest)
      // navigate(dest)
    },
  }

  const onClickNode = function (nodeId) {
    nodeId = nodeId.toString()
    if (nodeId === 'NoLinks') return
    const node = pageContext.linkedNotes[nodeId]
    const dest = d3GraphData.nodes.find(node => node.id === nodeId)
    // navigate(`${node.slug}`)
    console.log('$$$$$$$$$$$$$$$$$$$$')
    console.log('nodeId', nodeId)
    console.log('linkedNotes', pageContext.linkedNotes)
    console.log('referredBy', pageContext.referredBy)
    console.log('refersTo', pageContext.refersTo)
    console.log('node', node)
    console.log('dest', dest)
    console.log('final', dest.slug)
    // if (dest) navigate(dest)
  }

  const TooltipLink = props => {
    console.log(props)
  }
  //   let title = null
  //   if (props.children) {
  //     title = props.children.toString().toLowerCase()
  //   }
  //   let linkedNoteLink = pageContext.linkedNotes[title] || null
  //   console.log('props', props)
  //   console.log('title', title)
  //   console.log('linkedNoteLink', linkedNoteLink)
  //   if (props.href.includes('http')) {
  //     return <a {...props} />
  //   } else if (props.href.includes('mailto')) {
  //     return <a {...props} />
  //   } else if (props.href.includes('#')) {
  //     return <a {...props} />
  //   } else if (!pageContext.linkedNotes || typeof props.children !== 'string') {
  //     return <a {...props} />
  //   } else if (linkedNoteLink) {
  //     // console.log('linkedNoteLink!!!', linkedNoteLink)
  //     return (
  //       <>
  //         <Tooltip content={linkedNoteLink.excerpt.toString()}>
  //           <Link {...props} to={`${props.href}`} title="" />
  //         </Tooltip>
  //       </>
  //     )
  //   }
  //   return (
  //     <>
  //       <Tooltip content={linkedNoteLink.excerpt.toString()}>
  //         <Link {...props} to={`/${props.href}`} title="" />
  //       </Tooltip>
  //     </>
  //   )
  // }
  
  
  // if (props.href.includes('http')) {
  //   // External link
  //   // eslint-disable-next-line
  //   return <a {...props} />
  // } else if (typeof props.children !== 'string') {
  //   // There might be cases where an image is refered(or other non notes).
  //   // eslint-disable-next-line
  //   return <a {...props} />
  // } else if (!pageContext.linkedNotes) {
  //   // For unlisted notes. Causes a error otherwise. Because of this, Tooltips are NOT availabe on unlisted notes.
  //   // eslint-disable-next-line
  //   return <a {...props} />
  // } else {
  //   const title = props.children.toLowerCase()
  //   let linkedNote = pageContext.linkedNotes[title] || null

  //   if (linkedNote) {
  //     // console.log(linkedNote)
  //     return (
  //       <Tooltip content={linkedNote.body}>
  //         <Link {...props} to={`/${props.href}`} title="" />
  //       </Tooltip>
  //     )
  //   } else {
  //     return <Link {...props} to={`/${props.href}`} />
  //   }
  // }

  const MyCode = props => (
    <code style={{ fontFamily: `monospace`, fontWeight: 500 }} {...props} />
  )

  // async function compileNotes(notes) {
  //   // Loop over the notes
  //   for (let note of notes) {
  //     // Compile the note body to MDX
  //     let compiled = compileSync(note.body, {
  //       outputFormat: 'function-body',
  //       development: false,
  //       useDynamicImport: true,
  //       remarkPlugins: [remarkWikiLink, remarkGfm, remarkMath, remarkFootnotes],
  //       components: { mermaid: Mermaid, Mermaid },
  //       rehypePlugins: [rehypeKatex, rehypePrism],
  //     })

  //     // Add the compiled MDX as a new field on the note
  //     // await import('mdx-mermaid').default
  //     note.compiledCode = String(compiled)

  //     // console.log("!!!compiledCode", compiled.toString())
  //   }
  // }
  // compileNotes(pageContext.referredBy)

  // console.log(pageContext.referredBy)

  return (
    <Layout title={post.fields.title} type="note">
      <div className="column is-three-fifths">
        <main>
          <div className="note-area">
            <div className="buttons for-back-home">
              <Link className="button is-text button__page-back" to="/">
                <span className="icon is-small">
                  <svg
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0309 0.468998C11.1007 0.538667 11.1561 0.62143 11.1939 0.712548C11.2318 0.803665 11.2512 0.901347 11.2512 0.999998C11.2512 1.09865 11.2318 1.19633 11.1939 1.28745C11.1561 1.37857 11.1007 1.46133 11.0309 1.531L2.56038 10L11.0309 18.469C11.1717 18.6098 11.2508 18.8008 11.2508 19C11.2508 19.1992 11.1717 19.3902 11.0309 19.531C10.89 19.6718 10.699 19.7509 10.4999 19.7509C10.3007 19.7509 10.1097 19.6718 9.96887 19.531L0.968875 10.531C0.899031 10.4613 0.843616 10.3786 0.805806 10.2874C0.767997 10.1963 0.748535 10.0986 0.748535 10C0.748535 9.90135 0.767997 9.80367 0.805806 9.71255C0.843616 9.62143 0.899031 9.53867 0.968875 9.469L9.96887 0.468998C10.0385 0.399153 10.1213 0.343739 10.2124 0.305929C10.3035 0.26812 10.4012 0.248657 10.4999 0.248657C10.5985 0.248657 10.6962 0.26812 10.7873 0.305929C10.8784 0.343739 10.9612 0.399153 11.0309 0.468998Z"
                      fill="var(--text-main)"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            <h1 className="note-title">{post.fields.title}</h1>
            <div className="note-content">
              {/* <MDXRenderer>{post.body}</MDXRenderer> */}
              {/* <MDXProvider components={{ }}>
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider> */}

              <MDXProvider components={{ code: MyCode, a: TooltipLink }}>
                {children}
              </MDXProvider>
            </div>

            <div className="note-meta">
              {pageContext.referredBy.length ? (
                <div className="related note-references">
                  <h5 className="block-title">Links to this note</h5>

                  <div className="related-wrapper">
                    {pageContext.referredBy.map((note, index) => (
                      <div key={index} className="related-group block-box">
                        {/* <TooltipBacklink content={note.compiledCode}> */}
                        <TooltipLink content={note.body}>
                          <Link to={`${note.slug}`}>
                            <h4 className="related-title">{note.title}</h4>
                            {/* <MyMDX code={note.compiledCode}  style = "max-height: 300px; overflow: none"/>  */}
                            {/* { note.compiledCode } */}
                            {/* { code } */}
                            {/* <p className="related-excerpt muted-text">{note.content}</p> */}
                            {/* <p className="related-excerpt muted-text">{note.body}</p> */}
                          </Link>
                          {/* </TooltipBacklink> */}
                        </TooltipLink>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="block-area note-references">
                <h5 className="block-title">Meta</h5>
                <div className="related-wrapper block-box">
                  <div className="related-group">
                    <p className="muted-text">
                      <strong className="note-meta-title">
                        Published on:{' '}
                      </strong>{' '}
                      {moment(new Date(post.fields.date)).format(
                        'Do MMMM, YYYY'
                      )}
                    </p>
                    {post.frontmatter.source ? (
                      <Source src={post.frontmatter.source} />
                    ) : null}

                    {post.frontmatter.tags ? (
                      <div className="note-tags muted-text">
                        <strong className="note-meta-title">
                          Tagged With:{' '}
                        </strong>
                        <ul>
                          {post.frontmatter.tags.map((tag, index) => (
                            <li key={index}>
                              <Link to={`/tags/${makeSlug(tag)}`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="note-graph">
              <Graph graph={graph} options={options} events={events} />
            </div>
            <div className="note-graph">
              <D3Graph
                id="note-link-graph"
                data={d3GraphData}
                config={graphConfig}
                onClickNode={onClickNode}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function Source({ src }) {
  if (!src) return null

  // :TODO: Handle a list of sources and not just a single source

  let link = ''
  if (src.includes('<a ')) {
    // Source given as HTML Link
    link = <span dangerouslySetInnerHTML={{ __html: src }}></span>
  } else if (src.includes('](')) {
    // Source given as Markdown Link - [Text](url)
    const linkParts = src.match(/\[(.+)\]\((.+)\)/)
    if (linkParts) {
      link = (
        <a href={linkParts[2]} target="_blank" rel="noreferrer">
          {linkParts[1]}
        </a>
      )
    } else {
      return null
    }
  } else if (src.includes('[[')) {
    // Source given as Wiki Link - internal link - [[Text]]
    const titleParts = src.match(/(.+)\|(.+)/) // [[Note Name|Link Text]] format.
    if (titleParts) {
      link = <Link to={'/' + makeSlug(titleParts[2])}>{titleParts[1]}</Link>
    } else {
      const title = src.replace(new RegExp(/[\[\]]/, 'g'), '') // eslint-disable-line
      link = <Link to={'/' + makeSlug(title)}>{title}</Link>
    }
  } else {
    // Just an URL given as source
    link = (
      <a href={src} target="_blank" rel="noreferrer">
        Link to Source
      </a>
    )
  }

  return (
    <p className="muted-text">
      <strong className="note-meta-title">Source</strong>: {link}
    </p>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        title
        date
        compiledHtml
      }
      frontmatter {
        tags
        source
      }
    }
  }
`
