class Container {
  constructor() {
    this.registrationMap = new Map();
    this.singletons = new Map();
  }

  /**
   * Register Class in the Container
   * @param {String} name a name given for the Class.
   * @param {Object || String} registrationValue the actual Class.
   * @param {Array} dependencies the dependencies for that class constructor.
   * @param {Boolean} isSingleton specify if the class is singleton for instantiating once.
   * @returns {void}
   */
  register(name, registrationValue, dependencies, isSingleton) {
    if (!name) {
      throw new Error('You must provide a name');
    }
    if (typeof registrationValue === 'function' || typeof registrationValue === 'object') {
      this.registrationMap.set(
        name,
        {
          registrationValue,
          dependencies,
          isSingleton,
        },
      );
    } else {
      throw new Error(
        'Pease check dependency type, you must only register a class or object',
      );
    }
  }

  /**
   * Resolves a given Class or Object
   * @param {String} name the name of the class that was set during registration.
   * @returns Instantiated value of class
   */
  resolve(name) {
    const current = this.registrationMap.get(name);

    if (!current) {
      throw new Error(
        'Pease check the class you are trying to resolve as it does not exist',
      );
    }

    if (current.isSingleton) {
      const singletonInstance = this.singletons.get(name);
      if (singletonInstance) {
        return singletonInstance;
      }

      const singletonInstanceValue = this.getInstantiatedValue(current);
      this.singletons.set(name, singletonInstanceValue);

      return singletonInstanceValue;
    }
    return this.getInstantiatedValue(current);
  }

  /**
   * Returns value of a given instance
   * @param {Object} currentObject an object to instantiate
   * @returns {any} Instantiated value
   */
  getInstantiatedValue(currentObject) {
    if (currentObject.dependencies && currentObject.dependencies.length > 0) {
      return new currentObject.registrationValue(...currentObject.dependencies);
    }
    if (Object.keys(currentObject.registrationValue).length) {
      return currentObject.registrationValue;
    }

    return new currentObject.registrationValue();
  }
}

module.exports = Container;
