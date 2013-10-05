module.exports = ->
  @initConfig

    clean: ["test/report", "test/tmp"]
    jshint: ["loader.js"]

    connect:
      test:
        options:
          port: 8000

    watch:
      files: ["loader.js", "test/**/*", "Gruntfile.coffee"]
      tasks: ["clear", "default"]

    qunit:
      test:
        options:
          urls: [
            "http://localhost:8000/test/requirejs.html"
            "http://localhost:8000/test/dojo.html"
            "http://localhost:8000/test/curl.html"
          ]

  @loadNpmTasks "grunt-contrib-clean"
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-watch"
  @loadNpmTasks "grunt-contrib-connect"
  @loadNpmTasks "grunt-contrib-qunit"
  @loadNpmTasks "grunt-clear"

  @registerTask "default", ["clean", "jshint", "connect", "qunit"]
