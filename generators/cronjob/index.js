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
    var jobName = this.file ? this.file.jobName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;
    var groupId = this.props.groupId ? this.props.groupId : null;

    this.props.jobName = jobName;

    // Have Yeoman greet the user.
    if (this.props.jobName) {
      this.log(yosay(
        'SpringMVC ' + chalk.red('Java Cron Job') + ' generator!\n' + chalk.green(this.props.jobName)
      ));
    }else {
      this.log(yosay(
        'SpringMVC ' + chalk.red('Java Cron Job') + ' generator!\n'
      ));
    }

    var prompts = [
      {
        when: function () {
          return !jobName;
        },
        type: 'input',
        name: 'jobName',
        message: 'Please insert the name of the job',
      },
      {
        when: function () {
          return !groupId;
        },
        type: 'input',
        name: 'groupId',
        message: 'Please enter the groupId: '
      },
      {
        when: function () {
          return !rcFile && !rootFolder;
        },
        type: 'input',
        name: 'rootFolder',
        message: 'Please enter the root folder of the project: ',
        default: process.cwd()
      }];

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
      this.props.jobFileName = this.props.jobName + 'Job';

    }.bind(this));
  }

  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    this.fs.copyTpl(
      this.templatePath('_Job.java'),
      this.destinationPath('src/main/java/' + this.props.filePath + '/scheduler/jobs/' + this.props.jobFileName + '.java'),
      {
        packageName: this.props.groupId,
        jobClassName: this.props.jobFileName
      }
    );
  }
};
