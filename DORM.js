var DORM = function(){};
var dorm = DORM.prototype;

// data
dorm.model = {
  selfclose : ["meta", "br", "link"]
}

dorm.attr = function (attr) {
  // return HTML attributes to object
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
  // indent HTML code
}

dorm.class = function(classes) {
  // receive an array with classes of the element and generate html syntax
  return " class=\""+escape(classes.toString())+"\"";
}

dorm.render = function(dom) {
    // console.log("Number of elements: "+Object.keys(dom).length);
  for (var key in dom) {

    var opentag = "<"+key;
    
    if(dom[key]["attr"]){
      opentag += dorm.attr(dom[key]["attr"]) + ">";
    }else{
      opentag += ">";
    }//if_else
    
    console.log(opentag);
    
    if( typeof(dom[key]) == "object") {
      console.log( "\t" + Object.keys(dom[key]) );
    }else{
      console.log(dom[key]);
    }//if_else
    
    if(dom[key]["children"] && dom[key]["children"].length > 0) {

      for(var i=0; i<= dom[key]["children"].length; ++i) {
        dorm.render(dom[key]["children"][i]);
      }//for
    }//if
  
    // check for self-closing elements
    if(dorm.model.selfclose.indexOf(key) == -1){
      console.log("</"+key+">");
    }//if
  }//for
};

dorm.render({
  "html": {
    "events" : {
      click : function(){}
    },
    "attr" : {
      "class": [
      "responsive"
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
              "title": "hello world"
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
                  { "span" :  "hello you" }
                ]
              }
            }
          ]
        }
      }
    ]
  }
});
