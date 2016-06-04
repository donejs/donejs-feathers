import QUnit from 'steal-qunit';
import { ViewModel } from './success';

// ViewModel unit tests
QUnit.module('gh-test/components/page-auth/success');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the auth-success component');
});
