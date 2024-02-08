
# National Service Projects

```{important}
During the migration of current projects to the Interim Service, between Feb 1 and April 1 2024 no new project applications will be accepted.
```
 

ICHEC's National Service provides three different project classes with differing resource allocations, review levels and review turnaround times. The selection of each class largely depends on the necessities and requirements of the research and applicant's objectives. Applicants should be aware that:

- Grant award details, where applicable, are recorded for applications.
- Where the grant holder is the PI and is a post-doc, only their name need appear on the applications.
- Where the grant holder is the principal of the research group but the applicant is a post-doc, (or research student) both names should appear on the application.
- Previously reviewed proposals, which have attracted major funding, should be explicitly flagged by grant details and PI name.
- Inexperienced post-grads, if primarily responsible for running project jobs may be required to visit and establish contact with ICHEC personnel, to ensure efficient methodology and best use of resources. Alternatively, they are encouraged to gain experience on Class C projects. The aim should be to encourage student participation, but also good practice.

Ahead of new proposal submission and in accordance with the ICHEC [Acceptable Usage Policy](https://www.ichec.ie/academic/national-hpc/acceptable-usage-policy), applicants should notify ICHEC of all publications arising out of work completed with the help of ICHEC from past projects. Simply email the [Helpdesk](support@ichec.ie) with the publication reference and link to the online version.

## Project Classes
### 1. Class C project: Discovery

Class C projects are intended to provide fast access to modest resources with less review overhead. They have multiple possible uses including:

- Introductory access for inexperienced HPC users
- Exploratory access for researchers who need to develop, port, optimise or benchmark codes
- Easier access for users planning small scale runs with very modest requirements

Class C project applicants should note that the maximum resource levels are modest and will be exhausted very quickly if larger scale runs are performed.

#### Resources and Considerations

```yaml
Max. CPU:       100,000 h 
Max. Storage:   250 GB
Max. Duration:  12 months 
Max. Review:    1 week
Proposal:       2-3 pages.
Applicants:     Group Leader/Professor/Lecturer/Post-doc/Graduate Student
```
 
#### Detailed Project Proposal

- Context and Outcome: How does your proposal fit within your research discipline and in what ways will it contribute to the global advancement of science? 
- Methodology: Explain what methodology are you planning to use. Specify the packages, compilers, libraries, etc, to be used. 
- Justification: Explain how many runs you intend to carry out, their memory requirements, expected run-times, on how many CPUs. In case of pure explorative projects and inexperience users a tentative data would be useful but not compulsory.

 

### 2. Class B project: Regular

Class B projects are intended for the needs of the majority of the research community. Typically applicants will be small research groups or individual researchers. Successful applications are expected to lead to referred publications.

No more than 3 concurrent Class B projects from any one PI will be supported. In the case of multiple projects and periods of high contention, the burn rate for all of a PI's projects may be monitored and controlled.

#### Resources and Considerations

```yaml
Max. CPU:       1,000,000 h 
Max. Storage:   2000 GB
Max. Duration:  18 months 
Max. Review:    8 weeks
Proposal:       4-5 pages.
Applicants:     Group Leader/Professor/Lecturer/Post-doc
```

#### Detailed Project Proposal

- Context and Outcome: How does your proposal fit within your research discipline and in what ways will it contribute to the global advancement of science? 
- Methodology: Explain what methodology are you planning to use. Specify the packages, compilers, libraries, etc, to be used. 
- Justification: Explain how many runs you intend to carry out, their memory requirements, expected run-times, on how many CPUs. 
- Scalability: The applicant must provide a scalability study to justify the choice of resources for the particular softwares that he/she is intending to use on Kay for this application.
- Workplan: Applicants are required to provide a short workplan and utilisation profile. This will assist us in determining the likely demand over time and tune our scheduling policies to optimise usage of our resources. Applicants must also specify the number and type of staff who will be undertaking the research described in the proposal (PhD students, post-docs, PI in person). Failure to provide either will result in the application being held back until such information has been provided.
- List of Relevant Publications: Applicants should include a list of relevant publications (no more than ten) at the end of their proposal.
- Short Biographies: Applicants should include short descriptions of research positions and successful uses of previous resource awards.


### 3. Class A project: High Impact

Class A projects are intended for consortia concerned with high impact problems. These groups will require resources representing a substantial fraction of the centre's resources over a long period of time. Successful applications are expected to yield high-impact scientific publications.

Class A project project applicants are expected to have a good knowledge of the characteristics of the code(s) which they intend to use - such as scalability properties - before writing their proposal. For this reason, applicants who are not in such a position are advised to first apply for an exploratory Class C project in order to undertake a basic scalability and performance study. Such an exercise is essential to provide an accurate estimate and a proper justification of the resources requested. If you intend to use packages supported by ICHEC, you may contact us via the [Helpdesk](https://www.ichec.ie/academic/national-hpc/user-support) as we can assist you in this task.

A 'light touch' interim project report and material for inclusion in ICHEC annual reports may be requested as a requirement for continued resourcing. A more substantive report again for inclusion in annual reports may be requested at the end of a project.

#### Resources and Considerations

```yaml
Max. CPU:       10,000,000 h 
Max. Storage:   5000 GB
Max. Duration:  24 months 
Max. Review:    12 weeks
Proposal:       6-10 pages.
Applicants:     Group Leader/Professor/Lecturer
```

#### Detailed Project Proposal

- Context and Outcome: How does your proposal fit within your research discipline and in what ways will it contribute to the global advancement of science? 
- Methodology: Explain what methodology are you planning to use. Specify the packages, compilers, libraries, etc, to be used. 
- Justification: Explain how many runs you intend to carry out, their memory requirements, expected run-times, on how many CPUs. 
- Scalability: The applicant must provide a scalability study to justify the choice of resources for the particular softwares that he/she is intending to use on Kay for this application.
- Workplan: Applicants are required to provide a short workplan and utilisation profile. This will assist us in determining the likely demand over time and tune our scheduling policies to optimise usage of our resources. Applicants must also specify the number and type of staff who will be undertaking the research described in the proposal (PhD students, post-docs, PI in person). Failure to provide either will result in the application being held back until such information has been provided.
- List of Relevant Publications: Applicants should include a list of relevant publications (no more than ten) at the end of their proposal.
- Short Biographies: Applicants should include short descriptions of research positions and successful uses of previous resource awards.

#### Review Process

All the applications submitted through the National Service are subject to a technical evaluation carried out by one of our computational scientists in order to verify the technical viability of the project and that:

- CPU time requested is correct
- Storage does not exceed the class project limits
- Software is installed and available for the applicant
- Simulation's plan is in agreement with ICHEC scheduling policies
- Any special requirement is needed

```{mermaid}
flowchart TD
subgraph within 1 week;
    Asub[Application Submitted] --> Aa[Application Assignment] --> Ts[Technical Evaluation]
end
cc[Class C]
subgraph "class A: max 12 week, class B: max 8 week";
    scc[Science Council Chair] <--> rev[Reviewers]
    scc <--> ichec[ICHEC]
    cab[Class A, B] --> scc
end
Ts --> cc & cab
cc --Approved--> pa[Project Activated]
ichec --Approved--> pa
cc --Rejected--> Asub
ichec --Rejected--> Asub
```

After the technical evaluation, Class C applicants are notified and their respective projects are activated. In the case of Class A and B applications, after the technical evaluation, projects are sent out for peer review by the [Science Council](https://www.ichec.ie/about/governance/science-council), usually by two national reviewers (Class B) or one national and one international reviewer (Class A) in order to evaluate the scientific merit of the proposal and applicant track record. Once both reviewer's reports are received, the decision is communicated to the applicant. This process might take between 4-8 weeks for Class B projects and up to 12 weeks for Class A projects 

-    How to apply for the National Service
-    Class Projects Requirements
-    Science Council Members
-    FAQs

