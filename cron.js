var CronJob = require('cron').CronJob;
var job = new CronJob(
	'* * * * *',
	function() {
		console.log('You will see this message every second');
	},
	null,
	true,
	'America/Chicago'
);
// Use this if the 4th param is default value(false)
// job.start()

// 0 8 * * * every day at 8am
// https://crontab.guru/examples.html 