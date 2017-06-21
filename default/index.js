var Generator = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var utils = require('../lib/utils');
var cmd = require('child_process').execSync;

var yarnInstalled;
try {
  cmd('yarn bin').toString();
  yarnInstalled = true;
} catch (err) {
  yarnInstalled = false;
}

module.exports = class extends Generator {
  // templatePath: utils.templatePath(path.join('.donejs', 'templates', 'app')),

  constructor (args, opts) {
    super(args, opts);

    this.props = {};
  }

  prompting () {
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
    }, {
      name: 'packager',
      type: 'list',
      message: 'Which package manager are you using (has to be installed globally)?',
      default: yarnInstalled ? 'yarn@>= 0.18.0' : 'npm@>= 3.0.0',
      choices: [{
        name: 'npm',
        value: 'npm@>= 3.0.0'
      }, {
        name: 'Yarn',
        value: 'yarn@>= 0.18.0'
      }]
    }];

    this.prompt(prompts).then(props => {
      console.log(props);
      this.props = props;
      done();
    });
  }

  writing () {
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
    if (this.props.packager === 'yarn@>= 0.18.0') {
      console.log('installing with yarn');
      this.yarnInstall(newDependencies, {'save': true});
    } else {
      console.log('installing with npm');
      this.npmInstall(newDependencies, {'save': true});
    }

    done();
  }
};
