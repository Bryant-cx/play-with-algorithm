class BSTTree {
  constructor () {
    class Node {
      constructor (key = null, val = null) {
        this.key = key
        this.val = val
        this.left = null
        this.right = null
      }
    }

    let root = null
    let size = 0

    // bst是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // bst的节点数
    this.getSize = () => {
      return size
    }

    // 向bst中添加元素
    this.add = (key, val) => {
      if (!key || !val) {
        throw Error('key and val are both required')
      }

      root = addNode(root, key, val)
    }

    // 向以node为根节点的二分搜索树中添加节点（key, val）
    function addNode (node, key, val) {
      if (!node) {
        size++
        return new Node(key, val)
      }

      if (key < node.key) {
        node.left = addNode(node.left, key, val)
        return node
      }

      if (key > node.key) {
        node.right = addNode(node.right, key, val)
        return node
      }

      if (key === node.key) {
        node.val = val
        return node
      }
    }

    // 查找最小节点
    function getMinNode (node) {
      if (!node) {
        return node
      }

      while (node.left) {
        node = node.left
      }

      return node
    }

    // 查找最大节点
    function getMaxNode (node) {
      if (!node) {
        return node
      }

      while (node.right) {
        node = node.right
      }

      return node
    }

    // 删除最小节点
    this.removeMin = () => {
      root = removeMinNode(root)
    }

    // 删除最大节点
    this.removeMax = () => {
      root = removeMaxNode(root)
    }

    // 删除以node为根节点的二分搜索树的最小节点
    function removeMinNode (node) {
      if (!node) {
        return null
      }

      if (!node.left) {
        const rightNode = node.right
        node.right = null
        size--

        return rightNode
      }

      node.left = removeMinNode(node.left)
      return node
    }

    // 删除以node为根节点的二分搜索树的最大节点
    function removeMaxNode (node) {
      if (!node) {
        return null
      }

      if (!node.right) {
        const leftNode = node.left
        node.left = null
        size--

        return leftNode
      }

      node.right = removeMaxNode(node.right)
      return node
    }

    // 删除任意节点
    this.remove = (key) => {
      root = removeNode(root, key)
    }

    // 删除node为根节点的二分搜索树中索引为key的节点
    function removeNode (node, key) {
      if (!node) {
        return null
      }

      if (key < node.key) {
        node.left = removeNode (node.left, key)
        return node
      } else if (key > node.key) {
        node.right = removeNode (node.right, key)
        return node
      } else { // key === node.key
        if (!node.left) {
          const rightNode = node.right
          node.right = null
          size--
          return rightNode
        }

        if (!node.right) {
          const leftNode = node.left
          node.left = null
          size--
          return leftNode
        }

        const min = getMinNode(node.right)
        const succsor = new Node(min.key, min.val)
        succsor.left = node.left
        succsor.right = removeMinNode(node.right)
        return succsor
      }
    }
  }
}