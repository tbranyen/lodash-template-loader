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
    "ldsh": "../loader"
  }
});

asyncTest("AMD support", 1, function() {
  curl(["ldsh!fixtures/template"]).then(
    function(template) {
      ok(template(), "It works!");

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
      ok(template(), "It works!");

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
      ok(template({ msg: "It works!" }), "It works!");

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
    ok(exports.template(), "It works!");

    start();
  });
});

asyncTest("virtual paths defined via paths config", 1, function() {
  curl({
    paths: {
      "nested": "fixtures/nested"
    }
  }, ["ldsh!nested/template"], function(template) {
    ok(template(), "It works!");

    start();
  });
});
