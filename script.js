import prettyPrint from './pretty-print.js'
import Tree from './Tree.js'

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

console.log(tree.height(3))
console.log(tree.depth(3))
console.log(tree.isBalanced())

tree.insert(100)
tree.insert(101)
tree.insert(102)

console.log(tree.isBalanced())

prettyPrint(tree.root)

tree.rebalance()
console.log(tree.isBalanced())

prettyPrint(tree.root)
