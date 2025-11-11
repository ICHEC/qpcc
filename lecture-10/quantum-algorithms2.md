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
In this learning we will continue with our exporation of early quantum algorithms. Specially we'll discuss:
- Simon's Algorithm.
- Shor's Algorithm.
- Grover's Algorithm.
```

## Simon's Algorithm

Simon's algorithm was the first proposed quantum algorithm to demonstrate an exponential speed up over classical computers. While it doesn't have a known practical use, it served as an inspiration for many other quantum algorithms.

### Simon's Problem

Let $f:{0, 1}^n \rightarrow {0,1}^n$ be a function that is 2-1 (for every $x$ there is a $y$ such that $f(x)=f(y)$) and where $f(x\,\text{XOR}\, c)=f(x)$. 
Our task is to find $c$. 

Here $x\,\text{XOR}\, c$ means to take the component-wise XOR between the n-bit strings $x$ and $c$. If $x=1011$ and $c=0101$ then we would get $x\,\text{XOR}\, c=1010$.

Classically this can be solved with an average of $O(2^{n/2})$ evaluations. While on a quantum computer on average we will require only $O(n)$ evaluations.

### Quantum Speed up
With $2n$ qubits split into 2 n-bit registers, Simon's algorithm consists in the following steps:

Firstly we apply a Hadamard gate to each qubit in the first register, creating the state

$$
\frac{1}{2^{n/2}} \sum_x |x\rangle |0\rangle.
$$ 

Note that the sum is over all n-bit strings, so for $n=2$ we sum over $00$, $01$, $10$ and $11$.

The we apply the unitary $U|x\rangle|y\rangle=|x\rangle|y \,\text{XOR}\, f(x) \rangle$ getting the state

$$
\frac{1}{2^{n/2}} \sum_x |x\rangle |f(x)\rangle.
$$

Next we measure the qubits in the second register. Suppose we measured $f(z)$, where recall $f(z)$ is an n-bit string, then we know that qubits in the first register must either be in $z$ or $z \,\text{XOR}\, c$ and hence the qubits in the first register are in state

$$
\frac{|z\rangle + |z \,\text{XOR}\, c\rangle}{\sqrt 2}
$$

Now we apply a Hadamard gate again to each qubit in the first register producing the state

$$
 \frac{1}{2^{(n+1)/2}} \sum_x [(-1)^{x\cdot z} + (-1)^{x\cdot (z \,\text{XOR}\, c)}|x\rangle \\
$$

where $x\cdot z=x_1 z_1 + x_2 z_2 + ... + x_n z_n$. Using the fact that $(-1)^{a \,\text{XOR}\, b}=(-1)^{a+b}$ where $a,b\in\{0,1\}$ we can rewrite this as

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

The [fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic) states that every integer can be unique written as a product of primes. For example the number $42$ can be written as $2*3*7$, all of which are prime.
Shor's algorithm can find the prime factors of a given integer exponentially faster than the best known classical algorithms.

### Overview
Shor's algorithm consists of two steps:
- Reduce the factoring problem to an order finding problem
- Efficiently solve the order finding problem using the QPE algorihm

```{figure} ./images/shor_workflow.png
:align: center

The workflow for Shor's algorithm.
```

The order finding problem is to find a value of $r$ such that 
$$
x^r = 1\, \text{mod}\, N
$$
where $0<x<N$. Here $\text{mod}\, N$ means we divide by $N$ and keep the remainder.
It turns out that if we have a fast method for order finding, then we also have a fast method for factoring numbers.

Order finding can be efficiently run on a quantum computer using the QPE algorithm with unitary

$$
U|y\rangle=|xy\,\text{mod}\,N\rangle.
$$

### Implications for crytography
In public-key cryptography one party is able to to securely share information to another, by using a public key (available to anyone) to encrypt a message and a private key (kept private by the party receiving the message) to decryt the message.

A common way to generate the public and private keys is to use the RSA algorithm.
Here the protocal is as follows:
 1. Choose two random prime numbers $p$ and $q$
 1. Compute $n=pq$
 1. Compute $\phi=(p-1)(q-1)$
 1. Select a random number $e$ whose greatest common factor with $\phi$ is 1
 1. Find $d$ where $de=1\,\text{mod}\,\phi$ 

The public keys are $(e, n)$ and the private key is $d$.
A message $m$ can be encrypted using 

$$
E(m) = m^e \,\text{mod}\, n
$$

and decrypted using

$$
m = E(m)^d \,\text{mod}\, n.
$$

The security of RSA relies on the assumption that factoring is difficult and can't be done efficiently, as far as we know this is true on classical computers, but Shor's algorithm shows it's not the case for quanutm computers. Currently quantum computers are not large enough to run Shor's algorithm, but post quantum cryptography protocals are already being adopted.

## Grover's Algorithm
Grover's algorithm is an algorithm for searching through an unstructed database. It ofters a quadratic speed-up over classical approaches.

### Unstructured search
We can formulate the search problem more formally as follows:
Suppose we’re given a function

$$
f:\{0,1\}^n \rightarrow \{0,1\}
$$

Our goal is to find a solution, which is a binary string $x\in\{0,1\}^n$ for which $f(x)=1$.

Classically we can solve this by iterating through all $x$ and evaluating $f$ on each one and stopping when we find $f(x)=1$.
If there are $N$ elements in the list and only one solution then on average we will have to evaluate $N/2$ elements.

### Grover's algorithm


## Limiations of early quantum algorithms
Most early quantum algorithms require:
- Large amounts of qubits
- Long circuits
- Error correction (to be robust in the present of noise), further increasing the number of required qubits

As current hardware is unable to meet these requirements, they are rarely used currently, with NISQ (Noisy Intermediate Scale Quantum) algorithms being developed and used instead.
