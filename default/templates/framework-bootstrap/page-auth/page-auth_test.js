import QUnit from 'steal-qunit';
import { ViewModel } from './page-auth';

// ViewModel unit tests
QUnit.module('<%= pkgName %>/components/page-auth');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the page-auth component');
});
