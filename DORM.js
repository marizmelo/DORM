var DORM = function(){};
var dorm = DORM.prototype;

// receive an array with classes of the element and generate html syntax
dorm.class = function(classes) {
  return " class="+escape(classes.toString());
}

dorm.render = function(dom) {
    // console.log("Number of elements: "+Object.keys(dom).length);
      for (var key in dom) {

        console.log("<"+key+">");
        if( typeof(dom[key]) == "object") {
        console.log( "\t" + Object.keys(dom[key]) );
      }else{
        console.log(dom[key]);
      }

        
        if(dom[key]["children"] && dom[key]["children"].length > 0) {

          for(var i=0; i<= dom[key]["children"].length; ++i) {
            dorm.render(dom[key]["children"][i]);
          }          
      }
      
      console.log("</"+key+">");
        
    }
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
                attr : {
                  "id": "mydiv"
                }
              }
            },
            {
              "div": {
                attr : {
                  "id": "mydiv2"
                },
                children:[
                  { "span" :{
                      "text" : "hello you"
                    } 
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
});
