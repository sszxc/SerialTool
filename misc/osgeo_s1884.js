// 来自在线计算器 https://www.osgeo.cn/app/s1884 的前端代码
// GPS，经度，纬度，距离在线计算器
// 按钮触发的是 computeform 函数

// CED subroutine for cleaning up JavaScript rounding errors
// to any reasonable number of decimal places 5/5/1997 last mod 2/19/2004
// round for decimal of (value of precision) places, default is 3
// This routine can be used to pass a number and a number for precision
// or just a number only, that is to be rounded to a set number of decimal
// places. This routine supports leading and trailing zeros, leading and
// trailing spaces, and padding. To prevent errors, pass variables as a string.
function perRound(num, precision) {
    var precision = 3; //default value if not passed from caller, change if desired
    // remark if passed from caller
    precision = parseInt(precision); // make certain the decimal precision is an integer
    var result1 = num * Math.pow(10, precision);
    var result2 = Math.round(result1);
    var result3 = result2 / Math.pow(10, precision);
    return zerosPad(result3, precision);
}
function zerosPad(rndVal, decPlaces) {
    var valStrg = rndVal.toString(); // Convert the number to a string
    var decLoc = valStrg.indexOf("."); // Locate the decimal point
    // check for a decimal
    if (decLoc == -1) {
        decPartLen = 0; // If no decimal, then all decimal places will be padded with 0s
        // If decPlaces is greater than zero, add a decimal point
        valStrg += decPlaces > 0 ? "." : "";
    }
    else {
        decPartLen = valStrg.length - decLoc - 1; // If there is a decimal already, only the needed decimal places will be padded with 0s
    }
    var totalPad = decPlaces - decPartLen; // Calculate the number of decimal places that need to be padded with 0s
    if (totalPad > 0) {
        // Pad the string with 0s
        for (var cntrVal = 1; cntrVal <= totalPad; cntrVal++)
            valStrg += "0";
    }
    return valStrg;
}
// send the value in as "num" in a variable
// clears field of default value
function clear_field(field) {
    if (field.value == field.defaultValue) {
        field.value = ''
    }
}
var i = "";
var lat1 = "";
var lat2 = "";
var lon1 = "";
var lon2 = "";
var lat1dir = "";
var lat2dir = "";
var lon1dir = "";
var lon2dir = "";
function ClearForm(form) {
    form.latadm.value = "";
    form.lonadm.value = "";
    form.latadirdm.value = "";
    form.lonadirdm.value = "";
    form.latbdm.value = "";
    form.lonbdm.value = "";
    form.latbdirdm.value = "";
    form.lonbdirdm.value = "";
    form.latadd.value = "";
    form.lonadd.value = "";
    form.latadirdd.value = "";
    form.lonadirdd.value = "";
    form.latbdd.value = "";
    form.latbdirdd.value = "";
    form.lonbdd.value = "";
    form.lonbdirdd.value = "";
    form.meter.value = "";
    form.ft.value = "";
    form.km.value = "";
    form.mi.value = "";
    form.nmi.value = "";
    form.bearingd.value = "";
    form.bearingrd.value = "";
}
function checkform(form) {
    // i< 4 0 means illegal situation
    i = 0;
    //first fill the text boxes of top tow rows as appropriate
    //latitude a, b, and directions
    if (form.latadm.value != "") //use latadm as reference
        form.latadd.value = dmtodd(form.latadm.value);
    if (form.latadd.value != "" && form.latadm.value == "")
        form.latadm.value = ddtodm(form.latadd.value);//convert latadd into latadm
    if (form.latadirdm.value != "")
        form.latadirdd.value = form.latadirdm.value;//copy the direction from latdirdm to latdirdd
    if (form.latadirdd.value != "" && form.latadirdm.value == "") {
        form.latadirdm.value = form.latadirdd.value;//copy the direction from latdirdd to latdirdm
    }
    if ((form.latadirdd.value == "" && form.latadirdm.value == "") ||
        (form.latadirdd.value != form.latadirdm.value)) {
        form.latadirdd.value = "N";//make it default to N
        form.latadirdm.value = "N";
    }
    if (form.latbdm.value != "") //checking latitude b
        form.latbdd.value = dmtodd(form.latbdm.value);
    if (form.latbdd.value != "" && form.latbdm.value == "") {
        form.latbdm.value = ddtodm(form.latbdd.value);//convert latbdd into latbdm
    }
    if (form.latbdirdm.value != "") {
        form.latbdirdm.value = form.latbdirdd.value;//copy the direction from latbdirdm to latbdirdd
    }
    if (form.latbdirdd.value != "" && form.latbdirdm.value == "") {
        form.latbdirdm.value = form.latbdirdd.value;//copy the direction from latbdirdd to latbdirdm
    }
    if ((form.latbdirdd.value == "" && form.latbdirdm.value == "") ||
        (form.latbdirdd.value != form.latbdm.value)) {
        form.latbdirdd.value = "N";
        form.latbdirdm.value = "N";//make it default to N
    }
    //longitude a, b, and directions
    if (form.lonadm.value != "")
        form.lonadd.value = dmtodd(form.lonadm.value);
    if (form.lonadd.value != "" && form.lonadm.value == "") {
        form.lonadm.value = ddtodm(form.lonadd.value);//convert lonadd into lonadm
    }
    if (form.lonadirdm.value != "") {
        form.lonadirdd.value = form.lonadirdm.value;//copy the direction from lonadirdm to lonadirdd
    }
    if (form.lonadirdd.value != "" && form.lonadirdm.value == "") {
        form.lonadirdm.value = form.lonadirdd.value;//copy the direction from llonadirdd to lonadirdm
    }
    if (form.lonadirdd.value == "" && form.lonadirdm.value == "") {
        form.lonadirdd.value = "W";
        form.lonadirdm.value = "W";//make it default to W
    }
    if (form.lonbdm.value != "")
        form.lonbdd.value = dmtodd(form.lonbdm.value);
    if (form.lonbdm.value == "" && form.lonbdd.value != "") {
        form.lonbdm.value = ddtodm(form.lonbdd.value);//convert lonbdm into lonbdd
    }
    if ((form.lonbdirdd.value == "" && form.lonbdirdm.value != "") ||
        (form.lonbdirdd.value != "" && form.lonbdirdm.value != "")) {
        form.lonbdirdd.value = form.lonbdirdm.value;//copy the direction from lonbdirdm to lonbdirdd
    }
    if (form.lonbdirdd.value != "" && form.lonbdirdm.value == "") {
        form.lonbdirdm.value = form.lonbdirdd.value;//copy the direction from lonbdirdd to lonbdirdm
    }
    if (form.lonbdirdd.value == "" && form.lonbdirdm.value == "") {
        form.lonbdirdd.value = "W";
        form.lonbdirdm.value = "W";//make it default to W
    }
    //now check for possibility of non-computeable
    if (form.latadm.value != "")
        i = i + 1;
    if (form.lonadm.value != "")
        i++;
    if (form.latbdm.value != "")
        i++;
    if (form.lonbdm.value != "")
        i++;
    return true;
}
function computeform(form) {
    if (checkform(form)) {
        if (i < 4) {
            alert("没有足够的信息来计算");
        }
        else {
            initvar(form); //initialize variables
            rad_dist = calcraddistance();
            form.nmi.value = rad_dist * 3437.73877;
            //convert distance to other units
            form.mi.value = rad_dist * 3437.74677 * 1.1508;
            form.ft.value = form.mi.value * 5.2800102998e+3;
            form.km.value = form.mi.value * 1.6093470878864446;
            form.meter.value = form.km.value * 1000;
            rad_bear = calcradbearing();//calculate bearing in rad
            form.bearingrd.value = rad_bear;
            form.bearingd.value = rad_bear * 180 / Math.PI; //convert to degree
            //convert to other units
        }
    }
}
function dmtodd(st) { //read the dd.mmm string and return string dd.dddd
    //convert to minutes
    k = st.indexOf(".");
    j = st.length;
    if (k < 0) {
        dd = st;
        mm = "00";
    }
    else {
        dd = st.substring(0, k); //get dd
        mm = st.substring(k + 1, j); //get mm without the dot
    }
    //calculate the mm parts into the correct minutes
    j = 10;
    n = 0;
    for (k = 0; k < mm.length; k++) {//pick the mm character one at a time
        n1 = mm.substring(k, k + 1);
        n = n + n1 * j;
        j = j / 10;
    }
    k = dd * 60 + n; //convert to minutes
    k = k / 60; //convert to degree
    st1 = k + "";
    return (st1); //return dd.dd string
}
function ddtodm(st) { //convert the string dd.ddd into dd.mmm string
    k = st.indexOf(".");
    j = st.length;
    if (k == -1) {
        dd = st + ".";
        mm = "00";
    }
    else {
        dd = st.substring(0, k + 1); //get dd including the dot
        mm = st.substring(k, j); //get mm including the dot
    }
    k = eval(mm * 60); //convert .dd to minutes
    if (k < 1)
        st1 = "00" + k;
    else if (k < 10)
        st1 = "0" + k;
    else
        st1 = k + "";
    k1 = st1.indexOf(".");
    if (k1 > -1) { //get rid of the decimal point
        st1 = st1.substring(0, k1) + st1.substring(k1 + 1, st1.length);
    }
    // j = st1.length;
    // if(k < 10)
    // {
    // st1 = "0" + st1.substring(0,k1-2) + st1.substring(k1+1,j);
    // alert("k=" + k + " k1=" + k1 + " j=" + j + ", " + st1.substring(0,j-2) + "," +st1.substring(k1+1,j) );
    // }
    // else
    // {
    // st1 = st1.substring(0,k1-2) + st1.substring(k1+1,j);
    //st1=st1.substring(k1+1,j);
    // }
    st1 = dd + st1;
    return (st1); //return dd.dd floating point
}
function initvar(form) { //read data from form then convert to radian
    a = Math.PI / 180;
    lat1 = eval(form.latadd.value * a);//convert to radian
    lat2 = eval(form.latbdd.value * a);
    lat1dir = form.latadirdd.value;
    lat2dir = form.latbdirdd.value;
    lon1 = eval(form.lonadd.value * a);
    lon2 = eval(form.lonbdd.value * a);
    lon1dir = form.lonadirdd.value;
    lon2dir = form.lonbdirdd.value;
}
function calcraddistance() { //calculate readian distance, assume lat1, lon1, lat2, lon2 are in degrees
    t1 = Math.sin(lat1) * Math.sin(lat2);
    t2 = Math.cos(lat1) * Math.cos(lat2);
    t3 = Math.cos(lon1 - lon2);
    t4 = t2 * t3;
    t5 = t1 + t4;
    rad_dist = Math.atan(-t5 / Math.sqrt(-t5 * t5 + 1)) + 2 * Math.atan(1);
    return (rad_dist);
}
function radtonm(raddist) { //convert radian distance into nautical miles
    return (raddist * 3437.7387);
}
function calcradbearing() { //calculate bearing, return radian angle
    //b = acos(sin(Lat2) - sin(Lat1) * cos(rad_dist)/sin(rad_dist) * cos(Lat1))
    t1 = Math.sin(lat1) * Math.sin(lat2);
    t2 = Math.cos(lat1) * Math.cos(lat2);
    t3 = Math.cos(lon1 - lon2);
    t4 = t2 * t3;
    t5 = t1 + t4;
    rad_dist = Math.atan(-t5 / Math.sqrt(-t5 * t5 + 1)) + 2 * Math.atan(1);
    t1 = Math.sin(lat2) - Math.sin(lat1) * Math.cos(rad_dist);
    t2 = Math.cos(lat1) * Math.sin(rad_dist);
    t3 = t1 / t2;
    if (Math.sin(lon2 - lon1) < 0) {
        t4 = Math.atan(-t3 / Math.sqrt(-t3 * t3 + 1)) + 2 * Math.atan(1);
        rad_bearing = t4;
    }
    else {
        t4 = -t3 * t3 + 1;
        t5 = 2 * Math.PI - (Math.atan(-t3 / Math.sqrt(-t3 * t3 + 1)) + 2 * Math.atan(1));
        rad_bearing = t5;
    }
    return (rad_bearing);
}
// -