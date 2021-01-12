// Linear Search
//    Best case: O(1)
//    Worst case: O(n)
//    Average case: O(n)

function indexOf(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return i;
    }
  }
  return -1;
};

// Binary Search
//    Best case: O(1)
//    Worst case: O(log(n))
//    Average case: O(log(n))

function binarySearch(array, value, start, end) {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  // console.log(start, end);
  if (item == value) {
    return index;
  }
  else if (item < value) {
    return binarySearch(array, value, index + 1, end);
  }
  else if (item > value) {
    return binarySearch(array, value, start, index - 1);
  }
};

// Searching and Travesral in a tree

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key == key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  // Depth-first search (DFS)

  dfs(values = []) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  dfsPreOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }
    values.push(this.value);
    return values;
  }

  // Breadth-first search

  bfs(tree, values = []) {
    const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
      const node = queue.dequeue(); //remove from the queue
      values.push(node.value); // add that value from the queue to an array

      if (node.left) {
        queue.enqueue(node.left); //add left child to the queue
      }

      if (node.right) {
        queue.enqueue(node.right); // add right child to the queue
      }
    }

    return values;
  }
}

// 1. How many searches?

const sortedList = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18]

binarySearch(sortedList, 8)

// 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// 3, 5, 6, 8, 11
// 8, 11 Found

binarySearch(sortedList, 16)

// 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// 14, 15, 17, 18
// 14, 15
// 15 Not found

// 2. Adding a React UI

// 3. Find a book
/* Start in middle of library, then use binary search to find dewey decimal index.
    Once index is found, use binary search to find book title */

// 4. Searching in a BST

//    1)  i n-order: 14, 15, 19, 25, 27, 35, 79, 89, 90, 91
//        pre-order: 35, 25, 15, 14, 19, 27, 89, 79, 90, 91
//       post-order: 14, 19, 15, 27, 25, 79, 90, 91, 89, 35
//    2) post-order: 5, 7, 6, 9, 11, 10, 8
//        pre-order: 5, 6, 7, 8, 9, 10, 11

// 5. Implement different tree traversals

const dataset = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22]

const dfsTree = new BinarySearchTree

dataset.forEach((value) =>
  dfsTree.insert(value, value)
)

// console.log(dfsTree.dfs())
// console.log(dfsTree.dfsPreOrder())
// console.log(dfsTree.dfsPostOrder())

// 6. Find the next commanding officer

function nextCommand(bst, officers=[]) {
  if (this.right) {
    officers = nextCommand(this.right, officers)
  }
  officers.push(this.value);
  if (this.left) {
    officers = nextCommand(this.left, officers)
  }
  return officers
}

// 7. Max profit

const sharePrice = [128, 97, 121, 123, 98, 97, 105]

function findMaxProfit(array) {
  let profit = array[1] - array[0]
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i + 1] - array[i] > profit) {
      profit = array[i + 1] - array[i]
    }
  }
  return profit
}

// console.log(findMaxProfit(sharePrice))