
[![Build Status](https://travis-ci.org/striderarun/birthday-app.svg?branch=master)](https://travis-ci.org/striderarun/birthday-app)

Project setup steps
--------------------------------

1) UI code setup -

    a. Install Git, Bower, Node.js, Yaxy and Karma
    b. Make a pull from the git repo
    c. Once the pull is successful, go to 'sample-project' directory
    d. Run 'npm install' to install the packages mentioned in 'package.json'
    e. Run 'bower install' to install the libraries and frameworks mentioned in 'bower.json'
    f. Edit line 7 of the yaxy file so as to point to your local UI code
    g. Run yaxy
    h. Run /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=localhost:8558
    i. In the opened instance of Chrome, hit localhost:8081/app

2) Server setup -
    a. Checkout the code from the git repo
    b. Make sure database is started.
    c. Go to sample-project directory and execute './gradlew run'
