var Helper = require('hubot-test-helper');
var chai = require('chai');
var sinon = require('sinon');
var co = require('co');
var nock = require('nock');
var expect = chai.expect;

var helper = new Helper('../scripts/daily_bookings.js');

describe('Daily bookings', function() {
  beforeEach(function() {
	clock = require('../domain/clock.js');
	sinon.stub(clock, "yesterday", function() {
		return '20170311';
	});
    this.room = helper.createRoom({httpd: false});
	nock('http://online.travelcompositor.com')
      .get('/resources/authentication/getAuthToken')
	  .query({microsite: 'default', username: 'user', password: 'pass'})
      .reply(200, {token: 'wtftoken', expirationInSeconds: 1800});
	nock('http://online.travelcompositor.com', {
      reqheaders: {
        'auth-token': 'wtftoken'
      }
    }).get('/resources/booking/getBookings')
	  .query({operator: 'travelc', from: '20170311', to: '20170311'})
      .replyWithFile(200, __dirname + '/bookings.json');
  });

  afterEach(function() {
    this.room.destroy();
	nock.cleanAll();
    clock.yesterday.restore();
  });

  context('user says yesterday bookings', function() {
	beforeEach(function() {
		return co(function*() {
            return yield this.room.user.say('whatever_user', '@hubot yesterday bookings');
        }.bind(this));
	});
  	it('should tell yesterday bookings count', function() {
    	expect(this.room.messages).to.eql([
        	['whatever_user', '@hubot yesterday bookings'], 
        	['hubot', 'Ayer tuvimos 2 reservas :smile:'], 
    	]);
  	});
  });
  context('user says yesterday bookings given zero bookings', function() {
	beforeEach(function() {
	    bookings_mapper = require('../domain/bookings_mapper.js');
	    sinon.stub(bookings_mapper, "count", function() {
		    return 0;
	    });
		return co(function*() {
            return yield this.room.user.say('whatever_user', '@hubot yesterday bookings');
        }.bind(this));
	});
  	it('given zero bookings should show a sad face', function() {
    	expect(this.room.messages).to.eql([
        	['whatever_user', '@hubot yesterday bookings'], 
        	['hubot', 'Ayer tuvimos 0 reservas :cry:'], 
    	]);
  	});
  });
});
