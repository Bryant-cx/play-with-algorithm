class UnionFind3 {
  constructor (n) {
    const parent = new Array(n)
    const size = n
    const sz = new Array(n)

    for (let i = 0; i < n; i++) {
      parent[i] = i
      sz[i] = 1
    }

    // 查找索引p的根节点
    this.find = (p) => {
      if (p < 0 || p >= size) {
        throw Error('p out of bound')
      }

      while (p !== parent[p]) {
        p = parent[p]
      }
      return p
    }

    // 索引p所在的区间和索引q所在的区间是否相连
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

      if (sz[pRoot] > sz[qRoot]) {
        parent[qRoot] = pRoot
        sz[pRoot] += sz[qRoot]
      } else {
        parent[pRoot] = qRoot
        sz[qRoot] += sz[pRoot]
      }
    }
  }
}