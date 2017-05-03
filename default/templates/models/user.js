import set from 'can-set';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import feathersClient from './feathers-client';
import feathersServiceBehavior from 'can-connect-feathers/service';
import behaviors from './behaviors';
import algebra from './algebras';

var User = DefineMap.extend('User', {
  <%= idProp %>: 'any',
  email: 'string',
  password: 'string'
});

User.List = DefineList.extend({
  '#': User
});

Session.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: User,
  List: User.List,
  feathersService: feathersClient.service('<%= feathersUrl %>/users'),
  name: 'users',
  algebra
});

User.algebra = algebra;

export default User;
