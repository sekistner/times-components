#!/usr/bin/env bash
set -e

VERBOSE=false

while getopts "v" OPTION
do
  case $OPTION in
    v) VERBOSE=true
       ;;
  esac
done

VERSION=$(cat ios-app/package.json | grep version | head -1 | sed 's/[\",\t ]//g' | awk -F: '{ print $2 }')
if [ -z "$VERSION" ]
then
  echo "Error: Can't find ios version"
  exit 1
fi
echo "Version: $VERSION"

TMP_ASSET_DIR=$(mktemp -d) || { echo "Failed to create temp file"; exit 1; }
echo "Tmp Directory: $TMP_ASSET_DIR"

ASSET_REPO="git@github.com:newsuk/times-pod-specs.git"

# set up git
git config user.name "Publish Bot"
git config user.email "publish@ghbot.com"

echo "Checking out $ASSET_REPO in $TMP_ASSET_DIR"
git clone --single-branch --branch master $ASSET_REPO $TMP_ASSET_DIR 

echo "Update assets"
rm -rf $TMP_ASSET_DIR/assets 
mkdir -p $TMP_ASSET_DIR/assets 
cp -r ios-app/ios-assets $TMP_ASSET_DIR/assets 
cp TimesComponents.podspec $TMP_ASSET_DIR/ 

cd $TMP_ASSET_DIR
git add $TMP_ASSET_DIR/assets TimesComponents.podspec
git commit -m "IOS assets for version:$VERSION" 
git tag -a $VERSION -m "IOS assets for version:$VERSION" 

# push above changes to git
echo "Pushing to master"
git push origin master --tags --quiet 
cd -

echo "clean up tmp folder"
rm -rf $TMP_ASSET_DIR

echo "All done!!"
exit 0

function log () {
    if [[ $VERBOSE -eq 1 ]]; then
        echo "$@"
    fi
}

