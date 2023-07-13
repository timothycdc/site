// NOT MY CODE, PORTED TYPESCRIPT FROM https://gatsby-theme-nicky-blog.netlify.app/


/** @jsx jsx */
import React from "react";

import Highlight, { defaultProps, Language } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import { jsx } from "theme-ui";
import { Themed } from "@theme-ui/mdx";



const aliases = {
  js: `javascript`,
  sh: `bash`,
};

const getShouldHighlightLine = (hl) => {
  if (hl) {
    const lineNumbers = rangeParser(hl);
    return (index) => lineNumbers.includes(index + 1);
  }
  return () => false;
};

const getLineNumberStart = (numberLines) => {
  let result = null;
  if (numberLines) {
    if (numberLines === `true` || numberLines === true) {
      result = 1;
    } else {
      result = parseInt(numberLines, 10);
    }
  }
  return result;
};

const CodeBlock = ({
  codeString,
  className: outerClassName,
  title,
  hl,
  numberLines,
  noCopy = false,
  ...props
}) => {
  // don't break internet explorer, do the Willy Wonka thing instead, they get NOTHING, GOOD DAY
  if (typeof window === `undefined`) {
    noCopy = true;
  } else {
    noCopy = typeof navigator.clipboard === `undefined` ? true : noCopy;
  }

  const [copied, setCopied] = React.useState(false);
  const copyLabel = copied
    ? `${title ? `${title} ` : ``}copied to clipboard`
    : `${title ? `${title}: ` : ``}copy code to clipboard`;

  // MDX will pass the language as className
  // className also includes className(s) theme-ui injected
  let language = "text";
  if (outerClassName) {
    const [outerLanguage] = outerClassName.replace(/language-/, ``).split(` `);
    language = outerLanguage;
  }

  const lang = aliases[language] || language;

  const shouldHighlightLine = getShouldHighlightLine(hl);
  const lineNumberStart = getLineNumberStart(numberLines);

  return (
    <React.Fragment>
      {title && <div sx={{ variant: `styles.CodeBlock.title` }}>{title}</div>}
      {/* this relatively positioned div exist solely for the positioning context underneath the title that doesn't horizontally scroll. */}
      <div sx={{ position: `relative` }}>
        <div
          sx={{
            overflow: `auto`,
            ":hover button:not(:disabled)": { opacity: 1 },
            variant: `styles.CodeBlock`,
            borderTopLeftRadius: title ? `0` : undefined,
            borderTopRightRadius: title ? `0` : undefined,
          }}
        >
          <Highlight
            {...defaultProps}
            {...props}
            code={codeString.trim()}
            // supported languages: https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
            language={lang}
            theme={undefined}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <Themed.pre
                className={`${outerClassName} ${className}`}
                style={style}
              >
                {noCopy ? null : (
                  <button
                    type="button"
                    name={copyLabel}
                    disabled={copied}
                    onClick={async () => {
                      await navigator.clipboard.writeText(codeString.trim());
                      setCopied(true);
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      setCopied(false);
                    }}
                    sx={{
                      position: `absolute`,
                      // positioning matches the padding inside the CodeBlock div
                      top: 2,
                      right: 2,
                      opacity: 0,
                      cursor: `pointer`,
                      variant: `styles.CodeBlock.copyButton`,
                    }}
                  >
                    {copied ? `Copied` : `Copy`}
                  </button>
                )}
                {tokens.map((line, index) => (
                  <div
                    key={index}
                    {...getLineProps({ line, key: index })}
                    sx={
                      shouldHighlightLine(index)
                        ? { variant: `styles.CodeBlock.highlightLine` }
                        : undefined
                    } 
                    
                  >
                    {lineNumberStart && (
                      <span sx={{ variant: `styles.CodeBlock.lineNumber` }}>
                        {index + lineNumberStart}
                      </span>
                    )}
                    {line.map((token, key) => (
                      <span
                        key={key}
                        {...getTokenProps({ token, key })}
                        // https://github.com/system-ui/theme-ui/pull/721
                        sx={
                          token.empty ? { display: `inline-block` } : undefined
                        }
                      />
                    ))}
                  </div>
                ))}
              </Themed.pre>
            )}
          </Highlight>
        </div>
      </div>
    </React.Fragment>
  );
};

export { CodeBlock };