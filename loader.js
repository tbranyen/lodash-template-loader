/* Lo-Dash Template Loader v0.1.1
 * Copyright 2013, Tim Branyen (@tbranyen).
 * loader.js may be freely distributed under the MIT license.
 */
(function(global) {
"use strict";

// Cache used to map configuration options between load and write.
var buildMap = {};

// Alias the correct `nodeRequire` method.
var nodeRequire = typeof requirejs === "function" && requirejs.nodeRequire;

// If in Node, get access to the filesystem.
if (nodeRequire) {
  var fs = nodeRequire("fs");
}

// Define the plugin using the CommonJS syntax.
define(function(require, exports) {
  var _ = require("lodash");

  exports.version = "0.1.1";

  // Invoked by the AMD builder, passed the path to resolve, the require
  // function, done callback, and the configuration options.
  exports.load = function(name, req, load, config) {
    // Dojo provides access to the config object through the req function.
    if (!config) {
      config = require.rawConfig;
    }

    // Always keep a copy of the original name.
    var originalName = name;

    // Augment the name with the baseUrl.
    name = config.baseUrl + name;

    var settings = configure(config);

    // Builds must happen with Node.
    if (config.isBuild) {
      name = settings.root + name + settings.ext;

      // Read in the file synchronously, as RequireJS expects, and return the
      // contents.  Process as a Lo-Dash template.
      buildMap[originalName] = _.template(String(fs.readFileSync(name)));

      return load();
    }

    // Create a basic XHR.
    var xhr = new XMLHttpRequest();

    // Wait for it to load.
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        // Process as a Lo-Dash template and cache.
        buildMap[name] = _.template(xhr.responseText);

        // Return the compiled template.
        load(buildMap[name]);
      }
    };

    // Initiate the fetch.
    xhr.open("GET", settings.root + name + settings.ext, true);
    xhr.send(null);
  };

  // Also invoked by the AMD builder, this writes out a compatible define
  // call that will work with loaders such as almond.js that cannot read
  // the configuration data.
  exports.write = function(pluginName, moduleName, write) {
    var template = buildMap[moduleName].source;

    // Write out the actual definition
    write(strDefine(pluginName, moduleName, template));
  };

  // This is for curl.js/cram.js build-time support.
  exports.compile = function(pluginName, moduleName, req, io, config) {
    configure(config);

    // Ask cram to fetch the template file (resId) and pass it to `write`.
    io.read(moduleName, write, io.error);

    function write(template) {
      // Write-out define(id,function(){return{/* template */}});
      io.write(strDefine(pluginName, moduleName, template));
    }
  };

  // Crafts the written definition form of the module during a build.
  function strDefine(pluginName, moduleName, template) {
    return [
      "define('", pluginName, "!", moduleName, "', ", "[], ",
        [
          "function() {",
            "return ", template, ";",
          "}"
        ].join(""),
      ");\n"
    ].join("");
  }

  function configure(config) {
    // Default settings point to the project root and using html files.
    var settings = _.extend({
      ext: ".html",
      root: config.baseUrl,
      templateSettings: {}
    }, config.lodashLoader);

    // Set the custom passed in template settings.
    _.extend(_.templateSettings, settings.templateSettings);

    return settings;
  }
});

})(typeof global === "object" ? global : this);
