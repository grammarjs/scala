
#
# Test.
#

test: node_modules
	@mocha -R spec test.js

#
# Phony targets.
#

.PHONY: test

#
# Target for `node_modules` folder.
#

node_modules: package.json
	@npm install