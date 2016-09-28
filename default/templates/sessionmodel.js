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

export const Session = DefineMap.extend('Session', {
  _id: '*',
  email: 'string',
  password: 'string',
  data: '*',
  token: 'string'
});

Session.List = DefineList.extend({
  '*': Session
});

export const sessionConnection = connect(behaviors, {
  url: {
    createData: data => feathers.authenticate(data),
    destroyData: () => feathers.logout().then(() => {
      window.localStorage.clear();
      window.location.pathname = '/';
    })
  },
  idProp: '<%= idProp %>',
  Map: Session,
  List: Session.List,
  name: 'session'
});

export default Session;
