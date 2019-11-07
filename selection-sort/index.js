// 插入排序
function selectionSort (arr) {
  if (!arr || arr.length === 0) {
    throw Error('error')
  }

  for (let i = 0; i < arr.length; i++) {
    const minIndex = getMinIndex(arr, i, arr.length)

    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }

  return arr
}

// 插入排序
function insertSort (arr) {
  if (!arr || arr.length === 0) {
    throw Error('error')
  }

  for (let i = 1; i < arr.length; i++) {
    
    const val = arr[i]
    let j
    for (j = i; j > 0 && arr[j - 1] > val; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = val
  }

  return arr
}

// 冒泡排序
// 每次遍历都取到剩余元素中的最小值，从而像泡泡往上冒一样完成排序
function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }

  return arr
}

// 获取arr[l, r)区间内索引最小的值
function getMinIndex (arr, l, r) {
  let res = l

  for (let i = l+1; i < r; i++) {
    if (arr[i] < arr[res]) {
      res = i
    }
  }

  return res
}

// 数组是否是有序的
function isSorted (arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false
    }
  }

  return true
}

// 测试排序
function testSort (sortName, sort, num) {
  const arr = []

  for (let i = 0; i < num; i++) {
    const val = Math.ceil(Math.random() * 5)

    arr.push(val)
  }

  const time1 = (new Date()).getTime()
  sort(arr)
  const time2 = (new Date()).getTime()

  if (!isSorted(arr)) {
    throw Error('error')
  }

  console.log(sortName + '用时：', (time2 - time1) / 1000)
}

// 近乎有序的数组排序
function nearlySortedTest (sortName, sort, num, switchTimes) {
  let arr = []

  for (let i = 0; i < num; i++) {
    arr[i] = i
  }

  for (let i = 0; i < switchTimes; i++) {
    const a = Math.ceil(Math.random() * num)
    const b = Math.ceil(Math.random() * num)
    const temp = arr[a]

    arr[a] = arr[b]
    arr[b] = temp
  }

  const time1 = (new Date()).getTime()
  arr = sort(arr)
  const time2 = (new Date()).getTime()

  if (!isSorted(arr)) {
    throw Error('error')
  }

  console.log(sortName + '用时：', (time2 - time1) / 1000)
}
