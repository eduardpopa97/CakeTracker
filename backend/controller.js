const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('database.db');

module.exports.createMember = (req, res) => {
    var body = req.body;
    db.run("INSERT INTO MEMBERS (MEMBER_ID, MEMBER_FIRST_NAME, MEMBER_LAST_NAME, MEMBER_BIRTHDATE, \
            MEMBER_COUNTRY, MEMBER_CITY) VALUES (?, ?, ?, ?, ?, ?)", 
            [body.MEMBER_ID, body.MEMBER_FIRST_NAME, body.MEMBER_LAST_NAME, body.MEMBER_BIRTHDATE, 
            body.MEMBER_COUNTRY, body.MEMBER_CITY], 
            function (err) {
                if(err) 
                    {
                        return res.status(500).json({"error": err.message});
                    }
                else if(!res.headersSent) res.status(200).json({"USER_ID": this.lastID});
            }); 
}

module.exports.getAllMembers = (req, res) => {
    db.all("SELECT * FROM MEMBERS", [], 
            (err, members) => {
                if(err) 
                    {
                        return res.status(500).json({"error": err.message});
                    }
                res.status(200).json({members});
            });
}

module.exports.getMemberById = (req, res) => {
    db.get("SELECT * FROM MEMBERS WHERE MEMBER_ID=?", [req.params.id], 
            (err, member) => {
                if(err) 
                    {
                        return res.status(500).json({"error": err.message});
                    }
                res.status(200).json({member});
            });
}

module.exports.getAllUpcomingBirthdays = (req, res) => {
    db.all("SELECT * \
            FROM MEMBERS \
            ORDER BY CASE \
                WHEN strftime('%m-%d', datetime('now')) <= strftime('%m-%d', MEMBER_BIRTHDATE) THEN DATE(cast(strftime('%Y', datetime('now')) as text) || '-' || cast(strftime('%m-%d', MEMBER_BIRTHDATE) as text)) \
                ELSE DATE(cast(strftime('%Y', datetime('now')) + 1 as text) || '-' || cast(strftime('%m-%d', MEMBER_BIRTHDATE) as text)) \
            END", [], 
            (err, upcomingBirthdays) => {
                if(err) 
                    {
                        return res.status(500).json({"error": err.message});
                    }
                res.status(200).json({upcomingBirthdays});
            });
}

module.exports.updateMember = (req, res) => {
    var body = req.body;
    db.run("UPDATE MEMBERS \
            SET MEMBER_FIRST_NAME=?, MEMBER_LAST_NAME=?, MEMBER_BIRTHDATE=?, MEMBER_COUNTRY=?, MEMBER_CITY=? \
            WHERE MEMBER_ID=?", 
            [body.MEMBER_FIRST_NAME, body.MEMBER_LAST_NAME, body.MEMBER_BIRTHDATE, body.MEMBER_COUNTRY, 
            body.MEMBER_CITY, req.params.id],
            function (err) {
                if(err) 
                    {
                        return res.status(500).json({"error": err.message});
                    }
                res.status(200).json({"updatedID": this.changes});
            });
}

module.exports.deleteMember = (req, res) => {
    db.run("DELETE FROM MEMBERS WHERE MEMBER_ID=?", [req.params.id],
    (err) => {
        if(err) 
            {
                return res.status(500).json({"error": err.message});
            }
        res.status(200).json({"message": "The member has been deleted"});
    });
}
