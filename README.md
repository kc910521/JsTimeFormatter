# JsTimeFormatter
javascript date formatter,formate then get old time

# DESC

  Extends JS Date object two ways to formate date;


# USAGE

  var dt = new Date();#            
  get                                    
  # Now Time #:                          
  dt.momentFormatter("yyyy-m-d")
  
  # Last Year #:                      
  dt.momentFormatter("yyyy-m-d")
  
  # Last Year With Jan #:                
  dt.momentFormatter("yyyy-1-mm-13")         
  
  # 30 Days Ago #:                              
  dt.momentCk("yyyy-m-d-30")
  
  # The Day Before 2000 #:               
  var dt2 = new Date(2000,0,1);
  dt2.momentCk("yyyy-mm-dd-1")
  
  #return Date Object From String
  regetDate("2016-28-01","yyyy-dd-mm")
  
