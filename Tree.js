class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr)
  }

  sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null

    let mid = start + Math.floor((end - start) / 2)

    let root = new Node(arr[mid])

    root.left = this.sortedArrayToBSTRecur(arr, start, mid - 1)

    root.right = this.sortedArrayToBSTRecur(arr, mid + 1, end)

    return root
  }

  buildTree(arr) {
    const sortedArr = arr.sort((a, b) => a - b)
    const uniqueSortedArr = [...new Set(sortedArr)]

    return this.sortedArrayToBSTRecur(uniqueSortedArr, 0, uniqueSortedArr.length - 1)
  }

  insert(value) {
    this.root = this._insertRec(this.root, value)
  }

  _insertRec(node, value) {
    if (node == null) return new Node(value)

    if (value < node.data) {
      node.left = this._insertRec(node.left, value)
    } else if (value > node.data) {
      node.right = this._insertRec(node.right, value)
    }

    return node
  }

  getSuccessor(curr) {
    curr = curr.right
    while (curr !== null && curr.left !== null) {
      curr = curr.left
    }
    return curr
  }

  deleteItemFrom(root, value) {
    if (root === null) {
      return root
    }

    if (root.data > value) {
      root.left = this.deleteItemFrom(root.left, value)
    } else if (root.data < value) {
      root.right = this.deleteItemFrom(root.right, value)
    } else {
      if (root.left === null) return root.right

      if (root.right === null) return root.left

      let succ = this.getSuccessor(root)
      root.data = succ.data
      root.right = this.deleteItemFrom(root.right, succ.data)
    }
    return root
  }

  find(value) {
    const search = (node, value) => {
      if (node === null) return null
      if (node.data === value) return node
      return value < node.data ? search(node.left, value) : search(node.right, value)
    }

    return search(this.root, value)
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required.')
    }

    const queue = []
    if (this.root !== null) queue.push(this.root)

    while (queue.length > 0) {
      const current = queue.shift()
      callback(current)

      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
    }
  }

  levelOrderRec(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required.')
    }

    const queue = []
    if (this.root !== null) queue.push(this.root)

    const traverse = () => {
      if (queue.length === 0) return

      const current = queue.shift()
      callback(current)

      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)

      traverse()
    }

    traverse()
  }

  _validateCallback(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required.')
    }
  }

  inOrder(callback) {
    this._validateCallback(callback)

    const traverse = (node) => {
      if (node === null) return

      traverse(node.left)
      callback(node)
      traverse(node.right)
    }

    traverse(this.root)
  }

  preOrder(callback) {
    this._validateCallback(callback)

    const traverse = (node) => {
      if (node === null) return

      callback(node)
      traverse(node.left)
      traverse(node.right)
    }

    traverse(this.root)
  }

  postOrder(callback) {
    this._validateCallback(callback)

    const traverse = (node) => {
      if (node === null) return

      traverse(node.left)
      traverse(node.right)
      callback(node)
    }

    traverse(this.root)
  }

  height(value) {
    const findNode = (node, value) => {
      if (node === null) return null
      if (node.data === value) return node
      return value < node.data ? findNode(node.left, value) : findNode(node.right, value)
    }

    const computeHeight = (node) => {
      if (node === null) return -1
      return 1 + Math.max(computeHeight(node.left), computeHeight(node.right))
    }

    const target = findNode(this.root, value)
    return target === null ? null : computeHeight(target)
  }

  depth(value) {
    const findDepth = (node, value, currentDepth = 0) => {
      if (node === null) return null
      if (node.data === value) return currentDepth
      return value < node.data
        ? findDepth(node.left, value, currentDepth + 1)
        : findDepth(node.right, value, currentDepth + 1)
    }

    return findDepth(this.root, value)
  }

  isBalanced() {
    const check = (node) => {
      if (node === null) return { balanced: true, height: -1 }

      const left = check(node.left)
      const right = check(node.right)

      const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1

      return {
        balanced,
        height: 1 + Math.max(left.height, right.height),
      }
    }

    return check(this.root).balanced
  }

  rebalance() {
    const nodes = []

    this.inOrder((node) => nodes.push(node.data))

    this.root = this.buildTree(nodes)
  }
}

export default Tree
