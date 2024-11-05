
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

    insert(value){
      const newNode = new Node(value);
      if(this.root === null){
        this.root = newNode;
        return;
      }
      const insertRecursive = (node, newNode) => {
        if(newNode.data < node.data){
          if(node.left === null){
            node.left = newNode;
          } else {
            insertRecursive(node.left, newNode);
          }
        } else if(newNode.data > node.data){
          if(node.right === null){
            node.right = newNode;
          } else {
            insertRecursive(node.right, newNode);
          }
        }
      };
      insertRecursive(this.root, newNode);
    }

    deleteItem(value){
      const deleteRecursive = (node, value) => {
        if(node === null) return node;
        if(value < node.data){
          node.left = deleteRecursive(node.left, value);
        } else if(value > node.data){
          node.right = deleteRecursive(node.right, value);
        } else {
          if(node.left === null && node.right === null){
            return null;
          }
          if(node.left === null) return node.right;
          if(node.right === null) return node.left;
          let minNode = this.findMin(node.right);
          node.data = minNode.data;
          node.right = deleteRecursive(node.right, minNode.data);
        }
        return node;
      };
      this.root = deleteRecursive(this.root, value);
    }
    
    findMin(node){
      while(node.left !== null){
        node = node.left;
      }
      return node;
    }

    find(value){
      const findRecursive = (node, value) =>  {
        if(node === null) return null;
        if(node.data === value) return node;
        if(value < node.data){
          return findRecursive(node.left, value);
        } else{
          return findRecursive(node.right, value);
        }
      };
      return findRecursive(this.root, value); 
    }

    levelOrder(callback){
      if(typeof callback !== 'function'){
        throw new Error('A callback function is required.');
      }
      let queue = [];
      if(this.root) queue.push(this.root);
      while(queue.length > 0){
        let currentNode = queue.shift();
        callback(currentNode);
        if(currentNode.left) queue.push(currentNode.left);
        if(currentNode.right) queue.push(currentNode.right);
      }
    }

    inOrder(callback, node = this.root){
      if(typeof callback !== 'function'){
        throw new Error('A callback function is required.');
      }
      if(node !== null){
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
      }
    }

    preOrder(callback, node = this.root){
      if(typeof callback !== 'function'){
        throw new Error('A callback function is required.');
      }
      if(node !== null){
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
      }
    }

    postOrder(callback, node = this.root){
      if(typeof callback !== 'function'){
        throw new Error('A callback function is required.');
      }
      if(node !== null){
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
      }
    }

    height(node){
      if(node === null) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node){
      let current = this.root;
      let depth = 0;
      while(current !== null){
        if(current === node){
          return depth;
        } else if(node.data < current.data){
          current = current.left;
        } else{
          current = current.right;
        }
        depth++;
      }
      return -1;
    }

    isBalanced(){
      const checkBalance = (node) => {
        if(node === null) {
          return {height: -1, balanced: true};
        }
        const left = checkBalance(node.left);
        const right = checkBalance(node.right);
        const height = Math.max(left.height, right.height) + 1;
        const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
        return {height, balanced};
      }
      return checkBalance(this.root).balanced;
    }

    rebalance(){
      if(this.isBalanced()) return;
      let values = [];
      this.inOrder(node =>{
        values.push(node.data);
      })
      this.root = buildTree(values);
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