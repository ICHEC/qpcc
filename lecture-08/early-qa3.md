---
title: Early Quantum Algorithms III
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

(lecture-8)=
# Lecture 8: Early Quantum Algorithms III

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture.
```

## Focus of Lecture

After this lecture you should be able to:

- Understand Grover's Algorithm.
- Have an intuition for the difference between quantum and classical random walks.

## Grover's Algorithm
Grover's algorithm is an algorithm for searching through an unstructed database. It ofters a quadratic speed-up over classical approaches.

## Unstructured search
We can formulate the search problem more formally as follows:
Suppose we’re given a function

$$
f:\{0,1\}^n \rightarrow \{0,1\}
$$

Our goal is to find a solution, which is a binary string $x\in\{0,1\}^n$ for which $f(x)=1$.

Classically we can solve this by iterating through all $x$ and evaluating $f$ on each one and stopping when we find $f(x)=1$.
If there are $N$ elements in the list and only one solution then on average we will have to evaluate $N/2$ elements.

## Circuit
For a database of size $N=2^n$ we require $n$ qubits. 
We define the oracle, $O$, which performs the operation

$$
O|x\rangle = (-1)^{f(x)}|x\rangle.
$$

We also define the Diffusion operator which performs the operation

$$
2|\psi\rangle\langle \psi|-I 
$$

where $|\psi\rangle$ is the uniform superposition state given by

$$
|\psi\rangle = \frac{1}{2^{n/2}} \sum_x |x\rangle 
$$

(note that the sum is over all $n$ bit strings $x$) and $I$ is the identity matrix.

Grover’s operator, $G$, is defined as

$$
G = (2|\psi\rangle\langle \psi|-I)O
$$

Grover's algorithm consists in
1. Apply a Hadamard gate to each qubit (creating a uniform superposition state)
1. Apply Grover's operator $\sim\sqrt{N}$ times
1. Meaure the qubits

with a probability of at least $1/2$ a solution will be measured. 

## WHy does Grover's algorithm work?
We define $M$ to be the number of solutions (i.e. values of $x$ for which $f(x)=1$).

We define an equal superposition of solutions

$$
|A_1\rangle = \frac{1}{\sqrt M} \sum_{x \,|\, f(x)=1}|x\rangle
$$

where we some over all bit strings $x$ which have $f(x)=1$, and an equal superposition of non-solutions

$$
|A_0\rangle = \frac{1}{\sqrt{N-M}} \sum_{x \,|\, f(x)=0}|x\rangle.
$$

Note that we can write the uniform superposition state $|\psi\rangle$ in terms of these two states

$$
\begin{split}
|\psi\rangle &= \frac{1}{\sqrt N} \sum_x |x\rangle \\ 
&= \frac{1}{\sqrt N} \sum_{x \,|\, f(x)=0} |x\rangle + \frac{1}{\sqrt N} \sum_{x \,|\, f(x)=1} |x\rangle \\
&= \sqrt{\frac{N-M}{N}} |A_0\rangle + \sqrt{\frac{M}{N}} |A_1\rangle \\
&= \sqrt{1-\phi} |A_0\rangle + \sqrt{\phi} |A_1\rangle \\
\end{split}
$$

where we have defined $\phi=M / N$.

Consider a linear combination of $|A_0\rangle$ and $|A_1\rangle$

$$
|\alpha\rangle = a_0 |A_0\rangle + a_1 |A_1\rangle
$$

note that the state the circuit is in before the first application of Grover's application is $|\psi\rangle$ and hence is in the form of $|\alpha\rangle$.

If we apply Grover's operator to $|\alpha\rangle$ we get

$$
\begin{split}
G|\alpha\rangle &= (2|\psi\rangle\langle \psi|-I)O (a_0 |A_0\rangle + a_1 |A_1\rangle) \\ 
&= (2|\psi\rangle\langle \psi|-I)(a_0 |A_0\rangle - a_1 |A_1\rangle) \\ 
&= 2a_0 |\psi\rangle\langle \psi|A_0\rangle - 2 a_1 |\psi\rangle\langle \psi|A_1\rangle - a_0 |A_0\rangle + a_1 |A_1\rangle \\ 
&= 2a_0 \sqrt{1-\phi} |\psi\rangle - 2 a_1 \sqrt{\phi} |\psi\rangle - a_0 |A_0\rangle + a_1 |A_1\rangle \\ 
&= \left[a_0(1-2\phi) - 2 a_1 \sqrt{\phi(1-\phi)} \right] |A_0\rangle  + \left[a_1(1- 2\phi) + 2a_0 \sqrt{\phi(1-\phi)} \right] |A_1\rangle .\\ 
\end{split}
$$

Note that $0 \le \phi \le 1$ and hence $-1 \le 1-2\phi \le 1$, this means we can write 

$$
1-2\phi = \cos \theta
$$

and hence

$$
\sin \theta = \sqrt{1 - \cos^2 \theta} = \sqrt{1 - (1-2\phi )^2} = 2\sqrt{\phi(1-\phi)}.
$$

Thus using this new $\theta$ variable we get

$$
G|\alpha\rangle = \left[a_0\cos \theta - 2 a_1 \sin \theta \right] |A_0\rangle  + \left[a_1\cos \theta + 2a_0 \sin \theta \right] |A_1\rangle .\\ 
$$

In terms of the coefficients $a_0$ and $a_1$, applying Grover's operator to $|\alpha\rangle$ results in the transformation

$$
\begin{pmatrix}
a_0\\ a_1\\
\end{pmatrix}
\rightarrow
\begin{pmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta \\
\end{pmatrix}
\begin{pmatrix}
a_0\\ a_1\\
\end{pmatrix}.
$$

In the 2-D plane with $|A_0\rangle$ being the x-axis and $|A_1\rangle$ being the y-axis, this corresponds to an anti-clockwise rotation of angle $\theta$.

```{figure} ./images/grover_rotation.png
:align: center

Applying Grover's operator to state $|\alpha\rangle$ results in an anti-clockwise rotation.
```

Let's suppose that the number of solutions $M$ is small, then $\phi=M/N$ must also be small. 
Thus we can approximate $\phi(1-\phi)\approx \phi$ and hence 
$\sin \theta = 2\sqrt{\phi(1-\phi)} \approx 2\sqrt{\phi}$.
But if $\phi$ is small then we can approximate $\sin \theta\approx \theta$ and hence we end up with

$$
\theta \approx 2\sqrt{\phi} = 2\sqrt{\frac{M}{N}}.
$$

Recall that the first step of Grover's algorithm is to apply a Hadamard gate to each qubit, creating the uniform superposition state $|\psi\rangle$, if $M$ is small then $|\psi\rangle\approx |A_0\rangle$. Thus we start very close to the $|A_0\rangle$ state, recall that Grover's operator rotates anticlockwise by angle $\theta$, if we wish to end up near the $|A_1\rangle$ we need to rotate by $90$ degrees or $\pi/2$ radians. Thus the number of rotations we require, $k$, is

$$
k = \frac{\pi}{2 \theta} = \frac{\pi}{4} \sqrt{\frac{N}{M}}.
$$

Thus we have derived the $O(\sqrt N)$ scaling of Grover's algorithm.


## Classical Random Walks

Classical random walks can be used to model: 
  - The stock market (Economics)
  - The random motion of molecules (Chemistry)
  - Population dynamics (Biology)

For the simplest random walk we are restricted to move in a 1-dimensional line. At each time step we randomly take a step left or right with equal probability. 

If we start at the origin where will we be after $n$ steps? Let $p_n(x)$ be the probability of being at position $x$ after $n$ steps.

After $1$ step we either have taken a single step left or right, so the possible paths are 
L and R and hence $p_1(-1)=1/2$ and $p_1(1)=1/2$.

After $2$ steps the possible paths are LL, LR, RL and RR and hence $p_2(-2)=1/4$, $p_2(0)=1/2$ and $p_2(2)=1/4$.

After $3$ steps the possible paths are LLL, LLR, LRL, LRR, RLL, RLR, RRL and RRR and hence $p_3(-3)=1/8$, $p_3(-1)=3/8$, $p_3(1)=3/8$ and $p_3(3)=1/8$.

It can be shown that $p_n(x)$ has the following properties
- The mean is zero, $\mu=\sum_x p_n(x) x=0$
- The variance is $n$, $\sigma^2=\sum_x p_n(x) (x-\mu)^2=n$

Additionally when $n$ is large the distribution tends towards a bell curve.

## Quantum Random Walks

