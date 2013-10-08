/* 
 * Test Module: RequireJS
 * Ensures that the loader loads and functions in RequireJS.
 *
 */
QUnit.module("requirejs");

asyncTest("AMD support", 1, function() {
  require.config({
    baseUrl: "../",

    paths: {
      lodash: "bower_components/lodash/dist/lodash",
      ldsh: "loader",
      fixtures: "test/fixtures"
    }
  });

  require(["ldsh!fixtures/template"], function(template) {
    ok(template(), "It works!");

    start();
  });
});

asyncTest("change extension", 1, function() {
  require({
    lodashLoader: {
      ext: ".ext"
    }
  }, ["ldsh!fixtures/different"], function(template) {
    ok(template(), "It works!");

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
    ok(template({ msg: "It works!" }), "It works!");

    start();
  });
});

asyncTest("relative paths", 1, function() {
  require(["fixtures/nested/module"], function(exports) {
    ok(exports.template(), "It works!");

    start();
  });
});
