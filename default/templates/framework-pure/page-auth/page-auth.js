import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './page-auth.less!';
import template from './page-auth.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the page-auth component'
    }
  }
});

export default Component.extend({
  tag: 'page-auth',
  viewModel: ViewModel,
  template,
  leakScope: true
});
