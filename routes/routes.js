var express = require('express');
router = express.Router();
// var jwt = require('jsonwebtoken');
var sampleRoutes = require('../controllers/mainCtrl');
process.env.SECRET_KEY = "thisismysecretkey";


router.get('/getoldmobilesdtls', sampleRoutes.getoldmobilesdtlsCtrl);
router.post('/getnewmobilesdtls', sampleRoutes.getnewmobilesdtlsCtrl);
router.get('/getaccessoridtls', sampleRoutes.getaccessoridtlsCtrl);
router.get('/getitemsbyallids/:product_id/:tbl_id', sampleRoutes.getitemsbyallidsCtrl); //get product dtls
router.post('/getbrandmodelsdata', sampleRoutes.getbrandmodelsdataCtrl); //get brand models data
router.post('/submitsignupdata', sampleRoutes.submitsignupdataCtrl); //submit signup data
router.post('/submitlogindata', sampleRoutes.submitlogindataCtrl); //submit login data
router.post('/submitaddressdata', sampleRoutes.submitaddressdataCtrl); //submit address data start
router.get('/getcheckoutaddressdtls/:customer_id', sampleRoutes.getcheckoutaddressCtrl); //get checkout address dtls start
router.post('/PostPaymentorderDtls', sampleRoutes.PostPaymentorderCtrl); //submit Post PaymentDtls
router.get('/getProfilereportdtls/:customer_id', sampleRoutes.getProfilereportCtrl); //get Profile reportdtls strat
router.post('/removeAddressdata/:id', sampleRoutes.removeAddressdataCtrl); //remove Address data start
router.post('/submitupdateprofiledata', sampleRoutes.submitupdateprofileCtrl); //submit update profiledata start
router.post('/submitupdateaddressdata', sampleRoutes.submitupdateaddressCtrl); //submit update addressdata start
router.post('/getordersdata/:customer_id', sampleRoutes.getordersdataCtrl); //get orders data start
router.post('/getviewodersdata', sampleRoutes.getviewodersdataCtrl); //get view oders data start
router.post('/getlatestproducts', sampleRoutes.getlatestproductsCtrl); //get latest products start
router.get('/getbannersdatastart', sampleRoutes.getbannersdataCtrl); //get banners data start
router.post('/sendemail', sampleRoutes.sendemailCtrl);



//Fahasraa start 

router.post('/postsignupdetailsApp', sampleRoutes.postsignupdetailsAppCtrl);
router.post('/LoginApp', sampleRoutes.LoginAppCtrl);

//prev api 
router.post('/getfamilydetails', sampleRoutes.getfamilydetailsCtrl);
router.post('/getvistordetails', sampleRoutes.getvistordetailsCtrl);
router.post('/getvehicledetails', sampleRoutes.getvehicledetailsCtrl);

router.post('/gethelperdetails', sampleRoutes.gethelperdetailsCtrl);



router.post('/postfamilydetails', sampleRoutes.postfamilydetailsCtrl);
router.post('/postvehicledetails', sampleRoutes.postvehicledetails);
router.post('/postregularvisitorsdetails', sampleRoutes.postregularvisitorsdetailsCtrl);

router.post('/addhelperdetails', sampleRoutes.addhelperdetailsCtrl);



/// fahassara Admin Bhargav Start
router.post('/getUserForApproval', sampleRoutes.getUserForApprovalCtrl);

router.post('/postApproval', sampleRoutes.postApprovalCtrl);
router.post('/CancelApproval', sampleRoutes.CancelApprovalCtrl);

router.post('/Adminloginwithotppass', sampleRoutes.AdminloginwithotppassCtrl);
router.post('/Adminpostsignupdetails', sampleRoutes.AdminpostsignupdetailsCtrl);
router.post('/adminAcceptFamilyMembers', sampleRoutes.adminAcceptFamilyMembersCtrl);



router.post('/postApprovalFamily', sampleRoutes.postApprovalFamilyCtrl);
router.post('/CancelApprovalFamily', sampleRoutes.CancelApprovalFamilyCtrl);

/// fahassara Admin Bhargav End
router.post('/removepersondata', sampleRoutes.removepersondataCtrl); //remove person data

router.post('/getmemberdeatils', sampleRoutes.getmemberdeatilsCtrl); //get person data
router.post('/updatememberdetails', sampleRoutes.updatememberdetailsCtrl); //Update person data





//Fahasraa end 

module.exports = router;
