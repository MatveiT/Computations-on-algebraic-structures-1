# 1) Introduction

In the article [1]:

**... Name and complete reference to the article ...**

we have encountered the need to determine a system of equations that is used to complete our proof. The computations required to arrive to this system of equations are, in a certain extent, repetitive and long enough to convince us that the best way to compute the equations is by the use of a computer.

So, the **purpose** of this project is to **generate the system of equations used in [1]**. This project is written is a such way that any person is able to replicate our computations and verify the correctness of this code. We also did our best to make the code, or at least its usage, understandable for peoples that are not used to programming.

#### 1.1) Choice of the language

This project is written in **JavaScript**, version 6 (**ES6**). JavaScript may not be a usual choice for this kind of algebraic computations. Languages such as Wolfram Mathematica are more adapted to manipulate, for example, equations with literal elements. However we choose to us JavaScript for the two following reasons:
- The algebraic structures we have to manipulate are very specific to this article, and we wanted to keep full control on what exactly the code is doing to be completely sure of the result.
- The use of JavaScript allow the code to be replicable without any requirement for a license.

#### 1.2) Disclaimer

The purpose of this code is to generate specific type of equations obtained from a specific type of expressions on specific algebraic structures (as described in the article [1]). So, there is absolutely no guarantee that it will give correct results in any other context. Knowing that, this code should not be used for any other purpose that the generation of equations in the context of the article [1] unless the user is totally aware of what she/he is doing.

# 2) How to use

In (2.1), we explain how a user can execute the code in tree different ways:
  - In an online JavaScript editor
  - By executing a JavaScript project locally on your computer with Node (classical way to execute JS files)
  - By an interactive way with Jupyter Notebook

This first part do not requires any modifications of the code files.

In (2.2), we explain how this code can be executed to obtain the equations. So the user can by itself obtain the equations she/he wants by modifying or adding lines of code in the right place.

#### 2.1) How to run

We adapted the same code for tree different environments so that the user can choose which of the tree ways of execution she/he prefers depending on its experience (or absence of experience) of JavaScript.

**2.1.1) Online execution**

  The simplest way:
  Without any required installation on your computer, you can simply copy and paste the content of the file 'JScode.txt' (folder './online-execution/') in any JavaScript online editor (such as 'https://playcode.io/online-javascript-editor'). Then, the system of equations will be displayed in the terminal.

**2.1.2) Execution in Node.js**

  For 'Node.js' users,
  To run JavaScript locally on you computer, you need **Node.js** to be installed. Then you can just execute the content of the folder './script-for-node/' to obtain the results.
  - The file 'script.js' defines the main code needed to obtain the equations from a given expression.
  - The file 'usage.js' shows how to use the code from 'script.js'
  - The file 'results.js' defined the eight expressions $e_1, ..., e_8$ and uses 'script.js' to obtain the wanted system of expressions.

  To obtain the results just execute the file 'results.js' with the command line in the folder './script-for-node/'.
  ```
  node results.js
  ```
**2.1.3) Execution in a Jupyter Notebook**

  For Jupyter Notebook users, the most interactive way:
  By using Jupyter Notebook, you can execute and play with the code in an interactive way and observe the obtained outputs on each step. This is certainly the most efficient way to investigate the code, but it requires some installation on your computer. You should have installed **Node.js**, **Jupyter Notebook** (with Anaconda) and a **JavaScript kernel for Jupyter** (it makes the link between Jupyter Notebook and Node). After that you can just play with the 'Jupyter-Notebook.ipynb' file.

#### 2.2) How to use

Once you can execute the code, here is how to use it by adding new lines of code in the right place:

- With (2.1.1): In the end of the text document './online-execution/JScode.txt'
- With (2.1.2): In the file './script-for-node/results.js'
- With (2.1.3): In the end of the Jupyter Notebook

First, you have to define `k` the unit on the field $K$.
```
const k = new Field('1');
```
Then, define `a1`, `a2` and `a3` as the tree element $b$, $b'$ and $b''$ that acts on $A$.
```
const a1 = new Action(1), a2 = new Action(2), a3 = new Action(3);
```
Then, define the monomial element `X` that represents $X \in A$.
```
const X = new Monomial({K: k, letter: 1, ind: [], exp: []});
```
Then, define the expression from which we want to derive the equations. For example `[[[a1,a2], a3], X]` represents $((b \cdot b') \cdot b'') \cdot X$
```
const myExpression = new Expression([[[a1,a2], a3], X])
```
Finally, to obtain the polynomial $P$ on $A$ from this expression, just use the method `.equations()` of the class `Expression`.
```
let polynomial = myExpression.equations()
```
You can display the whole polynomial $P$ by using
```
console.log(polynomial.read)
```
Or you can display the equations on $K$ that are equal to zero obtained from the expression `myExpression` as
```
polynomial.value.forEach( v => {
    console.log(v.value.K.value);
});
```

More detailed usage of the code is shown in './script-for-node/usage.js' or in the part (5).


# 3) Results
The folder './results/' contains two files:
- 'results.txt': is a text file which lines represent the equations on $K$ that are equal to zero obtained from the eight expressions $e_1, ..., e_8$.
- 'results.json' is a JSON file (JavaScript Object Notations) which is an object that gives all the equations and also the information of from which expression it comes and of which base vector it is the coefficient.

# 4) A brief explanation of the theoretical context

 A complete and rigorous theoretical context of this code is explained in [1]. However, let us take some lines to explain the main idea of what the code computes from a more theoretical point of view.

#### 4.1) Notations and definitions of algebraic structures

Let us consider a field $K$ and an algebra $A$ over $K$.
A basis of $A$ is defined as,  

$B = \{ X, Y^{i}_{p_1}, Z^{j,k}_{p_2, p_3}, T^{l,m,n}_{p_4, p_5, p_6} \}$,

where $p_1, ..., p_6$ are in the set $\{ left, right \}$ and $i,j,k,l,m,n$ are in the set $\{ 1,2,3 \}$. Moreover, if $j = k$, the element $Z^{i,k}_{p_2, p_3}$ is zero and if $l$, $m$ and $n$ are not two by two different, the element $T^{l,m,n}_{p_4, p_5, p_6}$ is also zero.

Now, we define an action of tree elements $b$, $b'$ and $b''$ (alternatively denoted as $b_1$, $b_2$ and $b_3$) on $A$ as $\{b, b', b''\} \times A \rightarrow A$ such that,

$ b_t \cdot X = Y^{t}_{left} $
$ b_t \cdot Y^{j}_{p_1} = Z^{j,t}_{p_1, left} $
$ b_t \cdot Z^{j,k}_{p_2, p_3} = T^{j,k,t}_{p_2,p_3, left} $
$ b_t \cdot T^{l,m,n}_{p_4, p_5, p_6} = 0$

for any $t$, $i$, $j$, $k$, $l$, $m$, $n$ in $\{1,2,3 \}$ and $p_1$, $p_2$, $p_3$, $p_4$, $p_5$, $p_6$ in $\{ left, rigth \}$ and the same equations holds for right actions but with the new index coefficient as $right$ instead of $left$.

#### 4.2) Method to find the equations

Now we consider the eight following algebraic expressions:
$e_1 = (b' \cdot X)\cdot b$,

$e_2 = (X \cdot b')\cdot b$,

$e_3 = b \cdot (X \cdot b')$,

$e_4 = b \cdot (b' \cdot X)$,

$e_5 = ((b \cdot b')\cdot b'')\cdot X$,

$e_6 = (b \cdot (b'\cdot b''))\cdot X$,

$e_7 = X \cdot (b\cdot(b' \cdot b''))$

and $e_8 = X \cdot ((b \cdot b') \cdot b'')$.

Note that the expressions $e_5$, $e_6$, $e_7$ and $e_8$ have no meaning in the context of the algebra $A$ alone. However, they can be defined in an extended algebraic structure built on the top of $A$ (exact definition in [1]).

Then, each of these expressions $e_i$ (for $i=1, ..., 8$) is expanded in two different ways by the use of the **identity** (exact formula of the identity in [1]) and the two expansions are transferred to the same side of the equality so that we obtain a polynomial $P_i$ on $A$ that is equal to zero. The polynomial $P_i$ can be written as,

$P_i = \sum_{ V \in B} k_{(i, V)} V $ = 0,

where $k_{(i,V)}$ are in $K$ and V are the elements of the basis $B$.

So, we can conclude that the system of equations on $K$,  $\{ k_{(i,V)} \}_{i \in \{1,..., 8 \}, V \in B}$ is equal to zero (note that some of these equations are just $0=0$).

# 5) Advenced usage

For those who want to play with the code, test the code or to verify its correctness here is a more detailed explanation on how to use it and how it works.
