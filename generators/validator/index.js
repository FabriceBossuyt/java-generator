'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = opts.props ? Object.assign({}, opts.props) : {};
    this.file = opts.file ? Object.assign({}, opts.file) : null;
    this.props.groupId = this.config.get('groupId');
  }

  prompting() {
    var validatorName = this.file ? this.file.entityName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.validatorName = validatorName;

    // Have Yeoman greet the user.
    if (this.props.repositoryName)
      this.log(yosay(
        'Spring MVC ' + chalk.red('DTO Validator') + ' generator!\n' + chalk.green(this.props.validatorName)
      ));
    else
      this.log(yosay(
        'Spring MVC ' + chalk.red('DTO Validator') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !validatorName;
        },
        type: 'input',
        name: 'validatorName',
        message: 'Insert Validator name.'
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

    // The DTO/Repository will be quested according the Service name.
    return this.prompt(prompts).then(function (props) {
      if (this.props) {
        for (var val in props)
          this.props[val] = typeof props[val] == 'string' ? props[val].trim() : props[val];
      } else {
        this.props = props;
      }
      this.destinationRoot(this.props.rootFolder);

      this.props.validatorName_cc = firstToLowerCase(this.props.validatorName);

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');
    }.bind(this));
  }

  writing() {

    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    this.fs.copyTpl(
      this.templatePath('_Validator.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/dto/validator/' + this.props.validatorName + 'DtoValidator.java'),
      {
        packageName: this.props.groupId,
        validatorName : this.props.validatorName, 
        validatorName_cc : this.props.validatorName_cc
      }
    );
  }
};
