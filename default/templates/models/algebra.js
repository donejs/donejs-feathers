import set from 'can-set';
import helpers from 'can-set/src/helpers';

/**
 * Feathers-compatible can-set algebra for can-connect Models.
 */
export default new set.Algebra(
  set.comparators.id('<%= idProp %>'),
  set.props.offsetLimit('$skip', '$limit'),
  set.comparators.sort('$sort', defaultSort),
  {
    '$populate': function () {
      return true;
    }
  }
);

// TODO: this should belong to can-set module: `can-set/src/helpers.defaultSort`
// See this PR: https://github.com/canjs/can-set/pull/25/commits/b744d23cba7bccd694a858853560c7d816b26f42
// Gives back the value of an object at a provided dot-separated path string.
helpers.getValueFromPath = function getValueFromPath (obj, path) {
  path = path.split('.');
  for (var i = 0; i < path.length; i++) {
    obj = obj[path[i]];
  }
  return obj;
};

function defaultSort (sortPropValue, item1, item2) {
  var parts = [];
  var sortProp;
  var item1Value;
  var item2Value;
  var desc;

  if (typeof sortPropValue === 'string') {
    parts = sortPropValue.split(' ');
    sortProp = parts[0];
    item1Value = item1[sortProp];
    item2Value = item2[sortProp];
    desc = parts[1] || '';
    desc = desc.toLowerCase() === 'desc';
  } else {
    var path = Object.keys(sortPropValue)[0];
    var sortDir = sortPropValue[Object.keys(sortPropValue)[0]];
    if (sortDir === -1 || sortDir === '-1') {
      desc = true;
    }

    item1Value = helpers.getValueFromPath(item1, path);
    item2Value = helpers.getValueFromPath(item2, path);
  }

  if (desc) {
    var temp;
    temp = item1Value;
    item1Value = item2Value;
    item2Value = temp;
  }

  if (item1Value < item2Value) {
    return -1;
  }
  if (item1Value > item2Value) {
    return 1;
  }
  return 0;
}
