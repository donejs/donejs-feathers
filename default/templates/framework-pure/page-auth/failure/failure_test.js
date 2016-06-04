import QUnit from 'steal-qunit';
import { ViewModel } from './failure';

// ViewModel unit tests
QUnit.module('gh-test/components/page-auth/failure');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the auth-failure component');
});
