import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './main-nav.less!';
import template from './main-nav.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the main-nav component'
    }
  }
});

export default Component.extend({
  tag: 'main-nav',
  viewModel: ViewModel,
  template
});
