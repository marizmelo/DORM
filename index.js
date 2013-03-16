#!/usr/bin/env node

/*
  DORM (Document Object Render Model)
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/DORM
  desc:   dorm program
*/

// DEPENDENCIES
var program = require('commander')  // command line options
  , fs = require('fs')
  , $ = require("./lib/core.js");

function range(val) {
  return val.split('..').map(Number);
}

function list(val) {
  return val.split(',');
}

// commander options
program
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-m, --minify')
  //.option('-o, --output') //TODO
  .parse(process.argv);

// check if at least one input file was passed
if(program.args){

  // check if the output file should be minified
  if(program.minify){
    $.dorm.model.minify = 1;
  }

  // render HTML file
  fs.readFile(""+program.args[0], function read(err,data) {
    if (err) {
      return console.log("\nPlease specify an valid input file\n");
    }
    $.dorm.render(JSON.parse(data));
 
    if(program.output){ // create output file with content

    }
  });
}