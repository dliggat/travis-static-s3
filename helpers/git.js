require('shelljs/global');

module.exports.commitHash = function() {
  var hash = exec('([[ -d .git ]] && git rev-parse HEAD | head -n1) || ([ -n "${TRAVIS_COMMIT+1}" ] && echo $TRAVIS_COMMIT) || echo Not a git repo', {silent: true})
    .stdout
    .replace(/^\s+|\s+$/g, '');
  return hash;
};

module.exports.commitComment = function() {
  var comment = exec('([[ -d .git ]] && git log -1 --pretty=%B | head -n1) || ([ -n "${TRAVIS+1}" ] && echo Travis $TRAVIS_BUILD_NUMBER) || echo Not a git repo', {silent: true})
    .stdout
    .replace(/^\s+|\s+$/g, '');
  return comment;
};
