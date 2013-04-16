/*
  DORM (Document Object Render Model)
  author: Mariz Melo (c) MIT 2013
  github: marizmelo/DORM
  desc:   Core library with Jade integration
*/

// DEPENDENCIES
var html = require("html"); // prettify HTML lib (replace later)

// DORM
var DORMJADE = function(){}; 
var dormjade = DORMJADE.prototype;  // cache prototype


dormjade.model = {
  indent : 4  // indentation spaces
, selfclose : ["meta", "br", "hr", "link", "doctype"]  // self-closed HTML tags
, buffer : ""
, minify : 0 // 0 - minify, 1 - prettify
, doctype : "!!!5" // html 5 DOCTYPE for now
}


Function.prototype.chain = function() { // functions chains
  var self = this; // cache obj
  return function() {
    var ret = self.apply(this, arguments);
    return ret === undefined ? this : ret;
  }
};


dormjade.attr = function (attr) {
  var attreturn = "";
  for (key in attr) {
    switch (key) {
      case "class":
        attreturn += dormjade.class( attr[key] );
      break;
      case "style":
        attreturn += dormjade.style( attr[key] );
      break;
      default:
        attreturn += " " + key + "=\""+ attr[key] + "\"";
      break;
    }
  }
  return attreturn;
};


dormjade.style = function(styles) {  // receive an OBJECT with CSS properties/ values
  var buffer = "";  // buffer styles
  for(key in styles){
    buffer += key + ": " + styles[key] + "; ";
  }
  return " style=\"" + buffer.substring(0, buffer.length - 1) + "\""; // output styles and remove last character from buffer
};


dormjade.class = function(classes) { // receive an ARRAY with classes of the element and generate HTML syntax
  return " class=\"" + classes.toString().replace(","," ") + "\"";  // convert array to CVS and replace commas with spaces
};


dormjade.tag = function(tag, attr) {

  if(attr) {
    return tag + '(' + dormjade.attr(attr) + ") ";
  } else {
    // writing HTML DOCTYPE (if exit on dormjade obj)
    if(tag == "doctype"){
      return this.model.doctype + '\n';
    }else{
      return "\n";
    }
  }
};


dormjade.tagclose = function(tag) {

  return "";
};


dormjade.buffer = function(dom) {

  // look for all tag elements
  for (var key in dom) {
    
    // if element has TEXT content display
    if(key === "text") {
      dormjade.model.buffer += dom[key];
    }else{

       
      // look for children nodes
      if(dom[key]["children"] && dom[key]["children"].length > 0) {
        dormjade.model.buffer += dormjade.tag(key, dom[key]["attr"], 1); // writes the open tag element
        // go over all children elements
        for(var i=0; i <= dom[key]["children"].length; ++i) {
          dormjade.buffer(dom[key]["children"][i]); // recursive call for other tag elements
        }
      }else{
        dormjade.model.buffer += dormjade.tag(key, dom[key]["attr"]); // writes the open tag element
      }

      // check for self-closing elements
      if(dormjade.model.selfclose.indexOf(key) == -1){
        dormjade.model.buffer += dormjade.tagclose(key);
      }

    }//if-else (key === "text")

  }//for (var key in dom)
};


dormjade.pretty = function (buffer) {
  // pretty HTML output
  return html.prettyPrint(buffer, {indent_size: this.model.indent});
}


dormjade.render = function(dom) {
  // calls buffer method and display buffer model data

  this.model.buffer = ""; // clears current dormjade.model.buffer
  this.buffer(dom); // buffer HTML output

  if(this.model.minify) {
    process.stdout.write(this.model.buffer); // display HTML output
  } else {
    process.stdout.write( this.pretty(this.model.buffer) );
  }

}.chain();  // chain method (you can call multiple times like .render().render() etc)


// export module to be used by NodeJS
module.exports = dormjade