const $GET = 'GET';
const $POST = 'POST';
const $PUT = 'PUT';
const $DELETE = 'DELETE';
const WARNING = 2;
const ERROR = 1;
const SUCCESS = 0;

/**
 * @param form <object>
 * @param url <string>
 * @param method <string>
 * @param others <object> <optional>
 * others.isJson <boolean> <when send object you must be set to "true">
 * others.isHTML <boolean> <when you want get response html>
 * others.isHideNotif <boolean> <when you want get response json without display notif>
 * others.isAlert <boolean>
 * others.alertTitle <string>
 * Example use:
 * if submit form data
 * sendFormData($('[name="form-add"]')[0], 'example/tes', 'post')
 * if send obj 
 * sendFormData({name:'tes'}, 'example/tes', 'post', {isJson:true}})
 * if want return html
 * sendFormData({name:'tes'}, 'example/tes', 'post', {isJson:true, isHTML: true}})
 * 
*/

/**
 * @param form <object>
 * @param url <string>
 * @param method <string>
 * @param others <object> <optional>
 * others.isJson <boolean> <when send object you must be set to "true">
 * others.isHTML <boolean> <when you want get response html>
 * others.isHideNotif <boolean> <when you want get response json without display notif>
 * others.isAlert <boolean>
 * others.alertTitle <string>
 * Example use:
 * if submit form data
 * sendFormData($('[name="form-add"]')[0], 'example/tes', 'post')
 * if send obj 
 * sendFormData({name:'tes'}, 'example/tes', 'post', {isJson:true}})
 * if want return html
 * sendFormData({name:'tes'}, 'example/tes', 'post', {isJson:true, isHTML: true}})
 * 
*/
async function sendFormData(form = "", url = "", method = "POST", others = {}) {
    let formData;
    let data = {};
    let $msg = "";
    if (url == "") {
        notify({ statusType: WARNING, text: 'Url is not set' })
        return;
    }
    if (method.toLowerCase == $POST.toLowerCase) {
        $msg = 'Success save data';
    }
    if (method.toLowerCase == $PUT.toLowerCase) {
        $msg = 'Updated data success';
    }
    if (method.toLowerCase == $DELETE.toLowerCase) {
        $msg = 'Delete data success';
    }

    if (others.isAlert) {
        if (!confirm(`Are you sure to ${others.alertTitle ? others.alertTitle : ""} this ?`)) {
            return false;
        }
    }

    if (others.isJson) {
        form.submit = 1;
        data.data = form;
        data.method = method;
    } else {
        formData = new FormData(form);
        formData.append('submit', 1);
        data.data = formData;
        data.method = method;
        data.isFormData = true;
    }
    data.isHTML = others.isHTML ? others.isHTML : false;
    try {
        let response = await request(url, data);
        if (response) {
            if (others.isHTML) {
                return response;
            }
            if (others.isHideNotif) {
                return response;
            } else {
                notify({ statusType: response.error, text: response.message ? response.message : $msg });
            }
            if (response.redirect) {
                SETTIMEOUT(() => { REDIRECT(response.redirect) });
                return;
            }
            //Reload when status error = 0
            if (response.error === SUCCESS) {
                if (response.isRefresh === false) {
                    return response;
                } else if (response.isRefresh === true) {
                    SETTIMEOUT('refresh');
                } else {
                    SETTIMEOUT('refresh');
                }

            }

            return response;
        } else {
            notify({ statusType: ERROR, text: 'System cannot proceed your request, please try again later' })
            return;
        }
    } catch (error) {
        console.log('Error 🚩 ', error.message);
        return { statusType: ERROR, text: 'System cannot proceed your request, please try again later' };

    }

}

function SETTIMEOUT(handler, time = 2000) {
    if (handler == 'refresh') {
        setTimeout(() => {
            window.location.reload();
        }, time);
    } else {
        setTimeout(handler, time);
    }
}

function REDIRECT(url) {
    window.location.href = url;
}

/**
 * @param url <string>
 * @param others<object> 
 * others.method <string>
 * others.headers <string> <optional> <custome headers>
 * others.data <object>
 * others.isFormData <boolean> <optional> <if want use form data>
 * others.isHTML <boolean> <optional> <if want return html>
*/
async function request(url, others = {}) {
    others.method = others.method ? others.method : $GET.toLowerCase();

    //Set default headers
    let headers = {
        method: others.method, // *GET, POST, PUT, DELETE, etc.
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    //Custome headers
    if (others.headers) {
        headers = others.headers;
    }

    //Set method to lowercase
    others.method = others.method.toLowerCase();

    if (typeof url == "undefined") {
        notify({ statusType: WARNING, text: 'Url is not set' });
        return;
    }

    if (others.data == "" && others.method == $POST.toLowerCase()) {
        notify({ statusType: WARNING, text: 'Data is not set' });
        return;
    }
    if (others.data == "" && others.method == $PUT.toLowerCase()) {
        notify({ statusType: WARNING, text: 'Data is not set' });
        return;
    }

    if (others.isFormData && others.method) {
        headers.headers = {};
        others.data = others.data;
    } else {
        others.data = new URLSearchParams(others.data)
    }

    //Init type request
    headers.headers['X-Requested-With'] = 'XMLHttpRequest';

    if (others.method == $POST.toLowerCase()
        || others.method == $PUT.toLowerCase()) {
        headers.body = others.data // body data type must match "Content-Type" header
    } else {
        url += "?" + new URLSearchParams(others.data);
    }

    const response = await fetch(url, headers);
    if (others.isHTML) {
        return response.text();
    } else {
        return response.json(); // parses JSON response into native JavaScript objects
    }
}

/**
 * @param event
 * add css "btn btn-danger"
 * add data-target(enter class name checkbox child),
 * data-area-del, data-url
 * how to use:
 * 1. create element div with class name area delete or something
 * <div class="area-delete"></div>
 * 2. in checked all (checkbox parent)
 * <input type="checkbox" class="checked-all" data-target="checkbox" data-area-del="area-delete" data-url="url" onclick="checkedAll(this)">
 * 3. in checkbox (checkbox child)
 * <input type="checkbox" data-parent="checked-all" onclick="checkbox(this)" class="checkbox" value="id">
*/
function checkedAll(event) {
    let checkboxChild = event.getAttribute('data-target');
    let dataUrl = event.getAttribute('data-url');
    let checkboxes = document.querySelectorAll(`.${checkboxChild}`);
    for (let i in checkboxes) {
        checkboxes[i].checked = event.checked
    }
    if (event.checked === false) {
        if (dataUrl || dataUrl != '') {
            createElBtnDeleteChecked({ event: event, isRemove: true });
        }
        return;
    } else {
        if (dataUrl || dataUrl != '') {
            createElBtnDeleteChecked({ event: event, total: checkboxes.length });
        }
        return;
    }
}
/**
 * 
 * @param {String} className 
 * @return {Array}
 * 
 * Output:
 * ["1","2","3"] 
 */
function getAllChecked(className = "") {
    if (className == "") {
        console.log('Ops. param is null');
        return;
    }
    let checkedVal = [];
    let checkeds = document.querySelectorAll(`.${className}:checked`);
    for (let i in checkeds) {
        if (typeof checkeds[i].value != "undefined") {
            checkedVal.push(checkeds[i].value);
        }
    }

    return checkedVal;
}

/**
 * @param event
 * add data-parent(enter class name checkbox parent)
 * how ro use in check in handler checkedAll()
*/
function checkbox(event) {
    let name = event.getAttribute('class');
    let checkedAll = event.getAttribute('data-parent');
    let classNameCheckAll = document.querySelector(`.${checkedAll}`);
    let checkboxes = document.querySelectorAll(`.${name}:checked`);
    if (checkboxes.length <= 0) {
        classNameCheckAll.checked = false;
        createElBtnDeleteChecked({ event: event, isRemove: true });
        return;
    } else {
        classNameCheckAll.checked = true;
    }
    createElBtnDeleteChecked({ event: event, total: checkboxes.length });
}

function createElBtnDeleteChecked(obj = {}) {
    let attrParent = obj.event.getAttribute('data-parent');
    attrParent = attrParent ? attrParent : obj.event.getAttribute('class');
    let parentChecked = document.querySelector(`.${attrParent}`);
    let attrChilds = obj.event.getAttribute('data-target');
    attrChilds = attrChilds ? attrChilds : obj.event.getAttribute('class');
    let url = parentChecked.getAttribute('data-url');
    let areaDel = parentChecked.getAttribute('data-area-del');
    let checkboxes = document.querySelectorAll(`.${attrChilds}:checked`);
    let ids = [];
    for (let i = 0; i < checkboxes.length; i++) {
        ids.push(checkboxes[i].value);
    }
    let elButtonDeleteChecked = `
        <button class="btn btn-danger" data-id='${JSON.stringify(ids)}' onclick="removeChecked(this,'${url}')" >Delete (${obj.total ? obj.total : 0})</button>
    `;
    document.querySelector(`.${areaDel}`).innerHTML = !obj.isRemove ? elButtonDeleteChecked : '';
}

async function removeChecked(event, url = "") {
    if (!confirm('Are you sure to delete this ?')) {
        return;
    }
    let ids = JSON.parse(event.getAttribute('data-id'));
    let response = '';
    try {
        for (let i in ids) {
            let endpoint = url + "/" + ids[i];
            response = await request(endpoint);
        }
        if (response) {
            notify({ statusType: response.error, text: response.message });
            SETTIMEOUT('refresh');
        } else {
            notify({ statusType: ERROR, text: 'Ops, something error' })
        }
    } catch (error) {
        notify({ statusType: ERROR, text: 'System cannot proceed your request, please try again later' })
    }
}

/**
 * download simple notify in https://github.com/simple-notify/simple-notify and inmport in template
 * @param param <objects>
 * param.title
 * param.text
 * param.status
 * param.type
 * param.autoClose
 * param.position
 * param.setTimeOut
 * param.effect
 * param.customClass
 * param.customIcon
*/
function notify(param = {}) {
    switch (param.statusType) {
        case 2:
        case 'warning':
            param.status = 'warning';
            param.title = 'Warning!';
            break;
        case 1:
        case 'error':
            param.status = 'error';
            param.title = 'Oops!';
            break;
        case 0:
        case 'success':
            param.status = 'success';
            param.title = 'Success';
            break;
        default:
            param.status = 'error';
            param.title = 'Notification';
            break;
    }
    param.title = param.title ? param.title : 'Message';
    param.text = param.text ? param.text : 'Notify text lorem ipsum';
    param.status = param.status ? param.status : 'error'; //warning, success, error
    param.type = param.type ? param.type : 3; // type: 1/2/3
    param.autoClose = param.autoClose ? param.autoClose : true;
    param.position = param.position ? param.position : 'right top';
    param.setTimeOut = param.setTimeOut ? param.setTimeOut : 1500;
    param.effect = param.effect ? param.effect : 'slide'; // effect: fade/slide
    param.customClass = param.customClass ? param.customClass : '';
    param.customIcon = param.customIcon ? param.customIcon : '';
    new Notify({
        status: param.status,
        title: param.title,
        text: param.text,
        effect: param.effect,
        speed: 300,
        customClass: param.customClass,
        customIcon: param.customIcon,
        showIcon: true,
        showCloseButton: true,
        autoclose: param.autoClose,
        autotimeout: param.setTimeOut,
        gap: 20,
        distance: 20,
        type: param.type,
        position: param.position
    })
}
/**
 * Handler Ex Change Key Index In Array
 * @param {Array} data 
 * @param {String} fnameKey 
 * @param {String/Array} fnameVal
 * @param {String} separator
 * @return Array
 */
function exChangeKeyInArray(data = [], fnameKey = "", fnameVal = "", separator = "") {
    let newData = [];
    for (let i in data) {
        let key = data[i][fnameKey];
        let value = [];
        if (Array.isArray(fnameVal)) {
            let last_index = fnameVal.length - 1;
            for (let index in fnameVal) {
                let f = fnameVal[index];
                let fval = last_index == index ? data[i][f] : data[i][f] + " " + separator + " ";
                value.push(fval);
            }
            value = value.join('');
        } else {
            value = data[i][fnameVal];
        }
        newData[key] = value;
    }
    return newData
}

/**
 * Handler Dropdown
 * @param {String} elName 
 * @param {Array} data 
 * @param {String} value 
 * @param {String} attr
 * 
 * Format data dropdown handler is : data[keyname] = value
 * Example:
 * let data = [];
 * data[1] = 'Anita';
 * data[2] = 'Dani';
 * data[3] = 'Noni'; 
 */
function DROPDOWN(elName, data, value, attr = "") {
    let elOption = '';
    for (let i in data) {
        if (value == i) {
            elOption += `<option value="${i}" selected>${data[i]}</option>`;
        } else {
            elOption += `<option value="${i}">${data[i]}</option>`;
        }

    }
    elOption = `<select ${attr}>${elOption}</select>`;
    document.querySelector(`${elName}`).innerHTML = elOption;
}
/**
 * Handler Rebuild Data
 * For data duplicate
 * @param $data [array]
 * @param $num [number] => start value change to null if same header but different detail item default 2
 * Example:
 * let data = [
 *    {'name' : 'Anita', age: 20}, //Duplicate name
 *    {'name' : 'Anita', age: 15}, //Duplicate name
 *    {'name' : 'Dani', age: 30}
 * ];
 * if you use this function will be get output when foreach data:
 * Table
 * ===========
 * No | Name  | Age
 * ===========
 * 1  | Anita | 20
 * 2  |       | 15
 * 3  | Dani  | 30
 */
function rebuild(data = [], num = 1) {
    if (data.length == 0) {
        console.log('Ops. data is empty');
        return false;
    }
    let lastIndex = data.length - 1;
    let lastRow = data[lastIndex];
    let fields = getKeys(lastRow);
    let fname = getKeys(lastRow)[0];
    let prevData = '';
    for (let index in data) {
        if (data[index][fname] == prevData) {
            for (let i in fields) {
                let f = fields[i];
                data[index][f] = i <= num ? '' : data[index][f];
            }
        }
        prevData = data[index][fname];
    }
    return data;
}

function getKeys(obj = {}) {
    let keys = Object.keys(obj);
    let keyName = [];
    for (let i in keys) {
        let fname = keys[i];
        keyName.push(fname);
    }
    return keyName;
}

/**
 * Handler Print
 * @param {String} uri
 *  
 */
function printMe(uri = "") {
    let openWindow = window.open(uri);
    openWindow.addEventListener('load', function () {
        openWindow.print();
        setTimeout(function () {
            openWindow.close();
        }, 100)
    });
}