// eslint-disable-next-line max-classes-per-file
const Container = require('../src/container');

const container = new Container();
const cakes = {
  getCakes: () => (['freshcream', 'buttercream']),
};

container.register('cake', cakes);
const cake = container.resolve('cake');

console.log(cake.getCakes()); // returns [ 'freshcream', 'buttercream' ]
