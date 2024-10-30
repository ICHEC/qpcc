---
title: Heterogeneous Quantum Computing on AWS with Amazon Braket
---

(lecture-9)=
# Lecture 9: Heterogeneous Quantum Computing on AWS with Amazon Braket

```{admonition} Overview
:class: tip

This is a placeholder for the Guest Lecture. It will be populated in due time with necessary prerequisits, and supplementary content on Heterogeneous Quantum Computing.
```

## About the guest

```{admonition} The Speaker: Dr. Sebastian Stern

Dr. Sebastian Stern is a Senior Specialist Solutions Architect for Quantum Computing at [Amazon Web Services](https://aws.amazon.com/) (AWS). In his role, he works with AWS customers to explore and build quantum computing solutions in the cloud, with a focus on [Amazon Braket](https://aws.amazon.com/braket), the quantum computing service of AWS. Sebastian studied Physics at the Technical University of Munich (TUM) and earned his PhD at the Max Planck Institute for Physics in Munich, Germany. He spent several years in academic research in the field of High Energy Physics and researched in the Higgs boson working group at the LHC at CERN. Later, he has been working in several tech industry roles, accelerating enterprises and public sector organizations in their adoption of emerging technologies. Sebastian joined AWS in 2019 and is affiliated with the wordwide Advanced Compute specialists team.

LinkedIn profile: [www.linkedin.com/in/sebastianstern](http://www.linkedin.com/in/sebastianstern)

```

```{admonition} Lecture Summary

Join this guest lecture for a practical, demo-based overview of heterogeneous quantum computing capabilities on AWS. We will start with a technical introduction to Amazon Braket, the quantum computing cloud service of AWS, followed by a live demo of how to build a run quantum circuits on cloud-based simulators and real quantum processing units (QPUs). We then focus on hybrid quantum-classical computation and variational algorithms and explore in a demo how to run an entire quantum algorithm in the managed cloud environment provided by Amazon Braket. In the second part of the lecture we review an application for quantum computing. We explore together how we can solve a paradigmatic graph optimization problem with different quantum computing paradigms, implemented on QPUs available on Amazon Braket. Specifically, we will explore how to solve the Maximum Independent Set problem with the Quantum Approximate Optimization Algorithm (QAOA) on gate-based quantum computers and, alternatively, with Analog Hamiltonian Simulation on a Rydberg atom quantum computer.

```


```{admonition} References

Students who are interested to immerse themselves in the topics we will cover during the lecture can review the following resources:

- The [Amazon Braket public website](https://aws.amazon.com/braket/) is a good starting point to get a high-level overview of the service and its capabilities. The [developer guide](https://docs.aws.amazon.com/braket/latest/developerguide/what-is-braket.html) provides more detailed information how to work with Braket.

- In the first demo, we explore how we can build a quantum circuit preparing a [GHZ state](https://en.wikipedia.org/wiki/Greenberger%E2%80%93Horne%E2%80%93Zeilinger_state) with the open-source [Amazon Braket Python SDK](https://github.com/amazon-braket/amazon-braket-sdk-python) and how we can run the circuit on simulators and QPUs available on Amazon Braket. We will also learn how we can run circuits built with third-party software like [Qiskit](https://github.com/qiskit-community/qiskit-braket-provider) and [PennyLane](https://github.com/amazon-braket/amazon-braket-pennylane-plugin-python) directly on Braket.

- After we have familiarized with Braket, we will run through two examples solutions for the [Maximum Independent Set](https://www.quera.com/glossary/maximum-independent-set) graph optimization problem.

- The first example will use the [Quantum Approximate Optimization Algorithm](https://arxiv.org/abs/1411.4028), implemented with [PennyLane](https://pennylane.ai/qml/), an open-source library for differentiable programming of quantum computers, and executed with [Amazon Braket Hybrid Jobs](https://pennylane.ai/qml/demos/getting_started_with_hybrid_jobs/)

- The second example solution is realized with Analog Hamiltonian Simulation using Rydberg atom arrays (https://aws.amazon.com/blogs/quantum-computing/optimization-with-rydberg-atom-based-quantum-processor/, https://arxiv.org/abs/2202.09372).

```