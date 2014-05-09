/* 
 * Test Module: Curl
 * Ensures that the loader loads and functions in Curl.
 *
 */
 /*global QUnit asyncTest curl ok start */
QUnit.module("curl");

curl.config({
  baseUrl: "/test",

  paths: {
    "lodash": "../bower_components/lodash/dist/lodash",
    "ldsh": "../loader",
    "nested": "fixtures/nested"
  }
});

asyncTest("AMD support", 1, function() {
  curl(["ldsh!fixtures/template"]).then(
    function(template) {
      equal(template().trim(), "It works!");

      start();
    },
    function(ex) {
      ok(false, ex.message);
      start();
    }
  );
});

asyncTest("change extension", function() {
  curl({
    lodashLoader: {
      ext: ".ext"
    }
  }, ["ldsh!fixtures/different"]).then(
    function(template) {
      equal(template().trim(), "It works!");

      start();
    },
    function(ex) {
      ok(false, ex.message);
      start();
    }
  );
});

asyncTest("templateSettings", function() {
  curl({
    lodashLoader: {
      templateSettings: {
        "interpolate": /{{([\s\S]+?)}}/g
      }
    }
  }, ["ldsh!fixtures/interpolate"]).then(
    function(template) {
      equal(template({ msg: "It works!" }).trim(), "It works!");

      start();
    },
    function(ex) {
      ok(false, ex.message);
      start();
    }
  );
});

asyncTest("relative paths", 1, function() {
  curl(["fixtures/nested/module"], function(exports) {
    equal(exports.template().trim(), "It works! (nested)");

    start();
  });
});

asyncTest("virtual paths defined via paths config", 1, function() {
  curl(["ldsh!nested/template"], function(template) {
    equal(template().trim(), "It works! (nested)");

    start();
  });
});
