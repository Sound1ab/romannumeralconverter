# Roman Numeral Converter #

---

### How do I get set up? ###

* `Clone`,  or `download` the REPO from [Github]()
* ```npm install``` or ```yarn install``` to install necessary dependencies
* ```npm run dev``` to [run a webserver at localhost:8080](http://localhost:8080/)
* ```npm run build``` to create the deployment build in __build/__
* ```npm run test``` to launch test suite

##### Details #####

React 16 project created with create-react-app to convert decimal system digits into Roman Numerals. 

##### Styling #####

This project uses styled components to create components with encapsulated style.

##### Error Handling #####

Appropriate handling of the input has been setup in order to eliminate any type errors that could arise if it feeds any non numeric numbers into the converter. The converter will only accept a maximum of 4 digits as dashed symbols are not permitted. An error boundary has also been setup to catch any additional errors.

##### Tests #####

Simple snapshot tests have been setup for the basic components and a more in depth suite of test created for the RomanNumeralConverter.js component. 