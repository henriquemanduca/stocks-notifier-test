# Tasks

## Priority

## Secondary


## Done


# Scripts


## TypeOrm

npm run typeorm migration:run
npm run typeorm migration:revert

npx typeorm migration:create -n CreateCriptos

## Git Checklist

1. g s
2. g a .
3. g cm "Message"
4. g ps
5. g o the_branch
6. g rebase the_other_branch

## Pm2
pm2 start index.js --name stocksNotify --ignore-watch="node_modules"
pm2 start ./dist/index.js --name stocksNotify --watch="dist/" --ignore-watch="node_modules"

