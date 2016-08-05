/**
 * Created by KCSTATION on 2015/11/18.
 * version 0.1.2
 *
 * date formatter,
 * for reduce year,month...
 *
 *
 * momentFormatter:
 *more simple,it shows perfect when use to reduce year
 * 推荐使用去得到之前的年
 *
 * momentCk:recommended
 * for special request more powerful and accurate but would
 * under level of request
 * which will not get error date even in month -100 and day-100
 * 推荐使用得到之前时间的月,最好为日
 */


Date.prototype.momentCk = function (formatter){
  var rule = {
    "m": {
      tm: this.getMonth()+1,
      tmInterval: 1000 * 60 * 60 * 24 * 30
    },
    "d": {
      tm: this.getDate(),
      tmInterval: 1000 * 60 * 60 * 24
    },
    "y": {
      tm: this.getFullYear(),
      tmInterval: 1000 * 60 * 60 * 24 * 30 * 12
    }
  };
  //sum reduced value
  var allTmReduce = 0;
  var formaterOrg = formatter;
  for(var regSour in rule){
    if(new RegExp("("+ regSour +"+\-(\\d+))").test(formaterOrg)) {
      //time fixed
      var forTemp = RegExp.$1;//eg:yyyy-1
      //original regexp str
      var tmHeadRep = new RegExp("("+regSour+"+)").exec(forTemp);//eg:yyyy
      var tmReduce = parseInt(new RegExp("(\\d+)").exec(forTemp));//eg:1
      //using rule[tmHeadRep[0][0] because of tmHeadRep[0] == ???,???
      var tmTmp = rule[tmHeadRep[0][0]];//eg:{tm:xxx,tmInterval:xxxxx}
      allTmReduce += tmReduce * parseInt(tmTmp['tmInterval']);
      formatter = formatter.replaceTm(forTemp, tmTmp['tm'],tmHeadRep[0]);
    }else if(new RegExp("("+ regSour +"+)").test(formaterOrg)){
      var forTemp = RegExp.$1;
      var tmTmp = rule[forTemp[0]];
      //alert(forTemp+","+tmTmp);
      formatter = formatter.replaceTm(forTemp, tmTmp['tm'],forTemp);
    }
  }
  //this time,formatter has get tmvalue ，eg:2012-01-01
  if(allTmReduce == 0){
    return formatter;
  }else{
    //orginal time value
    var tmOrg = new Date(formatter);
    //get last timestamp reduced
    var tmStamp = tmOrg.getTime()-allTmReduce;
    console.log("formatter:"+formatter);
    console.log("db:"+tmOrg.getTime()+"-"+allTmReduce+"="+tmStamp);
    var reReduceStr = new RegExp("(\-(\\d+))");
    var lastRegExpStr = formaterOrg.replace(reReduceStr,"");
    //alert("last:"+lastRegExpStr);
    allTmReduce = 0;
    return (new Date(tmStamp)).momentCk(lastRegExpStr);
  }

};

/**
 * usage:
 * regetDate("2016-03-01","yyyy-mm dd")
 * you can get a date object from string
 * by formatter
 * 可以通过日期串得到日期的对象
 * @param orgStr
 * @param formatter
 * @returns {*} date object
 */
function regetDate(orgStr,formatter){
    if (orgStr == undefined || formatter == undefined){
        console.log("ERROR:func regetDate parameter missed");
        return null;
    }
    var year = "";
    var month = "";
    var day = "";
    for (var idx = 0; idx < formatter.length; idx ++){
        if (formatter[idx] == "Y" || formatter[idx] == "y"){
            year = year + orgStr[idx] +"";
        }
        if (formatter[idx] == "m" || formatter[idx] == "M"){
            month = month + orgStr[idx] +"";
        }
        if (formatter[idx] == "d" || formatter[idx] == "D"){
            day = day + orgStr[idx] +"";
        }
    }
    if (isNaN(year) || isNaN(month) || isNaN(day)){
        console.log("NOT NUMBER ERROR");
        return null;
    }else{
        if (month <= 0){
            console.log("NOT NEED SUB 1 MONTH.");
        }else{
            month -= 1;
        }
    }
    return new Date(year,month,day);
}

/**
 * simple formater
 * 有日期减法边界情况无法超越年或月边界
 * @param formatter
 * @returns {*}
 */
Date.prototype.momentFormatter = function (formatter){
  var rule = {
    "m": {
      tm: this.getMonth() + 1,
    },
    "d": {
      tm: this.getDate(),
    },
    "y": {
      tm: this.getFullYear(),
    }
  };
  var formaterOrg = formatter;
  for(var regSour in rule){
    if(new RegExp("("+ regSour +"+\-(\\d+))").test(formaterOrg)) {
      //time comp
      var forTemp = RegExp.$1;//eg:yyyy-1
      //original regexp str
      var tmHeadRep = new RegExp("("+regSour+"+)").exec(forTemp);//eg:yyyy
      var tmReduce = parseInt(new RegExp("(\\d+)").exec(forTemp));//eg:1
      var tmTmp = rule[tmHeadRep[0][0]];//eg:{tm:xxx}
      formatter = formatter.replaceTm(forTemp, parseInt(tmTmp['tm'])-tmReduce,tmHeadRep[0]);
    }else if(new RegExp("("+ regSour +"+)").test(formaterOrg)){
      var forTemp = RegExp.$1;
      var tmTmp = rule[forTemp[0]];
      //alert(forTemp+","+tmTmp);
      formatter = formatter.replaceTm(forTemp, tmTmp['tm'],forTemp);
    }
  }
  return formatter;
};

/**
 * push 0 to tm which <= 9
 * @param orgRegExp
 * @param targetStr
 * @returns {string}
 */
String.prototype.replaceTm = function (orgRegExp, targetStr,modelStr) {
  //var msLength = modelStr.length;
  try{
    if(parseInt(targetStr)<=0){
      targetStr = "1";
    }
  }catch(e){
    console.log("replaceTm error:"+e);
  }
  var tarStrFn = targetStr;
  //alert("modelStr.:"+modelStr+",targetStr.length:"+(targetStr+"").length+":::::orgRegExp:"+orgRegExp+",targetStr:"+targetStr);
  for(var a = 0;a < ((modelStr+"").length-(targetStr+"").length); a++){
    tarStrFn = "0"+ tarStrFn;
  }
  //alert(tarStrFn);
  return this.replace(orgRegExp,tarStrFn);
};
