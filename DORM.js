/*
  DORM (Document Object Render Model)
  author: Mariz Melo (c) MIT 2013
*/

// Dependencies
var html = require("html"); // prettify HTML lib (replace later)


// CONSTRUCTOR
var DORM = function(){}; 
var dorm = DORM.prototype;  // cache prototype


// MODEL
dorm.model = {
  indent : 4  // indentation spaces
, selfclose : ["meta", "br", "hr", "link", "doctype"]  // self-closed HTML tags
, buffer : ""
, pretty : 1 // 0 - minify, 1 - prettify
, doctype : "!DOCTYPE html"
}


// FUNCTION CHAINS
Function.prototype.chain = function() {

  var self = this; // cache obj
  return function() {
    var ret = self.apply(this, arguments);
    return ret === undefined ? this : ret;
  }
};


// ATTRIBUTES
dorm.attr = function (attr) {

  var attreturn = "";
  for (key in attr) {
    switch (key) {
      case "class":
        attreturn += dorm.class(attr[key]);
      break;
      case "style":
        attreturn += dorm.style(attr[key]);
      break;
      default:
        attreturn += " " + key + "=\""+ attr[key] + "\"";
      break;
    }
  }
  return attreturn;
};

// STYLES
dorm.style = function(styles) {
  // receive an OBJECT with CSS properties/ values and render as a style HTML attribute
  return " style=\"" + "\"";
};


// CLASSES
dorm.class = function(classes) {
  // receive an ARRAY with classes of the element and generate HTML syntax
  return " class=\"" + classes.toString().replace(","," ") + "\"";  // convert array to CVS and replace commas with spaces
};


// HTML OPEN TAG
dorm.tag = function(tag, attr) {

  if(attr) {
    return "<" + tag + dorm.attr(attr) + ">";
  } else {
    // writing HTML DOCTYPE (if exit on DORM obj)
    if(tag == "doctype"){
      return "<" + this.model.doctype + ">";
    }else{
      return "<" + tag + ">";  
    }
  }
};


// HTML CLOSE TAG
dorm.tagclose = function(tag) {

  return "</" + tag + ">";
};


// BUFFER FOR DORM
dorm.buffer = function(dom) {

  // look for all tag elements
  for (var key in dom) {
    
    // if element has TEXT content display
    if(key === "text") {
      dorm.model.buffer += dom[key] ;
    }else{

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


// RENDER DORM
dorm.render = function(dom) {
  // calls buffer method and display buffer model data

  this.model.buffer = ""; // clears current dorm.model.buffer
  this.buffer(dom); // buffer HTML output

  if(this.model.pretty) {
    process.stdout.write( html.prettyPrint(this.model.buffer, {indent_size: this.model.indent}) );
  } else {
    process.stdout.write(this.model.buffer); // display HTML output
  }

}.chain();  // chain method (you can call multiple times like .render().render() etc)


// EXAMPLE
dorm.render(    {
        "doctype" : {},
        "html" : {
            "children" : [
                {
                    "head" : {
                        "children" : [
                            { "title": { "children" : [{"text" : "website title"}] }}
                        ]
                    }
                },
                {
                    "body" : {
                        "children" : [
                            { "div": {} }
                        ]
                    }
                }
            ]
        }
    });