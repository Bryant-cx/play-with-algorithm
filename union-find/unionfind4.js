class UnionFind4 {
  constructor (n) {
    const parent = new Array(n)
    const size = n
    const rank = new Array(n)

    for (let i = 0; i < n; i++) {
      parent[i] = i
      rank[i] = 1
    }

    // 查找索引p对应的根节点
    this.find = (p) => {
      if (p < 0 || p >= size) {
        throw Error('p out of bound')
      }
    }

    // 索引p和索引q对应的区间是否相连
    this.isConnected = (p, q) => {
      return this.find(p) === this.find(q)
    }

    // 合并索引p和索引q所在的区间
    this.union = (p, q) => {
      const pRoot = this.find(p)
      const qRoot = this.find(q)

      if (pRoot === qRoot) {
        return
      }

      if (rank[pRoot] < rank[qRoot]) {
        parent[pRoot] = qRoot
      } else if (rank[pRoot] > rank[qRoot]) {
        parent[qRoot] = pRoot
      } else {
        parent[qRoot] = pRoot
        rank[pRoot]++
      }
    }
  }
}