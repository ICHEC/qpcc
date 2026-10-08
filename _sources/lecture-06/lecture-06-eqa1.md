---
title: Early Quantum Algorithms I
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

(lecture-6)=
# Lecture 6: Early Quantum Algorithms I

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture.
```

## Focus of Lecture

After this lecture you should be able to:

- Get an overview on the <span class="hl-green">landscape of quantum algorithms</span> that will be studied during the rest of the course.
- Understand the <span class="hl-red">Fourier transform</span> and what it is used for.
- Understand the <span class="hl-red">quantum Fourier transform</span>, how to make its circuit, and how it differs from the classical Fourier transform.
- Introduce <span class="hl-blue">quantum phase estimation</span> and its circuit.
- Study the <span class="hl-blue">complexity and performance</span> of quantum phase estimation.

## Landscape of Quantum Algorithms

```{figure} ./images/algorithm_landscape.png
:align: center

Landscape of quantum algorithms.
```

## Fourier Analysis

- Invented by <span class="hl-blue">Joseph Fourier</span> in the early 19th century, while studying <span class="hl-blue">heat transfer</span>.

```{figure} ./images/joseph_fourier.png
:align: center
:width: 200px

Joseph Fourier.
```

```{admonition} Fourier Analysis
:class: information
Studies how <span class="hl-red">complex functions</span> can be approximated by sums of <span class="hl-red">sines</span> and <span class="hl-red">cosines</span>.
```

```{figure} ./images/sincos.png
:align: center

Sine and cosine plots.
```

Wide variety of <span class="hl-green">applications</span>:

- Signal processing.
- Electronics.
- Machine learning.
- Time series analysis.
- Even <span class="hl-green">quantum mechanics</span> itself!

## Fourier Transform: Definition



- <span class="hl-red">Fourier Transform (FT)</span>: Converts a function into a representation of its frequency components:


$$\hat{f}(\omega) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}f(t)e^{-i\omega t}dt$$

- <span class="hl-red">Inverse Fourier Transform (IFT)</span>: Reconstructs a function from its frequency domain back to the original time domain:

$${f}(t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}\hat{f}(\omega)e^{i\omega t}d\omega$$

## Fourier Transform: Frequency Composition

```{figure} ./images/fourier.gif
:align: center

Fourier transform animation (source: commons.wikipedia.org).
```

- The <span class="hl-red">function</span> can be expressed by a sum of <span class="hl-green">trigonometric functions</span>.

```{admonition} Note
:class: information
The <span class="hl-blue">Fourier Transform</span> gives us the <span class="hl-blue">frequencies</span> of the functions composing the signal.
```

- Remember the <span class="hl-green">Euler formula</span>:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

## Fourier Transform: Square Function

```{figure} ./images/fourier_spread.png
:align: center

Fourier transform of different square functions.
```

- Functions that are <span class="hl-green">narrow</span> in time are <span class="hl-green">spread</span> in frequency and vice versa.

- Fourier transforms follow an <span class="hl-blue">uncertainty principle</span> similar to Heisenberg's one in quantum mechanics. A signal can't be <span class="hl-red">both</span> localised in <span class="hl-red">time</span> and <span class="hl-red">frequency</span>:

$$\Delta t \cdot \Delta \omega \geq \frac{1}{2}$$

## Quantum Fourier Transform: Definition

- <span class="hl-red">Discrete Fourier Transform (DFT)</span>: Discrete analogue of FT. Transforms a <span class="hl-green">vector</span> of $N$ complex numbers $(x_0,x_1,\dots,x_{N-1})\in\mathbb{C}$ to a vector $(y_0,y_1,\dots,y_{N-1})\in\mathbb{C}$:

$$y_j = \sum_{k=0}^{N-1}x_k e^{-i2\pi jk/N},\quad j=0,1,\dots,N-1$$

- <span class="hl-red">Quantum Fourier Transform (QFT)</span>: Converts a <span class="hl-green">basis state</span> $\ket{j}$ to a superposition of all basis states, weighted by a complex phase encoding <span class="hl-green">frequencies</span> information:

$$\text{QFT}\ket{j} = \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1}e^{i2\pi jk/N}\ket{k},\quad j=0,1,\dots,N-1$$

- <span class="hl-blue">QFT</span> is very similar to <span class="hl-blue">DFT</span>, but:

  1. A <span class="hl-green">normalisation term</span> $\frac{1}{\sqrt{N}}$ appears.
  2. The <span class="hl-green">sign</span> of the exponential is different (it is just a convention).

## QFT: Basis States

```{figure} ./images/qft_1.png
:align: center

QFT of state $\ket{0}$ (source: IBM Quantum Learning).
```

$$\text{QFT} \ket{0} = \frac{1}{2} \left( e^{i 2\pi \cdot \textcolor{red}{0} \cdot 0 / 4} \ket{0} + e^{i 2\pi \cdot \textcolor{red}{0} \cdot 1 / 4} \ket{1} + e^{i 2\pi \cdot \textcolor{red}{0} \cdot 2 / 4} \ket{2} + e^{i 2\pi \cdot \textcolor{red}{0} \cdot 3 / 4} \ket{3} \right)
= \frac{1}{2} \left( \ket{0} + \ket{1} + \ket{2} + \ket{3} \right)$$

- $\textcolor{red}{\text{QFT}\ket{j=0}}$ state produces an <span class="hl-blue">uniform superposition</span> of all 4 basis states. All <span class="hl-red">phases</span> are 0.

```{figure} ./images/qft_2.png
:align: center

QFT of state $\ket{1}$ (source: IBM Quantum Learning).
```

$$\text{QFT} \ket{1} = \frac{1}{2} \left( e^{i 2\pi \cdot \textcolor{red}{1} \cdot 0 / 4} \ket{0} + e^{i 2\pi \cdot \textcolor{red}{1} \cdot 1 / 4} \ket{1} + e^{i 2\pi \cdot \textcolor{red}{1} \cdot 2 / 4} \ket{2} + e^{i 2\pi \cdot \textcolor{red}{1} \cdot 3 / 4} \ket{3} \right)
= \frac{1}{2} \left( \ket{0} + i\ket{1} - \ket{2} - i\ket{3} \right)$$

- $\textcolor{red}{\text{QFT}\ket{j}}$ will apply a <span class="hl-blue">phase increase</span> of $2\pi jk/N$ to each of the $\ket{k}=0,1,...,N$ superposed states obtained.

```{figure} ./images/qft_3.png
:align: center

QFT of state $\ket{2}$ (source: IBM Quantum Learning).
```

$$\text{QFT} \ket{2} = \frac{1}{2} \left( e^{i 2\pi \cdot \textcolor{red}{2} \cdot 0 / 4} \ket{0} + e^{i 2\pi \cdot \textcolor{red}{2} \cdot 1 / 4} \ket{1} + e^{i 2\pi \cdot \textcolor{red}{2} \cdot 2 / 4} \ket{2} + e^{i 2\pi \cdot \textcolor{red}{2} \cdot 3 / 4} \ket{3} \right)
= \frac{1}{2} \left( \ket{0} - \ket{1} + \ket{2} - \ket{3} \right)$$

- As we increase $\textcolor{red}{\ket{j}}$ the rate of phase change will increase.

```{figure} ./images/qft_4.png
:align: center

QFT of state $\ket{3}$ (source: IBM Quantum Learning).
```

$$\text{QFT} \ket{3} = \frac{1}{2} \left( e^{i 2\pi \cdot \textcolor{red}{3} \cdot 0 / 4} \ket{0} + e^{i 2\pi \cdot \textcolor{red}{3} \cdot 1 / 4} \ket{1} + e^{i 2\pi \cdot \textcolor{red}{3} \cdot 2 / 4} \ket{2} + e^{i 2\pi \cdot \textcolor{red}{3} \cdot 3 / 4} \ket{3} \right)
= \frac{1}{2} \left( \ket{0} - i\ket{1} - \ket{2} + i\ket{3} \right)$$

```{attention}
Like in FT, in all cases we see that a <span class="hl-blue">narrow signal</span> (the basis vector $\textcolor{red}{\ket{j}}$) is spread into a <span class="hl-blue">superposition of states</span>, with phases varying with $\textcolor{red}{j}$.
```

## QFT: General States and Inverse

- For a <span class="hl-blue">general state</span> $\ket{\psi}=\sum_{j=0}^{N-1}x_j\ket{j}$:

$$\text{QFT} \ket{\psi} = \sum_{j=0}^{N-1} x_j \colorbox{#86efac}{\(\displaystyle\frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{i 2\pi j k / N} \ket{k}\)}$$

The highlighted term is the <span class="hl-green">QFT applied to the basis vectors</span>.

- The QFT also has an <span class="hl-red">inverse</span> (IQFT):

$$\text{QFT}^\dagger \ket{\psi} = \sum_{j=0}^{N-1} x_j \left( \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{\colorbox{#bfdbfe}{$\displaystyle-$}i 2\pi j k / N} \ket{k}\right)$$

Only the <span class="hl-blue">sign</span> changes with respect to the QFT.

- $\textcolor{red}{\text{QFT}^\dagger\text{QFT}}\ket{\psi}=\ket{\psi}$. From the previous section: $\text{QFT}^\dagger\left (\frac{1}{2}\sum_{i=0}^{N-1}\ket{i}\right )=\ket{0}$

## QFT: Product representation I

- <span class="hl-red">Binary representation</span> of a <span class="hl-red">n-qubit basis</span>:

$$\ket{j} = \ket{j_{1}2^{n-1} + j_{2}2^{n-2} + \cdots + j_{n}2^{0}} \equiv \textcolor{red}{\ket{j_1j_2\cdots j_n}}$$

- <span class="hl-red">Binary fraction</span> notation:

$$0. j_{l}j_{l+1}\dots j_{m}=\frac{j_l}{2}+\frac{j_{l+1}}{4}+\cdots+\frac{j_m}{2^{m-l+1}}$$

$$\textcolor{blue}{\boldsymbol{\rightarrow}}\begin{array}{c}\textcolor{green}{j_1}=1 \\ \textcolor{blue}{j_2} =0 \\ \textcolor{green}{j_3} =1 \end{array}\rightarrow 0.j_1j_2j_3=\frac{\textcolor{green}{1}}{2}+\frac{\textcolor{blue}{0}}{4}+\frac{\textcolor{green}{1}}{8}$$

- <span class="hl-red">Hadamard</span> gate in <span class="hl-red">binary fraction</span> notation:

$$H\ket{j_1}=\frac{1}{\sqrt{2}}\left(\ket{0}+e^{i2\pi 0.j_1}\ket{1}\right)$$

$$\textcolor{blue}{\boldsymbol{\rightarrow}}\begin{array}{c} H\ket{0}=\frac{1}{\sqrt{2}}\left(\ket{0}+e^{i2\pi\cdot\textcolor{red}{0}/2}\ket{1}\right)=\frac{1}{\sqrt{2}}\left(\ket{0}+\ket{1}\right)\\H\ket{1}=\frac{1}{\sqrt{2}}\left(\ket{0}+e^{i2\pi\cdot\textcolor{red}{1}/2}\ket{1}\right)=\frac{1}{\sqrt{2}}\left(\ket{0}-\ket{1}\right)\end{array}$$

## QFT: Product representation II

- Using some algebra we get the <span class="hl-green">product representation</span> of QFT:

$$\begin{aligned}
\ket{j} &\rightarrow \frac{1}{2^{n/2}} \sum_{k=0}^{2^n - 1} e^{2\pi i jk / 2^n} \ket{k} \\
&= \frac{1}{2^{n/2}} \sum_{k_1 = 0}^{1} \cdots \sum_{k_n = 0}^{1}
e^{2\pi i j \sum_{l=1}^{n} k_l 2^{-l}} \ket{k_1 \dots k_n} \\
&= \frac{1}{2^{n/2}} \sum_{k_1 = 0}^{1} \cdots \sum_{k_n = 0}^{1} \bigotimes_{l=1}^{n} e^{2\pi i jk_l 2^{-l}}\ket{k_l} \\
&= \frac{1}{2^{n/2}} \bigotimes_{l=1}^{n}\left(\sum_{k_l=0}^{1} e^{2\pi i jk_l2^{-l}} \ket{k_l} \right) \\
&= \frac{1}{2^{n/2}} \bigotimes_{l=1}^{n} \left( \ket{0} + e^{2\pi i j 2^{-l}} \ket{1} \right) \\
&= \frac{1}{2^{n/2}}
\left( \ket{0} + e^{2\pi i \, 0.j_n} \ket{1} \right)
\left( \ket{0} + e^{2\pi i \, 0.j_{n-1} j_n} \ket{1} \right)
\cdots
\left( \ket{0} + e^{2\pi i \, 0.j_1 j_2 \cdots j_n} \ket{1} \right)
\end{aligned}$$

Expanding the notation:

$$\ket{j_1 j_2 \cdots j_n}\rightarrow\frac{1}{\sqrt{N}}
\left(\ket{0} + e^{i2\pi \frac{j_n}{2}}\ket{1}\right)
\left(\ket{0} + e^{i2\pi \left(\frac{j_{n-1}}{2}+\frac{j_n}{4}\right)}\ket{1}\right)
\cdots
\left(\ket{0} + e^{i2\pi \left(\frac{j_1}{2}+\frac{j_2}{4}+\cdots+\frac{j_n}{2^n}\right)}\ket{1}\right)$$

```{attention}
<span class="hl-green">Product representation</span> will help us understanding how the QFT <span class="hl-blue">circuit</span> is built!
```

## QFT: Circuit I

- <span class="hl-green">Parameterised</span> version of <span class="hl-green">phase rotation</span> gate:

$$ R_k = \left(\begin{array}{cc}1 & 0 \\ 0 & e^{i2\pi/2^{k}}\end{array}\right) \rightarrow R_k\ket{j_1} = e^{i2\pi j_1/2^{k}}\ket{j_1}$$

- <span class="hl-blue">Controlled phase rotation</span> ($CR_k$) gate:

$$CR_k\ket{j_1j_2} = \ket{j_1}e^{i2\pi j_1j_2/2^{k}}\ket{j_2}$$

```{figure} ./images/cr_gate.png
:align: center

Building block of the QFT circuit.
```

$$\ket{\psi_1}=\left(\ket{0} + e^{i2\pi0.j_1}\ket{1}\right)\ket{j_2}$$

$$\ket{\psi_2}=\left(\ket{0} + e^{i2\pi0.j_1j_2}\ket{1}\right)\ket{j_2}$$

## QFT: Circuit II

```{figure} ./images/qft_circuit.png
:align: center

3 qubit QFT circuit.
```

$$\ket{\psi_1} = \left(\textcolor{blue}{\ket{0}+e^{i2\pi0.j_1j_2j_3}\ket{1}}\right)\ket{j_2}\ket{j_3}$$

$$\ket{\psi_2} = \left({\ket{0}+e^{i2\pi0.j_1j_2j_3}\ket{1}}\right)\left(\textcolor{blue}{\ket{0}+e^{i2\pi0.j_2j_3}\ket{1}}\right)\ket{j_3}$$

$$\ket{\psi_3} = \left(\textcolor{blue}{\ket{0}+e^{i2\pi0.j_3}\ket{1}}\right)\left({\ket{0}+e^{i2\pi0.j_2j_3}\ket{1}}\right)\left({\ket{0}+e^{i2\pi0.j_1j_2j_3}\ket{1}}\right)$$

## IQFT: Circuit

```{figure} ./images/iqft_circuit.png
:align: center

3 qubit IQFT circuit.
```

- The order of <span class="hl-blue">gates</span> is inverted.

- The order of <span class="hl-blue">qubits</span> is inverted.

- We use the <span class="hl-blue">adjoints</span> of the operators.

- <span class="hl-green">Hadamard</span> and <span class="hl-green">SWAP</span> are <span class="hl-red">hermitian operators</span>, so they are equal to their adjoints.

## QFT and FT

|  | <span class="hl-red">Quantum Fourier Transform</span> | <span class="hl-green">Classical Fourier Transform</span> |
|---|---|---|
| **Data** | $N$ amplitudes held in only $n = \log N$ qubits | $N$ numbers stored explicitly |
| **Cost** | $O(\log N \log N)$ gates | $O(N \log N)$ operations |
| **Output** | Cannot read the amplitudes; a measurement returns one $k$, sampled with probability $\lvert y_k\rvert^2$ | Can read all $N$ values $y_k$ |
| **Input** | Need the state $\sum_j x_j\ket{j}$ already prepared, which can itself be expensive | Any vector you can write down |

- The QFT has better <span class="hl-red">computational complexity</span> in terms of <span class="hl-green">input size</span>, but its speedup only materialises when embedded in a larger quantum algorithm.

```{attention}
Even though <span class="hl-red">quantum amplitudes are not directly accessible</span>, the QFT plays a <span class="hl-green">central role</span> in powerful quantum algorithms such as <span class="hl-blue">Shor's factoring algorithm</span> and <span class="hl-blue">Quantum Phase Estimation (QPE)</span>.
```

## Quantum Phase Estimation: Definition

- Initially introduced by <span class="hl-blue">Alexei Kitaev</span> in 1995.

```{figure} ./images/kitaev.png
:align: center
:width: 200px

Alexei Kitaev.
```

- A <span class="hl-green">unitary operator</span> $U$ has <span class="hl-green">norm-1 eigenvalues</span>:

$$U\ket{u} = e^{i2\pi\phi}\ket{u}$$

```{admonition} Quantum Phase Estimation
:class: information
<span class="hl-red">Quantum Phase Estimation (QPE)</span> tries to <span class="hl-red">estimate</span> $\phi$.
```

- QPE <span class="hl-blue">assumes</span> that:

  1. $\textcolor{blue}{\ket{u}}$ can be efficiently prepared.
  2. A controlled-$\textcolor{blue}{U^{2^{t}}}$ gate can be prepared.

This is a reasonable assumption because:

1. <span class="hl-blue">Extracting eigenvalues</span> classically is <span class="hl-blue">hard</span>.
2. <span class="hl-blue">Many problems</span> in quantum mechanics and physics involve <span class="hl-blue">finding eigenvalues</span> of an operator.

## QPE: Circuit Preliminaries I

- A <span class="hl-green">unitary operator</span> $U$ verifies that:

$$U^{2^t} \ket{u} = \underbrace{U \cdots U}_{\textcolor{red}{2^t}} \ket{u} = \underbrace{e^{i 2\pi  \phi} \cdots e^{i 2\pi \phi}}_{\textcolor{red}{2^t}} \ket{u} = e^{i 2\pi {\textcolor{red}{2^t}}\phi} \ket{u}$$

- We can build a <span class="hl-green">controlled version</span> of this gate $C\text{-}U^{2^t}$ so that:

$$\begin{array}{c} C\text{-}U^{2^t}\ket{0}\ket{u} = \ket{0}\ket{u} \\[10pt] C\text{-}U^{2^t}\ket{1}\ket{u} = \ket{1}e^{i2\pi {\textcolor{red}{2^t}}\phi}\ket{u}\end{array}$$

## QPE: Circuit Preliminaries II

```{figure} ./images/qpe_1.png
:align: center

Building block of the QPE circuit.
```

$$\ket{\psi_1} = \ket{0}\ket{u}$$

$$\ket{\psi_2} = \frac{1}{\sqrt{2}}\left(\ket{0}\ket{u}+\ket{1}\ket{u}\right)$$

$$\ket{\psi_3} = \frac{1}{\sqrt{2}}\left(\ket{0}\ket{u}+\ket{1}e^{i 2\pi 2^{t}\phi}\ket{u}\right) = \frac{1}{\sqrt{2}}\left(\ket{0}+\ket{1}e^{i 2\pi 2^{t}\phi}\right)\ket{u}$$

## QPE: Circuit I

```{figure} ./images/qpe_2.png
:align: center

QPE first step circuit.
```

- The state of the <span class="hl-green">first register</span> will be:

$$\frac{1}{2^{t/2}} \left(\ket{0} + e^{2\pi i 2^{t-1}\phi}\ket{1}\right) \cdots \left(\ket{0} + e^{2\pi i 2^{1}\phi}\ket{1}\right) \left(\ket{0} + e^{2\pi i 2^{0}\phi}\ket{1}\right)$$

## QPE: Circuit II

- Recalling the <span class="hl-red">binary fraction</span> notation for $\phi$:

$$0.\phi_1\phi_2\cdots\phi_t = \frac{\phi_1}{2} + \frac{\phi_2}{4} + \cdots + \frac{\phi_t}{2^t}$$

- We can rewrite the state of the <span class="hl-green">first register</span> as:

$$\frac{1}{2^{t/2}} \left(\ket{0} + e^{2\pi i \,0.\phi_t}\ket{1}\right) \left(\ket{0} + e^{2\pi i \,0.\phi_{t-1}\phi_t}\ket{1}\right) \cdots \left(\ket{0} + e^{2\pi i \,0.\phi_1\phi_2\cdots\phi_t}\ket{1}\right)$$

**Demonstration.** The qubit with the power $2^k$, for $k=0,1,\dots,t-1$, is in the state:

$$\ket{0} + e^{2\pi i\, 2^{k}\phi}\ket{1}$$

Using the binary fraction expansion of $\phi$, multiplying by $2^k$ shifts every bit $k$ places to the left:

$$2^k\phi = \sum_{m=1}^{t}\phi_m\,2^{k-m}$$

We split the sum at $m=k$. The terms with $m\leq k$ have a non-negative exponent, so they add up to an integer $N_k$. The terms with $m>k$ have a negative exponent, so they are a binary fraction:

$$2^k\phi = \underbrace{\sum_{m=1}^{k}\phi_m\,2^{k-m}}_{\text{integer } N_k} + \underbrace{\sum_{m=k+1}^{t}\frac{\phi_m}{2^{\,m-k}}}_{=\,0.\phi_{k+1}\phi_{k+2}\cdots\phi_t}$$

Since $e^{2\pi i N_k}=1$ for any integer $N_k$, the integer part has no effect on the phase:

$$e^{2\pi i\, 2^{k}\phi} = e^{2\pi i N_k}\,e^{2\pi i\,0.\phi_{k+1}\cdots\phi_t} = e^{2\pi i\,0.\phi_{k+1}\cdots\phi_t}$$

Only the bits to the right of the binary point survive, so each qubit keeps a different number of bits of $\phi$:

| Power | Qubit state | Bits kept |
|:---:|:---:|:---:|
| $k=t-1$ | $\ket{0} + e^{2\pi i \,0.\phi_t}\ket{1}$ | last bit |
| $k=t-2$ | $\ket{0} + e^{2\pi i \,0.\phi_{t-1}\phi_t}\ket{1}$ | last two bits |
| $\vdots$ | $\vdots$ | $\vdots$ |
| $k=0$ | $\ket{0} + e^{2\pi i \,0.\phi_1\phi_2\cdots\phi_t}\ket{1}$ | all bits |

Taking the product of the $t$ qubits, with the $\frac{1}{\sqrt{2}}$ of each Hadamard giving the global factor $\frac{1}{2^{t/2}}$, we obtain the expression above. For example, for $t=3$:

$$\begin{aligned}
4\phi &= 2\phi_1+\phi_2+\tfrac{\phi_3}{2} \;\rightarrow\; 0.\phi_3 \\
2\phi &= \phi_1+\tfrac{\phi_2}{2}+\tfrac{\phi_3}{4} \;\rightarrow\; 0.\phi_2\phi_3 \\
\phi &= \tfrac{\phi_1}{2}+\tfrac{\phi_2}{4}+\tfrac{\phi_3}{8} \;\rightarrow\; 0.\phi_1\phi_2\phi_3
\end{aligned}$$

This derivation assumes that $\phi$ can be written exactly with $t$ bits.

- This is the <span class="hl-blue">QFT</span> acting on $\phi = 0.\phi_1\phi_2\cdots\phi_t$

```{admonition} Quantum Phase Estimation
:class: information
Applying the <span class="hl-blue">inverse QFT</span> to the <span class="hl-green">first register</span> yields $\ket{\phi_1\phi_2\cdots\phi_t}$, and therefore the desired <span class="hl-red">eigenvalue</span>.
```

## QPE: Circuit III

```{figure} ./images/qpe_3.png
:align: center
:width: 500px

QPE full circuit.
```

## QPE: Complexity and performance I

- If $\phi$ can be exactly expressed as a <span class="hl-red">binary fraction</span>, QPE yields the <span class="hl-green">correct result 100% of the time</span>. For example, $\phi=\tfrac{3}{8} = \tfrac{0}{2}+\tfrac{1}{4}+\tfrac{1}{8}$, so <span class="hl-blue">QPE outputs</span> $\ket{011}$ with <span class="hl-green">probability = 1</span>.

- If $\phi$ can't be exactly expressed as a <span class="hl-red">binary fraction</span>, e.g. $\phi = \tfrac{1}{6}=0.16666...$, it has a <span class="hl-red">repeating</span> binary expansion $\tfrac{1}{6} = 0.00\overline{10}\ldots$ that never terminates. <span class="hl-blue">QPE outputs</span> the closest value to $\phi$ with <span class="hl-green">probability</span> $\textcolor{green}{\geq\frac{4}{\pi^{2}}\approx 0.40}$.

- Increasing the <span class="hl-blue">number of qubits</span> in the first register improves the approximation:

| $t$ qubits | Best approximation of $\tfrac{1}{6}$ | Error |
|:---:|:---:|:---:|
| 3 | $\tfrac{1}{8} = 0.125$ | $0.042$ |
| 4 | $\tfrac{3}{16} = 0.1875$ | $0.021$ |
| 5 | $\tfrac{5}{32} = 0.15625$ | $0.010$ |

## QPE: Complexity and performance II

```{figure} ./images/qpe_results.png
:align: center

Result of QPE for an eigenvalue of 1/6.
```

- For $\phi = \tfrac{1}{6}=0.166...$ we obtain the result $\alpha=\ket{001}$ with <span class="hl-blue">highest probability</span> (higher than $\frac{4}{\pi^{2}}$).

- To estimate $\phi$ to <span class="hl-red">$n$ bits of precision</span> with <span class="hl-green">failure probability</span> at most $\varepsilon$, the number of qubits $t$ in the first register is given by:

$$t = \textcolor{red}{n} + \textcolor{green}{\left\lceil \log\left(2 + \frac{1}{2\varepsilon}\right)\right\rceil}$$

```{figure} ./images/qpe_extra_qubits.png
:align: center

Extra qubits needed to reach a given failure probability.
```

```{figure} ./images/qpe_success_probability.png
:align: center

Success probability vs. extra qubits.
```

## QPE: Why it matters

- <span class="hl-green">Comparison to classical</span>: estimating eigenvalues of an $N\times N$ unitary <span class="hl-red">classically</span> requires resources that scale with $N=2^{n}$, whereas QPE needs only <span class="hl-blue">$O(n)$ qubits</span> and a number of controlled-$U$ calls that is <span class="hl-green">polynomial</span> in $n$, an <span class="hl-green">exponential advantage</span> whenever $U$ can be implemented efficiently.

- Apart from having <span class="hl-green">many applications</span> of its own, <span class="hl-blue">QPE</span> is a <span class="hl-blue">core subroutine</span> that powers many of the most important quantum algorithms, e.g.:
  - <span class="hl-red">Shor's algorithm</span> for factoring.
  - <span class="hl-red">Quantum chemistry</span> and <span class="hl-red">material sciences</span>.
  - Solving <span class="hl-red">linear systems</span> (<span class="hl-red">HHL algorithm</span>).
  - <span class="hl-red">Quantum walk</span> and <span class="hl-red">search</span> algorithms.

## Wrap-up

- The <span class="hl-red">Fourier Transform</span> decomposes a function into its <span class="hl-blue">frequency components</span>, trading localisation in time for localisation in frequency.
- The <span class="hl-red">Quantum Fourier Transform (QFT)</span> is the quantum analogue of the Discrete Fourier Transform, computable with exponentially fewer operations than the classical FFT, though its amplitudes cannot be read out directly.
- <span class="hl-red">Quantum Phase Estimation (QPE)</span> uses the QFT to estimate the eigenvalue phase $\phi$ of a unitary operator $U$.
- <span class="hl-blue">QPE and QFT are a core subroutine</span> underlying many of the most important quantum algorithms, such as Shor's algorithm, quantum chemistry simulation, and the HHL algorithm for linear systems.
