// CLASS: Field --------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// Define a class for elements from the field K
// The value of each element is stocked as a string which represents
// a combination of additions and products of litteral elements

class Field {
    // Creation of a new element of the class Field ---------------------------------------------------------------
    constructor(string = '1'){
        if(typeof string === 'string' && string !== ''){ // only string are accepted as input for construct the element
            // hide the data in element.state, this allow to prevent forbidden manual modification of the object
            this.state = {
                type: 'field',                     // different classes are distinguished by their type
                value: string                      // the value of the field element
            };
        }else{console.log('ERROR F.1: Forbidden field element declaration'); return};
    };
    // Allow direct and more intuitive access to data stored the object.state -------------------------------------
    get read(){                                    // used to display the element
        return this.state.value;
    }
    get type(){                                    // get the type of the object ('field')
        return this.state.type;
    };
    get value(){                                   // get the value of the field object
        return this.state.value;
    };
    // Update the value of the field element ----------------------------------------------------------------------
    update(string){
        if(typeof string === 'string' && string !== ''){
            this.state.value = string;
        }else{console.log('ERROR F.2: Forbidden field element declaration'); return};
    };
    // Compute the product of two field elements ------------------------------------------------------------------
    prod(mu1, mu2){
        // firest we check that the input is allowed for field product
        if(mu1.type === 'field' && mu2.type === 'field'){
            let out = new Field();                 // create a empty field element
            if(mu1.value === '0' || mu2.value === '0'){
                out.update('0');                   // case when one element is zero
            }else if(mu1.value === '1'){
                out.update(mu2.value);             // case when one element is unit
            }else if(mu2.value === '1'){
                out.update(mu1.value);             // case when one element is unit
            }else{                                 // general case
                // here we add some parentheses if needed to avoid mistakes in order of operations
                let m1 = '', m2 = '';
                if(mu1.value.includes('+') || mu1.value.includes('-')){
                    m1 = '(' + mu1.value + ')';
                }else{
                    m1 = mu1.value;
                };
                if(mu2.value.includes('+') || mu2.value.includes('-')){
                    m2 = '(' + mu2.value + ')';
                }else{
                    m2 = mu2.value;
                };
                out.update( '(' + m1 + '*' + m2 + ')' );
            };
            return out;
        }else{console.log('ERROR F.3: poruct on field require two field element arguments'); return};
    };
    // Compute the sum of two field elements ----------------------------------------------------------------------
    sum(mu1, mu2){
        if(mu1.type === 'field' && mu2.type === 'field'){
            let out = new Field();                 // create a empty field element
            if(mu1.value === '0'){
                out.update(mu2.value);             // case when one element is zero
            }else if(mu2.value === '0'){
                out.update(mu1.value);             // case when one element is zero
            }else if(mu2.value[0] === '-'){
                out.update(mu1.value + mu2.value); // case to adoid successive symbols '+-' => '-'
            }else{                                 // general case
                out.update(mu1.value + '+' + mu2.value);
            };
            return out;
        }else{console.log('ERROR F.4: sum on field require two field element arguments'); return};
    };
    // Return the nagative of the element value -------------------------------------------------------------------
    negative(input = this.state.value){
        let string = '';
        if(input.type === 'field'){
            string = input.value;
        }else if(typeof input === 'string' && input !== ''){
            string = input;
        }else{console.log('ERROR F.5: invalid value for negative field element'); return};
        let a = new Field(string);
        if(a !== '0'){                             // only add '-' if the element is non-zero
            if(a.value.includes('+') || a.value.includes('-')){
                a.update( '-(' + a.value + ')' );
            }else{                                 // add parentheses if needed
                a.update( '-' + a.value );
            };
        };
        return a;
    };
};

// -----------------------------------------------------------------------------
// Usage of class Field --------------------------------------------------------
// Field elements are initialiezd with a non-empty string
/*
var k1 = new Field('mu1');            // declare new field element with value mu1
var k2 = new Field('mu2');            // declare new field element with value mu2
var unit = new Field();               // declare the unit element in the field ('1')

console.log(k1.value)                 // a = mu1
k1 = Field.prototype.prod(k1, k2)     // compute the product of two field elements
console.log(k1.value)                 // a = (mu1*mu2)
k1 = Field.prototype.sum(k1, k1)      // compute the sum of two field elements
console.log(k1.value)                 // a = (mu1*mu2)+(mu1*mu2)
k1 = Field.prototype.prod(k2, k1)     // compute the product of two field elements
console.log(k1.value)                 // a = (mu2*((mu1*mu2)+(mu1*mu2)))
k1 = k1.negative()                    // compute the negative of a field element
console.log(k1.value)                 // a = -((mu2*((mu1*mu2)+(mu1*mu2))))
*/

// CLASS: Action -------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// Define a class for action element
// Can only contain tree different element: 1, 2, 3
// notations: b => 1, b* => 2, b** => 3

class Action {
    // Create a new action element --------------------------------------------------------------------------------
    constructor(a){
        if(a === 1 || a === 2 || a === 3){         // forbid wrong initializations of action element
            // hide the data in element.state, this allow to prevent forbidden manual modification of the object
            this.state = {
                type: 'action',                    // different classes are distinguished by their type
                value: a                           // the value of the action element
            };
        }else{console.log('ERROR A.1: only 1, 2 and 3 are valid entries for an action element'); return};
    };
    // Allow direct and more intuitive access data stored the object.state ----------------------------------------
    get type(){
        return this.state.type;
    };
    get value(){
        return this.state.value;
    };
    get read(){
        if(this.state.value === 1){return "b"};
        if(this.state.value === 2){return "b*"};
        if(this.state.value === 3){return "b**"};
    };
};

// -----------------------------------------------------------------------------
// Usage of class Action -------------------------------------------------------
// actions element are initialized with the numbers 1, 2 or 3
/*
var action = new Action(2)            // initialize an action element
console.log(action.value)             // 2   display the value of the action element
console.log(action.read)              // b*  display the value of the action with the notaitons of the article
*/

// CLASS: Monomial -------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// Define a class for monomial element from the algebra A
// Initialization with an object  O = {K: ..., letter: ..., exp: ..., ind: ...} or nothing
// It handle vorious operations as action, scalar product, but only restrained on monomials
// To represent base vector letter we use numbers as X => 1, Y => 2, Z => 3 and T => 4

class Monomial {
    // Create a new monomial element from algebra -----------------------------------------------------------------
    constructor(value = this.zero.value){
        if(this.isValidValue(value)){              // check if the input is correct to creat an albegra element
            // hide the data in element.state, this allow to prevent forbidden manual modification of the object
            this.state = {
                type: 'monomial',                  // different classes are distinguished by their type
                value: value                       // the value of the monomial element
            };
            if(this.isZero(value)){                // send all notation of zero to a unique zero notation
                let fieldElement = new Field('0');
                this.state.value = {K: fieldElement, letter: 1, exp: [], ind: []};
            };
        }else{console.log('Error M.1: Invalid entry to create monomial algebra element'); return};
    };
    // Update the value of an element -----------------------------------------------------------------------------
    update(value){
        if(this.isValidValue(value)){
            this.state.value = value;
            if(this.isZero(value)){
                let fieldElement = new Field('0');
                this.state.value = {K: fieldElement, letter: 1, exp: [], ind: []};
            };
        }else{console.log('Error M.2 : Invalid entry to create monomial algebra element'); return};
    };
    // Allow direct and more intuitive access to data stored the object.state --------------------------------------
    get K(){
        return this.state.value.K;
    };
    get letter(){
        return this.state.value.letter;
    };
    get exp(){
        return this.state.value.exp;
    };
    get ind(){
        return this.state.value.ind;
    };
    get value(){
        return this.state.value;
    };
    get type(){
        return this.state.type;
    };
    // Output the baseVector that represents the monomial (the monomial without the field element) ----------------
    // gives a unique string identifier for the base vector of the monomial
    get baseVector(){
        let a = this.state.value;
        let string = '';
        if(a.letter === 1){string = 'X'};
        if(a.letter === 2){string = 'Y'};
        if(a.letter === 3){string = 'Z'};
        if(a.letter === 4){string = 'T'};
        a.exp.forEach( (d) => {
            string = string + d;
        });
        a.ind.forEach( (d) => {
            string = string + d;
        });
        if(this.isZero(a)){string = '0'};
        return string;
    };
    // Output an easy readable string representing the monomial ---------------------------------------------------
    get read(){
        let a = this.state.value;
        let string = '';
        if(a.letter === 1){string = 'X'};
        if(a.letter === 2){string = 'Y'};
        if(a.letter === 3){string = 'Z'};
        if(a.letter === 4){string = 'T'};
        // add field element in front of the expression
        if(a.K.value !== '1'){
            string = '('+ a.K.value + ')*' + string;
        };
        // handle exp and ind
        a.exp.forEach( (d) => {
            string = string + d;
        });
        a.ind.forEach( (d) => {
            string = string + d;
        });
        if(this.isZero(a)){string = '0'};
        return string;
    };
    // output a string that represents how this base vector is obtained from actions on the X element -------------
    get readExpression(){
        let a = this.state.value;
        let string = 'X';
        const actionLetter = (number) => {
            if(number === 1){return 'b'};
            if(number === 2){return 'b*'};
            if(number === 3){return 'b**'};
        };
        for(let i = 0; i < a.exp.length; i++){
            if(a.ind[i] === 'r'){
                string = '(' + string + actionLetter(a.exp[i]) + ')';
            }else if(a.ind[i] === 'l'){
                string = '(' + actionLetter(a.exp[i]) + string + ')';
            };
        };
        if(this.isZero(a)){string = '0'};
        return string;
    };
    // Define some default values ---------------------------------------------------------------------------------
    get zero(){ // element 0 of A
        let fieldElement = new Field('0');
        let value = {K: fieldElement, letter: 1, exp: [], ind: []};    // Default .letter of zero is X (or 1)
        let out = new Monomial(value);
        return out;
    };
    get x(){ // element X of A
        let fieldElement = new Field('1');
        let value = {K: fieldElement, letter: 1, exp: [], ind: []};
        let out = new Monomial(value);
        return out;
    }
    // Function to verify if the given value is valid as entry for Monomial element --------------------------------
    isValidValue(value){
        // Verify if the entry object has all the right keys
        if(!('K' in value)){console.log('Entry do not have a .K value'); return false;};
        if(!('letter' in value)){console.log('Entry do not have a .letter value'); return false;};
        if(!('ind' in value)){console.log('Entry do not have a .ind value'); return false;};
        if(!('exp' in value)){console.log('Entry do not have a .exp value'); return false;};
        // Verify value.K
        if(value.K.type !== 'field'){console.log('Entry has a wrong .K attribution');return false;};
        // Define the sets of valid entries for exp, ind and letter
        let expSet = new Set([1,2,3]);
        let indSet = new Set(['r','l']);
        let letterSet = new Set([1,2,3,4]);
        // Verify that .letter is in set of valid letters
        if(!letterSet.has(value.letter) ){console.log('Entry has a wrong .letter attribution');return false;};
        // Verify if .exp and .ind are arrays
        if(!Array.isArray(value.ind)){console.log('.ind has to be an array'); return false;};
        if(!Array.isArray(value.exp)){console.log('.exp has to be an array'); return false;};
        // Verify is the length of .ind and .exp corresponds to the base vector letter
        if( (value.letter - 1) !== value.exp.length){
            console.log('Base vector letter do not corresponds to .exp legth'); return false;
        };
        if( (value.letter - 1) !== value.ind.length){
            console.log('Base vector letter do not corresponds to .ind legth'); return false;
        };
        // Verify is the content of .ind and .exp are in correct sets for .ind and .exp
        let bool = true;
        value.ind.forEach(d => {
            if(!indSet.has(d)){console.log('.ind values have to be r or l'); bool = false;};
        });
        value.exp.forEach(d => {
            if(!expSet.has(d)){console.log('.exp values have to be 1, 2 or 3'); bool = false;};
        })
        return bool;
    };
    // Function to verify if the element is one of the notations of the zero element -----------------------------
    isZero(value = this.state.value){                    // default value is itself
        var bool = false;
        // handle if value is a monomial type object and not only a value
        let input = {};
        if(value.type === 'monomial'){
            input = value.value;
        }else{
            input = value;
        };
        // = zero if repeated values in .exp of length 2
        if(input.exp.length === 2) {
            if(input.exp[0] === input.exp[1]){bool = true};
        };
        // = zero if repeated values in .exp if length 3
        if(input.exp.length === 3){
            if(input.exp[0] === input.exp[1]){bool = true};
            if(input.exp[0] === input.exp[2]){bool = true};
            if(input.exp[1] === input.exp[2]){bool = true};
        };
        // = zero if .K is zero
        if(input.K.value === '0'){bool = true}
        return bool;
    };
    // Method to multiply a monomial by a field element ----------------------------------------------------------
    scalarMult(e1, e2){
        // Firest check if the types are ok and their respective positions in arguments
        if(e1.type === 'field' && e2.type === 'monomial'){
            var field = e1, algebra = e2;
        }else if(e1.type === 'monomial' && e2.type === 'field'){
            var field = e2, algebra = e1;
        }else{console.log('ERROR M.3: wrong arguments for a scalar multiplication'); return};
        // generate the new output monomial element
        let value = {};                                       // create an empty value for entry
        value.K = Field.prototype.prod(algebra.K, field);     // compute its .K value by field product
        value.letter = algebra.letter;                        // the .letter value stay unchanged
        value.exp = algebra.exp;                              // the .exp value stay unchanged
        value.ind = algebra.ind;                              // the .ind value stay unchanged
        let out = new Monomial(value);                        // create the new monomial object
        return out;
    };
    // Method to do a left action on a monomial -------------------------------------------------------------------
    leftAction(b,a){
        // First check for right type of arguments
        if(a.type === 'monomial' && b.type === 'action'){
            // check if initial value is zero or T, so the output is trivially zero
            if(this.isZero(a) || a.letter === 4){return this.zero};
            // generate the new monomial element
            let value = {};                                   // create an empty value for entry
            value.K = a.K;                                    // the .K values stay unchanged
            value.letter = a.letter + 1;                      // indent the letter value by 1
            value.exp = a.exp.concat([b.value]);              // add the notation of the action element to .exp
            value.ind = a.ind.concat(['l']);                  // add 'l' to .ind for 'left action'
            let out = new Monomial(value);                    // create the new monomial object
            return out;
        }else{console.log('ERROR M.4: wrong arguments for left action'); return};
    };
    // Method to do a left action on a monomial -------------------------------------------------------------------
    rightAction(b,a){
        // First check for right type of arguments
        if(a.type === 'monomial' && b.type === 'action'){
            // check if initial value is zero or T, so the output is trivially zero
            if(this.isZero(a) || a.letter === 4){return this.zero};
            // generate the new monomial element
            let value = {};                                   // create an empty value for entry
            value.K = a.K;                                    // the .K values stay unchanged
            value.letter = a.letter + 1;                      // indent the letter value by 1
            value.exp = a.exp.concat([b.value]);              // add the notation of the action element to .exp
            value.ind = a.ind.concat(['r']);                  // add 'r' to .ind for 'right action'
            let out = new Monomial(value);                    // create the new monomial object
            return out;
        } else {console.log('ERROR M.5: wrong arguments for right action'); return};
    };
    // Method to do action on a monomial that knows itself if the action is left or right -------------------------
    action(a1, a2){
        // just see if the action element is on left or on right
        if(a1.type === 'action'){
            return this.leftAction(a1, a2);
        }else if(a2.type === 'action'){
            return this.rightAction(a2, a1);
        }else{ console.log('ERROR M.6: wrong arguments for action'); return};
    };
};

// Usage for class Monomial ----------------------------------------------------
/*
var k1 = new Field('1');                      // create a new field element
var k2 = new Field('mu');                     // create a new field element
var action = new Action(3);                   // Initialize an action element
var value = {                                 // this kind of objects is used to initialize monomial element
    K: k1,                                    // must contain a field element in .K
    letter: 3,                                // must contain a numeric element of 1, 2 , 3 or 4 in .letter (X => 1, Y => 2, Z => 3, T => 4)
    ind: ['r','r'],                           // must contain an array of string 'l' or 'r' in .ind ('l' for left and 'r' for right)
    exp: [1,2]                                // must contain an array of integers between 1, 2 and 3 in .exp
};
var a = new Monomial(value);                  // Initialize a monomial element


console.log(a.read)                         // Z12rr     display the value of the monomial
a = Monomial.prototype.action(action, a)    // right action
console.log(a.read)                         // T123rrl
a = Monomial.prototype.scalarMult(k2, a)    // scalar multiplication of a monomial by a field element
console.log(a.read)                         // (mu)*T123rrl
console.log(a.baseVector)                   // T123rrl       Display the base vector of the monomial (monomial without its field coefficient)
console.log(a.isZero())                     // false         Tell if a monomial is equal to zero
console.log(a.readExpression)               // (b**((Xb)b*)) Read the expression from where the vector of this element is obtained by action on the X element
*/


// CLASS: Polynomial ---------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// Define a class for handle polynomial element from the algebra A
// Initialization with an array of Monomial objects
// Its value is a map from the base vectors string notations to the corresponding monomials

class Polynomial {
    // Create a new polynomail element from algebra ---------------------------------------------------------------
    constructor(array = []){
        // verify if the array is an array of monomials
        if(!Array.isArray(array)){console.log('ERROR P.1: wrong initialization entry for polynomal object'); return};
        array.forEach(d => {
            if(d.type !== 'monomial'){console.log('ERROR P.2: wrong initialization entry for polynomal object'); return};
        });
        // hide the data in element.state, this allow to prevent forbidden manual modification of the object
        this.state = {
            type: 'polynomial',                                 // different classes are distinguished by their type
            value: new Map()                                    // initiate a polynomial value with an empty map
        };
        // add each element of the array to the polynomial
        this.add(array);
    };
    // Add an array of monomials to the polynomails element -------------------------------------------------------
    add(array){
        // verify if the array is an array of monomials
        if(!Array.isArray(array)){console.log('ERROR P.3: wrong initialization entry for polynomal object'); return};
        array.forEach(d => {
            if(d.type !== 'monomial'){console.log('ERROR P.4: wrong initialization entry for polynomal object'); return};
        });
        // add each element of the array to the polynomial
        array.forEach(d => {
            if(!d.isZero()){                                              // do nothing if monomial is zero
                let baseVector = d.baseVector;
                if(this.value.has(baseVector)){
                    let initialMon = this.value.get(baseVector);          // initial monomial of this baseVector
                    let value = {};                                       // create an empty value
                    value.K = Field.prototype.sum(initialMon.K, d.K);     // add the new field element to the inital monomial
                    value.letter = d.letter;                              // the .letter value stay unchanged
                    value.exp = d.exp;                                    // the .exp value stay unchanged
                    value.ind = d.ind;                                    // the .ind value stay unchanged
                    let sum = new Monomial(value);                        // create the new monomial object
                    this.value.set(baseVector, sum);                      // initiate the new monomial for this baseVector
                }else{
                    this.value.set(baseVector, d);
                };
            };
        });
    };
    // Allow direct and more intuitive access data stored the object.state ----------------------------------------
    get value(){
        return this.state.value;
    };
    get type(){
        return this.state.type;
    };
    get read(){ // easy readable string representation of the polynomial
        let string = '';
        this.state.value.forEach((value, key) => {
            string += value.read + ' + ';
        });
        if(string.length >= 3){string = string.slice(0, -2)};
        if(string === ''){string = '0'};
        return string;
    };
};

// -----------------------------------------------------------------------------
// Usage of class Polynomial ---------------------------------------------------
// Initialized with an array of monomials objects
/*
var k = new Field('mu');                      // initialize a field object
var a1 = new Monomial({K: k, letter: 3, ind: ['r','r'], exp: [1,2]});  // initialize a monomial object
var a2 = new Monomial(Monomial.prototype.x);  // initialize another monomial object by using a default value (the monomial is X)
var a3 = new Monomial(Monomial.prototype.zero)// initialize another monomial object by using a default value (the monomial is 0)
var p = new Polynomial([a1, a2, a3]);         // initialize a polynomial object
p.add([a2, a1, a1, a1, a3])                   // add monomials to the initial polynomial
console.log(p.read)                           // (mu+mu+mu+mu)*Z12rr + (1+1)*X
*/


// CLASS: Expression ---------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// A class to handle algebraic expressions that lead to the wanted equations in the article
// myExpression.equations() returns the polynomial that is equal to zero and is obtained from the given expression

class Expression {
    // Create a new expression element ---------------------------------------------------------------------------
    constructor(array){
        // verify if array is of the right form
        let degree = this.isValidExpression(array);
        if(degree){
            // hide the data in element.state, this allow to prevent forbidden manual modification of the object
            this.state = {
                type: 'expression',                                 // different classes are distinguished by their type
                value: array,                                       // initiate a polynomial value with an empty map
                degree: degree                                      // degree of expression is 3 or 4
            };
        }else{console.log('ERROR E.1: invalid entree for expression initialization'); return};
    };
    // Allow direct and more intuitive access to data stored the object.state -------------------------------------
    get type(){
        return this.state.type;
    };
    get value(){
        return this.state.value;
    };
    get degree(){
        return this.state.degree;
    };
    // A function to give a human readable representation of the expression ---------------------------------------
    read(array = this.state.value){
        let string = '';
        if(Array.isArray(array)){
            string = '(';
            array.forEach(d => {
                string += this.read(d);
            });
            string += ')';
        }else if(typeof array === 'string'){
            string += array;
        }else{
            string += array.read;
        };
        return string;
    };
    // Function to compute recurcively the depth of nested arrays -----------------------------------------------
    // X => 0, [X,X] => 1,  [X, [X]] => 2,  [X, [X, [X,X]]] => 3
    depth(array, level = 0){
        let newArray = [];
        if(Array.isArray(array)){
            array.forEach( d => {
                if(Array.isArray(d)){
                    newArray.push(this.depth(d, level + 1))
                }else{
                    newArray.push(level + 1)
                };
            });
        }else{
            newArray.push(level);
        };
        return Math.max(...newArray);
    };
    // Function to verify if the entry is a valid expression ------------------------------------------------------
    isValidExpression(array){
        if(Array.isArray(array) && array.length === 2){              // verify the right size of input array
            if(this.depth(array) === 2){ // verify the right types and size for degree 3 expressions
                let first = array[0], second = array[1];
                if(!Array.isArray(first)){first = [first]};
                if(!Array.isArray(second)){second = [second]};
                let lengthTwo = [], lengthOne = [];
                if(first.length === 2 && second.length === 1){
                    lengthTwo = first;
                    lengthOne = second;
                }else if(first.length === 1 && second.length === 2){
                    lengthTwo = second;
                    lengthOne = first;
                }else{console.log('Invalid array size and/or depth for expression'); return false};
                if(lengthOne[0].type !== 'action'){console.log('Invalid type element for expression'); return false};
                if( !((lengthTwo[0].type === 'action' && lengthTwo[1].type === 'monomial') ||
                      (lengthTwo[0].type === 'monomial' && lengthTwo[1].type === 'action'))   ){
                    console.log('Invalid type element for expression'); return false;
                };
                return 3;
            }else if(this.depth(array) === 3){ // verify the right types and size for degree 4 expressions
                let first = array[0], second = array[1];
                if(!Array.isArray(first)){first = [first]};
                if(!Array.isArray(second)){second = [second]};
                let lengthTwo = [], lengthOne = [];
                if(first.length === 2 && second.length === 1){
                    lengthTwo = first;
                    lengthOne = second;
                }else if(first.length === 1 && second.length === 2){
                    lengthTwo = second;
                    lengthOne = first;
                }else{console.log('Invalid array size and/or depth for expression'); return false};
                if(lengthOne[0].type !== 'monomial'){console.log('Invalid type element for expression'); return false};
                let first2 = lengthTwo[0], second2 = lengthTwo[1];
                if(!Array.isArray(first2)){first2 = [first2]};
                if(!Array.isArray(second2)){second2 = [second2]};
                let lengthTwo2 = [], lengthOne2 = [];
                if(first2.length === 2 && second2.length === 1){
                    lengthTwo2 = first2;
                    lengthOne2 = second2;
                }else if(first2.length === 1 && second2.length === 2){
                    lengthTwo2 = second2;
                    lengthOne2 = first2;
                }else{console.log('Invalid array size and/or depth for expression'); return false};
                if(lengthOne2[0].type !== 'action'){return false};
                if( !(lengthTwo2[0].type === 'action' && lengthTwo2[1].type === 'action') ){ return false};
                return 4;
            }else{console.log('invalid depth of nested arrays');return false};
        }else{console.log('input should be array');return false};
    };
    // ---------------------------------------------------------------------------------------------------------
    // recurcive product function on arrays that solve the product on types: monomial, field, action
    // Example: [ k1, [[X, action1, k2], [action2, k2]] ]
    // where k1 and k2 are in K, action1 and action2 are action element and X is a monomial of A
    product(array = this.state.value){
        // Define the recursion patern -------------------------------------------------------------------------------
        let newArray = [];
        let n = array.length;
        for(let i = 0; i < n; i++){
            if(Array.isArray(array[i])){
                newArray[i] = this.product(array[i]);     // Recurcively replace each array by the value of the product it defines
            }else{
                newArray[i] = array[i];
            };
        };
        // One step of the recursion ---------------------------------------------------------------------------------
        const allowedTypes = new Set(['monomial', 'action', 'field']);     // set of allowed values in the array
        // case when: XXX => XXX
        if(!Array.isArray(array)){
            return array;
        // case when: [] => []
        }else if(newArray.length === 0){
            return [];
        // case when: [XXX] => XXX
        }else if(newArray.length === 1 && !Array.isArray(newArray[0])){
            return newArray[0];
        // general case: when [XXX,...,XXX] => product(XXX,...,XXX)
        }else{
            let fieldEl = new Field('1');            // store the field element value of the product
            let algebraEl = [];                      // store all the actions and monomials elements
            let monomial = [];                       // store all the monomials (should be at most of length = 1)
            newArray.forEach((d) => {                   // store all the data in the right places
                if(!allowedTypes.has(d.type)){console.log('ERROR E.2: Invalid type of input element for product'); return};
                if(d.type === 'field'){fieldEl = Field.prototype.prod(fieldEl, d)};
                if(d.type === 'action'){algebraEl.push(d)};
                if(d.type === 'monomial'){algebraEl.push(d); monomial.push(d)};
            })
            if(algebraEl.length === 1 && monomial.length === 1){         // case when: [k,k,X,k] or [X] (no action)
                return Monomial.prototype.scalarMult(fieldEl, algebraEl[0]);
            }else if(algebraEl.length === 0){                            // case when [k,k,k,k] (no action niether monomials)
                return fieldEl;
            }else if(monomial.length === 1){                             // general case: [k,act,X,act,k,k]
                monomial = monomial[0];
                let beforeMonomial = true;                               // value to know if the action is left or right
                algebraEl.forEach( (d) => {
                    if(beforeMonomial && d.type === 'action'){           // compute left action
                        monomial = Monomial.prototype.action(d, monomial);
                    }else if(d.type === 'monomial'){
                        beforeMonomial = false;                          // set that the follownig action will be right actions action
                    }else if(!beforeMonomial && d.type === 'action'){    // compute right action
                        monomial = Monomial.prototype.action(monomial, d);
                    };
                })
                return Monomial.prototype.scalarMult(fieldEl, monomial);
            // all other cases are impossible in product
            }else{console.log('ERROR E.2: Invalid types amounts in input for product'); return};
        };
    };
    // ------------------------------------------------------------------------------------------------------------
    // Define a function that compute the identity
    // imput objects: [[X,Y],Z] or [X,[Y,Z]] where X, Y and Z are any objects
    // output the array that represents the terms of the identity
    // output example: [[mu1, expression], [mu2, expression], ..., [mu8, expression]]
    identity(input, fieldElement = new Field('1')){
        // Initialization ---------------------------------------------------------------------------------------------
        let coefficientLetter = '';
        let termIndex = 1;
        let output = [];
        let fieldFactor = new Field('1');
        let array = [];
        // Make the difference between [*, [*,*]] and [[*,*], *] ------------------------------------------------------
        if(Array.isArray(input) && input.length === 2){
            // copy the input in a new array:    [[X,Y],Z] => [[X,Y], [Z]]
            input.forEach( d => {
               if(Array.isArray(d)){
                   array.push(d);
               }else{
                   array.push([d]);
               };
            });
            //case when [[X,Y],Z] so the field coefficients are mu1, ..., mu8
            if(array[0].length === 2 && array[1].length === 1){
                coefficientLetter = 'mu';      // define the coeffcient letter
            // case when [X,[Y,Z]] so the field coefficients are lambda1, ..., lambda8
            }else if(array[0].length === 1 && array[1].length === 2){
                coefficientLetter = 'lambda';  // define the coeffcient letter
                // here we inverse the two elements of the array
                let mem = array[0]; array[0] = array[1]; array[1] = mem;
            }else{console.log('ERROR E.4: invalid array lengths for identity');return};
        }else{console.log('ERROR E.3: invalid input for identity');return};
        // Computation of the identity --------------------------------------------------------------------------------
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, [array[1][0], array[0][0]], array[0][1] ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, [array[0][0], array[1][0]],   array[0][1] ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, array[0][1],   [array[1][0], array[0][0]]  ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, array[0][1],   [array[0][0], array[1][0]]  ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, [array[1][0], array[0][1]],   array[0][0] ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, [array[0][1], array[1][0]],   array[0][0] ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, array[0][0],   [array[1][0], array[0][1]]  ]); termIndex++;
        fieldFactor = Field.prototype.prod(fieldElement, new Field(coefficientLetter + termIndex));
        output.push([fieldFactor, array[0][0],   [array[0][1], array[1][0]]  ]); termIndex++;
        return output;
    };
    // Expand degree tree expression on the right side ------------------------------------------------------------
    treeFactorsRightExpansion(array = this.state.value){
        let polynomial = new Polynomial();                  // create a new empty polynomial
        // first expantion ------------------------------------------------------------------------------------------
        let firstExp = this.identity(array);                // apply the identity on the expression
        // second expantion -----------------------------------------------------------------------------------------
        firstExp.forEach( (d) => {
            // find the part of length 2:  [*,*]
            let lengthTwoElement = {};
            if(d[1].length === 2){lengthTwoElement = d[1]};
            if(d[2].length === 2){lengthTwoElement = d[2]};
            // for the elements such as [[action1, action2], X], apply the identity a second time
            if(lengthTwoElement[0].type === 'action' && lengthTwoElement[1].type === 'action'){
                let twoTimesExpandedElement = this.identity([d[1], d[2]], d[0]);
                twoTimesExpandedElement.forEach( (dd) => {
                    polynomial.add([this.product(dd)]);
                });
            }else{
                polynomial.add([this.product(d)]);
            };
        });
        return polynomial;
    };
    // Expand degree tree expression on the left side -------------------------------------------------------------
    treeFactorsLeftExpansion(array = this.state.value){
        let monomial = this.product(array);
        let polynomial = new Polynomial([monomial]);
        return polynomial;
    };
    // Expand degree four expression on the left side -------------------------------------------------------------
    fourFactorsLeftExpansion(array = this.state.value){
        let polynomial = new Polynomial();
        // first expantion ------------------------------------------------------------------------------------------
        let firstExp = this.identity(array);                // apply the identity on the expression
        // second expantion -----------------------------------------------------------------------------------------
        firstExp.forEach( (d) => {
            if(d[1].length === 2 && d[2].length === 2){
                // CASE 1 -------------------------------------------------------------------------
                // for the terms where there is 2 degree 2 factors: (* *) (* *)
                // such as [[A, X], [A, A]], [[X, A], [A, A]], [[A, A], [X, A]] and ([[A, A], [A, X]]
                //    step 1: compute the expression    [[A, X], [A, A]] = [Y, [A, A]]
                //    step 2: expand with identity and compute product on each term
                if( (d[1][0].type === 'monomial' && d[1][1].type === 'action') ||
                    (d[1][1].type === 'monomial' && d[1][0].type === 'action')   ){
                    let dProd = this.product(d[1]);
                    let exp = this.identity([dProd, d[2]], d[0]);
                    exp.forEach( (dd) => {
                        polynomial.add([this.product(dd)]);
                    });
                }else if( (d[2][0].type === 'monomial' && d[2][1].type === 'action') ||
                          (d[2][1].type === 'monomial' && d[2][0].type === 'action')   ){
                    let dProd = this.product(d[2]);
                    let exp = this.identity([d[1], dProd], d[0]);
                    exp.forEach( (dd) => {
                        polynomial.add([this.product(dd)]);
                    });
                };
            }else{
                // CASE 2 --------------------------------------------------------------------
                // for terms with one factor of degree 1 and one factor of degree 3
                // such as     [[X, [A,A]], A],    [[[A,A], X], A],    [A,[[A,A], X]]  and  [A, [X, [A,A]]]
                //     step 1: expand with identity the factor of degree 3
                //     step 2: compute the expression
                if(d[1].length === 2){            // [[X, [A, A]], A]
                    let exp = this.identity(d[1]);
                    exp.forEach( (dd) => {
                        polynomial.add([this.product([d[0], dd, d[2]])]);
                    });
                }else if(d[2].length === 2){      // [A, [X, [A,A]]]
                    let exp = this.identity(d[2]);
                    exp.forEach( (dd) => {
                        polynomial.add([this.product([d[0], d[1], dd])]);
                    });
                };
            };
        });
        return polynomial;
    };
    // Expand degree four expression on the right side -------------------------------------------------------------
    fourFactorsRightExpansion(array = this.state.value){
        let polynomial = new Polynomial();
        // first expantion ------------------------------------------------------------------------------------------
        // we expand the term [A, [A, A]] and the the term X alone in [[A, [A, A]], X]
        let firstExp = [];
        if(array[0].length === 2){
            let id = this.identity(array[0]);
            id.forEach( (d) => {
                firstExp.push( [[d[1], d[2]], Monomial.prototype.scalarMult(array[1], d[0])] );
            });
        }else if(array[1].length === 2){
            let id = this.identity(array[1]);
            id.forEach( (d) => {
                firstExp.push([Monomial.prototype.scalarMult(array[0], d[0]), [d[1], d[2]] ]);
            });
        };
        // second expantion -----------------------------------------------------------------------------------------
        // Now we have 8 terms like [K, [A, [A, A]], X] and we just apply the left expantion to each term
        firstExp.forEach( (d) => {
            let exp = this.fourFactorsLeftExpansion(d);
            exp.value.forEach( (v, k) => {
                polynomial.add([v]);
            });
        });
        return polynomial;
    };
    // Right Expantion ----------------------------------------------------------------------------------------------
    rightExpansion(array = this.state.value){
        if(this.degree === 3){
            return this.treeFactorsRightExpansion(array);
        }else if(this.degree === 4){
            return this.fourFactorsRightExpansion(array);
        };
    };
    // Left Expantion ---------------------------------------------------------------------------------------------
    leftExpansion(array = this.state.value){
        if(this.degree === 3){
            return this.treeFactorsLeftExpansion(array);
        }else if(this.degree === 4){
            return this.fourFactorsLeftExpansion(array);
        };
    };
    // Get the resulting system of questions -----------------------------------------------------------------------
    equations(array = this.state.value){
        let left = this.leftExpansion(array);
        let right = this.rightExpansion(array);
        let out = new Polynomial();
        left.value.forEach((v,k)=>{
            let negField = new Field(v.K.negative().value);
            let value = {
                K: negField,
                letter: v.letter,
                ind: v.ind,
                exp: v.exp
            };
            let neg = new Monomial(value);
            out.add([neg]);
        });
        right.value.forEach((v,k)=>{
            out.add([v]);
        });
        return out;
    };
};

// -----------------------------------------------------------------------------
// Usage of class Expressions --------------------------------------------------
// Initialize expression by an allowed type of nested arrays of monomial and actions objects
/*
var X = new Monomial({ K: new Field('1'), letter: 1, ind: [], exp: []});        // initialize monomial element
var a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);                 // initialize 3 actions elements
var exp1 = new Expression([[a1, X], a2])                                        // initialize an expression of degree 3
var exp2 = new Expression([[[a1, a2], a3], X])                                  // initialize an expression of degree 4
var p = exp1.equations()                                                        // compute the equations on K that emerges from this expresion
console.log(p.read)
*/


// ----------------------------------------------------------------------------------------------------------------
// We export the previously defined classes -----------------------------------------------------------------------
// To allow more easy access for person that are not userd to Node.js, we use JavaScript-5 export/import grammar

module.exports.Field = Field;
module.exports.Action = Action;
module.exports.Monomial = Monomial;
module.exports.Polynomial = Polynomial;
module.exports.Expression = Expression;
