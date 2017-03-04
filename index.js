const alfy = require('alfy')
const { HOTEL_HOST = 'http://127.0.0.1:2000', TLD = 'dev' } = process.env

alfy.fetch(`${HOTEL_HOST}/_/servers`)
  .then(servers => {
    const list = Object.keys(servers).map(id => {
      const { status, cwd } = servers[id]
      const url = `http://${id}.${TLD}`
      const run = command => `{
        "alfredworkflow": {
          "arg": "${HOTEL_HOST}/_/servers/${id}",
          "variables": {
            "app": "${id}",
            "command": "${command}"
          }
        }
      }`

      return {
        uid: url,
        title: id,
        subtitle: status,
        arg: url,
        text: {
          copy: url,
          largetype: url
        },
        quicklookurl: status === 'running' ? url : null,
        mods: {
          alt: {
            arg: `${HOTEL_HOST}/${id}`,
            subtitle: 'open without proxy'
          },
          ctrl: {
            arg: `file://${cwd}`,
            type: 'file',
            subtitle: 'open project folder'
          },
          cmd: status === 'running'
            ? {
              arg: run('stop'),
              subtitle: 'stop'
            }
            : {
              arg: run('start'),
              subtitle: 'start'
            }
        }
      }
    })

    alfy.output(list)
  })
