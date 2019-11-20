// 获取一个随机数组
function getRandomArr (num, range = num) {
  const arr = []

  for (let i = 0; i < num; i++) {
    const val = parseInt(Math.random() * range)

    arr.push(val)
  }

  return arr
}

// 获取一个近乎有序的数组
function getNearlySortedArr (num, times) {
  const arr = []

  for (let i = 0; i < num; i++) {
    arr[i] = i
  }

  for (let i = 0; i < times; i++) {
    const a = Math.floor(Math.random() * num)
    const b = Math.floor(Math.random() * num)
    const temp = arr[a]

    arr[a] = arr[b]
    arr[b] = temp
  }

  return arr
}

// 选择排序
function selectSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]
    let minIndex = i + 1

    for (let j = i + 2; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    if (arr[minIndex] < val) {
      arr[i] = arr[minIndex]
      arr[minIndex] = val
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

// 插入排序
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

// 归并排序
function mergeSort (arr) {
  __mergeSort(arr, 0, arr.length - 1)
}

function __mergeSort (arr, l, r) {
  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }

  const mid = l + parseInt((r - l) / 2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  
  if (arr[mid] > arr[mid + 1]) {
    __merge(arr, l, mid, r)
  }
}

function __merge(arr, l, mid, r) {
  const tempArr = []

  for (let i = l; i <= r; i++) {
    tempArr[i - l] = arr[i]
  }

  let lt = l
  let gt = mid + 1
  for (let i = l; i <= r; i++) {
    if (lt > mid) {
      arr[i] = tempArr[gt]
      gt++
    } else if (gt > r) {
      arr[i] = tempArr[lt]
      lt++
    } else if (arr[lt] < arr[gt]) {
      arr[i] = arr[lt]
      lt++
    } else {
      arr[i] = arr[gt]
      gt++
    }
  }
}

// 自底向上的归并排序
function mergeSortBU (arr) {
  for (let sz = 1; sz <= arr.length; sz += sz) {
    for (let i = 0; i + sz < arr.length - 1; i += sz * 2) {
      __merge(arr, i, i + sz - 1, Math.min(i + 2 * sz - 1, arr.length - 1))
    }
  }
}

// 快速排序
function quickSort (arr) {
  __quickSort(arr, 0, arr.length - 1)
}

function __quickSort (arr, l, r) {
  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }

  // 将数组分为两段使得[l, mid - 1]小于arr[mid];[mid + 1, r]大于arr[mid]
  const mid = partition (arr, l, r)
  __quickSort(arr, l, mid - 1)
  __quickSort(arr, mid + 1, r)
}

// 获取arr[l]排序完成之后的索引
function partition (arr, l, r) {
  // 先随机交换arr[l]的位置，防止在对近乎有序的数组排序时性能退化
  const random = parseInt(Math.random() * (r - l)) + l
  const val = arr[random]

  arr[random] = arr[l]
  arr[l] = val

  // [l + 1, lt]区间内的元素小于val
  // [lt + 1, i)区间内的元素大于val
  let lt = l
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < val) {
      // 交换arr[lt + 1] 和 arr[i]的值
      const temp = arr[lt + 1]
      arr[lt + 1] = arr[i]
      arr[i] = temp

      lt++
    }
  }

  // 交换arr[l]和arr[lt]的位置
  arr[l] = arr[lt]
  arr[lt] = val

  return lt
}

// 双路快速排序，主要是处理有大量重复元素的排序
function quickSort2 (arr) {
  __quickSort2 (arr, 0, arr.length - 1)
}

function __quickSort2 (arr, l, r) {
  if (l >= r) {
    // __insertSort(arr, l, r)
    return
  }

  const mid = partition2 (arr, l, r)
  __quickSort2 (arr, l, mid - 1)
  __quickSort2 (arr, mid + 1, r)
}

function partition2 (arr, l, r) {
  // 先随机交换arr[l]的位置，防止对近乎有序数组排序时性能退化
  const random = parseInt(Math.random() * (r - l)) + l
  const val = arr[random]

  arr[random] = arr[l]
  arr[l] = val

  // [l + 1, lt)区间内的元素小于等于val
  // (gt, r]区间内的元素大于等于val
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

    // 交换arr[lt]和arr[gt]的值
    const temp = arr[lt]
    arr[lt] = arr[gt]
    arr[gt] = temp

    lt++
    gt--
  }

  // 交换arr[l]和arr[gt]的值
  arr[l] = arr[gt]
  arr[gt] = val

  return gt
}

// 三路快排
function quickSort3Ways (arr) {
  __quickSort3Ways (arr, 0, arr.length - 1)
}

function __quickSort3Ways (arr, l, r) {
  if (r - l <= 15) {
    __insertSort (arr, l, r)
    return
  }

  // 先随机交换arr[l]的位置，防止在对近乎排序的数组进行排序时性能退化
  const random = parseInt(Math.random() * (r - l)) + l
  const val = arr[random]

  arr[random] = arr[l]
  arr[l] = val

  // [l+1, lt]区间内的元素小于val
  // [lt+1, i)区间内的元素等于val
  // [gt, r]区间内的元素大于val
  let lt = l
  let i = l + 1
  let gt = r + 1

  while (i < gt) {
    if (arr[i] < val) {
      // 交换arr[lt + 1]和arr[i]的值
      const temp = arr[lt + 1]
      arr[lt + 1] = arr[i]
      arr[i] = temp

      lt++
      i++
    } else if (arr[i] > val) {
      // 交换arr[gt - 1]和arr[i]的值
      const temp = arr[gt - 1]
      arr[gt - 1] = arr[i]
      arr[i] = temp

      gt--
    } else { // arr[i] === val
      i++
    }
  }

  // 交换arr[lt]和arr[l]的位置
  arr[l] = arr[lt]
  arr[lt] = val

  __quickSort3Ways (arr, l, lt - 1)
  __quickSort3Ways (arr, gt, r)
}

// 是否排序完成
function isSorted (arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false
    }
  }

  return true
}

// 堆排序
class Heap {
  constructor (param) {
    let size = 0
    let data = []

    if (typeof param === 'number') {
      data = new Array(param + 1)
    } else {
      heapify(param)
    }

    // 获取堆中元素个数
    this.getSize = () => {
      return size
    }

    // 堆是否为空
    this.isEmpty = () => {
      return size === 0
    }

    // 向堆中添加元素
    this.add = (val) => {
      if (size === data.length - 1) {
        resize(data.length * 2)
      }

      size++
      data[size] = val
      shiftUp(size)
    }

    // 从堆中出堆一个元素
    this.extract = () => {
      if (size === 0) {
        return
      }

      const val = data[1]
      data[1] = data[size]
      size--
      shiftDown(1)

      if (parseInt(data.length / 4) >= size && parseInt(data.length / 2) >= 10) {
        resize(parseInt(data.length / 2))
      }

      return val
    }

    // 对数组进行容量调整
    function resize (newSize) {
      const arr = new Array(newSize + 1)

      for (let i = 1; i <= size; i++) {
        arr[i] = data[i]
      }

      data = arr
    }

    // 对堆中的元素进行上浮
    function shiftUp (key) {
      const val = data[key]
      while (key > 1) {
        const parent = parseInt(key / 2)

        if (data[parent] < val) {
          data[key] = data[parent]
          key = parent
        } else {
          break
        }
      }

      data[key] = val
    }

    // 对堆中的元素进行下沉操作
    function shiftDown (key) {
      const val = data[key]

      while (key <= size) {
        let child = key * 2

        if (child + 1 <= size && data[child + 1] > data[child]) {
          child++
        }

        if (data[child] > val) {
          data[key] = data[child]
          key = child
        } else {
          break
        }
      }

      data[key] = val
    }

    // 将数组转化成最大堆
    function heapify (arr) {
      size = arr.length

      for (let i = 0; i < arr.length; i++) {
        data[i + 1] = arr[i]
      }

      for (let i = parseInt(size / 2); i > 0; i--) {
        shiftDown(i)
      }
    }
  }
}

// 堆排序
function heapSort (arr) {
  const heap = new Heap(arr.length)

  for (let i = 0; i < arr.length; i++) {
    heap.add(arr[i])
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = heap.extract()
  }
}

// 堆排序
function heapSort2 (arr) {
  const heap = new Heap(arr)

  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = heap.extract(i)
  }
}

// 原地堆排序
function heapSort3 (arr) {
  let n = arr.length
  for (let i = parseInt((n - 1) / 2); i >= 0; i--) {
    __shiftDown(arr, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    // 交换arr[0]和arr[i]
    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp

    __shiftDown(arr, i, 0)
  }
}

// 对数组进行下沉操作
function __shiftDown (arr, n, key) {
  const val = arr[key]

  while (2 * key + 1 < n) {
    let child = 2 * key + 1

    if (child + 1 < n && arr[child + 1] > arr[child]) {
      child++
    }

    if (arr[child] > val) {
      arr[key] = arr[child]
      key = child
    } else {
      break
    }
  }
  arr[key] = val
}

// 获取排序时间
function testSort (sort, arr) {
  const time1 = (new Date()).getTime()
  sort(arr)
  const time2 = (new Date()).getTime()

  if (!isSorted(arr)) {
    console.error('error')
  }

  return (time2 - time1) / 1000
}

// 测试排序算法性能
function test () {
  // 测试普通随机数组
  const num = 10000
  const times = 10
  const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  const arr1 = getRandomArr(num)
  const arr2 = getRandomArr(num)
  const arr3 = getRandomArr(num)
  const arr4 = getRandomArr(num)
  const arr5 = getRandomArr(num)
  const arr6 = getRandomArr(num)
  const arr7 = getRandomArr(num)
  const arr8 = getRandomArr(num)
  const arr9 = getRandomArr(num)

  console.log('选择排序：', testSort(selectSort, arr1))
  console.log('插入排序：', testSort(insertSort, arr2))
  console.log('归并排序：', testSort(mergeSort, arr3))
  console.log('快速排序：', testSort(quickSort, arr4))
  console.log('双路快速排序：', testSort(quickSort2, arr5))
  console.log('三路快速排序：', testSort(quickSort3Ways, arr6))
  console.log('堆排序：', testSort(heapSort, arr7))
  console.log('堆排序2：', testSort(heapSort2, arr8))
  console.log('原地堆排序：', testSort(heapSort3, arr9))
}