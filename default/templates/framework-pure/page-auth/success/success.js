import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './success.less!';
import template from './success.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the auth-success component'
    }
  }
});

export default Component.extend({
  tag: 'auth-success',
  viewModel: ViewModel,
  template
});