function quickSort (arr) {
  __quickSort(arr, 0, arr.length - 1)
}

function __quickSort (arr, l, r) {
  if (l >= r) {
    return
  }
  const p = partition(arr, l, r)
  __quickSort(arr, l, p)
  __quickSort(arr, p + 1, r)
}

// 获取首元素排序完之后所处的索引
function partition (arr, l, r) {
  const val = arr[l]
  let j = l

  // 遍历完之后，[l + 1, j]区间内的值小于val，[j + 1, i)区间内的元素大于val
  for (let i = j + 1; i <= r; i++) {
    if (arr[i] < val) {
      const temp = arr[j + 1]
      arr[j + 1] = arr[i]
      arr[i] = temp
      j++
    }
  }

  arr[l] = arr[j]
  arr[j] = val
  return j
}