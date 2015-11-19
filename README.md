# JsTimeFormatter
javascript date formatter,formate then get old time

# DESC

  Extends JS Date object two ways to formate date;


# USAGE

  var dt = new Date();
  get # Now Time : 
  dt.momentFormatter("yyyy-m-d")
  
  get # Last Year : 
  dt.momentFormatter("yyyy-m-d")
  
  get # Last Year With Jan : 
  dt.momentFormatter("yyyy-1-mm-13-d")
  
  get # 30 Days Ago : 
  dt.momentCk("yyyy-m-d-30")
  
  get # The Day Before 2000 : 
  var dt2 = new Date(2000,0,1);
  dt2.momentCk("yyyy-mm-dd-1")
