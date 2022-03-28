// eslint-disable-next-line max-classes-per-file
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

class Foo {
  constructor() {
    this.name = 'foo';
    this.age = 5;
  }
}

container.register('foo', Foo);
const noDependencyFoo = container.resolve('foo');

console.log(noDependencyFoo.name); // returns foo
console.log(noDependencyFoo.age); // returns 5
