import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './page-auth.less!';
import template from './page-auth.stache!';

export const ViewModel = Map.extend({
  define: {
    subpage: { }, // Passed in from AppState.
    isOAuthRoute: {
      get(){
        let subpage = this.attr('subpage');
        return subpage === 'success' || subpage === 'failure';
      }
    }
  }
});

export default Component.extend({
  tag: 'page-auth',
  viewModel: ViewModel,
  template,
  leakScope: true
});
