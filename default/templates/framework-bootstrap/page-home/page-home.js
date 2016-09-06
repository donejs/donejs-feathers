import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-home.less!';
import template from './page-home.stache!';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-home component'
  }
});

export default Component.extend({
  tag: 'page-home',
  ViewModel,
  template
});
