/* 
 * Test Module: RequireJS
 * Ensures that the loader loads and functions in RequireJS.
 *
 */
QUnit.module("requirejs");

require.config({
  baseUrl: "/test",

  paths: {
    lodash: "../bower_components/lodash/dist/lodash",
    ldsh: "../loader"
  }
});

asyncTest("AMD support", 1, function() {
  require(["ldsh!fixtures/template"], function(template) {
    equal(template().trim(), "It works!");

    start();
  });
});

asyncTest("change extension", 1, function() {
  require({
    lodashLoader: {
      ext: ".ext"
    }
  }, ["ldsh!fixtures/different"], function(template) {
    equal(template().trim(), "It works!");

    start();
  });
});

asyncTest("templateSettings", 1, function() {
  require({
    lodashLoader: {
      templateSettings: {
        "interpolate": /{{([\s\S]+?)}}/g
      }
    }
  }, ["ldsh!fixtures/interpolate"], function(template) {
    equal(template({ msg: "It works!" }).trim(), "It works!");

    start();
  });
});

asyncTest("relative paths", 1, function() {
  require(["fixtures/nested/module"], function(exports) {
    equal(exports.template().trim(), "It works! (nested)");

    start();
  });
});

asyncTest("plugin works with r.js optimizer", 1, function() {
  // Load the module containing the build.
  require(["build_tools/_output/r"], function() {
    // Request the template.
    require(["ldsh!fixtures/basic"], function(template) {
      equal(template().trim(), "It works!");

      start();
    });
  });
});

asyncTest("virtual paths defined via paths config", 1, function() {
  require({
    paths: {
      "nested": "fixtures/nested"
    }
  }, ["ldsh!nested/template"], function(template) {
    equal(template().trim(), "It works! (nested)");

    start();
  });
});


asyncTest("root path setting", 1, function() {
    require({
        lodashLoader: {
            root: "fixtures"
        }
    }, ["ldsh!template"], function(template) {
        equal(template().trim(), "It works!");

        start();
    });
});

asyncTest("nested path with root path setting", 1, function() {
    require({
        lodashLoader: {
            root: "fixtures"
        },
        paths: {
            "nested": "fixtures/nested"
        }
    }, ["ldsh!nested/template"], function(template) {
        equal(template().trim(), "It works! (nested)");

        start();
    });
});
