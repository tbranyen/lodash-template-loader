/* 
 * Test Module: Dojo
 * Ensures that the loader loads and functions in Dojo.
 *
 */
QUnit.module("dojo");

require({
  baseUrl: "/test",

  paths: {
    lodash: "../bower_components/lodash/dist/lodash",
    ldsh: "../loader"
  }
});

asyncTest("AMD support", 1, function() {
  require(["ldsh!fixtures/template"], function(template) {
    ok(template(), "It works!");

    start();
  });
});

asyncTest("change extension", function() {
  require({
    lodashLoader: {
      ext: ".ext"
    }
  }, ["ldsh!fixtures/different"], function(template) {
    ok(template(), "It works!");

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
    ok(template({ msg: "It works!" }), "It works!");

    start();
  });
});

asyncTest("relative paths", 1, function() {
  require(["./fixtures/nested/module.js"], function(exports) {
    ok(exports.template(), "It works!");

    start();
  });
});

asyncTest("virtual paths defined via paths config", 1, function() {
  require({
    paths: {
      "nested": "fixtures/nested"
    }
  }, ["ldsh!nested/template"], function(template) {
    ok(template(), "It works! (nested)");

    start();
  });
});
