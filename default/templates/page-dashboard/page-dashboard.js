import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './page-dashboard.less!';
import template from './page-dashboard.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the page-dashboard component'
    }
  }
});

export default Component.extend({
  tag: 'page-dashboard',
  viewModel: ViewModel,
  template
});