#!/usr/bin/env sh
set -e
echo "Enter commit message: "
read COMMIT_MESSAGE

echo "本次commit信息为: $COMMIT_MESSAGE"

# commit
git add -A
git commit -m "$COMMIT_MESSAGE"
git push origin master
