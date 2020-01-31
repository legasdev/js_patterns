// Позволяет выстраивать коммуникацию между объектами разного типо
// объединяя интерфейс в одном объекте

class User {
    constructor(name) {
        this.name = name;
        this.room = null;
    }

    send(msg, to) {
        this.room.send(msg, this, to)
    }

    receive(msg, from) {
        console.log(`${from.name} => ${this.name}: ${msg}`)
    }
}

class ChatRoom {
    constructor() {
        this.users = {}
    }

    register(user) {
        this.users[user.name] = user;
        user.room = this;
    }

    send(msg, from, to) {
        if (to) {
            to.receive(msg, from);
        } else {
            Object.keys(this.users).forEach(key => {
                if (this.users[key] !== from) {
                    this.users[key].receive(msg, from);
                }
            })
        }
    }
}

const artem = new User('Artem')
const elena = new User('Elena')
const igor = new User('Igor')

const room = new ChatRoom();

room.register(artem)
room.register(elena)
room.register(igor)

artem.send('Hello!',elena);
elena.send('Hello Hello!',artem);
igor.send('Всем привет!');