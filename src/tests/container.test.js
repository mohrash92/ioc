// eslint-disable-next-line max-classes-per-file
const Container = require('../container');

describe('Container', () => {
  class Foo {
    constructor() {
      this.test = 'test';
    }
  }
  describe('register', () => {
    it('should store class as a Map() when passed mapped to its name', () => {
      const container = new Container();

      container.register('foo', Foo, { bar: true });

      expect(container.registrationMap.get('foo')).toEqual({
        registrationValue: expect.any(Function),
        dependencies: { bar: true },
      });
    });

    it('should store object as a Map() when passed mapped to its name', () => {
      const testObj = {};
      const container = new Container();

      container.register('foo', testObj, { bar: true });

      expect(container.registrationMap.get('foo')).toEqual({
        registrationValue: expect.any(Object),
        dependencies: { bar: true },
      });
    });

    it('should store a singleton dependency with a flag', () => {
      const testObj = {};
      const container = new Container();
      const isSingleton = true;

      container.register('foo', testObj, { bar: true }, isSingleton);

      expect(container.registrationMap.get('foo')).toEqual({
        registrationValue: expect.any(Object),
        dependencies: { bar: true },
        isSingleton: true,
      });
    });

    it('should throw an Error when attempting to register without a name', () => {
      const container = new Container();

      expect(() => {
        container.register();
      }).toThrow('You must provide a name');
    });

    it('should throw an Error when attempting to register any other type', () => {
      const container = new Container();

      expect(() => {
        container.register('foo', 1);
      }).toThrow('Pease check dependency type, you must only register a class or object');
    });
  });

  describe('resolve', () => {
    it('should return instantiated object of sepcified class', () => {
      const container = new Container();
      container.register('foo', Foo, { bar: false });
      const instatiatedValue = container.resolve('foo');

      expect(instatiatedValue).toEqual({ test: 'test' });
    });

    it('should throw Error when class is not registered', () => {
      const container = new Container();

      expect(() => {
        container.resolve('class-does-not-exist');
      }).toThrow('Pease check the class you are trying to resolve as it does not exist');
    });

    it('should not allow overriding of singleton class', () => {
      const container = new Container();
      const isSingleton = true;

      container.register('foo', Foo, { bar: true }, isSingleton);
      const instanceValue = container.resolve('foo');

      expect(instanceValue).toEqual({ test: 'test' });

      class Bar {
        constructor() {
          this.test = 'test override class';
        }
      }

      container.register('foo', Bar, { bar: false }, isSingleton);

      const newInstaceValue = container.resolve('foo');
      expect(newInstaceValue).toEqual({ test: 'test' });
    });

    it('should set the dependencies of the class when set', () => {
      class Person {
        constructor(height, name) {
          this.height = height;
          this.name = name;
        }
      }
      const container = new Container();

      container.register('person', Person, [160, 'sam']);
      const instanceValue = container.resolve('person');

      expect(instanceValue.height).toEqual(160);
      expect(instanceValue.name).toEqual('sam');
    });

    it('should work without setting dependencies', () => {
      class Person {
        constructor() {
          this.height = 200;
        }
      }
      const container = new Container();

      container.register('person', Person);
      const instanceValue = container.resolve('person');

      expect(instanceValue.height).toEqual(200);
    });

    it('should support modules', () => {
      const lib = {
        method: () => {},
      };
      const container = new Container();

      container.register('person', lib);
      const instanceValue = container.resolve('person');

      expect(instanceValue.method).toEqual(expect.any(Function));
    });
  });
});
