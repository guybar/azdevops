import shellExec from 'shell-exec'
shellExec('echo Hi!').then(console.log).catch(console.log)