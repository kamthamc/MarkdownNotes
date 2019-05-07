workflow "Build and Tag" {
  on = "push"
  resolves = ["Tag"]
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "install"
}

action "Tag" {
  needs = "Build"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "changelog"
}
