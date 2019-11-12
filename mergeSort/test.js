// 选择排序
function selectSort (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    const temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp
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

/**
 * 用无序数组测试排序算法性能
 * @param {*} sortName 排序算法名称
 * @param {*} sort 排序算法
 * @param {*} num 排序数组长度
 * @param {*} l 测试数组元素最小值
 * @param {*} r 测试数组元素最大值
 */
function randomTest(sortName, sort, num, l = 0, r = num) {
  const arr = []
  for (let i = 0; i < num; i++) {
    // 生成【l, r】范围内的随机数
    const val = parseInt(Math.random() * (r - l)) + l
    arr.push(val)
  }

  const time1 = (new Date()).getTime()
  sort(arr)
  const time2 = (new Date()).getTime()

  // 测试是否已经完成排序
  for (let i = 1; i < num; i++) {
    if (arr[i] < arr[i - 1]) {
      throw Error('error')
    }
  }

  console.log(sortName + '用时：', (time2 - time1)/1000)
}

/**
 * 用近乎有序的数组进行排序测试
 * @param {*} sortName 排序算法名称
 * @param {*} sort 排序算法
 * @param {*} num 排序数组长度
 * @param {*} times 错序的次数
 */
function nearlySortedTest (sortName, sort, num, times) {
  const arr = []

  for (let i = 0; i < num; i++) {
    arr.push(i)
  }

  // 将生成的有序数组，交换times次，生成无序数组
  for (let j = 0; j < times; j++) {
    const a = parseInt(Math.random() * num)
    const b = parseInt(Math.random() * num)
    const temp = arr[a]
    arr[b] = arr[a]
    arr[a] = temp
  }

  const time1 = (new Date()).getTime()
  sort(arr)
  const time2 = (new Date()).getTime()

  for (let i = 1; i < num; i++) {
    if (arr[i] < arr[i - 1]) {
      throw Error('error')
    }
  }

  console.log(sortName + '用时：', (time2 - time1)/1000)
}