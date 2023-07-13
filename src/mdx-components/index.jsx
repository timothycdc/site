/** @jsx jsx */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { jsx } from "theme-ui";
import { Aside } from "../components/aside";
import { CodeBlock } from "../components/codeblock";



const preToCodeBlock = (preProps) => {
  if (preProps?.children?.props) {
    const {
      children: codeString,
      className = ``,
      ...props
    } = preProps.children.props;
    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className: className,
      language: match !== null ? match[1] : ``,
      ...props,
    };
  }

  return undefined;
};

const MdxComponents = {
  Aside: (props) => <Aside {...props} />,
  pre: (preProps) => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <CodeBlock {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },

};

export default MdxComponents;