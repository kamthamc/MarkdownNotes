workflow "Build and Tag" {
  on = "push"
  resolves = ["Tag"]
}

action "Project Init" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install"
}

action "Build" {
  needs = "Project Init"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run build:prod"
}

action "Tag" {
  needs = "Build"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run release"
  secrets = ["GITHUB_TOKEN"]
}
