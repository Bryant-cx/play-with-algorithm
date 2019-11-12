// 归并排序
function mergeSort (arr) {
  __mergeSort(arr, 0, arr.length - 1)
}

// 自底向上的归并排序
function mergeSortBU (arr) {
  for (let sz = 1; sz < arr.length; sz += sz) {
    for (let i = 0; i + sz < arr.length; i += sz * 2) {
      __merge(arr, i, i + sz - 1, Math.min(i + 2 * sz - 1, arr.length - 1))
    }
  }
}

// 对【l，r】区间内的元素进行排序
function __mergeSort (arr, l, r) {

  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }

  const mid = parseInt(l + (r - l)/2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  
  if (arr[mid] > arr[mid + 1]) {
    __merge(arr, l, mid, r)
  }
}

// 对【l，r】区间内的元素进行归并
function __merge (arr, l, mid, r) {
  const tempArr = []
  let i = l
  let j = mid + 1

  for (let i = l; i <=r; i++) {
    tempArr[i - l] = arr[i]
  }

  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = tempArr[j - l]
      j++
    } else if (j > r) {
      arr[k] = tempArr[i - l]
      i++
    } else if (tempArr[i - l] <= tempArr[j - l]) {
      arr[k] = tempArr[i - l]
      i++
    } else {
      arr[k] = tempArr[j - l]
      j++
    }
  }
}

// 对数组arr[l, r]区间内的元素进行插入排序
function __insertSort(arr, l, r) {
  for (let i = l; i <= r; i++) {
    const val = arr[i]
    let j
    for (j = i; j > l && arr[j - 1] > val; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = val
  }
}