const Doctor=require("../models/doctor")

// Generate a random 6-digit number
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Check if the generated number exists in the database
async function checkNumberInDatabase(accountId) {
    try{
        const isAccount=await Doctor.findOne({accountId})
    
        if(isAccount)
        return true;

        return false;
    }catch(err){
        console.log(err.message);
    }
}

// Generate a new number until a unique one is found
async function generateAccountId() {
  let accountId;
  let existsInDatabase = true;

  while (existsInDatabase) {
    accountId = generateRandomNumber();
    existsInDatabase = await checkNumberInDatabase(accountId);
  }

  return accountId;
}


module.exports =generateAccountId;