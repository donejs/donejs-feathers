import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './page-home.less!';
import template from './page-home.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the page-home component'
    }
  }
});

export default Component.extend({
  tag: 'page-home',
  viewModel: ViewModel,
  template
});