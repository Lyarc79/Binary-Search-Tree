
const {Tree} = require('./main');

function generateRandomNumbers(size){
    const numbers = [];
    for(let i = 0; i < size; i++){
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}

function getTraversalOutput(traversalMethod){
    const output = [];
    traversalMethod(node => output.push(node.data));
    return output.join(', ');
}

function main(){
    // Creating tree with random numbers
    const randomNumbers = generateRandomNumbers(20);
    console.log("Random Numbers:", randomNumbers);
 
    // Creating and checking if it's balanced
    const myTree = new Tree(randomNumbers);
    console.log("Is the tree balanced?", myTree.isBalanced());

    // Printing all elements in different orders
    console.log("Level Order:", getTraversalOutput(callback => myTree.levelOrder(callback)));
    console.log("Pre Order:", getTraversalOutput(callback => myTree.preOrder(callback)));
    console.log("In Order:", getTraversalOutput(callback => myTree.inOrder(callback)));
    console.log("Post Order:", getTraversalOutput(callback => myTree.postOrder(callback)));

    // Unbalancing the tree
    console.log("Adding numbers to unbalance the tree...")
    myTree.insert(125);
    myTree.insert(240);
    myTree.insert(328);
    console.log("Is the tree balanced?", myTree.isBalanced());

    // Rebalancing the tree
    console.log("Rebalancing the tree...");
    myTree.rebalance();
    console.log("Is the tree balanced?", myTree.isBalanced());

    // Printing again all orders
    console.log("Traversal Orders after Rebalancing:");
    console.log("Level Order:", getTraversalOutput(callback => myTree.levelOrder(callback)));
    console.log("Pre Order:", getTraversalOutput(callback => myTree.preOrder(callback)));
    console.log("In Order:", getTraversalOutput(callback => myTree.inOrder(callback)));
    console.log("Post Order:", getTraversalOutput(callback => myTree.postOrder(callback)));
}

main();