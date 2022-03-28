# What is Inversion of Control
Inversion of Control design principle refers to inverting any additional responsibilities, other than the main responsibility. The idea is that Classes for example do not create other objects/dependencies on which they rely to do their work. Instead, they get them from an outside source. Some of the main benefits this brings is that:

-   It means that we are following Dependency Injection technique in which an object receives other objects that it depends on
-	It increases the modularity of the program
-   It means that we can manage object life-cycle i.e singleton
-	We depend more in abstractions rather than concrete implementations
-	It promotes loosely coupled architecture which is good for testing


# IOC Container Mo
An IoC container is a way to create an object which houses all of the dependency objects and then using them when specified. You simply create a container using the `register()` method and then simply call the `resolve()` method when you want to use the instantiated value. You can see some examples [here](https://github.com/mohrash92/ioc/blob/main/examples)

[![npm version](https://badge.fury.io/js/ioc-container-mo.svg)](https://badge.fury.io/js/ioc-container-mo)

## Getting Started
- Insall the app using npm: `npm i ioc-container-mo`
- Import class in your desired place: `const Container = require('ioc-container-mo')`

## API

### `register()`

Creates a registration for a given class/object

Args:

- `name`: name a name given for the Class.
- `registrationValue`: registrationValue the actual Class.
- `dependencies`: the dependencies for that class contructor.
- `isSingleton`: specify if the class is singleton for instantiating once.

### `resolve()`

Returns instantiated value of Class.

- `name` the name of the class that was set during registration.

