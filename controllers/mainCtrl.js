/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// var moment = require('moment');
// var request = require('request');
// var querystring = require('querystring');
// var jwt = require('jsonwebtoken');
// var crypto = require('crypto');
// var http = require("https");

// process.env.SECRET_KEY = "thisismysecretkey";
// var appmdl = require('../models/mainModel');
// var AWS = require('aws-sdk');
// var awsS3 = 'config/aws.config.json';

process.env.SECRET_KEY = "thisismysecretkey";
var appmdl = require('../models/mainModel');
var fs = require('fs');
var request = require('request');
var nodemailer = require('nodemailer');

//secure start
exports.getoldmobilesdtlsCtrl = function (req, res) {
    appmdl.getoldmobilesdtlsMdl(function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
exports.getnewmobilesdtlsCtrl = function (req, res) {
    var data = req.body;

    appmdl.getnewmobilesdtlsMdl(data, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
exports.getaccessoridtlsCtrl = function (req, res) {
    appmdl.getaccessoridtlsMdl(function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}

// get product dtls start
exports.getitemsbyallidsCtrl = function (req, res) {
    var product_id = req.params.product_id;
    var tbl_id = req.params.tbl_id
    appmdl.getitemsbyallidsMdl(product_id, tbl_id, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}

// get product dtls End 
//get brand models data start
exports.getbrandmodelsdataCtrl = function (req, res) {
    appmdl.getbrandmodelsdataMdl(function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//get brand models data end
//submit signup data start
exports.submitsignupdataCtrl = function (req, res) {
    var signupdata = req.body;
    var checksignupdata = req.body;
    appmdl.Signupdatachk(checksignupdata, function (err, results) {

        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        if (results.length > 0) {
            res.send({ "status": 600, 'msg': 'already registered' });
        } else {
            appmdl.submitsignupdataMdl(signupdata, function (err, results) {
                if (err) {

                    res.send(500, "Server Error");
                    return;
                }
                res.send({ "status": 200, "data": results });
            });
        }
    });

}
//submit signup data end
//submit login data start
exports.submitlogindataCtrl = function (req, res) {
    var logindata = req.body;
    appmdl.submitlogindataMdl(logindata, function (err, results) {

        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//submit login data End
//submit address data start
exports.submitaddressdataCtrl = function (req, res) {
    var addressdata = req.body;
    appmdl.submitaddressdataMdl(addressdata, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        } if (results) {
            appmdl.udateaddressindcator(addressdata, function (err, upresults) {
                if (err) {

                    res.send(500, "Server Error");
                    return;
                }
                res.send({ "status": 200, "data": upresults });
            });
        }

    });

}
//submit address data End

//get checkout address dtls start
exports.getcheckoutaddressCtrl = function (req, res) {
    var customer_id = req.params.customer_id;
    appmdl.getcheckoutaddressMdl(customer_id, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//get checkout address dtls End
//submit Post PaymentDtls start
exports.PostPaymentorderCtrl = function (req, res) {
    var orderdata = req.body;
    var cart = orderdata.cart_items;
    var customer_id = orderdata.customer_id;
    appmdl.getLatestOrderRecord(function (err, getorderresults) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        var orderincId = 0;
        if (getorderresults.length == 0) {
            orderincId = 1;
        } else {
            orderincId = getorderresults[0].id
        }
        var random_number = Math.floor(Math.random() * 5664365850) + 1 + "" + orderincId;
        appmdl.PostPaymentorderMdl(orderdata, random_number, function (err, results) {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            if (results) {
                appmdl.PostPaymentorderItemsMdl(results.insertId, cart, customer_id, function (err, Itemresults) {
                    if (err) {
                        res.send(500, "Server Error");
                        return;
                    }

                    res.send({ "status": 200, "data": Itemresults, "msg": "submited" });
                });
            }
        });
    });

}
//submit Post PaymentDtls end
//get Profile reportdtls strat
exports.getProfilereportCtrl = function (req, res) {
    var customer_id = req.params.customer_id;
    appmdl.getProfilereportmdl(customer_id, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//get Profile reportdtls End
//remove Address data start
exports.removeAddressdataCtrl = function (req, res) {
    var id = req.params.id;
    appmdl.removeAddressdataMdl(id, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//remove Address data End
//submit update profiledata start
exports.submitupdateprofileCtrl = function (req, res) {
    var updateprofile = req.body;
    appmdl.submitupdateprofileMdl(updateprofile, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//submit update profiledata End
//submit update addressdata start
exports.submitupdateaddressCtrl = function (req, res) {
    var updateaddress = req.body;
    appmdl.submitupdateaddressMdl(updateaddress, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//submit update addressdata End
//get orders data start
exports.getordersdataCtrl = function (req, res) {
    var customer_id = req.params.customer_id;
    appmdl.getordersdataMdl(customer_id, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//get orders data End
//get view oders data start
exports.getviewodersdataCtrl = function (req, res) {
    var data = req.body;
    appmdl.getviewodersdataMdl(data, function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
  //get view oders data End
//get latest products start
exports.getlatestproductsCtrl = function (req, res) {
    // var data = req.body;
    appmdl.getlatestproductsMdl( function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//get latest products End
//get banners data start
exports.getbannersdataCtrl = function (req, res) {
    appmdl.getbannersdataMdl( function (err, results) {
        if (err) {
            res.send({ "status": 500, "msg": 'Data Submitted Failed' });
            return;
        }
        res.send({ "status": 200, "data": results, "msg": "submited" });
    });

}
//get banners data end


exports.sendemailCtrl = function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        host: "my.smtp.host",
  port: 465,
        auth: {
          user: 'sales@velumuriinfra.com',
          pass: 'vistas@2020'
        //   accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'
        },
        tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
      });
    
      var mailOptions = {
        from: 'sales@velumuriinfra.com',
        to: 'gorlajawahar@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log(info);
          console.log('Email sent: ' + info.response);
        }
      });
}




//////////////////////Fahasraa start ///////////////////////////////////////////







exports.postsignupdetailsAppCtrl = function (req, res) {
    var data = req.body;
    var usr_phone = req.body.usr_phone;
console.log(data)
    appmdl.UserSignupchk(usr_phone, function (err, results) {
        console.log(results.length);
        if (err) {
 res.send({"msg":'failed'});              return;
        }
         if(results.length==0|| results.length==''){
                         console.log("Not Exists")

            appmdl.postsignupdetailsMdl(data, function (err, resultss) {
                         if (err) {
 res.send({"msg":'failed'});                             return;
                         }
 res.send({"msg":'success'});                     });
           
            
        }else{
            console.log("Already")
              res.send({"msg":'already'});
        }
         
    });
}



//login
exports.LoginAppCtrl = function (req, res) {
    var data = req.body;
    appmdl.LoginAppCtrlMdl(data, function (err, results) {
        if (err) {

            res.send({ "msg": "failed" });
            return;
        }
        console.log(results.length>0)
        if(results.length>0){
                    res.send({"msg":'success',"data":results});

        }
        else{
            res.send({"msg":'invalid'});
        }
    });
}


//prev

exports.getfamilydetailsCtrl = function (req, res) {
    var data = req.body;
    ///console.log(data);
    appmdl.getfamilydetailsMdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.getvistordetailsCtrl = function (req, res) {
    var data = req.body;
    appmdl.getvistordetailsMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
exports.getvehicledetailsCtrl = function (req, res) {
     var data = req.body;
    appmdl.getvehicledetailsMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


exports.gethelperdetailsCtrl = function (req, res) { 
    var data = req.body;
    appmdl.gethelperdetailsMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

exports.postfamilydetailsCtrl = function (req, res) {
    
    var image_url = req.body.image_url;
    var data = req.body;
    appmdl.postfamilydetailsmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        //res.send({ 'status': 200, 'data': results });
        
            if(results) {
        var imgcnt = 0;
      
            var array = image_url.split(',');
            var datetimestamp = Date.now();
            var random_number = Math.floor(100000 + Math.random() * 900000);
            var unicnumber = random_number + '' + datetimestamp;
            var base64Data = array;
    
            // fs.writeFile("../public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
            fs.writeFile("..//public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
                console.log(err);
                
            });
            imageupload = "http://www.velumuriinfra.com/uploads/" + unicnumber  + ".jpg";
            appmdl.updatefamilyimageMdl(imageupload,imgcnt,results.insertId,function (err, results) {
                if (err) {
                    res.send(500, "Server Error");
                    return;
                }
               
            });
            imgcnt++;
            // if(reviewImgArr.length==imgcnt) {
            //     res.send(results);
            // } 
            res.send({ 'status': 200, 'data': results }); 


       
    }
        
        
    });
}




exports.postvehicledetails = function (req, res) {
    
    var image_url = req.body.image_url;
    var data = req.body;
    appmdl.postvehicledetailsmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        //res.send({ 'status': 200, 'data': results });
        
            if(results) {
        var imgcnt = 0;
      
            var array = image_url.split(',');
            var datetimestamp = Date.now();
            var random_number = Math.floor(100000 + Math.random() * 900000);
            var unicnumber = random_number + '' + datetimestamp;
            var base64Data = array;
    
            // fs.writeFile("../public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
            fs.writeFile("..//public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
                console.log(err);
                
            });
            imageupload = "http://www.velumuriinfra.com/uploads/" + unicnumber  + ".jpg";
            appmdl.updatevehicleimageMdl(imageupload,imgcnt,results.insertId,function (err, results) {
                if (err) {
                    res.send(500, "Server Error");
                    return;
                }
               
            });
            imgcnt++;
            // if(reviewImgArr.length==imgcnt) {
            //     res.send(results);
            // } 
            res.send({ 'status': 200, 'data': results }); 


       
    }
        
        
    });
}
exports.postregularvisitorsdetailsCtrl = function (req, res) {
    
    var image_url = req.body.image_url;
    var data = req.body;
    appmdl.postregularvisitorsdetailsmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        //res.send({ 'status': 200, 'data': results });
        
            if(results) {
        var imgcnt = 0;
      
            var array = image_url.split(',');
            var datetimestamp = Date.now();
            var random_number = Math.floor(100000 + Math.random() * 900000);
            var unicnumber = random_number + '' + datetimestamp;
            var base64Data = array;
    
            // fs.writeFile("../public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
            fs.writeFile("..//public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
                console.log(err);
                
            });
            imageupload = "http://www.velumuriinfra.com/uploads/" + unicnumber  + ".jpg";
            appmdl.updateregularvisitorsimageMdl(imageupload,imgcnt,results.insertId,function (err, results) {
                if (err) {
                    res.send(500, "Server Error");
                    return;
                }
               
            });
            imgcnt++;
            // if(reviewImgArr.length==imgcnt) {
            //     res.send(results);
            // } 
            res.send({ 'status': 200, 'data': results }); 


       
    }
        
        
    });
}



exports.addhelperdetailsCtrl = function (req, res) {
    
    var image_url = req.body.image_url;
    var data = req.body;
    appmdl.addhelperdetailsmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        //res.send({ 'status': 200, 'data': results });
        
            if(results) {
        var imgcnt = 0;
      
            var array = image_url.split(',');
            var datetimestamp = Date.now();
            var random_number = Math.floor(100000 + Math.random() * 900000);
            var unicnumber = random_number + '' + datetimestamp;
            var base64Data = array;
    
            // fs.writeFile("../public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
            fs.writeFile("..//public_html/uploads/" + unicnumber + ".jpg", base64Data, 'base64', function (err) {
                console.log(err);
                
            });
            imageupload = "http://www.velumuriinfra.com/uploads/" + unicnumber  + ".jpg";
            appmdl.updatehelperimageMdl(imageupload,imgcnt,results.insertId,function (err, results) {
                if (err) {
                    res.send(500, "Server Error");
                    return;
                }
               
            });
            imgcnt++;
            // if(reviewImgArr.length==imgcnt) {
            //     res.send(results);
            // } 
            res.send({ 'status': 200, 'data': results }); 


       
    }
        
        
    });
}

/// fahassara Admin Bhargav Start
 exports.getUserForApprovalCtrl = function (req, res) { 
     appmdl.getUserForApprovalCtrlMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send(results);
    });
}

exports.postApprovalCtrl = function (req, res) { 
    var data = req.body;
    appmdl.postApprovalMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({status:'Ok'});
    });
}


exports.CancelApprovalCtrl = function (req, res) { 
    var data = req.body;
    appmdl.CancelApprovalMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({status:'Ok'});
    });
}


exports.AdminloginwithotppassCtrl = function (req, res) {
   console.log("ADMIN")
    var data = req.body;
  
        appmdl.AdminloginwithotppassCtrlMdl(data, function (err, cres) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cres, "msg": '' });
        
        return;

    })
}



exports.AdminpostsignupdetailsCtrl = function (req, res) {
    var data = req.body;
    var usr_phone = req.body.usr_phone;

    appmdl.AdminUserSignupchk(usr_phone, function (err, results) {
      //  console.log(results.length);
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        if(results.length>0){
            
            res.send({ "status": 601, "data": results });
            
        }
         if (results == '') {
        //     res.send({ "status": 601, "msg": "Not Registered!!!" });
        // }
        // else { 
            var OTP = Math.floor(100000 + Math.random() * 900000);           
             var msg_title = 'iTEK';
             var msg_txt = `YOUR ONE TIME PASSWORD IS ${OTP} `;
             var destination = usr_phone;
             var message = msg_txt;
              request(`http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${destination}&senderid=EVBTEC&msg=${message}`, function (error, response, body) {
          
                 var msgData = { "messageId": body, "statusCode": response.statusCode, "smsDtls": data };
                 
                 if (response.statusCode == '200') {                                        
                     appmdl.AdminpostsignupdetailsMdl(data,OTP, function (err, results) {
                         if (err) {
                             res.send({ "status": 500, "msg": "Server Error" });
                             return;
                         }
                         res.send({ "status": 200, "data": results });
                     });
                 }else{
                    res.send({ "status": 500, "msg": "Server Error" });
                 }
             });
       }
        // } else {
        //         var OTP = Math.floor(100000 + Math.random() * 900000);               
        //          var msg_title = 'iTEK';
        //          var msg_txt = `YOUR ONE TIME PASSWORD IS ${OTP} `;
        //          var destination = phone;
        //         // console.log(destination)
        //          var message = msg_txt;
        //           request(`http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${destination}&senderid=DMOSMS&msg=${message}`, function (error, response, body) {
              
        //              var msgData = { "messageId": body, "statusCode": response.statusCode, "smsDtls": data };                    
        //              if (response.statusCode == '200') {
        //                  appmdl.insertmobileMdl(OTP,phone, function (err, results) {
        //                      if (err) {
        //                          res.send({ "status": 500, "msg": "Server Error" });
        //                          return;
        //                      }
        //                      res.send({ "status": 200, "data": results });
        //                  });
        //              }
        //              else{
        //                 res.send({ "status": 500, "msg": "Server Error" });
        //              }
        //          });
        // }
    });
}
/// fahassara Admin Bhargav End

 

exports.adminAcceptFamilyMembersCtrl = function (req, res) {
     appmdl.adminAcceptFamilyMembersMdl( function (err, results) {
        if (err) {
            res.send({ 'status': 400 });
            return;
        }
        res.send( results );
    });
}




exports.postApprovalFamilyCtrl = function (req, res) { 
    var data = req.body;
    appmdl.postApprovalFamilyMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({status:'Ok'});
    });
}


exports.CancelApprovalFamilyCtrl = function (req, res) { 
    var data = req.body;
    appmdl.CancelApprovalFamilyMdl(data,function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({status:'Ok'});
    });
}
//remove person data start

exports.removepersondataCtrl = function (req, res) {
    var data = req.body;
        appmdl.removepersondataMdl(data, function (err, cres) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cres, "msg": '' });
        
        return;

    })
}
//remove person data End
//get person data start
exports.getmemberdeatilsCtrl = function (req, res) {
    var data = req.body;
        appmdl.getmemberdeatilsMdl(data, function (err, cres) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cres, "msg": '' });
        
        return;

    })
}
//get person data End

//Update person data start
exports.updatememberdetailsCtrl = function (req, res) {
    var data = req.body;
        appmdl.updatememberdetailsMdl(data, function (err, cres) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cres, "msg": '' });
        
        return;

    })
}
//Update person data End




//Fahasraa end //////////////////////Fahasraa  End ///////////////////////////////////////////
