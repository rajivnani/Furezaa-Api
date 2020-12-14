var sqldb = require('../config/dbconnect');
var dbutil = require(appRoot + '/utils/dbutils');
var moment = require('moment');



exports.getoldmobilesdtlsMdl = function (callback) {
    var cntxtDtls = "getoldmobilesdtlsMdl";
    var QRY_TO_EXEC = `select * from add_old_products where d_in='0' `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.getnewmobilesdtlsMdl = function (data, callback) {
    var cntxtDtls = "getnewmobilesdtlsMdl";
    // SELECT * FROM add_new_products order BY price desc
    if (data.brand == undefined && data.sort == undefined) {
        var QRY_TO_EXEC = `select * from add_new_products`;
    }
    if (data.brand != undefined && data.sort == undefined) {
        var QRY_TO_EXEC = `select * from add_new_products  where brandname='${data.brand}'`;
    }
    if (data.brand == undefined && data.sort == 1) {
        var QRY_TO_EXEC = `SELECT * FROM add_new_products order BY price ASC`;
    }
    if (data.brand == undefined && data.sort == 2) {
        var QRY_TO_EXEC = `SELECT * FROM add_new_products order BY price desc`;
    }
    if (data.brand != undefined && data.sort == 1) {
        var QRY_TO_EXEC = `select * from add_new_products  where brandname='${data.brand}'  order BY price ASC`;
    }
    if (data.brand != undefined && data.sort == 2) {
        var QRY_TO_EXEC = `select * from add_new_products  where brandname='${data.brand}'  order BY price desc`;
    }
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.getaccessoridtlsMdl = function (callback) {
    var cntxtDtls = "getaccessoridtlsMdl";
    var QRY_TO_EXEC = `select * from accessories where d_in='0' `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
// get product dtls start
exports.getitemsbyallidsMdl = function (product_id, tbl_id, callback) {
    var cntxtDtls = "getitemsbyallidsMdl";
    if (tbl_id == 1) {
        var QRY_TO_EXEC = `SELECT * FROM add_new_products where product_id='${product_id}';`;
    }
    if (tbl_id == 2) {
        var QRY_TO_EXEC = `SELECT * FROM add_old_products where product_id='${product_id}';`;
    }
    if (tbl_id == 3) {
        var QRY_TO_EXEC = `SELECT * FROM accessories where product_id='${product_id}';`;
    }


    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
// get product dtls End
//get brand models data start
exports.getbrandmodelsdataMdl = function (callback) {
    var cntxtDtls = "getbrandmodelsdataMdl";
    var QRY_TO_EXEC = `SELECT * FROM branddetails where d_in='0';`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get brand models data End

//submit signup data start
exports.Signupdatachk = function (checksignupdata, callback) {
    var cntxtDtls = "Signupdatachk";
    var QRY_TO_EXEC = `SELECT * FROM tr_users_t where user_mail='${checksignupdata.user_mail}' and user_ph='${checksignupdata.user_ph}';`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.submitsignupdataMdl = function (signupdata, callback) {
    var cntxtDtls = "submitsignupdataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `insert into  tr_users_t (user_nm,user_ph,user_mail ,user_password,i_ts )  values('${signupdata.user_nm}','${signupdata.user_ph}','${signupdata.user_mail}','${signupdata.user_password}','${date}');`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//submit signup data end
//submit login data start
exports.submitlogindataMdl = function (logindata, callback) {
    var cntxtDtls = "submitlogindataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `SELECT * FROM tr_users_t where user_mail='${logindata.user_mail}' and user_password='${logindata.user_password}';`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//submit login data End
//submit address data start
exports.submitaddressdataMdl = function (addressdata, callback) {
    var cntxtDtls = "submitaddressdataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `insert into  users_address_t (customer_id,full_nm,eamil_addrs ,phone_number,country_nm,residential_address,posstal_code,town,i_ts )  values('${addressdata.customer_id}','${addressdata.full_nm}','${addressdata.eamil_addrs}','${addressdata.phone_number}','${addressdata.country_nm}','${addressdata.residential_address}','${addressdata.posstal_code}','${addressdata.town}','${date}');`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
exports.udateaddressindcator = function (addressdata, callback) {
    var cntxtDtls = "udateaddressindcator";
    var QRY_TO_EXEC = `update tr_users_t set address_ind='1' where id='${addressdata.customer_id}'`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//submit address data End
//get checkout address dtls start
exports.getcheckoutaddressMdl = function (customer_id, callback) {
    var cntxtDtls = "getcheckoutaddressMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `SELECT ua.*,user_nm,address_ind FROM users_address_t as ua
    join tr_users_t as ut on ut.id=ua.customer_id where ua.customer_id='${customer_id}' and ua.d_in=0;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//get checkout address dtls end
//submit Post PaymentDtls start
exports.getLatestOrderRecord = function (callback) {
    var cntxtDtls = "getLatestOrderRecord";
    var QRY_TO_EXEC = `select id from orders order by id desc limit 1;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.PostPaymentorderMdl = function (orderdata, random_number, callback) {
    var cntxtDtls = "PostPaymentorderMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    if (orderdata.payment_type == 'online') {
        var ps = 1

    } else {
        var ps = 0
    }
    var QRY_TO_EXEC = `INSERT INTO orders (order_no,customer_id,payment_type,cart_dtls, purchase_date,payment_id,payment_status,del_address,order_cost) VALUES('${random_number}','${orderdata.customer_id}','${orderdata.payment_type}','${orderdata.cart_dtls}','${date}','${orderdata.payment_id}','${ps}','${orderdata.address}','${orderdata.order_cost}') `;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.PostPaymentorderItemsMdl = function (ins_id, cart, customer_id, callback) {
    console.log(cart);
    var cntxtDtls = "PostPaymentorderItemsMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = '';
    var SUB_QRY_TO_EXEC = '';
    for (var i = 0; i < cart.length; i++) {
        SUB_QRY_TO_EXEC = `INSERT INTO order_items (tbl_in,order_id,item_id,quantity,item_cost,customer_id,first_img,product_nm,i_ts) VALUES('${cart[i].tbl_id}','${ins_id}','${cart[i].product_id}','${cart[i].qunty}','${cart[i].price}','${customer_id}','${cart[i].first_img}','${cart[i].modelname}','${date}') ;`;
        QRY_TO_EXEC = QRY_TO_EXEC + SUB_QRY_TO_EXEC;
    }

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
//submit Post PaymentDtls end

//get Profile reportdtls strat
exports.getProfilereportmdl = function (customer_id, callback) {
    var cntxtDtls = "getProfilereportmdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `SELECT * FROM tr_users_t where id='${customer_id}' and d_in=0;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get Profile reportdtls End
//remove Address data start
exports.removeAddressdataMdl = function (id, callback) {
    var cntxtDtls = "removeAddressdataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update users_address_t set d_in='1' where id='${id}'`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//remove Address data End

//submit update profiledata start
exports.submitupdateprofileMdl = function (updateprofile, callback) {
    var cntxtDtls = "submitupdateprofileMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update tr_users_t set user_nm='${updateprofile.user_nm}',user_ph='${updateprofile.user_ph}',user_mail='${updateprofile.user_mail}',user_password='${updateprofile.user_password}' where id='${updateprofile.id}'`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//submit update profiledata End
//submit update addressdata start
exports.submitupdateaddressMdl = function (updateaddress, callback) {
    var cntxtDtls = "submitupdateaddressMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update users_address_t set full_nm='${updateaddress.full_nm}',eamil_addrs='${updateaddress.eamil_addrs}',phone_number='${updateaddress.phone_number}',country_nm='${updateaddress.country_nm}',residential_address='${updateaddress.residential_address}',posstal_code='${updateaddress.posstal_code}',town='${updateaddress.town}' where id='${updateaddress.id}'`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//submit update addressdata End

//get orders data start
exports.getordersdataMdl = function (customer_id, callback) {
    var cntxtDtls = "getordersdataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `SELECT od.*,full_nm,eamil_addrs,phone_number,country_nm,residential_address,posstal_code,town FROM orders as od
    JOIN users_address_t as us on us.id=od.del_address where od.customer_id='${customer_id}' and us.d_in=0`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get orders data End
//get view oders data Start
exports.getviewodersdataMdl = function (data, callback) {
    var cntxtDtls = "getviewodersdataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `SELECT * FROM order_items where order_id='${data.id}'`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get view oders data End
//get latest products start
exports.getlatestproductsMdl = function (callback) {
    var cntxtDtls = "getlatestproductsMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `select * from add_new_products  where d_in='0'  order BY product_id desc`
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get latest products End
//get banners data start
exports.getbannersdataMdl = function (callback) {
    var cntxtDtls = "getbannersdataMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `select * from banner_lst_t  where d_in='0'`;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
    //get banners data End



/// Fahasraa start



exports.UserSignupchk = function (phone, callback) {
	var cntxtDtls = "in UserSignupchk";
	var QRY_TO_EXEC = `select * from f_user_logins where usr_phone = '${phone}'; `;
console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.postsignupdetailsMdl = function (data, callback) {
	var cntxtDtls = "in postsignupdetailsMdl";
 
	      var curDate = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');

	var QRY_TO_EXEC = `INSERT INTO 	f_user_logins(usr_phone,usr_name,usr_email,usr_pwd,signup_date)
	values( '${data.usr_phone}','${data.usr_name}','${data.usr_email}','${data.usr_pwd}' ,'${curDate}' ); `;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			
		 
				callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




exports.LoginAppCtrlMdl = function (logindata, callback) {
	var cntxtDtls = "in LoginAppCtrlMdl";
	var QRY_TO_EXEC = `select id,approval_in,role_id from f_user_logins where usr_phone = '${logindata.mobile}' and   usr_pwd = '${logindata.pass}'   and d_in=0`;
 console.log(QRY_TO_EXEC);

	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};







exports.getfamilydetailsMdl = function (data, callback) {
	var cntxtDtls = "in getfamilydetailsMdl";
	var QRY_TO_EXEC = `select * from  f_familydetails where user_id= '${data.user_id}' and d_in = '0' and family_visitor_ind='0'  order by i_its desc`;
////////console.log(QRY_TO_EXEC);
	
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.getvistordetailsMdl = function (data,callback) {
	var cntxtDtls = "in getvistordetailsMdl";
	var QRY_TO_EXEC = `SELECT * from f_familydetails where d_in = '0'  and family_visitor_ind='1' and user_id= '${data.user_id}' order by i_its desc;`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




exports.getvehicledetailsMdl = function (data,callback) {
	var cntxtDtls = "in getvehicledetailsMdl";
	var QRY_TO_EXEC = `SELECT * from  f_vehiclesdetails where d_in = '0'  and user_id= '${data.user_id}' order by i_its desc;`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




exports.gethelperdetailsMdl = function (data,callback) {
	var cntxtDtls = "in gethelperdetailsMdl";
	var QRY_TO_EXEC = `SELECT * from   f_helpers where d_in = '0'  and user_id= '${data.user_id}' order by i_its desc`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};






exports.postfamilydetailsmdl = function (data, callback) {
	var cntxtDtls = "in postfamilydetailsmdl";
    var curDate = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `INSERT INTO 	f_familydetails(f_name,f_relation,f_phone,f_email,f_gender,i_its,user_id)
	values('${data.f_name}','${data.f_relation}','${data.f_phone}','${data.f_email}','${data.f_gender}','${curDate}','${data.user_id}' ); `;
     //console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
				callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};






exports.updatefamilyimageMdl = function (imageupload, img_ind, updtitem, callback) {
	var cntxtDtls = "in updatefamilyimageMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var img_url = '';
	if (img_ind == 0) {
		img_url = ` f_photo = '${imageupload}'`;
	}
	var QRY_TO_EXEC = `UPDATE  f_familydetails SET ${img_url} WHERE id=${updtitem}`;
//	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};





exports.postvehicledetailsmdl = function (data, callback) {
	var cntxtDtls = "in postvehicledetailsmdl";
    var curDate = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `INSERT INTO 	f_vehiclesdetails(vehicle_owner_name,vehicle_number,vehicle_type,parking_slot,registration_num,i_its,user_id)
	values('${data.vehicle_owner_name}','${data.vehicle_number}','${data.vehicle_type}','${data.parking_slot}','${data.registration_num}','${curDate}','${data.user_id}' ); `;
     //console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
				callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.updatevehicleimageMdl = function (imageupload, img_ind, updtitem, callback) {
	var cntxtDtls = "in updatevehicleimageMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var img_url = '';
	if (img_ind == 0) {
		img_url = ` vehicle_img = '${imageupload}'`;
	}
	var QRY_TO_EXEC = `UPDATE  f_vehiclesdetails SET ${img_url} WHERE id=${updtitem}`;
//	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};





exports.postregularvisitorsdetailsmdl = function (data, callback) {
	var cntxtDtls = "in postregularvisitorsdetailsmdl";
    var curDate = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `INSERT INTO 	f_familydetails(f_name,f_relation,f_phone,f_email,i_its,family_visitor_ind,user_id)
	values('${data.f_name}','${data.f_relation}','${data.f_phone}','${data.f_email}','${curDate}' ,'1','${data.user_id}'); `;
     //console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
				callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};






exports.updateregularvisitorsimageMdl = function (imageupload, img_ind, updtitem, callback) {
	var cntxtDtls = "in updateregularvisitorsimageMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var img_url = '';
	if (img_ind == 0) {
		img_url = ` f_photo = '${imageupload}'`;
	}
	var QRY_TO_EXEC = `UPDATE  f_familydetails SET ${img_url} WHERE id=${updtitem}`;
//	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.addhelperdetailsmdl = function (data, callback) {
	var cntxtDtls = "in addhelperdetailsmdl";
    var curDate = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
	var QRY_TO_EXEC = `INSERT INTO 	f_helpers(h_name,h_number,h_occupation,i_its,user_id)
	values('${data.h_name}','${data.h_number}','${data.h_occupation}','${curDate}','${data.user_id}' ); `;
     console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
				callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};






exports.updatehelperimageMdl = function (imageupload, img_ind, updtitem, callback) {
	var cntxtDtls = "in updatehelperimageMdl";
	var date = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
	var img_url = '';
	if (img_ind == 0) {
		img_url = ` h_photo = '${imageupload}'`;
	}
	var QRY_TO_EXEC = `UPDATE  f_helpers SET ${img_url} WHERE id=${updtitem}`;
	console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



/// fahassara Admin Bhargav Start
exports.getUserForApprovalCtrlMdl = function (callback) {
	var cntxtDtls = "in getUserForApprovalCtrlMdl";
	var QRY_TO_EXEC = `SELECT * from   	f_user_logins where approval_in = '0'    order by id desc`;
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

exports.postApprovalMdl = function (data,callback) {
	var cntxtDtls = "in postApprovalMdl";
	var QRY_TO_EXEC = `update 	f_user_logins set approval_in = '1'    where id = '${data.user_id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.CancelApprovalMdl = function (data,callback) {
	var cntxtDtls = "in CancelApprovalMdl";
	var QRY_TO_EXEC = `update 	f_user_logins set approval_in = '2'    where id = '${data.user_id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




exports.AdminloginwithotppassCtrlMdl = function (data, callback) {
	var cntxtDtls = "in AdminloginwithotppassCtrlMdl";
	var QRY_TO_EXEC = `select * from 	f_user_logins where usr_phone = '${data.usr_phone}' and  usr_pwd = '${data.usr_pwd}' ; `;
console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.AdminUserSignupchk = function (phone, callback) {
	var cntxtDtls = "in studentSignupchk";
	var QRY_TO_EXEC = `select * from 	f_user_logins where usr_phone = '${phone}'; `;
//console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.AdminpostsignupdetailsMdl = function (data,otp, callback) {
	var cntxtDtls = "in AdminpostsignupdetailsMdl";
	console.log("jyo");
	console.log(data);
	console.log("thi");
	      var curDate = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');

	var QRY_TO_EXEC = `INSERT INTO 		f_user_logins(user_id,usr_phone,usr_name,usr_email,usr_pwd,confrim_pass,u_otp,signup_date)
	values('${data.user_id}','${data.usr_phone}','${data.usr_name}','${data.usr_email}','${data.usr_pwd}','${data.confrim_pass}','${otp}','${curDate}' ); `;
//console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			
			results.otp = otp;
			results.phone = data.usr_phone;
				callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


exports.adminAcceptFamilyMembersMdl = function ( callback) {
	var cntxtDtls = "in adminAcceptFamilyMembersMdl";
	var QRY_TO_EXEC = `SELECT f_familydetails.id,f_familydetails.f_name,f_familydetails.f_photo,f_familydetails.f_relation,f_familydetails.f_gender ,f_user_logins.usr_name FROM f_familydetails JOIN f_user_logins ON f_familydetails.user_id=f_user_logins.id where f_user_logins.approval_in=1 and f_familydetails.approval_id=0; `;
console.log(QRY_TO_EXEC);
	if (callback && typeof callback == "function")
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




exports.postApprovalFamilyMdl = function (data,callback) {
	var cntxtDtls = "in postApprovalFamilyMdl";
	var QRY_TO_EXEC = `update 	f_familydetails set approval_id = '1'    where id = '${data.user_id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



exports.CancelApprovalFamilyMdl = function (data,callback) {
	var cntxtDtls = "in CancelApprovalFamilyMdl";
	var QRY_TO_EXEC = `update f_familydetails set approval_id = '2'     where id = '${data.user_id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/// fahassara Admin Bhargav End
//remove person data start
exports.removepersondataMdl = function (data,callback) {
	var cntxtDtls = "in removepersondataMdl";
	var QRY_TO_EXEC = `update f_familydetails set d_in = '1'     where id = '${data.id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//remove person data End

//get person data start
exports.getmemberdeatilsMdl = function (data,callback) {
	var cntxtDtls = "in getmemberdeatilsMdl";
	var QRY_TO_EXEC = `select * from  f_familydetails where id = '${data.id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//get person data End

//get person data start
exports.updatememberdetailsMdl = function (data,callback) {
	var cntxtDtls = "in updatememberdetailsMdl";
	var QRY_TO_EXEC = `update f_familydetails set f_name='${data.f_name}', f_phone='${data.f_phone}', f_relation='${data.f_relation}', f_email='${data.f_email}',f_gender='${data.f_gender}' where id = '${data.id}'`;
console.log(QRY_TO_EXEC)
	if (callback && typeof callback == "function") {
		dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
			callback(err, results);
			return;
		});
	}
	else
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



//fahasraa end







