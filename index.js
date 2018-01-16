const { fetch, output, error } = require('alfy')

const requireOrExit = (file) => {
  try {
    return require(file)
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

const path = require('path')
const home = require('os').homedir()
const config = requireOrExit(path.join(home, '.hotel', 'conf.json'))
const { host = 'localhost', port = 2000, tld = 'dev' } = config
const hotel = `http://${host}:${port}`

fetch(`${hotel}/_/servers`)
  .then((servers) => Object.keys(servers).map((id) => {
    const { status, cwd } = servers[id]
    const url = `http://${id}.${tld}`
    const run = (command) => `{
      "alfredworkflow": {
        "arg": "${hotel}/_/servers/${id}",
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
          arg: `${hotel}/${id}`,
          subtitle: 'open without proxy'
        },
        ctrl: {
          arg: `file://${cwd}`,
          type: 'file',
          subtitle: 'open project folder'
        },
        fn: status === 'running' ? {
          arg: run('restart'),
          subtitle: 'restart'
        } : {},
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
  }))
  .then(output)
