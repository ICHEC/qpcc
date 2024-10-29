---
title: Landscape of Quantum SDK's and Tools
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

(lecture-8b)=
# Lecture 8b: Landscape of Quantum SDK's and Tools

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture 
```

```{admonition} Learning Outcome
:class: tip
In this lecture, we discuss the Software and Tools for Quantum Programming. We will begin by mapping out the components of the quantum stack that we wish to investigate. In particular we will discuss the high level and low level quantum computing software components in the quantum computing software layer. This is followed by a discussion on how we can build a quantum programming stack by bringing components from the software and hardware layers as needed.​ Through the lecture, we will - 

- Develop insight into the key components of the Quantum computing Software layer.
- and gain awareness of the different ways of using the Quantum Programming Stacks.​
```

```{image} ../prep/images/quant.png
:align: center
```

## Introduction
Software Development Kit (SDK) is a very common acronym used to collectively represent softwares one requires to write program that either are in specific language, or suited for specific domain of tasks, such as web development, system programming, or app development for a given operating system. Our domain of interest is Quantum programming, where we wish to write programs that implement quantum algorithms.

Just like the SDKs (which you know now :-D) we will run through some of the *software* terminologies along with the introduction and discussion of the programming tools for running quantum algorithms.


## Softwares and Tools for Quantum Programming

Some of the most common terms in softwares and programming in general are the following
- [Programming Language](https://en.wikipedia.org/wiki/Programming_language) is a system of notation for writing computer program, and is usually described in terms of its syntax (grammer) and semantics (meaning). Unlike human languages, here you need to be precise, as computers don't take kindly on incorrect codes :-D .
- [High and low level](https://en.wikipedia.org/wiki/High-_and_low-level) is often used to categorise or classify programming languages and libraries, and is based on scale of systemic operation. High-level describes more abstract, macro level, and generic usage, while low-level describes more specific, individualistic component of a systemic operation focusing on details of rudimentary micro function. In programming language, high-level languages focus on architectural capabilities to enable wide range of usage, while low-level languages focus on doing specific tasks efficiently.
- [Software library](https://en.wikipedia.org/wiki/Library_(computing)) is a collection of computer programs packaged in specific format to be used by user to aid writing their own programs. Some libraries are generic enough to be used in wide usecases, such as **libstdc++** (which provide numerous functions to aid writing a c++ code) and other are specific to special usage, such as **LAPACK** (Linear Algebra package for a range of matrix and vector operations). They are also classified as high and low level.
- [Software layer](https://en.wikipedia.org/wiki/Abstraction_layer) is a terms that originates from different layer of abstraction in writing a program that does a particular task for me.
- [Software Stack](https://en.wikipedia.org/wiki/Solution_stack) is basically a set of software subsystems or components needed to create a complete platform to build and run a certain type of program. For example, to write a simple python code and execute it, you need (i) a python interpreter, (ii) a convenient text editor to write python code, (iii) a file manager to save and organize file, and (iv) a terminal to sometime configure, install or manage python interpreter. So the collection of these four will be required to develop python software. Such collection is often referred to as **full-stack**.

Then we'll introduce the notion of the quantum programming stack, which overlaps the lower two layers of the Quantum Stack. This encapsulates the idea that these two layers are tightly connected and in order to build a functioning quantum programming stack, one must carefully select the compatible components from the two constituting layers. Alternatively a number of big vendors provide pre-integrated quantum programming stacks as a service, deployed in a cloud environment, some components of which could also be used locally. Another approach are the so called Quantum Orchestrators which are very similar to the QPSaaS, but they are generally provided by smaller, independent quantum software companies. The Quantum Orchestrators are generally bespoke and more flexible and could be deployed either on-prem or in the cloud. ​

```{mermaid}
:align: center

 graph LR;
    linkStyle default fill-opacity:0.0,stroke-width:0px,stroke-opacity:0.0
    subgraph qp [Quantum Programming Stack]
    subgraph soft [Quantum Software]
    1(High level) --- 2(Low level)
    end
    subgraph hard [Quantum Hardware]
    3(Circuit Based) --- 4(Anolog)   
    end
end

```


## High-Level Quantum Software



### Quantum programming languages
Here we try to establsh what a quantum programming language is, which also gives us insight into quantum computing softwares. Well, what is a quantum programming language? To answer this question we will first recall a classical programming language, which is a type of human-computer interface used to create programs to run on classical computers. It uses typographical notations to express the desired classical computational operations:

- Some building blocks of computational operations are Logical gates: **OR**, **AND** etc.

Once you create a program using a classical language, then it can be *compiled* into instructions the classical hardware can understand and execute.

In contrast, A quantum programming language is a type of human-computer interface used to create programs to run on quantum computers or quantum software simulators. It uses typographical notations to express the desired quantum computational operations:

- Some building blocks of quantum computational operations are quantum gates: **Hadamard**, **CNOT**, Rotation gates $\mathbf{R_x, R_y, R_z}$ etc.

Once you create a quantum program, similar to classical programs, it can be compiled into instructions that your choice of hardware can understand and execute. Most notably with quantum hardware, we can make use of the advantage it's quantum nature provides.  And so, quantum programming languages are designed with the ease of use of quantum properties, such as entanglement and superposition.
Keep in mind, our quantum programs can also be executed on classical hardware as a simulation, although this is limited in scale it is still useful for testing and prototyping programs.   



### Generic quantum languages & libraries

There are different types of quantum programming languages (QPL). The most vastly used QPL today are the generic Quantum language libraries. Some quantum programming environments are separate programming languages (for example **Q#** and **Silq**) while other are extensions (in the form of additional libraries) to existing programming languages. Currently a lot of quantum programming libraries are based on Python (like Qiskit and Pennylane), but other languages are also supported, like Yao.jl for Julia and Intel Quantum SDK for C++.

These languages and libraries are not built with a specific application in mind, rather their purpose is to be able to provide generic quantum programming primitives to accommodate the implementation of quantum algorithms from different domains.

In the example code snippet written in Qiskit on the first line we define a quantum circuit with 2 qubits, then apply a Hadamard gate on the first qubit (0-indexed, as is custom in Python), then apply a CNOT gate between the first and second qubit. At the end we draw the resulting quantum circuit. This high-level programming abstraction allows us to define any number of qubits and apply any number of gates in predefined order without worrying about the underlying quantum hardware software emulator implementation.

One point to reiterate is that the gate-based quantum computing paradigm is universal, hence the quantum programming languages and libraries based on it are also universal. In contrast the annealer-based QPL sacrifice universality for specialization in domains in which annealing provides computational advantage.

```{code-cell}
import qiskit
# Qiskit
qc = qiskit.QuantumCircuit(2) # this constructs a quantum circuit object named qc.
# quantum circuit object has methods, that can add different gates to the circuit.

qc.h(0) # Applies the Hadamard gate to the first qubit.

qc.cx(0, 1) # Applies the CNOT gate between the first two qubits.

qc.h(1) # applies the Hadamard gate to the second qubit

qc.draw(output='mpl', scale=1.5) # Print the drawing of the circuit.
```

QL are similar in some regards to classical hardware description
languages, for example Verilog, as far as they describe the desired
computation in terms of a succession of basic operations on
computational units. For example on the right hand side we
have a classical adding circuit, and we can see how it can be
represented as a series of logical gates applied to some inputs.
In quantum computing we have a similar flow where qubits are
inputted to a circuit where quantum gates are applied.

We should also mention some similarities and dissimilarities
between classical circuit and quantum circuits:
One example is photonics based quantum circuits where photons
(playing the role of qubits) are physically passing through
a course composed of photonic actuators (playing the role of gates).
This setup is very similar to a classical circuit, where electrical
current (bit) is passing through electrical components (gates).
On the other had we have the in-situ quantum computation where
gates (for example pulses) are applied to stationary
physical entities, representing qubits. Another example is
superconducting quantum circuits.

The problem of measurement in Quantum Circuits:
One important difference between our classical and quantum circuits
is in the nature of our output. In the classical circuit, we can
simply take a voltage reading of our circuit to obtain a binary
result on each wire. In the quantum scenario we must perform a
measurement on our qubit, which collapses the qubit into a binary
state, this necessarily destroys our quantum state and we cannot
get any additional information beyond the binary result.

```{figure} ./qc-cc.png
:align: center
```

### Specialised quantum languages & libraries


Aside from the generic quantum languages and libraries,
we also have specialised languages and libraries. These
are designed and optimised for specific application domains,
like Quantum chemistry, QNLP, QML and others. For example the
Tequila library is geared towards solving problems in the
quantum chemistry domain. Another example is the Lambeq library
which aims to represent sentence grammatical structures in the
form of a quantum circuit as depicted below. The sentence
"John walks in the park" is deconstructed using diagrammatic
methods and then represented in a quantum circuit.
We can then use this circuit in natural language processing
applications like classification or sentiment analysis.

```{figure} ./lambeq-example.png
:align: center
```

Below are some examples of specialised libraries.

|Library            |Specialised usage                  |
|---                |---                                |
|Lambeq             |Quantum natural language processing|
|Tequila            |Quantum chemistry                  |
|OpenFermion        |Quantum chemistry                  |
|Tensorflow Quantum |Quantum machine learning           |
|Ocean              |Annealing                          |


## Low-Level Quantum Software

Let's touch upon the low-level quantum software. In particular,
we take a look at the low-level intermediate representation languages
that serve as an interface between many high-level quantum
software languages and the target quantum computing hardware
platforms. In other words, in a similar way to classical
programming the high-level languages are translated to an
intermediate language which is then used to apply the
instructions to quantum hardware.

Below we show a comparison between a high level language and an 'intermediate' operation.
One of the more common intermediate languages is `OpenQASM`
as you see on the right hand side. In this example we create a
Bell state. The corresponding high-level code written in Qiskit
can be seen on the left. Some consider these intermediate
representations the equivalent to assembly in the classical
programming world. They provide similar functionality, for
example different high-level Quantum Languages could be
converted to the same intermediate representation which provides a mechanism to
target different quantum systems with the same high level code.

https://devblogs.microsoft.com/qsharp/introducing-quantum-intermediate-representation-qir/

``````{grid} 2 2 2 2

````{card} Qiskit

```python
from qiskit import (
    QuantumRegister,
    ClassicalRegister,
    QuantumCircuit)
reg_q = QuantumRegister(2, 'q')
reg_c = ClassicalRegister(2, 'c')
circ = QuantumCircuit(reg_q, reg_c)

circ.h(reg_q[0])
circ.cx(reg_q[0], reg_q[1])
circ.measure(reg_q[0], reg_c[0])
circ.measure(reg_q[1], reg_c[1])
```

````

````{card} OpenQASM

```openqasm
OPENQASM 2.0;
include "qelib1.inc";

qreg q[2];
creg c[2];

h q[0];
cx [0], q[1];
measure q[0] -> c[0];
measure q[1] -> c[1];


```

````
``````



## Quantum Programming Stacks as a Service

A lot of quantum programming stacks could be installed and configured locally, but this could be a laborious process. As discussed in the previous module, a lot of companies provide readily available quantum programming stacks online or on-prem. This also provides an environment in which users can access and run programs on real quantum hardware, which isn't available on a local level. As reminder some example include, IBM's quantum lab and google's quantum AI. Generally, the only requirement to use these environments is to set up a free account on these vendor's websites. Signing up for a free account however, generally comes with a drawback in the size of the quantum hardware you have access to. If you want to use the most powerful quantum hardware, you may need to contact your respective vendor to use it for research purposes and also possibly pay a fee.

The layers in these quantum programming stacks could be developed entirely internally (as is he case of the IBM Quantum Stack) or they could be an integration of quantum layers from different providers – for example Amazon Braket. Another point is that, at present, there is a big overlap between the Quantum programming stacks supported by the different commercial vendors. Quantum programming is still in it's early days, there are a lot of new components developed all the time. Hence the vendors would never manage to integrate all components that might be of interest for a particular project or application of QC. 

These out-of-the-box quantum programming stacks come with some pros and cons. For instance, all of the components are tested to work together which allows the user the concentrate solely on application development. One drawback of these pre-integrated stacks is that they are limited to the components supported by the vendor. Another drawback, as is the case across the board, the quantum hardware is only remotely accessible. In contrast, you can run classical simulations locally and remotely.


``````{grid} 2 2 2 2

````{card} IBM Quantum Lab

```{drawio-image} ./ibm-q.drawio
:export-scale: 70
```

````

````{card} Amazon Braket

```{drawio-image} ./braket.drawio
:export-scale: 70
```

````
``````
Pros:
- All components (even the ones coming from different providers) are tested to work together.
- Allows the customers to concentrate on testing and creating solutions using Quantum Software.

Cons:
- Limited to the Quantum SDKs and/or Quantum Hardware that is supported by the vendor.
- Classical simulations could be run on-prem, but there is no local access to Quantum Hardware.

## Quantum Workflows & Orchestrators


Quantum Orchestrators bear a lot of similarities to commercial QPSaaS. QO allow the creation of bespoke Quantum programming stacks could be deployed locally or remotely (in public or private cloud). The key difference between quantum orchestrators and other quantum programming stacks is that quantum orchestrators allow for the management and optimisation of both classical and quantum programs on classical and quantum hardware as well as data management and access. This is ideal for problems that require classical programs to work in tandem with quantum programs. This gives the user more control in the design of their application or research. Nowadays the distinction of QO and QPSasS becomes more and more blurred. Examples of quantum orchestrators include -

- Qrquestra
- Strangeworks


```{figure} ./qp-orchestrator.png
:align: center
```

## Custom Quantum Software Stacks

As discussed already above, there are specialised quantum languages and libraries for specific applications. 

There are also projects implementing specialised components of the quantum programming stack, which are not necessarily targeted directly at specific applications. One example is Qulacs, which is a the standalone high performance quantum circuit simulator (written in C++), which can be integrated with a large number of high-level QLLs.

This opens the door to building specialised quantum stacks made up of one or more of these libraries and/or some generic quantum libraries and languages. Building specialised quantum stacks is analogous to the building of a rocket with components manufactured and supplied by different vendors.

Custom quantum software stacks are useful when we want to accomplish a specific task that cannot be performed efficiently or at all by a generic quantum stack.  They consist of components, provided by different vendors, that may be specialized for certain tasks. It's not quite rocket science but the integration is challenging because it requires a careful selection of compatible components. 

Below we show a custom quantum programming stack, built by ICHEC for a quantum chemistry project.

### Custom Quantum software stack example: QPFAS

Quantum computing simulation of PFAS molecule (QPFAS) - Study of bond breaking.

```{figure} ./pfas-mol.png
:align: center
```

An example is the custom quantum software stack, built for the Quantum PFAS project, which was a joint project between ICHEC and an industry partner.  QPFAS aims to study the nature of bond-breaking in different molecules with the end-goal of understanding how to break down so-called PFAS molecules.
We used these components because at the time project was being defined (2019/2020) there was no
integrated quantum software stack that could be used for quantum chemistry. Also integration with HPC software (Dask) required wrapping a lot of existing components in custom code.

### QPFAS components and diagram

Lets take a look at the specific quantum software components used. First we have the quantum chemistry library Tequila, which was used to define the molecules in our problem. In the first iteration of the project, Tequila was interfacing with Qulacs directly to run quantum chemistry simulations on HPC hardware. At a later stage the quantum chemistry simulations were ran on actual quantum hardware, which required extending the existing code with support for Qiskit. Qiskit was used to convert Tequila code to the OpenQASM intermediate representation, which was the format supported by the trapped ion hardware vendor. This vendor provided classical simulation as well as access to quantum hardware on which the program was run.

```{figure} ./qpfas.png
:align: center
```

