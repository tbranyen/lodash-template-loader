/* 
 * Test Module: Curl
 * Ensures that the loader loads and functions in Curl.
 *
 */
QUnit.module("curl");

asyncTest("AMD support", 1, function() {
  curl.config({
    baseUrl: "../",

    paths: {
      lodash: "bower_components/lodash/dist/lodash",
      ldsh: "loader",
      fixtures: "test/fixtures"
    }
  });

  curl(["ldsh!fixtures/template"]).then(function(template) {
    ok(template(), "It works!");

    start();
  });
});

asyncTest("change extension", function() {
  curl({
    lodashLoader: {
      ext: ".ext"
    }
  }, ["ldsh!fixtures/different"]).then(function(template) {
    ok(template(), "It works!");

    start();
  });
});

asyncTest("templateSettings", function() {
  curl({
    lodashLoader: {
      templateSettings: {
        "interpolate": /{{([\s\S]+?)}}/g
      }
    }
  }, ["ldsh!fixtures/interpolate"]).then(function(template) {
    ok(template({ msg: "It works!" }), "It works!");

    start();
  });
});
