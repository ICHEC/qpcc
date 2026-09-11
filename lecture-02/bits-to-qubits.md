---
title: From Bits to Qubits
layout: post
---

(lecture-2)=
# Lecture 2: From Bits to Qubits

```{warning} These lecture notes are a work in progress and are not a replacement for watching the lecture video, it's intended to be a supplementary reading after watching the lecture. 
```

```{admonition} Learning outcomes
:class: tip

In this lecture we introduce what a quantum state is through the Stern Gerlach experiments. We use the lessons from the experiment to introduce quantum states, and specifically how does a description of qubit looks like.

- We touch upon the necessary mathematical framework for defining and and interpreting a qubit's state.
- We discuss quantum measurement, and how operators change qubit's state.
- We also describe how quantum measurement is used in computation, and what quantum computing workflow looks like.
- Lastly, we establish a basic visual framework of quantum circuits, and identify that quantum gates are essentially linear operators.
``` 

<!--
Welcome to the second lecture of Quantum Programming Foundations. 

In this lecture, we are going to rethink how computers process information, and step out of the classical world into the quantum one.
-->

---

## Introduction



Let us take a dive into the the fundamental unit of quantum computing, namely **Qubit**, and underlying mathematical ingredients. 
Later, in the lecture we learn how to manipulate qubits using Gates for basic computations, and the mathematical framework containing it.
Our primary goal today is to get comfortable with the fundamental building block of a quantum computer: the qubit. We'll look at what it is, and we'll build up just enough of the mathematical framework so you understand how it behaves. We'll also learn how to manipulate these qubits to actually compute things.

This note is largely divided into two parts

- **Qubits and Quantum state**
- **Quantum Gates**



## Recap: Bits and Gates

To truly appreciate what makes a qubit so special, we first need to quickly remind
ourselves how our everyday, classical computers work.

We already know that classical computation is built entirely on two things: `bits` and `gates`.
A bit is the simplest piece of information in the universe. It is a simple binary choice—it
carries either a `0`, or a `1`. Think of it like a light switch that is strictly `off` or `on`.

Bits carry binary informations: `0`, or `1` that gates manipulate, to perform computation.
Of course, a single bit doesn't do much. But as we group multiple bits together, the amount of data we can work with grows.
Having multiple bits rapidly increases the input data we can work with, as $N$ bit combinatorially
contains $2^N$ binary data. See table below:

```{table} Combinations with Bits
:name: tab-bits

|No| size  | Permutations|
|--------- |------ |--- |
| 1        | 2     | `0`, `1`|
| 2        | 4     | `00`, `01`, `10`, `11` |
| 3        | 8     | `000`, `001`, `010`, `011`, `100`, `101`, `110`, `111` |
|... |... |...|

```

As you can see in the {numref}`tab-bits`, 2 bits give us 4 possible combinations. 3 bits give us 8 combinations, and it scales up from there. Now, to actually process this data, we send these bits through classical logic gates. These gates do something very straightforward: they either flip a bit, or they leave it alone, depending on a set of rules.

The entire mathematical framework behind this is called **Boolean algebra**. 

<!--
It's the logic that powers simple operations, like the 'AND' gate you see here. It is highly predictable, strictly binary, and it's the foundation of all classical software. But as we're about to see, the quantum world plays by a completely different set of rules.
-->

$$OUT = A + B$$

<LogicGateTable type="AND" :interval="1500" :scale=".6" />


---

# Preview: Qubits and Quantum Gates

<Grid cols="3-1" gap="0">

<Banner title="The Quantum Paradigm Shift" class="scale-95 text-sm">

<v-clicks every="2">

- In quantum computing the corresponding objects are <span class="inline-box"> Qubits</span>  and <span class="inline-box"> Quantum Gates </span>

<br>

- <span class="inline-box"> Qubits</span> act like a spinning coin; holding multiple possibilities at the same time.

<br>

- Working with multiple qubits increases processing capacity exponentially.

<br>

- A group of bits can only express one combination, qubits explore them all at once.

<br>

- <span class="inline-box">Quantum Gates</span> alter these states by smoothly tilting or blending the possibilities.

<br>

- Instead of simple on/off logic, operations blend and entangle possibilities of final outcome.

<br>

- The underlying framework shifts from **Boolean algebra** to **Linear algebra**.



</Banner>

<div>

<FancyTable class="scale-90 -py-4" v-click=4>

| Items | Classical Capacity | Quantum Capacity |
| :--- | :--- | :--- |
| 1 | 1 option out of 2 | Both options simultaneously |
| 2 | 1 option out of 4 | All 4 options explored together |
| 3 | 1 option out of 8 | All 8 options explored together |
| ... | *One path at a time* | *Every possible path instantly* |

</FancyTable>

<div class="text-center -my-0 text-xs font-semibold text-purple-400" v-click="8">
  Illustrative Quantum Circuit
</div>


<div class="flex bg-gray-50 m-3 rounded-xl" v-click="8">

<QuantumCircuit 
  :qubits="2" 
  gates="H:0, CNOT:1:0, M:0, M:1" 
  scale="0.85" 
/>  
</div>

</div>

</Grid>

<!--
Now, let's step into the quantum paradigm.


Instead of classical bits and gates, the corresponding object in quantum computing are Qubits and Quantum Gates.


Think of a classical bit like a coin sitting flat on a table—it's either heads or tails. A qubit is like a spinning coin. While it's spinning, it exists in a blur, holding the possibility of being heads and tails at the exact same time.


Because of this, when you link qubits together, the processing power doesn't just increase—it explodes exponentially.


As you can see in the table, a classical computer walks down one path at a time. A quantum computer can walk down every possible path instantly.


To manipulate these qubits, we use Quantum Gates. Instead of just flipping a rigid switch, these gates act smoothly—like tilting that spinning coin to favor one outcome over another.


We are blending possibilities together, rather than just crunching on/off logic.


Because of this fluidity, our mathematical language has to change from basic Boolean algebra to Linear algebra.


And finally, instead of logic circuits, we draw out these operations using quantum circuits, which follow similar flow of operation from left to right.
-->

---

# Classical vs Quantum Scaling

#### A comparative overview of how computing paradigms expand over time.

<Grid cols="2" gap="1">

<Banner title="Moore's Law" class="scale-100 text-sm -translate-y-0" v-click="1">



- Driven by physical miniaturization of transisters.
- Linear increase in components yields linear growth in classical bits.
- Main bottleneck: Thermal dissipation and atomic limits.


</Banner>

<Banner title="Rose's Law" class="scale-100 text-sm -translate-y-0" v-click="4">



- Driven by quantum coherence and entanglement.
- Linear increase in qubits yields exponential growth in state space $2^{n}$.
- Main bottleneck: Quantum noise and error correction.


</Banner>

</Grid>

<div class="inline-box -my-3 mx-72 px-6" v-click>
$$
\Large{2^n \text{~~bits} \quad\equiv\quad\ n \text{~~qubits}}
$$

</div>

<FancyTable color="blue" class="translate-y-3" v-click>

| Dimension               | Scale Metric | Growth Pattern | Doubling Period | Capability Metric | Limiting Factor |
| ----------------------- | ----------- | -------------- | --------------- | ---------------------- | --------------- |
| Moore's Law (Classical) | Transistor Count | Linear growth of components | ~18 to 24 Months | Clock Speed & Instructions/Sec (Flops) | Quantum Tunneling (Physical Wall) |
| Rose's Law (Quantum)    | Qubit Count (Physical/Logical) | Exponential growth of state space | ~12 to 18 Months |Quantum Volume & Logical Error Rates | Decoherence & Environmental Noise|

</FancyTable>

<!--
Why does this fundamental shift matter? It all comes down to scaling.


You've likely heard of Moore's Law.


It's the classical computing trend where we just keep packing more and more microscopic transistors onto a chip.


But we are hitting a physical wall. We can only make things so small before atomic interference ruins the chip.


Quantum computing follows a different trajectory, often called Rose's Law.


Because of how qubits hold multiple states, just adding a few more qubits exponentially grows the computer's capacity.


The main hurdle here isn't physical space, but "noise"—keeping those delicate spinning coins from falling over before the calculation is done.


To put this immense power in perspective, look at this equation: to get the processing space of a handful of 'n' qubits, you would need two-to-the-power-of-'n' classical bits.


This table summarizes our crossroads: we are moving from linear, physical growth, into an era of exponential, quantum growth.
-->

---

# Stern Gerlach (SG) Experiment

<Grid cols="3-1" gap="2">

<div>
<AnimatedBanner h-30 rounded-none v-click>

A foundational physics demonstration in 1922 by Otto Stern and Walther Gerlach, that proved the quantization of angular momentum.

</AnimatedBanner>

<Banner title="" scale-100 translate-x-0 v-click>

- Atoms contain intrinsic tiny magnetic moment, called **spin**.
- The experiment showed how they respond to external magnet.

</Banner>

<img src="/figures/L02/atom-spin.png" width="50%" translate-x-30/>

</div>

<div>



<Image src="https://upload.wikimedia.org/wikipedia/commons/8/88/Otto_Stern.jpg" width="120" />

<div class="inline-box translate-x-12" > Otto Stern </div>

<Image src="https://upload.wikimedia.org/wikipedia/en/9/9e/Walther_Gerlach.jpg" width="120" />
<div class="inline-box translate-x-12" > Walther Gerlach </div>

</div>

</Grid>

<!--
So, how do we actually prove that a qubit exists in this weird, spinning state in the physical world? For that, we have to go back to 1922.


Two physicists, Otto Stern and Walther Gerlach, set up a now-famous experiment.


They wanted to test the idea that atoms act like tiny, intrinsic magnets—a property we now call "spin". They wanted to see exactly how these tiny magnets would react when pushed by a big, external magnet.
-->

---

# SG experiment: Setup

<Grid cols="3-1" gap="2">

<div v-click>
<!--<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Stern-Gerlach_experiment.svg" width="100%" crop v-click> -->
<img src="/figures/L02/sg-exp.png" width="90%" />
</div>

<div 
    class="absolute border-2 border-amber-400 bg-amber-400/10 rounded-12 transition-all duration-500 ease-in-out pointer-events-none"
    :class="{
      'opacity-0': $clicks < 2,
      'top-[85px] left-[550px] w-[80px] h-[80px] opacity-100': $clicks === 2,
      'top-[115px] left-[280px] w-[150px] h-[60px] opacity-100 -rotate-9': $clicks === 3,
      'top-[150px] left-[120px] w-[150px] h-[60px] opacity-100 -rotate-9': $clicks === 4,
      'top-[150px] left-[33px] w-[50px] h-[100px] opacity-100 -rotate-6': $clicks === 5,
      'opacity-0 scale-95': $clicks > 4
    }"
  />

<div class="scale-90 bg-gray-400/10 p-3" v-click="1">

1) Furnace
2) Beam of atoms 
3) Magnetic field
4) classically expectation 
5) observed result

</div>


<Banner title="Experiment steps" class="scale-90 -my-3" v-click=1>



- Silver atoms are vaporised in an oven and fired like a beam.
- They pass through a strong magnetic field.
- It causes a force relative to atom's intrinsic spin to deflect them.
- The deflected atoms hit the screen, which shows bright spots where hit.


</Banner>

<Banner title="Key lessons" class="scale-90 -translate-y-9" v-click>

- How the beam deformed, surprise everyone at the time.
- The first decisive experiment to show spatial quantisation.

</Banner>
</Grid>

<!--
Let's look at how they built this experiment.


This is the sketch of the experiment


First, the silver atoms are vapourised in a furnace and fired like a straight beam.


Then beam of atoms passes through a strong magnetic field


This beam was shot directly through a very strong, uneven magnetic field.


Finally, the atoms would hit a detection screen at the far end, leaving a mark where they landed.


The idea was that the magnetic field would deflect the atoms depending on their internal spin.

But the pattern that actually appeared on that screen surprised everyone.
It was the first experiment to show spatial quantusation, and it perfectly illustrates our quantum coin. Let's see why.
-->

---

# The SG Experiment: Expectation

<Banner title="Prediction:" v-click>

Silver atoms possess random magnetic moments, which should result in a continuous smear across the detection screen.

</Banner>

<SternGerlach mode="classical" particleColor="#1cc277" :particleSpeed="6.0" :spawnRate="3" size="100%" v-click/>

<Banner title="Reasoning" v-click>

- The magnetic field is felt by each atom depending on its orientation, and deflects the atom accordingly.
- Since spin orientations must be random from the oven, the scattering pattern should be spread out.

</Banner>

<!--
Before they turned the machine on, classical physics made a very confident prediction.


Since the silver atoms are bouncing around randomly inside that hot oven, their tiny magnetic spins should be pointing in every possible random direction.


Because of that, as they pass through the magnet, they should be deflected by all sorts of random amounts.


As you can see in the simulation, classical physics expected the atoms to just hit the screen in a giant, continuous smear. Random orientations in, smeared line out. It made perfect sense. But the quantum world had a massive surprise waiting for them.
-->

---

# The SG Experiment: Reality

<Banner title="Reality:" v-click>

Angular momentum is quantized. The beam splits into exactly two discrete orientations:

- Spin `Up` ($\uparrow$) and,

- Spin `Down` ($\downarrow$)


</Banner>

<SternGerlach mode="quantum" particleColor="#1cc277" :particleSpeed="6.0" :spawnRate="3" size="100%" v-click/>

<AnimatedBanner v-click>

Atom's **spin** were in random orientation. The magnet **Influenced** the orientation. The screen **detected** the orientation.
 
</AnimatedBanner>

<!--
But here is what actually happened when they turned the machine on.


Instead of a continuous smear, the beam split cleanly into exactly two distinct spots. Some atoms went straight up, and the others went straight down.


Nothing in between. Even though the atoms went into the magnet spinning completely randomly, the magnet forced them to pick a side. The measurement itself determined the reality.
-->

---

# Interpretation

<Grid cols="4-1" gap="0">
<Box title="Atomic spin: Measuring direction" type="warning" class="text-sm  -translate-x-0 -translate-y-0" >


<v-clicks every="1">

- Let's look closely at the atom's `spin`, and consider its direction as it passes from the oven, through the magnet, to the screen.

- In the oven the spins can point in every possible random direction, completely uncoordinated.

- Yet, the moment they pass through the magnetic field, they don't spread out into a continuous smudge; they deflect cleanly into two discrete paths.

- Prior to detection, the spin had all possibilities of orientation, but the measurement forces it to collapse into just one configuration.
  - Outcomes of such measurements are quantised, descrete.

- This collapse is fundamentally probabilistic: If we throw one atom at a time, it either goes **up**, or **down**.

- After several such measurements, we map a distribution of **up**'s and **down**'s clicks on the screen.

- The experiment revealed equal brightness between both dots: $\longrightarrow$ equal probability of **up** or **down**.



</Box>


<div>

<br><br><br>

<SGspin option="random" class="scale-150 translate-x-0" v-click="2"/>

<br><br><br>

<SGspin option="polarized" class="scale-150 translate-x-0" v-click="3"/>

</div>

</Grid>

<span class="inline-box rounded-auto text-center" v-click>
💡 Takeaway: The spin state must be described by a mathematical framework that has probability built right into it.
</span>

<!--
Let's break down exactly why this is so weird, and what it means for us.



In the oven, these atomic spins are a complete mess—they point in every possible direction.


But the instant they pass through the magnetic field, they don't smear. They snap into one of two discrete paths.


Before hitting the screen, the atom has the potential to be in any orientation, but the act of measuring it forces a collapse into a single choice.


And this choice is fundamentally random. If you shoot just one atom, it's a coin toss whether it goes up or down.


But if you shoot thousands of them, a pattern emerges.


The experiment showed the two spots were equally bright, meaning there is exactly a 50/50 probability of getting Up or Down.




The big takeaway? Whatever mathematical language we use to program quantum computers, it has to have probability baked right into its core.
-->

---

# A Quantum State



- A system's state is a mathematical descriptor that captures every detail of that system at a given instant.
- For a classical system, this snapshot is expressed entirely through a fixed set of coordinates and properties.




<Banner title="Classical State" class="scale-90 -translate-y-6 text-4" v-click="3">



- Example: A single physical particle moving through space.
- Its exact state is locked into its position $(x, y, z)$ and its momentum $(p_x, p_y, p_z)$.
- Measuring the location or speed simply reveals these pre-existing numbers.


</Banner>

<Banner title="Quantum State" type="warning" class="scale-90 text-4 -translate-y-15" v-click="6">


- A quantum state is sensitive to the measurement apparatus, existing as a fluid combination of potential measurement outcomes.

- Because `Up` and `Down` were the distinct outcomes of our spin experiment, we write the state using an abstract blend:





$$|\psi\rangle = \alpha|\text{Up}\rangle + \beta|\text{Down}\rangle$$ 




- The values $\alpha$ and $\beta$ are weighting factors that control the likelihood of landing on a specific outcome.

- If we square their absolute values, they reveal the physical probability of reading a state as `Up` or `Down`.


</Banner>

<!--
So how do we mathematically write this down? We use something called a "state."


A state is just a mathematical snapshot of a system.


For classical system, this snapshot is expressed entirely through a fixed set of numbers which could be coordinates and other properties.


For example, If you have a particle,


it has a definite speed and location. 


Measuring it just reveals those numbers to you.



But a quantum state is completely different. It's fluid. It is literally a combination of potential outcomes before you measure it.


Since our experiment gave us "Up" and "Down", we write our quantum state as a blend of both possibilities.


Here the state psi equals alpha times UP and beta times DOWN.


The symbols alpha and beta—as are the weights that control likelihood of a specific outcome.


If you take these weights and square them, they give you the exact percentage chance that the qubit will snap into the "Up" state or the "Down" state when you finally look at it.
-->

---

# Complex weights

<div class="w-200 translate-x-9 translate-y-18" v-click="1">
<Banner title="The Necessity of Complex Weights" class="scale-90" v-click="1">



- One may think that the simplest description could involve using real numbers as weights.

$$|\psi\rangle = \alpha|\text{Up}\rangle + \beta|\text{Down}\rangle$$ 





- But one quickly learns how treating real numbers as weights becomes tricky.

- We illustrate this by doing a Lego like exercise with the SG experiment.



</Banner>
</div>

<!--
Now, you might be wondering about those weights, alpha and beta.


It's incredibly tempting to just use regular, everyday numbers for them—like 0.5 or 0.8.


But very early on, physicists realized that using regular real numbers completely breaks down.


To show you why, let's play a little game with our SG experiment.
-->

---

# Multi-Axis Measurement Sequence


<div class="flex bg-yellow-100 text-sm">



- Recall the SG setup. The magnet was oriented to deflect atoms along $Z$ axis. 
- Let's call this arrangement $\text{magnet-}Z$, and the two outcomes $|z+\rangle$ and $|z-\rangle$.
  - Rotating the whole apparatus along $X$ or $Y$ axis, changes the beam to deflect along $X$, or $Y$ axes with outcomes $|x\pm\rangle$ or $|y\pm\rangle$
- Let's run three SG experiments sequentially, in two ways


</div>

<Grid cols="2" gap="1">

<Banner title="Z-X-Z" type="success" class=" text-sm" v-click="4">

We pass the $|z+\rangle$ atoms through second $\text{magnet-}X$, which splits them in $|x\pm\rangle$. We take the
$|x+\rangle$ out, and pass it to third $\text{magnet-}Z$, which splits them into $|z\pm\rangle$ again.

</Banner>

<Banner title="Z-Y-Z" class=" text-sm" v-click="5">

We pass the $|z+\rangle$ atoms through second $\text{magnet-}Y$, which splits them in $|y\pm\rangle$. We take the
$|y+\rangle$ out, and pass it to third $\text{magnet-}Z$, which splits them into $|z\pm\rangle$ again.

</Banner>

</Grid>


<div class="flex relative -translate-y-9" >

<!-- Click 1: Reveals the First Z-Magnet and its ket states -->
<SGxyFlow :animated="true" :step="1" class="absolute inset-0" v-click="1" />

<!-- Click 2: Reveals the upper Green X-Magnet pathway -->
<SGxyFlow :animated="true" :step="2" class="absolute inset-0" v-click="4" />

<!-- Click 3: Reveals the lower Blue Y-Magnet pathway -->
<SGxyFlow :animated="true" :step="3" class="absolute inset-0" v-click="5" />

</div>

<!--
Let's imagine we line up multiple magnets in a sequence.


First, our standard vertical magnet—the Z-axis. It splits the beam Up and Down.


Let's call this arrangement magnet-z and the two outcomes as z+ and z- .
Rotating the whole apparatus along X or Y axis, deflects the beam along X, or Y, with outcomes x+- or y+-.


Let's run this sequentially in two ways.


First, the Z-X-Z sequence.
Here we take only the "Up" or z+ atoms and pass them through a second magnet that is rotated along X-axis.

Then, we pass those through a third vertical Z-axis magnet.


We could also run a second version of this experiment in Z-Y-Z arrangement, where we tilt the middle magnet in a completely different direction—the Y-axis.

In both the case, we get equal mixture of z+ and z- towards the end.
-->

---

# Need for Complex Weights

#### Two counterintuitive things happened.

<Banner title="The Reappearing State Paradox" class="scale-90 -translate-y-4 -mb-1 text-4" v-click>

- A $|z+\rangle$ state became an equal blend of $|z+\rangle$ and $|z-\rangle$ when passed through $\text{magnet-}X$/$\text{magnet-}Y$.
- How did $|z+\rangle$ in both cases, got mixed with $|z-\rangle$?

</Banner>

<Banner title="Incomplete description" class="scale-90 -translate-y-12 -mb-1 text-4" v-click>

- In the $Z-X-Z$ pathway, the $|x+\rangle$ state is an equal blend of $|z+\rangle$, and $|z-\rangle$. 
- In the $Z-Y-Z$ pathway, the $|y+\rangle$ state is an equal blend of $|z+\rangle$, and $|z-\rangle$. 
  $$|x+\rangle := |z+\rangle + |z-\rangle; \qquad\text{yet also} \qquad |y+\rangle := |z+\rangle + |z-\rangle $$
</Banner>

<Banner title="Real Numbers Are Not Enough" type="warning" class="scale-90 -translate-y-20 text-4" v-click>

- Using only real numbers ($+$ or $-$), we cannot write mathematically unique descriptions for both $X$ and $Y$ states.
- Complex numbers provide the extra geometric dimension needed to uniquely represent independent physical directions.

</Banner>

<!--
When you actually run this experiment, two maddening things happen.


First, atoms that were strictly "Up" on the Z-axis somehow forget their orientation after passing through the second magnets When they hit the final Z-magnet, they split into Up and Down all over again!


Second, and more importantly for our math: if we try to write the equations for the X pathway and the Y pathway using only regular real numbers, the equations end up looking exactly identical. somehow both x+ and y+ states are equal blend of z+ and z- states!


But physically, they are completely different setups! Regular numbers just don't give us enough dimensions to uniquely describe reality. We have to use complex numbers.
-->

---

# Decoding the Coefficients

<Box class="scale-90 -translate-y-3">

$$|\psi\rangle = \alpha|\text{Up}\rangle + \beta|\text{Down}\rangle$$ 



- The values $\alpha$ and $\beta$ are weighting factors that control the likelihood of landing on a specific outcome.
- If we square these numbers, they reveal the exact physical probability of reading a state as `Up` or `Down`.
- Because the atom must land in one of the two spots, the total probability must always equal $100\%$.
- Mathematically, this means sum of their norm squared is always:





$$|\alpha|^2 + |\beta|^2 = 1$$

- If we kept the coefficients real, we would still be facing the second issue we had:

$$|x+\rangle := \frac{1}{\sqrt{2}}|z+\rangle + \frac{1}{\sqrt{2}}|z-\rangle; \qquad\text{yet also} \qquad |y+\rangle := \frac{1}{\sqrt{2}}|z+\rangle + \frac{1}{\sqrt{2}}|z-\rangle $$

- Complex numbers have magnitude and **phase**, which gives the necessary detail in description to distinguish the above two states. In fact

$$|x+\rangle = \frac{1}{\sqrt{2}}|z+\rangle + \frac{1}{\sqrt{2}}|z-\rangle; \qquad\text{while} \qquad |y+\rangle = \frac{1}{\sqrt{2}}|z+\rangle + i\frac{1}{\sqrt{2}}|z-\rangle $$



</Box>

<!--
Let's look at how complex numbers solve this.



Remember, our weights—alpha and beta—give us our probabilities.



And because the atom has to land somewhere, the total probability always has to add up to exactly 1, or 100%.



If we forced these weights to be regular numbers, we'd be stuck with those identical equations for the X and Y paths.


But complex numbers have a secret weapon: they have a magnitude, and a phase. This phase acts like a hidden internal compass. As you can see in the bottom equation, that little 'i' allows the math to perfectly distinguish between our different physical setups.
-->

---

# Dirac Notation

<Box v-click>

Dirac, or Ket notation expresses a quantum state as $\color{red}|\text{descriptor}\rangle$ where the "descriptor" is something that describes the measurement outcome.

</Box>



- In case of spin, there were two outcomes, so corresponding states are expressed as $|\text{Up}\rangle$, and $|\text{Down}\rangle$
- These states are special. They are called **Basis States** for the given measurement.
- A generic state is expressed as linear combination of the Basis states with complex coefficients.



<div class="w-fit bg-green-400/20 border-2 border-green-800/20 p-1 rounded-2 translate-x-80">

$$|\psi\rangle = \alpha|\text{Up}\rangle + \beta|\text{Down}\rangle$$

</div>

<Box class="translate-y-2" v-click>

A Quantum system, in which the measurement gives only two outcomes, is identified as a **qubit**

</Box>



- In general, the measurement of a more complex system can yield several descrete outcomes: $o_1, o_2, o_3, ...$, then the state would be expressed as

$$
|\Psi\rangle = \alpha_1{\color{red}|o_1\rangle} + \alpha_2{\color{green}|o_2\rangle} + \alpha_3{\color{blue}|o_3\rangle} + \dots
$$



<!--
To keep all this math tidy, we use a special shorthand called Dirac notation, or Ket notation.


It's just a vertical bar, a word, and an angled bracket. The word inside describes the outcome.


For our magnet, the outcomes were Up and Down.


These foundational outcomes are called Basis States.


Any generic quantum state is just a mix of these Basis States.


And here is the big reveal: any quantum system where a measurement gives you exactly two possible outcomes is what we call a "qubit."



(If a system has more than two outcomes, we just add more kets to the equation, but for this course, we're sticking to the two-outcome qubit!)
-->

---

# Defining the Qubit

<Banner title="Definitions, conventions">


- Recall: The two outcomes in **SG** experiment were `up` and `down`. 
- In a different quantum experiment they could be any two different exclusive outcomes.
- We standardise the two outcomes as `0` and `1` states, or $\mathbf{|0\rangle}$, and $\mathbf{|1\rangle}$.


</Banner>

<div w-fit mx-auto>
<Banner title="Qubit" class="scale-100" v-click>

$$\Large{|\psi\rangle = \alpha|0\rangle + \beta|1\rangle}$$

$\alpha, \beta$ are complex numbers.
</Banner>
</div>



- $\alpha, \beta$ are also called **probability amplitudes** as their magnitude squared gives the probability.
- These coefficients represent different orientation possibilities before the measurement.



<!--
Let's formalize our qubit so we can start programming with it.



We don't want to talk about "Up" and "Down" magnets all day. We want to talk about computing.


So, we standardize these two exclusive outcomes as the state "0" and the state "1".


Here is your official, mathematical definition of a qubit: It is a fluid combination of State 0 and State 1.



Alpha and beta are complex numbers, which we call "probability amplitudes." They represent the orientation of our spinning quantum coin right before we force it to stop and show us a 0 or a 1.
-->

---

# The State vector

<Grid cols="4-1" gap="1">

<Banner title="The State Vector" class="scale-100 text-sm -translate-y-0">



- A computation and visualisation friendly way of expressing a qubit's quantum state is through vectors.

- So the general single-qubit can be expressed as a column vector $(\alpha, \beta)$.

- Since complex numbers are expressed in terms of magnitude and phase, we can express $\alpha = r_1 e^{i\phi_1}, \beta = r_2 e^{i\phi_2}$. The state becomes





$$|\psi\rangle = \begin{pmatrix} r_1 e^{i\phi_1} \\ r_2 e^{i\phi_2} \end{pmatrix}
= e^{i\phi_1} \begin{pmatrix} r_1 \\ r_2 e^{i(\phi_2-\phi_1)} \end{pmatrix}
$$

- The term $e^{i\phi_1}$ is overall phase, so we assume $\phi_1 = 0$, and choose $\phi_2 = \phi$.
- The probability must sum to 1, so we require $|\alpha|^2 + |\beta|^2 = 1$, or $r_1^2 + r_2^2 = 1$.
- This constraint gives us single parameter, and we write 

$$r_1 = \cos{(\frac{\theta}{2})}, \quad \text{and}\quad r_2 = \sin{(\frac{\theta}{2})}$$

- This description let's us parameterise a qubit in terms of $(\theta, \phi)$ and visualise on unit sphere.

</Banner>

<div>

<Box class="scale-80 translate-x-6" v-click="1">

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

</Box>

<Box class="scale-80 translate-x-6" v-click="2">

$$|\psi\rangle = \alpha \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \beta \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}$$

</Box>

<Banner title="Spherical Parametrisation" class="scale-80 translate-x-6 translate-y-19" v-click="7">

$$|\psi\rangle = \cos\!\left(\tfrac{\theta}{2}\right)|0\rangle + e^{i\phi}\sin\!\left(\tfrac{\theta}{2}\right)|1\rangle$$

</Banner>

</div>
</Grid>

<!--
Finally, to make writing code and doing calculations easier, we often write these states as column vectors.


State 0 is a vector with a 1 on top and 0 on the bottom. State 1 is the reverse.


This means our generic qubit is just a vector with our alpha and beta weights.


Now, because alpha and beta are complex numbers, the math can look a bit messy.



But by factoring out some shared numbers and using a bit of algebra...



...we can boil all of this down to just two meaningful variables: two angles, which we call Theta and Phi.


Why is this amazing? Because two angles are exactly what you need to point to any specific spot on the surface of a sphere. This means we can visualize any qubit, with all its complex math, as a single point on a 3D globe.
-->

---

# The Bloch Sphere


<Grid cols="2" gap="2">


<Banner title="Spherical Parametrisation" class="scale-100 text-sm">

$$|\psi\rangle = \cos\!\left(\tfrac{\theta}{2}\right)|0\rangle + e^{i\phi}\sin\!\left(\tfrac{\theta}{2}\right)|1\rangle$$

- $\theta \in [0, \pi]$ — polar angle (latitude)
- $\phi \in [0, 2\pi)$ — azimuthal angle (longitude)

- With these $\theta$ and $\phi$, there is 1-to-1 correspondence between the state $|\psi\rangle$ and a point on unit sphere.

$$
{\bf p} = \small \begin{pmatrix} \sin{\theta}\sin{\phi} & \sin{\theta}\cos{\phi} & \cos{\theta}\end{pmatrix}
$$


<Box type="warning" v-click>

- Starts at the North Pole state vector: $\lvert0\rangle$.
- Tilted vertically down onto the equator: $\lvert+\rangle$.
- Rotated horizontally across phases: $\lvert+i\rangle$.
- Pulled down cleanly to the South Pole: $\lvert1\rangle$.

</Box>
</Banner>

<div class="p-4" v-click>
  <BlochPath3D size="400" speed="0.3" />
</div>

</Grid>

<!--
Now that we know we can map a qubit using just two angles—Theta and Phi—we get one of the most beautiful visualization tools in quantum mechanics: The Bloch Sphere.

Think of the Bloch Sphere exactly like a globe. Theta is your latitude, and Phi is your longitude. Every single valid quantum state corresponds perfectly to one specific point on the surface of this sphere.


Our standard starting point, state 0, sits right at the North Pole.

State 1 sits exactly opposite, down at the South Pole.

If you tilt that point exactly halfway down onto the equator, you get a perfectly balanced 50/50 blend of 0 and 1.

And if you rotate it horizontally around the equator, you are changing the complex phase—shifting the internal compass we talked about earlier. Let's see this in motion.


Here is an animation of how the state moves on Bloch sphere as theta, phi change.
(Pause as 3D sphere animation plays)
-->

---

# Key Reference States

<FancyTable class="scale-120 max-w-120 mx-auto mt-24">


| State | $\theta, \phi$ | Sphere Position |
| :--- | :--- | :--- |
| $\vert0\rangle$ | $0,\,*$ | North Pole $+z$ |
| $\vert 1\rangle$ | $\pi,\,*$ | South Pole $-z$ |
| $\vert {+}\rangle = \frac{\vert 0\rangle + \vert 1\rangle}{\sqrt{2}}$ | $\pi/2,\,0$ | $+x$ equator |
| $\vert{-}\rangle = \frac{\vert 0\rangle - \vert 1\rangle}{\sqrt{2}}$ | $\pi/2,\,\pi$ | $-x$ equator |
| $\vert{+i}\rangle = \frac{\vert 0\rangle + i\vert 1\rangle}{\sqrt{2}}$ | $\pi/2,\,\pi/2$ | $+y$ equator |
| $\vert{-i}\rangle = \frac{\vert 0\rangle - i\vert 1\rangle}{\sqrt{2}}$ | $\pi/2,\,-\pi/2$ | $-y$ equator |


</FancyTable>

<!--
Because this sphere is so central to quantum computing, there are a few landmark locations we use all the time.


As we said, State 0 is the North Pole.


State 1 is the South Pole.


The state we call "Plus" sits on the equator, facing the positive X direction. It’s an equal, positive blend of 0 and 1.


"Minus" sits on the opposite side of the equator, facing negative X.


And the states "Plus i" and "Minus i" sit on the Y-axis of the equator, representing our complex, imaginary phases. Every quantum algorithm is just a journey moving a point between these coordinates on the globe.
-->

---

# Overlap, Measurement

<AnimatedBanner v-click>
We know how to express quantum state as complex vector, we can use linear algebra to connect to quantum computing. Let's define a few terms to proceed:
</AnimatedBanner>

<Grid cols="2" gap="2" class="translate-y-3">

<Banner title="Ket |ψ⟩ — State Vector" class="scale-80 text-lg" v-click>

Column vector: representing a quantum state.

$$|\psi\rangle = \alpha|0\rangle + \beta |1\rangle \equiv \begin{pmatrix}\alpha\\\beta\end{pmatrix}$$

</Banner>

<Banner title="Bra ⟨ψ| — Dual Vector" class="scale-80 text-lg" v-click>

Row vector: the **conjugate transpose** of its ket.

$$\langle\psi| = \alpha\langle 0| + \beta \langle 1| \equiv |\psi\rangle^\dagger = \begin{pmatrix}\alpha^* & \beta^*\end{pmatrix}$$

<br>
</Banner>
</Grid>
<!--<arrow v-click x1="424" x2="517" y1="280"  y2="280" color="#6666ff" width="1" arrowSize="2" two-way/> -->



- There is a one-to-one correspondence between a $|\text{Ket}\rangle$ and $\langle\text{Bra}|$.
- Any one of these can be used to define the quantum state.
- Its easy to see that they are conjugate of each other: $\qquad\Large\langle \psi|^\dagger = (|\psi\rangle^\dagger)^\dagger = |\psi\rangle$



<!--
To actually calculate these journeys, we use vectors.


Let's define a few terms.


First, we have the "Ket". This is what we've been using so far. It's simply a column vector that represents our quantum state.


Second, we have its mirror image: the "Bra". This is a row vector. To get a Bra, you just take your Ket, lay it flat, and flip the sign on any imaginary numbers.


There is a perfect one-to-one match between every Bra and Ket.


You can think of them like matching puzzle pieces.


And they are conjugates of each other. But why do we need both? We need them so they can snap together to do math.
-->

---

# Inner Product

<Grid cols="2" gap="1">
<Banner title="Inner Product" class="text-sm" v-click="1">

 It is analogous to dot product of two ordinary vectors. <br>  If $|\psi\rangle = \begin{pmatrix}a_1\\ a_2\end{pmatrix}$, and $|\phi\rangle = \begin{pmatrix}b_1\\ b_2\end{pmatrix}$, the inner product $\langle \phi|\psi\rangle$ is defined as:



<v-click >
<div class="translate-y-2 p-1.3">

$$\langle\phi|\psi\rangle = \begin{pmatrix} b_1^* & b_2^* \end{pmatrix} \begin{pmatrix}a_1\\ a_2\end{pmatrix} = b_1^* a_1 + b_2^* a_2$$

</div>


<div class="absolute translate-x-60 -translate-y-22 text-red-600" v-click>

**Note**: $\langle\phi|\psi\rangle = \langle\psi|\phi\rangle^*$
</div>

</Banner>

<Banner title="Norm" class="text-sm" v-click="5">



The **Norm** of a state represents it's length, and is computed as the inner product of the state with itself:

$$
\begin{align*}
  
|\langle \psi|\psi\rangle| &= \sqrt{\langle \psi|\psi\rangle} = 
\sqrt{\begin{pmatrix} a_1^* & a_2^* \end{pmatrix} \begin{pmatrix}a_1\\ a_2\end{pmatrix}}\\
 \lVert\psi\rangle\rVert &= \sqrt{a_1^* a_1 + a_2^* a_2} = \sqrt{|a_1|^2 + |a_2|^2}
\end{align*}
$$



</Banner>
</Grid>



- The usual dot product, defines the angle between two vectors. The inner product defines the angle between the state vectors. This angle is interpeted as probabilistic overlap, as opposed to directional overlap.

$$
\text{Usual vectors:} \quad \theta = \cos^{-1}{\left(\frac{a\cdot b}{|a||b|}\right)}\quad
\text{State vectors:} \quad \theta = \cos^{-1}{\left(\frac{|\langle \phi|\psi\rangle|}{\lVert\phi\rangle\rVert\lVert\psi\rangle\rVert}\right)}
$$





- $\langle\phi|\psi\rangle = 0$ means the two states are **orthogonal** in sense of angle ($\theta = \pi/2$). In terms of probability, it means that these states are mutually exclusive. — e.g. $\langle 0|1\rangle = 0$.



<!--
When you snap a Bra and a Ket together, you get the Inner Product.


If you remember classical physics, this is exactly like taking the dot product of two arrows.


You just line up the row vector and the column vector...


...and multiply them together to get a single number.


(Note that the order matters here!)


We use this Inner Product for two big things. First, the "Norm".


If you take the inner product of a state with itself, you get its total length. Because probability must equal 100%, the length of a valid quantum state is always exactly 1.


Second, if you take the inner product of two different states, you find their angle. But in quantum mechanics, this angle isn't just physical space—it's a measure of probability overlap.


If the inner product is exactly zero, the states are orthogonal. That means they are mutually exclusive. If you are at the North Pole, there is a zero percent chance you are also at the South Pole.
-->

---

# Quantum Operators



- Once we define a qubit as a **complex vector** $\vert\psi\rangle$, we need a way to model physical changes.
- Any physical process evolving a qubit from state $\vert\psi\rangle$ to a new state $\vert\psi'\rangle$ is modeled as a **Linear Operator** $\hat{A}$.
- In practice, an operator is just a square matrix. It multiplies our state vector: $\vert\psi'\rangle = \hat{A}\vert\psi\rangle$
- For a single qubit, these linear operators are represented simply as $2\times 2$ complex matrices.



<!-- Footnote or warning 
<div v-click="4" class="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded text-sm text-orange-400">
  ⚠️ <strong>Important Distinction:</strong> This applies to undisturbed physical evolution (like logic gates). Measurement is a special, non-unitary operation that we will cover next.
</div>
-->

<Banner title="The Adjoint Operator" class="max-w-200 mx-auto" v-click>

If an operator $A$ acts on a column vector, its **adjoint** (or Hermitian conjugate) $A^\dagger$ is the operator that acts on the row vector.

</Banner>

<Grid cols="3-1" gap="1">

<div>


- **The Matrix Recipe:** Flip the matrix over its diagonal (transpose) and change the sign of all imaginary numbers (complex conjugate).


<br>


- **The "Bra-Ket" Action:** When moving an operator from a Ket to a Bra inside an inner product, it converts into its adjoint:


</div>

<div>
<br>
<div v-click="6">

$$A^\dagger = (A^T)^*\quad\text{or} A^\dagger_{ij} = A_{ji}^*$$

</div>
<br>
<div v-click="7">

$$\langle\phi \vert \big( A\vert\psi\rangle \big) = \big(\langle\phi\vert A \big) \vert\psi\rangle = \langle A^\dagger\phi \vert\psi\rangle$$
</div>

</div>
</Grid>

<!--
Okay, so we have our state vectors. But how do we actually do computing? We need a way to change the states.


For that, we use Quantum Operators.


Whenever you physically change a qubit—like applying a logic gate—you are applying a Linear Operator.


Mathematically, an operator is just a matrix. You multiply your state vector by this matrix, and it spits out a new state vector.


For a single qubit, this is just a standard 2-by-2 grid of complex numbers.


And just like our vectors had a mirror image, operators do too, called the Adjoint.


To find it, you just flip the matrix diagonally and change the signs on the imaginary numbers.




This Adjoint lets us easily shift our operators back and forth between our Bra and Ket puzzle pieces when we are doing calculations.
-->

---

# Operators in Action



- What does a matrix actually do to a state vector? 



<Banner title="Geometric Action" class="-my-4" v-click="2">

<div v-click>

In a complex vector space, a general operator $\hat{A}$ transforms a state by doing three things:

</div>




- **Scaling:** Stretching or shrinking the vector's magnitude.




- **Rotating:** Shifting the physical direction of the state.




- **Phase Shifting:** Twisting the components into the complex plane.



</Banner>

<div class="text-ml my-2">



Let's apply a general operator $\hat{A} = \begin{pmatrix} 2 & 0 \\ 0 & i \end{pmatrix}$ to a balanced qubit state $\vert\psi\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.





$$
|\psi'\rangle = \hat{A}\vert\psi\rangle = \frac{1}{\sqrt{2}} \begin{pmatrix} 2 & 0 \\ 0 & i \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}} \begin{pmatrix} 2 \\ i \end{pmatrix} = \sqrt{2}\vert0\rangle + \frac{i}{\sqrt{2}}\vert1\rangle
$$




* **1. Scale:** The overall vector length is no longer 1, but stretched to $1 \to \sqrt{2.5}$.
* **2. Rotation:** The relative balance between $\vert0\rangle$ and $\vert1\rangle$ changed, and is higher towards $\vert0\rangle$ axis ($2$ vs $1$).
* **3. Phase Twist:** The $\vert1\rangle$ component gained an $i$ factor ($e^{i\pi/2}$), or $90^\circ$ into the complex plane relative to $\vert0\rangle$.


</div>

<!--
But what does multiplying a matrix actually look like in reality?



When an operator hits a quantum state, it can do three things simultaneously.


First, it can Scale: stretching or shrinking the vector.


Second, it can Rotate: physically changing the direction it points on the Bloch sphere.


And third, Phase Shifting: twisting the state into the complex plane.


Let's look at a quick example. Here is a matrix with a 2 and an 'i'. Let's apply it to a balanced qubit.


When we multiply them together, we get a new state. Let's decode what happened.


First, Scaling: The total length stretched.


Second, Rotation: The top number is now larger than the bottom, meaning the state rotated closer to the North pole.


Third, Phase Twist: The bottom number picked up an 'i', meaning the state twisted 90 degrees around the sphere's equator.
-->

---

# Special directions & states

<Grid cols="2" gap="2">
<Banner title="✨ The Special Exception">



For any operator, there exist privileged, "anchor" directions called **Eigenvectors** (or Eigenstates).





When an operator acts on its own eigenvector:





- It **cannot** rotate it.
- It **cannot** twist its relative phase.
- It **only** scales its magnitude.


</Banner>

<div>



<Box title="The Eigenvalue Equation" type="error" class="m-auto" v-click>
Mathematically, eigenvalues and eigenvectors are defined by following equation.

$$\hat{A} \vert \psi \rangle = \lambda \vert \psi \rangle$$

</Box>

</div>
</Grid>



- **$\vert \psi \rangle$ is the Eigenvector:** The specific state whose physical direction remains completely unchanged by the operator $\hat{A}$.
- **$\lambda$ is the Eigenvalue:** A simple scaler number (complex or real) that represents the exact factor by which the vector was stretched.
- **The Quantum Connection:** 
  When you measure a physical property (like spin), the system **collapses** into one of $\hat{A}$'s eigenvectors ($\vert \psi \rangle$), and the instrument reads out its corresponding eigenvalue ($\lambda$).



<!--
Now, there is a magical exception to this.


For every operator, there are specific, privileged directions called Eigenvectors, or Eigenstates.


When an operator hits its own eigenvector...


It completely fails to rotate it.


It fails to twist its phase.


It can only scale its length. It acts like an anchor.


Mathematically, we write this as the Eigenvalue equation.


The vector is the anchor state.


And Lambda, the eigenvalue, is just the simple number it gets stretched by.


Why do we care? Because this is the secret to reality. When you measure a quantum system, it doesn't just pick a random direction. It always collapses into one of the measurement instrument's specific eigenvectors, and it spits out the eigenvalue onto the scientist's screen.
-->

---

# Special Operators



- There are two special types of operators we use frequently in quantum science and computing.
- **Hermitian** or Self Adoint operators
- **Unitary**, probability preserving operators.



<Grid cols="2" gap="4" class="mt-4">

<Banner title="Hermitian Operators: Measurements" type="warning" v-click="2">



- They satisfy $H^\dagger = H$, which mathematically forces all of their outputs to be **real** numbers.

- Every physical **quantum measurement** or detector screen is represented by a Hermitian matrix.

- Because their outputs are real, they translate abstract math into readable laboratory metrics.




</Banner>

<Banner title="Unitary Operators: Gates" v-click="3">



- They satisfy $U^\dagger U = I$, preserving the total $100\%$ probability length of state vectors.
- All physical **quantum gates** or timeline actions are mathematically represented by unitary matrices.
- Because they conserve probability, these gate transformations can always be reversed in time.



</Banner>

</Grid>

<!--
In quantum computing, there are two VIP operators that run the whole show.


Hermitian operators, and Unitary operators.



Hermitian operators represent our physical measurements.


They are mathematically restricted so that they only spit out real numbers.


This is crucial. You can't read an imaginary number off a computer monitor in a lab. Hermitian matrices force the abstract math to translate into a real-world, readable metric.



Unitary operators represent our Quantum Gates.


They are mathematically restricted to preserve probability at exactly 100%. They never stretch the vector, they only rotate it.


Because no probability is lost, Unitary operations are perfectly reversible. You can always rewind your quantum code.
-->

---

# Quantum Measurement

### Measurement Basis


- To measure a quantum system, we use a Hermitian operator $\hat{A}$ representing an observable measurement.

- **The Outcomes:** The operator's eigenvalues ($a_1, a_2, a_3..$) are the only valid physical results we can read out.

- **The Basis:** The corresponding eigenvectors ($|a_1\rangle, |a_2\rangle, |a_3\rangle,..$) form an **orthonormal basis** ($\langle a_i|a_j\rangle = \delta_{ij}$).

- **The Superposition:** Before we look, the system exists as a blend of all possibilities:
    $$|\psi\rangle = \alpha_1|a_1\rangle + \alpha_2|a_2\rangle + \alpha_3|a_3\rangle\dots$$



<span class="inline-box font-bold" v-click>💥 The Act of Observation</span> <span v-click>When a measurement is performed, two things happen instantly:</span>



- **1. Born's Rule:** The probability of getting outcome $a_i$ depends strictly on the state's overlap with that basis vector:
  $$P(a_i) = |\langle a_i|\psi\rangle|^2 = |\alpha_i|^2$$
- **2. Wavefunction Collapse:** The system abruptly forces itself into that single state $|a_i\rangle$. All other branches vanish.



<!--
Let's pull all of this together and see how a measurement actually works.


To measure something, we pick a Hermitian operator.


The eigenvalues it spits out are our actual, readable outcomes.


The eigenvectors form our distinct choices—like Up and Down.


Before we look, the qubit exists as a fluid superposition of all these choices.


But the instant we make an observation...


First, Born's Rule kicks in. The universe squares our weights to calculate the exact probability of each outcome.


Second, the Wavefunction Collapses. The qubit snaps instantly into a single state, and every other possibility vanishes.
-->

---

# Demystifying Quantum Computation

- Quantum computing strips away the complex physics and treats this measurement framework as a programmable architecture.



- **The Qubit Baseline:** If a system has exactly two measurement outcomes, we call its vectors the **computational basis**, labeled simply as $|0\rangle$ and $|1\rangle$.
- **The Hardware Pipeline:** A quantum program follows three strict, mechanical phases:


<div class="mx-auto my-auto"> 

<span class="inline-box py-3" v-click>$\left[\text{Prepare}~|0\rangle\right]\quad\longrightarrow$</span> <span class="inline-box py-3" v-click>$\left[\text{Apply Unitary Gates}~(U_1, U_2, U_3)\right]\longrightarrow$</span> <span class="inline-box py-3" v-click>$\left[\text{Measure Result}\right]$</span>

</div>



- **The Mathematical Flow:** We start at $|0\rangle$, apply a cascade of rotation matrices, and produce a final engineered state $|\psi\rangle$:
$$|\psi\rangle = (U_n \dots U_3 U_2 U_1)|0\rangle$$



<Banner title="🎯 What is a Quantum Algorithm?" v-click class="-mt-6">

It is the art of choosing a specific sequence of unitary matrices ($U_i$) such that constructive interference boosts the probability ($|\alpha_i|^2$) of the <em>correct answer</em>, making it the most likely outcome to collapse upon measurement.

</Banner>

<!--
If you understand this, you understand the core mechanics of Quantum Computing.


We strip away all the messy lab physics and treat this as a programmable software architecture.


Our baseline is a two-outcome system: states 0 and 1.


Every single quantum program follows the exact same three-step pipeline:


Step 1: We prepare our qubits, usually setting them all to State 0.


Step 2: We apply our Unitary Gates—our code—which smoothly rotates the states around the Bloch Sphere.


Step 3: We perform a Measurement, collapsing the fluid state into a hard, classical answer.


Mathematically, it's just multiplying a starting vector by a long string of matrices.


So, what is a quantum algorithm? It is the delicate art of picking the perfect sequence of rotations, so that the right answer constructively interferes and becomes the brightest, most probable outcome when the wave finally collapses.

Here is the narration script for slides 31 through 40, concluding your presentation.
-->

---

# Quantum Operation



- Say a qubit is initially in state $|\psi\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle$.
- When an external factor affect a system, we track the change by multiplying the Operator: $U|\psi\rangle$.
- For a sequence of three actions, the final state is calculated as: $|\text{OUT}\rangle = U_3 \cdot U_2 \cdot U_1 \cdot |\psi\rangle$.



<!-- PHYSICAL FLOW TIMELINE MAP -->
<div class="max-w-3xl mx-auto mt-4 border-0 border-gray-700/20 pt-4 select-none flex flex-col items-center -translate-y-6" v-click>
  
<span class="px-2 py-1 rounded border border-gray-500/40 font-bold text-gray-400"> Initial State $|\psi\rangle$ </span>
<span class="text-purple-400 font-bold">➔</span>
<span class="px-2 py-1 rounded border border-red-500/40 font-bold text-red-400">[ Action 1: $U_1$ ]</span>
<span class="text-purple-400 font-bold">➔</span>
<span class="px-2 py-1 rounded border border-green-500/40 font-bold text-green-400">[ Action 2: $U_2$ ]</span>
<span class="text-purple-400 font-bold">➔</span>
<span class="px-2 py-1 rounded border border-blue-500/40 font-bold text-blue-400">[ Action 3: $U_3$ ]</span>
<span class="text-purple-400 font-bold">➔</span>
<span class="px-2 py-1 rounded border border-purple-500 font-bold text-purple-400">Final State $|\text{OUT}\rangle$</span>

</div>

<Grid cols="2" gap="4" class="mt-2">

<Banner title="The Mathematical View" class="text-sm" v-click="5">



- Operations are applied as successive matrix multiplication on state vector.
- The state vector is modified by $U_1$ first, yielding $U_1|\psi\rangle$.
- Next, $U_2$ acts on the resulting state from the left side 
  $$U_2 (U_1|\psi\rangle) = U_2U_1|\psi\rangle$$
- Then $U_3$ acts on the resulting state from the left side 
  $$U3 (U_2 U_1|\psi\rangle) = U_3U_2U_1|\psi\rangle$$


</Banner>

<Banner title="The Physical Interpretation" type="warning" class="text-sm" v-click="9">



- Each operator acts as a local physical manipulation environment.

- It could represent a particle passing through three successive magnets.

- It could also represent a single qubit hit by three timed radar pulses.

- The compound effect steers the probability weights across space.


</Banner>

</Grid>

<!--
So, let's look at how we string these operations together to actually build a program.


We start with an initial qubit state.


When we want to change that state—like hitting it with a laser pulse or a magnetic field—we multiply our state by an Operator.


If we want to apply three actions in a row, we just multiply by three operators.



But here is a quirk of the math: we write these matrix multiplications from right to left.


So, Action 1, which we'll call U1, gets written closest to the starting state.


Then Action 2, U2, multiplies from the left side.


And finally Action 3, U3, hits it again from the left.



Physically, you can think of this as a particle flying out of an oven and passing through three successive magnets.


Or, it could be a single stationary atom being zapped by three precisely timed microwave pulses.


Each operator steers the probability of the atom, guiding it toward our desired outcome.
-->

---

# Quantum operation vs. Quantum Circuits

<div class="text-4">



- Recall how successive operators apply on a state from **right to left**, closest to the starting state vector $|\psi\rangle$.
- A quantum circuit, is a visual layout, where we replace the equations with clean, horizontal flow or wire grids.
- The Unitary operators applied on the state are visualised as **gates**.
- Let's look at how a three-step algorithmic chain maps across these two alternative views.


</div>

<Grid cols="3-2" gap="2" class="mt-4">

<Banner title="The Equation View" class="text-sm -translate-y-3" v-click="5">

- Operations are ordered as nested functions, reading right to left:

$$\lvert\text{OUT}\rangle = U_3 \cdot U_2 \cdot U_1 \cdot \lvert\psi\rangle$$

- The state vector is modified by $U_1$, then $U_2$, and finally $U_3$.

- While compact, tracking long chains of text quickly becomes a dense reading bottleneck.
- A measurement involves computing the overlap of the modified state with initial one.
$$\langle\psi|\text{OUT}\rangle = \langle\psi|U_3 \cdot U_2 \cdot U_1 \cdot \lvert\psi\rangle$$
- The measured outcomes is the squared magnitude: $|\langle\psi|\text{OUT}\rangle|^2$
</Banner>

<Banner title="The Circuit View" class="text-sm" type="warning" v-click="6">

- We compress this exact sequence into a single timeline wire flowing left to right:

<div class="my-4">
  <QuantumCircuit :qubits="1" gates="U1:0, U2:0, U3:0, M:0" scale="1.5" />
</div>

- The line represents the timeline, and each block maps to an action in the lab.
- This format allows us to read complex cascades sequentially without tracking formulas.

</Banner>

</Grid>

<!--
While that math is exact, reading long chains of matrix equations right-to-left gets really tedious, really fast.







So, in quantum computing, we translate this right-to-left mathematical view into a much cleaner visual layout called a Quantum Circuit.


Instead of dense equations...


...we draw a wire moving from left to right, representing the timeline.


Our Unitary operators are drawn as "Gates" placed on that wire in the exact order they happen. The measurement at the end is drawn as a little meter symbol.


This circuit view means you can read a complex quantum algorithm just like reading a piece of sheet music, without having to do any matrix multiplication in your head.
-->

---
layout: section
---

# Single qubit Gates

<!--
Now that we have our sheet music, let's look at the basic notes we can play. Let's look at the most common single-qubit gates.
-->

---

# Hadamard Gate

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="Hadamard (Superposition)" class="scale-100" v-click>

- Blends the basis states into a balanced, equal probability configuration.
- Acts as a symmetric reflection operator to create or undo splits:

$$H = \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}, \quad H\lvert0\rangle = \lvert+\rangle, \quad H\lvert1\rangle = \lvert-\rangle$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="H:0" scale="1.5" />
</Box>



- The primary tool used to boot up **quantum parallelism** inside an algorithm.
- Physically maps the poles of your state sphere straight down onto the equator.
- It transforms a fixed deterministic switch into an active probability wave.



</Grid>

<!--
Next is the Hadamard Gate, arguably the most important gate in quantum computing.


This is the gate that creates superposition. If you feed it a rigid State 0, it blends it into a perfectly balanced 50/50 probability wave.




On the Bloch sphere, it grabs the North Pole and pulls it directly down onto the equator.


This is the spark of quantum parallelism. It takes a boring, deterministic bit and turns it into an active quantum state that explores multiple paths at once.
-->

---

# Pauli-X Gate

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="Pauli-X (Bit Flip)" class="scale-100" v-click>

- Swaps the basis states completely: $\lvert0\rangle \leftrightarrow \lvert1\rangle$.
- Inverts the probability weights of your single-column state vector:

$$X = \begin{pmatrix}0&1\\1&0\end{pmatrix}, \quad X\begin{pmatrix}\alpha\\\beta\end{pmatrix} = \begin{pmatrix}\beta\\\alpha\end{pmatrix}$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="X:0" scale="1.5" />
</Box>
</Grid>



- The physical analogue of a classical **NOT gate** or digital bit-flip operation.
- In the laboratory, it acts as a perfect $\pi$ rotation directly around the $X$-axis.
- It is primarily used to initialize registers or flip target control channels.



<!--
First up is the Pauli-X Gate.


This is the closest thing we have to a classical NOT gate. It is a straight bit-flip. It completely swaps State 0 and State 1.


If you look at the matrix math, it simply inverts the top and bottom numbers of your state vector.



Physically, on the Bloch Sphere, this is a 180-degree rotation straight over the top.


We usually use this at the beginning of a program to flip a qubit from zero to one so we have something to work with.
-->


---

# Pauli-Y Gate

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="Pauli-Y (Bit and Phase Flip)" class="scale-100" v-click>

- Applies a simultaneous bit flip and a complex phase twist.
- Inverts the probability weights and multiplies by the imaginary unit $i$:

$$Y = \begin{pmatrix}0&-i\\i&0\end{pmatrix}, \quad Y\begin{pmatrix}\alpha\\\beta\end{pmatrix} = \begin{pmatrix}-i\beta\\i\alpha\end{pmatrix}$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="Y:0" scale="1.5" />
</Box>

</Grid>



- It is mathematically equivalent to combining both the $X$ and $Z$ gates into a single operation.
- In the laboratory, it acts as a perfect $\pi$ rotation directly around the $Y$-axis on the Bloch sphere.
- It takes states lying on the standard $X$-$Z$ plane and twists them out into the complex $Y$ dimension.



<!--
Now, we can't talk about the X and Z gates without mentioning the third member of that trio: the Pauli-Y gate.


Think of the Y gate as the ultimate multitasker. It applies a bit flip AND a phase flip at the exact same time.



Because it involves that phase flip, it injects the imaginary unit 'i' directly into our state vectors.




If you look at our Bloch sphere globe, the Y axis is the one pointing straight out of the screen at you. The Y gate is a perfect 180-degree spin around that specific axis. It takes standard, real-number states and completely twists them into the complex plane.
-->

---

# Pauli-Z Gate

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="Pauli-Z (Phase Flip)" class="scale-100" v-click>

- Flips the relative sign of the target state: $\lvert1\rangle \rightarrow -\lvert1\rangle$.
- Negates the complex amplitude of the lower vector coefficient slot:

$$Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}, \quad Z\begin{pmatrix}\alpha\\\beta\end{pmatrix} = \begin{pmatrix}\alpha\\-\beta\end{pmatrix}$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="Z:0" scale="1.5" />
</Box>

</Grid>



- Reverses the internal timing alignment without changing the raw probability.
- In the laboratory, it triggers a clean $\pi$ rotation right around the vertical $Z$-axis.
- Essential for controlling interference patterns and marking correct search options.



<!--
Next, we have the Pauli-Z Gate.


This is called a Phase Flip. It doesn't change the physical probabilities—if it was a 50/50 split before, it stays a 50/50 split. But it flips the mathematical sign on State 1.




On our globe, this is a 180-degree horizontal spin right around the equator.


This internal phase shift is absolutely vital for setting up interference patterns later in an algorithm, allowing us to cancel out wrong answers.
-->

---

# S Gate

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="S Gate (Quarter Turn)" class="scale-100" v-click>

- Advances the complex phase angle of the $\lvert1\rangle$ component by exactly $90^{\circ}$.
- Injects the imaginary unit coefficient into the matrix equation:

$$S = \begin{pmatrix}1&0\\0&i\end{pmatrix}, \quad S\lvert+\rangle = \lvert+i\rangle$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="S:0" scale="1.5" />
</Box>

</Grid>



- Known as the **Phase Gate**, it acts as the exact mathematical square root of $Z$.
- Performs a fractional $\pi/2$ horizontal rotation across the equatorial map.
- Used to shift vectors between the standard $X$-basis and the complex $Y$-basis.



<!--
Next is the S Gate.


If the Z-gate was a 180-degree spin around the equator, the S Gate is exactly half of that: a 90-degree quarter turn.


Because it stops halfway, it injects an imaginary number—an 'i'—into our state vector.




It is literally the mathematical square root of the Z-Gate.


It shifts our states smoothly between the standard real axes and the complex imaginary axes on our sphere.
-->

---

# T Gate

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="T Gate (Eighth Turn)" class="scale-100" v-click>

- Advances the phase angle of the $\lvert1\rangle$ component by exactly $45^{\circ}$.
- Introduces an Euler exponent multiplier into the complex matrix:

$$T = \begin{pmatrix}1&0\\0&e^{i\pi/4}\end{pmatrix}, \quad T^2 = S, \quad T^4 = Z$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="T:0" scale="1.5" />
</Box>

</Grid>



- Known as the $\pi/8$ gate, it acts as the mathematical square root of $S$.
- Performs an incremental $\pi/4$ rotation around the vertical tracking line.
- Absolutely critical for building universal fault-tolerant computation compilers.



<!--
Finally, we have the T Gate.


This goes one step smaller. It is an eighth of a turn, advancing the phase by exactly 45 degrees.




It is the square root of the S Gate.



While a 45-degree rotation might sound arbitrary, it is incredibly important. Without the T Gate, you cannot build a universal quantum computer capable of running complex, error-corrected algorithms. It is the final piece of our basic toolkit.
-->

---

# Rotation Gates (Rx, Ry, Rz)

<Grid cols="3-1" gap="4" class="translate-y-0">

<Banner title="Continuous Rotations" class="scale-100" v-click>

- Allows for arbitrary, fine-tuned rotations by a custom angle $\theta$.
- Generalizes the fixed flips into smooth, continuous matrix functions:

$$R_x(\theta) = \begin{pmatrix}\cos(\tfrac{\theta}{2})&-i\sin(\tfrac{\theta}{2})\\-i\sin(\tfrac{\theta}{2})&\cos(\tfrac{\theta}{2})\end{pmatrix}$$

</Banner>

<Box class="max-w-40">
  <QuantumCircuit :qubits="1" gates="Rx:0" scale="1.5" />
</Box>

</Grid>



- Unlike the Pauli gates which are strict $180^{\circ}$ flips, these act as continuous tuning dials.
- We can define independent $R_x, R_y,$ and $R_z$ gates for all three spatial dimensions.
- Absolutely essential for variational quantum algorithms, where angles are updated continuously by an optimizer.



<!--
Up until now, every gate we've looked at has been fixed. A 180-degree flip, a 90-degree turn, a 45-degree turn. But what if you want to rotate your state by exactly 12 degrees?


For that, we use Parameterized Rotation Gates—specifically Rx, Ry, and Rz.


Instead of fixed numbers, these matrices use sine and cosine functions that accept any custom angle, which we call Theta.




Instead of a strict light switch, think of these as smooth volume dials. You can dial in the exact orientation you want along any of the three axes.


While we won't dive too deep into them today, these continuous dials are the secret sauce behind modern quantum machine learning, where classical computers constantly tweak these angles to find the best possible algorithmic answers.
-->

---
transition: fade-out
---

# Wrap up

<Grid cols="2" gap="2">

<Banner title="Summary" type="warning" v-click>

- Recap of Classical vs Quantum
- Stern Gerlach Experiment
- Quantum state
- Superposition
- The maths of qubits 
- State Vector, Basis, Linear Operators
- Linear combination, Inner product
- Quantum operations
- Quantum measurement
- Quantum computing workflow
- Single qubit gates 

</Banner>

<Banner title="Learning outcome" type="success" class="text-lg" v-click>
<br>

- Understanding a quantum state

<br>

- Visualising quantum state

<br>

- Operations on quantum state

<br>

- Single qubit gates

<br>

- Quantum computing workflow

</Banner>
</Grid>

<Banner class="-translate-y-3" v-click>

In the next lecture we expand to quantum system of multiple qubits.

</Banner>

<!--
Let's wrap up what we've covered today.


We took a massive leap today. We moved from the classical world of rigid bits into the quantum world of fluid probabilities. We looked at the Stern Gerlach experiment to prove that quantum states are real, and we learned how to map those states using vectors, complex numbers, and the Bloch Sphere. We then built a framework for operating on these states using Unitary matrices, and we looked at the fundamental gates that make up a quantum circuit.


You now have the mathematical and visual vocabulary to understand what a qubit is, how we manipulate it, and the basic workflow of a quantum program.


In our next lecture, we are going to take these individual qubits and link them together to explore entanglement and multi-qubit systems.
-->

---
layout: section
transition: fade-out
---

# Thank you

<!--
Thank you for your time, and I'll see you in the next session!
-->

## Introduction
In classical computing, which we usually call just computing, we transform or map every mathematical problem into a sequence of tasks, which is performed by computer, and towards the end, we get the desired result. These sequences of tasks, are what we call algorithms, consists of an exact sequence of simpler tasks that can be understood by computer. When this exact sequence is expressed in a way that computer understand, we call it a computer program. To understand, and organise well, the algorithms are often broken down to smallest possible building blocks. We  will discuss some of these building blocks now, and see how the role of bits comes into play.



## [References](#reference)

The following references are optional reading material:
1. The following chapters of the textbook Introduction to Classical and Quantum Computing([pdf](https://www.thomaswong.net/introduction-to-classical-and-quantum-computing-1e3p.pdf)) : 1.1, 1.2, 1.3, 2.2, 2.3, 2.6, 4.4
