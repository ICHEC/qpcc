---
title: Quantum Programming Certification Course
layout: post
---

(lecture-5)=
# Hardware & Physics of Quantum Computers


```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture. 
```

```{admonition} Learning outcomes
:class: tip

In this lecture we will try to understand the requirements for a useful quantum computer, learn the similarities and differences between several quantum computing modalities, both Gate-based and analogue, to understand the effect of noise on these computers, and to discuss the advantages and limitations of quantum computing hardware and software simulators.
```


- Understand the requirements for a useful quantum computer

- Learn similarities and differences between several quantum computing modalities, both gate-based and analog

- Understand the effect of noise on quantum computers

- Discuss the advantages and limitations of quantum computing hardware and software simulators

---

## Introduction

Building a Quantum Computer, requires significant planning and strategy in terms of choosing the scientific pathway, well before other elements of industry are brought in, such as finance, availability of resource etc.

We will just touch upon the common modalities that have yielded success, and the challenges they come with. We start by DiVincenso's Criteria to define what qualifies as a quantum computer, and then go on to explore some of the technologies and how they are implemented.

We also address the errors that are introduced due to noise in quantum system, and elaborate on how they affect the outcome of quantum computing, along with available methods to address them.




---

## DiVincenzo's Criteria

David P. DiVincenzo was a prominant American theoretical physicist and one of the foundational figure in quantum information research. In 1999/2000 he laid out the physical requirements a platform must satisfy to be a viable quantum computer.

1. **A scalable physical system with well-characterized qubits** — the Hilbert space must have two well-defined, distinguishable states per qubit

2. **Ability to initialize the qubits to a simple state**, e.g. $\ket{00\ldots0}$

3. **Long decoherence times**, qubit lifetime much longer than the gate operation time

4. **A "universal" set of quantum gates** — enough single- and two-qubit gates to approximate any unitary

5. **A qubit-specific measurement capability** — read out individual qubits without destroying the rest of the computation


```{admonition} Definition
:class: tip

**Decoherence** is the process by which a quantum system loses its quantum properties due to interaction with the environment.

**Decoherence time** is how long a qubit can maintain its quantum state before decoherence occurs.

```


---

### Key Features of Quantum Physics


We have discussed this in previous lectures, but its neverthless a good idea to recall: Quantum computers are built from physical systems which are so small that they are governed by the rules of quantum mechanics -

- **Superposition** — a qubit can occupy $\alpha\ket{0} + \beta\ket{1}$, not just $\ket{0}$ or $\ket{1}$

- **Entanglement** — correlations between qubits with no classical analog, the resource behind quantum speedups

- **Interference** — amplitudes combine constructively/destructively; algorithms are designed to interfere towards the correct answer

- **Measurement & collapse** — observing a qubit projects it onto an eigenstate, irreversibly destroying superposition

- **No-cloning theorem** — an unknown quantum state cannot be copied exactly, which shapes how error correction and communication protocols must work


Together, these features are simultaneously the *source* of quantum advantage and the *source* of the engineering difficulty in building hardware.


## Quantum Computing Hardware


### Gate-based vs Analog Quantum Computing

### Gate-based

- Computation is built from a sequence of discrete quantum gates

- Gates implement unitary operations such as $X$, $H$, or $CNOT$

- The quantum circuit specifies which operations to apply and in what order

- General-purpose: can implement arbitrary quantum algorithms

### Analog

- Computation is performed by continuous evolution of the quantum system in time

- The problem is encoded within the dynamics of the system, and the solution is read out after evolution

- Physical parameters control the interactions and energy landscape

- Particularly suited to quantum simulation and optimisation


```{admonition} Key Idea
:class: info

Gate-based computing programs a quantum system by specifying gates; analog computing programs it by specifying a time-evolution.
```


## Gate-based quantum computing

- Different physical systems can be used to build **gate-based quantum computers**.
- The qubit technology determines how we **control, couple and read out** the qubits.


| **Modality**          | **Qubit**                                | **Example companies**                  |
| --------------------- | ---------------------------------------- | -------------------------------------- |
| **Superconducting** ⭐ | Microwave circuits / Josephson junctions | IBM, Google, Rigetti, IQM, Alice & Bob |
| **Trapped ions** ⭐    | Internal states of trapped ions          | IonQ, Quantinuum, AQT                  |
| **Photonic** ⭐        | Properties of single photons             | PsiQuantum, Xanadu, Quandela           |
| **Silicon spin**      | Electron spins in silicon quantum dots   | Equal1, Quobly, Intel, Diraq       |
| **Neutral atoms**     | Atomic ground / Rydberg states           | QuEra, Pasqal, Atom Computing          |
| **Topological**       | Topologically protected states           | Microsoft                              |


The modalities marked with ⭐  are the ones we explore in more detail below.

## Performance Metrics

Following are the key metrics one uses to compare different gate-based quantum computers:

- **Scalability** : Ability to increase the number of qubits

- **Operating temperature** : At what temperature do we require to maintain the qubits?

- **Coherence Times** : How long do the qubits stay in a given state?

- **Fidelity** : A measure of “closeness” of the actual qubit state in comparison to the ideal state.

- **Gate Operation times** : How long does it take to act a particular gate on a given qubit.

- **Quantum Volume** : A composite metric that aims to combine all the metrics above into one.


---

## Superconducting Qubits

- Electrical circuit containing a **Josephson junction** cooled to very low temperatures resulting in **superconductivity**.
- Ground state and first excited state of circuit energy levels form a qubit.
- Most common variant: **transmon**, insensitive to charge noise.


```{image} ./images/Supercond.png
:width: 700
:align: center
```


:::{tip}
**Superconductivity:** certain materials exhibit *zero electrical resistance* and expel magnetic fields when *cooled* below a critical temperature.

**Josephson junction:** consists of two *superconductors* separated by a thin insulating *barrier*, allowing electrons to pass through via quantum *tunneling*.
:::

```{image} ./images/joseph_junct.png
:width: 100%
:align: center
```


- Control and readout via **microwave pulses** delivered through waveguides / resonators.

- Require <span style="color:#e05252">extremely low temperatures (~10–20 mK)</span> to keep thermal excitations below the qubit energy gap.

- Two-qubit gates via tunable couplers between neighbouring qubits.

- Connectivity is typically <span style="color:#e05252">nearest-neighbour</span>.

- Gate times are <span style="color:#4caf50">fast (tens of ns)</span>, but coherence times are <span style="color:#e0a800">comparatively short (~100 μs)</span>.

- <span style="color:#4caf50">Most widely used quantum computing platform today.</span>

- Companies: **IBM, Google, Rigetti, IQM, Alice & Bob**.

:::{figure} ./images/IBM_tokyo.jpg
:width: 280

IBM Quantum System One, as installed at Shin-Kawaski for the University of Tokyo. Photo: IBM Research, CC BY-ND 2.0
:::


---

### Pros and cons of superconducting qubits


#### ✅ Advantages

- **Fast gates**: tens of nanoseconds, so many operations fit within the coherence time.

- **Mature fabrication**: built with lithographic techniques borrowed from the semiconductor industry, so chips can be mass-produced and designed flexibly.

- **Tunable couplers** and allow engineering of qubit interactions.

- Most **developed ecosystem**: largest industry investment, cloud access, and the most advanced qubit counts among gate-based platforms.

- Compatible with **microwave control electronics**, and readout is fast.


#### ❌ Challenges

- **Extreme cryogenics**: dilution refrigerators at ~10–20 mK, which are expensive and limit how much hardware fits inside.

- **Short coherence times** (~100 μs) compared with ions.

- **Nearest-neighbour connectivity** means extra SWAP gates for distant qubits, adding depth and errors.

- **Crosstalk and fabrication variability**: qubit frequencies differ between devices, and material defects add noise.

- **Wiring bottleneck**: every qubit needs control lines running from room temperature down to the chip.


:::{info}
**Current state:** the most widely deployed platform today, with fast gates and a mature supply chain, but scaling to fault tolerance is limited by coherence, cryogenic infrastructure, and wiring.
:::

---

## Trapped Ions

- Qubits encoded in internal electronic states of ions in a **Paul trap** (oscillating electromagnetic fields).
- Ions are laser-cooled to their motional ground state and arranged in a chain or 2D array.
- Single-qubit gates: laser/microwave pulses applied to individual ions.
- Two-qubit gates: mediated through the ions' shared collective motion.
- <span style="color:#4caf50">**All-to-all connectivity**</span> within a trap: any ion can be entangled with any other.
- <span style="color:#4caf50">Very long coherence times (seconds) and high gate fidelities.</span>
- <span style="color:#e05252">Slower gates than superconducting qubits (μs range)</span>, and <span style="color:#e05252">scaling requires interconnects between traps</span>.
- Companies: **IonQ, Quantinuum, Alpine Quantum Technologies**.


```{image} ./images/TrapIons.png
:width: 100%
```

### Pros and cons of trapped ions


#### ✅ Advantages

- **Very long coherence times**: seconds or longer, far beyond superconducting qubits.
- **Highest gate fidelities** demonstrated of any platform.
- **All-to-all connectivity** within a trap, so no SWAP overhead.
- **Identical qubits**: every ion of a given species is the same, so there is no fabrication variability.
- **High-fidelity readout** of measurement outcomes.


#### ❌ Challenges


- **Slow gates**: microseconds to milliseconds, so deep circuits take a long time to run.
- **Scaling**: long ion chains need ion **shuttling** between zones or **photonic links** between traps.
- **Complex laser systems**: precise, stable optical control of individual ions is demanding.
- **Ultra-high vacuum** and trap engineering add hardware complexity.
- Lower **clock speed** limits throughput for algorithms needing many repeated runs.


:::{info}
**Current state:** leading in fidelity and connectivity, with modular architectures based on shuttling and photonic interconnects as the route to scale.
:::


---

## Photonics

:::{admonition} What is a photon?
:class: info

Einstein proposed in 1905 that light is composed of discrete packets of energy which we now call **photons**. Each photon carries energy $E=hf$, where $h$ is Planck's constant and $f$ is the frequency (colour) of the light.

:::


- Qubits encoded in properties of **single photons**.
- Manipulated using **linear optical elements**: beam splitters, phase shifters, waveguides.
- **Universal** computation is possible with linear optics, single-photon sources, and measurement-based feedforward.
- **Photonic integrated circuits** fit all optical components on a chip, enabling scaling.
- Companies: **PsiQuantum, Xanadu, Quandela**.


```{figure} ./images/photonics.png
:width: 100%

https://www.quandela.com/resources/blog/what-is-a-quantum-computer/
```


---

## Encoding qubits with photons

| | Polarization | Dual rail | Time-bin |
|---|---|---|---|
| $\;\;\;\;\;\;\;\;\;\lvert0\rangle$ | <img src="./figures/L05/polarization-0-crop.gif" width="110" /> | <img src="./figures/L05/DualRail0.png" width="150" /> | <img src="./figures/L05/timebin_0.png" width="250" /> |
| $\;\;\;\;\;\;\;\;\;\lvert1\rangle$ | <img src="./figures/L05/polarization-1-crop.gif" width="150" /> | <img src="./figures/L05/DualRail1.png" width="150" /> | <img src="./figures/L05/timebin_1.png" width="250" /> |



## Pros and cons of photonics


### ✅ Advantages


- **Room temperature** operation — refrigerators only needed for single-photon sources and detectors.
- **Low decoherence**: photons barely interact with the environment, preserving coherence over long distances.
- Naturally suited to **networking and communication** — photons are the native carrier for quantum links between nodes.
- Existing **telecom infrastructure** (fibre, integrated photonics) can be leveraged.
- High potential **clock speeds**, since photons travel at the speed of light.


### ❌ Challenges


- **Deterministic single-photon sources** are hard to engineer — most sources are probabilistic.
- **Photon loss** accumulates with circuit depth and distance, limiting scalability.
- Two-photon gates are inherently **probabilistic** (no direct photon-photon interaction)
- **Detector inefficiency** further compounds loss: photon-number-resolving detectors are difficult to build and operate.
- Requires many auxiliary photons and fast feed-forward electronics to reach fault tolerance.


:::{info}

**Current state:** photonic platforms are leading candidates for quantum *networking* and *distributed* quantum computing, while scaling to large, fault-tolerant processors remains an open engineering challenge.

:::

---

## Comparison


| | **Superconducting** | **Trapped Ion** | **Photonic** |
|---|---|---|---|
| **Qubit** | Josephson junction | Ion internal states | Photon |
| **Connectivity** | <span style="color:#e05252">Nearest-neighbour</span> | <span style="color:#4caf50">All-to-all</span> | <span style="color:#4caf50">Reconfigurable via optics</span> |
| **Gate speed** | <span style="color:#4caf50">~10–100 ns (fast)</span> | <span style="color:#e05252">~1–100 μs (slower)</span> | <span style="color:#e0a800">Very fast, but probabilistic</span> |
| **Coherence time** | <span style="color:#e0a800">~100 μs</span> | <span style="color:#4caf50">Seconds (very long)</span> | <span style="color:#4caf50"> ~1ms (long) </span> |
| **Temperature** | <span style="color:#e05252">~10–20 mK</span> | <span style="color:#4caf50">Room temp (ions laser-cooled)</span> | <span style="color:#4caf50">Room temp</span> |
| <span style="color:#4caf50">**Main advantage**</span> | Fast gates, mature ecosystem | All-to-all connectivity | Low decoherence |
| <span style="color:#e05252">**Main challenge**</span> | Decoherence, crosstalk | Scaling / shuttling, slower gates | Deterministic sources, photon loss |
| **Companies** | IBM, Google, Rigetti, IQM, Alice&Bob | IonQ, Quantinuum, AQT | PsiQuantum, Xanadu, Quandela |


<!--- 
NB for trapped ion cooling:

Two different things are being cooled

- The apparatus (vacuum chamber, electrodes, surrounding hardware) sits at room temperature — no dilution refrigerator required, unlike superconducting qubits.

- The ions themselves are cooled, but not thermally via a fridge — they're cooled with lasers down to near their motional ground state, often µK-level.

No single modality currently wins on all criteria. 

-->

---

## Analog Quantum Computing


### What is a Hamiltonian?


- The Hamiltonian $H$ is the operator associated with the total energy of a system.
- It determines how the system evolves in time, through the Schrödinger equation:

$$
i\hbar \frac{d}{dt}\lvert\psi(t)\rangle
= H\lvert\psi(t)\rangle
$$

- $\hbar$ is the reduced Planck's constant
- $\frac{d}{dt}$ denotes the time derivative — how the quantum state changes with time.
- The eigenstates of $H$ have energies $E_n$:

$$
H\lvert E_n\rangle = E_n\lvert E_n\rangle
$$

:::{admonition} Ground state - definition
:class: success

The eigenstate with the lowest energy.

:::


<img src="./images/Bohr-Model-H.png" width="150">
  https://unifyphysics.com/bohr-model-of-hydrogen-atom/
</img>


<img src="./images/Energy-levels.png" width="150">
</img>


---

## Time-evolution


- $\lvert\psi(t)\rangle$ is the **state of the system at time $t$**, given the starting state $\lvert\psi(0)\rangle$.
- For a time-independent $H$, the Schrödinger equation is solved by:

$$
\lvert\psi(t)\rangle = e^{-iHt/\hbar}\lvert\psi(0)\rangle = U(t)\lvert\psi(0)\rangle
$$

- The evolution operator $U(t)$ is **unitary**: $U^\dagger U = I$
  - Total probability stays equal to 1 (the state stays normalised)
  - Evolution is **reversible**: $U^{-1} = U^\dagger$
  - Quantum gates are unitaries too, so analog evolution under $H$ is one long, continuous "gate"


:::{admonition} Eigenstates are stationary
:class: success

- If the system starts in an eigenstate $\lvert E_n\rangle$ of $H$:
$$
\lvert\psi(t)\rangle = e^{-iHt/\hbar}\lvert E_n\rangle
$$

- Remember $H\lvert E_n\rangle = E_n\lvert E_n\rangle$, so

$$
\lvert\psi(t)\rangle =e^{-iE_n t/\hbar}\lvert E_n\rangle
$$

- The state only picks up a phase; measurement probabilities never change.
- Hence eigenstates are known as **stationary states** of the Hamiltonian

:::


---

## Hamiltonian Example

- For a qubit, a simple Hamiltonian might combine an energy splitting with a driving term, e.g.

$$
H = \frac{\Delta}{2}Z + \frac{\Omega}{2}X
$$

where $Z$ and $X$ are the Pauli operators:

$$
Z =
\begin{pmatrix}
1 & 0\\
0 & -1
\end{pmatrix},
\qquad
X =
\begin{pmatrix}
0 & 1\\
1 & 0
\end{pmatrix}.
$$

- Here, $\Delta$ sets the energy splitting and $\Omega$ controls the strength of the drive.

- In gate-based quantum computing, carefully engineered interactions are used to implement short, discrete unitary gates.

- In analog quantum computing, the Hamiltonian itself is the program: physical parameters such as detuning $\Delta$ and coupling $\Omega$ are controlled continuously, and the system evolves under the resulting Hamiltonian to perform the computation.


---

## Analog Quantum Computing


| Type of analog computing | Physical implementation | Applications | Companies
|---|---|---|---|
| **Neutral-atom computing** | Rydberg platforms | Quantum simulation — e.g. Bose–Hubbard and Ising models | Pasqal, QuEra
| **Quantum annealing** | Superconducting qubits | Combinatorial optimisation — e.g. Max-Cut, travelling salesman | D-Wave



- **Neutral-atom platforms**: 
  - Atoms arranged in array, evolved under a Hamiltonian which encodes the problem

- **Quantum annealers**:
  - Evolve system slowly from an easy initial Hamiltonian to a problem Hamiltonian
  - Aiming to remain in the ground state (this encodes the solution)

:::{admonition} Analog vs gate-based trade-off
:class: warning

- Analog systems can reach very large qubit counts and natively simulate certain physics
- But offer less fine-grained general-purpose control and less researched error-correction schemes

:::


---

### Rydberg Platforms


- Rydberg atoms are neutral atoms which possess a ground state and a highly-excited Rydberg state, which can be used to encode a qubit.
- These atoms can be arranged in an array and controlled using lasers

<img src="./figures/L05/RydbSim.jpg" width="500" style="vertical-align:middle">


- Useful for problems which map to the Rydberg Hamiltonian, which may be time-dependent:

$$
\begin{align*}
\hat H(t) = \frac{\hbar\Omega(t)}{2}\sum_j\hat\sigma_j^x - \hbar\delta(t)\sum_j\hat\sigma_j^z \\
+\sum_{i\neq j} J_{ij}\hat\sigma_i^z\hat\sigma_j^z,
\end{align*}
$$


- Simulating the dynamics of a many-body system on a classical computer
  generally becomes **exponentially costly** with system size.

- Rydberg platforms can **directly realise the Hamiltonian dynamics**
  in a physical quantum system.


---

## Quantum Annealers


- Not universal quantum computers
- Particularly suited for solving combinatorial optimization problems:
  - **Graph problems:** Max-Cut, graph colouring
  - **Finance:** portfolio optimisation
  - **Machine learning, scientific computing, scheduling, routing**

<img src="./images/Qannealing.jpg" width=400>
  https://medium.com/%40deltorobarba/the-many-worlds-of-quantum-inspired-cd608cb9a7d2
</img>


**Example: D-Wave Advantage**
- 5000+ qubits, but is not fault-tolerant and cannot run arbitrary quantum algorithms.
- Designed to solve problems that can be mapped to a specific type of Hamiltonian (Ising model or QUBO).
- Finds low-energy configurations of the Hamiltonian, which correspond to optimal or near-optimal solutions to the original problem.

<img src="./images/d-wave-adv2-chip.jpg" width=200>
Photo credit: D-Wave Quantum Inc. 
</img>


---

## Noise

### Errors in quantum circuits

|State prep error |Gate error           |Crosstalk                 |Readout error |
|---------------- |-------------------- |------------------------- |------------- |
|initial state ↓  |over/under-rotation ↓|gates disturb neighbours ↓|↓ measurement |

<quantum-circuit qubits="4" gates="H:0, X:1, CNOT:2:1, H:2, X:3, Z:2, H:2, M:0, M:1, M:2, M:3" scale="3"></quantum-circuit>

Decoherence accumulates over the full circuit duration →

---

## Errors in quantum circuits

- **State preparation errors** — the initial state is not perfectly prepared
- **Gate errors** — imperfect physical implementation (control pulses/laser timing) leads to over/under-rotation, systematic or random
- **Crosstalk** — operations on one qubit unintentionally affect neighbouring qubits
- **Decoherence** — unwanted interaction with the environment degrades quantum information
  - $T_1$ (relaxation time): timescale for energy loss, $\ket{1}\to\ket{0}$
  - $T_2$ (dephasing time): timescale for loss of phase coherence between $\ket{0}$ and $\ket{1}$
- **Readout errors** — measurement outcomes are misassigned (e.g. a $\ket{1}$ read as $\ket{0}$)


:::{admonition} Note
:class: note

These error sources are why today's devices are called **NISQ** (Noisy Intermediate-Scale Quantum) machines, and why quantum error correction / error mitigation is central to reaching fault-tolerant quantum computing.

:::


---

## Types of Quantum Errors


### 1. Bit-flip error (X error)

- $\ket{0} \leftrightarrow \ket{1}\;$ :

$$
X\ket{\psi} = X(\alpha\ket{0}+\beta\ket{1}) = \alpha\ket{1}+\beta\ket{0}
$$

- Analogous to a classical bit flip; caused e.g. by unwanted energy exchange with the environment.


### 2. Phase-flip error (Z error)

- Relative phase between $\ket{0}$ and $\ket{1}$ is flipped:

$$Z\ket{\psi} = Z(\alpha\ket{0}+\beta\ket{1}) = \alpha\ket{0}-\beta\ket{1}$$

- Has no classical analog; the dominant error from **dephasing**.


### 3. Bit-phase-flip error (Y error)

- Combination of both $X$ and $Z$ errors

$$
\begin{align*}
Y\ket{\psi} &= Y(\alpha\ket{0}+\beta\ket{1}) \\
&= i(\alpha\ket{1}-\beta\ket{0})
\end{align*}
$$

:::{tip}

- Any single-qubit error can be written as a combination of $X$, $Y$, $Z$ — the Pauli operators
- Therefore correcting bit- and phase-flips is sufficient to correct *arbitrary* small errors

:::


---

## Tackling Noise


- **Cooling / isolation** 
  - Thermal fluctuations adversely impact the performance of quantum computers
  - At lower temperatures, we can keep the thermal energy lower than the energy gap between qubit states, reducing unwanted excitations.

- **How cold?**
  - Very! In some cases colder than deep space (~2K or -271$^\circ$C). For example:
    - Superconducting qubits: ~10–20mK (~ -273$^\circ$C) using dilution refrigerator
    - Trapped ions: overall apparatus room temperature, but ions laser-cooled to near motional ground state (~μK)

- **Techniques**
  - Helium dilution refrigeration
  - Laser cooling


:::{figure} ./images/cooling.png
:align: center
:width: 75%

source: https://web.physics.ucsb.edu/~martinisgroup/theses/Bialczak2011.pdf
:::

---

## Classical 3-Bit Repetition Code

Bit-Flip Error Protection

- **3-bit repetition code**: Encode a single bit as three copies ($0 \to 000$, $1 \to 111$)
- **Decoding**: Take a majority vote of the three bits to recover the original bit
- **Capability**: Detects and corrects a single bit-flip error (fails if $\ge 2$ bits flip)


Suppose a single bit-flip error occurs during transmission:


| **Scenario** | **Input Bit** | **Encoded** | **Received** | **Decoded / Output** | **Result** |
|---|---|---|---|---|---|
| **Without Encoding** | $0$ | $0$ | $1$ | $1$ | ❌ Uncorrected |
| **Without Encoding** | $1$ | $1$ | $0$ | $0$ | ❌ Uncorrected |
| **3-Bit Repetition** | $0$ | $000$ | $100$ | $0$ *(Majority Vote)* | ✅ Corrected |
| **3-Bit Repetition** | $1$ | $111$ | $101$ | $1$ *(Majority Vote)* | ✅ Corrected |



:::{admonition} Quantum error-correcting codes face two extra challenges
:class: important

- **No-cloning theorem** prevents simple state duplication
- **Noise complexity**: Quantum noise includes both bit-flips ($X$) and phase-flips ($Z$)

:::

---

## Quantum error correction


- Encode logical qubits into multiple physical qubits, detect and correct errors without measuring the quantum information directly
- **Bit-flip code**: 
  - Encode $\ket{0}_L=\ket{000}$, $\ket{1}_L=\ket{111}$
  - Detect a single $X$ error
- **Phase-flip code**:
  - Encode in the $\ket{+},\ket{-}$ basis 
  - $\ket{0}_L=\ket{+++}$, $\ket{1}_L=\ket{---}$
  - Detect a $Z$ error the same way, after a basis change
- **Shor code**: concatenates the two (9 physical qubits per logical qubit) to correct an *arbitrary* single-qubit error ($X$, $Y$, or $Z$)
- Modern devices mostly use the **surface code**, which extends 
bit-flip/phase-flip protection to a 2D lattice


:::{admonition} Error mitigation
:class: warning

We can also use post-processing techniques to reduce the effect of noise on final measurements

:::

---

## Quantum Computing Hardware vs Simulators

### Executing Programs on Quantum Hardware

#### Advantages


- Runs on <span class="text-blue-500 font-semibold">real quantum hardware</span>, not an approximation.
- Validates algorithms under actual <span class="text-blue-500 font-semibold">noise and constraints</span>.
- Only way to reach <span class="text-blue-500 font-semibold">quantum advantage</span> at scale.
- Accesses qubit counts beyond what simulators can handle.


#### Disadvantages


- Subject to <span class="text-red-500 font-semibold">noise and decoherence</span>.
- Limited <span class="text-red-500 font-semibold">connectivity</span> and coherence times.
- <span class="text-red-500 font-semibold">Queue times</span> and limited hardware access.
- Results often need <span class="text-red-500 font-semibold">error mitigation</span>.


---

## QC Hardware vs Software Simulators


| | Quantum Computing Hardware | Quantum Computing Software Simulators |
|---|---|---|
| **Comparison to reality** | <span class="text-green-500 font-semibold">Actual qubits</span> | <span class="text-red-500 font-semibold">Software objects mimicking qubits</span> |
| | <span class="text-green-500 font-semibold">Quantum entanglement and superposition</span> | <span class="text-red-500 font-semibold">Simulated quantum behavior</span> |
| | | <span class="text-red-500 font-semibold">Classical backends, heavy on resources</span> |
| **Noise** | <span class="text-red-500 font-semibold">Inherently exists, need to employ error mitigation/correction</span> | <span class="text-green-500 font-semibold">Controllable</span> |
| | | <span class="text-green-500 font-semibold">Helps understand & improve real QC</span> |
| **Cost** | <span class="text-red-500 font-semibold">Very expensive</span> | <span class="text-green-500 font-semibold">Mostly free & open source</span> |
| | <span class="text-red-500 font-semibold">Require heavy maintenance</span> | <span class="text-green-500 font-semibold">Easily setup on laptop/desktops/servers</span> |
| **Access and Control** | <span class="text-red-500 font-semibold">Very limited public access</span> | <span class="text-green-500 font-semibold">Widely accessible, easy to install</span> |
| | <span class="text-red-500 font-semibold">You can't really debug on QC</span> | <span class="text-green-500 font-semibold">Debug, analyze, develop easily</span> |
| | <span class="text-red-500 font-semibold">Little control on runtime</span> | |
| **Scalability** | <span class="text-red-500 font-semibold">Limited qubits</span> | <span class="text-red-500 font-semibold">Due to classical backends, actual computation cost grows exponentially</span> |
| | <span class="text-green-500 font-semibold">Future research will open new possibilities</span> | |


---

## Summary

- There are two broad categories of quantum computers:
```{mermaid}
flowchart LR
    A["Quantum Computing Hardware"]

    A --> B["Gate-based"]
    A --> C["Analog"]

    B --> B1["Discrete<br/>quantum gates"]
    C --> C1["Continuous<br/>tunable dynamics"]
```


- Different physical modalities have different strengths and weaknesses, and no single modality dominates across all performance metrics.
- Noise is a major challenge for current quantum computers, causing errors in state preparation, gate operations, and readout.
- Quantum software simulators replicate the behavior of quantum computers on classical hardware, but are limited in scale and do not capture all real-world noise effects.

