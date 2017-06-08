'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  initializing: function () {
    this.props = {};
    this.props.groupId = this.config.get('groupId');
    this.props.files = [];
  },

  prompting: function () {
    var done = this.async();
    var groupId = this.props.groupId;
    var dest = this.destinationRoot();
    var rcFile = groupId ? true : false;
    var createProject;
    var rootFolder;
    this.props.rcFile = rcFile;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Spring MVC Project Base generator!'
    ));

    function firstToLowerCase(text) {
      return text.substring(0, 1).toLowerCase() + text.substring(1);
    }

    var prompts = [
      {
        type: 'confirm',
        name: 'createProject',
        message: 'Create a new project?',
        default: true
      },
      {
        when: function (response) {
          return response.createProject;
        },
        type: 'input',
        name: 'groupId',
        message: 'Please enter the groupId(like: com.example.name) : ',
        store: true
      },
      {
        when: function (response) {
          return response.createProject;
        },
        type: 'input',
        name: 'artifactId',
        message: 'Please enter the artifactId(like: name) : ',
        store: true
      },
      {
        when: function (response) {
          return response.createProject;
        },
        type: 'input',
        name: 'workspace',
        message: 'Please enter your workspace where you would like the project installed : ',
        default: process.cwd(),
        store: true
      }, 
      {
        when : function(response){
          return response.createProject;
        }, 
        type: 'input',
        name: 'bashFolder', 
        message : 'Enter the folder where the bash file for project generation is located', 
        store: true
      }
    ];

    var addFilePrompt = [
      {
        type: 'confirm',
        name: 'addFile',
        message: 'Add a new file?',
        default: true
      }
    ];

    var fileTypePrompt = [
      {
        type: 'checkbox',
        name: 'files',
        message: 'What do you want to make today?',
        pageSize: 11,
        choices: [
          {
            name: 'Java Entity',
            value: 'entity'
          },
          {
            name: 'Java DTO',
            value: 'dto'
          },
          {
            name: 'Java Controller',
            value: 'java.controller'
          },
          {
            name: 'Java Service',
            value: 'java.service'
          },
          {
            name: 'Java Cron Job',
            value: 'cronjob'
          },
          {
            name: 'Java Exception',
            value: 'exception'
          },
          {
            name: 'Java Repository',
            value: 'repository'
          },
          {
            name: 'Javascript Module',
            value: 'module'
          },
          {
            name: 'Javascript Controller',
            value: 'javascript.controller'
          },
          {
            name: 'Javascript Service',
            value: 'javascript.service'
          },
          {
            name: 'Javascript Directive',
            value: 'directive'
          }, {
            name : 'DTO Validator', 
            value : 'validator'
          }]
      },
      {
        when: function () {
          return !groupId && !createProject;
        },
        type: 'input',
        name: 'groupId',
        message: 'Please enter the groupId: '
      },
      {
        when: function (response) {
          for (var val in response.files) {
            var name = response.files[val];
            if (['dto', 'entity', 'java.controller', 'java.service', 'repository', 'module', 'javascript.controller', 'javascript.service', 'validator'].indexOf(name) >= 0)
              return true;
          }
          return false;
        },
        type: 'input',
        name: 'entityName',
        message: 'Please enter the Entity name for which to create the specified classes: '
      },
      {
        when: function (response) {
          return response.files.indexOf('cronjob') >= 0;
        },
        type: 'input',
        name: 'jobName',
        message: 'Please enter the Cron Job name: '
      },
      {
        when: function (response) {
          return response.files.indexOf('exception') >= 0;
        },
        type: 'input',
        name: 'exceptionName',
        message: 'Please enter the Exception name: '
      },
      {
        when: function (response) {
          return response.files.indexOf('directive') >= 0;
        },
        type: 'input',
        name: 'directiveName',
        message: 'Please enter the Directive name(camel cased): '
      },
      {
        when: function () {
          return !rcFile && !createProject && !rootFolder;
        },
        type: 'input',
        name: 'rootFolder',
        message: 'Please enter the root folder of the project: ',
        store: true,
        default: process.cwd()
      }
    ];

    function promptMe(thisFile) {
      thisFile.prompt(fileTypePrompt).then(function (props) {

        if (props.groupId) {
          thisFile.props.groupId = props.groupId.trim();
          groupId = props.groupId.trim();
        }

        if (props.rootFolder) {
          thisFile.props.rootFolder = props.rootFolder.trim();
          rootFolder = props.rootFolder.trim();
        } else if (thisFile.props.createProject) {
          thisFile.props.rootFolder = thisFile.props.workspace + '/' + thisFile.props.artifactId;
          rootFolder = thisFile.props.rootFolder;
        }

        thisFile.props.files.push(props);
        thisFile.prompt(addFilePrompt).then(function (props) {
          if (props.addFile)
            promptMe(thisFile);
          else
            done();
        });
      });
    }

    this.prompt(prompts).then(function (props) {
      for (var val in props)
        this.props[val] = typeof props[val] == 'string' ? props[val].trim() : props[val];

      createProject = props.createProject;

      this.prompt(addFilePrompt).then(function (props) {
        if (props.addFile)
          promptMe(this);
        else
          done();
      }.bind(this));
    }.bind(this));
  },

  configuring: function () {
    if (this.props.rootFolder)
      this.destinationRoot(this.props.rootFolder);

    var parts = this.props.groupId.split('.');
    this.props.filePath = parts.join('/');
  },

  writing: function () {
    if (!this.props.rcFile)
      this.config.set('groupId', this.props.groupId);

    if (this.props.createProject) {
      this.spawnCommandSync("bash", [this.props.bashFolder + "/spring-mvc-gen.sh", "-g", this.props.groupId, "-a", this.props.artifactId, "-b", this.props.workspace]);
    }

    for (var val in this.props.files) {
      for (var vals in this.props.files[val].files) {
        this.composeWith(require.resolve('../' + this.props.files[val].files[vals]), { props: this.props, file: this.props.files[val] });
      }
    }
  },
});