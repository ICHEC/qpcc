(target)=interim-service
# Interim National HPC Service

This page describes the nature of the service being put in place to enable researchers maintain access to HPC resources following the closure of the Kay supercomputer. It also highlights the differences between the two systems and services as well as the high level migration plan in operation to migrate researchers to the new system.

```{dropdown} Background
ICHEC first presented its plan for the provision of compute sources from foreign sites (to be procured on a commercial basis) at its Board meeting of September 2022. These arrangements were deemed essential to ensure continuity of service to the research community.

After submitting a funding proposal to DFHERIS in order to purchase HPC compute services in May 2023, a tender was published in July seeking compute resources with a similar environment and user interface as that provided by Kay. Subsequently this contract was awarded in November to [LuxProvide](https://www.luxprovide.lu/) and their [Meluxina](https://www.luxprovide.lu/meluxina/) HPC platform.

All National HPC Service projects will eventually be hosted on this platform with a gradual migration of existing projects from Kay to it occurring through the first half of 2024. The migration of Class A projects was initiated in mid-December, with Class B to follow in January 2024 and Class C beginning in February 2024.  Kay will continue to run on an at-risk basis until June 2024 with a reduced number of compute nodes available. Here, at-risk means that because there is no longer any warranty or technical support covering the system by the hardware and software vendors, certain hardware component or software failures could potentially result in a sudden and permanent loss of service (as well as potentially loss of all data stored on the system).
```

## Quickstart

This provides some basic guidelines on getting started with the interim service on Meluxina, you should read this documentation first.

## Setting up an Account and Access

```{admonition} To become a user on Meluxina, you must:
:class: important

1. Register an ICHEC user account here if you don't already have one
2. Then you will need to do one of the following:
    i. Apply for your own National Service project (Paused until April 2024)
    ii. Join an existing project by requesting the PI of that project to contact the ICHEC helpdesk
3. ICHEC support staff then submit a request to LuxProvide  to create a user account on Meluxina for you and to add you to the relevant project
4. You will receive an email from LuxProvide with your Meluxina username (which will be different to you ICHEC one) and instructions on completing the user account setup.
5. You will need to register a SSH key via the LuxProvide helpdesk in order to be able to log in to Meluxina
```

```{mermaid}
:align: center
flowchart TD;

A(Do you have an account on ICHEC) --No--> B1(Register to create and ICHEC account)
A --Yes--> B2("Apply for your own National Service project (Paused till April 2024)
Or
Join an existing project by requesting the PI of that project")
B1 --> B2
B2 ---> C("ICHEC Support staff requests LuxProvide to create
a user account on Meluxina for you to add you on relevant project")
C ---> D("You get email from LuxProvide with your Meluxina Username
and instructions to create an account on them")
D ---> F("Register your ssh keys on Meluxina via the LuxProvide Helpdesk.
Follow further instructions below")

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
|Hyperthreading| No |On by default, changable per job|
|login access|`ssh user@kay.ichec.ie`|`ssh -p 8822 user@login.lxp.lu`|
|queue manager|Slurm [See link](https://www.ichec.ie/academic/national-hpc/kay-documentation/slurm-workload-manager)|Slurm [See link](https://docs.lxp.lu/first-steps/handling_jobs/)|
|Resource Consumption unit|CPU core hour|CPU/GPU Node hour|
|Popular slurm partitions|DevQ, ProdQ, LongQ, GpuQ, ...|cpu, gpu, fpga, largemem|
```


# Connecting to Meluxina

## SSH

```{note} All users must initially configure an SSH key to connect to Meluxina. Check out our tutorial - Setting up SSH Keys - for more details. As a new user, you will need to send your public key via the LuxProvide helpdesk as described in the onboarding email before you can connect.
```

```{warning}
Meluxina runs SSH on a non-standard port number 8822 for security reasons.

Your ssh client will need to explicitly specify port 8822 instead of relying on the default port 22.
Many university firewalls restrict outgoing connections to all but a few standard port numbers and
so you may need to request outbound access to login.lxp.lu on port 8822 in order to be able to connect.
```

```{note}
You will need to login using your Meluxina account username, not your ICHEC username. 
```

## Logging in

You can connect to Meluxina using a SSH client:

Unix-like systems, such as Linux, macOS, the SSH clients are usually pre-installed. You can access these through the Terminal (or any other command line interface).

```
ssh -p 8822 $USER@login.lxp.lu
```

Where `$USER` should be replaced by your username on Meluxina. For example, if your user name is u12345, then replace `$USER` in the code examples with u12345

```{note}
For **Windows**, you need to install a SSH client. We recommend MobaXterm.
```


## Finding your Project Name and Resource Allocations

The notion of project is very similar to that of Kay. Use the myquota command to list the node hour allocations and usage as well as disk storage quotas and usage for each of the projects you are a member of. Note that node hour allocations are made on a monthly basis. Projects names are of the form p200XXX.

### File Storage

Two locations are available for storing files on Meluxina

```yaml
Home: /home/users/$USER

Work: /project/home/$ProjectName
```

Where `$USER` is your username, and `$ProjectName` is name of the project assigned to you. The purpose of both `Home` and `Work` storage is explained through the table below.

```{table}
|Name| Home | Work|
|:---:|:---:|:---:|
|Purpose| Store personal file or source code| Store simulation data|
|Quota | Smaller Limit: 100GB| Larger Limit (see [Class Projects Limits](./national-service-projects.md))| 
|Access| Only to you| To all users in the project|
|Backup| No| No|
```

## Data Transfer

On Unix-like systems, you can use command line applications such as SCP or SFTP.

**Using SCP**

```bash
scp -P 8822 localFilePath $USER@login.lxp.lu:remoteFilePath
```

**Using SFTP**

```bash
sftp -P 8822 $USER@login.lxp.lu

put localFilePath
```

```{tip}
Note, that while using scp or sftp, the port option is given by captical `-P`, not small `-p`. 
```

On Windows, you can use graphical applications such as [WinSCP](https://winscp.net/eng/index.php).

## Software Packages

_Environment modules_ (or commonly known as modules) are used to organise all the software packages we provide on Meluxina including scientific applications, compilers and development libraries. To start using the package of interest, you should load the corresponding module (NOTE that modules and the associated application software are only accessible on compute nodes and not on the login nodes). You can list all the available modules on the system by running an interactive compute jobs and using:

```bash
module avail
```

Note that this can take up to 30 seconds when run the first time on a compute node.

To load the module:

```bash
module load GCC/12.3.0
```

To check the loaded modules in your environment:

```bash
module list
```

## Job Submission

As is standard on most HPC systems a batch system (SLURM) is used to allocate compute nodes to users. Please refer to {ref}`Slurm Workload Manager <slurm-workload-manager>`, and {ref}`Slurm Commands <slurm-commands>` pages for more detailed documentation.


To submit a job, create a submission script in a file named, say `mybatchjob.sh` using emacs, nano or vim with the following text as an example (for a MPI application):

```bash
#!/bin/sh 

#SBATCH --time=00:20:00
#SBATCH --nodes=1
#SBATCH -A {{myProjectID}}
#SBATCH -p cpu


module load GCC/12.3.0

mpirun mpi-benchmarks/src/IMB-MPI1
```

Submit the job using:

```bash
sbatch mybatchjob.sh
```

You can check the progress of any jobs you have submitted by using:

```bash
squeue
```

Need help?

If you get stuck, you can check our:

- FAQs
- Tutorials
- Software Guides
- Or alternatively, contact our [Helpdesk](https://www.ichec.ie/academic/national-hpc/user-support).


