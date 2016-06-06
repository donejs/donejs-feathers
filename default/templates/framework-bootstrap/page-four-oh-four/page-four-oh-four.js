import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './page-four-oh-four.less!';
import template from './page-four-oh-four.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the page-four-oh-four component'
    }
  }
});

export default Component.extend({
  tag: 'page-four-oh-four',
  viewModel: ViewModel,
  template
});