function createNode(value, left, right) {
  return {
    value: value,
    left: left,
    right: right,
  };
}

let tree1 = [];
let tree2 = [];
let nodesWithoutAndChild = 0;
let depthOfTree = 0;

function initTree() {
  tree1 = createNode(
    5,
    createNode(3, createNode(2), createNode(5)),
    createNode(
      7,
      createNode(1),
      createNode(0, createNode(2), createNode(8, undefined, createNode(5)))
    )
  );
  console.log(tree1);
}
initTree();

function initTree2() {
  tree2 = createNode(
    5,
    createNode(3, createNode(2), createNode(5)),
    createNode(
      7,
      createNode(1),
      createNode(
        0,
        createNode(2),
        createNode(8, undefined, createNode(5, undefined, createNode(2)))
      )
    )
  );
  console.log(tree2);
}
initTree2();

walkTree(tree1, 0);
walkTree(tree2, 0);

function walkTree(tree, level) {
  if (tree == undefined) {
    return;
  }

  let spacer = "";
  for (let i = 0; i < level; i++) {
    spacer += ".";
  }

  console.log(spacer + "value:", tree.value);

  if (tree.left == undefined && tree.right == undefined) {
    console.log(spacer + "(no children)");
    nodesWithoutAndChild++;
  }

  depthOfTree = Math.max(depthOfTree, level);

  if (tree.left !== undefined) {
    walkTree(tree.left, level + 1);
  }

  if (tree.right !== undefined) {
    walkTree(tree.right, level + 1);
  }
}

console.log("");
console.log("nodes without any children: ", nodesWithoutAndChild);
console.log("tree depth (largest number of edges): ", depthOfTree);

function compareTrees(tree1, tree2) {
  //compare tree1 against tree2
  return (
    compareTreesInner(tree1, tree2, 0) &&
    //compare tree2 against tree1, to not miss any additional leaves
    compareTreesInner(tree2, tree1, 0)
  );
}

function compareTreesInner(tree1, tree2, level) {
  if (tree1 == undefined && tree2 == undefined) {
    //both are NIL leaves
    return true;
  }

  if (tree1?.value != tree2?.value) {
    let spacer = "";
    for (let i = 0; i < level; i++) {
      spacer += ".";
    }

    console.log(
      spacer +
        "trees differ at level: " +
        level +
        " tree1 value: " +
        tree1?.value +
        " tree2 value: " +
        tree2?.value
    );
    return false;
  }

  let leftResult = true;
  if (tree1.left !== undefined) {
    leftResult = compareTreesInner(tree1.left, tree2.left, level + 1);
  }

  let rightResult = true;
  if (tree1.right !== undefined) {
    rightResult = compareTreesInner(tree1.right, tree2.right, level + 1);
  }

  return leftResult && rightResult;
}

console.log("trees equal: ", compareTrees(tree1, tree2));
console.log(
  "trees equal (may miss additional leaves): ",
  compareTreesInner(tree1, tree2, 0)
);
console.log(
  "trees equal (may miss additional leaves): ",
  compareTreesInner(tree2, tree1, 0)
);
