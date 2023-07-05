import React, { useState, useEffect } from 'react'
import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime' // Use 'react/jsx-dev-runtime' for development.

const MyMDX = ({ code }) => {
  const [Content, setContent] = useState(null)

  useEffect(() => {
    const getMdxComponent = async () => {
      const { default: mdxComponent } = await run(code, runtime)
      setContent(() => mdxComponent)
    }

    getMdxComponent()
  }, [code])

  if (!Content) {
    return <div>Loading...</div>
  }

  return <Content />
}

export default MyMDX

// import React, { useEffect, useState } from 'react';
// import * as runtime from 'react/jsx-runtime';
// import { run } from '@mdx-js/mdx';

// const components = [
//   /** ...some custom components used in MDX files */
// ];

// export default function MyMDX({ code }) {
//   const [MdxComponent, setMdxComponent] = useState(null);

//   useEffect(() => {
//     let isMounted = true;
//     (async () => {
//       const result = await run(code, runtime);
//       if (isMounted) {
//         setMdxComponent(() => result);
//       }
//     })();
    
//     return () => {
//       isMounted = false;
//     };
//   }, [code]);

//   if (!MdxComponent) return null;

//   return <MdxComponent components={components} />;
// }
