function heapify (arr) {
  let size = arr.length

  for (let i = parseInt((arr.length - 2) / 2); i >=0; i--) {
    shiftDown(arr, i)
  }
}

function shiftDown (arr, key) {
  while (2 * key + 1 <= arr.length - 1) {
    let j = 2 * key + 1

    if (j + 1 <= arr.length - 1 && arr[j] < arr[j + 1]) {
      j++
    }

    if (arr[j] <= arr[key]) {
      break
    }

    // 交换arr[j]和arr[key]的值
    const temp = arr[j]
    arr[j] = arr[key]
    arr[key] = temp

    key = j
  }
}