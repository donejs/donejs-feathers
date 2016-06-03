import Feathers from 'can-connect-feathers';

const feathers = new Feathers({
  url: '<%= feathersUrl %>',
  idProp: '<%= idProp %>',
  tokenLocation: 'ssr-cookie',
  tokenEndpoint: 'auth/token',
  localEndpoint: 'auth/local'
});

export default feathers;
