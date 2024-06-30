// let user = {
//     email:'user@gmail.com',
//     password:'123',
//     phone: '09090909'
// }
// let admin = {
//     email:'admin@gmail.com',
//     password:'123456',
//     phone:'08080808'
// }

//prototype(class) - lớp đối tượng
//ES5
// function Member () {
//     this.email = ''; //this: context ngữ cảnh con trỏ this
//     this.password = '';
//     this.phone = '';
//     this.desc = '';
//     this.showInfo = function () {
//         console.log(`info
//             email: ${this.email}
//             password: ${this.password}
//             phone: ${this.phone}
//             desc: ${this.desc}
//         `)
//     }
// }

console.log('--------------------------- Prototype (Class) - Lớp đối tượng -----------------------------------------')
//ES6
class Member {
    //Thuộc tính
    email = '';
    password = '';
    phone = '';
    desc = '';
    //Phương thức
    showInfo() {
        console.log(`info
                        email: ${this.email}
                        password: ${this.password}
                        phone: ${this.phone}
                        desc: ${this.desc}
        `)
    }
    login() {
        if (this.email === 'cybersoft' && this.password === '123') {
            console.log('đăng nhập thành công !')
            return true;
        }
        console.log('email password không đúng');
        return false;
    }
}

let user = new Member();
user.password = 123;
user.email = 'user@gmail.com';
user.phone = '0909090';
user.desc = 'user info'
user.showInfo();
user.login()
console.log(user)
let admin = new Member();
admin.email = 'admin@gmail.com';
admin.password = '123456';
admin.phone = '08080808';
admin.desc = 'admin info';
admin.showInfo();
admin.login();
console.log(admin);

console.log('----------------------Quản lý và Xử lý trên đối tượng (object)---------------------------')

//Cấu trúc lưu trữ
/*
    2 dạng dữ liệu trong lập trình 
    primitive value(dữ liệu cơ sở): number, string, boolean, undefined, null 
    non-primitive value (reference value): object, array (object) (đối tượng - instance)
*/
let number1 = 5; // xx1 = 5
let number2 = number1; // xx1 = 5
number2 = 10; //xx2 = 5 
console.log('number1', number1);// 5
console.log('number2', number2);// 10
let ob1 = { // yy1 = 'xx1' 
    number: 5,
    name: 'abc'
}
let ob2 = { ...ob1 }; //spread operator (shadow clone) 
ob2.number = 10;
ob2.name = 'aaaa';
console.log('ob1', ob1);//5 5
console.log('ob2', ob2);//5 10

// ----- deep clone ----
let prod = {
    id: 1,
    name: 'iphone',
    price: 1000,
    desc: {
        img: 'https://i.pravatar.cc',
        shortDesc: '.....'
    }
}
let proClone = _.cloneDeep(prod);
proClone.id = 2;
proClone.desc.img = 'http://picsum.photos'
console.log(prod);
console.log(proClone);
/*
    Kết luận: 
    Khi ta cần update thông tin object thì không cần clone object
    Khi ta cần sao chép object để xử lý các tác vụ khác thì ta sẽ clone(spreed operator) hoặc cloneDeep
*/

/* ----------------------------------------- Array object - array method ----------------------------------------------------------- */
let arrStr = ['a','b','d'];
//index        0   2   3
const phones = [
    { id: 1, name: "iPhone 12", price: 1200, type: "Apple" }, //0
    { id: 2, name: "iPhone 12 Pro", price: 1500, type: "Apple" }, //1
    { id: 3, name: "iPhone 12 Mini", price: 1000, type: "Apple" }, //2
    { id: 4, name: "Samsung Galaxy S21", price: 1300, type: "Samsung" }, //3
    { id: 5, name: "Samsung Galaxy S21 Ultra", price: 1700, type: "Samsung" }, //4
    { id: 6, name: "Samsung Galaxy Note 20", price: 1400, type: "Samsung" }, //5
    { id: 7, name: "Sony Xperia 1 II", price: 1100, type: "Sony" }, //6
    { id: 8, name: "Sony Xperia 5 II", price: 1300, type: "Sony" }, //7
    { id: 9, name: "Sony Xperia 10 II", price: 1000, type: "Sony" },//8
    { id: 10, name: "OnePlus 8 Pro", price: 1000, type: "OnePlus" }, //9
    { id: 11, name: "OnePlus 8T", price: 1100, type: "OnePlus" }, //10
    { id: 12, name: "OnePlus 9222", price: 1300, type: "OnePlus" }, //11
    { id: 13, name: "Google Pixel 5", price: 1050, type: "Google" }, //12
    { id: 14, name: "Google Pixel 4a 5G", price: 1000, type: "Google" }, //13
    { id: 15, name: "Google Pixel 4 XL", price: 1200, type: "Google" },//14
    { id: 12, name: "Google Pixel 4 XL", price: 1200, type: "Google" },//15
];
// phones[1].price = 2000;
let phoneUpdate = phones[1];
phoneUpdate.price = 2000;
console.log(phones);
for(let phoneItem of phones){
    console.log(phoneItem);
}

/*
    Lấy ra các sản phẩm (object phone) có type là Apple
    filter: là phương thức của array dùng để thoả điều kiện của function bên trong với kết quả trả về là 1 mảng 
*/
function getApplePhone() {
    let output = [];
    for (let phone of phones){
        if(phone.type === 'Apple'){
            output.push(phone)
        }
    }
    return output;
}
let res1 = getApplePhone();
console.log(res1);

// let res_1 = phones.filter(function(phone) { return phone.type === 'Apple' } )
let res_1 = phones.filter(phone => phone.type === 'Apple' )
//Lấy ra các sản phẩm có giá từ 1000 đến 1500
let res_2 = phones.filter(item => item.price >= 1000 && item.price <=1500 );
console.log('Sản phẩm giá từ 1000 - 1500: ',res_2);

/*
    Lấy ra sản phẩm có id là 12 thay đổi giá tiền thành 2000
    .find: tương tự filter tuy nhiên kết quả trả về là phần tử đầu tiên khớp với biểu thức return. nếu không có phần tử nào khớp với biểu thức return thì trả về undefined => thường dùng cho các nghiệp vụ update phần tử trên mảng
    .findIndex: tương tự find tuy nhiên khi tìm thấy giá trị thoả biểu thức return thì trả về index (thay vì element). Nếu không tìm thấy thì trả về -1 => thường dùng cho nghiệp vụ xoá
*/
function getProductById(id) {
    let prod = undefined; //Chưa xác định
    for (let phone of phones){
        if (phone.id === id) {
            prod = phone;
            break;
        }
    }
    return prod;
}
// let phone_result = getProductById(12);
// phone_result.price = 2000;
// console.log(phones);
let phoneItem = phones.find(item => item.id === 12);
if(phoneItem !== undefined) { //truthy 
    phoneItem.price = 2000;
    phoneItem.name = 'Phone 12';
}
//Xoá sản phẩm có id là 14 trong mảng
let indexDel = phones.findIndex(item => item.id === 14);
if(indexDel !== -1){
    phones.splice(indexDel,1);
}
//Xoá tất cả sản phẩm là samsung
let phoneFilter = phones.filter(item => item.type !== 'Samsung');
console.log(phoneFilter)







//truthy và falsy: Giá trị mà js cho là đúng gọi là truthy ngược lại giá trị sai gọi là falsy
/*
if(truthy) <=> if (true) : Đúng thì làm
    if (true)
    if ({})
    if ([])
    if (42)
    if ("0")
    if ("false")
    if (new Date())
    if (-42)
    if (12n)
    if (3.14)
    if (-3.14)
    if (Infinity)
    if (-Infinity)
if (falsy) <=> if (false) :Sai Không làm
    if (false)  
    if (null)  
    if (undefined)  
    if (0)  
    if (-0)  
    if (0n)  
    if (NaN)  
    if ("")  
 */



