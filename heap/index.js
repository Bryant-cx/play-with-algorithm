class Heap {
  constructor (capacity = 10) {
    let size = 0
    let data = new Array(capacity + 1)

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
      size++
      data[size] = val
      shiftUp(size)
      
      if (size + 1 === data.length) {
        resize(data.length * 2)
      }
    }

    function shiftUp (key) {
      while (key > 1 && data[parseInt(key / 2)] < data[key]) {
        // 交换当前节点与父节点的值
        const parent = parseInt(key / 2)
        const temp = data[parent]
        data[parent] = data[key]
        data[key] = temp

        key = parent
      }
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

      // 当存储的数值只占数组的4分之一的时候，缩容一半
      if (size <= parseInt(data.length / 4) && parseInt(data.length / 2) >= 10) {
        resize(parseInt(data.length / 2))
      }
      return val
    }

    // 以当前节点为根节点，做下沉操作
    function shiftDown (key) {
      while (2 * key <= size) {
        let j = 2 * key

        if (j + 1 <= size && data[j + 1] > data[j]) {
          j++
        }

        if (data[key] >= data[j]) {
          break
        }

        // 交换key和子节点的值
        const temp = data[key]
        data[key] = data[j]
        data[j] = temp

        key = j
      }
      console.log(data)
    }

    // 对数组进行扩容或者缩容操作
    function resize (size) {
      const newArr = new Array(size + 1)

      for (let i = 1; i <= size; i++) {
        newArr[i] = data[i]
      }

      data = newArr
    }
  }
}