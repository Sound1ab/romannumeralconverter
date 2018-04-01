# Roman Numeral Converter #

---

### How do I get set up? ###

* `Clone`,  or `download` the REPO from [Github](https://github.com/Sound1ab/romannumeralconverter)
* ```npm install``` or ```yarn install``` to install necessary dependencies
* ```npm run dev``` to [run a webserver at localhost:8080](http://localhost:8080/)
* ```npm run build``` to create the deployment build in __build/__
* ```npm run test``` to launch test suite

#### Details ####

React 16 project created with create-react-app to convert decimal system digits into Roman Numerals. 

#### Styling ####

This project uses styled components to create components with encapsulated style.

#### Error Handling ####

Appropriate handling of the input has been setup in order to eliminate any type errors that could arise if it feeds any numeric numbers into the converter. 

The component also has checks setup to watch repeating, descending and incorrect subtractor values.

#### Tests ####

Simple snapshot tests have been setup for the basic components and a more in depth suite of test created for the RomanNumeralConverter.js component. 

#### Unresolved issues ####

Currently there is no way to group input values intelligently. For example, the current input checks can't determine that LXL is incorrect. This is because the algorithm starts by slicing off the first L, then grouping the next two values as 40, giving a value of 90. A more advanced lookup on the input is needed to figure this out.