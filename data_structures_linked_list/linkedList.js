/*
Problem - Implement the LinkedList Data Structure in Javascript
*/

/**
 * The class represents a Linked List
 * 1 variable, that is the head of the list
 * 3 functions, traverse, append and delete
 */
class LinkedList {
    /**
     * @private
     * The head is the begining of the Linked List
     */
    head

    /**
     * @param {Node} head - the list can have a head to start with
     */
    constructor(head = undefined) {
        this.head = head
    }

    /** This function inserts after position */
    __insertAtPosition(value, position) {
        // Edge case for invalid position
        if (this.length() < position) {
            console.error("Given position is bigger than length of list")
            return false
        }

        /** Just so we don't manipulate position directly (to print later) */
        let n = position

        // Loop until curr reaches required location
        let curr = this.head
        while (n > 1) {
            curr = curr.next
            n -= 1
        }

        // Add a new node right after curr
        const newNode = new Node(value)
        newNode.next = curr.next
        curr.next = newNode

        console.log(value + "inserted at position" + position)
        return true
    }

    __insertAtTheEnd(value) {
        if (!this.head) {
            this.head = new Node(value)
            console.log(value + " inserted")
            return true
        }

        let curr = this.head
        while (curr.next) {
            curr = curr.next
        }

        curr.next = new Node(value)
        console.log(value + " inserted")
        return true
    }

    /**
     * The traverse function prints the entire list
     */
    traverse() {
        if (this.length() === 0) {
            console.log("Nothing to traverse :(")
            return
        }
        let curr = this.head
        process.stdout.write("The list is: ")
        while (curr) {
            process.stdout.write(curr.value + " ")
            curr = curr.next
        }

        process.stdout.write("\n")
    }

    /**
     * @param  {Number, Number (optional)} args 
     * The first param is for value of the Node to be appended
     * The second param (optional) is for specifying the position to add to
     */
    append(...args) {
        // If no arguments, return
        if (args.length === 0) {
            console.error("No arguments provided!")
            return false
        }

        // If value to be added is not a number, return
        if (!typeof args[0] === "number") {
            console.error("Given value is not a number")
            return false
        }

        // If Position is provided, use it to add at that point
        if (args.length === 2) {
            return this.__insertAtPosition(args[0], args[1])
        }

        // If position is not provided, add at the back
        return this.__insertAtTheEnd(args[0])
    }

    /**
     * @param  {Number (optional)} args 
     * @returns {Boolean} - Successfull or not
     * Deletes the last element by default,
     * User can provide an element to be deleted
     */
    delete(...args) {
        if (!this.head) {
            console.error("List is empty!")
            return false
        }

        // If the element is provided, Search and delete that.
        if (args[0]) {

            // value stores the element for easier access
            const value = args[0]

            // If element is the head
            if (this.head.value === value) {
                this.head = this.head.next
                console.log(value + " has been removed from the list")
                return true
            }

            let curr = this.head.next
            let prev = this.head
            while (curr) {
                if (curr.value === value) {
                    prev.next = curr.next
                    console.log(value + " has been removed from the list")
                    return true
                }
                prev = curr
                curr = curr.next
            }

            console.error("Given Number was not found in the List!")
            return false
        }

        if (!this.head) {
            console.log("List is already empty!")
            return false
        }

        if (!this.head.next) {
            console.log(this.head.value + " has been removed from the list")
            this.head = null
            return true
        }

        let curr = this.head
        while (curr.next.next) {
            curr = curr.next
        }

        console.log(curr.next.value + " has been removed from the list")
        curr.next = null
        return true
    }


    /**
     * @returns {Number} - Length of the list
     */
    length() {
        let count = 0
        let curr = this.head

        while (curr) {
            count += 1
            curr = curr.next
        }

        return count
    }

    /**
     * @param {Number} value 
     * @returns {Number / Boolean} - The element's index, or false
     */
    search(value) {
        let curr = this.head
        let count = 0
        while (curr) {
            count += 1
            if (curr.value === value) {
                return count
            }
            curr = curr.next
        }
        return false
    }
}

/**
 * Data Structure for representing every Node in the list
 */
class Node {
    /**
     * @private
     * @type {any}
     */
    value

    /**
     * Builds a node with a value
     * @param {any} value The value of the Linked List Node
     * @throws {Error} When no value is provided
     */
    constructor(value) {
        if (value === undefined) throw Error("You must provide a value.")

        this.value = value
        this.next = null
    }

    /**
     * Testing function
     */
    static testNodeCreation() {
        // Node with no Data
        // const node1 = new Node()

        // Node with Numeric data
        const node2 = new Node(2)

        // Node with another Node as it's data
        // This is possible right here because the Node should be generalized
        // It will not be allowed in the Linked List class
        const node3 = new Node(new Node(3))
    }

    /**
     * @returns
     */
    get getNodeData() {
        return this.value
    }

    /**
     * @param {any} value
     */
    set setNodeData(value) {
        if (value === undefined) throw Error("You must provide a value.")
        this.value = value
    }
}

Node.testNodeCreation()
// Testing Code

let l1 = new LinkedList(new Node(0))

for (let i = 1; i < 10; i++) {
    // l1.append(Math.floor(Math.random() * 100))
    l1.append(i)
}

// l1.append("jhds")
// l1.traverse()

l1.traverse()
console.log("The length is: " + l1.length())

l1.delete(5)

l1.traverse()
console.log("The length is: " + l1.length())

l1.append(25, 5)

l1.traverse()
console.log("The length is: " + l1.length())

l1.append(78)

l1.traverse()
console.log("The length is: " + l1.length())

console.log("The element " + 25 + " is at location: " + l1.search(25))

l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.delete()
l1.traverse()