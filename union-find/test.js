function testUnionFind (UnionFind, n) {
  const unionFind = new UnionFind(n)
  const time1 = (new Date()).getTime()

  for (let i = 0; i < n; i++) {
    const val = Math.floor(Math.random() * num)
    unionFind.find(val)
  }

  for (let i = 0; i < n; i++) {
    const p = Math.floor(Math.random() * num)
    const q = Math.floor(Math.random() * num)

    unionFind.isConnected(p, q)
  }

  for (let i = 0; i < n; i++) {
    const p = Math.floor(Math.random() * num)
    const q = Math.floor(Math.random() * num)

    unionFind.union(p, q)
  }

  const time2 = (new Date()).getTime()

  return (time2 - time1) / 1000
}