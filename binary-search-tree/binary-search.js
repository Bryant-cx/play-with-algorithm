// 从一个有序数组中查找元素val
function binarySearch (arr, val) {
  let l = 0
  let r = arr.length - 1

  // 在[l, r]区间内查找元素val
  while (l <= r) {
    const mid = l + parseInt((r - l)/2)

    if (arr[mid] === val) {
      return mid
    }

    if (val < arr[mid]) {
      r = mid - 1
    } else {
      // val > arr[mid]
      l = mid + 1
    }

    return -1
  }
}

// 二分查找法的非递归实现
function bsNR (arr, val) {
  return __bsNR(arr, val, 0, arr.length - 1)
}

// 在[l, r]区间内查找val
function __bsNR (arr, val, l, r) {
  if (r > l) {
    return -1
  }

  const mid = l + parseInt((r - l)/2)
  if (arr[mid] === val) {
    return mid
  }

  if (val < arr[mid]) {
    return __bsNR(arr, val, l, mid - 1)
  } else {
    return __bsNR(arr, val, mid + 1, r)
  }
}