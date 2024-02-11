const Person = require('../models/person.js')

exports.add=(req,res)=>{
    try{
        const{fName, lname} = (req.body)
        const newPerson = new Person({fName:fName, lName:lName})
        newPerson.save()
        res.json({
            status:201,
            message:'Successfully Record has been Submitted',
            apidata:newPerson
        })
    }catch(erroe){
        res.json({
            status:400,
            message:error.message
        })
    }
}