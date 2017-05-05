Sales Events project setup steps
--------------------------------

1) UI code setup -

    a. Install Git, Bower, Node.js, Yaxy and Karma
    b. Make a pull from the following git repo (git@gitlab.corp.apple.com:akshay_oommen/sample-project.git)
    c. Once the pull is successful, go to 'sample-project' directory
    d. Run 'npm install' to install the packages mentioned in 'package.json'
    e. Run 'bower install' to install the libraries and frameworks mentioned in 'bower.json'
    f. Edit line 7 of the yaxy file so as to point to your local UI code
    g. Run yaxy
    h. Run /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=localhost:8558
    i. In the opened instance of Chrome, hit localhost:8081/app
    j. Live long and prosper!


2) UI coding etiquette -

    a. Ensure all newly added methods/components are checked in with corresponding behavioral test cases
    b. Ensure all test cases run successfully before checking in your code (using command 'grunt karma' or 'karma start' in the 'sample-project' directory)
    c. Ensure UI code is properly linted (using command 'grunt jshint')
    d. Provide author details and proper description for all newly added methods/components
    e. Follow the 4-spaces indentation rule while coding
    f. Keep code clean, short and simple
    g. Follow proper naming conventions for test cases (eg: SampleController.js -> SampleControllerTest.js)

3) Database setup -

    a. Use the provided src/main/resources/hsqldb.jar and start a local instance of hsqldb on your machine.
        - Start hsqldb server from terminal using 'java -cp /path/to/hsqldb.jar org.hsqldb.Server'
        - Start hsqldb database client from terminal using 'java -cp /path/to/hsqldb.jar org.hsqldb.util.DatabaseManager'
        - You will get a popup form. Select 'HSQL Database Engine Server' option for the 'Type' field.
          Leave all other fields intact with default values.
       Note: Always execute the above commands from same disk location so that you don't lose the data on subsequent starts.
       Tip: Create a data folder(say EventsDB) somewhere in your system and run the above commands from this folder only.

    b. Create the tables using the sql commands in src/main/resources/DDL.sql

4) Server setup -

    a. Checkout the code from the git repo (git@gitlab.corp.apple.com:akshay_oommen/sample-project.git)
    b. Make sure database is started.
    c. Go to sample-project directory and execute './gradlew run'
    d. Enter the Matrix !!
