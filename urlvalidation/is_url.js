
//Unit test 1 : To check the function return value.
function is_url_tst1(str) {
    
    return true;
}
test1 = is_url_tst1("https://www.coursera.org/")
if (test1) console.log("Unit test 1 passed");
else console.log("Unit test 1 failed");


//Unit test 2: To check the input parameter to the function is a string or not.
function is_url_tst2(str) {
    if (typeof (str) == "string") { 
        return true;
    }
    else {
        return false;
    }

}
test2 = is_url_tst2("https://www.coursera.org/")
if (test2) console.log("Unit test 2 passed");
else console.log("Unit test 2 failed");

//Unit test3: To check given URL is valid or not, test for valid and non - valid URL.
function is_url_tst3(str) {
    regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (regexp.test(str)) {
        console.log("valid")
        return true;
    }
    else {
        console.log("invalid")
        return false;
    }
}
test3 = is_url_tst3("https://www.coursera.org/")
if (test3) console.log("Unit test 3 passed");
else console.log("Unit test 3 failed");

test4 = is_url_tst3("https://www.coursera/")
if (test4) console.log("Unit test 3 failed");
else console.log("Unit test 3 passed");

//Function for validating valid web URL.
function is_url(str) {
    regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (regexp.test(str)) {
        alert(str+" is a Valid url");
        return true;
    }
    else {
        alert(str+" is a  invalid url!");
        return false;
    }
}

is_url(window.location.href);



