// const replaceFootnotes = require('./plugins/replace-footnotes')
const { rehypeMetaAsAttributes } = require(`./src/utils/plugin`)
module.exports = {
  // Gatsby Config
  // pathPrefix: `/notes`, // If your Digital Garden is not published at the root of your website, use this. Use `npm run build -- --prefix-paths` when building.
  trailingSlash: 'never', // Remove all trailing slashes on each URL, e.g. /x/ to /x

  siteMetadata: {
    title: `Timo's Website`,
    description: `A digital garden portfolio`,

    // siteUrl: `https://yoursite.com/notes/`, // URL at which your site will be published. This should be present if you want RSS feed.
    // headerMenu: [ // Top Navbar items
    //   {type: 'page', item: '', title: 'Home'}, // Type can be 'page', 'note', 'tag', or 'link'
    //   {type: 'page', item: 'sitemap', title: 'Sitemap'},
    //   {type: 'page', item: 'rss.xml', title: 'RSS'},
    //   {
    //     type: 'page', item: 'tags', title: 'Tags',
    //     menu: [ // Only one level depth, please.
    //       {type: 'tag',item: 'zettelkasten'},
    //       {type: 'tag',item: 'philosophy'},
    //       {type: 'tag',item: 'psychology'},
    //       {type: 'tag',item: 'rationality'},
    //     ]
    //   },
    // ],

    // menu: [ // This is the Table of Contents that comes in the home page if a Home Note is not specified. It can be much longer than the header menu.
    //   ... Same structure as headerMenu. You can have any depth level - multiple menus can be nested.
    // ],

    hoverPreview: true, // If true, shows the content of an internal link in a tooltip when hovering over the link.
  },
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    // `gatsby-plugin-dark-mode`,     "gatsby-plugin-dark-mode": "^1.5.2",
    // { // Enable this if you want to have an RSS Feed. The `siteMetadata.siteUrl` property should be present for this to work
    //   // Also, you'll need to install this library. To do that, run the command `npm install gatsby-plugin-feed-mdx --save` in the same directory as this gatsby-config.js file.
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMdx } }) => {
    //           return allMdx.edges.map(edge => {
    //             return Object.assign({}, edge.node.fields, {
    //               description: edge.node.excerpt,
    //               date: edge.node.fields.date,
    //               url: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               custom_elements: [{ "content:encoded": edge.node.html }]
    //             });
    //           });
    //         },
    //         query: `
    //           {
    //             allMdx(
    //               limit: 20,
    //               sort: { order: DESC, fields: [fields___date] },
    //             ) {
    //               edges {
    //                 node {
    //                   excerpt
    //                   html
    //                   fields { slug date title }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/rss.xml",
    //         title: "RSS Feed",
    //       }
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/_notes/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        mdxOptions: {
          remarkPlugins: [
            require(`remark-gfm`),
            [
              require(`remark-wiki-link`),
              { hrefTemplate: permalink => `/${permalink}` },
            ],
          ],
          rehypePlugins: [rehypeMetaAsAttributes],
        },
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          //   {
          //     resolve: `gatsby-remark-wiki-links`,
          //     options: {
          //       slugify: `${__dirname}/src/utils/make-slug.js`,
          //       stripBrackets: true
          //     }
          //  },

          // `gatsby-remark-prismjs-title`,
          // {
          //   resolve: `gatsby-transformer-remark`,
          //   options: {
          //     // Footnotes mode (default: true)
          //     footnotes: true,
          //     // GitHub Flavored Markdown mode (default: true)
          //     gfm: true,
          //     plugins: []
          //   },
          // },
          {
            resolve: 'gatsby-remark-mermaid',
            options: {
              svgo: {
                plugins: [{ name: 'removeTitle', active: false }],
              },
              mermaidOptions: {
                theme: 'base',
                useMaxWidth: false,
                themeVariables: {
                  fontFamily: 'inherit',
                },
                sequence: {
                  actorFontFamily: 'inherit',
                  noteFontFamily: 'inherit',
                  messageFontFamily: 'inherit',
                  fontFamily: 'inherit',
                  useMaxWidth: false,
                },
                journey: {
                  taskFontFamily: 'inherit',
                  useMaxWidth: false,
                  fontFamily: 'inherit',
                },
                flowchart: {
                  useMaxWidth: false,
                  fontFamily: 'inherit',
                },
                pie: {
                  useMaxWidth: true,
                  fontFamily: 'inherit',
                },
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          // {
          //   resolve: `gatsby-remark-table-of-contents-patch`,
          //   options: {
          //     exclude: 'Table of Contents',
          //     tight: false,
          //     ordered: false,
          //     fromHeading: 1,
          //     toHeading: 6,
          //     className: 'table-of-contents',
          //   },
          // },
          `gatsby-remark-autolink-headers`,
          // `gatsby-remark-prismjs-copy-button`,
          // {
          //   resolve: `gatsby-remark-prismjs`,
          //   options: {
          //     // Class prefix for <pre> tags containing syntax highlighting;
          //     // defaults to 'language-' (e.g. <pre class="language-js">).
          //     // If your site loads Prism into the browser at runtime,
          //     // (e.g. for use with libraries like react-live),
          //     // you may use this to prevent Prism from re-processing syntax.
          //     // This is an uncommon use-case though;
          //     // If you're unsure, it's best to use the default value.
          //     classPrefix: 'language-',
          //     // This is used to allow setting a language for inline code
          //     // (i.e. single backticks) by creating a separator.
          //     // This separator is a string and will do no white-space
          //     // stripping.
          //     // A suggested value for English speakers is the non-ascii
          //     // character '›'.
          //     inlineCodeMarker: null,
          //     // This lets you set up language aliases.  For example,
          //     // setting this to '{ sh: "bash" }' will let you use
          //     // the language "sh" which will highlight using the
          //     // bash highlighter.
          //     aliases: {},
          //     // This toggles the display of line numbers globally alongside the code.
          //     // To use it, add the following line in gatsby-browser.js
          //     // right after importing the prism color scheme:
          //     //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
          //     // Defaults to false.
          //     // If you wish to only show line numbers on certain code blocks,
          //     // leave false and use the {numberLines: true} syntax below
          //     showLineNumbers: true,
          //     // If setting this to true, the parser won't handle and highlight inline
          //     // code used in markdown i.e. single backtick code like `this`.
          //     noInlineHighlight: true,
          //     // This adds a new language definition to Prism or extend an already
          //     // existing language definition. More details on this option can be
          //     // found under the header "Add new language definition or extend an
          //     // existing language" below.
          //     languageExtensions: [
          //       {
          //         language: 'superscript',
          //         extend: 'javascript',
          //         definition: {
          //           superscript_types: /(SuperType)/,
          //         },
          //         insertBefore: {
          //           function: {
          //             superscript_keywords: /(superif|superelse)/,
          //           },
          //         },
          //       },
          //     ],
          //     // Customize the prompt used in shell output
          //     // Values below are default
          //     prompt: {
          //       user: 'root',
          //       host: 'localhost',
          //       global: false,
          //     },
          //     // By default the HTML entities <>&'" are escaped.
          //     // Add additional HTML escapes by providing a mapping
          //     // of HTML entities and their escape value IE: { '}': '&#123;' }
          //     escapeEntities: {},
          //   },
          // },
          `gatsby-plugin-remark-footnotes`,

          // {
          //   resolve: require.resolve('./plugins/replace-code-blocks'),
          //   options: {},
          // },
          //   options: {
          //     titleToURL: require(`${__dirname}/src/utils/make-slug.js`)
          //   }
          // },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          // {
          //   resolve: 'gatsby-remark-obsidian',
          // },
        ],
      },
    },

    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css?family=Inter:400,500,600,700&text=%09%20$%25%27()+,-.0123456789:;?@ABCDEFGHIKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz%E2%80%93%E2%80%94%E2%80%99%E2%80%9C%E2%80%9D%E2%86%92`,
            // specify custom glyphs for inter arrows https://github.com/google/fonts/issues/2382
          },
          {
            name: `DM Mono`,
            file: `https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,500;1,300;1,500&display=swap`,
          },
          {
            name: `Libre Baskerville`,
            file: `https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap`,
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     // printRejected: true, // Print removed selectors and processed file names. Use for debugging.
    //     // develop: true, // Enable while using `gatsby develop`
    //     // tailwind: true, // Enable tailwindcss support
    //     ignore: ['tippy.js/', 'tooltip.css'], // Ignore files/folders
    //     // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
    //     purgeCSSOptions: {
    //       safelist: ['.tippy-box'], // Don't remove this selector
    //     },
    //     // More options defined here https://purgecss.com/configuration.html#options
    //   },
    // },

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'notes_index',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended for advanced users.
        // Note: Only the flexsearch engine supports options.
        engineOptions: {
          present: 'speed',
          tokenize: 'forward',
        },

        // GraphQL query used to fetch all data for the search index. This is required.
        query: `
          {
            allMdx(filter: {
                fields: { visibility: { eq: "public" } }
              }) {
              nodes {
                id
                fields {
                  title
                  slug
                  excerpt
                }
                frontmatter {
                  tags
                }
                body
                excerpt
              }
            }
          }
        `,

        // query: `
        //   {
        //     allMdx(filter: {
        //         fields: { visibility: { eq: "public" } }
        //       }) {
        //       nodes {
        //         id
        //         fields {
        //           title
        //           slug
        //           excerpt
        //         }
        //         frontmatter {
        //           tags
        //         }
        //         rawBody
        //         excerpt
        //       }
        //     }
        //   }
        // `,

        // Field used as the reference value for each document. Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the normalizer function below.
        // Default: all fields
        index: ['title', 'body', 'tags'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'slug', 'title', 'excerpt'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.fields.title,
            excerpt: node.fields.excerpt ? node.fields.excerpt : node.excerpt,
            tags: node.frontmatter.tags,
            body: node.body,
          })),
      },
    },
  ],
}
// data.allMdx.nodes.map(node => ({
//   id: node.id,
//   slug: node.fields.slug,
//   title: node.fields.title,
//   excerpt: node.fields.excerpt ? node.fields.excerpt : node.excerpt,
//   tags: node.frontmatter.tags,
//   body: node.rawBody,
// })),
