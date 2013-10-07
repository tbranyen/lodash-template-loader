Lo-Dash AMD Template Loader
---------------------------

Created by Tim Branyen [@tbranyen](http://twitter.com/tbranyen)

AMD and RequireJS are excellent module loaders, but through the flexibility of
plugin architecture they should really be seen as resource loaders.

We've come to expect our development environments to be raw and our builds to
be as optimized as possible.  This plugin will fetch your Lo-Dash templates
during development and inline them in a production build.

Unlike [requirejs-tpl](https://github.com/ZeeAgency/requirejs-tpl) it does not
use a hardcoded template function, but instead uses the exact one from your
copy of Lo-Dash.  Consistency is a key difference here.

Almost every single article and tutorial on using client side templates with
AMD, will advocate the use of the RequireJS text! plugin.  While this is a fine
tool for loading text, it is not optimized for templates.  It requires the
duplicative act of compiling the templates before use in production.

### Installing: ###

This plugin has been registered with Bower, install with:

``` bash
bower install lodash-template-loader
```

Alternatively you can download the `loader.js` file and place anywhere in your
project.

### Loading the plugin: ###

``` javascript
require.config({
  paths: {
    // You can change the plugin name to be whatever you want, maybe tpl?
    "ldsh": "path/to/lodash-template-loader/loader"
  }
});
```

You must not end the path in `.js` unless you are providing a url.

Examples:

* `vendor/libraries/loader`
* `http://cdn.mysite.com/vendor/libraries/loader.js`

### Using: ###

Inside an AMD module you can now load templates like so:

``` javascript
// Omit the extension and root path.
define(["ldsh!path/to/template"], function(template) {
  var contents = template({
    // Some data.
  });
});
```

The path to your templates directory can be configured as well as the default
extension to search for.  More details below.

### Configuring templateSettings: ###

There are a few default settings in place to make consumption easier.

The extension appended by default is `.html`.  The default root path is your
configuration's `baseUrl`.  No `templateSettings` are configured by default.

To change these options, add the following to your configuration:

``` javascript
require.config({
  // The Lo-Dash loader configuration.
  lodashLoader: {
    // This is the default extension, you can change to whatever you like.
    // Setting this to "" will disable automatic extensions.
    ext: ".html",

    // The path to where your templates live relative to the `baseUrl`.
    root: "/",

    // Globally configured template settings to be applied to any templates
    // loaded.  This correlates directly to `_.templateSettings`.
    templateSettings: {}
  }
});
```

### What about Underscore? ###

I've decided to go with the compatible `.source` attribute for obtaining the
template function source string, which makes this plugin work with Underscore
as well.  You'll have to manually map the resource identifier which is
explained in detail below.

### Mapping Underscore to Lo-Dash: ###

In order to use Underscore with this plugin, you must map the identifier.
Internally the plugin specifically looks for the identifier `lodash`.  In the
configuration simply:

``` javascript
require.config({
  // Define a new object literal, named map.
  map: {
    // Ensure the mapping works globally across any modules using this plugin.
    "*": {
      // Map the lodash identifier to whatever module you want here.
      "lodash": "underscore"
    }
  }
});
```

### Running tests ###

You will need Node.js and Grunt installed to run tests.

Clone this project, open the directory in a terminal, and execute the following
commands:

``` bash
# Install dependencies.
npm i -q

# Run the tests.
grunt
```

You can also run an http-server in the root and hit the tests directly.  Since
XHR is used, tests must be run from a server.

### Release notes: ###

#### 0.1.0 ####

* Open sourced on GitHub.
