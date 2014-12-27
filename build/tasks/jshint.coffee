module.exports = ->
  @loadNpmTasks "grunt-contrib-jshint"

  @config "jshint",
    ["loader.js"]
