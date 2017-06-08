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
    var directiveName = this.file ? this.file.directiveName : null;
    var rcFile = this.config.get('groupId');
    var rootFolder = this.props.rootFolder;

    this.props.directiveName = directiveName;

    // Have Yeoman greet the user.
    if (this.props.directiveName)
      this.log(yosay(
        'SpringMVC ' + chalk.red('Javascript Directive') + ' generator!\n' + chalk.green(this.props.directiveName)
      ));
    else
      this.log(yosay(
        'SpringMVC ' + chalk.red('Javascript Directive') + ' generator!'
      ));

    var prompts = [
      {
        when: function () {
          return !directiveName;
        },
        type: 'input',
        name: 'directiveName',
        message: 'Please insert the name of the directive (without directive at the end)',
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
      this.props.directiveName = firstToLowerCase(this.props.directiveName);
      this.props.directiveFileName = this.props.directiveName.replace(/([A-Z])/g, '-$1');
      this.props.directiveFileName = this.props.directiveFileName.toLowerCase();

    }.bind(this));
  }

  writing() {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    this.fs.copyTpl(
      this.templatePath('_.directive.js'),
      this.destinationPath('src/main/webapp/resources/widgets/' + this.props.directiveFileName + '/' + this.props.directiveFileName + '.directive.js'),
      {
        directiveName: this.props.directiveName,
        moduleName: this.props.directiveFileName
      }
    );
  }
};
