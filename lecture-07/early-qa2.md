---
title: Early Quantum Algorithms II
jupytext:
    formats: md:myst
    text_representation:
        extension: .md
        format_name: myst
kernelspec:
    display_name: Python 3
    language: python
    name: python3
mystnb:
    render_markdown_format: myst
---

(lecture-7)=
# Lecture 7: Early Quantum Algorithms II

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture.
```

## Focus of Lecture

After this lecture you should be able to:

- Understand Simon's Algorithm.
- Understand the idea behind common public key crytography schemes.
- Understand at a high level Shor's Algorithm.

## XOR

Exclusive-or (XOR) denoted by $\oplus$ is a classical logic 
gate defined by:

$$ 
a\oplus b = 
\begin{cases}
  0 & \text{if} \quad a=b \\
  1 & \text{if} \quad a\ne b
\end{cases}
$$

The truth table is:

| $a$ | $b$ | $a\oplus b$ |
|---|---|----------|
| 0 | 0 |    0     |
| 0 | 1 |    1     |
| 1 | 0 |    1     |
| 1 | 1 |    0     |

Note that XOR has the following addition property:

$$y=x\oplus c \quad\rightarrow\quad c=x\oplus y$$


## Simon's Algorithm

Simon's algorithm was the first proposed quantum algorithm to demonstrate an exponential speed up over classical computers. While it doesn't have a known practical use, it served as an inspiration for many other quantum algorithms.

## Simon's Problem

Let $f:\{0, 1\}^n \rightarrow \{0,1\}^n$ be a function with the following properties:
- It is 2-1 (for every $x$ there is a $y$ such that $f(x)=f(y)$)
- If $f(x)=f(y)$ then $x=y \oplus c$ and $y=x\oplus c$.
Our task is to find $c$. 

```{figure} ./images/2_1_red.svg
:align: center

A 2-1 function, here for every output there are two inputs that map to it.
```

Here $x \oplus c$ means to take the component-wise XOR between the n-bit strings $x$ and $c$. If $x=1011$ and $c=0101$ then we would get $x\oplus c=1110$.

To solve this classical we just need to find two inputs that have the same output value, i.e. an $x$ and a $y$ that have $f(x)=f(y)$. We know that $x=c\oplus y$ and we can use the addition property of XOR to find $c$, $c=x\oplus y$.

Classically, we will on average find a pair after $O(2^{n/2})$ evaluations. While on a quantum computer on average we will require only $O(n)$ evaluations.

## Simple 2 Bit Example

Suppose we have $n=2$ and $c=10$. For $n=2$ there are 4 inputs, $00$, $01$, $10$ and $11$, let's compute the xor with $c$ for each input:

| $x$    | $x\oplus c$ |
| -------- | ------- |
| $00$    | $10$    |
| $01$    | $11$    |
| $10$    | $00$    |
| $11$    | $01$    |

Thus we see that for this example we would have $f(00)=f(10)$ and $f(01)=f(11)$.
An example of such a function is

| $x$    | $f(x)$ |
| -------- | ------- |
| $00$    | $11$    |
| $01$    | $01$    |
| $10$    | $11$    |
| $11$    | $01$    |


## Simon's Circuit

Recall that applying a Hadamard gate to an $n$ qubit state $x$ produces the state.

$$
H^{\otimes n}|x\rangle = \frac{1}{2^{n/2}} \sum_{y} (-1)^{x \cdot y}|y\rangle
$$

where  $x\cdot y=x_1y_1+x_2y_2+...+x_ny_n$. E.g. for $x=10$ we have

$$
\begin{split}
H^{\otimes 2}|10\rangle &= H|1\rangle H|0\rangle\\
&=\frac{1}{\sqrt 2}(|0\rangle - |1\rangle) \frac{1}{\sqrt 2}(|0\rangle + |1\rangle) \\
&= \frac{1}{2}(|00\rangle + |01\rangle - |10\rangle - |11\rangle) \\
\end{split}
$$

With $2n$ qubits split into 2 n-bit registers, Simon's algorithm consists in the following steps:

1. We apply a Hadamard gate to each qubit in the first register, creating the state

$$
\frac{1}{2^{n/2}} \sum_x |x\rangle |0\rangle.
$$ 

Note that the sum is over all n-bit strings, so for $n=2$ we sum over $00$, $01$, $10$ and $11$, note also that $|0\rangle$ is shorthand for $|00...0\rangle$ i.e. the state with all $n$ qubits in state $|0\rangle$.

2. We apply the unitary $U|x\rangle|y\rangle=|x\rangle|y \oplus f(x) \rangle$ getting the state

$$
\frac{1}{2^{n/2}} \sum_x |x\rangle |f(x)\rangle.
$$

3. We measure the qubits in the second register. Suppose we measured $f(z)$, where recall $f(z)$ is an n-bit string, then we know that qubits in the first register must either be in $z$ or $z \oplus c$ and hence the qubits in the first register are in state

$$
\frac{|z\rangle + |z \oplus c\rangle}{\sqrt 2}
$$

4. We apply a Hadamard gate again to each qubit in the first register producing the state

$$
 \frac{1}{2^{(n+1)/2}} \sum_x [(-1)^{x\cdot z} + (-1)^{x\cdot (z \oplus c)}|x\rangle \\
$$

where $x\cdot z=x_1 z_1 + x_2 z_2 + ... + x_n z_n$. Using the fact that $(-1)^{a \oplus b}=(-1)^{a+b}$ where $a,b\in\{0,1\}$ we can rewrite this as

$$
\begin{split} 
& \frac{1}{2^{(n+1)/2}} \sum_x [(-1)^{x\cdot z} + (-1)^{x\cdot z} (-1)^{x\cdot c}|x\rangle \\
=& \frac{1}{2^{(n+1)/2}} \sum_x (-1)^{x\cdot z}[1 + (-1)^{x\cdot c}|x\rangle .\\
\end{split}
$$

When $x\cdot c$ is an odd number $1 + (-1)^{x\cdot c}$ will be zero, thus we can simplify this as

$$ 
\frac{1}{2^{(n+1)/2}} \sum_{x|x\cdot c \in\, \text{even}} (-1)^{x\cdot z} |x\rangle
$$

where $x\cdot c \in\, \text{even}$ means we only sum over bit strings for which $x\cdot c$ is an even number.

7. Thus running the above circuit once, the first register gives us a value of $x$ for which $x\cdot c$ is even. If we repeat this $n$ times we will end up with $n$ independent equations (assuming we don't get duplicate values of $x$) for which we can easily solve for $c$.

Note that any measurements performed midway through a circuit may be moved to the end. As we don’t need to record the measurements of the second register, we don’t in practice need to perform these measurements.


```{figure} ./images/simons_circuit_4.png
:align: center

The circuit for Simon's algorithm for $n=3$.
```

## Simon's circuit 2 Bit example

Let's redo the steps with the particular 2-bit example considered above.
We start in state $|00\rangle|00\rangle$, after applying Hadamard gates to the qubits in the first register we get

$$\frac{1}{2} \sum_x |x\rangle|00\rangle=\frac{1}{2} (|00\rangle|00\rangle+|01\rangle|00\rangle+|10\rangle|00\rangle+|11\rangle|00\rangle)$$

We then apply the unitary getting:

$$\frac{1}{2} \sum_x |x\rangle|f(x)\rangle=\frac{1}{2} (|00\rangle|f(00)\rangle+|01\rangle|f(01)\rangle+|10\rangle|f(10)\rangle+|11\rangle|f(11)\rangle)$$

But recall for this example we know $f(00)=f(10)$ and $f(01)=f(11)$ and thus we can write this as

$$
\begin{split}
\frac{1}{2} \sum_x |x\rangle|f(x)\rangle &=\frac{1}{2} (|00\rangle|f(00)\rangle+|01\rangle|f(01)\rangle+|10\rangle|f(00)\rangle+|11\rangle|f(01)\rangle) \\
&=\frac{1}{2} [(|00\rangle+|10\rangle)|f(00)\rangle+(|01\rangle+|11\rangle)|f(01)\rangle] \\
\end{split}
$$

When we measure the second register, we will either measure $f(00)$ or $f(01)$, suppose we measure $f(01)$, then we know the first register is in state

$$\frac{1}{\sqrt 2}(|01\rangle+|11\rangle) $$


Next we apply Hadamard gates again to the first register, we know that 

$$
\begin{split}
H^{\otimes 2}|01\rangle &= \frac{1}{2} (|00\rangle-|01\rangle+|10\rangle-|11\rangle) \\
H^{\otimes 2}|11\rangle &= \frac{1}{2} (|00\rangle-|01\rangle-|10\rangle+|11\rangle) \\
\end{split}
$$

thus when we apply Hadamard gates again to the first register we will get the state

$$
\frac{1}{\sqrt 2} (H^{\otimes 2}|01\rangle+H^{\otimes 2}|11\rangle) = \frac{1}{\sqrt 2} (|00\rangle+|01\rangle).
$$

On the other hand if when we measured the second register we got $f(00)$, then we would know the first register is in state 

$$\frac{1}{\sqrt 2}(|00\rangle+|10\rangle) $$

and after applying Hadamard gates to this state we get

$$\frac{1}{\sqrt 2}(H^{\otimes 2}|00\rangle+H^{\otimes 2}|10\rangle) =\frac{1}{\sqrt 2}(|00\rangle+|01\rangle) $$

i.e. in this case we get the same state in the first register no matter what we measure in the second. Recall that in this case $c$ was $10$, we see that $00\cdot 10=0$ and $01 \cdot 10=0$, and hence when we measure the first register we'll get a bitstring whose dot product with $c$ is zero mod 2.

## Simon's circuit 3 Bit example

Finally let's consider a 3 bit example, suppose $c$ was $110$, as $n=3$ we have $2^3=8$ possible inputs, let's compute the XOR's with $c$

| $x$    | $x\oplus c$ |
| -------- | ------- |
| $000$    | $110$    |
| $001$    | $111$    |
| $010$    | $100$    |
| $011$    | $101$    |
| $100$    | $010$    |
| $101$    | $011$    |
| $110$    | $000$    |
| $111$    | $001$    |

The circuit starts in state $|000\rangle|000\rangle$, we apply Hadamard gates to the first register getting:

$$\frac{1}{2^{3/2}}\sum_x |x\rangle|000\rangle=\frac{1}{2^{3/2}}(|000\rangle|000\rangle+|001\rangle|000\rangle +|010\rangle|000\rangle +...)$$

We apply the unitary getting:

$$\frac{1}{2^{3/2}}\sum_x |x\rangle|f(x)\rangle=\frac{1}{2^{3/2}}(|000\rangle|f(000)\rangle+|001\rangle|f(001)\rangle +|010\rangle|f(010)\rangle +...)$$

again we can rewrite this as we know $f(000)=f(110)$, $f(001)=f(111)$, $f(010)=f(100)$ and $f(011)=f(101)$, we get:

$$\frac{1}{2^{3/2}}\sum_x |x\rangle|f(x)\rangle=\frac{1}{2^{3/2}} \left[(|000\rangle+|110\rangle)|f(000)\rangle+(|001\rangle+|111\rangle)|f(001)\rangle +...) \right]$$

We measure the second register, suppose we get $f(010)$, then we know the first register is in state:

$$\frac{1}{\sqrt 2}(|010\rangle+|100\rangle)$$

Now we apply Hadamard gates to this state:

$$\frac{1}{\sqrt 2}(H^{\otimes 3}|010\rangle+H^{\otimes 3}|100\rangle)=\frac{1}{2}(|000\rangle+|001\rangle+|110\rangle+|111\rangle)$$

We'll get the same state no matter what we would measure in the second register (this follows from the general derivation above). Thus running the full circuit we would either measure $000$, $001$, $110$ or $111$ in the first register. We know that $x\cdot c\mod 2=0$ for all of these bitstrings, so we get the equations (letting $c=(c_1, c_2, c_3)$):
- $x=000$, $x\cdot c \mod 2=0$
- $x=001$, $x\cdot c \mod 2= c_3 \mod 2=0$
- $x=110$, $x\cdot c \mod 2=(c_1+c_2)\mod 2=0$
- $x=111$, $x\cdot c \mod 2=(c_1+c_2+c_3)\mod 2=0$

From this we see $c_3=0$ and $c_1=c_2$, as we know $c$ can't be $(0,0,0)$ (since then the function wouldn't be 2-1), it must be $c=(1,1,0)$, which is indeed correct.

## Simon's Algorithm Conclusions

- As Simon's algorithm requires running the circuit approximately $n$ times it is $O(n)$.
- To solve classically we will generally require $O(2^{n/2})$ evaluations.
- Thus Simon's algorithm gives an exponential speed-up.
- However Simon's problem is a toy problem with no known applications.
- It did serve as an important inspiration for subsequent algorithms including Shor's.


## Shor's Algorithm

The [fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic) states that every integer can be unique written as a product of primes. For example the number $42$ can be written as $2*3*7$, all of which are prime.
Shor's algorithm can find the prime factors of a given integer exponentially faster than the best known classical algorithms.

## Overview of Shor's Algorithm
Shor's algorithm consists of two steps:
- Reduce the factoring problem to an order finding problem
- Efficiently solve the order finding problem using the QPE algorihm

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

## Implications for crytography
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

The security of RSA relies on the assumption that factoring is difficult and can't be done efficiently, as far as we know this is true on classical computers, but Shor's algorithm shows it's not the case for quantum computers. Currently quantum computers are not large enough to run Shor's algorithm, but post quantum cryptography protocals are already being adopted.


## Shor's Algorithm Conclusions

- Shor's Algorithm can factor integers **exponentially** faster than the best known classical algorithms.
- Using Shor's algorithm one could break many popular encryption schemes including RSA and Diffie–Hellman. 
- Currently 10,000 qubits are required to break standard encryption schemes although this number will probably continue to fall in the future.
- This motivates moving to **post quantum cryptographic algorithms** which are designed to remain secure against future quantum computers.
