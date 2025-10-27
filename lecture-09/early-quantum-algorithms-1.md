---
title: Early Quantum Algorithms I
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

(lecture-9)=
# Lecture 9: Early Quantum Algorithms I 

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture.
```

```{admonition} Learning Outcomes
:class: tip
In this learning we will get familiarised with quantum algorithms in general. We will learn what is a quantum algorithm and why do we need quantum computers. After that we will talk about three important quantum algorithms that were created on the beginnings of QC. These algorihtms are: 
- Deutsch Algorithm. 
- Quantum Fourier Transform.
- Quantum Phase Estimation.
```


## Why do we need quantum computers?

Let's start with a quick recap of why we need quantum computers: 

- Quantum computers can be far powerful than their classical counterparts. Qubits are informationally dense, meaning that we can encode 1 GB of information in just 33 qubits. A quantum computer with 272 qubits can represent more states than atoms are in the universe!

- Apart from their computational advantage, quantum computers change the way we think about problems. 
    - Probabilistic nature: The probabilistic nature of quantum mechanics allows us to think in terms of distributions instead of single outcomes. Measuremente in quantum computers is therefore intrinsically probabilistic, enabling a different approach to some problems. 
    - Interference and entanglement as tools: Interference and entanglement can be used to create correlations between qubits that classical bits can capture. We will see this in detail later in the lecture.
    - Using physics as computation: Quantum mechanics laws can be used for making computations. As they rely in the principles of quantum mechanics, quantum computers can directly model some quantum systems. This is reflected in this quote of the fantastic Richard Feynman: 

```{figure} ./images_2025/feynman_quote.png
:align: center

Richard Feynman quote about quantum simulation.
```

```{admonition} The examples we have just presented assume noise-free qubits.
:class: information
In practice qubits have errors, which means that more qubits are needed in order to make computations.
```

## What is an algorithm? 

```{admonition} Algorithm
:class: information
An algorithm is a set of instructions, functions, or a recipes that takes in some input and produces an output in order to solve some sort of problem.
```
- A classical algorithm is fundamentally based on binary operations, or the moving around of bits or 0s and 1s, and is run on classical hardware. 

```{figure} ./images_2025/what_is_an_algorithm.png
:align: center

Diagram of an algorithm.
```
- An everyday example is the google maps and route optimization algorithm. One can input the desired destination and method of transport, and the algorithm outputs the fastest route. 

```{figure} ./images_2025/google_maps_algorithm.png
:align: center

Google maps screenshot.
```

## What is a quantum algorithm? 

```{admonition} Quantum Algorithm
:class: information
A quantum algorithm is an algorithm formulated for a quantum computer, where quantum mechanics principles are used to process information. 
```

- Operating on quantum hardware allows the algorithm to take advantage of quantum mechanical properties such as superposition, entanglement or interference.

- For gate-based models for quantum computation, the input of the algorithm is encoded in an array of qubits, which are acted upon by a quantum circuit.

```{figure} ./images_2025/quantum_algorithm.png
:align: center

Quantum circuit. 
```

- The result of applying a quantum algorithm is a probability distribution over the possible different outcomes, which are arrays of 0s and 1s representing the final state of each qubit.

```{figure} ./images_2025/quantum_algorithm_outcome.jpg
:align: center

Probabilistic outcome of a quantum algorithm. 
```

## Computational complexity

- Time and memory space are the two fundamental variables we are concerned with when comparing classical and quantum algorithms.

- These two metrics are encapsulated in the subject of computational complexity.

```{figure} ./images_2025/complexity.jpg
:align: center

Plot showing complexity for different functions. 
```

- The image above represents an example of time/memory complexity with respect to some value N, that could be for example the number of variables of a given optimisation problem.

- In the graph we can see how the different lines scale in a different way with the N value. We would say in this case that the algorithm represented by the blue line is the most efficient. 

- The O shown in the graph legend is known as big O notation. It represents the limit behaviour of a function. As an example, this would mean that in the graph the orange line would be at most a multiple of N.


## Basic quantum algorithms

Three quantum algorithms will be covered in this lecture: 

1. **Deutsch algorithm:** One of the first algorithms that showed the potential of QC.
2. **Quantum Fourier transform (QFT):** Key part in lots of important QC algorithms. 
3. **Quantum phase estimation (QPE):** One of the first QC algorithms to show a wide range of  applications.

- These algorithms were all created during the *early times* of quantum computing.
- In some cases, they are the basic building blocks of more complex and recent algorithms. 
- Studying these algorithms is fundamental to understanding the basics of quantum computing, and to continue progressing to more complex algorithms and topics.

## Deutsch Algorithm

### Deutsch Problem

The Deutsch Problem is defined as follows : 

Let $f: \{0,1\} \to \{0,1\}$ be a Boolean function that takes a single bit as input and outputs either 0 or 1. The goal is to determine whether $f$ is:

- **Constant:** $f(0) = f(1)$  
- **Balanced:** $f(0) \neq f(1)$

using as few evaluations (queries) of $f$ as possible.

**Classical approach:**  
We need to make *two evaluations* of the function $f$ to determine if it is constant or balanced. 

**Quantum approach (Deutsch's algorithm):**  
Using a quantum computer, we can determine if $f$ is constant or balanced with just *one evaluation*. 

### Quantum Parallelism 

```{admonition} Quantum parallelism
:class: information
Is a fundamental feature of many quantum algorithms, that allows quantum computers to evaluate a function $f(x)$ for many different values of x *simultaneously*. 
```
- Considering a function $f : \{0, 1\} \to \{0, 1\}$ and a quantum computer starting in the state $|x\rangle|y\rangle$. By using a quantum oracle, i.e., a black-box unitary operator $U_f$, we can make the transformation: $U_f\left(|x\rangle|y\rangle\right)=|x\rangle|y\oplus f(x)\rangle$. We will see how to build oracles $U_f$ in the exercises for the lecture. 

```{figure} ./images_2025/XOR_gate.png
:align: center
:width: 250px

Truth table of XOR gate
```

- When our qubits are in the following states:

$$
\left\{
\begin{matrix}
    |x'\rangle = H|0\rangle =  \frac{1}{\sqrt{2}} \left(|0\rangle + |1\rangle \right) \\
    |y'\rangle = |0\rangle,
\end{matrix}
\right .
$$

then we can easily see that $U_f(|x'\rangle|y'\rangle) = \frac{1}{\sqrt{2}}\left[|0\rangle|f(0)\rangle + |1\rangle|f(1)\rangle\right]$.

- So, by implementing the oracle $U_f$, we are evaluating both values $f(0),f(1)$ *simulatenously*. 

- However, we can only access one of the amplitudes, and therefore one vaue, per measurement. So we will need to use other tools in order to solve our problem in just one measurement. 


### Deutsch Algorithm

```{figure} ./images_2025/deutsch_algorithm.png
:align: center

Circuit of the Deutsch algorithm. 
```

The image above shows the circuit for the Deutsch algorithm. Let's break down it step by step: 
1. The initial state is: 

$$
|\psi_1\rangle = |0\rangle|1\rangle
$$

2. After that we apply **superposition** using Hadamard gates so that we arrive to the state: 

$$
|\psi_2\rangle = \left[\frac{|0\rangle + |1\rangle}{\sqrt{2}}\right]\left[\frac{|0\rangle - |1\rangle}{\sqrt{2}}\right]
$$

If you remember the *diagonal states* from previous lectures, you can see that we can rewrite our state as: 

$$
|\psi_2\rangle=|+\rangle|-\rangle
$$

3. Now we arrive to the part where the oracle acts to create **parallelism** between the function values. Remembering that the oracles acts over a state $|x\rangle|y\rangle$ as: 

$$
U_f\left(|x\rangle|y\rangle\right)=|x\rangle|y\oplus f(x)\rangle,
$$

then we can see that : 

$$ 
|x\rangle \left[\frac{|0\rangle - |1\rangle}{\sqrt{2}}\right] = \left[\frac{|x\rangle|0\oplus f(x)\rangle}{\sqrt{2}}- \frac{|x\rangle|1\oplus f(x)\rangle}{\sqrt{2}}\right] = (-1)^{f(x)}|x\rangle\left[\frac{|0\rangle-|1\rangle}{\sqrt{2}}\right],
$$

using diagonal states notation, this equation can be rewritten as: 

$$
 |x\rangle|-\rangle = (-1)^{f(x)}|x\rangle|-\rangle
$$


using this identity, we can see that for our case: 

$$
U_f\left[\left(\frac{|0\rangle + |1\rangle}{\sqrt{2}}\right)\left(\frac{|0\rangle - |1\rangle}{\sqrt{2}}\right)\right] = \left[(-1)^{f(0)}|0\rangle\left(\frac{|0\rangle - |1\rangle}{\sqrt{2}}\right)+(-1)^{f(1)}|1\rangle\left(\frac{|0\rangle - |1\rangle}{\sqrt{2}}\right)\right]
$$

which again can be rewritten as: 

$$
|\psi_3\rangle = U_f\left[|+\rangle|-\rangle\right] = \left[(-1)^{f(0)}|0\rangle+(-1)^{f(1)}|1\rangle\right]|-\rangle
$$

4. By applying the final Hadamard gate we generate **interference** between the states. By doing some algebra one can see that the state of the circuit is now: 

$$
|\psi_4\rangle = \left\{\begin{matrix}\pm|0\rangle|-\rangle \text{ if }f(0)=f(1) \\ \pm|1\rangle|-\rangle \text{ if }f(0)\neq f(1) \end{matrix}\right. = \pm|f(0) \oplus f(1)\rangle |-\rangle
$$

From this we see that if we measure $|0\rangle$ on the first qubit that means that the function is **constant**, while if we measure $|1\rangle$ that means that the function is **balanced**, and thus the Deutsch problem is solved. 


### Deutsch-Jozsa algorithm

- So far we have seen the case for 1-bit function. But what if the function is n-bit? 

- In 1992 David Deutsch, together with Richard Jozsa proposed an algorithm that solves this. It is very similar to Deutsch algorithm, just a little bit more complex. Once again the algorithm can tell if the function is constant or balanced in just one query. 

- In this case classically, determining if the function is constant or balanced can take up to $2^{n-1} + 1$ queries. 

```{warning} While this looks like a big improvement, the Deutsch and Deutsch-Jozsa algorithms have no known practical applications. 
```

- However this algorithms are very important as they showed the power of QC in its early stages. Also, the way they use superposition, parallelism, and interference were a source of inspiration to other algorithms that have shown lots of potential applications, as we will see in the next sections. 

## Quantum Fourier transform. 