// webpack collects all spec files, looking into subfolders recursively
// the result will be a single bundle importing all specs as the input for Karma
'use strict';

const chai = require("chai")
const sinonChai = require("sinon-chai")
chai.use(sinonChai)

// const sinon = require("sinon")
// sinon.assert.expose(chai.assert, { prefix: "" })

function load(modules) {
	modules.keys().forEach(function(path){
		modules(path);
	});
}

load(require.context('./', true, /\.spec\.js$/));
