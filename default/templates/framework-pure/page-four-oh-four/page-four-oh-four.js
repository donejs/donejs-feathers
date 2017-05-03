import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-four-oh-four.less!';
import template from './page-four-oh-four.stache!';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-four-oh-four component'
  }
});

export default Component.extend({
  tag: 'page-four-oh-four',
  ViewModel,
  template
});
