class UnionFind2 {
  constructor (n) {
    const parent = new Array(n)
    const size = n

    for (let i = 0; i < n; i++) {
      parent[i] = i
    }

    // 查找索引p对应的根节点的值
    this.find = (p) => {
      if (p < 0 || p >= size) {
        throw Error('p out of bound')
      }

      while (p !== parent[p]) {
        p = parent[p]
      }

      return p
    }

    // 索引p和索引q是否是相连的
    this.isConnected = (p, q) => {
      return this.find(p) === this.find(q)
    }

    // 合并索引p所在的区间和索引q所在的区间
    this.union = (p, q) => {
      const pRoot = this.find(p)
      const qRoot = this.find(q)

      if (pRoot === qRoot) {
        return
      }

      parent[qRoot] = pRoot
    }
  }
}