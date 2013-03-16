DORM
====

DORM (Document Object Render Model). Render HTML documents with NodeJS using JavaScript objects.

INSTALL
-------
Make sure you have NodeJS installed. Run the following command:

    npm install dorm


EXAMPLE
-------
Here is a simple example how you can use DORM to render your HTML documents.

First, write an DORM file containing a JSON structured object:

    {
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
    }

Output:

    <!DOCTYPE html>
    <html>
    
      <head>
        <title>website title</title>
      </head>
      
      <body>
        <div></div>
      </body>

    </html>

Simple.

OPTIONS
-------
todo

TODO
----
     1  + prettify option with commander
     2  + make work on the client as well
     3  + convert into NPM module
     4  + STYLE method
     5  + include commander for command-line options
     6  + Pretty identation for output
     7  - Insert inline stylesheets
     8  - deal with self-closed elements like <br>
     9  - Insert ATTR on tags
    10  - Insert TEXT as content of TAG
    11  - transfer text to children element
    12  - Add chain methods
    13  - find solution for <span> in the middle of TEXT
    14  - add -pretty option for indented output, otherwise will be minified
    15  - doctype
    16  - tabspaces for indentation
