/*
  DORM (Document Object Render Model)
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/DORM
  desc:   Core library
*/

// DEPENDENCIES
var html = require("html"); // prettify HTML lib (replace later)

// DORM
var DORM = function(){}; 
var dorm = DORM.prototype;  // cache prototype


dorm.model = {
  indent : 4  // indentation spaces
, selfclose : ["meta", "br", "hr", "link", "doctype"]  // self-closed HTML tags
, buffer : ""
, minify : 0 // 0 - minify, 1 - prettify
, doctype : "!DOCTYPE html" // html 5 DOCTYPE for now
}


Function.prototype.chain = function() { // functions chains
  var self = this; // cache obj
  return function() {
    var ret = self.apply(this, arguments);
    return ret === undefined ? this : ret;
  }
};


dorm.attr = function (attr) {
  var attreturn = "";
  for (key in attr) {
    switch (key) {
      case "class":
        attreturn += dorm.class( attr[key] );
      break;
      case "style":
        attreturn += dorm.style( attr[key] );
      break;
      default:
        attreturn += " " + key + "=\""+ attr[key] + "\"";
      break;
    }
  }
  return attreturn;
};


dorm.style = function(styles) {  // receive an OBJECT with CSS properties/ values
  var buffer = "";  // buffer styles
  for(key in styles){
    buffer += key + ": " + styles[key] + "; ";
  }
  return " style=\"" + buffer.substring(0, buffer.length - 1) + "\""; // output styles and remove last character from buffer
};


dorm.class = function(classes) { // receive an ARRAY with classes of the element and generate HTML syntax
  return " class=\"" + classes.toString().replace(","," ") + "\"";  // convert array to CVS and replace commas with spaces
};


dorm.tag = function(tag, attr) {

  if(attr) {
    return "<" + tag + dorm.attr(attr) + ">";
  } else {
    // writing HTML DOCTYPE (if exit on DORM obj)
    if(tag == "doctype"){
      return "<" + this.model.doctype + ">";
    } else { 
      return "<" + tag + ">";  
    }
  }
};


dorm.tagclose = function(tag) {
    return "</" + tag + ">";
};


dorm.buffer = function(dom) {

  // look for all tag elements
  for (var key in dom) {
    
    // if element has TEXT content display
    if(key === "text") {
      dorm.model.buffer += dom[key];
    } else {

       dorm.model.buffer += dorm.tag(key, dom[key]["attr"]); // writes the open tag element
    
      // look for children nodes
      if(dom[key]["children"] && dom[key]["children"].length > 0) {

        // go over all children elements
        for(var i=0; i <= dom[key]["children"].length; ++i) {
          dorm.buffer(dom[key]["children"][i]); // recursive call for other tag elements
        }
      }

      // check for self-closing elements
      if(dorm.model.selfclose.indexOf(key) == -1){
        dorm.model.buffer += dorm.tagclose(key);
      }

    }//if-else (key === "text")

  }//for (var key in dom)
};


dorm.pretty = function (buffer) {
  // pretty HTML output
  return html.prettyPrint(buffer, {indent_size: this.model.indent});
}


dorm.render = function(dom) {
  // calls buffer method and display buffer model data

  this.model.buffer = ""; // clears current dorm.model.buffer
  this.buffer(dom); // buffer HTML output

  if(this.model.minify) {
    //process.stdout.write(this.model.buffer); // display HTML output
    return this.model.buffer;
  } else {
    //process.stdout.write( this.pretty(this.model.buffer) );
    return this.pretty(this.model.buffer);
  }

}.chain();  // chain method (you can call multiple times like .render().render() etc)


// export module to be used by NodeJS
module.exports = dorm;