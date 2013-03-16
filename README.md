DORM
====

DORM (Document Object Render Model). Render HTML documents using JavaScript objects.

INSTALL
-------
Make sure you have NodeJS installed. Run the following command:

    npm install dorm


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

OPTIONS
-------

    Usage: dorm [options] <file>

    Options:

      -h, --help     output usage information
      -V, --version  output the version number
      -m, --minify   Minify the HTML output
      -o, --output   Create a HTML output file with the same name as the input file


TODO
----
     1	+ travis
     2	+ tests
     3	+ JavaScript events
     4	+ client version
     5	- Insert inline stylesheets
     6	- deal with self-closed elements like <br>
     7	- Insert ATTR on tags
     8	- Insert TEXT as content of TAG
     9	- transfer text to children element
    10	- Add chain methods
    11	- find solution for <span> in the middle of TEXT
    12	- add -pretty option for indented output, otherwise will be minified
    13	- doctype
    14	- tabspaces for indentation
    15	- STYLE method
    16	- Pretty indentation for output
    17	- include commander for command-line options
    18	- minify option with commander
    19	- -o (output) will create HTML files as output with the same name as the JSON files of input
    20	- auto executable program
    21	- convert into NPM module
