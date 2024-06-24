# JupyterLite Environment for "Schnupperlernende"
[![Build and Deploy](https://github.com/sebi364/schnupperlehre/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/sebi364/schnupperlehre/actions/workflows/deploy.yml)

This repository contains the source files for a [JupyterLite](https://github.com/jupyterlite) environment, providing our "Schnupperlernende" (trial learners) with a convenient place to explore Python.

## Access the JupyterLite Site
The JupyterLite site is hosted as a static site with GitHub Pages and can be accessed through the following links:
* Full URL: [https://sebi364.github.io/schnupperlehre/lab/index.html](https://sebi364.github.io/schnupperlehre/lab/index.html)
* Shortened URL: [t.ly/jgXXZ](https://t.ly/jgXXZ)

## Note
The exercises on the site are not intended to provide a complete course on Python. They are designed to give a short introduction and are accompanied by a matching presentation.

## Modifications
We have made several changes to the default JupyterLite interface to prevent users from "breaking" the exercise by clicking on "more advanced" features. These changes can be found in [settings-override.json](/patches/settings-override.json) and are applied to the site during the build process.

## Limitations
Because JupyterLite runs everything inside a user's browser, I've encountered several limitations while writing the exercises:
* `input()` doesn't work normally (see [this issue](https://github.com/jupyterlite/jupyterlite/issues/275) for more details)
* Loading times: The Python kernel needs a couple seconds to start; when running a piece of code for the first time
