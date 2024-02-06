
# Interim National HPC Service

This page describes the nature of the service being put in place to enable researchers maintain access to HPC resources as well as the high level migration plan in operation to migrate researchers to the new system.

```{dropdown} Background
ICHEC first presented its plan for the provision of compute sources from foreign sites (to be procured on a commercial basis) at its Board meeting of September 2022. These arrangements were deemed essential to ensure continuity of service to the research community.

After submitting a funding proposal to DFHERIS in order to purchase HPC compute services in May 2023, a tender was published in July seeking compute resources with a similar environment and user interface as that provided by Kay. Subsequently this contract was awarded in November to [LuxProvide](https://www.luxprovide.lu/) and their [Meluxina](https://www.luxprovide.lu/meluxina/) HPC platform.

All National HPC Service projects will eventually be hosted on this platform with a gradual migration of existing projects from Kay to it occurring through the first half of 2024. The migration of Class A projects was initiated in mid-December, with Class B to follow in January 2024 and Class C beginning in February 2024.  Kay will continue to run on an at-risk basis until June 2024 with a reduced number of compute nodes available. Here, at-risk means that because there is no longer any warranty or technical support covering the system by the hardware and software vendors, certain hardware component or software failures could potentially result in a sudden and permanent loss of service (as well as potentially loss of all data stored on the system).
```

# Kay vs Meluxina

Meluxina is actually a tier-0 machine, and as such has bigger and faster nodes.
It provides an opportunity to the users of our national service to access tier-0
system in the same project framework as their existing kay projects.

```{card} Meluxina Docs
Here we provide some quick references for users transitioning to meluxina, please refere to [Meluxina Docs](https://docs.lxp.lu/) for more details.
```

```{admonition} Quick Summary
- Similar to kay, there is a login node for meluxina `login.lxp.lu` where you `ssh` to. One noteworthy difference is that meluxina has the default ssh port 22 closed, and uses port 8822 for ssh. So you ssh command would be `ssh -p 8822 username@login.lxp.lu` .

- You are assigned a user name when your account is created on meluxina, so it's good idea to use $USER variable in your script rather than using your username.

- You might need to rethink in terms of taskfarming or resource management, if your HPC runs were optimized for 40 core nodes. For most people, this will not be an issue, but if it is, please do [contact us](./contact-us).

```

Below is a {ref}`Table <kay-lxp-comp>` of comparison between kay and meluxina machine, highlighting similarities and differences -



```{table} Table of Comparison of Kay vs Meluxina
:name: kay-lxp-comp
|Specs/features|kay|meluxina|
|:---:|:---:|:---:|
|Standard CPU nodes|Intel CPUs 40core per node|Amd CPUs 128core per node|
|Standard GPU nodes|2 x (NVidia V100 cards, 16GB) per node| 4 x (Nvidia A100 cards, 40GB) per node|
|Large Memory Nodes|||
|Hyperthreading| No |On demad per job|
|login access|`ssh user@kay.ichec.ie`|`ssh -p 8822 user@login.lxp.lu`|
|queue manager|Slurm [See link](https://www.ichec.ie/academic/national-hpc/kay-documentation/slurm-workload-manager)|Slurm [See link](https://docs.lxp.lu/first-steps/handling_jobs/)|
|Resource Consumption unit|CPU core hour|CPU/GPU Node hour|
|Popular slurm partitions|DevQ, ProdQ, LongQ, GpuQ, ...|cpu, gpu, fpga, largemem|
```

