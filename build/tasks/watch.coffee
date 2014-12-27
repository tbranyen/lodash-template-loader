module.exports = ->
  @loadNpmTasks "grunt-contrib-watch"

  @config "watch",
    files: ["loader.js", "test/**/*", "Gruntfile.coffee"]
    tasks: ["clear", "default"]
