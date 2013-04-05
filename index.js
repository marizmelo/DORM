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
  , j$ = require('./lib/dormjade')
  , $ = require('./lib/dorm');

function range(val) {
  return val.split('..').map(Number);
}

function list(val) {
  return val.split(',');
}

// commander options
program
  .version('0.0.3')
  .usage('[options] <file>')
  .option('-m, --minify', 'Minify the HTML output')
  .option('-o, --output', 'Create a HTML output file with the same name as the input file')
  .option('-j, --jade', 'Create a JADE output file with the same name as the input file')
  .parse(process.argv);


// check if at least one input file was passed
if(program.args.length){

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
     
      var newfile = ""+program.args[0].replace(".json", ".html");

      fs.writeFile(newfile, $.dorm.pretty($.dorm.model.buffer), function (err) {
        if (err) { 
          console.log("\nError writing output file\n");
        } else {
          console.log("\nOutput file successfully saved\n");
        }
      });
    }
  });
}