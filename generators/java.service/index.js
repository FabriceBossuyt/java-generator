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
    var entityName = this.file ? this.file.entityName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.entityName = entityName;

    // Have Yeoman greet the user.
    if (this.props.entityName)
      this.log(yosay(
        'Spring MVC ' + chalk.red('Java Service') + ' generator!\n' + chalk.green(this.props.entityName)
      ));
    else
      this.log(yosay(
        'Spring MVC ' + chalk.red('Java Service') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !entityName;
        },
        type: 'input',
        name: 'entityName',
        message: 'Insert service name.'
      },
      {
        type: 'confirm',
        name: 'useInterface',
        message: 'Use an interface for this Service?',
        default: true
      },
      {
        when: function (response) {
          return response.useInterface;
        },
        type: 'confirm',
        name: 'useBaseService',
        message: 'Extends from BaseService class?',
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

    function firstToLowerCase(text) {
      return text.substring(0, 1).toLowerCase() + text.substring(1);
    }

    // The DTO/Repository will be quested according the Service name.
    return this.prompt(prompts).then(function (props) {
      if (this.props) {
        for (var val in props)
          this.props[val] = props[val] //typeof props[val] == 'string' ? props[val].trim() : props[val];
      } else {
        this.props = props;
      }

      if (!this.props.groupId)
        this.props.groupId = this.config.get('groupId');

      this.destinationRoot(this.props.rootFolder);

      this.props.serviceClass_cc = firstToLowerCase(this.props.entityName);

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');
    }.bind(this));
  }

  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    this.fs.copyTpl(
      this.templatePath('_ServiceImpl.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/service/impl/' + this.props.entityName + 'ServiceImpl.java'),
      {
        packageName: this.props.groupId,
        serviceClass: this.props.entityName,
        serviceClass_cc: this.props.serviceClass_cc,
        implementsBaseService: this.props.useInterface
      }
    );

    if (this.props.useBaseService) {
      this.fs.copyTpl(
        this.templatePath('_Service.java'),
        this.destinationPath('src/main/java/' + this.props.filePath + '/service/' + this.props.entityName + 'Service.java'),
        {
          packageName: this.props.groupId,
          serviceClass: this.props.entityName,
          extendsBaseService: this.props.useBaseService
        }
      );
    }
  }

};
