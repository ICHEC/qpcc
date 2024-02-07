(slurm-workload-manager)=
# Slurm Workload Manager

The standard usage model for a HPC cluster is that you log into a front-end server or web portal and from there launch applications to run on one of more back-end servers. The software tool which manages this is called a workload manager or batch scheduler and the one used on Kay is the widely used [Slurm(https://slurm.schedmd.com/)] workload manager.

## Basic Usage

The typical way a user will interact with compute resources managed by a workload manager is as follows:

- Write a job script which describes the resources required (e.g how many CPUs and for how long), instructions such as where to print standard out and error, and the commands to run once the job starts.

- Submit the job to the workload manager which will then start the job once the requested resources are available.

- Once the job completes, the user will see all results as well as output that would normally appear on screen in previously specified files.

The two types of job commonly used are:

- **Interactive** : Request a set of nodes to run an interactive bash shell on. This is useful for quick tests and development work. These type of jobs should only be used with the DevQ queue. For example, the following command will submit an interactive job requesting 1 node for 1 hour to be charged to myproj_id:

```bash
srun -p DevQ -N 1 -A myproj_id -t 1:00:00 --pty bash
```
- **Batch** : A script is submitted for later execution whenever the requested resources are available. Both within this script and on the commandline when submitting the job, a set of constraints, required information and instructions are given. The file must be a shell script (i.e start with `#!/bin/sh`) and Slurm directives must be preceeded by `#SBATCH`. A sample script is displayed below which request 4 nodes (each with 40 cores) for 48 hours to run an MPI application and could be submitted using the command:

```bash
sbatch mybatchjob.sh
```

Where the file `mybatchjob.sh` looks like -

```bash
#!/bin/sh 

#SBATCH --time=00:20:00
#SBATCH --nodes=4
#SBATCH -A myproj_id

module load intel/2019


mpirun -np 80 ./a.out
```

(slurm-commands)=
# Slurm Commands

``````{admonition} Slurm informational command summary
:class: note

- `sinfo`: It lists all partition/queues and limits. Run `man sinfo` for more details about the command and further arguments.

- `squeue`: It lists all queued jobs. Run `man squeue` for more details about the command and further arguments, such as 
    - `squeue -u $USER` prints jobs by the $USER.
    - `squeue -j jobid` shows info about a particular job with job-id `jobid`.
    - `squeue --start` shows estimated start time of the job.
    - `squeue -A myproj_id` lists all jobs using specific account.
- `mybalance`: Lists summary of core hour balances of all of the users's account.
``````


``````{admonition} Slurm job commands
:class: tip
Below is a table of some of the common slurm commands used in running jobs.
``````

```{table}
|Command | 	Description| 	Example|
|:---:   | :---:        |:---:      |
|sbatch  | Submit job script| `sbatch myjob.sh` |
|  	     | submit script to use 5 nodes| `sbatch -N 5 myjob.sh`|
|  	     | submit job with dependency on successful completion of other jobs|`sbatch -d afterok:job_id[:jobid...] myjob.sh`
|scancel | Cancel job | `scancel <jobid>`|
|sattach | Attach terminal to standard output of running job (job step 0)|`sattach <jobid>.0`|
|scontrol| Prevent a queued job from running |`scontrol hold <jobid>`|
|  	     | release a job hold | `scontrol release <jobid>`|
|  	     | display detailed info about specific job| `scontrol show jobid <jobid>`|
|srun 	 | Run a parallel job (mostly within an allocation created with a job script)||
|  	     | run a 2 node interactive job for 30 minutes| `srun -N 2 -A myproj_id -t 00:30:00 -p DevQ --pty bash`|
|  	     | run an MPI application within a Slurm submit script (using all cores allocated on all nodes)| `srun -n $[$SLURM_JOB_NUM_NODES * 40] ./my_mpi_app`|
|  	     | run a Hybrid MPI/OpenMP application using 1 MPI process per node | `srun -n $SLURM_JOB_NUM_NODES --ntasks-per-node=1 ./my_hybrid_mpi_app`|
|  	     | run a command on a job already running. e.g. to find out the CPU/Memory usage |`srun --jobid <jobid> ps u`|
```


## Further Information

For detailed understanding of Slurm, please see the official website of [Slurm](https://slurm.schedmd.com/).
