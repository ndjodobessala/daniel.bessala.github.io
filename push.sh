# !/bin/bash
# the variable $Message is passed as an argument to the script

Message=$1

git add .
git commit -m  "$Message" 
git push origin main