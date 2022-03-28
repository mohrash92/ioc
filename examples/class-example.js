const Container = require('../src/container');

const container = new Container();
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

container.register('person', Person, ['sam', 29]);
const person = container.resolve('person');

console.log(person.name); // returns sam
console.log(person.age); // returns 29
