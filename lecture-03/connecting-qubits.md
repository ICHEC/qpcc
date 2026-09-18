---
title: Connecting Qubits Together
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

(lecture-3)=
# Lecture 3: Connecting Qubits Together

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture 
```


```{admonition} Learning outcomes
:class: tip

In this lecture we discuss how we connect multiple qubits. Combining qubits brings the full potential of quantum computing.
We learn about multi qubit gates and their role in quantum computing. We familiarise ourselves with features of quantum physics that make quantum computing different from classical computing. We touch upon the necessary mathematical framework and tools to enable us working with multi-qubit system through gates.

```


---

## Introduction

In the previous lecture {ref}`lecture-2` we learnt that a qubit is one of the simplest example of a quantum system, and how unitary operators manipulate a qubit's state.
We also identified that quantum gates are unitary operators. But there very little one can do with single qubit, much like a classical bit. Things become interesting,
when we have multiple qubits to work with.

So here we learn what happens when one combines several qubits, and for such system how does quantum gate look like. We discuss the relevant mathematical background
to get comprehension of multi qubit quantum system, as well as how quantum computing becomes interesting with several qubits.

We also familiarise with the features of quantum physics that make quantum computing different from classical computing, especially aspect that become relevant in
combining qubits. We already disussed some key aspect of quantum physics in previous lecture, here we touch upon some other aspects.


---

## Multi-qubit systems

---

### Unitary matrices (recap)

Let's do a quick recall about the unitary matrices: A matrix $U$ is **unitary** if 

$$\Large {U^\dagger U = U U^\dagger = {\bf I}}$$

where $U^\dagger$ is the conjugate transpose. Unitary matrices preserve the norm of a vector: 

$$\Large{\lVert U|\psi\rangle \rVert = \lVert |\psi\rangle \rVert}$$

This is what keeps quantum states normalized (probabilities sum to 1) after a gate is applied.

- Every quantum gate is represented by a unitary matrix
- This is why quantum gates are **reversible**: $U^{-1} = U^\dagger$
- Single-qubit gates are $2\times2$ unitary matrices, e.g.

$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad
H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
$$

We briefly mentioned in previous lecture, that for $n$ qubits, gates are represented by $2^n \times 2^n$ unitary matrices.
We will see how later in the sections below.

---

## Tensor product of states

Recall that for a single qubit, the state was parameterised by two real angles $\theta, \phi$.
We could access all possible states by varying the $\theta$ and $\phi$ independently.
If we have two qubits, collectively, there is two sets of these two numbers, representing each qubit.

$$
|\psi_1\rangle \equiv |\theta_1, \phi_1\rangle = \cos\!\left(\tfrac{\theta_1}{2}\right)|0\rangle + e^{i\phi_1}\sin\!\left(\tfrac{\theta_1}{2}\right)|1\rangle\\
|\psi_2\rangle \equiv |\theta_2, \phi_2\rangle = \cos\!\left(\tfrac{\theta_2}{2}\right)|0\rangle + e^{i\phi_2}\sin\!\left(\tfrac{\theta_2}{2}\right)|1\rangle
$$

If we have a system that is described by a pair of qubits, then there are four parameters, say $(\theta_1, \phi_1, \theta_2, \phi_2)$ that we can vary.
How do we describe the measurement, or computational basis for that? To do this, recall the Stern-Gerlach experiment from {ref}`lecture-02` and imagine
we have a furnace that has two holes. A pair of atoms are thrown in sync. See the animation below -


```{raw} html
<script src="../_static/parallel-sg.js"></script>

<parallel-sg></parallel-sg>
```

Since qubits A, and B are measured independently now through two $Z-$axis magnets, there are four landing spots on the sreen.
Two $|0_A\rangle$ and $|1_A\rangle$ for qubit A, and two $|0_B\rangle$ and $|0_B\rangle$ for qubit B. Combinatorially, there 
are four possible outcomes for the combined two qubit system, which we can label as:

$$\Large {|00\rangle, |01\rangle, |10\rangle, \text{and} |11\rangle}$$

Thus one can write a generic superposition state for two qubit system as follows:

$$
\Large {|\psi\rangle = c_{00}|00\rangle + c_{01}|01\rangle + c_{10}|10\rangle + c_{11}|11\rangle}
$$

Where $c_{00}$ etc are coefficients, with sum of their magnitude squared is 1. Now, do we come up with new set of coefficients,
everytime we add a qubit? or can we build up from individual qubits. The answer is later one, and there is a proper mathematical
backend that helps us. It's called **Tensor Product**.


```{admonition} Definition
:class: info

The **tensor product** ($\otimes$) is how we combine individual qubit states (or operators) into a description of a joint, multi-qubit system.
For two single-qubit states, we write the state representing combined system of two qubits as:

$$
|\psi_1\rangle \otimes |\psi_2\rangle =
\begin{pmatrix} a_1 \\ b_1 \end{pmatrix} \otimes \begin{pmatrix} a_2 \\ b_2 \end{pmatrix} =
\begin{pmatrix} a_1 a_2 \\ a_1 b_2 \\ b_1 a_2 \\ b_1 b_2 \end{pmatrix}
$$

Here the state of the combined system is a 4-length column vector, with coefficient emerging from the
component qubit states. We identify that $c_{00} = a_1 a_2$, $c_{01} = a_1 b_2$ and so on.
```

For convenience, we use shorthand notation: $|\psi_1\rangle \otimes |\psi_2\rangle$ is often written $|\psi_1\rangle|\psi_2\rangle$ or $|\psi_1 \psi_2\rangle$.
Thus the measurement/computational basis $|0_A\rangle \otimes |0_B\rangle$ is simply written as $|00\rangle$ as shown in the animation.

By now you would have realised what would adding another qubit would do. With three qubits, there are 8 combinatorial outcomes:

$$\Large {|000\rangle, |001\rangle, |010\rangle, |011\rangle, |100\rangle, |101\rangle, |110\rangle, \text{and} |111\rangle}$$

```{admonition} Definition
:class: tip

The set of all possible states for a given quantum system is called **Hilbert Space**.

The set of states that are measurement outcomes for quantum system are called *Computational* **Basis states**.

```

A system of $n$ qubits lives in a Hilbert space of dimension $2^n$ — this exponential growth is a key resource (and challenge) in quantum computing.


```{admonition} Examples

1. $$|0\rangle \otimes |1\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}$$

2. $$|+\rangle \otimes |0\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} \otimes \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 0 \\ 1 \\ 0 \end{pmatrix}$$

```

---

## Multi-qubit basis


- For a single qubit, the computational basis is $\{|0\rangle, |1\rangle\}$.
- 
- For $n=2$ qubits, the basis consists of all $2^n=4$ combinations of 0s and 1s: $\{|00\rangle, |01\rangle, |10\rangle, |11\rangle\}$.

- General 2-qubit state is superposition over 4 basis states:

$$
|\psi\rangle &= \alpha_{00}|00\rangle + \alpha_{01}|01\rangle + \alpha_{10}|10\rangle + \alpha_{11}|11\rangle =\begin{pmatrix} \alpha_{00} \\ \alpha_{01} \\ \alpha_{10} \\ \alpha_{11} \end{pmatrix}
$$

- Normalization requires:

$$|\alpha_{00}|^2 + |\alpha_{01}|^2 + |\alpha_{10}|^2 + |\alpha_{11}|^2 = 1
$$


```{admonition} Generalisation
:class: warning

- For $n$ qubits, the basis has $2^n$ states — e.g. 10 qubits already gives 1024 basis states.
- Exponential scaling $\rightarrow$ classical simulation becomes intractable, opportunity for quantum advantage.

```

```{info}

1. $|0\rangle \otimes |1\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}=|01\rangle$

 
$$
\begin{align*}
2. \;|+\rangle \otimes &|0\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} \otimes \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 0 \\ 1 \\ 0 \end{pmatrix} \\
&= \frac{1}{\sqrt{2}}(|00\rangle+|10\rangle)= \frac{1}{\sqrt{2}}(|0\rangle+|1\rangle)|0\rangle = |+\rangle|0\rangle
\end{align*}
$$

```

---

## Tensor product of gates - matrix notation

Similar to tensor product of the state, which are represented as column vector, we have tensor product of quantum operators, or quantum gates:
For example, applying $H$ to qubit 1 and $X$ to qubit 2, gives us:

$$
H \otimes X = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \otimes \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 0 & 1 & 0 & 1 \\ 1 & 0 & 1 & 0 \\ 0 & 1 & 0 & -1 \\ 1 & 0 & -1 & 0 \end{pmatrix}
$$      

Acting on the 2-qubit state $|00\rangle = \begin{pmatrix}1\\0\end{pmatrix}\otimes\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}1 \\ 0 \\ 0 \\ 0 \end{pmatrix}$ gives:

$$
H \otimes X|00\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix} 0 & 1 & 0 & 1 \\ 1 & 0 & 1 & 0 \\ 0 & 1 & 0 & -1 \\ 1 & 0 & -1 & 0 \end{pmatrix}\begin{pmatrix}1 \\ 0 \\ 0 \\ 0 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 0 \\ 1 \\ 0 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)
$$


---

## Tensor product of gates - Dirac notation

Alternatively we can perform the same calculation using kets as:

$$
(H \otimes X)|00\rangle = H|0\rangle \otimes X|0\rangle = |+\rangle \otimes |1\rangle = \frac{1}{\sqrt{2}}(|0\rangle+|1\rangle)\otimes |1\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)
$$      

- We see that the gates act independently on their respective qubits -- $H$ acts on qubit 1, giving $|+\rangle$ and $X$ acts on qubit 2, giving $|1\rangle$.

- We can also write this as $H_1 X_2 |00\rangle$, where the subscript indicates which qubit the gate acts on.

- It is important to note that $H_1 X_2 \neq X_2 H_1$ — the order of operations matters, and in general multi-qubit gates do **not** commute.

---

## Separable operations


- A multi-qubit operation is **separable** if it can be written as a tensor product of single-qubit (or single-subsystem) operations:

$$
U = U_1 \otimes U_2 \otimes \cdots \otimes U_n
$$

- Applying a separable operation to a product state gives another product state — **no correlations between qubits are created**.
- Separable operations are the natural extension of single-qubit gates to multiple qubits — but they alone are **not enough** for quantum advantage.
- For this, we need to generate *entanglement*.


``````{admonition} **Multi-qubit circuit diagrams**

- Each horizontal line represents a qubit, and gates are applied from left to right.
- Tensor products of single-qubit gates are represented by gates on separate qubit lines.

```{image} ./HotimesX.png
:align: center
:width: 50%
```
``````

---

## Entanglement (mathematically)

- Consider a two-qubit system with Hilbert space $\mathcal{H} = \mathcal{H}_A ⊗ \mathcal{H} _B$. 
- A general state of the system can be written as a linear combination of the basis states:
$$
|\psi\rangle_{AB} = \sum_{i,j} c_{ij} |i\rangle_A \otimes |j\rangle_B
$$
- If $|\psi\rangle_{AB}$ can be written as $|x\rangle_A \otimes |y\rangle_B$ then the state is **separable**. Otherwise, it is **entangled**.


<Box title="Examples">

<Banner type="success">

The Bell state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ is entangled because it cannot be written as a product of single-qubit states.

</Banner>

<Banner type="warning">

The state $|\psi\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |01\rangle)$ is separable because it can be written as $|0\rangle \otimes \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$.

</Banner>

</Box>

---


## Multi-qubit gates

---

### CNOT gate

<Banner>

The Controlled-NOT (CNOT) gate acts on two qubits — a **control** and a **target**.

- If control is $|0\rangle$, target is unchanged.
- If control is $|1\rangle$, target is flipped (X applied).

</Banner>


- Matrix representation in the computational basis:

$$
\text{CNOT} = \begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{pmatrix}
$$





- Circuit diagram representation:

```{image} ./CNOT.png
:width: 300
:align: center
```


<table class="cnot-truth-table">
<thead>
<tr>
<th colspan="2">Input</th>
<th colspan="2">Output</th>
</tr>
<tr>
<th>Control</th>
<th>Target</th>
<th>Control</th>
<th>Target</th>
</tr>
</thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>0</td></tr>
</tbody>
</table>


<style>
.cnot-truth-table th,
.cnot-truth-table td {
  text-align: center;
}
.cnot-truth-table th:nth-child(2),
.cnot-truth-table td:nth-child(2) {
  border-right: 2px solid #999;
}
</style>




```{admonition} "Key point: CNOT is entangling"
:class: tip

- CNOT **cannot** be written as $U_1 \otimes U_2$.

- Applying CNOT can create entanglement:

$$
\text{CNOT}\left(\frac{|0\rangle+|1\rangle}{\sqrt2} \otimes |0\rangle\right) = \frac{|00\rangle+|11\rangle}{\sqrt2}
$$

This is a **Bell state**: maximally entangled, impossible to reach with only separable gates.

```


---

## Controlled-U gate


```{admonition} Controlled-U Gate

- CNOT is a controlled-X gate -- it performs a bitflip on the target if the control is in state $|1\rangle$.
- We can generalise this to a controlled version of *any* single-qubit unitary

```


```{admonition} Definition
:class: info

The Controlled-$U$ gate acts on two qubits — a **control** and a **target**.

- If control qubit is $|0\rangle$, target is unchanged.
- If control qubit is $|1\rangle$, $U$ is applied to the target.

```

- Matrix representation in the computational basis:

$$
\text{C-}U = \begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & u_{00} & u_{01} \\
0 & 0 & u_{10} & u_{11}
\end{pmatrix}
$$


- Circuit diagram representation:

```{image} ./CU.png
:width: 300
:align: center
```



**Action on basis states:**

| Control in | Target in |  Control out | Target out |
|---|---|---|---|
| 0 | $\vert\psi\rangle$ | 0 | $\vert\psi\rangle$ |
| 1 | $\vert\psi\rangle$ | 1 | $U\vert\psi\rangle$ |

```{admonition} **Key point: C-U recovers CNOT — and more**
class: tip

- Setting $U = X$ gives back the ordinary CNOT gate.
- Any single-qubit $U$ can be controlled this way, giving gates like **controlled-Z**, **controlled-phase**, or **controlled-H**.
- Like CNOT, a generic C-U is entangling: it **cannot** usually be written as $U_1 \otimes U_2$
- Controlled versions of arbitrary single-qubit gates are a key ingredient for building **universal gate sets**.

```


---

## SWAP gate

```{admonition} Definition
:class: info

The SWAP gate acts on two qubits, **exchanging** their states:

$$
\Large{|q_1, q_2\rangle \rightarrow |q_2, q_1\rangle}
$$

```

| | | | |
|---|---|---|---|
| Qubit 1 in | Qubit 2 in | Qubit 1 out | Qubit 2 out |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |


- Circuit diagram representation: 


```{image} ./SWAP.png
:width: 200
:align: center
```

- Matrix representation in the computational basis:

$$
\text{SWAP} = \begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

```{admonition} SWAP Gate

- SWAP is its own inverse: applying it twice returns the original state.
- Can be decomposed into **three CNOT gates**
<QuantumCircuit :qubits="2" gates="CNOT:1:0,CNOT:0:1,CNOT:1:0" />

```

```{admonition} **Key point: SWAP is separable, not entangling**

— unlike CNOT and Toffoli, SWAP maps product states to product states, so it can be built entirely from CNOTs and never generates entanglement on its own.

```




---

## Toffoli gate (CCNOT)

```{admonition} Toffoli

- The Toffoli gate generalises CNOT to **two** control qubits.
- It is a **reversible, classically universal** gate — enough to build any classical circuit.

```

```{admonition} Definition
:class: info

The Toffoli gate (CCNOT) acts on three qubits — two **controls** and one **target**.

- If **both** controls are $|1\rangle$, the target is flipped.
- Otherwise, the target is unchanged.

```

- Matrix representation in the computational basis (8×8):

$$
\text{CCX} = \begin{pmatrix}
1&0&0&0&0&0&0&0\\
0&1&0&0&0&0&0&0\\
0&0&1&0&0&0&0&0\\
0&0&0&1&0&0&0&0\\
0&0&0&0&1&0&0&0\\
0&0&0&0&0&1&0&0\\
0&0&0&0&0&0&0&1\\
0&0&0&0&0&0&1&0
\end{pmatrix}
$$

- Circuit diagram representation:


```{image} ./toffoli.png
:width: 200
:align: center
```


```{table}

| C1 in | C2 in | Target in | C1 out | C2 out | Target out |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 0 |

```

---

## Universal quantum gate set

```{admonition} Classical Recap
:class: info

- Remember in classical computing, the `NAND` gate alone is a universal set
- All other classical logic gates can be built from combinations of `NAND` gates

```


```{admonition} The Quantum Case

A universal quantum gate set is a set of gates which can be combined to reproduce the function of **any unitary operation** with *arbitrary accuracy*.

```

- Example of a universal **quantum** gate set:

```{image} ./UnivSetQ.png
:width: 600
:align: center

```

- $S$ and $T$ are two phase gates related to the Pauli $Z$ gate:

$$
S=\begin{pmatrix} 1 & 0 \\ 0 & e^{i \pi/2} \end{pmatrix}=\sqrt{Z}
$$

$$
T=\begin{pmatrix} 1 & 0 \\ 0 & e^{i \pi/4} \end{pmatrix}=\sqrt[4]{Z}
$$


---


## Features of quantum physics


### Entanglement (physically)

- Entangled systems share a quantum state. ​

- A measurement performed on one
subsystem instantaneously collapses the
state of the other subsystem, no matter how far apart they may be.​

- Einstein called this ‘spooky action at a distance’. 

```{image} ./Entanglement.png
:width: 600
:align: center
```

### Superposition principle

```{admonition} Definition

If $|\alpha\rangle$ and $|\beta\rangle$ are two states of a quantum system, then any linear combination (or superposition) of these states, given by 

$$c_1 |\alpha\rangle+c_2 |\beta\rangle$$

is a possible state of the system, where $c_1, c_2$ are complex numbers, and $|c_1|^2+|c_2|^2=1$.

```


```{image} ./Cat.png
:width: 600
:align: center
```



---

###  Uncertainty principle

Heisenberg’s uncertainty principle states that there is a maximum precision with which we can measure certain observables simultaneously. This applies to various pairs of physical quantities, including position x and momentum p, as well as energy E and time t. These operators are non-commuting observables, which means that 𝑥𝑝≠𝑝𝑥, so the order of operators matters in quantum mechanics.

This minimum uncertainty is related to another uniquely quantum feature: wave-particle duality, which tells us that a quantum particle can also be described as a wave. If that wave contains a single frequency this means it has small uncertainty in energy or momentum, but large uncertainty in position. If on the other hand the wave contains many frequencies, it has a large uncertainty in momentum and small uncertainty in position.

```{admonition} Definition

"Certain pairs of observables cannot be simultaneously measured with arbitrary precision"

$$
\Delta x \Delta p \geq \hbar/2
$$
```

- Here $\Delta$ means the standard deviation or **uncertainty** in the quantity that follows
- $x$=position, and $p$=momentum. $h = 6.63\times10^{-34}\,\text{m}^2\text{kgs}^{-1}$ is Planck's constant.
- $\hbar = h/2\pi$ is the reduced Planck's constant

$$
\Delta E \Delta t \geq \hbar/2
$$

Where $E=$ energy, and $t=$ time


```{image} ./uncertainty1.png
:width: 350
:align: center
```

```{image} ./uncertainty2.png
:width: 100%
:align: center
```


---

### No-cloning theorem

```{admonition} Classical
:class: info

Classically we can copy an unknown bit using the following simple process:


1. We receive an unknown bit. This means we don’t know its state. **We don’t know if it is 0 or 1**.
2. Measure the bit and record the outcome. We either get 0 or 1. Say for example we obtain 1.
3. Using this information, <mark>prepare a new bit</mark> matching the original bit.
4. Now we have 11, i.e. *original bit plus a copy*.

```


```{admonition} Quantum
:class: warning

What happens if we try to copy a qubit using this procedure?

1. We receive an unknown qubit. We don’t know its state $\psi=\alpha|0\rangle+\beta|1\rangle$. **We don’t know the coefficients** $\alpha$ and $\beta$.
2. Measure the qubit and record the outcome. We either get 0 or 1. Say for example we obtain 1.
3. We <mark>cannot prepare a new qubit</mark> matching the old one! We still don’t know 𝛼 and 𝛽.
4. Plus the *original qubit is now destroyed*!

```


<div class="h-16"></div>
<br>
<Banner type="info">

<p class="text-center text-xl">

"An <span class="highlight-pink">unknown</span> quantum state cannot be <span class="highlight-green">precisely</span> recreated, it cannot be **cloned**."

</p>

</Banner>



<v-clicks>

<div class="grid grid-cols-2 gap-8 mt-12">

<div class="caveat-box caveat-pink">

**Caveat:**
- Known states can be copied infinitely many times!
- By repeating the known algorithm used to prepare them.

</div>

<div class="caveat-box caveat-green">

**Caveat:**
- Approximate cloning is possible!
- By taking thousands of measurements in different bases. \[Bužek & Hillery. PRL 81 22 (1998)\]

</div>

</div>

</v-clicks>

<style>
.highlight-pink {
  background-color: magenta;
  padding: 0 4px;
}
.highlight-green {
  background-color: lime;
  padding: 0 4px;
}
.caveat-box {
  border: 2px solid;
  border-radius: 4px;
  padding: 16px;
}
.caveat-pink {
  border-color: magenta;
}
.caveat-green {
  border-color: lime;
}
</style>


### Tunneling

```{admonition} **Classical:**
:class: info

![](./CBarrier.png)

- Particle with $E>U$ passes through
- Particle with $E<U$ is reflected
```

```{admonition} **Quantum:**
:class: info

![](./QBarrier.png)

- Quantum particle behaves as wave – partially reflected and partially transmitted
- There is a non-zero probability of finding the quantum particle beyond the classically insurmountable barrier!
- The probability decreases exponentially with the width of the barrier
```


---

### Summary of the features of quantum physics


**Postulates of quantum mechanics**



| | |
|---|---|
| **State as abstract vector** | Quantum states are represented by abstract vectors, which are not measurable objects. |
| **Observables** | Observable in classical mechanics $\leftrightarrow$ linear Hermitian operator in quantum mechanics |
| **Uncertainty principle** | Certain pairs of physical properties can't be measured simultaneously with arbitrary precision |
| **Superposition principle** | If a system can exist in two states, it can also exist in any linear combination of those states |
| **Measurement** | Measuring an operator gives one of its eigenvalues, and changes the state of the system. |


**Consequences of the postulates**

| | |
|---|---|
| **Interference** | Probability amplitudes interfere leading to diminished or amplified probability. |
| **No-Cloning** | It is impossible to make an independent and identical copy of an unknown quantum state. |
| **Entanglement** | When the state of a subset of quantum particles can't be described independently of the others. |
| **Tunneling** | When a quantum particle passes through an energy barrier forbidden by classical physics. |

<style>
.table-heading {
  font-weight: bold;
  font-size: 1rem;
  margin: 0 0 4px 0;
}
.plain-table {
  margin-bottom: 16px;
}
.plain-table table {
  width: 100%;
  border-collapse: collapse;
}
.plain-table td:first-child {
  width: 20%;
  font-weight: bold;
  border-right: 1px solid #ccc;
}
.plain-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
}
</style>


---

## Connecting mathematical framework to experiment


### Putting it all together: qubits, gates & measurements  


| **Physical** | **Mathematical** |  **Example** |
|---|---|---|
| State | Vector | $\vert\psi\rangle=\alpha\vert 0\rangle + \beta\vert 1\rangle$ |
| Gate | Unitary matrix | $H=\frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$ |
| Observable | Hermitian matrix | $Z=\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ |
| Measurement outcome | Eigenvalue | $+1$ or $-1$ for $Z$ |
| State after measurement | Eigenvector | $\vert 0\rangle$ or $\vert 1\rangle$ for $Z$ |
| Probability of outcome | Squared magnitude of probability amplitudes | $\vert\langle 0\vert\psi\rangle\vert^2 = \vert\alpha\vert^2$ for outcome $+1$ of $Z$ |


---

### Quantum measurement

Probabilistic -- depends on the state of the system and the observable being measured.

<img src="./CoinMeasurement.png" width="1000" />


<Banner title="Born rule">

For a system initially in state $|s\rangle$, the probability of measuring outcome $a_h$ is given by:
$$
P(a_h) = |\langle h|s\rangle|^2=\left|\langle h|\left(c_1|h\rangle+c_2|t\rangle\right)\right|^2=|c_1|^2
$$

Similarly, the probability of measuring outcome $a_t$ is $P(a_t) = |c_2|^2$

</Banner>

---

# Expectation value

```{info}

- A single measurement gives one random outcome — but if we repeat the experiment many times, the **average** outcome is well-defined and predictable.

```

```{admonition} Definition
:class: info

For an observable represented by a Hermitian operator $\hat{O}$ and a state $|\psi\rangle$, the expectation value is

$$
\langle \hat{O} \rangle = \langle\psi|\hat{O}|\psi\rangle
$$

This is the average result you'd get measuring $\hat{O}$ on **many identically prepared copies** of $|\psi\rangle$.

```

- Individual measurement outcomes are eigenvalues of $\hat{O}$, denoted $\lambda_i$.
- Hence we can equivalently calculate the average as a sum over all these outcomes weighted by probability:

$$
\langle \hat{O} \rangle = \sum_i \lambda_i \, P(\lambda_i)=|\langle \lambda_i|\psi\rangle|^2
$$

where $|\lambda_i \rangle$ are the eigenvectors of $\hat{O}$.


---

### Expectation value: worked example


**Setup:** measure the observable $Z$ on the state

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

$$
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
$$


**Step 1:** identify the possible outcomes — the eigenvalues of $Z$:

- $+1$ for $|0\rangle$
- $-1$ for $|1\rangle$

**Step 2:** compute each outcome's probability from the Born rule

$$
P(+1) = |\langle 0|\psi\rangle|^2 = |\alpha|^2,
$$
$$
P(-1) = |\langle 1|\psi\rangle|^2 = |\beta|^2
$$


| Outcome | Probability | Contribution |
|---|---|---|
| $+1$ | $\lvert\alpha\rvert^2$ | $+\lvert\alpha\rvert^2$ |
| $-1$ | $\lvert\beta\rvert^2$ | $-\lvert\beta\rvert^2$ |


**Step 3:** sum the contributions

$$
\langle Z \rangle = (+1)|\alpha|^2 + (-1)|\beta|^2 = |\alpha|^2 - |\beta|^2
$$





```{admonition} **Key point:** 
:class: tip

- $\langle O \rangle$ is always a **real** number and lies **between the smallest and largest eigenvalues** of $O$ 
- In this case, $\langle Z \rangle$ lies between -1 and 1, reaching $\pm1$ only for the eigenstates $|0\rangle$ and $|1\rangle$.  
- For an equal superposition $\langle Z \rangle=0$.

```

---

## Summary


- We use the **tensor product**, denoted as $\otimes$, to combine qubits together to create multi-qubit systems.
- Multi-qubit gates and entanglement are essential for quantum algorithms.
- Universal gate sets allow for the construction of any quantum operation.
- Features which are used in quantum algorithms: 
  - superposition
  - interference
  - entanglement.
- We use the mathematical framework of vectors to represent states and matrices to represent gates and observables.


## Reference

- For details on some of the math, you can see {ref}`math-la` which goes a bit more in details about mathematical frameworks.