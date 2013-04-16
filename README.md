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

Save this file as **example.dorm**. Execute the **dorm** program and pass this file as parameter.

    dorm example.dorm

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

* 0.0.5
Use Handlebars templates, use of .dorm files required (prevent handlebars file collisions)

* 0.0.4
Node module added, you can use DORM inside your node application now

* 0.0.3
Convert output to Jade

* 0.0.2
Prettify HTML output

* 0.0.1
Convert JavaScript Object to HTML


TODO
----
Todo list made with [todo.c](https://github.com/marizmelo/todo.c):

     2  + if extension is .coffee convert to js and than to HTML
     3  + watch function - re-generate files uppon change
     4  + -j option to convert to jade
     5  + automatic children object, check for predefined options [attr,text, etc]
     6  + include doctype number version instead of string
     7  + convert to CoffeeScript objects
     8  + html2js js2html modules inside DORM
     9  + travis
    10  + tests
    11  + JavaScript events
    12  + client version
    13  - Insert inline stylesheets
    14  - deal with self-closed elements like <br>
    15  - Insert ATTR on tags
    16  - Insert TEXT as content of TAG
    17  - transfer text to children element
    18  - Add chain methods
    19  - find solution for <span> in the middle of TEXT
    20  - add -pretty option for indented output, otherwise will be minified
    21  - doctype
    22  - tabspaces for indentation
    23  - STYLE method
    24  - Pretty indentation for output
    25  - include commander for command-line options
    26  - minify option with commander
    27  - -o (output) will create HTML files as output with the same name as the JSON files of input
    28  - auto executable program
    29  - convert into NPM module
    30  - HandleBars to render template variables
    31  - add .dorm extension for dorm files
