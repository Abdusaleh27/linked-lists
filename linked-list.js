/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    }
    this.tail.next = node;
    this.tail = node;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (this.length === 0) {
      this.push(val);
      return;
    }
    const newHead = new Node(val);
    const currentHead = this.head;
    this.head = newHead;
    this.head.next = currentHead;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) return;

    const prevNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return prevNode.val;
    }

    while (prevNode.next !== this.tail) {
      prevNode = prevNode.next;
    }
    const deletedNode = this.tail;
    this.tail = prevNode;
    prevNode.next = null;
    this.length -= 1;
    return deletedNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) return;
    if (this.length === 1) return this.pop();
    let newHead = this.head.next;
    let deletedHead = this.head;
    this.head = newHead;
    this.length -= 1;
    return deletedHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx > this.length - 1) return new Error("Invalid index");
    let counter = -1;
    let nodeVal = null;
    let currentNode = this.head;
    while (currentNode) {
      counter += 1;
      if (counter === idx) {
        nodeVal = currentNode.val;
        break;
      }
      currentNode = currentNode.next;
    }
    return nodeVal;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx > this.length - 1) return new Error("Invalid index");
    let counter = -1;
    let currentNode = this.head;
    while (currentNode) {
      counter += 1;
      if (counter === idx) {
        currentNode.val = val;
        break;
      }
      currentNode = currentNode.next;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) return new Error("Invalid index");
    if (idx === 0) {
      this.unshift(val);
      return;
    }

    let tail = this.tail;
    let newNode = new Node(val);
    if (idx === this.length) {
      this.push(val);
      return;
    }

    let currentNode = this.head;
    let prevNode = this.head;
    let counter = -1;
    while (currentNode.next) {
      //[1,2,3,4] counter=3 , prevNode = 3, currentNode = 4;
      counter += 1;
      if (counter === idx) break;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    prevNode.next = newNode;
    newNode.next = currentNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx > this.length - 1) return new Error("Invalid index");
    let removedVal = this.getAt(idx);

    if (idx === 0) {
      return this.shift();
    }

    if (idx === this.length - 1) return this.pop();

    let prev = this.head;
    let current = this.head;
    let counter = -1;
    while (current.next) {
      counter += 1;
      if (counter === idx) break;
      prev = current;
      current = current.next;
    }
    prev.next = current.next;
    this.length -= 1;
    return removedVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let currentNode = this.head;
    while (currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    return sum / this.length;
  }
}

module.exports = LinkedList;
