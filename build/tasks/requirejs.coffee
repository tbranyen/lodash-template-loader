module.exports = ->
  @loadNpmTasks "grunt-contrib-requirejs"

  @config "requirejs",
    test:
      options:
        baseUrl: "test/build_tools"
        include: "r"
        out: "test/build_tools/_output/r.js"
        optimize: "none"
        exclude: ["lodash", "ldsh"]

        paths:
          lodash: "../../bower_components/lodash/lodash"
          ldsh: "../../loader"
