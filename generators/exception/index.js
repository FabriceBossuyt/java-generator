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
    var exceptionName = this.file ? this.file.exceptionName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.exceptionName = exceptionName;

    // Have Yeoman greet the user.
    if (this.props.exceptionName)
      this.log(yosay(
        'Spring MVC ' + chalk.red('Exception') + ' generator!\n' + chalk.green(this.props.exceptionName)
      ));
    else
      this.log(yosay(
        'Spring MVC ' + chalk.red('Exception') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !exceptionName;
        },
        type: 'input',
        name: 'exceptionName',
        message: 'Please enter the exception name.'
      },
      {
        type: 'confirm',
        name: 'extendsException',
        message: 'Extends from the Exception class?',
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

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');

      this.props.exceptionFileName = this.props.exceptionName + 'Exception';
    }.bind(this));
  }


  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    // Copy the Entity.
    this.fs.copyTpl(
      this.templatePath('_Exception.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/exception/' + this.props.exceptionFileName + '.java'),
      {
        packageName: this.props.groupId,
        exceptionName: this.props.exceptionFileName,
        extendsException: this.props.extendsException
      }
    );

  }
};
