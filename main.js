
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        this.array = array;
        this.root = this.buildTree(array);
    }

    buildTree(array){
        const uniqueArray = [...new Set(array)];
        const sortedArray = uniqueArray.sort((a, b) => a - b);

        if(sortedArray.length === 0){
            return null;
        }

        const mid = Math.floor(sortedArray.length / 2);
        const node = new Node(sortedArray[mid]);

        node.left = this.buildTree(sortedArray.slice(0, mid));
        node.right = this.buildTree(sortedArray.slice(mid + 1));

        return node;
    }


}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(testTree.root);