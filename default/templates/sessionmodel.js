/* global window */

import can from 'can';
import $ from 'jquery';
import feathers from './feathers';
import connect from 'can-connect';

import 'can-connect/constructor/';
import 'can-connect/can/map/';
import 'can-connect/can/';
import 'can-connect/constructor/store/';
import 'can-connect/constructor/callbacks-once/';
import 'can-connect/data/callbacks/';
import 'can-connect/data/callbacks-cache/';
import 'can-connect/data/combine-requests/';
import 'can-connect/data/inline-cache/';
import 'can-connect/data/parse/';
import 'can-connect/data/url/';
import 'can-connect/real-time/';
import 'can/map/define/define';

var behaviors = [
  'constructor',
  'can-map',
  'constructor-store',
  'data-callbacks',
  'data-combine-requests',
  'data-inline-cache',
  'data-parse',
  'data-url',
  'constructor-callbacks-once'
];

export const Session = can.Map.extend('Session', {
  define: {}
});

Session.List = can.List.extend({
  Map: Session
}, {});

export const sessionConnection = connect(behaviors, {
  parseInstanceProp: 'data',
  url: {
    createData: data => feathers.authenticate(data),
    destroyData: () => feathers.logout()
  },
  idProp: '<%= idProp %>',
  Map: Session,
  List: Session.List,
  name: 'session'
});

export default Session;
