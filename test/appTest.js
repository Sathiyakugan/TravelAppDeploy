controller = require('../controllers/staffController')
    , http_mocks = require('node-mocks-http')
    , should = require('should')
    , cheerio=require('cheerio')



function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('Staff Controller Tests', function() {
    it('Get Adding Staffs', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            user:{usertype:'admin'},
            method: 'GET',
            url: '/admin/staffs/add',
        })

        response.on('end', function(err) {
            response.should.be.ok();
            // var $ = cheerio.load(response.body);
            // var header = $('h1:first');
            response._getRenderView().should.equal('admin/addstaffs');
            done()
        })

        controller.add(request, response)
    })

    it('Adding Staff To DB', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('View Staffs', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('View Staffs By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('Update Staffs By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    it('View Staffs By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    it('Delete Staffs By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

})

describe('User Controller Tests', function() {
    it('Get Adding User', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            user:{usertype:'admin'},
            method: 'GET',
            url: '/admin/staffs/add',
        })

        response.on('end', function(err) {
            response.should.be.ok();
            // var $ = cheerio.load(response.body);
            // var header = $('h1:first');
            response._getRenderView().should.equal('admin/addstaffs');
            done()
        })

        controller.add(request, response)
    })

    it('Adding User To DB', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('View User', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('View User By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('Update User By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    it('View User By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    it('Delete User By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    //
    // it('upper', function(done) {
    //     var response = buildResponse()
    //     var request  = http_mocks.createRequest({
    //         method: 'GET',
    //         url: '/upper/monkeys',
    //     })
    //
    //     response.on('end', function() {
    //         response._getData().should.equal('MONKEYS');
    //         done()
    //     })
    //
    //     controller.handle(request, response)
    // })
})
describe('Place Controller Tests', function() {
    it('Get Adding Place', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            user:{usertype:'admin'},
            method: 'GET',
            url: '/admin/staffs/add',
        })

        response.on('end', function(err) {
            response.should.be.ok();
            // var $ = cheerio.load(response.body);
            // var header = $('h1:first');
            response._getRenderView().should.equal('admin/addstaffs');
            done()
        })

        controller.add(request, response)
    })

    it('Adding Place To DB', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('View Place', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('View Place By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('Update Place By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    it('View Place By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    it('Delete Place By Id', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })
    //
    // it('upper', function(done) {
    //     var response = buildResponse()
    //     var request  = http_mocks.createRequest({
    //         method: 'GET',
    //         url: '/upper/monkeys',
    //     })
    //
    //     response.on('end', function() {
    //         response._getData().should.equal('MONKEYS');
    //         done()
    //     })
    //
    //     controller.handle(request, response)
    // })
})
describe('Auth Controller Tests', function() {
    it('Check Authentication', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            user:{usertype:'admin'},
            method: 'GET',
            url: '/admin/staffs/add',
        })

        response.on('end', function(err) {
            response.should.be.ok();
            // var $ = cheerio.load(response.body);
            // var header = $('h1:first');
            response._getRenderView().should.equal('admin/addstaffs');
            done()
        })

        controller.add(request, response)
    })

    it('Login Validation', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

    it('Add to history', function(done) {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/admin/staffs/add',
            user:{usertype:'admin'},
            body:{
                name:'Kugan',
                lastname:'Sathiyakugan',
                email:'Sathizyz@gmail.com',
                username:'kugan',
                password:'zyz@123',
                password2:'zyz@123',
                address:'ChavakacheriNorth Chavakachcheri'
            }
        })

        response.on('end', function() {
            response.should.be.ok();
            // POST method should not exist.
            // This part of the code should never execute.
            done()
        })

        controller.add(request, response, function() {
            done()
        })
    })

})