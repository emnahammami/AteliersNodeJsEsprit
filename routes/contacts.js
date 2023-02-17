const express =require("express")
const router=express.Router()
var contact=require("../models/contact.js")

  router.get('/',(req, res, next)=>{
   contact.find(
        (err, contacts) => {
            if(err){
                console.log("error message :"+err); 
            }
            else{
                //res.render(
                    //'form.twing',
                    res.json(
                    {
                        title : "Contact list",
                        cont : contacts
                    }
                   // )
                );
            }
        }
    );
    //res.json({message:'Hello'});
});
  router.post('/', function(req, res, next) {
    new contact({
        FullName : req.body.FullName,
        Phone : req.body.Phone
    })
    .save(
    (err,newcontact)=>{
        if (err)
            console.log("error message :"+err); 
        else{
            console.log(newcontact);
            res.json(" Contact : " + newcontact._id +" added");
        }
    }
    );
});
router.delete('/:id', function(req, res, next) {
  try
  {contact.findByIdAndDelete(req.params.id, (err, cont)=> {
    res.send('deleted');
  })
     
  // res.status(200).send({msg:"usser deleted",deleted})
  
 
  }
  catch (error) {
      res.status(500).send("couldnt delete user")
  
  }}

);
  module.exports = router;