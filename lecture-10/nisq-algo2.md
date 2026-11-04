---
title: NISQ Algorithms II
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

(lecture-11)=
# Lecture 11: NISQ Quantum Algorithms II

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture 
```

```{admonition} Learning Outcomes
:class: tip

In this lecture we will be continuing our discussion on Noisy Intermediate Scale Quantum (NISQ) algorithms. The learning outcomes are: 
- Understanding the landscape of NISQ era algorithms
- Understanding the requirements for the practical application of NISQ era algorithms
```

```{admonition} Contents
:class: tip

- Quadratic Unconstrained Binary Optimization (QUBO)
- Quantum Approximate Optimisation Algorithm (QAOA)
```


## Recap: NISQ era algorithms

- NISQ stands for Noisy Intermediate Scale Quantum. This describes the current state of quantum hardware, with the largest quantum computers having between a few hundred and a few thousand qubits, all subject to noise.

- To work with these systems, shallow quantum algorithms with a low number of qubits are needed. In most cases, these algorithms are embbeded into a classical algorithm, resulting in _hybrid classical-quantum algorithms_.

- The most common type of NISQ algorithms are the variational quantum circuits (VQCs), which are quantum circuits that contain classical parameters that need to be classically optimised.



### Max-cut problem

- A graph is a structure made up of various nodes that have weighted connections (edges) between them. They can be used to model different problems and scenarios. For example social media users can be modelled using a graph, where its edges represent the influence between different users.

- The Max-cut problem aims to do a binary partition of the nodes of the graph so that the sum of the weights of the connections between the two sets is maximised. In the image below we can see how the graph's nodes were divided in two sets: one conatining nodes 0,3 and the other containing nodes 1,2.
```{image} ./images/max_cut.jpg
:align: center
```

- The Max-cut problem can be easily mapped to what is called an Ising Hamiltonian, which can be easily encoded and optimised on quantum computers.

- The Max-cut problem has applications in many areas including clustering, or graph and electrical design. It is often used as benchmnarking for evaluating optimisation techniques.

### Travelling-salesman problem

- The travelling-salesman problem is another famous optimisation problem. Given a list of cities represented with nodes on a graph, and its distances represented by the weighted edges, the objective of this problem is to find the shortest possible route, so that each city is visited just once, and the starting and ending point of the route is the same.

- Similarly to Max-cut, this problem can be easily mapped to an Ising hamiltonian and optimised in a quantum computer. In the image below we can see the graph representing the problem (left) and the shortest optimal route (right).
```{image} ./images/travelling_salesman.jpg
:align: center
```

- This problem has different applications in many areas, being finance and marketing among the most notable ones.





## QUBO problem

Quadratic Unconstrained Binary Optimisation, or **QUBO** is a class of mathematical problem, that has rather vast and diverse applications. The QUBO problem seeks minimization of a real valued function of several binary variables. More formally, one looks for minimization of the following function $f$ of $N$ variables -

$$
f({\bf x}) = {\bf x}^T Q {\bf x} + {\bf v}^T {\bf x} + c
$$

or equivalently

$$
f({\bf x}) = \sum_{ij} x_i Q_{ij} x_j + \sum_i v_i x_i + c
$$

where, $Q$ is real symmetric matrix of size $N\times N$ with entries $Q_{ij}$, ${\bf v}$ is real valued vector of length $N$, and $c$ is a constant number. The function $f$ is a function of $N$ binary variable ${\bf x} = (x_1, x_2, x_3, \dots, x_N)$, i.e., $x_i = 0, 1$. The matrix, vector and scalar $({\bf Q}, {\bf v}, c)$ define the optimization problem.

The variables being binary is what makes minimization of $f(x)$ interesting and difficult. Note that the minimization would have been easy if ${\bf x}$ was vector of continuous variables, as this would allow the use of gradient descent methods. However in the case where ${\bf x}$ is a vector of binary variables (0s and 1s), the function $f$ is not differentiable (not smooth). Therefore we cannot calculate its gradient, and one has to resort to other methods for minimization.

### QUBO example: Set partitioning.

To get a better feel about how and what kind of problems get mapped to QUBO, let us look at the following problem.
We have a set of $N$ numbers $U = \{n_1, n_2, n_3, \dots, n_N\}$, and we need to partition the set into two **disjoint** subsets $A$ and $B$ such that the sum of numbers in both the sets is as close to each other as possible. 

```{admonition} Definition
:class: tip

**Disjoint** sets do not have any elements in common.
```

More formally, if

$$
S_A = \sum_{i\in A} n_i \quad \text{and} \quad S_B = \sum_{i\in B} n_i
$$

The we need to construct the sets $A$ and $B$ such that $f_{\bf n} = (S_A - S_B)^2$ is minimum. Here ${\bf n} = (n_1, n_2, \dots, n_N)$ is the vector of numbers in the set. The function $f_{\bf n}$ is the cost function.


```{tip}
An example of such problem in daily life can be partitioning a class of students into two sections, such that average grade of students in each section is almost same.
```

The process of finding optimal solution involves finding different partitionings of the the set $U$ into $A$ and $B$, and computing the cost function, to seek minima using some algorithm. The cost function can be better formalised if we can define a definite set of variables for our problem.

For partitioning the set, we each of the numbers $n_i$ in only one of the two sets $A$, $B$, so we can associate a binary variable $x_i$ to $n_i$, such that if $x_i = 1$ if we put $n_i$ into $A$, and $x_i = 0$ if we put $n_i$ into $B$. Then a vector ${\bf x} = (x1, x_2,\dots, x_N)$ of binary variables encapsulated the set partitioning, and different configurations of the vector ${\bf x}$ correspond to different ways of partitioning the set into $A$ and $B$.

With ${\bf x}$, we can also write the set sums as follows -

$$
S_A = \sum_i n_i x_i \quad \text{and} \quad S_B = \sum_i n_i (1 - x_i)
$$

We can also define $S = \sum_i n_i$ as sum of all the numbers in the set $U$. Using the above expressions, we can compute the cost function as follows

$$
\begin{align}
f_{\bf n}({\bf x}) &= (S_A - S_B)^2 = S_A^2 + S_B^2 - 2 S_A S_B \\
&= \left(
    \sum_i n_i x_i 
\right)^2 + 
\left(
    \sum_i n_i (1 - x_i)
\right)^2 - 2
\left(
    \sum_i n_i x_i 
\right)
\left(
    \sum_i n_i (1 - x_i)
\right)\\
&= \sum_{ij}\left(
    n_i n_j x_i x_j + n_i n_j (1 - x_i) (1 - x_j) - 2 n_i n_j x_i (1 - x_j)
\right)\\
& = 4\sum_{ij} n_i n_j x_i x_j -4S\sum_i n_i x_i + S^2
\end{align}
$$

If we define $Q_{ij} = n_i n_j, v_i = -4S n_i$, and $c = S^2$, then the cost function can be written in the matrix form as follows -

$$
f_{\bf n}({\bf x}) = {\bf x}^T Q {\bf x} + {\bf v}^T {\bf x} + c = \sum_{ij} Q_ij x_i x_j + \sum_i v_i x_i + c
$$

### QUBO example: partitioning a set

Let's illustrate QUBO with an example. Consider a set of $N$ numbers

$$
U = \{n_1, n_2, n_3, \dots, n_N\}
$$

Our goal is to divide this set $U$ into two **disjoint** sets $A$ and $B$ such that the sums of the numbers in $A$ and $B$ are as close to each other as possible. So, if

$$
S_A = \sum_{i\in A} n_i \quad \text{and} \quad S_B = \sum_{i\in B} n_i
$$

then we need to minimise the following cost function:

$$
f({\bf n}) = (S_A - S_B)^2
$$

```{figure} ./images/SetPartition.png
:align: center

Partitioning a set of numbers into two groups. Aiming to minimize the cost function means we want their sums as close as possible, like balancing the scales.
```

### QUBO: set partitioning examples

```{admonition} Optimise shipping
:class: info

Imagine you have **several boxes** for shipping, and you want to put them on **two delivery trucks**.
```

```{admonition} Picking fair teams
:class: success

In a classroom of students, you want to pick **fair teams for a maths competition**, and divide students based on their **maths score**.
```

```{admonition} Minimise scrappage
:class: success

A construction crew has **two standard 10 metre steel beams**. They need to cut out several **smaller, specific lengths of steel** requested by the architect. The goal is to group the lengths into two piles so that the scrap metal left over is minimised.
```

### How does the vector ${\bf x}$ partition the set of numbers?

- Let's take example: $U = \{n_1, n_2, n_3, n_4\}$.

- Below are few examples of how ${\bf x}$ divides the set.

| ${\bf x}$   | $S_A$               | $S_B$                    |
| ----------- | ------------------  | ------------------------ |
| $(1,1,1,0)$ | $\{n_1, n_2, n_3\}$ | $\{n_4\}$                |
| $(1,0,1,0)$ | $\{n_1, n_3\}$      | $\{n_2, n_4\}$           |
| $(0,0,1,1)$ | $\{n_3, n_4\}$      | $\{n_1, n_2\}$           |
| $(0,1,0,0)$ | $\{n_2\}$           | $\{n_1, n_3, n_4\}$      |
| $(0,0,0,0)$ | $\{\}$              | $\{n_1, n_2, n_3, n_4\}$ |

### QUBO: classical algorithms

Three classical approaches to the partitioning problem, in increasing order of sophistication:

```{admonition} Pick me first
:class: info

A heuristic algorithm, where one puts a sorted list of numbers into two subsets $A$ and $B$, always adding the next number to whichever subset is currently lighter.
```

```{admonition} Greedy search (the blindfolded hiker)
:class: success

This is where one divides the set randomly, and swaps the element that lowers the cost function by the maximum amount. It only moves strictly "downhill", meaning it easily gets trapped in small ditches (local minima).
```

```{admonition} Simulated annealing (the bumpy tray)
:class: warning

This algorithm leverages the natural phenomenon of cooling. By pretending the cost function is the energy of a system, it starts by "shaking" the system to bounce out of bad solutions, slowly cooling until it settles in the deepest basin.
```

#### Heuristic approach: pick me first

1. **Sort items**: Arrange the entire set of numbers in descending order, from largest to smallest.
2. **Evaluate totals**: Compare the current accumulated sum of subset $A$ against subset $B$.
3. **Assign item**: Place the next available number into whichever subset is currently lighter.
4. **Terminate**: Repeat the evaluation and assignment until the sorted list is empty.

```{mermaid}
flowchart TD
    A([Start]) --> B["Sort items largest to smallest.<br/>Put first number in A"]
    B --> C[Take out an item]
    C --> D{"Is sum of A < sum of B?"}
    D -- Yes --> E[Assign item to A]
    D -- No --> F[Assign item to B]
    E --> H{Items remaining?}
    F --> H
    H -- Yes --> C
    H -- No --> G([End: assignment complete])
```

#### Greedy search

1. **Initialise state**: Begin with an arbitrary or pre-existing distribution of items across the subsets.
2. **Evaluate neighbours**: Calculate the exact energy change for every possible single-item swap.
3. **Execute best**: Identify and perform the one swap that yields the maximum energy reduction.
4. **Terminate**: Repeat the search until no single move can further reduce the total energy.

```{mermaid}
flowchart TD
    A([Start]) --> B["Divide the set<br/>randomly into A and B"]
    B --> C["Evaluate all possible<br/>single swaps"]
    C --> D{"Does best swap<br/>lower energy?"}
    D -- Yes --> E[Execute the best swap]
    E --> C
    D -- No --> F([End: stuck in a local minimum])
```

#### Simulated annealing

1. **Initialise system**: Define a starting temperature that allows high volatility, and a cooling rate.
2. **Evaluate random**: Select one random item and calculate the exact energy change if it switched sides.
3. **Accept or reject**: Swap immediately if the energy improves, or with a probability that depends on the temperature if it worsens.
4. **Terminate**: Repeat the cycle, lowering the temperature each time, until the system freezes.

```{mermaid}
flowchart TD
    A([Start]) --> B[Set temperature T]
    B --> C[Select one random swap]
    C --> D{Does it lower energy?}
    D -- Yes --> E[Execute swap]
    D -- No --> F{"Random() < exp(-ΔE/T)?"}
    F -- Yes --> E
    F -- No --> G[Reject swap]
    E --> H[Lower temperature T]
    G --> H
    H --> C
```

### Small-size heuristics: limitations

- Heuristic approaches work well for small sets (small problem sizes), but they don't scale well.
- They also assume that the optimal solution divides the set into subsets $A$ and $B$ of nearly equal size.

The figures below show histograms of the cost function over all possible partitions of a set. The $x$-axis shows the cost function value $f$, and the $y$-axis shows the number of partitions that have that same value of $f$, called the **degeneracy** of $f$.

```{figure} ./images/Degeneracy_SmallNums.png
:align: center

Histogram of the cost function over all partitions of a balanced set of small numbers. Many partitions share the same cost, so the degeneracy is high.
```

```{figure} ./images/Degeneracy_BigNum.png
:align: center

The same set after adding a single large element, 100. The distribution changes completely and the degeneracy is gone.
```

- A "balanced" set has high degeneracy.
- Adding a single element, 100, completely changes the distribution, and the degeneracy disappears.
- The larger degeneracy makes the problem harder.
- An imbalanced set usually results in optimal subsets that are imbalanced as well.

### Aspects of QUBO

- For QUBO, since the vector components are binary, there is no directional or visual guidance for the optimisation.
- The search must explore brutal combinatorics: there are $2^N$ possibilities for the binary vector ${\bf x}$.
- For the set partitioning problem, the complexity depends on the distribution of the numbers.
- In a balanced, uniform set, the number of combinatorial options explodes.

```{admonition} Definition: degeneracy
:class: success

A function is degenerate if different independent variables, or configurations, produce an identical result.

Formally, a function $f({\bf x})$ is degenerate at ${\bf x}$ if there is at least one ${\bf x}' \ne {\bf x}$ such that

$$f({\bf x}) = f({\bf x}')$$

For a function of discrete variables, degeneracy is best viewed as the number of configurations that share a given value of the function.
```

Next we look at how this affects the complexity of QUBO, and what the distribution looks like.

### Scaling in QUBO

As the size $N$ increases, the discrete landscape of possible set partitions scales as follows. We can partition the set into $A$ and $B$ containing $(1, N-1)$ elements, $(2, N-2)$ elements, and so on up to $(\frac{N}{2}, \frac{N}{2})$ elements.

| in $A$ | in $B$ | Combinations |
| --- | --- | --- |
| 0 | $N$ | $\binom{N}{0}$ |
| 1 | $N - 1$ | $\binom{N}{1}$ |
| 2 | $N - 2$ | $\binom{N}{2}$ |
| 3 | $N - 3$ | $\binom{N}{3}$ |
| ⋮ | ⋮ | ⋮ |
| $k$ | $N - k$ | $\binom{N}{k}$ |
| ⋮ | ⋮ | ⋮ |
| $N/2$ | $N/2$ | $\tfrac{1}{2}\binom{N}{N/2}$ |

```{admonition} Binomial coefficient
:class: note

The symbol $\binom{N}{k}$ denotes the number of ways to choose $k$ objects from a list of $N$:

$$
\binom{N}{k} = \frac{N!}{k!\,(N-k)!}
$$
```

For even $N$, the total number of distinct partitions is

$$
\binom{N}{0} + \binom{N}{1} + \dots + \binom{N}{N/2 - 1} + \frac{1}{2}\binom{N}{N/2} = 2^{N-1}
$$

This grows exponentially, which is why we need specialised methods for finding QUBO solutions.

```{figure} ./images/Scaling_SmallNums.png
:align: center

Scaling for the balanced set of small numbers.
```

```{figure} ./images/Scaling_BigNum.png
:align: center

Scaling for the set containing the single large element.
```

### Key aspects of QUBO

```{admonition} Quadratic objective mapping
:class: info

QUBO encodes complex combinatorial optimisation problems into a unified mathematical structure of linear biases (diagonal elements) and pairwise interactions (off-diagonal elements):

$$
f({\bf x}) = {\bf x}^T Q {\bf x}
$$

- The components are binary: $x_i \in \{0, 1\}$. One can use $x_i^2 = x_i$ to absorb linear terms into the diagonal of $Q$.
- However, we have no **visual** or **directional** insight into the **landscape** of the cost function.
```

```{admonition} Structural degeneracy
:class: success

QUBO problems can have broad, flat energy landscapes, where multiple distinct binary configurations yield the exact same global minimum. This heavily impacts solver trajectories and optimisation dynamics.
```


## Wrap-up

- We covered two common NISQ algorithms:
    - QUBO
    - QAOA