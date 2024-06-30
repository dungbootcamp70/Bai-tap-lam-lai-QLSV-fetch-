export function kiemTraRong(value,selectorError,name) {
    //     abc    .trim() => abc
    if(value.trim() === '') {
        document.querySelector(selectorError).innerHTML = `${name} không được bỏ trống !`;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}
export function kiemTraSo(value,selectorError,name) {
    let regexNumber = /^[0-9]+$/;
    if(regexNumber.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} phải là số !`;
    return false;
}

export function kiemTraEmail(value,selectorError,name) {
    let regexEmail = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    if(regexEmail.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
    return false;
}

export function kiemTraSoDienThoai(value,selectorError,name) {
    let regexPhoneVN = /^0[3|5|7|8|9][0-9]{8}$/;
    if(regexPhoneVN.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
    return false;
}

export function kiemTraTen(value,selectorError,name) {
    let regexName = /^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲỴÝỳỵỷỹĂăẠ-ỹ]+(\s[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲỴÝỳỵỷỹĂăẠ-ỹ]+)*)$/ig;
    if(regexName.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} không hợp lệ!`;
    return false;
}

export function kiemTraDoDai(value,selectorError,name,min,max) {
    let length = value.length;
    if(length > max || length < min) {
        document.querySelector(selectorError).innerHTML = `${name} từ ${min} - ${max} ký tự !`;
        return false;
    }
    document.querySelector(selectorError).innerHTML = ``;
    return true;
} 

export function kiemTraGiaTri(value,selectorError,name,min,max) {
    let number = +value;
    if(number < min || number>max) {
        document.querySelector(selectorError).innerHTML = `${name} có giá trị nhập từ ${min} - ${max} !`;
        return false;
    }
    document.querySelector(selectorError).innerHTML = ``;
    return true;

}





//destructuring: bóc tách giá trị từ object
// let prod = {
//     id:1,
//     name: 'product 1',
//     price:1000
// }

// let {id,name,price} = prod


// console.log(id);
// console.log(name);
// console.log(price);


/*
    1 + 1 = 2
    1 & 1 = true 1
    true & true = true
    true & true & false = false ( 0 )


    0 (falsy) 
    !!0 = false


*/


console.log('-------------------Biểu thức regular expression -------------------')

// let regexCybersoft = /cybersoft/ig

// let strInput = 'dlsahjldjsaldjsaCYbersoftdklsjhaldjsa';
// console.log(regexCybersoft.test(strInput)) // => true | false


// let regexPhoneNumberVN =  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

// console.log(regexPhoneNumberVN.test('080090909090'))