/**
 * Created by KCSTATION on 2015/11/18.
 * version 0.1
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
  }
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
      formatter = formatter.replaceTm(forTemp, tmTmp['tm']);
    }else if(new RegExp("("+ regSour +"+)").test(formaterOrg)){
      var forTemp = RegExp.$1;
      var tmTmp = rule[forTemp[0]];
      //alert(forTemp+","+tmTmp);
      formatter = formatter.replaceTm(forTemp, tmTmp['tm']);
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
  }
  var formaterOrg = formatter;
  for(var regSour in rule){
    if(new RegExp("("+ regSour +"+\-(\\d+))").test(formaterOrg)) {
      //time comp
      var forTemp = RegExp.$1;//eg:yyyy-1
      //original regexp str
      var tmHeadRep = new RegExp("("+regSour+"+)").exec(forTemp);//eg:yyyy
      var tmReduce = parseInt(new RegExp("(\\d+)").exec(forTemp));//eg:1
      var tmTmp = rule[tmHeadRep[0][0]];//eg:{tm:xxx}
      formatter = formatter.replaceTm(forTemp, parseInt(tmTmp['tm'])-tmReduce);
    }else if(new RegExp("("+ regSour +"+)").test(formaterOrg)){
      var forTemp = RegExp.$1;
      var tmTmp = rule[forTemp[0]];
      //alert(forTemp+","+tmTmp);
      formatter = formatter.replaceTm(forTemp, tmTmp['tm']);
    }
  }
  return formatter;
}

/**
 * push 0 to tm which <= 9
 * @param orgRegExp
 * @param targetStr
 * @returns {string}
 */
String.prototype.replaceTm = function (orgRegExp, targetStr) {
  try{
    if(parseInt(targetStr)<=0){
      targetStr = "01";
    }else if(parseInt(targetStr)<=9){
      targetStr = "0"+targetStr;
    }
  }catch(e){
    console.log("replaceTm error:"+e);
  }
  return this.replace(orgRegExp,targetStr);
}
