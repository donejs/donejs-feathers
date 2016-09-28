import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-auth.less!';
import template from './page-auth.stache!';

export const ViewModel = DefineMap.extend({
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
  ViewModel,
  template
});
