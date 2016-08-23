pwd
npm install
export PATH=$PATH:$(pwd)/node_modules/casperjs/bin:$(pwd)/node_modules/phantomjs/bin
casperjs test youdata_compare.js