// 选择排序
function selectSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i + 1
    for (let j = i + 2; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    if (arr[minIndex] < arr[i]) {
      const temp = arr[minIndex]
      arr[minIndex] = arr[i]
      arr[i] = temp
    }
  }
}

// 插入排序
function insertSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    const val = arr[i]
    let j

    for (j = i; j > 0 && arr[j - 1] > val; j--) {
      arr[j] = arr[j - 1]
    }

    arr[j] = val
  }
}

// 冒泡排序
function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j ++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    const temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp
  }
}

// 归并排序
function mergeSort (arr) {
  __mergeSort(arr, 0, arr.length - 1)
}

// 对数组【l, r】区间内的元素进行排序
function __mergeSort (arr, l, r) {
  // 元素较少的时候使用插入排序
  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }

  const mid = l + parseInt((r - l)/2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  if (arr[mid] > arr[mid + 1]) {
    __merge(arr, l, mid, r)
  }
}

// 对数组【l, r】区间内的元素进行归并
function __merge (arr, l, mid, r) {
  const tempArr = []

  for (let i = l; i <=r; i++) {
    tempArr[i - l] = arr[i]
  }

  let i = l
  let j = mid + 1

  for (let k = l; k <= r; k++) {
    // 左侧已经选完
    if (i > mid) {
      arr[k] = tempArr[j - l]
      j++
    } else if (j > r) {
      // 右侧已经选完
      arr[k] = tempArr[i - l]
      i++
    } else if (tempArr[i - l] < tempArr[j - l]) {
      arr[k] = tempArr[i - l]
      i++
    } else {
      arr[k] = tempArr[j - l]
      j++
    }
  }
}

// 对数组[l, r]区间内的元素进行插入排序
function __insertSort (arr, l, r) {
  for (let i = l + 1; i <= r; i++) {
    const val = arr[i]
    let j

    for (j = i; j > l && arr[j - 1] > val; j--) {
      arr[j] = arr[j - 1]
    }

    arr[j] = val
  }
}

// 自底向上的归并排序
function mergeSortBU (arr) {
  for (let sz = 1; sz <= arr.length; sz += sz) {
    for (let i = 0; i + sz < arr.length; i += 2 * sz) {
      if (arr[i + sz - 1] > arr[i + sz]) {
        __merge(arr, i, i + sz - 1, Math.min(i + sz + sz - 1, arr.length - 1))
      }
    }
  }
}

// 数组是否已经完成了排序
function isSorted (arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      console.error(i)
      return false
    }
  }

  return true
}

// 快速排序
function quickSort (arr) {
  __quickSort(arr, 0, arr.length - 1)
}

function __quickSort (arr, l, r) {
  // 递归到底的条件
  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }
  // 找到首元素排序完成后所处的索引
  const index = partition (arr, l, r)

  // 再对index前面的部分和后面的部分分别进行快速排序
  __quickSort(arr, l, index - 1)
  __quickSort(arr, index + 1, r)
}

// 返回arr[l]在排序完成之后的索引
function partition (arr, l, r) {
  const temp = arr[l]
  const random = parseInt(Math.random() * (r - l)) + l
  // 先交换l和random的值，防止性能退化为O(n2)级别
  // 如果每次只取首元素作为参考值，在对近乎有序的数组进行排序时，性能会退化为O(n2)级别
  arr[l] = arr[random]
  arr[random] = temp

  const val = arr[l]
  let j = l

  // 遍历过程中，[l + 1, j]区间内的元素小于val，[j + 1, i)区间内的元素大于val
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < val) {
      const temp = arr[i]
      arr[i] = arr[j + 1]
      arr[j + 1] = temp
      j++
    }
  }

  arr[l] = arr[j]
  arr[j] = val
  return j
}

/**
 * 随机数组测试排序方法的性能
 * @param {*} sortName 排序方法
 * @param {*} sort 排序函数
 * @param {*} num 数据量
 * @param {*} times 随机交换的次数，传了这个参数表示进行近乎有序的数组进行测试
 */
function testSort(sortName, sort, num, times = null) {
  const arr = []

  for (let i = 0; i < num; i++) {
    if (times) {
      arr[i] = i
    } else {
      const val = Math.ceil(Math.random() * num)
      arr.push(val)
    }
  }

  if (times) {
    for (let i = 0; i < times; i++) {
      const a = Math.floor(Math.random() * num)
      const b = Math.floor(Math.random() * num)
      const temp = arr[a]

      arr[a] = arr[b]
      arr[b] = temp
    }
  }

  console.log(arr)

  const time1 = (new Date()).getTime()
  sort(arr)
  const time2 = (new Date()).getTime()

  console.log(arr)

  if (!isSorted(arr)) {
    throw Error(sortName + ' error!')
  }

  console.log(sortName + '用时：', (time2 - time1) / 1000)
}

function test (num, times = null) {
  testSort('selectSort', selectSort, num, times)
  testSort('insertSort', insertSort, num, times)
  testSort('bubbleSort', bubbleSort, num, times)
  testSort('mergeSort', mergeSort, num, times)
  testSort('quickSort', quickSort, num, times)
}