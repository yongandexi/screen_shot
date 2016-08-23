var phantomcss = require('phantomcss');
var testsuite = require('./testsuite.json');

var host = testsuite.host;
var sim_url = host + testsuite.sim_url;
var check_urls = testsuite.check_urls;

var delay = 3000;  // delay before a screenshot, in milliseconds.


casper.test.begin('Started: ', function(){

	phantomcss.init({
		rebase: casper.cli.get( "rebase" ),
		casper: casper,
		screenshotRoot:  './baselines',
		comparisonResultRoot: './results',
		failedComparisonsRoot: './failures',
		addLabelToFailedImage: false,
		mismatchTolerance:0.05
	})

	casper.start(sim_url , function(){
		this.echo('logged on.')
	});

	casper.viewport( 1920, 1080 );
	
	casper.each(check_urls, function(self, check){
		var url = host + check.url;
		var name = 'report' + check.name;
		self.thenOpen(url, function(){
			console.log('checking in ' + name);
			this.wait(delay, function(){
				phantomcss.screenshot('.g-mn', name);
			})
		});
	});
	
	casper.then(function () {
		// compare screenshots
		phantomcss.compareAll();
	});
	casper.run(function(){
		console.log('\nEnded: ');
		casper.test.done();
	});

})

//casperjs --ssl-protocol=tlsv1 youdata.js