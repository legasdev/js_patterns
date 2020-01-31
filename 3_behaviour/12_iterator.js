// Создам класс\объект где последовательно получаем доступ у информации

class MyIterator {
    constructor(data) {
        this.index = 0;
        this.data = data;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return {
                        value: this.data[this.index++],
                        done: false
                    }
                } else {
                    this.index = 0;
                    return {
                        value: void 0,
                        done: true
                    }
                }
            }
        }
    }
}

function* generator(collection) {
    let index = 0;

    while(index < collection.length) {
        yield collection[index++]
    }
}

const iterator = new MyIterator(['This', 'is', 'iterator'])

// for (const val of iterator) {
//     console.log('Value: ', val)
// }

const gen = generator(['This', 'is', 'iterator']);

console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)

for (const val of gen) {
    console.log('Value:', val)
}