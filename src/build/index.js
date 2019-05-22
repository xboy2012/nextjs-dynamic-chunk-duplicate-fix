import buildLib from './build-lib'
;(async () => {
  await Promise.all([
    buildLib()
  ])
  console.log('All done!')
})()
