'use Strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('./app.js');

//api base url
const base_url = 'localhost:3000';



describe('user login', function(){
    //set request timeout
    this.timeout(5000);

    // test case 1- return successfull login(send correct credentials)
    it('success should be returned', function() {
        //send post request with login credentials
        // set return details
        return chai.request(app).post('/login')
            .send({
                username: 'johnjebo@gmail.com',
                password : 'Greenfour4'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body.loginRes).to.equal("success");
                //done();
            });
    });


});