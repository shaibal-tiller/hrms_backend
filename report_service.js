var Service = require('node-windows').Service;
var svc = new Service({
 name:'DESCOGISREPORT',
 description: 'Node.js service description goes here.',
 script: './bin/www'
});

svc.on('install',function(){
 svc.start();
 console.log('done');
});

svc.install();