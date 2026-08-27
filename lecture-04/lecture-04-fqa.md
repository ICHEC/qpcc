---
title: First Quantum Algorithm 
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

(lecture-4)=
# Lecture 4: First Quantum Algorithm

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture.
```

## Learning Outcomes

```{admonition} Learning Outcomes
:class: information
- Understand what a <span class="hl-green">quantum algorithm</span> is and how it differs from a classical one.
- How a quantum algorithm is represented using <span class="hl-green">quantum circuits</span>.
- Study the <span class="hl-green">Deutsch algorithm</span>, one of the earliest quantum algorithms.
- Understand how quantum algorithms are <span class="hl-green">programmed</span>.
```

## Algorithm: Definition

```{admonition} Algorithm
:class: information
An <span class="hl-red">algorithm</span> is a <span class="hl-red"> set of instructions</span> that solves a given problem.
```
```{figure} ./images/algorithm_diagram.png
:align: center

Algorithm diagram.
```


- A <span class="hl-green">classical algorithm</span> is based on <span class="hl-green"> binary operations</span> or the moving around of <span class="hl-green">bits</span> (0's and 1's).

```{figure} ./images/algorithm_01.png
:align: center

Algorithm binary representation.
```

- A classical algorithm is always run on <span class="hl-blue">classical hardware</span>.

## Quantum Algorithm: Definition

```{admonition} Quantum Algorithm
:class: information
A <span class="hl-red">quantum algorithm</span> is an algorithm that leverages <span class="hl-red">quantum mechanics</span> in terms of design and/or hardware. 
```

```{attention}
Some algorithms are <span class="hl-green">designed</span> leveraging quantum mechanical properties, but run in a classical hardware.
```

Its basic unit of information is the <span class="hl-green">qubit</span>. It exhibits the following properties:


1. <span class="hl-blue">Superposition:</span> A qubit can be in <span class="hl-red">combination</span> of $\ket{0}$ and $\ket{1}$ states.
2. <span class="hl-blue">Entanglement:</span> Qubits can be <span class="hl-red">correlated</span> in ways that have no classical equivalent. Measuring the state of one qubit instantely tells us something about another.
3. <span class="hl-blue">Interference:</span> A quantum algorithm can be designed so that the "wrong" answers <span class="hl-red">interfere</span> destructively and the right answers interfere constructively.

## Superposition, Entanglement, Interference

1. <span class="hl-blue">Superposition</span>

$$H\ket{0} = \frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}$$

```{admonition} Superposition
:class: information
The qubit is in both states at once — measuring gives 0 or 1, each with probability 1/2.
```

2. <span class="hl-blue">Entanglement</span>

$$\frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{11}$$

```{admonition} Entanglement
:class: information
Measuring qubit 1 instantly fixes qubit 2's outcome.
```

3. <span class="hl-blue">Interference</span>

$$H H \ket{0} = \left(\tfrac{1}{2}+\tfrac{1}{2}\right)\ket{0} + \left(\tfrac{1}{2}-\tfrac{1}{2}\right)\ket{1} = \ket{0}$$

```{admonition} Interference
:class: information
The $\ket{1}$ amplitudes cancel (destructive), the $\ket{0}$ amplitudes add (constructive).
```

## Classical vs Quantum Algorithms

### 1. Basic unit of information

- <span class="hl-blue">Classical</span>: Works with <span class="hl-red">bits</span>. Each bit is definitely either 0 or 1 at every point in time.
- <span class="hl-blue">Quantum</span>: Works with <span class="hl-red">qubits</span>. Qubits can show <span class="hl-green">superposition, entanglement and interference</span>.

### 2. How states are processed

- <span class="hl-blue">Classical</span>: to check N possibilities, a classical computer generally has to look at them <span class="hl-red">one at time</span>.
- <span class="hl-blue">Quantum</span>: N qubits in superposition represent all $2^{N}$ combinations of states <span class="hl-red">simultaneously</span>.

```{attention}
Even if quantum algorithms work with a superposition of states, measuring collapses the system to **one result**.
```

### 3. Gates

- <span class="hl-blue">Classical</span>: Classical gates implement <span class="hl-red">boolean logic functions</span> on bitstrings.
- <span class="hl-blue">Quantum</span>: Quantum gates implement <span class="hl-red">linear transformations</span> (represented by unitary matrices) on state vectors.

### 4. Reversibility

- <span class="hl-blue">Classical</span>: most classical logic gates are <span class="hl-red">irreversible</span>. We can't uniquely reconstruct the input from its output.
- <span class="hl-blue">Quantum</span>: quantum gates must be <span class="hl-red">reversible</span>. This means they can always be run backward.

```{attention}
Reversibility of quantum gates is a **hard mathematical constraint** on how quantum circuits are built.
```

### 5. Algorithm output

- <span class="hl-blue">Classical</span>: Algorithm output is <span class="hl-red">deterministic in nature</span>.
- <span class="hl-blue">Quantum</span>: Measurement is <span class="hl-red">probabilistic in nature</span>.

### 6. Mathematical foundations

- <span class="hl-blue">Classical</span>: Based on <span class="hl-red">boolean algebra</span> and <span class="hl-red">discrete math</span>. Bitstrings are transformed by logical operations.
- <span class="hl-blue">Quantum</span>: Based on <span class="hl-red">linear algebra</span> over <span class="hl-red">Hilbert spaces</span>. Statevectors are transformed by unitary matrices.

```{attention}
Any classical algorithm can be represented and executed on a quantum computer.
```

## Computational Complexity

- <span class="hl-red">Computational complexity</span> is the study of <span class="hl-blue">time and space resources</span> required to solve computational problems.

- The <span class="hl-red">big-O notation ($O$)</span> is used to study the worst-case behaviour of specific algorithms.

- $f(n)$ is in the class of functions $O(g(n))$ means:

```{admonition} Big-O Notation
:class: information
There exists constants $c$ and $n_0$ such that for all $n>n_0\rightarrow f(n)<cg(n)$
```

- In computational complexity, $n$ can represent a wide variety of things, like the number of <span class="hl-blue">inputs, variables, qubits, gates, iterations...</span>

```{figure} ./images/complexity_plot.png
:align: center
:width: 580px

Growth of common complexity classes.
```

- A simple <span class="hl-blue">sorting algorithm</span> (e.g. <span class="hl-red">bubble sort</span>) is a good example of computing an algorithm's complexity.

```{figure} ./images/bubble_sort.gif
:align: center
:width: 360px

Bubble sort algorithm animation. Source: commons.wikipedia.org
```

- The <span class="hl-blue">bubble sort</span> is a simple (and inefficient) sorting algorithm.

- It steps through the list <span class="hl-blue">element by element</span>, comparing adjacent elements and swapping their values if the order is not right.

- This means it has to do $(N-1) + (N-2) + \dots + 2 + 1 = \frac{N(N-1)}{2}=\frac{1}{2}(N^{2}-N)$ swaps in the <span class="hl-red">worst case</span>.

```{attention}
For large $N$, the <span class="hl-red">$N^2$</span> term dominates, so bubble sort is said to have <span class="hl-red">$O(N^2)$</span> complexity.
```

## Circuits

- In <span class="hl-blue">theoretical computer science</span> a circuit is a <span class="hl-blue">model of computation</span> in which input values go through a sequence of gates, each of which computes a function.

- Classical (quantum) <span class="hl-red">algorithms</span> can be implemented using complex sequences of classical (quantum) <span class="hl-green">circuits</span>.

- <span class="hl-red">Circuits</span> can be thought as an <span class="hl-blue">ordered sequence</span> of operations, where each individual operation is a <span class="hl-blue">gate</span>.

```{figure} ./images/classical_quantum_circuit.png
:align: center

Example of classical and quantum circuits.
```

## Classical and Quantum Circuits: Differences and Similarities

### 1. Similarity: Gate ordering

- Both are <span class="hl-red">partially ordered sequences of gates</span>: independent gates can be <span class="hl-green">reordered</span> or run in <span class="hl-green">parallel</span>.

### 2. Difference: Gate timing

- <span class="hl-blue">Classical</span>: <span class="hl-green">Gate execution times</span> are essentially <span class="hl-red">uniform</span> across gate types.
- <span class="hl-blue">Quantum</span>: <span class="hl-green">Gate execution times</span> are <span class="hl-red">not uniform</span>. Different gates take different amounts of time to implement on real hardware.

### 3. Difference: Circuit depth

- <span class="hl-blue">Classical</span>: Circuit depth is not as important as classical bits <span class="hl-green">don't suffer from decoherence</span>.
- <span class="hl-blue">Quantum</span>: Depth is <span class="hl-green">critical</span>, since qubits have a <span class="hl-green">limited lifetime</span> due to decoherence.

## Quantum Circuits

- In a <span class="hl-red">quantum circuit</span>, <span class="hl-green">wires</span> represent qubits and <span class="hl-green">gates</span> represent operations on these qubits.

```{figure} ./images/single_quantum_gates.png
:align: center

Names, symbols and unitary matrices for common single qubit gates.
```

- Unless stated otherwise, qubits in a circuit are <span class="hl-blue">initialised</span> to $\ket{0}$ state.

- Circuits are read <span class="hl-red">left to right</span>. Gates to the left are applied first.

```{figure} ./images/quantum_circuit_1.png
:align: center

Quantum circuit example.
```

$$\begin{aligned}
SHX\ket{q_0} &= SHX\ket{0} = SH\ket{1}= \\
&= S\frac{1}{\sqrt{2}}\left(\ket{0}-\ket{1}\right) = S\frac{1}{\sqrt{2}}\left(\ket{0}-i\ket{1}\right)
\end{aligned}$$

### Multi-Qubit Circuits

```{figure} ./images/two_qubit_quantum_gates.png
:align: center

Common two-qubit gates: CNOT, general controlled-U and SWAP gate.
```

- Multi-qubit states in circuits are usually written as $\ket{q_0q_1\dots q_{n-1}}$ (<span class="hl-blue">big-endian ordering</span>).



```{attention}
Some SDKs like <span class="hl-red">Qiskit</span> use <span class="hl-blue">little-endian ordering</span>, which means that multi-qubit states are written as $\ket{q_{n-1}\dots q_1\dots q_{0}}$. In all cases, however, $q_0$ will be at the top when drawing the circuit.
```

```{figure} ./images/little_endian_big_endian.png
:align: center
:width: 400px

Quantum circuit example to show big-endian little-endian differences.
```

```{attention}
The state of the circuit above would be $\ket{001}$ in little-endian ordering and $\ket{100}$ in big-endian ordering.
```

```{figure} ./images/quantum_circuit_3.png
:align: center

3 qubit quantum circuit example.
```

$$
\begin{aligned}
\ket{\psi_0} &= \ket{000} \\[0.5em]
\ket{\psi_1} &= (H_0\otimes I_1\otimes I_2)\,\ket{\psi_0} = \tfrac{1}{\sqrt{2}}(\ket{000}+\ket{100}) \\[0.5em]
\ket{\psi_2} &= (\text{CNOT}_{01}\otimes I_2)\,\ket{\psi_1} = \tfrac{1}{\sqrt{2}}(\ket{000}+\ket{110}) \\[0.5em]
\ket{\psi_3} &= (I_0\otimes \text{SWAP}_{12})\,\ket{\psi_2} = \tfrac{1}{\sqrt{2}}(\ket{000}+\ket{101})
\end{aligned}
$$

### Measurement

```{figure} ./images/measurement.png
:align: center

Computational basis measurement symbol.
```

```{attention}
Even if measurement is drawn as a quantum gate, it is not. **Measurement is not unitary**. It is probabilistic and irreversible.
```

```{figure} ./images/measurement_2.png
:align: center

Example of measurement with classical registers.
```

- The outcomes of measurements are written into a <span class="hl-blue">classical bit</span> in the <span class="hl-red">classical register</span>.

- Classical registers enable conditional operations after mid-circuit measurements, applying quantum gates conditioned to the values in the classical register.

```{attention}
Sometimes all classical registers are drawn using just one double wire, or even not drawn at all.
```

## Classical Circuit Example: The Half Adder

- The <span class="hl-blue">half adder</span> is an example of a <span class="hl-red">binary logical classical circuit</span>.

- It takes two <span class="hl-green">1-bit inputs</span> and produces:

  1. <span class="hl-green">SUM:</span> A XOR B.
  2. <span class="hl-green">CARRY:</span> A AND B.

- It is called "half" adder because it doesn't account for a carry-in from previous stage.

```{figure} ./images/half_adder.png
:align: center

Half adder circuit.
```

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0   | 0     |
| 0 | 1 | 1   | 0     |
| 1 | 0 | 1   | 0     |
| 1 | 1 | 0   | 1     |

```{admonition} Half Adder
:class: information
When we run an <span class="hl-blue">algorithm</span> on a <span class="hl-red">classical computer</span>, it is made of a lot of <span class="hl-red">logical circuits</span> like the half-adder.
```

## Quantum Circuit Example: The Half Adder

```{figure} ./images/quantum_half_adder.png
:align: center

Half adder quantum circuit.
```

- The <span class="hl-blue">Toffoli gate</span> computes the <span class="hl-red">carry operation</span>, $q_2 = A \cdot B$.

- The <span class="hl-blue">CNOT gate</span> computes the <span class="hl-red">sum</span>, $q_1 = A \oplus B$.

- Measuring $q_1$, $q_2$ reads out the <span class="hl-red">sum</span> and <span class="hl-red">carry</span> into the classical register.

```{attention}
This is just classical logic embedded reversibly into unitary gates, no superposition or interference is used. There's **no quantum speedup**: it needs an extra ancilla qubit and offers no efficiency gain over a classical half adder.
```

## Deutsch Problem

```{figure} ./images/deutsch.png
:align: center
:width: 200px

David Deutsch.
```

- Given a <span class="hl-red">black box</span> $f : \{0,1\} \rightarrow \{0,1\}$

$$\begin{cases} f(0) = f(1) = 0 \\ f(0) = f(1) = 1 \end{cases}
\Rightarrow \textcolor{green}{\textbf{Constant } f}$$

$$\begin{cases} f(0) = 0,\ f(1) = 1 \\ f(0) = 1,\ f(1) = 0 \end{cases}
\Rightarrow \textcolor{blue}{\textbf{Balanced } f}$$

- Uses an <span class="hl-red">oracle</span> to determine if $f$ is <span class="hl-green">constant</span> or <span class="hl-blue">balanced</span>.

- <span class="hl-red">Classically</span> -> 2 queries.
- <span class="hl-red">Deutsch algorithm</span> -> 1 query.

- Early example of QC power (<span class="hl-blue">1985</span>).

## Quantum Parallelism

```{admonition} Quantum Parallelism
:class: information
<span class="hl-red">Quantum parallelism</span> allows quantum computers to evaluate a function f(x) for <span class="hl-blue">different values</span> of x <span class="hl-blue">simultaneously</span>.
```

- For a <span class="hl-green">binary function</span>, it is possible to build a gate $U_f$ that performs the transformation:

$$U_f\ket{x,y}=\ket{x,y\oplus f(x)}$$

```{figure} ./images/parallelism_oracle.png
:align: center

Parallelism oracle example.
```

- <span class="hl-green">Input state:</span> $\ket{\psi_0}=\frac{1}{\sqrt{2}}(\ket{0,0}+\ket{1,0})$

- <span class="hl-green">XOR gate</span> ($\oplus$) truth table:

| $x$ | 0 | 1 | 0 | 1 |
|---|---|---|---|---|
| $y$ | 0 | 0 | 1 | 1 |
| $x\oplus y$ | 0 | 1 | 1 | 0 |

$$U_f\ket{\psi_0}=\frac{1}{\sqrt{2}}(\ket{0,f(0)}+\ket{1,f(1)})$$

```{attention}
$f(0)$, $f(1)$ are evaluated <span class="hl-red">simultaneously</span>! But only <span class="hl-red">one value</span> is accessed per <span class="hl-red">measurement</span>.
```

## Oracle

- For a <span class="hl-green">1-bit function</span> there are only <span class="hl-blue">4 possible oracles</span>.

### Constant f

```{figure} ./images/oracle_1.png
:align: center
:width: 200px

$f(x)=0$
```

```{figure} ./images/oracle_2.png
:align: center
:width: 200px

$f(x)=1$
```

### Balanced f

```{figure} ./images/oracle_3.png
:align: center
:width: 200px

$f(x)=x$
```

```{figure} ./images/oracle_4.png
:align: center
:width: 200px

$f(x)=1-x$
```

## Deutsch Algorithm

```{figure} ./images/deutsch_algorithm.png
:align: center

Deutsch Algorithm.
```

1. Initial state.
2. <span class="hl-red">Superposition</span> generated using <span class="hl-green">Hadamard gates</span>.
3. Evaluate values f(x) using the <span class="hl-green">oracle</span> (<span class="hl-red">parallelism</span>).
4. <span class="hl-red">Interference</span> between states.

$$\ket{\psi_1}=\ket{0}\ket{1}$$

$$\ket{\psi_2}=\left(\frac{\ket{0}+\ket{1}}{\sqrt{2}}\right)\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)\rightarrow$$


$$\ket{\psi_3}=\frac{1}{\sqrt{2}}\left((-1)^{f(0)}\ket{0}+(-1)^{f(1)}\ket{1}\right)\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)$$

$$\ket{\psi_4}=\pm\ket{f(0)\oplus f(1)}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)$$

```{admonition} Deutsch Algorithm
:class: information
Solves the problem in just <span class="hl-red">one measurement</span>!
```

```{admonition} Note
:class: note note-red
In order to get the state $\ket{\psi_3}$, we used the fact that $U_f\left[\ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)\right] = (-1)^{f(x)}\ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)$. Let's see why:
```
$$U_f\left[\ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)\right] = \ket{x}\left[\frac{\ket{f(x)}-\ket{f(x)\oplus 1}}{\sqrt{2}}\right]\rightarrow$$

$$\rightarrow \left\{\begin{array}{c}\text{if } f(x)=0\rightarrow \ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right) \\ \text{if } f(x)=1\rightarrow -\ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)\end{array}\right.\rightarrow$$

$$\rightarrow U_f\left[\ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)\right] = (-1)^{f(x)}\ket{x}\left(\frac{\ket{0}-\ket{1}}{\sqrt{2}}\right)$$




## Deutsch-Jozsa Algorithm

- If $f$ is <span class="hl-red">n-bit:</span>

- <span class="hl-green">Deutsch-Jozsa algorithm</span> (<span class="hl-blue">1992</span>) -> <span class="hl-red">1 query</span>.

- <span class="hl-green">Classically</span> -> Can be up to <span class="hl-red">$2^{n-1}+1$ queries</span>.

```{figure} ./images/jozsa.png
:align: center
:width: 170px

Richard Jozsa.
```

- Looks like a big improvement but...

1. Deutsch problem has no known <span class="hl-blue">practical applications</span>.
2. The method <span class="hl-blue">evaluating the function it's different</span> between the classical and quantum case.
3. If we use a <span class="hl-blue">classical probabilistic algorithm</span>, we can drastically <span class="hl-blue">reduce the number of queries</span> needed to solve the problem with high confidence.

## Classical Programs

```{admonition} Classical Program
:class: information
A <span class="hl-red">classical computer program</span> is a <span class="hl-blue">set of instructions</span> in a programming language for a <span class="hl-red">classical computer to execute</span>.
```

- One can think of a <span class="hl-red">classical computer program</span> as a <span class="hl-green">concrete implementation of a classical algorithm</span>.

**random_integer.py**

```python
import numpy as np
import matplotlib.pyplot as plt

samples = np.random.randint(16, size=1000)
values, counts = np.unique(samples, return_counts=True)

plt.bar(values, counts)
plt.xlabel("Value")
plt.ylabel("Count")
plt.show()
```

```{figure} ./images/random_integer.png
:align: center

Output of random_integer.py.
```

## Quantum Programs

```{admonition} Quantum Program
:class: information
A <span class="hl-red">quantum program</span> is a <span class="hl-blue">set of instructions</span> in a programming language for a <span class="hl-red">quantum computation</span>.
```

```{attention}
A quantum program can be executed on a <span class="hl-green">quantum computer</span> or simulated in a <span class="hl-green">quantum simulator</span>.
```

```{attention}
A quantum program may be composed of <span class="hl-green">one or more quantum circuits</span>.
```

```{figure} ./images/quantum_algorithm_program_circuit_hierarchy.png
:align: center

Quantum algorithm, program and circuit hierarchy.
```

**random_integer_quantum.py**

```python
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(4, 4)
qc.h(range(4))
qc.measure(range(4), range(4))

counts = AerSimulator().run(qc, shots=1000).result().get_counts()

values = [int(bitstring, 2) for bitstring in counts]
weights = list(counts.values())

plt.bar(values, weights)
plt.xlabel("Value")
plt.ylabel("Count")
plt.show()
```

```{figure} ./images/random_integer_quantum_circuit.png
:align: center
:width: 430px

Circuit of random_integer_quantum.py.
```

```{figure} ./images/random_integer_quantum.png
:align: center
:width: 720px

Output of random_integer_quantum.py.
```

## Quantum Simulators

```{admonition} Quantum Simulator
:class: information
A <span class="hl-red">quantum simulator</span> is a classical system that <span class="hl-blue">reproduces the behaviour</span> of a quantum computer.
```

- Running algorithms on real hardware is <span class="hl-red">very expensive</span>.

- Using quantum simulators allows us to <span class="hl-blue">look for bugs, prototype algorithms or do resource estimation</span> before sending them to a real device.

- The number of amplitudes grows as <span class="hl-red">$2^n$</span>, so simulating larger systems gets <span class="hl-red">exponentially</span> harder.

```{figure} ./images/qubits_amplitudes.png
:align: center
:width: 650px

Number of amplitudes vs. number of qubits.
```

### Statevector Simulators

```{admonition} Statevector Simulator
:class: information
A <span class="hl-red">statevector simulator</span> represents the full quantum state as a <span class="hl-blue">single complex vector</span> of length <span class="hl-red">$2^n$</span>.
```

- The statevector simulator is the <span class="hl-blue">default simulator</span> in almost all SDKs.

- The number of <span class="hl-green">quantum amplitudes</span> grows <span class="hl-red">exponentially</span> with the number of qubits.

- Statevector simulation uses brute force to perform the simulation. It is the <span class="hl-red">most exact</span>, but among the most <span class="hl-red">computationally expensive simulators</span>.

- Simulating more than <span class="hl-green">40 qubits</span> with a statevector simulator requires supercomputer-scale distributed memory.


## Accesing Quantum Computing Systems 


### Quantum Stack 


```{figure} ./images/quantum_stack.png
:align: center

The quantum computing stack.
```


- The user can interact with the software and hardware elements of the quantum stack in different ways. 


- Quantum programs can be executed <span class="hl-blue">locally or remotely</span>, and using <span class="hl-green">commercial or publicly-funded</span> systems.




