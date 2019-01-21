# AngularJS tools Lib developed by One Development Solution LLC.

[![Build Status](https://travis-ci.org/refactorthis/angular-component-seed.svg?branch=master)](https://travis-ci.org/refactorthis/angular-component-seed)

This project is tools lib for a common use in software development, It include some useful Directives, Services and a Toolset.

This project was developed from the application template seed here
[https://github.com/refactorthis/angular-component-seed](https://github.com/refactorthis/angular-component-seed)

## Components and Directives.

This repository contains a set of native AngularJS directives based on Bootstrap's markup and CSS.

1. **ODS-Forms-builder:** Drag and drop dynamic bootstrap forms builder using angular, this component is inspired in [angular-form-gen](https://github.com/McNull/angular-form-gen). 
                          An extendable angular module that allows you create, design and render forms Bootstrap based. 
                          Field components can be dragged from a field toolbar onto a canvas, you can add fields validations. 
                          Ease way to extend by adding custom field components and validation patterns.
2. **ODS-CKEditor:** CKEditor directive for Angular including autocompletion plugin.
3. **ODS-Signature:** AngularJs Directive for jSignature library. It is a JavaScript widget (a jQuery plugin) that simplifies creation 
                      of a signature capture field in a browser window, allowing a user to draw a signature using mouse, pen, or finger.
4. **ODS-Address:** Useful directive that allow to have an address management adding an input group field. It open a modal windows where you 
                    can handle all address fields.
5. **ODS-Img-Upload:** Useful directive that allow to upload images(profile images, logo images) and edit using a crop tool.
6. **Report Viewer Directive:** Report Viewer directive that allow to parametrize and visualize reports include report params.
7. **Bootstrap Select with Filter Support Directive:** Select directive with dynamic filter support.
8. **ODS-Hide-Value:** Useful directive for SSN, Medicaid and Medicare number that need privacy with a mask.
                                             

## Demos.

[Demos](https://hermeslm.github.io/demo/)

## Getting Started

Documentation will be coming soon.

### Install the dependencies:

### Prerequisites

You need git to clone the git ods-lib repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-component-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `bower_components` - contains the angular framework files

## Updating Angular

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can install and update the Angular dependencies by running:

install dependencies:
```
bower install
```
update dependencies:
```
bower update
```

## Build the library and samples

If you want to build a distribution of this library just run a gulp task, this is the default task.
```
gulp build
``` 
You can check the `gulpfile.js` and check all defined gulp task.

## Contact

For more information on AngularJS please check out http://angularjs.org/

[demo]: https://hermeslm.github.io/demo/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
