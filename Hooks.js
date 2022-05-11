/**
* funtion getFormatDate() some @params
* @param date | string
* @param formaDate | string
* return can be in the form only date or date time
* default form date is 'Y-m-d'
*/
function getFormatDateTime(date=null, formatDate='Y-m-d'){
  date = !date ?  new Date() : new Date(date);
  
  let arrFormatDate = [
    'Y-m-d','d-m-Y','Y/m/d','d/m/Y',
    'd-M-Y','Y-M-d', 'd/M/Y','Y/M/d',
    'Y M d','d M Y','Y-m-d H:i:s',
    'Y-m-d H:i','d-m-Y H:i:s','d-m-Y H:i',
    'Y/m/d H:i:s','d-M-Y H:i:s',
    'd-M-Y H:i','Y-M-d H:i','Y-M-d H:i:s',
    'Y/M/d H:i:s','Y/M/d H:i','Y/m/d H:i',
    'Y-m','m-Y','Y/m','m/Y','Y M','M Y',
    'Y-M','Y/M','M/Y','M-Y','Y','m',
    'd','M','H:i:s','H:i','i:s','H','i','s'
  ];
  let checkFormatDate = arrFormatDate.indexOf(formatDate) > -1;
 	let result = '';
  if(!checkFormatDate){
  	return 'Ops, sorry format date wrong';
  }
  
  let findFormatDate = arrFormatDate.find(item => item == formatDate);
    	
  let isSpace = formatDate.indexOf(' ') > -1;
  let regSymbol = new RegExp(' ','gi');
  
  //Change string to array
  let arrString = findFormatDate.split(regSymbol);
  let arrDate = [];
  if(isSpace){
  	for(let x in arrString){
      let resultFormatDate = _checkFormatDate(arrString[x], date);
      arrDate.push(resultFormatDate);
    }
  }else{
  	let resultFormatDate = _checkFormatDate(formatDate,  date);
    arrDate.push(resultFormatDate);
  }
  
  result = arrDate.join(' ');
  return result;
}

function _checkFormatDate(formatDate, date){
	let getYear = date.getFullYear();
  let getMonth = date.getMonth() + 1;
  let getDate =  date.getDate();
  let getHour = date.getHours();
  let getMinute =  date.getMinutes();
  let getSecond = date.getSeconds();
  
  let monthNames = ["Jan", "Feb", "March", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
	getMonth = getMonth.toString().length > 1 ? getMonth : `0${getMonth}`;
  getDate = getDate.toString().length > 1 ? getDate : `0${getDate}`;
  getHour = getHour.toString().length > 1 ? getHour : `0${getHour}`;
  getMinute = getMinute.toString().length > 1 ? getMinute : `0${getMinute}`;
  getSecond = getSecond.toString().length > 1 ? getSecond : `0${getSecond}`;
  
  let regSymbol = new RegExp('-|/|:|','gi');
	let dataFormatDate = formatDate.split(regSymbol);
  let newFormatDate = formatDate;
  //Check special character comma from format date
  let regComma = new RegExp(',', 'gi');
  //extract array string
  for(let x in dataFormatDate){
  	let stringDate = dataFormatDate[x].replace(regComma, '');
    let specialChar = new RegExp(stringDate, 'gi');
    let dateTime = '';
    //Check initial from format date
    if(stringDate == 'Y'){
    	dateTime = getYear;
    }else if(stringDate == 'm'){
    	dateTime = getMonth;
    }else if(stringDate == 'd'){
    	dateTime = getDate;
    }else if(stringDate == 'M'){
    	dateTime = monthNames[date.getMonth()];
    }else if(stringDate == 'H'){
    	dateTime = getHour;
    }else if(stringDate == 'i'){
    	dateTime = getMinute;
    }else if(stringDate == 's'){
    	dateTime = getSecond;
    }
    
    //Replace format date
    newFormatDate = newFormatDate.replace(specialChar,dateTime);
  }
  
  return newFormatDate;
}
/**End Get Format Date*/

/**Start Format Currency*/
/**
 *  function formatCurrency()
 *  @param numberCurrency  string | number
 *  @param currencyType string default value is IDR
 *  @param showCurrencyType bolean
 *  @param showSymbolCurrency bolean
 *  @param showDec bolean
 * 
 * */
 function formatCurrency(numberCurrency=0, currencyType=null, showCurrencyType=false, showSymbolCurrency=false, showDec=false){
	let currency = '';
    currencyType = !currencyType ? 'IDR' : currencyType;
    //Check null value numberCurrency
    if(!numberCurrency){ 
        console.log("Ops, value cannot be null");
        return;
    }
    //convert integer to  string
    numberCurrency = numberCurrency.toString();
    //Replace all symbol
    numberCurrency = numberCurrency.replace(/[^\w\s]| /gi, '');
    let arrCurrency = [
        {'currencyType':'idr', 'symbol' : 'Rp'},
        {'currencyType':'usd', 'symbol': '$'},
        {'currencyType':'sgd', 'symbol': '$'},
        {'currencyType':'jpy', 'symbol': '¥'},
        {'currencyType':'cny', 'symbol': '¥'},
        {'currencyType':'eur', 'symbol': '€'},
        {'currencyType':'myr', 'symbol': 'Rm'}
    ]
    let toLowerString = currencyType.toLowerCase();
    //Filter currency type 
    let resCurrency = arrCurrency.filter(item => item.currencyType.indexOf(toLowerString) > -1);
    //Check data resCurrency
    let isNotEmpty = resCurrency.length > 0 ? true : false;
    //Sparator for indonesia and malaysia (".")
    let symbolSparator =(toLowerString == 'idr' || toLowerString == 'myr') ? '.':',';;
    //Show code currency when showCurrencyType is true
    let symbolCurrency = showCurrencyType ? currencyType : '';
    let currDec = '';
    //Check and show symbol currency
    if(isNotEmpty && showCurrencyType){
        symbolCurrency = showSymbolCurrency ? resCurrency[0].symbol:resCurrency[0].currencyType.toLocaleUpperCase();
        currDec = showDec ? resCurrency[0].currencyType == 'idr' || resCurrency[0].currencyType == 'myr' ? ',00':'.00' :''
    }
    
    //create array from number currency and sort by desc
    let numSplit = numberCurrency.split("").reverse();
    let arrNum = [];
    let currNum = '';
    for(let x in numSplit){
        if(!(x%3) && x != 0){
            arrNum.push(currNum);
        arrNum.push(symbolSparator);
        }else{
            arrNum.push(currNum);
        }
        
        currNum = numSplit[x];
    }
  
    currency = symbolCurrency+" "+numSplit[numSplit.length - 1]+arrNum.reverse().join("")+currDec;
  
    return currency;
}
/**END Format Currency*/

/** START Check Type Data */
/**
 * function isArray check type data array
 * @param data Array
 * return boolean
 */
function isArray(data){
    return Array.isArray(data);
}
  
/**
 * function isObject check type data object
 * @param data Object
 * return boolean
 */
function isObject(data){
    let result = typeof data == 'object' && Array.isArray(data) == false ? true : false;

    return result;
}

/**
 * function isString check type data string
 * @param data String
 * return boolean
 */
function isString(data){
    let result = typeof data == 'string' && Array.isArray(data) == false ? true : false;

    return result;
}

/**
 * function isBoolean check type data boolean
 * @param data Boolean
 * return boolean
 */
function isBoolean(data){;
    return typeof data == 'boolean';
}

/** END Check Type Data */

/**START Filter Data Only String*/
/**
 * Filter data
 * @param data array
 * @param fieldName string
 * @param keyword string
 * 
 * return array or array json
*/
function filterData(data=[],fieldName='', keyword=''){
	if(!isArray(data) || !isString(fieldName) || !isString(keyword)){
  	    console.log('Ops, please check type data parameter');
  	    return;
    }
  
    let resultData = data.filter(function(item){
        if(isObject(item)){
            return item[fieldName].toString().indexOf(keyword) > -1;
        }else{
            return item.toString().indexOf(keyword) > -1;
        }
    })
    
    return resultData;
}
/**END Filter Data Only String*/

/** START Hash FNV */
/**
 * Visit https://github.com/philippelyp/php-fnv1a 
 * function hashFNV
 * @param str string
 * @param bit integer
 * default bit = 64
 * only use bit is 64,128 and 256
 * return hash FNV
 * */
function hashFNV(str, bit=64){
    if (!isString(str)){ 
      console.log('Ops, Type param wrong') 
      return ''
    };
    let bitArr = [64,128,256];
    let isThere = filterData(bitArr, '', bit.toString());
    if(isThere == 0){
      console.log('Ops, bit not found');
      return '';
    }
    let FNV1A_64_OFFSET = [0x2325,0x8422,0x9ce4,0xcbf2]
    let FNV1A_128_OFFSET = [0xc58d,0x6295,0x2175,0x62b8,0x0142,0x07bb,0x272e,0x6c62]
    let FNV1A_256_OFFSET = [0x0535,0xcaee,0xb4c8,0x1023,0xbbb3,0x47b6,0x5368,0xc8b1,0x76cc,0xc4e5,0xc384,0x2d98,0x5036,0xaac5,0x8dbc,0xdd26];
  
    let FNV1A_64_PRIME_LOW = 0x1b3;
    let FNV1A_128_PRIME_LOW = 0x13b;
    let FNV1A_256_PRIME_LOW = 0x163;
  
    let FNV1A_PRIME_SHIFT = 8;
  
    let FNV1A_64_LEN = FNV1A_64_OFFSET.length - 1;
    let FNV1A_128_LEN = FNV1A_128_OFFSET.length - 1;
    let FNV1A_256_LEN = FNV1A_256_OFFSET.length - 1;
  
    let pad_256 = 10;
    let pad_128 = 5;
    let pad_64 = 2;
    let padNum = '';
  
    let hash = [];
    let tmp = [];
    let final_hash = '';
    let FNV1A_PRIME_LOW = '';
    let FNV1A_LEN = '';
    
    if(bit == '64'){
      padNum = pad_64;
      hash = FNV1A_64_OFFSET;
      FNV1A_LEN = FNV1A_64_LEN;
      FNV1A_PRIME_LOW = FNV1A_64_PRIME_LOW;
    }else if(bit == '128'){
      padNum = pad_128;
      hash = FNV1A_128_OFFSET;
      FNV1A_LEN = FNV1A_128_LEN;
      FNV1A_PRIME_LOW = FNV1A_128_PRIME_LOW;
    }else if(bit == '256'){
      padNum = pad_256;
      hash = FNV1A_256_OFFSET;
      FNV1A_LEN = FNV1A_256_LEN;
      FNV1A_PRIME_LOW = FNV1A_256_PRIME_LOW;
    }
  
    for(let x = 0; x < str.length; x++){
      hash[0] ^= str.charCodeAt(x);
  
      // Multiply by the lowest order digit base
      for (i = 0; i <= FNV1A_LEN; i++) {
        tmp[i] = hash[i] * FNV1A_PRIME_LOW;
      }
  
      // Multiply by the other non-zero digit
      for (i = padNum; i <= FNV1A_LEN; i++) {
        tmp[i] += hash[i - padNum] << FNV1A_PRIME_SHIFT;
      }
  
      // Propagate carries
      for (i = 1; i <= FNV1A_LEN; i++) {
        tmp[i] += (tmp[i - 1] >> 16);
      }
  
      // Clamp
      for (i = 0; i <= FNV1A_LEN; i++) {
        hash[i] = tmp[i] & 0xffff;
      }
    }
  
    for (i = FNV1A_LEN; i >= 0; i--) {
      final_hash += hash[i].toString(16);
    }
  
    return final_hash;
  };
/** END Hash FNV*/

/** START Base64 */
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/javascript-base64.html
*
**/
var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },


    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
/** END Base64 */

/** START Session */
/**
 * function setSession to set session
 *  @param keyname string/Array
 *  @param data Array/Object 
*/
function setSession(keyname, data=null){
    let hashKeyName = '';
    if(isArray(keyname)){
      if(keyname.length == data.length){
        for(let x in keyname){
          hashKeyName = hashFNV(keyname[x].toString());
          localStorage.setItem(hashKeyName, JSON.stringify(data[x]));
        }
      }else{
        for(let x in keyname){
          let len = (x - 1) == -1 ? 0 : (parseInt(x) + 1) - 1;
          if(len < data.length){
            hashKeyName = hashFNV(keyname[x].toString());
            localStorage.setItem(hashKeyName, JSON.stringify(data[len]));
          }else{
            hashKeyName = hashFNV(keyname[x].toString());
            localStorage.setItem(hashKeyName, JSON.stringify({}));
          }
        }
      }
    }else{
      hashKeyName = hashFNV(keyname.toString());
      localStorage.setItem(hashKeyName, JSON.stringify(data));
    }
    
  
    return false;
}
  
/**
 * function getSession to get session
 *  @param keyname String/Array
 * return Array
 */
function getSession(keyname){
    let session = {};
    if(isArray(keyname)){
        for(let x in keyname){
        let key = keyname[x];
        session[key] = JSON.parse(localStorage.getItem(hashFNV(keyname[x].toString())));
        }
    }else{
        session = JSON.parse(localStorage.getItem(hashFNV(keyname.toString())));
    }
    if(!session){
        console.log('Ops, Session has not been set');
    }

    return session;
}

/**
 * function removeSession to remove Specific session
 *  @param keyname String/Array
 */
function removeSession(keyname){
    if(isArray(keyname)){
        for(let x in keyname){
        localStorage.removeItem(hashFNV(keyname[x]));
        }
    }else{
        localStorage.removeItem(hashFNV(keyname));
    }

    console.log('Session has been remove');

    return false;
}
  
/**
 * function clearAllSession to remove all session
 *  @param keyname string
 */
function clearAllSession(){
    localStorage.clear();

    return false;
}

/** END Session*/

/**START Get File Name From URL*/
function getFileNameFromUrl(str=null, isShowExt=false){
    if (!str) { 
      console.log('Ops, Something error') 
      return false
    }
    //Array extension
    let formatExts = ['jpg','jpeg','png','gif','ico','bmp','webp','psd','svg','tif','tiff','pdf','rar','zip','tar','deb','7z','pkg','rpm','tar.gz','docx','doc','rtf','txt','epub','odt','wpd','ppt','pptx','odp','xls','xlsx','xlsm','ods','mp4','m4v','avi','mkv','mpg','mpeg','wmv','3gp','flv','mov','mp3','mkv','wav','wma','ogg','mpa','mid','midi','csv','db','dbf','sql','xml','mdb','apk','bat','exe','jar','cgi','pl','py','js','html','css','fnt','fon','otf','ttf'];
    let regSymbol = new RegExp('//|/','gi');
    //Change string to array
    let splitString = str.split(regSymbol).pop();
    let isExt = false; 
    let ext = '';
    for(let x in formatExts){
        //Check format file from format exts  
        let isCheckFormat = splitString.indexOf('.'+formatExts[x]) > -1;
        if(isCheckFormat){
            isExt = true;
            ext = '.'+formatExts[x];
        }
    }
    
    //Check format value 
    if(!isExt){
      console.log('Ops, file name not found from url');
      return false;
    }
    let regSymbolSecond = new RegExp('-|_','gi');
    //Change string to  array
    splitString = splitString.split('.');
    //Replace symbol '-' and '_'
    let fileName = splitString[0].replace(regSymbolSecond,' ');
    //Convert string lower to uwords
    fileName = fileName.toLowerCase().replace(/\b[a-z]/g, item => item.toLocaleUpperCase());
  
    return isShowExt ? fileName+ext :  fileName;
}
/**END Get File Name From URL*/

/** START Increment And Decrement **/
/**
 * Function increment()
 * @param {number} num 
 * @param {number} maxNum 
 * @returns number
 */
function increment(num, maxNum = null){
  num = parseInt(num)
  if(num == maxNum){
    num = num
  }else{
    num = num+1
  }
  return num
}
/**
 * Function decrement()
 * @param {number} num 
 * @param {number} minNum 
 * @returns 
 */

function decrement(num, minNum =  null){
  num = parseInt(num)
  minNum = (!minNum) ? 0 : minNum
  if(num <= minNum){
    num = num
  }else{
    num = num - 1
  }

  return num
}

/** END Increment And Decrement **/

/** START Get Param From URL **/
/**
 * Function getParams()
 * Before  use getParams() encode url use Base64
 * @param {String} url 
 * @param {String} fieldName 
 * @returns 
 * 
 * Example format url :
 * 'https://www.example.com/search?component_id=02.02.01.04&navsource=home&q=iphone%2012&source=universe&st=product'
 * 'https://www.example.com/putragroup/handphone/ibox-iphone-12-pro-128gb-256gb-512gb-garasni-resmi-1-thn-128-256-512-128-gb-pacific-blue'
 */
function getParams(url, fieldName=null){
  url = Base64.decode(url)
  let urlParam;
  let obj = {}
  let isCheckCharQuestion = url.indexOf('?') > -1
  if(isCheckCharQuestion){
    urlParam = url.split('?').pop().split('&');
    for(let i in urlParam){
      let signSplit = urlParam[i].split('=');
      obj[signSplit[0]]=signSplit[1].replace(/%/g, ' ');
    }
  }else{
    urlParam = url.split('/')
    let len = urlParam.length
    urlParam = urlParam.slice(3, len)
    Object.assign(obj, urlParam)
  }

  return !fieldName  ?  obj : obj[fieldName] 
}
/** END Get Param From URL **/

/** START Object Type **/
/**
 * Function ObjectKey()
 * @param {Object} dataObj 
 * @param {String} fieldName 
 * @returns Object
 */
function ObjectKey(dataObj,fieldName = null){
  if(!isObject(dataObj)){
    console.log('Ops, Only type Object');
    return '';
  }

  dataObj = Object.keys(dataObj);
  let obj={}
  for(let x in dataObj){
    obj[dataObj[x]] = dataObj[x]
  }
  return fieldName ? obj[fieldName] : obj
}
/** END Object Type**/

/** STAR Word**/
/**
 * Function ucwords() 
 * @param {String} str 
 * @returns string
 */
function ucwords(str){
  str = str.toLowerCase().replace(/\b[a-z]/g, function(word){
    return word.toUpperCase()
  })
  
  return str
}
/**
 * Function ucfirst()
 * @param {String} str 
 * @returns string
 */
function ucfirst(str){
  str = str.charAt(0).toUpperCase()+str.slice(1)
  
  return str
}
/** END Word**/