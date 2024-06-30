//Lập trình sử dụng biến cơ bản
let maNhanVien = 'ms001';
let tenNhanVien = 'Bưởi';
let CCCD = '0234212';
let email = 'buoi@gmail.com';
let sdt = '09033343';
let gioiTinh = 'Nữ';
let fbLink = 'fb.com/buoi'
//Sử dụng array:
let thongTinNhanVien = ['ms001','fb.com/buoi','Bưởi','0234212','buoi@gmail.com','09033343','Nữ'];
console.log('Tên nhân viên',thongTinNhanVien[2]);
//Object : Đối tượng
let ttnv = {
    key:'value',
    maNhanVien : 'ms001',
    tenNhanVien: 'Bưởi',
    CCCD: '0234212',
    email: 'buoi@gmail.com',
    sdt: '09033343',
    gioiTinh:'Nữ',
    fbLink: 'fbLink'
}
/*
    Cấu trúc của object: 
    object = {
        key:value
    }
    trong đó:
        key: hay còn gọi là tên thuộc tính
        value: gọi là giá trị của thuộc tính
        Truy xuất thuộc tính(key) của đối tượng: object['key'] hoặc object.key
*/
console.log('Tên nhân viên', ttnv['tenNhanVien']);
console.log(ttnv.email);
//Duyệt object: 
for(let key in ttnv){
    console.log(key, ttnv[key]);
}

/* CRUD: */
/*
    Read: Vòng lặp for in
        object['ten_thuoc_tinh'] hoặc object.thuocTinh
    Create: Thêm 1 thuộc tính vào đối tượng (Khi thêm thì key phải khác biệt)
        object.tenThuocTinhMoi = 'Giá trị'
        object['tenThuocTinhMoi'] = 'Giạ trị'
    Update: Thay đổi giá trị thuộc tính
        object['key'] = 'Giá trị mới'; //tương tự thêm tuy nhiên thì nếu key trùng nhau thì giá trị sau sẽ đè giá trị trước
    Delete: Xoá thuộc tính của object
        delete object.ten/
*/

ttnv.tuoi = 20;
let ob = {
    id:1,
    name:'abc',
    desc: 'lorem ...',
    showInfo: function () {
        console.log('id', ob.id);
        console.log('name',this.name) // this sẽ trỏ về đối tượng object chứa nó
    }    
}
//Lập trình hướng đối tượng: là đưa các biến và hàm về đúng đối tượng cần xử lý