# Satori Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

## Local environment setup
1. Download and install latest Node.js
2. Clone the repo `$ git clone git@gitlab.com:satori/web.git`
3. `$ cd web`
4. Install dependencies with `$ npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Git workflow
All commits should be made in your own __branch__. You can create feature or bugfix branch depending on the nature of the issue. After your code changes are ready and tested, you need to raise a __pull request__ into a __release branch__. There will be a release branch for each version bump. Always reference the __issue number__ in your commit message.

### Step by step instruction
1. Create a branch either from GitLab web UI, or via terminal; create from the release branch that you will merge into; the name of the branch should start with either feature/ or bugfix/
2. Checkout the branch locally and start coding
3. When making commits, reference the issue number by including `#[issue No.]` in your commit message
4. Raise a pull request to the release branch



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
