const alfy = require('alfy')
const { HOST = 'http://127.0.0.1:2000', TLD = 'dev' } = process.env

alfy.fetch(`${HOST}/_/servers`)
  .then(servers => {
    const list = Object.keys(servers).map(id => {
      const { status } = servers[id]
      const url = `http://${id}.${TLD}`
      const run = command => `{
        "alfredworkflow": {
          "arg": "${HOST}/_/servers/${id}",
          "variables": {
            "command": "${command}"
          }
        }
      }`

      return {
        uid: url,
        title: id,
        subtitle: status,
        arg: url,
        quicklookurl: status === 'running' ? url : '',
        mods: {
          alt: {
            arg: `${HOST}/${id}`,
            subtitle: 'open without proxy'
          },
          cmd: status === 'running'
            ? {
              arg: run('stop'),
              subtitle: 'stop'
            }
            : {}
        }
      }
    })

    alfy.output(list)
  })
