git add .
echo Merge Message:
read commitmessage
git commit . -m "$commitmessage"
git push