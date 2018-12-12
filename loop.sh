while true
do

cp -R ../interactive-atom-cards/src/server/data src/server/data
npm run parse
npm run deploylive
sleep 60

done