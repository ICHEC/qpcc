# Contributing to the documentation page

```{admonition} For Users
:class: note
If you find mistakes in the page, please report it using [Issues](https://github.com/ICHEC/interim-service/issues) page.
Please mention topics you think are missing, incorrect, or aren't structured appropriately. If you want to get more actively involved, make a fork, implement you changes, and submit a pull request.
```

```{admonition} For staff
:class: note
Please add yourself as members of this [repository](https://github.com/ICHEC/interim-service), and make changes to a branch in your name. Once changes are made, submit a pull/merge request to the main branch.

```

# Structure of the source

This website is created using [Jupyterbook](https://jupyterbook.org/en/stable/intro.html), based on [sphinx](https://www.sphinx-doc.org/en/master/).
See the [Jupyterbook](https://jupyterbook.org/en/stable/intro.html) for more details. The source for this website uses [MyST Markdown](https://myst-parser.readthedocs.io/en/latest/index.html).


The structure of the files looks like follows -


```console
(web) 👽 618-rajarshi 0 (main)✗  tree .
.
├── README.md
├── _config.yml
├── _static
│   └── style.css
├── _toc.yml
├── contact-us.md
├── index.md
├── interim-service.md
├── logo.png
├── lxp
│   └── introduction.md
├── national-hpc-service.md
├── references.bib
├── requirements.txt
└── scratch.md
...
```

There are three types of files

- YAML files, with extension `.yml` which are used to define structure and build process of the pages. `_config.yml` file defines all the configurational options for building the pages, and `_toc.yml` file defines the [table of contents](https://jupyterbook.org/en/stable/start/create.html#table-of-contents-toc-yml), and structure of the documents.

- CSS files, primarily stored in `_static` folder, and define the appearance settings for the webpages.

- Markdown files, with `.md` extension. These are primarily ones that contain the documentation information. Jupyterbook follows MyST format, which is quite feature rich for building pages and pdfs of the technical documents. Checkout the MyST features [here](https://jupyterbook.org/en/stable/content/index.html).