DORM
====

DORM (Document Object Render Model). Render HTML documents using JavaScript objects.

INSTALL
-------
Make sure you have NodeJS installed. Run the following command:

    npm install dorm -g

**-g** option will install the npm package globally.


EXAMPLE
-------
Here is a simple example how you can use DORM to render your HTML documents.

First, write a DORM file containing a JSON structured object:

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

Save this file as **example.json**. Execute the **dorm** program and pass this file as parameter.

    dorm example.json

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

MINIFY
------
To minify the file output run the command above adding the parameter **-m** or **--minify**.

    dorm -m example.json


VERSION LOG
-----------

* 0.0.4
Node module added. You can use DORM inside your node application now.

* 0.0.3
Convert output to Jade

* 0.0.2
Prettify HTML output

* 0.0.1
Convert JavaScript Object to HTML


TODO
----
Todo list made with [todo.c](https://github.com/marizmelo/todo.c):

     1	+ watch function - re-generate files uppon change
     2	+ -j option to convert to jade
     3	+ automatic children object, check for predefined options [attr,text, etc]
     4	+ include doctype number version instead of string
     5	+ convert to CoffeeScript objects
     6	+ html2js js2html modules inside DORM
     7	+ travis
     8	+ tests
     9	+ JavaScript events
    10	+ client version
    11	- Insert inline stylesheets
    12	- deal with self-closed elements like <br>
    13	- Insert ATTR on tags
    14	- Insert TEXT as content of TAG
    15	- transfer text to children element
    16	- Add chain methods
    17	- find solution for <span> in the middle of TEXT
    18	- add -pretty option for indented output, otherwise will be minified
    19	- doctype
    20	- tabspaces for indentation
    21	- STYLE method
    22	- Pretty indentation for output
    23	- include commander for command-line options
    24	- minify option with commander
    25	- -o (output) will create HTML files as output with the same name as the JSON files of input
    26	- auto executable program
    27	- convert into NPM module
