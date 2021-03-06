'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

// Use the main (app) to install the whole application.
// example use gen-java:service to install a compoment.

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts); 

    this.props = opts.props ? Object.assign({}, opts.props) : {};
    this.file = opts.file ? Object.assign({}, opts.file) : null;
    this.props.groupId = this.config.get('groupId');
  }

  prompting() {
    var entityName = this.file ? this.file.entityName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.entityName = entityName;

    if (this.props.entityName)
      this.log(yosay(
        'SpringMVC ' + chalk.red('Java controller') + ' generator!\n' + chalk.green(this.props.entityName)
      ));
    else
      this.log(yosay(
        'SpringMVC ' + chalk.red('Java controller') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !entityName;
        },
        type: 'input',
        name: 'entityName',
        message: 'Insert entity class name.'
      },
      {
        type: 'confirm',
        name: 'restController',
        message: 'Is this a restcontroller ?',
        default: false
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

    function firstToLowerCase(text) {
      return text.substring(0, 1).toLowerCase() + text.substring(1);
    }

    return this.prompt(prompts).then(function (props) {
      if (this.props) {
        for (var val in props)
this.props[val] = typeof props[val] == 'string' ? props[val].trim() : props[val]
      } else {
        this.props = props;
      }
      this.destinationRoot(this.props.rootFolder);

      this.props.pathName = firstToLowerCase(this.props.entityName).replace(/([A-Z])/g, '-$1');
      this.props.pathName = this.props.pathName.toLowerCase();

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');

      this.props.controllerClass_cc = firstToLowerCase(this.props.entityName);

    }.bind(this));
  }

  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId)

    if (this.props.restController) {
      this.fs.copyTpl(
        this.templatePath('_RestController.java'),
        this.destinationPath('src/main/java/' + this.props.filePath + '/controller/rest/' + this.props.entityName + 'RestController.java'),
        {
          packageName: this.props.groupId,
          controllerClass: this.props.entityName,
          pathName: this.props.pathName,
          controllerClass_cc: this.props.controllerClass_cc
        }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('_Controller.java'),
        this.destinationPath('src/main/java/' + this.props.filePath + '/controller/' + this.props.entityName + 'Controller.java'),
        {
          packageName: this.props.groupId,
          controllerClass: this.props.entityName,
          pathName: this.props.pathName,
          controllerClass_cc: this.props.controllerClass_cc
        }
      );
    }
  }

};
