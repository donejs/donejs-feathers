import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './main-nav.less!';
import template from './main-nav.stache!';
import Session from '<%= pkgName %>/models/session';

export const ViewModel = DefineMap.extend('MainNav', {
  page: 'string',
  subpage: 'string',
  session: Session
});

export default Component.extend({
  tag: 'main-nav',
  ViewModel,
  template
});
