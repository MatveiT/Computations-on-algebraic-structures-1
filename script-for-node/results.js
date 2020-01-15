// RESULTS ---------------------------------------------------------------------
// -----------------------------------------------------------------------------

// First we export the needed classes to run our code --------------------------
const Field = require('./script.js').Field;
const Action = require('./script.js').Action;
const Monomial = require('./script.js').Monomial;
const Polynomial = require('./script.js').Polynomial;
const Expression = require('./script.js').Expression;

// Initialize X (a monomial in the algebra) and actions b, b* and b** ----------------------------------------------
const X = new Monomial({K: new Field('1'), letter: 1, ind: [], exp: []});
const a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);

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

// The object 'results' contains all the equations we wanted to compute.
// The output 'result' is structured as follows:

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
// Print the results by deleting the symbols '//' before one of the two console.log() functions below

// 1) Here we can display the object results in the terminal

//console.log(results);

// 2) Here we can display just the set of equations on K, equal to zero, used in the article.

for(let d in results){
    for(let dd in results[d]){
        //console.log(results[d][dd]);
    };
};
