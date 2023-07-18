const { default: mongoose } = require("mongoose");

const db = async ()=>{
    try{
        const db_url = process.env.MONGODB_URL ||"";
        // console.log({db_url}); //To check if string is correct!
        let connectionWithDB = await mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
        if(connectionWithDB){
            console.log("Connected succesfully to ", connectionWithDB.connection.host);
        }else{
            throw new Error("Not able to connect...")
        }
    }catch(err){
        console.log("Found Error while Connecting... ", err);
    }

}
module.exports = db;