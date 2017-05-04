var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var utils = require('../lib/utils');

module.exports = generators.Base.extend({
  // templatePath: utils.templatePath(path.join('.donejs', 'templates', 'app')),

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.props = {};
  },

  prompting: function () {
    var done = this.async();

    console.log('');
    console.log('Add Feathers to your DoneJS app.');
    console.log('');

    var prompts = [{
      name: 'feathersUrl',
      type: 'input',
      message: 'What is the Feathers server base URL? Leave this blank if it\'s the same as the web or SSR server.',
      default: ''
    }, {
      name: 'idProp',
      type: 'input',
      message: 'What will be the property for the model ids? (For example, id or _id)',
      default: 'id'
    }];

    this.prompt(prompts, function (props) {
      _.merge(this.props, props);
      done();
    }.bind(this));
  },

  writing: function () {
    var done = this.async();
    var pkg = utils.getPkgOrBail(this, done);
    if (!pkg) {
      return;
    }

    // Make a general options object for all pages.
    var folder = _.get(pkg, 'system.directories.lib') || './src';
    var options = {
      pkgName: pkg.name
    };
    _.merge(options, this.props);

    // copy app.js
    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath(path.join(folder, 'app.js')),
      options
    );

    const copyModelTemplate = (name, options) => {
      this.fs.copyTpl(
        this.templatePath(path.join('models', name)),
        this.destinationPath(path.join(folder, 'models', name)),
        options
      );
    };
    const modelFiles = [
      'algebra.js',
      'behaviors.js',
      'feathers-client.js',
      'session.js',
      'user.js',
      'fixtures.js'
    ];
    modelFiles.forEach(fileName => copyModelTemplate(fileName, options));

    var newDependencies = [
      'can-connect-feathers',
      'feathers',
      'feathers-socketio',
      'feathers-hooks',
      'feathers-authentication-client',
      'socket.io-client',
      'steal-socket.io'
    ];
    this.npmInstall(newDependencies, {'save': true});

    done();
  }
});
