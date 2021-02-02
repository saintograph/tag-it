
//Unit test 1 : To check the function return value.
function is_url_tst1(str) {
    return true;
}

const test1 = is_url_tst1("https://www.coursera.org/")
if (test1) {
    console.log("Unit test 1 passed");
}
else {
    console.log("Unit test 1 failed");
}


//Unit test 2: To check the input parameter to the function is a string or not.
function is_url_tst2(str) {
    if (typeof (str) == "string") { 
        return true;
    }
    return false;
}

const test2 = is_url_tst2("https://www.coursera.org/")
if (test2) {
    console.log("Unit test 2 passed");
}
else {
    console.log("Unit test 2 failed");
}


//Unit test3: To check given URL is valid or not, test for valid and non - valid URL.
const regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
function is_url_tst3(str) { 
    if (regexp.test(str)) {
        console.log("valid")
        return true;
    }
    console.log("invlaid")
    return false;
}

const test3 = is_url_tst3("https://www.coursera.org/")
if (test3) {
    console.log("Unit test 3 passed");
}
else {
    console.log("Unit test 3 failed");
}

const test4 = is_url_tst3("https://www.coursera/")
if (test4) {
    console.log("Unit test 3 failed");
}
else {
    console.log("Unit test 3 passed");
}

//Function for validating valid web URL.
function is_url(str) {
    if (regexp.test(str)) {
        return true;
    }
    return false;
}




