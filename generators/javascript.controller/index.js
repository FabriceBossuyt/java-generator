'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts); 

    this.props = opts.props ? Object.assign({}, opts.props) : {};
    this.file = opts.file ? Object.assign({}, opts.file) : null;
    this.props.groupId = this.config.get('groupId');
  }

  prompting() {
    var controllerName = this.file ? this.file.entityName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.controllerName = controllerName;

    // Have Yeoman greet the user.
    if (this.props.controllerName)
      this.log(yosay(
        'Spring MVC ' + chalk.red('Javascript Controller') + ' generator!\n' + chalk.green(this.props.controllerName)
      ));
    else
      this.log(yosay(
        'Spring MVC ' + chalk.red('Javascript Controller') + ' generator!'
      ));

    function firstToLowerCase(text) {
      return text.substring(0, 1).toLowerCase() + text.substring(1);
    }

    var prompts = [
      {
        when: function () {
          return !controllerName;
        },
        type: 'input',
        name: 'controllerName',
        message: 'Insert controller name.'
      },
      {
        type: 'confirm',
        name: 'includeModule',
        message: 'Include javascript module creation?',
        default: true
      },
      {
        when: function () {
          return !groupId;
        },
        type: 'input',
        name: 'groupId',
        message: 'Please enter the groupId: ',
      },
      {
        when: function () {
          return !rcFile && !rootFolder;
        },
        type: 'input',
        name: 'rootFolder',
        message: 'Please enter the root folder of the project: ',
        default: process.cwd()
      }
    ];

    return this.prompt(prompts).then(function (props) {
      if (this.props) {
        for (var val in props)
this.props[val] = typeof props[val] == 'string' ? props[val].trim() : props[val]
      } else {
        this.props = props;
      }
      this.destinationRoot(this.props.rootFolder);

      this.props.controllerName = firstToLowerCase(this.props.controllerName);
      this.props.jsControllerFileName = this.props.controllerName.replace(/([A-Z])/g, '-$1');
      this.props.jsControllerFileName = this.props.jsControllerFileName.toLowerCase();
    }.bind(this));
  }

  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    this.fs.copyTpl(
      this.templatePath('_Controller.js'),
      this.destinationPath('src/main/webapp/resources/components/' + this.props.jsControllerFileName + '/' + this.props.jsControllerFileName + '.controller.js'),
      {
        controllerName: this.props.controllerName
      }
    );

    if (this.props.includeModule)
      this.composeWith(require.resolve('../module'), { props: this.props, file: {entityName : this.props.controllerName} });
  }
};
