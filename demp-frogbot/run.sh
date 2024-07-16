buildnumber=$(date "+%m%d%H%M%S")
repo="ws-dev-npm"
buildname="npmbuild"
serverid="psemea"
projectKey="ws"
jf npm-config --repo-deploy $repo --repo-resolve $repo --server-id-resolve $serverid --server-id-deploy $serverid
jf npm install --build-name "$buildname" --build-number $buildnumber 
jf npm publish --build-name "$buildname" --build-number $buildnumber 
jf rt bce "$buildname" $buildnumber --project ws
jf rt bag "$buildname" $buildnumber --project ws
jf rt bp "$buildname" $buildnumber --project ws
