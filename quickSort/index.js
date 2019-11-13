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

// 双路快排
function quickSort2 (arr) {
  __quickSort2(arr, 0, arr.length - 1)
}

function __quickSort2 (arr, l, r) {
  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }

  const p = partition2(arr, l, r)

  __quickSort2(arr, l, p - 1)
  __quickSort2(arr, p + 1, r)
}

function partition2 (arr, l, r) {
  // 先选取一个随机位置，跟l位置值对调，防止在近乎有序的
  const random = parseInt(Math.random() * (r - l) + l)
  const val = arr[random]
  arr[random] = arr[l]
  arr[l] = val

  // 在[l + 1, lt)区间内的元素小于等于val，区间(gt, r]区间内的元素大于等于val
  let lt = l + 1
  let gt = r

  while (true) {
    while (lt <= r && arr[lt] < val) {
      lt++
    }

    while (gt > lt && arr[gt] > val) {
      gt--
    }

    if (lt > gt) {
      break
    }

    const temp = arr[lt]
    arr[lt] = arr[gt]
    arr[gt] = temp
    lt++
    gt--
  }

  arr[l] = arr[gt]
  arr[gt] = val

  return gt
}