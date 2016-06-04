import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './failure.less!';
import template from './failure.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the auth-failure component'
    }
  }
});

export default Component.extend({
  tag: 'auth-failure',
  viewModel: ViewModel,
  template
});