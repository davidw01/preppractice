'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: process.env.HOST || '0.0.0.0', 
    port: process.env.PORT || 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
        return reply('hello world!');
    }
});

// Add protected
server.route({
    method: 'GET',
    path:'/protected', 
    handler: function (request, reply) {
        return reply('This is protected.').code(401);
    }
});

// Add strings/upper
server.route({
    method: 'GET',
    path:'/strings/upper', 
    handler: function (request, reply) {
    	var parameters = request.query;
    	var value = parameters[Object.keys(parameters)[0]];
        return reply(value.toUpperCase());
    }
});

// Add strings/reverse
server.route({
    method: 'GET',
    path:'/strings/reverse', 
    handler: function (request, reply) {
    	var parameters = request.query;
    	var value = parameters[Object.keys(parameters)[0]];
        return reply(value.split("").reverse().join(""));
    }
});

// Add strings/concatenate
server.route({
    method: 'GET',
    path:'/strings/concatenate', 
    handler: function (request, reply) {
    	var parameters = request.query;
    	var value = parameters.value;
    	var times = parameters.times;
    	var result = ""
    	for (var i = 0; i < Number(times); i++) {
    		result += value;
    	}
        return reply(result);
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});