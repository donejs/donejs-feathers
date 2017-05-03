import QUnit from 'steal-qunit';
import { ViewModel } from './page-four-oh-four';

// ViewModel unit tests
QUnit.module('<%= pkgName %>/components/page-four-oh-four');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the page-four-oh-four component');
});
