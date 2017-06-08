#!/bin/bash

# A maven archetype helper script.

# path to Java.
pathJava=/usr/lib/jvm/java-8-oracle

# This is the archetype template.
archetypeGroupId="com.*.archetypes"
archetypeArtifactId="spring-mvc"
archetypeVersion="0.0.1-SNAPSHOT"
interactiveMode=false

# The requested parameters.
myGroupId=""
myArtifactId=""
myWorkspace=""


# usage() {
# 	echo "Usage: $0 [-g groupId] [-a artifactId ] [-b workspace]" 1>&2; exit 1;
# }

while getopts ":b:a:g:" opt; do
  case "${opt}" in
    b)
      myWorkspace=${OPTARG}
      ;;
    a)
      myArtifactId=${OPTARG}
      ;;
    g)
      myGroupId=${OPTARG}
      ;;
    *)
      usage
      ;;
    esac
done

shift $((OPTIND-1))

if [ -z "${myArtifactId}" ] || [ -z "${myGroupId}" ] || [ -z "${myWorkspace}" ]; then
  usage
fi

echo "Create a maven project with following options:"
echo "ArtifactId: "$myArtifactId
echo "GroupId: "$myGroupId
echo "Workspace : "$myWorkspace

mkdir -p "$myWorkspace"
cd "$myWorkspace"

export JAVA_HOME=$pathJava

#mvn -X archetype:generate -DgroupId=$myGroupId -DartifactId=$myArtifactId -DinteractiveMode=$interactiveMode -DarchetypeGroupId=com.*.archetypes -DarchetypeArtifactId=spring-mvc -DarchetypeVersion=0.0.1-SNAPSHOT 
#-f '/home/fabrice/.m2/repository/com/*/archetypes/spring-mvc/0.0.1-SNAPSHOT/' 

mvn archetype:generate -DgroupId="$myGroupId" -DartifactId="$myArtifactId" -Dversion=0 -Dpackage="$myGroupId" -DarchetypeGroupId="$archetypeGroupId" -DarchetypeArtifactId="$archetypeArtifactId" -DarchetypeVersion="$archetypeVersion" -DinteractiveMode=$interactiveMode

# Change to the generated project directory.
cd "$PWD"
cd $myArtifactId

{
  echo '{'
  echo '  "generator-gen-java" : {'
  echo '    "groupId": "'${myGroupId}'"'
  echo '  }'
  echo '}'
} > .yo-rc.json

# Configure the project for Elcipse.
mvn eclipse:eclipse
