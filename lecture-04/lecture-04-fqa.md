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
2. <span class="hl-blue">Entanglement:</span> Qubits can be <span class="hl-red">correlated</span> in ways that have no classical equivalent. Measuring the state of one qubit instantely tells us somehting about another.
3. <span class="hl-blue">Interference:</span> A quantum algorithm can be designed so that the "wrong" answers <span class="hl-red">interfere</span> destructively and the right answers interfere constructively.