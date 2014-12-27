module.exports = ->
  @loadTasks "build/tasks"

  @registerTask "default", [
    "jshint"
    "connect"
    "clean"
    "requirejs"
    "qunit"
  ]
