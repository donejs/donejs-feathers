import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './main-nav.less!';
import template from './main-nav.stache!';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the main-nav component'
  }
});

export default Component.extend({
  tag: 'main-nav',
  ViewModel,
  template
});
