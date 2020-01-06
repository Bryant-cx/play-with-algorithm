class UnionFind1 {
  constructor (n) {
    const arr = new Array(n)
    const size = n

    for (let i = 0; i < n; i++) {
      arr[i] = i
    }

    // 查找元素p对应的值
    this.find = (p) => {
      if (p < 0 || p >= size) {
        throw Error('p out of bound')
      }

      return arr[p]
    }

    // 索引p和索引q对应的值是否相等
    this.isConnected = (p, q) => {
      return this.find(p) === this.find(q)
    }

    // 合并索引p和索引q对应的区间
    this.union = (p, q) => {
      const pVal = this.find(p)
      const qVal = this.find(q)

      if (pVal === qVal) {
        return
      }

      for (let i = 0; i < size; i++) {
        if (arr[i] === pVal) {
          arr[i] = qVal
        }
      }
    }
  }
}