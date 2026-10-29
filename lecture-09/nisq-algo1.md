---
title: NISQ Algorithms I
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
# Lecture 9: NISQ Algorithms I

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture.
```

## Focus of Lecture

## The NISQ Era

## Classical optimisation

## Expectation Values

First some recap on expectation values. A single measurement gives one random outcome — but if we repeat the experiment many times, the **average** outcome is well-defined and predictable. For an observable represented by a Hermitian operator $\hat{O}$ and a state $|\psi\rangle$, the expectation value is

$$
\langle \hat{O} \rangle = \langle\psi|\hat{O}|\psi\rangle
$$

This is the average result you'd get measuring $\hat{O}$ on **many identically prepared copies** of $|\psi\rangle$.

- Individual measurement outcomes are eigenvalues of $\hat{O}$, denoted $\lambda_i$.
- Hence we can equivalently calculate the average as a sum over all these outcomes weighted by probability:

$$
\langle \hat{O} \rangle = \sum_i \lambda_i \, P(\lambda_i)= \sum_i \lambda_i |\langle \lambda_i|\psi\rangle|^2
$$

where $|\lambda_i \rangle$ are the eigenvectors of $\hat{O}$
and $P(\lambda_i)$ is the probability of measuring $\lambda_i$.

## Expectation value of Z

Suppose we wish to measure the expectation of $Z$ for single qubits state $|\psi\rangle$. Recall that states $\color{blue} |0\rangle$ and $\color{red} |1\rangle$ are eigenstates of $Z$ with eigenvalues $\color{blue}+1$ and $\color{red}-1$

$$
Z\color{blue} |0\rangle \color{black} = \color{blue} +|0\rangle\color{black} \qquad Z \color{red} |1\rangle \color{black} = \color{red}-|1\rangle
$$

The expected value of $Z$ is simply:

$$\langle \psi|Z|\psi\rangle
= \sum_i \lambda_i \, P(\lambda_i) = \color{blue}+\color{black} P(\color{blue}+1\color{black})\color{red}-\color{black}P(\color{red}-1\color{black})
$$

We know from the Born rule the probability of each outcome is:

$$
P(\color{blue}+1\color{black}) = |\color{blue}\langle 0| \color{black}\psi\rangle|^2 \qquad 
P(\color{red}-1\color{black}) = |\color{red}\langle 1|\color{black}\psi\rangle|^2
$$

- On a simulator we can compute the Born rule probabilities exactly.
- On a real machine we can only make measurements of 0 or 1 for each qubit. 

On hardware to estimate the expectation value of $Z$ for a state we must run the circuit (that prepares the state) many times and average.

We run the circuit $N$ times
($N$ is called the number of **shots**) and record: 
- $N_0$: the number of $0$'s measured
- $N_1$: the number of $1$'s measured

Then we can then estimate the probabilities

$$
P(+1) \approx N_0/N \qquad 
P(-1) \approx N_1/N
$$

and 

$$\langle \psi|Z|\psi\rangle\approx \frac{N_0-N_1}{N}$$

# Expectation value of X & Y

How do we measure the expection value of $X$?

The eigenvalues and eigenstates of $X$ are:
- $+1$ for $|+\rangle=(|0\rangle+|1\rangle)/\sqrt{2}$
- $-1$ for $|-\rangle=(|0\rangle-|1\rangle)/\sqrt{2}$

We know

$$
\begin{split}
P(+1) &= |\langle +|\psi\rangle|^2\\
P(-1) &= |\langle -|\psi\rangle|^2\\
\end{split}
$$

but note 

$$
\begin{split}
|+\rangle &= H|0\rangle \\
|-\rangle &= H|1\rangle \\
\end{split}
$$

Thus

$$
\begin{split}
P(+1) &= |\langle 0|H^\dagger|\psi\rangle|^2=|\langle 0|H|\psi\rangle|^2\\
P(-1) &= |\langle 1|H^\dagger|\psi\rangle|^2= |\langle 1|H|\psi\rangle|^2\\
\end{split}
$$

Therefore to measure $\langle\psi|X|\psi\rangle$

- 1. Prepare the state
- 2. **Apply a Hadamard gate**
- 3. Measure whether the qubit is in state 0 or 1

Repeating steps 1, 2 and 3 for $N$ shots we can use

$$\langle\psi|X|\psi\rangle\approx \frac{N_0-N_1}{N}$$

For the expection value of $Y$, the eigenvalues and eigenstates of $Y$ are:
- $+1$ for $|i+\rangle=(|0\rangle+i|1\rangle)/\sqrt{2}$
- $-1$ for $|i-\rangle=(|0\rangle-i|1\rangle)/\sqrt{2}$

using 

$$
\begin{split}
|i+\rangle &= SH|0\rangle \\
|i-\rangle &= SH|1\rangle \\
\end{split}
$$

where $S$ is the phase gate

$$S=\sqrt{Z}=
\begin{pmatrix}
1 & 0\\0 & i\\
\end{pmatrix}
$$

we get

$$
\begin{split}
P(+1) &= |\langle 0|H^\dagger S^\dagger|\psi\rangle|^2=|\langle 0|H S^\dagger|\psi\rangle|^2\\
P(-1) &= |\langle 1|H^\dagger S^\dagger|\psi\rangle|^2= |\langle 1|H S^\dagger|\psi\rangle|^2\\
\end{split}
$$

Therefore to measure $\langle\psi|Y|\psi\rangle$

- 1. Prepare the state
- 2. **Apply a $S^\dagger$ gate**
- 3. **Apply a Hadamard gate**
- 4. Measure whether the qubit is in state 0 or 1

Repeating steps 1, 2 and 3 for $N$ shots we can use

$$\langle\psi|Y|\psi\rangle\approx \frac{N_0-N_1}{N}$$

## Summary of single Qubit Expectation values 

Thus to measure 
- $X$ we apply a $H$ gate
- $Y$ we apply a $S^\dagger$ gate then a $H$ gate
- $Z$ we don't need to add extra gates

When measuring $X$ or $Y$ the addition of the extra gates ensures that we a measruing in the correct basis.

We execute the circuit for $N$ shots and estimate the expectation as 

$$\frac{N_0-N_1}{N}$$

where 
- $N_0$ is the number of times we measure $0$
- $N_1$ is the number of times we measure $1$


## Expectation Values of Multiple Qubits 

To measure multiple qubit expectation values:

- Add any necessary additional gates to measure in correct basis
- Execute the circuit $N$ times and record the bitstrings of the measured qubits $x$
- The expectation value is then:

$$\frac{\sum_x N_x P_x}{N}$$

- where $N_x$ is the number of times bitstring $x$ was measured 
- $P_x$ is the parity of bitstring $x$ which is +1 when there's an even number of $1$'s and -1 when there's an odd number.
  - $P_{101}=1$
  - $P_{10011}=-1$



## The Variational Quantum Eigensolver

## VQE Ansatzes

## Introduction to Hamiltonians

In Quantum Physics the energy is represented by an operator, called the Hamiltonian, $H$. The expected energy of a given state $|\psi\rangle$ is the expectation value of the Hamiltonian 

$$E=\langle \psi|H|\psi\rangle.$$

The ground state of a quantum system is the state with the lowest energy. To find the ground state we find the state that minimizes the expected Energy. The ground state is very important as it is the state of system at zero temperature (and at low temperatures the system will be at approximately the ground-state). Thus if we are interested in the properties of a molecule at room temperature, a starting place is to investigate the ground-state properties.


## VQE for chemistry