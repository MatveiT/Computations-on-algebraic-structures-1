**Please read carefully parts (1), (2) and (3) to use this code. Parts (4) and (5) contain more detailed explanations.**

# 1) Introduction

In the article

**[1] X. García-Martínez, M. Tsishyn, T. Van der Linden and C. Vienne, A characterisation of Lie algebras via action representability**

we have encountered the need to determine a system of equations that is used to complete the proof of one of the main results. The inconsistency of this system proves that the result is valid. The computations required to arrive to this system of equations are, in a certain extent, repetitive and long enough to convince us that the best way to obtain the equations is by the use of a computer.

So, the **purpose** of this project is to **generate the system of equations used in [1]**. This project is written is a such way that anyone can replicate our computations and verify the correctness of this code. We also did our best to make the code, or at least its usage, understandable for those who are less familiar with programming.

#### 1.1) Choice of the language

This project is written in **JavaScript**, version 6 (**ES6**). JavaScript may not be the usual choice for this kind of algebraic computations. Languages such as Wolfram Mathematica are more adapted to symbolic manipulation of systems of equations. However, we chose to use JavaScript for the two following reasons:
- the algebraic structures we have to manipulate are very specific to this article, and we wanted to keep full control of what exactly the code is doing, to be completely sure of the result;
- the use of JavaScript allows anyone to test the code: no need for a license.

#### 1.2) Disclaimer

The purpose of this code is to generate a specific type of equations obtained from a specific type of expressions on specific algebraic structures, as described in the article [1]. So, there is absolutely no guarantee that it will give correct results in any other context. Knowing that, this code should not be used for any other purpose than the generation of equations in the context of the article [1], save by users who are totally aware of what they are doing.

# 2) How to use

In (2.1), we explain two ways this code can be run:
  - in an on-line JavaScript editor;
  - by executing a JavaScript project locally on your computer by means of Node.js, a classical way to execute JS files.

The first option does not require any modification of the code files. In the second case, some lines must be uncommented, in order to choose the way the output is presented.

In (2.2), we explain how the code can be used to obtain the set of equations in question. Furthermore, users can themselves obtain the equations they want by modifying or adding lines of code in the right place.

#### 2.1) How to run

We adapted the code to two different environments.

**2.1.1) On-line execution**

  The simplest way:
  Without any required installation on your computer, you can simply copy and paste the content of the file 'JScode.txt' (folder './online-execution/') in any JavaScript on-line editor (such as for instance 'https://playcode.io/online-javascript-editor'). Then, the system of equations will be displayed in the terminal.

**2.1.2) Execution in Node.js**

  For 'Node.js' users, to run JavaScript locally on your computer, you first need to install **Node.js**. Then you can execute the content of the folder './script-for-node/' to obtain the results.
  - The file 'script.js' defines the main code needed to obtain the equations from a given expression.
  - The file 'usage.js' shows how to use the code from 'script.js'
  - The file 'results.js' defines the eight expressions $e_1$, ..., $e_8$ and uses 'script.js' to obtain the wanted system of expressions.

  To obtain the results, first uncomment the relevant lines in the file 'results.js', then execute it in the folder './script-for-node/', using the command line as follows.
  ```
  node results.js
  ```

#### 2.2) How the system of equations is obtained

Once it is clear how to execute the code, here is a short explanation of the part that leads to the system of equations in question. This code is found in the following place:

- with (2.1.1): at the end of the text document './online-execution/JScode.txt';
- with (2.1.2): in the file './script-for-node/results.js'.

First, we define `k` the unit of the field $K$.
```
const k = new Field('1');
```
Then, we define `a1`, `a2` and `a3` as the three elements $b$, $b'$ and $b''$ that act on $A$.
```
const a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);
```
Then, we define the monomial element `X` that represents $X \in A$.
```
const X = new Monomial({K: k, letter: 1, ind: [], exp: []});
```
Then, we define the expression from which we want to derive the equations. For example `[[[a1,a2], a3], X]` represents $((b \cdot b') \cdot b'') \cdot X$
```
const myExpression = new Expression([[[a1,a2], a3], X])
```
Finally, to obtain the polynomial $P$ on $A$ from this expression, we use the method `.equations()` of the class `Expression`.
```
let polynomial = myExpression.equations()
```
We can display the whole polynomial $P$ by using
```
console.log(polynomial.read)
```
Or we can display the equations on $K$ that are equal to zero obtained from the expression `myExpression` as
```
polynomial.value.forEach( v => {
    console.log(v.value.K.value);
});
```

More detailed usage of the code is explained in './script-for-node/usage.js' and in part (5).


# 3) Results
The folder './results/' contains two files:
- 'results.txt': a text file whose lines represent the equations on $K$ that are equal to zero obtained from the eight expressions $e_1$, ..., $e_8$.
- 'results.json': a JSON (JavaScript Object Notations) file, which is an object that gives all the equations together with the information from which expression each equation comes, as well as which base vector it is the coefficient of.

# 4) A brief explanation of the theoretical context

A complete and rigorous theoretical context of this code is explained in [1]. However, let us take some lines to explain the main idea of what the code computes from a more theoretical point of view.

#### 4.1) Notations and definitions of algebraic structures

Let us consider a field $K$ and an algebra $A$ over $K$.
A basis of $A$ is defined as 

$B = \{ X, Y^{i}\_{p_1}, Z^{j,k}\_{p_2, p_3}, T^{l,m,n}\_{p_4, p_5, p_6} \}$, 

where $p_1$, ..., $p_6$ are in the set $\{ left, right \}$ and $i$, $j$, $k$, $l$, $m$, $n$ are in the set $\{ 1,2,3 \}$. Moreover, if $j = k$, then the element $Z^{i,k}\_{p_2, p_3}$ is zero and if $l$, $m$ and $n$ are not two by two different, then the element $T^{l,m,n}\_{p_4, p_5, p_6}$ is also zero.

Now, we define an action of three elements $b$, $b'$ and $b''$ (alternatively denoted as $b_1$, $b_2$ and $b_3$) on $A$ via $\{b, b', b''\} \times A \rightarrow A$ such that

$b_t \cdot X = Y^{t}\_{left} $

$b_t \cdot Y^{j}\_{p_1} = Z^{j,t}\_{p_1, left} $

$b_t \cdot Z^{j,k}\_{p_2, p_3} = T^{j,k,t}\_{p_2,p_3, left} $

$b_t \cdot T^{l,m,n}\_{p_4, p_5, p_6} = 0$

for any $t$, $i$, $j$, $k$, $l$, $m$, $n$ in $\{1,2,3 \}$ and $p_1$, $p_2$, $p_3$, $p_4$, $p_5$, $p_6$ in $\{ left, right \}$. The same equations hold for right actions, but with the new index coefficient $right$ instead of $left$.

#### 4.2) Method for finding the equations

Now we consider the eight following algebraic expressions:

$e_1 = (b' \cdot X)\cdot b$,

$e_2 = (X \cdot b')\cdot b$,

$e_3 = b \cdot (X \cdot b')$,

$e_4 = b \cdot (b' \cdot X)$,

$e_5 = ((b \cdot b')\cdot b'')\cdot X$,

$e_6 = (b \cdot (b'\cdot b''))\cdot X$,

$e_7 = X \cdot (b\cdot(b' \cdot b''))$

and $e_8 = X \cdot ((b \cdot b') \cdot b'')$.

Note that the expressions $e_5$, $e_6$, $e_7$ and $e_8$ have no meaning in the context of the algebra $A$ alone. However, they can be defined in an extended algebraic structure built on the top of $A$ (whose exact definition is given in [1]).

Then, each of these expressions $e_i$ (for $i=1, ..., 8$) is expanded in two different ways by the use of the **identity** (exact formula of the identity in [1]) and the two expansions are transferred to the same side of the equality, so that we obtain a polynomial $P_i$ on $A$ that is equal to zero. The polynomial $P_i$ can be written as

$P_i = \sum_{ V \in B} k_{(i, V)} V = 0$,

where $k_{(i,V)}$ are in $K$ and V are the elements of the basis $B$.

Thus we obtain a system of equations on $K$,  $\{ k_{(i,V)}=0 \}\_{i \in \{1,..., 8 \}, V \in B}$. Note that some of these equations are just $0=0$.

# 5) Advanced usage

For those who want to play with the code, test the code, or verify its correctness, here is a more detailed explanation on how to use it and how it works.

This code defines five classes (Field, Action, Monomial, Polynomial and Expression) in the programming language JavaScript (version ES6). Each of these classes gives access to at least its '.value', its '.type' and its '.read' (which is an easy human readable version of its value) by using:

`myElement.value`: gives the value that defines the element

`myElement.type`: gives a string that defines its class as 'field', 'action', 'monomial', 'polynomial' or 'expression'

`myElement.read`: gives a human readable string that represents the value of the object

Note that, unless this is specified, each method of each class does not change the content of the element on which it is applied; instead, it gives a new object as output.

#### 5.1 Define the class Field
An element of this class is an element $k$ of the field $K$.

**Initialization**: with non-empty string or nothing (default value is '1'): `myFieldElement = new Field(myString)`

The element $0_K$ of $K$ is initialized with the string '0' and the element $1_K$ of $K$ is initialized with the string '1'.

Supports internal **addition**, **product** and **nagative**:

`Field.prototype.add(myFieldElement1, myFieldElement2)`

`Field.prototype.prod(myFieldElement1, myFieldElement2)`

`Field.prototype.negative(myFieldElement)` or `myFieldElement.negative()`

**Type**: `myFieldElement.type` gives the string 'field'

**Value**:`myFieldElement.value` gives a string that defines the value of the field element (which is a string composed of the symbols '(', ')', '+', '-', ' * ', '1', '0' and literal elements)

**Read**: `myFieldElement.read` in the case of field elements, this is equivalent to `myFieldElement.value`

**Usage**
```
var k1 = new Field('mu1');            // declare new field element with value mu1
var k2 = new Field('mu2');            // declare new field element with value mu2
var unit = new Field();               // declare the unit element in the field ('1')

k1 = Field.prototype.prod(k1, k2)     // compute the product of two field elements
k1 = Field.prototype.sum(k1, k1)      // compute the sum of two field elements
k1 = Field.prototype.prod(k2, k1)     // compute the product of two field elements
k1 = k1.negative()                    // compute the negative of a field element
console.log(k1.value)                 // k1 = -((mu2*((mu1*mu2)+(mu1*mu2))))
```

#### 5.2 Define the class Action

An element of this class is an element $a$ that defines an action on the algebra $A$. In the notations of [1], the only possible elements are $b$, $b'$ and $b''$.

**Initialization**: with a numeric element that is $1$, $2$ or $3$

Notation from the paper: $b => 1$,  $b' => 2$,  $b'' => 3$

**Type**: `myActionsElement.type` gives the string 'action'

**Value**:`myActionElement.value` gives the number $1$, $2$ or $3$ that defines the value of the action element

**Read**: `myActionElement.read` displays the string 'b', 'b\*' or 'b\*\*' depending on the value of the action

**Usage**
```
var action = new Action(2)  // initialize an action element
console.log(action.value)   // 2  display the value of the action by 1, 2 or 3
console.log(action.read)    // b* display the value of the action by 'b', 'b*' or 'b**'
```

#### 5.3 Define the class Monomial

An element of this class is an element that defines a monomial in the algebra $A$.

**Initialization**: with an object that possess properties `K`, `letter`, `ind` and `exp`. The value of `K` is an element of the class Field, the value of `letter` is a number among $1$, $2$, $3$ and $4$, the value of `ind` is an array of elements that are numbers among $1$, $2$ and $3$, the value of `exp` is an array of elements that are among the strings 'r' and 'l'. The lengths of the arrays `ind` and `exp` have to be the value of `letter` minus one. The `letter` value symbolize the notations of the article [1] as: $X => 1$, $Y => 2$, $Z => 3$ and $T => 4$.

For example the monomial element $\mu_{1} Z^{1,3}\_{r,l}\in A$ with $\mu_{1} \in K$ can be initialized as:

```
var k = new Field('mu1');
var value = {K: k, letter: 3, ind: [1,3], exp: ['r', 'l']};
var a = new Monomial(value);
```
The value of the zero element $0_A$ of $A$ is by default equal to `{K: '0', letter: 1, ind: [], exp: []}`. Any different notation of the zero element $0_A \in A$ (as $Z^{1,1}\_{r,l}$) are send to this default representation each time the object changes its value or is initialized.

**Scalar multiplication by a field element**:

`Monomial.prototype.scalarMult(myFieldElement, myMonomialElement)`

**Action (left or right) by an action element**:

`Monomial.prototype.action(myActionElement, myMonomialElement)` (left action)

**Data access**:  
```
myMonomialElement.K;
myMonomialElement.letter;
myMonomialElement.ind;
myMonomialElement.exp;
```

**Type**: `myMonomialElement.type` gives the string 'monomial'

**Value**:`myMonomialElement.value` is an object that contains properties `K`, `letter`, `ind` and `exp`

**Read**: `myMonomialElement.read` gives a human readable string representation of the monomial element. For example $\mu_{1} Z^{1,3}\_{r,l}$ will be represented as '(mu1) * Z13rl '

**Base Vector**: The method `myMonomialElement.baseVector` gives a string that represents the base vector of the monomial. For examples $\mu_{1} Z^{1,3}\_{r,l}$ is represented by the string 'Z13rl'.

**Read expression**: `myMonomialElement.readExpression` gives a string that represents how the base vector of the monomial is obtained by actions on the element $X \in A$. For example, $\mu_{1} Z^{1,3}\_{r,l}$ will be represented as  '(b\*\*(Xb))'.

**Default Values**: We can access the element $O_A$ and $X$ from the algebra $A$ with
```
var zero = Monomial.prototype.zero;
var X = Monomial prototype.x;
```

**Usage**
```
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
console.log(a.readExpression)               // (b**((Xb)b*)) Read the expression from which the base vector of this element is obtained by action on the X element
```

#### 5.4 Define the class Polynomial

An element of this class is an element that defines a polynomial (can be a monomial too) in the algebra $A$.

**Initialization**: with an array of monomial objects (can be empty)

**Add**: the '.add()' method adds an array of monomials to the initial polynomial object. Note that this method modifies the initial object.

**Type**: `myPolynomialElement.type` gives the string 'polynomial'

**Value**:`myPolynomialElement.value` is a map that maps the string that represent the base vector of a monomial (for example 'Z12rl') to the value of the monomial in this base vector.

**Read**: `myPolynomialElement.read` output an easy readable string that represents the polynomial element

**Usage**
```
var k = new Field('mu');                      // initialize a field object
var a1 = new Monomial({K: k, letter: 3, ind: ['r','r'], exp: [1,2]});  // initialize a monomial object
var a2 = Monomial.prototype.x;                // initialize another monomial object by using a default value (the monomial is X)
var a3 = Monomial.prototype.zero;             // initialize another monomial object by using a default value (the monomial is 0)
var p = new Polynomial([a1, a2, a3]);         // initialize a polynomial object
p.add([a2, a1, a1, a1, a3])                   // add monomials to the initial polynomial

console.log(p.read)                           // (mu+mu+mu+mu)*Z12rr + (1+1)*X
```

#### 5.5 Define the class Expression

The class Expression is made to carry the algebraic expressions that will lead to the system of equations used in the article [1].

**Initialization**:
The expressions that are acceptable in the class Expression are:

- Degree 3: Any expression that can be obtained by commuting the expression $(X_1 \cdot a_1)\cdot a_2$ where $X_1$ is a monomial of the algebra $A$ and $a_1$ and $a_2$ are actions.
- Degree 4: Any expression that can be obtained by commputing the expression $((a_1 \cdot a_2) \cdot a_3) \cdot X_1$ where $X_1$ is a monomial of the algebra $A$ and $a_1$, $a_2$ and $a_3$ are actions.

It can be initialized with degree 3 or degree 4 algebraic expressions as `[[X, a1], a2]` where `X` is a Monomial element, and `a1` and `a2` are Action elements. The order of the operations is defined by how the arrays of objects are nested.

For example we can initialize an expression element $((b \cdot b') \cdot b'') \cdot (\mu_{1}X) $ as:

```
var X = new Monomial({K: new Field('mu1'), letter: 1, ind: [], exp: []}); // initialize the monomial element
var a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);           // initialize the action elements
var myExpression = new Expression([[[a1, a2], a3], X]);
```

**Equations**:
Given an expression object (of degree 3 or 4), this method expands it in the way that is described in the article [1] to obtain a system of equations on $K$ that vanishes. The output is a polynomial object $P$ that has to be equal to zero in $A$, which means that the field coefficients of each base vector of $P$ are equal to zero in $K$.

`
myExpression.equations();
`

**Degree**: `myExpression.degree` gives 3 or 4 that represents the number of factors in the expression

**Type**: `myExpression.type` gives the string 'expression'

**Value**: `myExpression.value` is nested arrays of objects containing Monomial or Action objects

**Read**: `myExpression.read` give a human readable string that represents the expression

**Product**:
Remark: this method can be applied on any nested arrays of Monomial, Field and Action objects, not only on the particular case of class Expression objects.

Recursive function that solves any possible combinations on products that are among scalar multiplication on $A$ with $K$, action on $A$ and internal product on $K$. For example we can compute that $(k_1 \cdot ((k_2 \cdot b' \cdot X) \cdot b))$ with $k_1$ and $k_2$ in $K$ is equal to $(k_1 \cdot k_2) \cdot Z^{2,1}\_{l,r}$ with:
```
Expression.prototype.product([k1,[[k2, b2, X], b1]]);  
```

Note however that direct products on two Action elements and on two Monomial elements are not defined and so the output is an error.

**Identity**:
Remark: this method can be applied to any object of the form `[X,[Y,Z]]` or `[[X,Y],Z]` where `X`, `Y` and `Z` are any JS objects.

For ` Expression.prototype.identity([[X,Y],Z])`, output is `[[mu1, exp1], ..., [m8, exp8]]`.
For ` Expression.prototype.identity([X,[Y,Z]])`, output is ` [[lambda1, exp1], ..., [lambda8, exp8]]`.

Where `mu1`, ..., `mu8`, `lambda1`, ..., `lambda8` are Field elements with values 'mu1', ..., 'lambda8'. And `exp1` to `exp8` are different rearrangement  of `X`, `Y` and `Z` as defined by the **identity** in [1]. So the main array of the output represents a sum.

We can add to the method '.identity()' a second argument of the class Field, this one will multiply by distribution the Field elements  `mu1`, ..., `mu8`, `lambda1`, ..., `lambda8`.

**Left and Right Expantions**:
Remark: this method applies only on Expression class objects.
The code
```
myExpression.leftExpansion();
myExpression.rightExpansion();
```
Will expand the expression object with the method described in [1]. So it first tracks if the expression is of degree 3 or 4 and then applies the right method (depending on if the expression is of degree 3 or 4 and if the expansion if left or right).
The output is a Polynomial class object that is equal to zero on $A$ obtained from this expression.

**Equations**:
Remark: this method applies only on Expression class objects.
The code
```
myExpression.equations();
```
computes the polynomials $P_1$ from `myExpression.leftExpansion()` and $P_2$ from `myExpression.rightExpantion() `, then computes the polynomial $P = P_1 - P_2$. So $P = 0$ provides us the result we want.

**Usage**
```
var X = new Monomial({ K: new Field('1'), letter: 1, ind: [], exp: []});        // initialize monomial element
var a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);                 // initialize 3 actions elements
var exp1 = new Expression([[a1, X], a2])                                        // initialize an expression of degree 3
var exp2 = new Expression([[[a1, a2], a3], X])                                  // initialize an expression of degree 4
var p = exp1.equations()                                                        // compute the equations on K that emerges from this expresion
console.log(p.read)
```

#### 5.6 Results

To obtain the wanted equations from the article [1], we first define some basic objects.
```
// Initialize X (a monomial in the Algebra) and actions b, b* and b** ----------------------------------------------
var X = new Monomial({K: new Field('1'), letter: 1, ind: [], exp: []});
var a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);

// Define the expressions we need ----------------------------------------------------------------------------------
var expressions = [
    new Expression([[a2,X], a1]),
    new Expression([[X,a2], a1]),
    new Expression([a1, [X,a2]]),
    new Expression([a1, [a2,X]]),
    new Expression([[[a1,a2], a3], X]),
    new Expression([[a1, [a2,a3]], X]),
    new Expression([X, [a1, [a2,a3]]]),
    new Expression([X, [[a1,a2], a3]])
];
```
Then, we compute the result with
```
var results = {};
expressions.forEach(d =>{
    let zeroPolynomialP = d.equations();        // compute the polynomial equation P = 0 that arise from this expression
    let exp = d.read();                         // determine a string that represents the initial expression
    results[exp] = {};
    zeroPolynomialP.value.forEach((v,k) => {
        results[exp][v.baseVector] = v.value.K.value;       // store the equations on K that are equal to zero by taking coefficients of base vectors of P
    });
});
```

Finally display the result with
```
console.log(results);
```
or
```
for(let d in results){
    for(let dd in results[d]){
        //console.log(results[d][dd]);
    };
};
```
