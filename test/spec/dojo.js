/*
 * Test Module: Dojo
 * Ensures that the loader loads and functions in Dojo.
 *
 */
QUnit.module("dojo");

require({
  baseUrl: "/test",

  paths: {
    lodash: "../bower_components/lodash/lodash",
    ldsh: "../loader"
  }
});

asyncTest("AMD support", 1, function() {
  require(["ldsh!fixtures/template"], function(template) {
    equal(template().trim(), "It works!");

    start();
  });
});

asyncTest("change extension", function() {
  require({
    lodashLoader: {
      ext: ".ext"
    }
  }, ["ldsh!fixtures/different"], function(template) {
    equal(template().trim(), "It works!");

    start();
  });
});

asyncTest("templateSettings", function() {
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
  require(["./fixtures/nested/module.js"], function(exports) {
    equal(exports.template().trim(), "It works! (nested)");

    start();
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
