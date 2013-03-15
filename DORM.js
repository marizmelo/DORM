#!/usr/bin/env node
/*
  DORM (Document Object Render Model)
  author: Mariz Melo (c) MIT 2013
*/

var DORM = function(){};
var dorm = DORM.prototype;

// data
dorm.model = {
  selfclose : ["meta", "br", "link"]
}

dorm.attr = function (attr) {
  // return HTML attributes for tag elements
  var attreturn = "";
  for (key in attr) {
    switch (key) {
      case "class":
        attreturn += dorm.class(attr[key]);
      break;
      default:
        attreturn += " " + key + "=\""+ attr[key] + "\"";
      break;
    }
  }
  return attreturn;
}

dorm.pretty = function (code) {
  // HTML code indentation
}

dorm.class = function(classes) {
  // receive an array with classes of the element and generate html syntax
  return " class=\""+classes.toString().replace(","," ")+"\"";
}

dorm.tag = function(tag, attr) {
  // return encapsulated tag element
  if(attr) {
    return "<" + tag + dorm.attr(attr) + ">";
  } else {
    return "<" + tag + ">";
  }
}

dorm.tagclose = function(tag) {
  // return encapsulated closed tag element
  return "</"+tag+">";
}

dorm.render = function(dom) {
  // renders the entire DORM objects
  // look for all tag elements
  for (var key in dom) {
    
    console.log( dorm.tag(key, dom[key]["attr"]) ); // writes the open tag element
    
    // if element has TEXT content display
    if(dom[key]["text"]) {
      console.log( "  " + dom[key]["text"] );
    }
    
    // look for children nodes
    if(dom[key]["children"] && dom[key]["children"].length > 0) {

      // go over all children elements
      for(var i=0; i<= dom[key]["children"].length; ++i) {
        dorm.render(dom[key]["children"][i]); // recursive call for other tag elements
      }
    }
  
    // check for self-closing elements
    if(dorm.model.selfclose.indexOf(key) == -1){
      console.log( dorm.tagclose(key) );
    }

  }//for
};

dorm.render({
  "html": {
    "events" : {
      click : function(){}
    },
    "attr" : {
      "class": [
      "responsive",
      "width-full"
      ]
    },
    "children": [
      {
        "head": {
          "children": [
            {
              "meta": {
              },
              "link": {
              },
              "title": {
                "text" : "hello world"
              }
            }
          ]
        }
      },
      {
        "body": {
          "children": [
            {
              "div": {
                "attr" : {
                  "id": "mydiv"
                },
                "text" : "Hi there"
              }
            },
            {
              "div": {
                "attr" : {
                  "id": "mydiv2",
                  "name": "mydiv2name"
                },
                "children":[
                  { "span" :  { "text" : "hello you" } }
                ]
              }
            }
          ]
        }
      }
    ]
  }
});
