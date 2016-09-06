import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-dashboard.less!';
import template from './page-dashboard.stache!';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-dashboard component. Add your app here.'
  }
});

export default Component.extend({
  tag: 'page-dashboard',
  ViewModel,
  template
});
