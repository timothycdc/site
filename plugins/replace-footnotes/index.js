var visit = require('unist-util-visit');
// console.log("hey")

function replaceFootnotes() {
  return (tree) => {
    console.log("ran")
    visit(tree, 'heading', (node, index, parent) => {
      if (node.children[0].value === 'Footnotes') {
        parent.children.splice(index, 1, {
          type: 'html',
          value: '<hr>',
        });
      }
    });
  };
}

module.exports = replaceFootnotes;
