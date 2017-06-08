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
    var repositoryName = this.file ? this.file.entityName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.repositoryName = repositoryName;

    // Have Yeoman greet the user.
    if (this.props.repositoryName)
      this.log(yosay(
        'Spring MVC ' + chalk.red('Java Repository') + ' generator!\n' + chalk.green(this.props.repositoryName)
      ));
    else
      this.log(yosay(
        'Spring MVC ' + chalk.red('Java Repository') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !repositoryName;
        },
        type: 'input',
        name: 'repositoryName',
        message: 'Insert Repository name.'
      },
      {
        type: 'confirm',
        name: 'useInterface',
        message: 'Use an interface for this Repository?',
        default: true
      },
      {
        when: function (response) {
          return response.useInterface;
        },
        type: 'confirm',
        name: 'useBaseRepository',
        message: 'Extends from BaseRepository class?',
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
          this.props[val] = typeof props[val] == 'string' ? props[val].trim() : props[val];
      } else {
        this.props = props;
      }
      this.destinationRoot(this.props.rootFolder);

      this.props.repositoryNamePrefix = this.props.repositoryName.substring(0, 1).toLowerCase();

      var parts = this.props.groupId.split('.');
      this.props.filePath = parts.join('/');
    }.bind(this));
  }

  writing() {

    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    this.fs.copyTpl(
      this.templatePath('_RepositoryJpa.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/repository/jpa/' + this.props.repositoryName + 'RepositoryJpa.java'),
      {
        packageName: this.props.groupId,
        repositoryName: this.props.repositoryName,
        implementsBaseRepository: this.props.useInterface,
        repositoryNamePrefix: this.props.repositoryNamePrefix
      }
    );

    if (this.props.useInterface) {
      this.fs.copyTpl(
        this.templatePath('_Repository.java'),
        this.destinationPath('src/main/java/' + this.props.filePath + '/repository/' + this.props.repositoryName + 'Repository.java'),
        {
          packageName: this.props.groupId,
          repositoryName: this.props.repositoryName,
          extendBaseRepository: this.props.useBaseRepository
        }
      );
    }
  }
};
