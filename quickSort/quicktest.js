// 快速排序的性能测试
function quickSort (arr) {
  __quickSort(arr, 0, arr.length - 1)
}

function __quickSort (arr, l, r) {
  if (r - l <= 15) {
    __insertSort(arr, l, r)
    return
  }

  const p = partition (arr, l, r)
  __quickSort(arr, l, p - 1)
  __quickSort(arr, p + 1, r)
}

// 返回一个索引，这个索引是首元素排序完成之后的索引
// 保证索引前面的值都小于它，后面的元素均大于等于它
function partition (arr, l, r) {
  // 首先取得一个随机索引，将该索引处的值与arr[l]进行交换，确保性能
  const random = parseInt(Math.random() * (r - l)) + l
  const val = arr[random]

  arr[random] = arr[l]
  arr[l] = val

  // [l + 1, lt]区间内的元素小于val，[lt + 1, i)区间内的元素大于val
  let lt = l

  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < val) {
      // 交换arr[lt + 1]和arr[i]，然后lt和i分别递增一位
      const temp = arr[i]
      arr[i] = arr[lt + 1]
      arr[lt + 1] = temp

      lt++
    }
  }

  // 交换arr[l]和arr[lt]的值
  arr[l] = arr[lt]
  arr[lt] = val

  return lt
}

// 对[l, r]区间内的元素进行插入排序
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
  const random = parseInt(Math.random() * (r - l)) + l
  const val = arr[random]
  arr[random] = arr[l]
  arr[l] = val

  // [l + 1, lt)区间内的元素小于等于val
  // (gt, r] 区间内的元素大于等于val
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

// 三路快排
function quickSort3Ways (arr) {
  __quickSort3Ways(arr, 0, arr.length - 1)
}

function __quickSort3Ways (arr, l, r) {
  if (r - l <= 15) {
    __insertSort (arr, l, r)
    return
  }

  // partition
  const random = parseInt(Math.random() * (r - l)) + l
  const val = arr[random]
  arr[random] = arr[l]
  arr[l] = val

  // [l + 1, lt]区间内的元素小于val
  // [lt + 1, i)区间内的元素等于val
  // [gt, r]区间内的元素大于val
  let lt = l
  let gt = r + 1
  let i = l + 1

  while (i < gt) {
    if (arr[i] < val) {
      // 交换arr[lt + 1]和arr[i]的值
      const temp = arr[lt + 1]
      arr[lt + 1] = arr[i]
      arr[i] = temp

      i++
      lt++
    } else if (arr[i] > val) {
      // 交换arr[gt - 1]和arr[i]的值
      const temp = arr[gt - 1]
      arr[gt - 1] = arr[i]
      arr[i] = temp
      
      gt--
    } else {
      i++
    }
  }

  // 交换arr[lt]和arr[l]的值
  arr[l] = arr[lt]
  arr[lt] = val

  __quickSort3Ways(arr, l, lt - 1)
  __quickSort3Ways(arr, gt, r)
}

// 生成一个随机数组, round表示是否有大量重复元素
function getRandomArr (num, round = num) {
  const arr = []

  for (let i = 0; i < num; i++) {
    const val = Math.floor(Math.random() * round)

    arr.push(val)
  }

  return arr
}

// 生成一个近乎有序的数组
function getNearlySortedArr(num, times) {
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

// 测试排序函数性能
function test (sort, arr) {
  // console.log(arr)
  const time1 = (new Date()).getTime()
  sort(arr)
  const time2 = (new Date()).getTime()

  // console.log(arr)

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      throw Error('error')
    }
  }

  return (time2 - time1) / 1000
}