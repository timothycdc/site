/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import React from "react";


import { graphql, Link, navigate } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import MdxComponents from '../mdx-components'
import LinkGraph from '../components/linkgraph'
import { TableOfContentsList } from '../components/toc'
// import Graph from 'react-graph-vis'
// import rehypeKatex from 'rehype-katex'
// import remarkMath from 'remark-math'
import Tooltip from '../components/tooltip'
// import TooltipBacklink from '../components/tooltipbacklink'
import Layout from '../layout/layout'
// import '../styles/note.css'
import '../styles/graph.css'
// import MyMDX from '../components/mymdx'
// import { compileSync } from '@mdx-js/mdx'
// const remarkWikiLink = require('remark-wiki-link')
const makeSlug = require('../utils/make-slug')
const moment = require('moment')
// const remarkGfm = require('remark-gfm')

let titles = []
const makeId = title => {
  titles.push(title)
  return title
}

const nodeExists = title => {
  return titles.includes(title)
}

export default function Note({ pageContext, data, children, ...props}) {
  const post = data.mdx
  console.log('post', post)

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

  // Links to the current Note
  for (let i = 0; i < pageContext.referredBy.length; i++) {
    const refNoteTitle = pageContext.referredBy[i].title

    d3GraphData.nodes.push({
      id: refNoteTitle,
      color: 'black',
      slug: pageContext.referredBy[i].slug,
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
  for (let i = 0; i < pageContext.refersTo.length; i++) {
    const refNoteTitle = pageContext.refersTo[i]

    d3GraphData.nodes.push({
      id: refNoteTitle,
      color: 'black',
      slug: pageContext.refersTo[i].slug,
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

  const TooltipLink = props => {
    let title = null
    if (props.children) {
      title = props.children.toString().toLowerCase()
    }
    let linkedNoteLink = pageContext.linkedNotes[title] || null

    if (props.href) {
      if (props.href.includes('http')) {
        return <a {...props} />
      } else if (props.href.includes('mailto')) {
        return <a {...props} />
      } else if (props.href.includes('#')) {
        return <a {...props} />
      } else if (
        !pageContext.linkedNotes ||
        typeof props.children !== 'string'
      ) {
        return <a {...props} />
      } else if (linkedNoteLink) {
        // console.log('linkedNoteLink!!!', linkedNoteLink)
        return (
          <>
            <Tooltip content={linkedNoteLink.excerpt.toString()}>
              <Link {...props} to={`${props.href}`} title="" />
            </Tooltip>
          </>
        )
      }
      return (
        <>
          <Tooltip content={linkedNoteLink.excerpt.toString()}>
            <Link {...props} to={`/${props.href}`} title="" />
          </Tooltip>
        </>
      )
    } else if (props.content) {
      return (
        <Tooltip content={props.content}>
          <Link {...props} to={`/${props.href}`} title="" />
        </Tooltip>
      )
    }
    return <a {...props} />
  }

  // const MyCode = props => (
  //   <code style={{ fontFamily: `monospace`, fontWeight: 500 }} {...props} />
  // )

  return (
    <React.Fragment>
    <Layout title={post.fields.title} type="note" {...props} >
      <div className="wrapper" >
        <main>
          <Box sx={{m:8}} className="note-area">
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

            <div className="top-box" sx={{ mt: 10 }}>
              <h1 className="note-title">{post.fields.title}</h1>
              <div>
                <h2>ToC is set to {post.fields.showToc ? 'True' : 'False'} </h2>
                <TableOfContentsList tableOfContents={post.tableOfContents} />
              </div>
            </div>

            <div className="note-content">
              <MDXProvider components={{ ...MdxComponents, a: TooltipLink }}>
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
                        <TooltipLink
                          content={note.excerpt}
                          title={note.title}
                          date={note.date}
                        >
                          <Link to={`${note.slug}`}>
                            <h4 className="related-title">{note.title}</h4>
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
              <LinkGraph graphData={d3GraphData} />
            </div>
          </Box>
        </main>
      </div>
    </Layout>
    </React.Fragment>
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
        slug
        showToc
      }
      tableOfContents
      frontmatter {
        tags
        source
      }
    }
  }
`
