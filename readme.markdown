# Boilerplate

A simple react + webpack boilerplate with eslint enabled.

It uses React 16, without dependencies warnings.

## Using

You should have node 8 or higher, even tough you might get away with earlier
versions.

Clone the repository, install the dependencies by running `yarn`.

Use `yarn build` to compile your code into the `build` directory.

Use `yarn build:production` to create an optimized version (usually for
deployment).

Use `yarn start` to start a local webpack development server so you can test your
app.

Use `yarn test` to lint your project and check for warnings and errors.

## Making it your own

Change the contents of `app.json` to your liking.

### Special keys

* *200*: When this key is `true`, the production build will create a file named
`200.html` to be ready for using on [surge.sh](http://surge.sh).

## Author

Sergio Moura
