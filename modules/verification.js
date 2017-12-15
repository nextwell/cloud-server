let nodemailer = require("nodemailer");

class eMailVerification{
	constructor(){
		this.smtp = nodemailer.createTransport({
		    service: "Gmail",
		    auth: {
		        user: "akite.cloud",
		        pass: "f5a175acac4a00aa702424d53b01903a"
		    }
		});
	}

}

let Verification = new eMailVerification();

module.exports = Verification;