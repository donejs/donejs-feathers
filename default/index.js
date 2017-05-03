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
    this.prompt({
      name: 'ui',
      type: 'list',
      message: 'Select an option',
      choices: [{
        name: 'Basic Feathers setup.',
        value: false
      // Hiding the UI option for this release
      // }, {
      //   name: 'Full site layout',
      //   value: true
      }]
    }, function (props) {
      this.props.ui = props.ui;

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

      // If the user wants a UI...
      if (this.props.ui) {
        this.props.appJs = true;
        prompts.push({
          name: 'framework',
          type: 'list',
          message: `Select a CSS Framework.`,
          choices: [{
            name: 'Bootstrap',
            value: 'bootstrap'
          }, {
            name: 'Foundation',
            value: 'foundation'
          }, {
            name: 'PureCSS - a tiny css framework',
            value: 'pure'
          }]
        });
        prompts.push({
          name: 'providers',
          type: 'checkbox',
          message: 'Select the login options you want.',
          choices: [
            {
              name: 'local (email/password)',
              value: 'local'
            },
            'bitbucket',
            'dropbox',
            'facebook',
            'github',
            'google',
            'instagram'
          ]
        });

      // If the user didn't want a UI, check if they want any of these files.
      } else {
        prompts.push({
          name: 'setup',
          type: 'checkbox',
          message: `The file /models/feathers.js will be created. \nSelect any additional files you would like to create.`,
          choices: [{
            name: 'app.js - Setup auth attributes in the main app. Overwrites app.js',
            value: 'appJs',
            checked: false
          // }, {
          //   name: 'Signup Model for Local Auth',
          //   value: 'enableSignup',
          //   checked: false
          // }, {
          //   name: 'Session Model',
          //   value: 'sessionModel',
          //   checked: false
          }]
        });
      }

      this.prompt(prompts, function (props) {
        if (props.setup) {
          props.appJs = props.setup.indexOf('appJs') >= 0;
          props.enableSignup = props.setup.indexOf('enableSignup') >= 0;
          props.sessionModel = props.setup.indexOf('sessionModel') >= 0;
        }
        _.merge(this.props, props);

        var prompts = [];
        if (this.props.ui && this.props.providers.indexOf('local') >= 0) {
          prompts.push({
            name: 'enableSignup',
            message: 'User signup with local auth:',
            type: 'list',
            choices: [{
              name: 'Allow user signup',
              value: true
            }, {
              name: 'No user signup',
              value: false
            }]
          });
        }
        this.prompt(prompts, function (props) {
          _.merge(this.props, props);

          done();
        }.bind(this));
      }.bind(this));
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

    if (this.props.appJs) {
      this.fs.copyTpl(
        this.templatePath('app.js'),
        this.destinationPath(path.join(folder, 'app.js')),
        options
      );
    }

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
      'user.js'
    ];

    modelFiles.forEach(fileName => copyModelTemplate(fileName, options));

    if (this.props.providers && this.props.providers.indexOf('local') >= 0) {
      copyModelTemplate('fixtures.js');
    }

    // UI generation is currently disabled.
    if (this.props.ui) {
      this.fs.copyTpl(
        this.templatePath(path.join('page-dashboard', '**', '*.*')),
        this.destinationPath(path.join(folder, 'components', 'page-dashboard')),
        options
      );

      // copy framework files
      var frameworkFolder = `framework-${this.props.framework}`;
      const copyFrameworkFile = name => {
        this.fs.copyTpl(
          this.templatePath(path.join(frameworkFolder, name)),
          this.destinationPath(path.join(folder, name)),
          options
        );
      };
      const frameworkFiles = [
        'index.stache',
        'styles.less'
      ];
      frameworkFiles.forEach(fileName => copyFrameworkFile(fileName));

      // copy framework components
      const copyFrameworkComponent = componentName => {
        this.fs.copyTpl(
          this.templatePath(path.join(frameworkFolder, componentName, '**', '*.*')),
          this.destinationPath(path.join(folder, 'components', componentName)),
          options
        );
      };
      const frameworkComponents = [
        'page-home',
        'page-auth',
        'main-nav',
        'page-four-oh-four'
      ];
      frameworkComponents.forEach(componentName => copyFrameworkComponent(componentName));

      // copy styles
      this.fs.copyTpl(
        this.templatePath(path.join(frameworkFolder, 'less', '**', '*.*')),
        this.destinationPath(path.join(folder, 'less')),
        options
      );

      // copy images
      this.fs.copy(
        this.templatePath(path.join('img', '**', '*.*')),
        this.destinationPath(path.join(folder, 'img')),
        options
      );
    }

    var newDependencies = [ 'can-connect-feathers' ];
    if (this.props.ui) {
      newDependencies.push('steal-svg');
    }
    if (this.props.framework === 'bootstrap') {
      newDependencies.push('bootstrap');
    }
    if (this.props.framework === 'foundation') {
      newDependencies.push('foundation-sites');
      newDependencies.push('foundation-apps');
    }
    if (this.props.framework === 'pure') {
      newDependencies.push('pure-css');
    }
    if (this.props.ui) {
      newDependencies.push('auth-component');
    }
    this.npmInstall(newDependencies, {'save': true});

    done();
  }
});
