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

    // Have Yeoman greet the user.
    if (this.props.entityName)
      this.log(yosay(
        'SpringMvc ' + chalk.red('Entity') + ' generator!\n' + chalk.green(this.props.entityName)
      ));
    else
      this.log(yosay(
        'SpringMvc ' + chalk.red('Entity') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !entityName;
        },
        type: 'input',
        name: 'entityName',
        message: 'Insert entity name.'
      },
      {
        type: 'confirm',
        name: 'useBaseEntity',
        message: 'Extends from the BaseEntity class?',
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

    return this.prompt(prompts).then(function (props) {
      if (this.props) {
        for (var val in props)
this.props[val] = typeof props[val] == 'string' ? props[val].trim() : props[val]
      } else {
        this.props = props;
      }
      this.destinationRoot(this.props.rootFolder);

      this.props.tableName = firstToLowerCase(this.props.entityName).replace(/([A-Z])/g, '_$1');
      this.props.tableName = this.props.tableName.toLowerCase();

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');

    }.bind(this));
  }


  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId)

    // Copy the Entity.
    this.fs.copyTpl(
      this.templatePath('_Entity.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/model/' + this.props.entityName + '.java'),
      {
        packageName: this.props.groupId,
        entityTableName: this.props.tableName,
        entityClass: this.props.entityName,
        extendBaseEntity: this.props.useBaseEntity
      }
    );
  }
};
