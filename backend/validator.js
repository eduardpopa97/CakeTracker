const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db');

module.exports.checkMemberAge = (req, res, next) => {
    var birthdate = new Date(req.body.MEMBER_BIRTHDATE);
    if(new Date(birthdate.getFullYear() + 18, birthdate.getMonth(), birthdate.getDay()) > new Date()) {
        return res.status(200).json({"warning": "The member has to be at least 18 years old"});
    }
    else next();
}

module.exports.checkFieldsNotNull = (req, res, next) => {
    if(req.body.MEMBER_FIRST_NAME === "" || req.body.MEMBER_LAST_NAME === "" || 
    req.body.MEMBER_BIRTHDATE === "" || req.body.MEMBER_COUNTRY === "" || req.body.MEMBER_CITY === "") {
        return res.status(200).json({"warning": "All the fields are mandatory"});
    }
    else next();
}

module.exports.checkUnique = (req, res, next) => {
    var body = req.body;
    db.get("SELECT * FROM MEMBERS WHERE MEMBER_FIRST_NAME=? AND MEMBER_LAST_NAME=? AND MEMBER_CITY=?", 
            [body.MEMBER_FIRST_NAME, body.MEMBER_LAST_NAME, body.MEMBER_CITY], 
            (err, rows) => {
                if(err) 
                    {
                        return res.status(500).json({"error": err.message});  
                    }
                else if(rows) 
                    {   
                        if(!res.headersSent) return res.status(200).json({"warning": "The member already exists in the database"});       
                    }
		else next();
            });

}
