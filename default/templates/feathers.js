import Feathers from 'can-connect-feathers';

const feathers = new Feathers({
  url: '<%= feathersUrl %>',
  idProp: '<%= idProp %>',
  tokenLocation: 'feathers-jwt',
  tokenEndpoint: 'auth/token',
  localEndpoint: 'auth/local'
});

export default feathers;
