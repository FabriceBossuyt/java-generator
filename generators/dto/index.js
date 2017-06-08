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
    var dtoName = this.file ? this.file.entityName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.dtoName = dtoName;

    // Have Yeoman greet the user.
    if (this.props.dtoName)
      this.log(yosay(
        'Spring MVC ' + chalk.red('DTO') + ' generator!\n' + chalk.green(this.props.dtoName)
      ));
    else
      this.log(yosay(
        'Spring MVC ' + chalk.red('DTO') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !dtoName;
        },
        type: 'input',
        name: 'dtoName',
        message: 'Insert dto class name.'
      },
      {
        type: 'confirm',
        name: 'useBaseDto',
        message: 'Extends from the BaseDto class?',
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

      this.props.dtoFileName = this.props.dtoName + 'Dto';

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');
    }.bind(this));
  }


  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    // Copy the Entity.
    this.fs.copyTpl(
      this.templatePath('_Dto.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/dto/' + this.props.dtoFileName + '.java'),
      {
        packageName: this.props.groupId,
        dtoClass: this.props.dtoFileName,
        extendBaseDto: this.props.useBaseDto
      }
    );

  }
};
