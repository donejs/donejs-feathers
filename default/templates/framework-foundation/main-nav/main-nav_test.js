import QUnit from 'steal-qunit';
import { ViewModel } from './main-nav';

// ViewModel unit tests
QUnit.module('<%= pkgName %>/components/main-nav');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the main-nav component');
});
