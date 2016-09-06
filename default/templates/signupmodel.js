/* global window */

import feathers from './feathers';
import connect from 'can-connect';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';

import dataUrl from 'can-connect/data/url/';
import dataParse from 'can-connect/data/parse/';
import construct from 'can-connect/constructor/';
import constructStore from 'can-connect/constructor/store/';
import constructOnce from 'can-connect/constructor/callbacks-once/';
import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import dataCallbacks from 'can-connect/data/callbacks/';
import realtime from 'can-connect/real-time/';

var behaviors = [
  dataUrl,
  dataParse,
  construct,
  constructStore,
  constructOnce,
  canMap,
  canRef,
  dataCallbacks,
  realtime
];

export const Signup = DefineMap.extend('Signup', {
  _id: '*',
  email: 'string',
  password: 'string'
});

Signup.List = DefineList.extend({
  '*': Signup
});

export const signupConnection = connect(behaviors, {
  parseInstanceProp: 'data',
  url: '/signup',
  idProp: '<%= idProp %>',
  Map: Signup,
  List: Signup.List,
  name: 'signup'
});

export default Signup;
