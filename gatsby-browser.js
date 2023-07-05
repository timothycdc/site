// export const onClientEntry = () => {
//   window.onload = () => {  // Very undependable. Fires before anything is rendered.
//     console.log('onClientEntry');
//   }
// }

import './src/styles/common/bulma.css'
import './src/styles/common/style.css'
import './src/styles/common/custom.css'
import './src/styles/common/util.css'

import 'katex/dist/katex.min.css';
import("tippy.js/dist/tippy.css");
import ('tippy.js/animations/scale.css');

import('prismjs/themes/prism.css');
import("prismjs/plugins/line-numbers/prism-line-numbers.css");
import("prismjs/plugins/command-line/prism-command-line.css");
