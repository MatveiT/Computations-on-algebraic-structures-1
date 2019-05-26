
// -----------------------------------------------------------------------------
// First we export the needed classes to run out code --------------------------
const Field = require('./script.js').Field;
const Action = require('./script.js').Action;
const Monomial = require('./script.js').Monomial;
const Polynomial = require('./script.js').Polynomial;
const Expression = require('./script.js').Expression;

// -----------------------------------------------------------------------------
// Usage of class Field --------------------------------------------------------
// Field elements are initialiezd with a non-empty string

var k1 = new Field('mu1');            // declare new field element with value mu1
var k2 = new Field('mu2');            // declare new field element with value mu2
var unit = new Field();               // declare the unit element in the field ('1')

//console.log(k1.value)                 // a = mu1
k1 = Field.prototype.prod(k1, k2)     // compute the product of two field elements
//console.log(k1.value)                 // a = (mu1*mu2)
k1 = Field.prototype.sum(k1, k1)      // compute the sum of two field elements
//console.log(k1.value)                 // a = (mu1*mu2)+(mu1*mu2)
k1 = Field.prototype.prod(k2, k1)     // compute the product of two field elements
//console.log(k1.value)                 // a = (mu2*((mu1*mu2)+(mu1*mu2)))
k1 = k1.negative()                    // compute the negative of a field element
//console.log(k1.value)                 // a = -((mu2*((mu1*mu2)+(mu1*mu2))))



// -----------------------------------------------------------------------------
// Usage of class Action -------------------------------------------------------
// actions element are initialized with the numbers 1, 2 or 3

var action = new Action(2)            // initialize an action element
//console.log(action.value)             // 2   display the value of the action element
//console.log(action.read)              // b*  display the value of the action with the notaitons of the article


// -----------------------------------------------------------------------------
// Usage for class Monomial ----------------------------------------------------

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


//console.log(a.read)                         // Z12rr     display the value of the monomial
a = Monomial.prototype.action(action, a)    // right action
//console.log(a.read)                         // T123rrl
a = Monomial.prototype.scalarMult(k2, a)    // scalar multiplication of a monomial by a field element
//console.log(a.read)                         // (mu)*T123rrl
//console.log(a.baseVector)                   // T123rrl       Display the base vector of the monomial (monomial without its field coefficient)
//console.log(a.isZero())                     // false         Tell if a monomial is equal to zero
//console.log(a.readExpression)               // (b**((Xb)b*)) Read the expression from where the vector of this element is obtained by action on the X element


// -----------------------------------------------------------------------------
// Usage of class Polynomial ---------------------------------------------------
// Initialized with an array of monomials objects

var k = new Field('mu');                      // initialize a field object
var a1 = new Monomial({K: k, letter: 3, ind: ['r','r'], exp: [1,2]});  // initialize a monomial object
var a2 = new Monomial(Monomial.prototype.x);  // initialize another monomial object by using a default value (the monomial is X)
var a3 = new Monomial(Monomial.prototype.zero)// initialize another monomial object by using a default value (the monomial is 0)
var p = new Polynomial([a1, a2, a3]);         // initialize a polynomial object
p.add([a2, a1, a1, a1, a3])                   // add monomials to the initial polynomial
//console.log(p.read)                           // (mu+mu+mu+mu)*Z12rr + (1+1)*X

// -----------------------------------------------------------------------------
// Usage of class Expressions --------------------------------------------------
// Initialize expression by an allowed type of nested arrays of monomial and actions objects

var X = new Monomial({ K: new Field('1'), letter: 1, ind: [], exp: []});        // initialize monomial element
var a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);                 // initialize 3 actions elements
var exp1 = new Expression([[a1, X], a2])                                        // initialize an expression of degree 3
var exp2 = new Expression([[[a1, a2], a3], X])                                  // initialize an expression of degree 4
var p = exp1.equations()                                                        // compute the equations on K that emerges from this expresion
//console.log(p.read)






// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// RESULTS ---------------------------------------------------------------------
// Here we show how we get the equations on the field K that are used in the article

// Initialize X (a monomial in the Algebra) and actions b, b* and b** ----------------------------------------------
var X = new Monomial({K: new Field('1'), letter: 1, ind: [], exp: []});
var a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);

// Define the expressions we need ----------------------------------------------------------------------------------
const expressions = [
    new Expression([[a2,X], a1]),
    new Expression([[X,a2], a1]),
    new Expression([a1, [X,a2]]),
    new Expression([a1, [a2,X]]),
    new Expression([[[a1,a2], a3], X]),
    new Expression([[a1, [a2,a3]], X]),
    new Expression([X, [a1, [a2,a3]]]),
    new Expression([X, [[a1,a2], a3]])
];


// Compute the results --------------------------------------------------------------------------------------------
// For each expression we derive a polynomial P (on the algebra A) that is equal to zero on A
// Then for each polynomial P, we derive a system of equations on K that is equal to zero by taking the coefficielt of base vectors of P

let results = {};
expressions.forEach(d =>{
    let zeroPolynomialP = d.equations();        // compute the polynomial equation P = 0 that arise from this expression
    let exp = d.read();                         // determine a string that represents the initial expression
    results[exp] = {};
    zeroPolynomialP.value.forEach((v,k) => {
        results[exp][v.baseVector] = v.value.K.value;       // store the equations on K that are equal to zero by taking coefficients of base vectors of P
    });
});

// The output 'result', is structured as following:

//result = {
//  expression1: {
//    baseVector1: 'equationsOnKEqualToZero',
//    baseVector2: ... ,
//    ... ,
//    baseVectorN: 'equationsOnKEqualToZero'
//  },
//  expression2: ... ,
//  ... ,
//  expressionM: {
//    baseVector1: 'equationsOnKEqualToZero',
//    baseVector2: ... ,
//    ... ,
//    baseVectorN: 'equationsOnKEqualToZero'
//  };
//};

// Print the results ----------------------------------------------------------------------------------------------
// Print the results by deleting the symbols '//' before on of the two the console.log() function to print the result in the terminal

// 1) Here we can display the object results in the terminal

//console.log(results);

// 2) Here we can display just the set of equation on K equal to zero used in the article.

for(let d in results){
    for(let dd in results[d]){
        //console.log(results[d][dd]);
    };
};
