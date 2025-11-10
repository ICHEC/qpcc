---
title: Early Quantum Algorithms
layout: post
---

(lecture-10)=
# Lecture 10: Early Quantum Algorithms

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture 
```

```{admonition} Learning Outcomes
:class: tip
In this lecture we will be taking a look at the landscape of quantum algorithms, and talk about two of the layers of the quantum stack shown in the right, namely the applications and quantum algorithms. The learning outcomes of this lecture will be the following : 
- Introduction to quantum algorithms and their applications.
- Grasping potential advantage of quantum algorithms.
- Understanding the requirements for the practical application of quantum algorithms.
```


```{image} ../prep/images/quant.png
:align: center
```

## Simon's Algorithm

Simon's algorithm was the first proposed quantum algorithm to demonstrate an exponential speed up over classical computers. While it doesn't have a known practical use, it served as an inspiration for many other quantum algorithms.

### Simon's Problem

Let $f:{0, 1}^n \rightarrow {0,1}^n$ be a function that is 2-1 (for every $x$ there is a $y$ such that $f(x)=f(y)$) and where $f(x\,\text{XOR}\, c)=f(x)$. 
Our task is to find $c$. 

Here $x\,\text{XOR}\, c$ means to take the component-wise XOR between the n-bit strings $x$ and $c$. If $x=1011$ and $c=0101$ then we would get $x\,\text{XOR}\, c=1010$.

Classically this can be solved with an average of $O(2^{n/2})$ evaluations. While on a quantum computer on average we will require only $O(n)$ evaluations.

### Quantum Speed up
We require $2n$ qubits split into 2 n-bit registers. Simon's algorithm consists in the following steps:

Firstly we apply a Hadamard gate to each qubit in the first register, creating the state 
$$\frac{1}{2^{n/2}} \sum_x |x\rangle |0\rangle.$$ 
Note that the sum is over all n-bit strings, so for $n=2$ we sum over $00$, $01$, $10$ and $11$.

The we apply the unitary $U|x\rangle|y\rangle=|x\rangle|y \,\text{XOR}\, f(x) \rangle$ getting the state 
$$\frac{1}{2^{n/2}} \sum_x |x\rangle |f(x)\rangle.$$

Next we measure the qubits in the second register. Suppose we measured $f(z)$, where recall $f(z)$ is an n-bit string, then we know that qubits in the first register must either be in $z$ or $z \,\text{XOR}\, c$ and hence the qubits in the first register are in state $$ \frac{|z\rangle + |z \,\text{XOR}\, c\rangle}{\sqrt 2}$$

Now we apply a Hadamard gate again to each qubit in the first register producing the state
 $$
 \frac{1}{2^{(n+1)/2}} \sum_x [(-1)^{x\cdot z} + (-1)^{x\cdot (z \,\text{XOR}\, c)}|x\rangle \\
 $$
 where $x\cdot z=x_1 z_1 + x_2 z_2 + ... + x_n z_n$. Using the fact that $(-1)^{a \,\text{XOR}\, b}=(-1)^{a+b}$ where $a,b\in\{0,1\}$
 we can rewrite this as
 $$
 \begin{split} 
 & \frac{1}{2^{(n+1)/2}} \sum_x [(-1)^{x\cdot z} + (-1)^{x\cdot z} (-1)^{x\cdot c}|x\rangle \\
 =& \frac{1}{2^{(n+1)/2}} \sum_x (-1)^{x\cdot z}[1 + (-1)^{x\cdot c}|x\rangle .\\
 \end{split}
 $$
When $x\cdot c$ is an odd number $1 + (-1)^{x\cdot c}$ will be zero, thus we can simplify this as
$$ \frac{1}{2^{(n+1)/2}} \sum_{x|x\cdot c \in\, \text{even}} (-1)^{x\cdot z} |x\rangle$$
where $x\cdot c \in\, \text{even}$ means we only sum over bit strings for which $x\cdot c$ is an even number.

Thus running the above circuit once, the first register gives us a value of $x$ for which $x\cdot c$ is even. If we repeat this $n$ times we will end up with $n$ independent equations (assuming we don't get duplicate values of $x$) for which we can easily solve for $c$.

```{figure} ./images/simons_circuit.png
:align: center

The circuit for Simon's algorithm for $n=3$.
```

## Shor's Algorithm

This is blank, need to populate.

## Grover's Algorithm

This is blank, need to populate.