---
title: Mathematical framework for Quantum Computing
layout: post
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


### Superposition principle

Superposition, issentially means applying multiple effect/stimuli/attributes on a system/object.

In general, the superposition principle applies to anywhere more than one attributes can be imposed on a single object.
Formally speaking, the principle states that in all linear systems, the net response caused by two or more stimuli on a system is sum of the individual responses that would have been caused by each individual stimulus.

> The sum of responses of individual effects, is same as the response of the sum of individual effecs.

Once we go through the mathematical structure in the coming sections, it will become clear that the superposition principle issentially is a consequence of **linearity** in the system, or linear behaviour.


In quantum mechanics, 
### Role of interference

### Principles of measurement
### No-cloning
### Entanglement
### Tunnelling 

## Mathematica Structure

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

### Vector Space, Hilbert Space

#### Scalar vs Vector

#### States as Vector (Bra and Ket)

### Linear combination
- Linear independence
### Inner Product
- Overlap of vectors
- Orthogonality
### Linear Operators
- Commutativity
- Special operators: Unitary, Hermitian, ...
- Probability conservation
### Representation theory


