// eslint-disable-next-line max-classes-per-file
const Container = require('../src/container');

const container = new Container();
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const isSingleton = true;
container.register('person', Person, ['sam', 29], isSingleton);
const person = container.resolve('person');

console.log(person.name); // returns sam
console.log(person.age); // returns 29

class Foo {
  constructor() {
    this.name = 'foo';
    this.age = 5;
  }
}

container.register('person', Foo, ['newdude', 5], isSingleton);
const personTwo = container.resolve('person');

console.log(personTwo.name); // still returns sam
console.log(personTwo.age); // still returns 29
