#!/usr/bin/env sh
set -e
echo "Enter commit message: "
read COMMIT_MESSAGE

echo "本次commit信息为: $COMMIT_MESSAGE"

read -p "Are you sure? (y/n)" -n 1 -r
echo  # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # commit
  git add -A
  git commit -m "$COMMIT_MESSAGE"
  git push origin master
fi
