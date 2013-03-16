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
      -m, --minify   


TODO
----
     1	+ auto executable program
     2	+ travis
     3	+ tests
     4	+ JavaScript events
     5	+ client version
     6	+ convert into NPM module
     7	- Insert inline stylesheets
     8	- deal with self-closed elements like <br>
     9	- Insert ATTR on tags
    10	- Insert TEXT as content of TAG
    11	- transfer text to children element
    12	- Add chain methods
    13	- find solution for <span> in the middle of TEXT
    14	- add -pretty option for indented output, otherwise will be minified
    15	- doctype
    16	- tabspaces for indentation
    17	- STYLE method
    18	- Pretty indentation for output
    19	- include commander for command-line options
    20	- minify option with commander
    21	- -o (output) will create HTML files as output with the same name as the JSON files of input
