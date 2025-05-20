# Security
SNYK searches the current home directory and therefore doesn't find a package.json or node_modules. 

Potential remediations:
  1. Change dir of .github/workflow to server
  2. Have separate CI/CD pipelines for Client, Server, and Database
  3. See if there is a way to change the dir that Snyk will search
  4. Get fucked
I will do some research on this later

Also need to git push after I deleted them
