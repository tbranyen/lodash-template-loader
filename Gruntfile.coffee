module.exports = ->
  @initConfig

    clean: ["test/build_tools/_output"]

    jshint: ["loader.js"]

    connect:
      test:
        options:
          port: 7357

    watch:
      files: ["loader.js", "test/**/*", "Gruntfile.coffee"]
      tasks: ["clear", "default"]

    qunit:
      test:
        options:
          urls: [
            "http://localhost:7357/test/requirejs.html"
            "http://localhost:7357/test/dojo.html"
            "http://localhost:7357/test/curl.html"
          ]

    requirejs:
      test:
        options:
          baseUrl: "test/build_tools"
          include: "r"
          out: "test/build_tools/_output/r.js"
          optimize: "none"
          exclude: ["lodash", "ldsh"]

          paths:
            lodash: "../../bower_components/lodash/dist/lodash"
            ldsh: "../../loader"

  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-watch"
  @loadNpmTasks "grunt-contrib-connect"
  @loadNpmTasks "grunt-contrib-qunit"
  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-clear"

  @loadNpmTasks "grunt-contrib-requirejs"

  @registerTask "test", [
    "clean"
    "requirejs"
    "qunit"
  ]

  @registerTask "default", [
    "jshint"
    "connect"
    "test"
  ]
