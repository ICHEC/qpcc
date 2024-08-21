---
title: Mathematical framework for Quantum Computing
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
# Lecture 4: Mathematical framework for Quantum Computing

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture 
```


```{admonition} Learning outcomes
:class: tip

In this lecture we discuss the mathematical framework and tools required to properly understand how quantum system works. We give a short introduction to notion of vector spaces, linear operators, and how they connect to physical reality.
```

## Postulates of Quantum Physics
Let us go through some of the building blocks of quantum mechanics, and see how the required mathematical framework emerges.

### Uncertainty Principle
It is a fundamental principle of quantum mechanics, which states that certain pairs of physical properties can't be measured simultaneously with arbitrary precision, for example a particle's position and momentum. The properties which can form such pairs are called conjugate properties to each other. In the coming sections we will discuss more about them. In fact the product of uncertainties of the conjugate properties is bounded below. If the conjugate properties are $A$ and $B$, and the standard deviation or uncertainties in their simulaneous measurement in a given experiment are $\sigma_A$ and $\sigma_B$, then

$$
\sigma_A \sigma_B \ge \frac{h}{4\pi}
$$

where $h$ is Plank's constant.

### State as an abstract vector

In everyday life we use the term `state` when we refer to the situation/condition somebody or something is in. We make it more comprehensive by adding adjectives to it, such as *in state of weakness*, *in state of pain*, etc. In case of a physical system, the same idea extends to a comprehensive definition, with quantifiability. The state of a physical system refers to something that can provide complete physically accessible information about the system at a given instant of time. This is quantified with first determining the number of independent quantities required for complete information, and then assigning a variable for each of those.
A numerical value of each of those variable defines the state of the system. Formally -

> A **state** is a **set of variables** describing a system which does not include anything about its history.

This set of variable is assumed to be *minimal* so that removing any component results in only partial information about the system. Take for example the case of a single isolated particle.
Then it's position and velocity are two independent minimal properties.  If the motion of this particle is constrained along a line, then a variable $x$ denoting it's distance from a chosen origin on the line completely determines it's position, and it's time derivative $v = \frac{dx}{dt}$ determines the velocity. Thus together, $(x, v)$ define the state of the particle.
If the motion was not constrained, one would need three coordinates $(x, y, z)$ for position, and three components of velocity $(v_x, v_y, v_z)$ with respect to a given reference frame. Thus collectively a set of six variables $(x, y, z, v_x, v_y, v_z)$ defines the state of a particle. For a system of many particles, the variables are concatenated, and the set becomes bigger. For $N$ particle system, the set contains $6N$ variables.

Note that this set has to be ordered so there is no confusion in the meaning of each of its elements. Such ordered sets are essentially what one calls vectors. We discuss vectors in more details in the coming sections.

>> Add Figure


```{margin}
A reference frame refers to a chosen point of origin, and a given orientation of coordinate axes in which a position is measured.
```

```{admonition} Degrees of Freedom
:class: tip
The degrees of freedom of a system is a number associated with it. It is the number of independent ways one
can change the system's state. Alternatively, it's also the minimum number of individual quantities required to specify the state.
```

In case of single particle, it's degrees of freedom is 6. For a system of $N$ particles, it's $6N$.

Now consider a quantum particle, and think whether we can use the above mentioned set of positions and velocities/momenta $(x, y, z, v_x, v_y, v_z)$ can describe the state of quantum particle. Due to uncertainty principle, we immediately run into a problem, because the position $x$, and velocity $v_x$ can not be accurately determined simultaneously. Thus the set of position and velocity variables can not provide complete information about particle's state.

So how do we define state of a quantum system? Here one postulates, that it is possible to define a `state` of a quantum system, represented as some type of abstract object. This object will likely have multiple components associated with it, one for each degree of freedom. It will thus be a vector
of some kind. For the moment we call it an abstract vector, as we don't know it's structure. As we go throught the sections, we will explore how this structure emerges, and how it works. 

So, for the moment, we say that the state of a quantum system is represented by an abstract vector. In due course we will learn several synonyms for this abstract vector defining the state of a quantum system.

---

### Superposition principle

Superposition, issentially means applying multiple effect/stimuli/attributes on a system/object.

In general, the superposition principle applies to anywhere more than one attributes can be imposed on a single object.
Formally speaking, the principle states that in all linear systems, the net response caused by two or more stimuli on a system is sum of the individual responses that would have been caused by each individual stimulus.

> The sum of responses of individual effects, is same as the response of the sum of individual effecs.

Once we go through the mathematical structure in the coming sections, it will become clear that the superposition principle issentially is a consequence of **linearity** in the system, or linear behaviour.

In quantum mechanics, the superposition applies to states. What that means is, that if a system can exist in say two states $A$ and $B$, then it can also exist in a superposition of $A$ and $B$. In the section below we will learn how to interpret such a thing mathematically, but for now we can intuitively speculate, that a superposition of two states should have properties resembling both the states even though the two state might be very different.

>> Figure for illustration
 
### Role of interference
The notion of intereference is quantum systems is very similar to what it means in waves. When two waves are combined, their instantaneous intensities or displacements are added. The intensity or displacement of the resulting wave can be greater or lower depending on their `relative phase`.

![](https://upload.wikimedia.org/wikipedia/commons/5/5d/Waventerference.gif)

In case of quantum system, as we will see, probability amplitudes take the role of intensity or displacements.

### Principles of measurement
In quantum mechanics, a measurement is testing or manipulation of a physical system that yields a numerical result.
This in principle doesn't look much different than a measurement of a classical system. However, in the quantum realm,
the process of `measureing` something also changes the underlying system.


### No-cloning


### Entanglement
### Tunnelling 

---
## Mathematica Structure

Here we discuss in bravety the necessary mathematical structures upon which the formulation of quantum mechanics relies on.
It progressively goes as follows -
```{mermaid}
mindmap
root(Mathematical Framework)
    Vector Space, Hilbert Space
        Scalar vs Vector
        States as Vector (Bra and Ket)
    Linear combination
        Linear independence
    Inner Product
        Overlap of vectors
        Orthogonality
    Linear Operators
        Commutativity
        Special operators: Unitary, Hermitian, ...
        Probability conservation
    Representation theory
```

#### Scalar vs Vector

Any quantity that can be described by a single numerical value, usually with real, and sometimes with complex numbers is a scalar.
The common examples of scalars are volume, density, speed, energy, mass and time.

Quantities require multiples of numerical values, with each value describing some aspect of the quantities, are called vectors. The number of these values is called the `dimension` of the vector. Common examples of vector quantities from physics include position, velocity, momentum, and force.

Both scalars and vectors are represented usually with real numbers, and often with complex numbers. So the notions of `addition`, `subtraction`, `multiplication` and `division`,
through which we manipulate numbers, are suitably extended on scalars and vectors.

**Scalars**: are expressed in terms of single number, so their algebra is essentially the same as algebra of real/complex numbers they are expressed in.

**Vectors**: are expressed in terms of multiple numbers. So it's not straight forward as to how to extend their algebra from the component numbers. We see below how this is done.

**Vector Space, Hilbert Space**: A Vector space is a mathematical structure, that constitutes the necessary components to manipulate vectors in sensible way. Before we define it, we need to understand a few definitions, namely `Set`, `map`, `Binary operations`, `Group` and `Field` -

### Set
Learning the notion of sets, and their manipulation provide not only training in fundamentals of logic of categorisation, organisation, it is crucial building block of most of mathematics.

In Mathematics, a set is defined as a unique collection of well defined objects[^1], and the object in the collection are called elements of the set.

For example,

- $A=\{a, e, i, o, u\}$ is a set of vowels in english language.
- $\mathbb{Z} = \{0, \pm1, \pm2, \pm3,\dots\}$ is the set of integers.

It's important to imphesise the important of uniqueness in a set. It means in that in a set, a member exists only once. Thus $A=\{a, e, i, o, u\}$ is a well defined set, while $A=\{a, e, i, o, u, a, i\}$ is not, as $a, i$ are put twice. So a set is different than a mere list, which can have multiple occurrance of an object.

Secondly, the order of elements in a set have no meaning, so $\{a, e, i, o, u\}$ and say, $\{i, o, a, u, e\}$ are same sets, just expressed differently.

A set can be finite, or infinite, that is, the number of elements in a set can be finite, or infinite.

You can manipulate a set, by adding or removing elements from it. A set with no elements is called `Null set`, denoted by $\emptyset$.

Sets can be finite and infinite. We all know what being finite is, so a finite set is a set with finite number of elements which one could count.
Infinite is a slightly tricky concept in mathematics. To start with, an infinite set is a set that **is not** finite.

The set of natural numbers $\mathbb{N} = \{1, 2, 3, \dots\}$ plays a central role in the categorisation of sets. First, it let's us define countability. So a set in which you could count the number of elements one by one, is called countable. If the counting finishes after finite number, the set is finite and countable. If you can count, and the counting can not finish in finite time, the set is said to be countably infinite. By definition or axiom, the set of natural number is countably infinite. **Uncountable** sets on the other hand, are the ones that are inifinite, and contains too many elements to be even countable.

We use the term **cardinality** for representing a measure of number of elements in a set. The cardinality of a finite set is the number of elements in it. For infinite sets, the cardinality is symbolic and is established by comparison of two sets and defining map among them.



#### Subsets
Imagine we have two sets, A and B, and it is such that, every element of A is also element of B, then we say that A is a subset of B. It is denoted as $A\subset B$. We also in this case, call B as **superset** of A.

Naturally, every set is subset and superset of itself. We a call a set A to be a **proper subset** of B, if every element of A is in B, but at least one element exists in B that is not in A. In this case, B is called a **proper superset** of A.

For finite sets, their proper subsets have strictly lower number of element than the set itself. However for infinite sets, a proper subset may
have same cardinality as the set itself.


```{figure} https://upload.wikimedia.org/wikipedia/commons/b/b0/Venn_A_subset_B.svg
:align: center
:width: 400px

A is subset of B, and B is superset of A
```

```{figure} https://upload.wikimedia.org/wikipedia/commons/a/a0/NumberSetinC.svg
:align: center
:width: 400px

Visualisation of the set of numbers, natural numbers $\mathbb{N}$, integers $\mathbb{Z}$, rational numbers $\mathbb{Q}$, real numbers $\mathbb{R}$, and complex numbers $\mathbb{C}$. We have following $\mathbb{N}\subset \mathbb{Z}\subset \mathbb{Q}\subset \mathbb{R}\subset \mathbb{C}$
```

```{code-cell}
:align: center
:tags: ["remove-input"]
# Library
from matplotlib import pyplot as plt
from matplotlib_venn import venn2
 
# Basic Venn
v = venn2((10, 12, 10), ("A", "B", "AB"), alpha = 0.5)
 
# Change Backgroud
plt.gca().set_facecolor('white')
plt.gca().set_axis_on()
 
# Show it
plt.show()
```


We defined what a set is, and introduced a notion of comparison by defining what a subset, and superset is. There is a lot more one can do with the notion of sets, to manipulate them, to the extent that it looks like everyday algebra.

- **Universal set:** For a given consideration of problem, a universal set $U$ is set of all elements considered, and fixed, so that every set defined for the problem, is a subset of $U$.

- **Complement:** Compliment of a set A, denoted by $A'$, or sometimes $A^c$ is defined with respect to the universal set, is set of all elements of $U$ that are not in A.

- **Union:** A union of two sets, say A and B, denoted as $A\cup B$ is defined as the set of all elements that belong to either A, or B, or both. For example, if $A=\{1,2,3,4\}$ and $B=\{1,3,5,7\}$, then $A\cup B = \{1, 2, 3, 4, 5, 7\}$.

- **Intersection:** An intersection of two sets, say A and B, denoted as $A\cap B$ is defined as set of all elements that belong to both A and B.

- **Difference:** The set difference of A from B, denote as $A-B$, is set of all elements of A that are not elements of B.

- **Cartesian Product:** A cartesian product of two sets, say A and B, denoted by $A\times B$ is the set of all ordered pairs $(a, b)$ such that $a$ belongs to A, and $b$ belongs to B.

> Add illustration


### Map
In mathematics, a map is somethings that defines a symbolic relation from elements of a set **X** to elements of another set **Y**, such that each element of **X** gets associated to an element of **Y**. The set **X** whose elemets get `mapped to` is called the **domain of the map** and the set **Y** the elements of which they get `mapped from` is called the **range or codomain of the map**.

Symbolically, a map is expressed as follows

- We say that $f$ is a map from X to Y by $f: X\longrightarrow Y$
- For an element $x$ in X, the element in Y it maps to, is expressed as $f(x)$.
- The element $f(x)$ belongs to Y, and is called the **image** of $x$.

```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Function_color_example_3.svg/1024px-Function_color_example_3.svg.png
:align: center
:width: 70%
```

- The map, mapping, correspondence are synonyms. Usually, if the set is of numbers, they are also called functions.

- A map between two sets let's us see a holistic relation between them.

- If distinct elements of the domain set X get mapped to distinct elements of the codomain set Y, the map is called **injective, or one-to-one**. For example, consider the set of integers $\mathbb{Z}$, and a map $f: \mathbb{Z} \longrightarrow \mathbb{Z} $ such that $f(x) = 3 x$. This is an injective map from $\mathbb{Z}$ to itself.

- A map in which each element of the codomain set is image of some element in domain set, is called **surjective or on-to** map.

- A map that is both injective, and surjective, is called a **bijective map**. Bijective maps play an important role in mathematics.

```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Bijection.svg/1024px-Bijection.svg.png
:align: center
:width: 70%
```

- Recall the uncountable sets. Using concept of map we can more clearly define it as follows - A set X is uncountable if and only if there exists no injective map from the set X to set of natural numbers $\mathbb{N}$.

- Consider the set of integers $\mathbb{Z}=\{\dots, -2, -1, 0, 1, 2, \dots\}$ and a map $f:\mathbb{Z}\longrightarrow \mathbb{Z};\quad f(n)=3n$. The range of this set is a proper subset of $\mathbb{Z}$, as the range only contains numbers that are multiple of 3. However, since the map is injective, this means that the subset has the same cardinality as $\mathbb{Z}$.

$$
\begin{align}
    \begin{Bmatrix}
    \vdots \\
    -2\\
    -1\\
    0\\
    1\\
    2\\
    \vdots
    \end{Bmatrix} \underrightarrow{~~~~~~f~~~~~~}
    \begin{Bmatrix}
    \vdots \\
    -6\\
    -3\\
    0\\
    3\\
    6\\
    \vdots
    \end{Bmatrix}
\end{align}
$$ 


- Maps can be combined. Instead of exploring general consequences, consider two bijective maps $f, g$ from a set X to itself. If $f$ maps an arbitrary element $a$ in X to $b=f(a)$, and $g$ maps $b$ to $c=g(b)$, then the the **combination, or composition** of the two maps $fog$ maps $a$ to $fog(a) = f(g(a))$.

```{mermaid}
:align: center
graph LR
a(["X"])
b(["X"])
c(["X"])
a --f--> b --g--> c
a --fog--> c
```


### Binary operations

Binary operations, as the name suggests are operations that take two objects and combine them to give (usually) one unique object.

In mathematics, binary operation is defined on a set, that takes two elements of the set, and returns one element of a  set.

Formally, a binary operation on a set A is a mapping of elements of $A\times A$ to A, expressed as

$$
o : A\times A \longrightarrow A
$$

For the binary operation to be well defined, the operation $o$ should be such that *every* pair of elements from A, should map to a unique element in A. That is, if $a, b$ are two arbitrary elements of A, then there exists a $c$ in A, that $o(a, b) = c$. $o(a, b)$ or $a~o~b$ is denoted as result of the binary operation.

**Commutativity** A binary operation is said to be commutative, if the result of combining does not depend on which is combined to the other i.e., if $a o b = b o a$ for every $a, b$ in the set A.

Examples:

- On the set of real numbers $\mathbb{R}$, the usual addition $o(a,b) = a + b$, and the usual multiplication $o(a,b) = ab$ are most common examples of binary operations.
- Consider a given set X, and a set S of all possible bijective maps from X to X, then the composition of maps `o` is a binary operation.


### Group
When we have a set, it let's us categorize, and organize the elements. Having binary operations defined on a set tells us how a pair of elements of the set result in another element, in effect how combining elements gives us different elements.

The binary operations defined on a set, give new structure to the set. A group is one such structure.

A group is a set $A$ with an operation $o$, expressed as $(A, o)$, such that the operation satifies following conditions -

1. **Associativity** A binary operation is called associative, if $a o (b o c) = (a o b) o c$ for every elements $a, b, c$ in $A$.
2. **Existence of Identity** There exist an element $e$ in $A$ such that for every element $a\in A$, $e o a = a$, i.e., combining any element with $e$ results in the same element.
3. **Existence of Inverse** For every element $a\in A$, there exists another element, say $a'$ such that $a' o a = e$, i.e, combining the two results in indentity element.

The inverse of an element $a$ is often denoted by $a^{-1}$. There are certain consequence, that result directly out of the above three assumptions. Consider the identity in the group $(A, o)$: we said for identity, $e o a = a$, and why not $a o e = a$? 

The two expressions are in general different, and can potentially, mean existence of two types of identity elements, say `left identity` and `right identity`. However one can prove based on the purely logic, and the knowledge that $(A, o)$ is a group, that the left and right identities, are the same element.

The same question can be posed for the existence of the inverse. The left and the right inverses of an element (can be proven) are the same.

The inverse of the inverse of the element $a$, is the element itself, i.e., $(a^{-1})^{-1} = a$

#### Subgroups
Just like sets have subsets, groups have subgroups. A subgroup of a group $(G, o)$ is a subset $S\subset G$, that forms group under the binary operation $o$ of the group constrained within $S$. So in order for a subset to be a subgroup, following must be satisfied
- The binary operation $o$ defined on the set $G$, is also a binary operation on the subset $S$.
- The identity of $o$, say $e$ belongs to $S$, and for every $a$ in $S$, $a^{-1}$ also belongs to $S$


**Examples:**

```{admonition} The set of integers with arithmatic addition $(\mathbb{Z}, +)$ forms a group.
:class: information
The arithmatic operation `+` is a binary operation, as adding any two integers results in another, unique integer. Since the order of adding two integers, does not matter, the operation is obviously commutative.

Next, we know that addition of three numbers is associative (otherwise grocery shopping to stock markets, everything would have been a mess! 😀).

Zero is clearly the identity element in the set of integers.

For every number, it's negative is the additive inverse.
```

- What about the set of rational numbers, real numbers and complex numbers. Do any of these form a group with arithmatic addition `+`, or multiplication `*` ? Following table gives a summary of answers, try to figure out why.

| Set A      | (A, `+`)|(A, `.`)|($A^*$, `.`)|
|--          |--       |--      |--          |
|$\mathbb{Z}$|Group    |No      |No          |
|$\mathbb{Q}$|Group    |No      |Yes         |
|$\mathbb{R}$|Group    |No      |Yes         |
|$\mathbb{C}$|Group    |No      |Yes         |

Here $A^* = A - {0}$, is the set with additive identity element removed from $A$.

The above defines what a group is, and based on the above example it may look like that a group is just a formal abstract version of what we already know about numbers from our school algebra/arithmatic knowlege. However this abstraction leads to generalization of the arithmatic operation to sets of other objects. See the following examples -

```{admonition} Permutation Group
:class: information
A permutation is an arrangement of elements of a set. As we know, a set does not have a notion order of elements. But if the order of the elements mattered, each permutation, seen as ordered sequence of elements, will look different, as in figure below.

```{figure} https://upload.wikimedia.org/wikipedia/commons/4/4c/Permutations_RGB.svg
:align: center
:name: rgb

Each row represents an arrangement of the three balls of colour red, green and blue. There are 6 such arrangements.
```

To abstractify, instead of ball of three colours, consider a set of 3 objects, and without loss of generality we can call them $a, b, c$. Now consider a set of each permutations of the three elements.
The table below shows all possible arrangements of the three objects $a, b, c$ symbolically represented as $p_0, p_1, p_2...$.

||$p_0$|$p_1$|$p_2$|$p_3$|$p_4$|$p_5$|
|---     |--- |--- |--- |--- |--- |--|
|Sequence|(abc)|(acb)|(bac)|(bca)|(cab)|(cba)|
|Mapping |(123)|(132)|(213)|(231)|(312)|(321)|

If we choose a reference arrangement to be $(a,b,c)$, then, $p_0$ is a map that maps (abc) to it itself, $p_1$ maps (abc) to (acb), and so on.
Basically, $p_0, p_1, ...$ are bijective maps which map (abc) to different arrangements. Below is a table that show how resulting maps of combining two maps.

They can be computed as following -

$$
\begin{align}
p_1 p_1(abc) &= p_1(acb) = (abc) = p_0(abc) \implies p_1p_1 = p_0\\
p_1 p_2(abc) &= p_1(bac) = (bac) = p_3(abc) \implies p_1p_2 = p_3\\
p_1 p_3(abc) &= p_1(bac) = (bac) = p_2(abc) \implies p_1p_3 = p_2\\
\dots &= \dots
\end{align}
$$

Below is the operation table for composition $o$. Row and column numbers correspond to first and second operand respectively (row $o$ column).

|$o$  |$p_0$|$p_1$|$p_2$|$p_3$|$p_4$|$p_5$|
|--   |--   |--   |--   |--   |--   |--   |
|$p_0$|$\mathbf{p_0}$|$p_1$|$p_2$|$p_3$|$p_4$|$p_5$|
|$p_1$|$p_1$|$\mathbf{p_0}$|$p_3$|$p_2$|$p_5$|$p_4$|
|$p_2$|$p_2$|$p_4$|$\mathbf{p_0}$|$p_5$|$p_1$|$p_3$|
|$p_3$|$p_3$|$p_5$|$p_1$|$p_4$|$\mathbf{p_0}$|$p_2$|
|$p_4$|$p_4$|$p_2$|$p_5$|$\mathbf{p_0}$|$p_3$|$p_1$|
|$p_5$|$p_5$|$p_3$|$p_4$|$p_1$|$p_2$|$\mathbf{p_0}$|


If we consider the set $P=\{p_0\, p_1, ..., p_5\}$, then the above composition $o$ is a binary operation, and $(P, o)$ forms a group. Here $p_0$, is the identity, as combining it with any other map gives the same map. Each element has an inverse, $p_0, p_1, p_2, p_5$ are inverses of their own, and $p_3$ and $p_4$ are inverses of each other.

This is called permutation group. We showed the example of three objects, but the group generalises to any number of objects. For $n$ object, the set of bijective maps has $n!$ elements.

```{admonition} Group of modular arithmatic
:class: information

Modular arithmatic is a system of arithmatic, where numbers wrap around after reaching a certain value. A common example is arithmatic of `12-hour clock`. In general, consider a positive integer $m > 1$. Now any arbitrary integer $a\in \mathbb{Z}$, we can write $a = qm + r$ where $q, r$ are some integers. There is unique pair $q, r$ such that $q$ is largest, and $0\le r\lt m$, in which case we know $q$ and $r$ as quotient and remainder when $a$ is divided by $m$. Since in this unique representation $r$ can have only $m$ possible values in set $Z_m = \{0, 1, 2, \dots, m-1\}$.

On this set, we define modular addition $\oplus$, to distinguish with usual addition `+` as follows:

For any two arbitrary $a, b$ in $Z_m$, $a \oplus b = c$ where $a + b = qm + c$, i.e, $c$ is obtained by computing the remainder when $a+b$ is divided by $m$.

Then $(Z_m, \oplus)$ forms a group, because of following -
- $\oplus$ is a binary operation, moreover, it is also commutative.
- 0 is the identity, for any $a\oplus 0 = a$.
- For any $a$ in $Z_m$, $0\le a\lt m$, there exists $m-a$, such that $a\oplus (m-a) = 0$, so $m-a$ is the inverse of $a$.

```

**Illustration:** Consider $(Z_{8}, \oplus)$, where $Z_8 = \{0, 1, 2, 3, 4, 5, 6, 7\}$, then under modular arithmatic, $2\oplus 3 = 5$, but $4\oplus 4 = 0$ and $4\oplus 7 = 3$



### Field
In mathematics, a field is defined as a set $F$ with two binary operations, say `+` and `.` such that following conditions are satisfied -
1. The binary operations `+` and `.` are commutative, i.e., $a + b = b + a$, and $a\cdot b = b\cdot a$ for every $a, b\in F$.
2. $(F, +)$ is a group. Let's call `0` it's identity for `+`.
3. $(F^*, \cdot)$ is also a group, where $F^* = F - \{0\}$ is set with identity of `+` removed from it. Let's call the identity for this as `1`.
4. The operation `.` distributes over `+`, i.e., $a\cdot (b + c) = (a\cdot b) + (a\cdot c)$ for every $a, b, c \in F$.



**Examples:**

- The set of rational ($\mathbb{Q}$), real ($\mathbb{R}$), and complex numbers ($\mathbb{C}$), all from respective fields with usual arithmatic addition `+` and multiplication `.`. $(\mathbb{Q}, +, \cdot)$, $(\mathbb{R}, +, \cdot)$, $(\mathbb{C}, +, \cdot)$ are all fields, with 0 as additive identity, and 1 as multiplicative identity.

- There are examples of fields of finite set, but their discussion takes us (more than usual) different direction than we intend this lecture notes to. For most of the discussion, even the group aspect might be generally needed, the field of number relevant for us will be that of $(\mathbb{R}, +, \cdot)$ and $(\mathbb{C}, +, \cdot)$.

- Recall the modular arithmatic, where $(Z_m, \oplus)$ formed a group for any arbitrary positive integer $m$. Now consider a modular version of the usual arithmatic multiplication, $\odot$, defined as follows. If $a, b$ are two arbitrary integers in $Z_m$, then $a\odot b = c$ where $c$ is the remainder you get when you divide $ab$ with $m$. Does the $(Z_m, \oplus, \odot)$
    - Clearly, $\odot: Z_m\times Z_m \longrightarrow Z_m$ is a binary operation.
    - 1 is the multiplicative identity, as $1 \odot a = a$ for every $a$ in $Z_m$.
    - However, unless $m$ is prime, we have issues with the structure of identity and inverse.
    - Does every element has an inverse? Imagine $a, b$ in $Z_m$ are inverses of each other, then $a\odot b = 1$, which means $ab$ is of the form $ab = qm + 1$, which means $b= {qm + 1\over a}$

```{admonition} Polynomials
:class: tip

We need the structure of a field, i.e., set with atleast two binary operations to construct expressions that we call polynomials.
```

## Vector Space
All the above mathematical definitions, going through which can be perhaps excruciating, let us define what we need for the underlying math of quantum computing: A vector space, and a Hilbert space. We will see, that these two are nearly same structures, with one difference.

A vector space is a mathematical structure, that consists of two sets, which have the following substructures:
- The first set, say **V**, whose elements are called vectors, is a commutative group $(\mathbf{V}, +_v)$ with `addition` $+_v$. Let's call $0_v$ the zero vector as the identity of this group.

- The second set, say F, whose elements are called scalars, is a Field $(F, +_f, \cdot_f)$ with `addition` $+_f$ and `multiplication` $\cdot_f$. Let's call the $0$ and $1$ additive and multiplicative identity of the field.
- A binary operation $\cdot : F\times V \longrightarrow V$ called scalar multiplication. This operation combines a scalar and a vector, and gives us a vector. It lets manipulate vectors through scalars, and satisfies following -

1. **Associativity**:
For any arbitrary $a, b$ in F, and any arbitrary $\mathbf{v}$ in **V**,
    
$$a \cdot (b\cdot\mathbf{v}) = (a\cdot_f b)\mathbf{v}$$

This means multiplying a vector successively by two scalars gives the same vector, as when multiplying the field multiplication of those two scalars to the vector.

2. **Distribution**:
The scalar multiplication distributes over addition of vectors, and addition of scalars. That is, for any arbitrary scalars $a, b$ in F and any arbitrary vectors $\mathbf{u, v}$ in **V**, the following holds

$$
\begin{align*}
a\cdot(\mathbf{u} +_v \mathbf{v}) &= (a\cdot\mathbf{u}) +_v (a\cdot\mathbf{v})\\
(a +_f b)\cdot \mathbf{v} &= (a\cdot\mathbf{v}) +_v (b\cdot\mathbf{v})
\end{align*}
$$

- Multiplying any scalar with zero vector gives zero vector, $a\cdot 0_v = 0_v$, and multiplying zero scalar 0, with any vector gives zero vector, $0\cdot v = 0_v$.

Because of associativity, and distribution of scalars with vectors, we often use the same symbol for addition (`+` for $+_v$ and $+_f$) and scalar multiplications ($\cdot$ for $\cdot_f$).

Let us take a moment to appreciate what makes the structure of vector space rich.
We have a set **V** of vectors elements, and set **F** of scalar elements. If one of the sets is infinite, the vector space automatically becomes infinite. (Guess Why?)


**Examples:**

Consider the set of points on 3D space, they are represented by the cartesian product of the set of real numbers

$$
\mathbb{R}^3 = \mathbb{R}\times \mathbb{R}\times \mathbb{R} = {(x, y, z): x, y, z\in \mathbb{R}}
$$

If we define vector addition of two arbitrary points $\mathbf{r_1}=(x_1, y_1, z_1)$, and $\mathbf{r_2}=(x_2, y_2, z_2)$ as 

$$
\mathbf{r_1} + \mathbf{r_2} = (x_1 + x_2, y_1 + y_2, z_1 + z_2)
$$

then $\mathbb{R}^3$ forms a vector space over the field of real numbers $(\mathbb{R}, +, \cdot)$.

Consider a toy example of 'constructing a vector space'. Let there be a set of just two non-zero vectors $\mathbf{V} = \{0, \mathbf{a_{\uparrow}}, \mathbf{a_{\downarrow}}\}$, where 0 is zero vector with respect to some addition operator '+' which we define below. To define addition as binary operation, we have the following by definition of zero, or identity.

$$
\mathbf{a_{\uparrow}} + 0 = 0 + \mathbf{a_{\uparrow}} = \mathbf{a_{\uparrow}}\\
\mathbf{a_{\downarrow}} + 0 = 0 + \mathbf{a_{\downarrow}} = \mathbf{a_{\downarrow}}
$$

But what about $\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}$ ? It's value can neither be $\mathbf{a_{\uparrow}}$, nor $\mathbf{a_{\downarrow}}$ as in either case, the other element becomes the identity, or 0.

$$
\text{If}\quad\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}} = \mathbf{a_{\uparrow}} \implies \mathbf{a_{\downarrow}} = 0\quad\text{but we assumed it to be non-zero.}
$$

Thus the only option **within the set** is $\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}} = 0$, which makes the two vectors inverse of each other. Now, what do we assign to $\mathbf{a_{\uparrow}} + \mathbf{a_{\uparrow}}$, and $\mathbf{a_{\downarrow}} + \mathbf{a_{\downarrow}}$? We can't have $\mathbf{a_{\uparrow}} + \mathbf{a_{\uparrow}} = 0$ as this will make $\mathbf{a_{\uparrow}} = 0$, and same argument holds for $\mathbf{a_{\downarrow}}$. So the only option plaussible is $\mathbf{a_{\uparrow}} + \mathbf{a_{\uparrow}} = \mathbf{a_{\downarrow}}$, and $\mathbf{a_{\downarrow}} + \mathbf{a_{\downarrow}} = \mathbf{a_{\uparrow}}$.

This gives the structure of this three element group, where combining any non-zero element with itself gives the other element, and both non-zero elements are inverses of each other.

Other option, which gives us more to play with in context of vector space is, to assume that $\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}$ should exist as separate vector in **V**.
Moreover, if $\mathbf{a_{\uparrow}}$ and $\mathbf{a_{\downarrow}}$ aren't inverses of each other like above, they should have separate inverses. This means that the set **V** should be extended to atleast

$$
\mathbf{V} \to \{0, \mathbf{a_{\uparrow}}, -\mathbf{a_{\uparrow}}, \mathbf{a_{\downarrow}}, -\mathbf{a_{\downarrow}}, \mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}, -(\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}})\}
$$

With introduction of more elements, we have to again make sure that the binary operation is well defined, i.e., addition of any two element results an element in the set. Consider now the $\mathbf{a_{\uparrow}} + (\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}})$, just like previous exercise, its value can not be either of $\mathbf{a_{\uparrow}}, \mathbf{a_{\downarrow}}$ or $\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}$, otherwise either of these will result in a contradiction.

So, $\mathbf{a_{\uparrow}} + (\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}})$, and it's inverse must now exist as seperate vector. We can simplify the expression $\mathbf{a_{\uparrow}} + (\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}})$ = $(\mathbf{a_{\uparrow}} + \mathbf{a_{\uparrow}}) + \mathbf{a_{\downarrow}}$ = $2\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}$, where $2\mathbf{a_{\uparrow}}$ symbolically means $\mathbf{a_{\uparrow}} + \mathbf{a_{\uparrow}}$. We can easily see that 

- This process of extending is actually endless
- If we keep doing this over and over again, the new elements added are expressed as some 'combination' of the originally assumed two non-zero vectors.
- We have deceptively used the notion of actual numbers to express new vectors.
- The fully extended set looks like

$$
\mathbf{V} \to \{
    0, \mathbf{a_{\uparrow}}, -\mathbf{a_{\uparrow}}, \mathbf{a_{\downarrow}}, -\mathbf{a_{\downarrow}}, \mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}, -(\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}),
    2\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}},-(2\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}),\\
    \mathbf{a_{\uparrow}} + 2\mathbf{a_{\downarrow}},-(\mathbf{a_{\uparrow}} + 2\mathbf{a_{\downarrow}}),
    3\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}},-(3\mathbf{a_{\uparrow}} + \mathbf{a_{\downarrow}}),
    \mathbf{a_{\uparrow}} + 3\mathbf{a_{\downarrow}},-(\mathbf{a_{\uparrow}} + 3\mathbf{a_{\downarrow}}),\\
    2\mathbf{a_{\uparrow}} + 3\mathbf{a_{\downarrow}},-(2\mathbf{a_{\uparrow}} + 3\mathbf{a_{\downarrow}}),
    3\mathbf{a_{\uparrow}} +2\mathbf{a_{\downarrow}},-(3\mathbf{a_{\uparrow}} + 2\mathbf{a_{\downarrow}}),
    \dots
\}
$$

In a more compact form (albeit terse looking) the set looks like $\mathbf{V} = \{n_1\mathbf{a_{\uparrow}} + n_2\mathbf{a_{\downarrow}}: \text{where}\quad n_1, n_2 \in \mathbb{Z}\}$, i.e., every element in the set is of the form $n_1\mathbf{a_{\uparrow}} + n_2\mathbf{a_{\downarrow}}$ for some integers $n_1, n_2$.

So we had to issentially grow the initial set to contain infinitely many element to make sure the binary operation was within the set, which makes $(\mathbf{V}, +)$ a group. While extending the set, we used integers to express derived vectors as combinations of $\mathbf{a_{\uparrow}}, \mathbf{a_{\downarrow}}$. This is basically trying to use the integers as scalar field. We know that the set of integers does not form a field, so we have to also generalise the numbers from integers to atleast rational number, or for comfort real or complex numbers.

### Linear combination
We saw from the above example, how a finite set object can be extended to an infinite set with a vector space by using combinations of those finite elements.
These combinations are called linear combination of vectors. More formally, consider an arbitrarily chosen set of $n$ vectors $v_1, v_2, v_3, \dots, v_n$ in **V**, and scalars $a_1, a_2, a_3, \dots, a_n$, then the following is called a linear combination of the vectors

$$
v = \sum_{i=1}^n a_i v_i = a_1 v_1 + a_2 v_2 + \dots a_n v_n
$$

Let's try to make some interpretations on this linear combination. Given a vector $\mathbf{v}$ and a non-zero scalars $a, b$, $\mathbf{v}$ and $a\mathbf{v}$, $b\mathbf{v}$, and $(a+b)\mathbf{v}$ are all different vectors.

#### Linear independence

### Inner Product
#### Overlap of vectors
#### Orthogonality

### Linear Operators
- Commutativity
- Special operators: Unitary, Hermitian, ...
- Probability conservation

#### States as Vector (Bra and Ket)

[youtube](https://youtube.com/clip/Ugkxh9W3xafNSWAP-VU9LCrRXkx9kgUH0mY8?si=MVsRsDUeJld5fV9_)


### Representation theory


[^1]: See the [Wikipedia article on set](https://en.wikipedia.org/wiki/Set_(mathematics)) for more details.