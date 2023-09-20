import { tailwind } from '@theme-ui/presets'
import nightOwlLight from '@theme-ui/prism/presets/night-owl-light.json'

const theme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 1, 2, 3, 4, 8, 10, 16, 32, 64, 128, 256, 512],
  smallGap: 5,
  mediumGap: 10,
  largeGap: 20,
  extraLargeGap: 40,
  breakpoints: [40, 52, 64].map(n => n + 'em'),
  Layout: {
    backgroundColor: `background`,
    color: `text`,
    fontFamily: `Inter`, // from tailwind styles
    fontSize: 1,
    lineHeight: `text`,
  },
  colors: {
    text: `#232129`,
    mutedText: `#535454`,
    background: `#F5DDCC`,
    mutedBackground: `#f6f6f6`,
    primary: `#343743`,
    mutedPrimary: `#A0C0DD`,
    borderPrimary: `#71788C`,
  },
  fonts: {
    body: `Inter, sans-serif`,
    heading: `Inter, sans-serif`,
    special: `Libre Baskerville, serif`,
  },

  textStyles: {
    special: {
      fontFamily: 'special',
      fontStyle: 'italic',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
  },

  sizes: {
    lineLength: `70ch`,
  },
  styles: {
    root: {
      margin: 0,
      fontFamily: `Inter, sans-serif`,
    },
    Layout: {
      backgroundColor: `background`,
      color: `text`,
      fontFamily: `Inter, sans-serif`,
      fontSize: 1,
      lineHeight: `text`,
    },
    Header: {
      backgroundColor: `primary`,
      color: `background`,
      fontWeight: `bold`,
      margin: 0,
      borderBottom: `1px solid`,
      borderColor: `mutedPrimary`,
      h1: {
        display: `block`,
        fontSize: 3,
        margin: `0 auto`,
        maxWidth: `lineLength`,
        padding: 3,
        width: `90vw`,
        color: `inherit`,
      },
      a: {
        color: `inherit`,
        border: `none`,
        ':hover': {
          color: `inherit`,
          borderColor: `inherit`,
        },
      },
    },
    Main: {
      margin: `0 auto`,
      width: `90vw`,
    },
    Note: {
      'note-area': {
        margin: '10px',
      },
    },
    CodeBlock: {
      ...nightOwlLight,
      fontFamily: `monospace`,
      fontSize: 14,
      padding: 2,
      borderRadius: 10,
      pre: {
        fontFamily: `monospace`,
        backgroundColor: `transparent`,
        float: `left`,
        minWidth: `100%`,
        margin: 0,
      },
      highlightLine: {
        // match padding on entire CodeBlock <div>
        // padding: 2 == padding: "0.5rem"
        backgroundColor: `#f0f0f0`,
        borderLeftColor: `#49d0c5`,
        borderLeftStyle: `solid`,
        borderLeftWidth: `0.25rem`,
        display: `block`,
        marginRight: `-0.5rem`,
        marginLeft: `-0.5rem`,
        paddingRight: `0.5rem`,
        paddingLeft: `0.25rem`,
      },
      title: {
        fontFamily: `monospace`,
        backgroundColor: nightOwlLight.backgroundColor,
        borderBottomWidth: `2px`,
        borderBottomStyle: `solid`,
        borderBottomColor: `#f0f0f0`,
        color: nightOwlLight.color,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: `0`,
        borderBottomRightRadius: `0`,
        padding: 2,
        fontSize: `0.7em`,
        marginTop: 2,
      },
      lineNumber: {
        display: `inline-block`,
        // to support numbers with 3 digits, swap to table layout: https://codesandbox.io/s/prism-react-renderer-example-u6vhk?file=/src/styles.js
        width: `2ch`,
        textAlign: `right`,
        userSelect: `none`,
        opacity: 0.3,
        marginRight: 2,
      },
      copyButton: {
        userSelect: `none`,
        textTransform: `uppercase`,
        backgroundColor: `transparent`,
        border: `none`,
        color: nightOwlLight[`.comment`].color,
        fontFamily: `Inter, sans-serif`,
        fontSize: `1em`,
        paddingX: `4px`,
        paddingY: `2px`,
        transition: `all 0.3s ease-in-out`,
        borderWidth: `1px`,
        borderColor: `transparent`,
        borderStyle: `solid`,
        borderRadius: `3px`,
        ':hover': {
          borderColor: nightOwlLight.color,
          color: nightOwlLight.color,
        },
        ':disabled': { opacity: 0.5, cursor: `not-allowed` },
      },
    },
    code: {
      fontSize: `inherit`,
      fontFamily: `monospace`,
      letterSpacing: `wide`,
      backgroundColor: `mutedBackground`,
      padding: 1,
      borderRadius: `10`,
    },
    a: {
      color: `mutedText`,
      borderBottomWidth: `2px`,
      borderBottomStyle: `solid`,
      borderBottomColor: `mutedPrimary`,
      textDecoration: `none`,
      transition: `all 0.1s ease-in-out`,
      ':hover': {
        textDecoration: `none`,
        color: `mutedPrimary`,
        borderBottomWidth: `2px`,
        borderBottomStyle: `solid`,
        borderBottomColor: `primary`,
      },
      '&.anchor.before': {
        borderBottomWidth: `0px !important`,
      },
      '&.basic': {
        borderBottom: `none`,
        color: `text`,
        ':hover': {
          color: `inherit`,
        },
      },
    },

    'note-content': {
      fontSize: 2,
    },
    TableOfContentsList: {
      link: {
        color: `mutedText`,
        textDecoration: `none`,
        ':hover': {
          variant: `styles.a`,
        },
        active: {
          variant: `styles.a`,
          color: `mutedPrimary`,
        },
      },
    },

    blockquote: {
      margin: 0,
      paddingLeft: 3,
      borderLeftWidth: 5,
      borderLeftColor: `mutedPrimary`,
      borderLeftStyle: `solid`,
      backgroundColor: `mutedBackground`,
    },

    h1: {
      '.note-title': {
        margin: 5,
        // Add more styles as needed
      },
    },
  },
}

export default theme
