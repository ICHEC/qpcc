---
title: Quantum Algorithms - II
layout: post
---

(lecture-11)=
# Lecture 11: NISQ Quantum Algorithms

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture 
```

```{admonition} Learning Outcomes
:class: tip
In this lecture we will be looking into Noisy Intermediate Scale Quantum (NISQ) algorithms. The learning outcomes of this lecture will be the following : 
- Introduction to NISQ algorithms and their applications.
- Grasping potential advantage of NISQ algorithms.
- Some illustration of the Optimization problem, namely QUBO.
```


```{image} ../prep/images/quant.png
:align: center
```


## NISQ era and algorithms

- NISQ stands for Noisy Intermediate Scale Quantum. This describes the current state of quantum hardware, with approximately 100 qubits, subject to noise.

- To work with this circuit, shallow quantum algorithms with low number of qubits are needed. In most of the cases, this algorithms are embbeded to a classical algorithm, resulting on _hybrid classical-quantum algorithms_.

- The most common type of NISQ algorithms are the variational quantum circuits (VQCs), which are quantum circuits that contain classical parameters that need to be classically optimised.
```{image} ./images/nisq_algorithm.jpg
:align: center
```

### Variational quantum algorithms

- One can think as VQC's as trainable quantum circuits. Different problems will require different gates and parameter structure.

- In order to train the variational parameters, we will measure the output of the circuit, sent it to a cost function (which is problem-dependant) and perform an optimisation step (like stochastic gradient descent) to update the parameters. We can repeat this process until we get a set of parameters that make the circuit output the desired solution.
```{image} ./images/vqc.jpg
:align: center
```

- We can use VQCs to solve simulation, optimisation and machine learning problems.

- Even though VQCs by themselves doesn't allow us to solve large problems, its integration in classical pipelines may be of interest in the near future.

### Map of NISQ algorithms

In the diagram below we can see some of the applications of NISQ algorithms. We will cover the different areas of application (simulation, optimisation and machine learning) in the following sections.
```{image} ./images/nisq_applications.jpg
:align: center
```

### Quantum algorithms and applications

In the diagram below we can see another diagram showing the problems solved by NISQ algorithms and the sectors in which these algorithms are useful. As examples, the maximum-cut proble is frequent in the tech sector, like in the study of networks. On the other hand fluid dynamics is present in aerospace engineer, or the travelling salesman problem in logistics. 

```{image} ./images/nisq_applications_2.jpg
:align: center
```


### Simulation 

- Simulation of quantum systems aims to predict the behaviour of a complex physical system such as a molecule. It remains extremely difficult for a classical computer to simulate this kind of systems.
```{image} ./images/simulation_1.jpg
:align: center
```

- These complex systems are generally composed of interacting quantum objects, which can be simulated on quantum computers by directly mapping these objects onto qubits.

- To run a quantum computing simulation algorithm, we have to encode the problem we are solving in a mathematical function called Hamiltonian, which can be thought as the energy model for the system. After encoding the Hamiltonian in the qubits of our circuit, we can apply one of our simulation algorithms to reach the desired solution.
```{image} ./images/simulation_2.jpg
:align: center
```

### Advantage of NISQ simulation algorithms

- Quantum systems like molecules are easy to simulate with other quantum systems (qubits are quantum systems!), as they maintain the same properties and follow the same physical laws.

- As quantum systems are very complex, they are impossible to simulate classically due to memory constraints when the system size exceeds $N=50$.

- This however doesn't mean that any problem computation done with more than 50 qubits can't be solved classically using alternative methods.


### Simulation map 

```{image} ./images/simulation_map.jpg
:align: center
```

- Above is shown the mapping between quantum simulation algorithms and some of their applications in specific industries.

- Algorithms are shown in red, applications in green, and more abstract problems in blue.

- Algorithms can solve a set of particular problems, shown in blue, which can be used for a particular application on an industry.

- As we see, the generic simulation algorithms are the Variational Quantum Eigensolver (VQE) and the Quantum Approximate Optimsation Algorithm (QAOA). The objective of both algorithms is to measure the energies of some Hamiltonian.

### The variational quantum eigensolver

- Looking back at the Benzene molecule we saw at the beginning of the lecture, let's see how we can use the VQE to find its minimum energy state in a process called eigensolving.

- We can encode the Benzene molecule in a Hamiltonian in which we can the apply the VQE to.

- Each of our qubits will represent one component of the system. We can apply evolution operators to these qubits, which will contain variational quantum parameters, that will be optimised until we find the desired minimum energy.
```{image} ./images/vqe.jpg
:align: center
```

### PFAS molecule destruction

- An important use-case of the VQE is the study of PFAS (per-and polyfluoroalkyl) molecule destruction. These molecules are used as heat, water and oil resistant coatings in many areas.

- These molecules are present in many materials, and have the inconvenient that are toxic to human bodies and they can easily contaminate water. Thus, there is an interest in chemical degradation and destruction of these molecules. In order to break these molecules we need to be able to simulate their energies, something that can be done with the VQE.

### Optimisation

- Optimisation is a branch of mathematics and computer science that deals with finding the best solution (maximum or minimum) of some problem, by performing iterations of a given algorithm.

- One may want to minimise quantities like energy use or manufacturing time, or maximise profit for example.

- It turns out that the VQCs we have seen before are promising candidates to solve optimisation problems.

- An optimisation problem can be encoded on a VQC. The quantity we want to maximise/minimise would therefore be a function of the output when measuring the VQC. We can update the variational parameters of the VQC (using a classical optimiser) in successive iterations until the desired solution for our optimisation problem is attained.
```{image} ./images/optimisation.jpg
:align: center
```

### Optimisation map

```{image} ./images/optimisation_map.jpg
:align: center
```

- Above is shown the mapping between quantum optimisation algorithms and some of their applications in different industries.

- When comparing this map with the one we presented before for simulation, we seen than the Grover adaptative search algorithm has been added now. This algorithm is a NISQ variation of Grover's algorithm, where Grover search is iteratively applied and classically optimised to find good solutions.

- As we see, the applications and sectors are different when we compare them to the simulation map.

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

### Optimisation using annealing

- Until now we have mainly focused on VQCs, a type of quantum algorithm that is meant to be implemented on a gate-based quantum computer. However, there exist other types of quantum computer architectures that are good when it comes to solve optimisation problems.

- One of these architectures is what is called quantum annealing. This type of quantum computers are only capable of solving problems that can be encoded as Ising Hamiltonians.

- While this is a limitation, it is compensated by the fact that annealers have more than 5,000 qubits available, meaning that the size of the problems that can be solved is much larger when compared to gate based computers.
```{image} ./images/annealing.jpg
:align: center
```

- One of the most promising quantum annealing applications is portfolio optimisation.</li>


## Machine learning

- The primary goal of machine learning is to develop models that can generalize well to new, unseen data, allowing them to make accurate predictions or decisions in various situations.

- A simple example of a machine learning task is image classification. In the image below we can see bees and ants. One machine learning model (which is well trained), would be capable of distinguishing between the bees and ants in the image.
```{image} ./images/machine_learning.png
:align: center
```

### Advantage of NISQ machine learning algorithms

- We can find different computational bottlenecks in a classical machine learning workflow. One example of this is matrix-vector multiplication, a seemingly simple operation which consumes a lot of computation power when the matrices are very large.
```{image} ./images/matrix.jpg
:align: center
```

- Other examples of computationally expensive tasks appearing in machine learning tasks are Fourier transforms, diagonalising matrices or solving linear systems of equations.

- With quantum algorithms it is thought that we can get an speed-up in some of these tasks.


### Machine learning map 

```{image} ./images/machine_learning_map.jpg
:align: center
```

- Above is shown the mapping between quantum machine learning algorithms and some of their applications in different industries.

- When compared to the previous maps we have shown, it can be seen that VQCs are still important here, and also the quantum embedding kernels, which are based on classical kernel methods but implemented on a quantum computer.

- Among the applications we find neural networks (we can use VQCs as one neural network layer) or quantum generative adversarial methods (quantum GANs), that can be used to generate data that resembles the original data used for training. These are especially important in fraud detection in finance industry.

### Classical neural networks 

```{image} ./images/neural_network.jpg
:align: center
```

- A classical neural network is composed of multiple layers of transformations, governed by certain weights and parameters, which are represented in nodes in the image.

- A vector is input to the networks and is transformed multiple times until we get the output vector.

- The parameters of the network are trained to minimise a cost function that will depend on the quantity that we are measuring.

### Quantum neural network

- A quantum neural network is a neural network where one of more of the layers is a VQC.

- As we seen in the previous section, each layer of the network is governed by a set of parameters. When a layer is a VQC, these parameters will be the variational parameters appearing in the quantum circuit, that will be optimised during the training phase.

- What the benefits are of having a VQC as layer is still an open question in quantum machine learning.
```{image} ./images/quantum_neural_network.jpg
:align: center
```

### Quantum tranfer learning 

- Quantum transfer learning is a technique that falls within the field of quantum neural networks.

- This technique involves using a pre-trained classical neural network, and substituting one of the layers of the networks by a VQC, as we can see in the image.

- The VQC variational parameters are trained using the output of the pre-trained classical neural network to get the desired result.
```{image} ./images/quantum_transfer_learning.jpg
:align: center
```

### Quantum machine learning example 

- Let's return to the image processing task on bees and ants that we saw before to see an example of application of quantum machine learning.

- As we see in the diagram, we input an image encoded in 512 pixeles to a pre-trained neural network on image classification.

- After that a layer is applied to reduce dimensionality, and its output is sent to a VQC with 4 parameters. Then, another layer is applied to get a 2-dimensional vector with out predictions
```{image} ./images/quantum_machine_learning_example.jpg
:align: center
```

### Anomaly detection with qGANs

- As we have seen before, GANs have seen great success in anomaly detection.

- A GAN consists of two neural networks, a generator and a discriminator. The generator aims to to create a dataset which is indistinguishable from the training data provided, and the discriminator aims to succesfully distinguish between these two datasets.

- After training these two networks, the discriminator will be capable of detecting anomalies on unseen data.

- The classical GANs have shown limitations in training phase and sampling procedure. That is why in qGANs the classical generator is replaced with a VQC to try to overcome this limitations.
```{image} ./images/qGANs.jpg
:align: center
```

## QUBO problem

The Quadratic unconstrained binary optimiation, or **QUBO** is a class of mathematical problem, that has rather vast and diverse applications. The QUBO problem seeks minimization of a real valued function of several binary variables. More formally, one looks for minimization of the following function $f$ of $N$ variables -

$$
f({\bf x}) = {\bf x}^T Q {\bf x} + {\bf v}^T {\bf x} + c
$$

of equivalently

$$
f({\bf x}) = \sum_{ij} x_i Q_{ij} x_j + \sum_i v_i x_i + c
$$

where, $Q$ is real symmetric matrix of size $N\times N$ with entries $Q_{ij}$, ${\bf v}$ is real valued vector of length $N$, and $c$ is a constant number. The function $f$ is a function of $N$ binary variable ${\bf x} = (x_1, x_2, x_3, \dots, x_N)$, i.e., $x_i = 0, 1$. The matrix, vector and scalar $({\bf Q}, {\bf v}, c)$ define the optimization problem.

The variables being binary is what makes minimization of $f(x)$ interesting and harder. Not that the minimization would have been easy if ${\bf x}$ was vector of continuous variables, as the minimization of functions of several variables is an $NP$ hard problem. But real variables give us access to local minima through gradient descent methods.

### QUBO example: Set partitioning.

To get a better feel about how and what kind of problems get mapped to QUBO, let us look at the following problem.
We have a set of $N$ numbers $U = \{n_1, n_2, n_3, \dots, n_N\}$, and we need to partition the set into two disjoint subsets $A$ and $B$ such that the sum of numbers in both the sets is as close to each other as possible. More formally, if

$$
S_A = \sum_{i\in A} n_i \quad \text{and} \quad S_B = \sum_{i\in B} n_i
$$

The we need to construct the sets $A$ and $B$ such that $f_{\bf n} = (S_A - S_B)^2$ is minimum. Here ${\bf n} = (n_1, n_2, \dots, n_N)$ is the vector of numbers in the set. The function $f_{\bf n}$ is the cost function.


```{tip}
An example of such problem in daily life can be partitioning a class of students into two section, such that average grade of students in each section is almost same.
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

For small size problems, one can use heuristic algorithm we use in daily life to partition the set. However, with growing problem size, the heuristic algorithms can lead to quite misleading results.


## Wrap-up

- Introduction to NISQ algorithms and their applications in different areas
    - Simulation
    - Optimisation
    - Machine learning
    - QUBO
- Add more