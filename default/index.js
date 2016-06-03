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

		this.prompt({
			name: 'setup',
			type: 'checkbox',
			required: true,
			message: 'The following files will be generated.',
      choices: [{
        name: 'app.js - Setup auth attributes in the main app.',
        value: 'appJs',
        checked: true
      }, {
        name: 'Signup Model for Local Auth',
        value: 'signupModel',
        checked: true
      }, {
        name: 'Session Model',
        value: 'sessionModel',
        checked: true
      }, {
        name: 'Basic Site Layout / UI',
        value: 'includeBasicLayout',
        checked: true
      }]
		}, function (props) {
      Object.keys(props.setup).forEach(prop => {
        this.props[props.setup[prop]] = true;
      });

      var prompts = [{
        name: 'feathersUrl',
        type: 'input',
        message: 'What is the base URL of the Feathers server? Leave blank if same as SSR server.',
        default: ''
      }, {
        name: 'idProp',
        type: 'input',
        message: 'What will be the property for the model ids? (For example, id or _id)',
        default: 'id'
      }];

      if (this.props.includeBasicLayout) {
        prompts.push({
          name: 'framework',
          type: 'list',
          message: `Select a CSS Framework.`,
          choices: [{
            name: 'Pure CSS - a tiny css framework',
            value: 'pure'
          }, {
            name: 'Bootstrap',
            value: 'bootstrap'
          }]
        });
        prompts.push({
    			name: 'providers',
    			type: 'checkbox',
    			message: 'Select the social auth providers you want to use.',
          choices: [
            'bitbucket',
            'dropbox',
            'facebook',
            'github',
            'google',
            'instagram',
          ]
    		});
      }

      this.prompt(prompts, function(props){
        _.merge(this.props, props);
        done();
      }.bind(this));
		}.bind(this));
  },

  writing: function () {
    var done = this.async();
    var pkg = utils.getPkgOrBail(this, done);
    if(!pkg) {
      return;
    }
    console.log(this.props);

    // Make a general options object for all pages.
    var folder = _.get(pkg, 'system.directories.lib') || './';
    var options = {
      pkgName: pkg.name
    };
    _.merge(options, this.props);

    console.log('before app.js');
    if(this.props.appJs) {
      this.fs.copyTpl(
        this.templatePath('app.js'),
        this.destinationPath(path.join(folder, 'app.js')),
        options
      );
    }

    console.log('before feathers.js');
    this.fs.copyTpl(
      this.templatePath('feathers.js'),
      this.destinationPath(path.join(folder, 'models', 'feathers.js')),
      options
    );

    console.log('before signupModel');
    if(this.props.signupModel) {
      this.fs.copyTpl(
        this.templatePath('signupmodel.js'),
        this.destinationPath(path.join(folder, 'models', 'signup.js')),
        options
      );
    }

    console.log('before sessionModel');
    if(this.props.sessionModel) {
      this.fs.copyTpl(
        this.templatePath('sessionmodel.js'),
        this.destinationPath(path.join(folder, 'models', 'session.js')),
        options
      );
    }
    console.log('before basic layout');
    if(this.props.includeBasicLayout) {
      this.fs.copyTpl(
        this.templatePath(path.join('page-dashboard', '**', '*.*')),
        this.destinationPath(path.join(folder, 'components', 'page-dashboard')),
        options
      );

      var frameworkFolder = `framework-${this.props.framework}`;
      this.fs.copyTpl(
        this.templatePath(path.join(frameworkFolder, 'index.stache')),
        this.destinationPath(path.join(folder, 'index.stache')),
        options
      );
      this.fs.copyTpl(
        this.templatePath(path.join(frameworkFolder, 'page-auth', '**', '*.*')),
        this.destinationPath(path.join(folder, 'components', 'page-auth')),
        options
      );
      this.fs.copyTpl(
        this.templatePath(path.join(frameworkFolder, 'main-nav', '**', '*.*')),
        this.destinationPath(path.join(folder, 'components', 'main-nav')),
        options
      );
      this.fs.copyTpl(
        this.templatePath(path.join(frameworkFolder, 'page-home', '**', '*.*')),
        this.destinationPath(path.join(folder, 'components', 'page-home')),
        options
      );
      this.fs.copyTpl(
        this.templatePath(path.join(frameworkFolder, 'less', '**', '*.*')),
        this.destinationPath(path.join(folder, 'less')),
        options
      );
      console.log(this.fs.copy);
      this.fs.copy(
        this.templatePath(path.join(frameworkFolder, 'img', '**', '*.*')),
        this.destinationPath(path.join(folder, 'img')),
        options
      );
    }

    var newDependencies = ['can-connect-feathers'];
    if (this.props.framework === 'pure') {
      newDependencies.push('pure-css');
    }
    if (this.props.framework === 'bootstrap') {
      newDependencies.push('bootstrap');
    }
    if(this.props.includeBasicLayout) {
      newDependencies.push('auth-component');
    }
    this.npmInstall(newDependencies, {'save': true});

    done();
  }
});
