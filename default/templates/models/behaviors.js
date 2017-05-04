import dataParse from 'can-connect/data/parse/';
import constructor from 'can-connect/constructor/';
import constructorStore from 'can-connect/constructor/store/';
import constructorCallbacksOnce from 'can-connect/constructor/callbacks-once/';
import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import dataCallbacks from 'can-connect/data/callbacks/';
import realtime from 'can-connect/real-time/';


const behaviors = [
  dataParse,
  constructor,
  constructorStore,
  constructorCallbacksOnce,
  canMap,
  canRef,
  dataCallbacks,
  realtime
];

export default behaviors;
