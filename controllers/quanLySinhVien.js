// MVC: 
/*
    M(Models): sẽ chứa các file liên quan đến đối tượng (class) và chỉ chứa class 
    C(Controller): File điều hướng giao diện (trùng tên với tên của view (file html là giao diện))
    V(View): Các file html là giao diện
*/
import { SinhVien } from "../models/SinhVien.js";
import {stringToSlug} from '../assets/util/method.js'
let arrSinhVien = [];
document.querySelector('#frmSinhVien').onsubmit = function (e) {
    e.preventDefault(); //ngăn reload trình duyệt
    console.log('submit')
    //input: sinhVien: object SinhVien Lấy dữ liệu từ giao diện đưa vào object
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        let id = input.id;
        let value = input.value;
        sv[id] = value
    }
    // console.log(sv);
    //Thêm sinh viên vào mảng (1)
    arrSinhVien.push(sv);
    // console.log(arrSinhVien,'arrSinhVien');
    renderTableSinhVien(arrSinhVien)
    //Sau khi thêm sinh viên vào mảng thì lưu mảng storage
    saveLocalstorage();
}   

/* 
    arrSV = [
        {maSinhVien:1,tenSinhVien:'Nguyễn Văn A',...} //index = 0
        {maSinhVien:2,tenSinhVien:'Nguyễn Văn B',...},// index = 1
        {maSinhVien:3,tenSinhVien:'Nguyễn Văn C',...}, // index =2
    ]
*/
window.renderTableSinhVien = function (arrSV) { //input là mảng 
    let htmlString = ''
    for(let sv of arrSV){
        htmlString +=`
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.soDienThoai}</td>
                <td>${sv.email}</td>
                <td>${sv.diemToan}</td>
                <td>${sv.diemLy}</td>
                <td>${sv.diemHoa}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-primary mx-2" onclick="chinhSua('${sv.maSinhVien}')">Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')" >Xoá</button>
                </td>
            </tr>
        `
    }
    //output: in ra giao diện html
    document.querySelector('tbody').innerHTML = htmlString;
    return htmlString;
}

/* 
    arrSV = [
        {maSinhVien:1,tenSinhVien:'Nguyễn Văn A',...} //index = 0
        {maSinhVien:2,tenSinhVien:'Nguyễn Văn B',...},// index = 1
        {maSinhVien:3,tenSinhVien:'Nguyễn Văn C',...}, // index =2
    ]
*/
window.xoaSinhVien = function (maSinhVien) {
    // console.log(maSinhVien);
    let indexDel = arrSinhVien.findIndex(sv => sv.maSinhVien === maSinhVien);
    if(indexDel !== -1) { //Nếu tìm thấy sinh viên có mã = với mã của nút click thì xoá sinh viên đó trong mảng
        arrSinhVien.splice(indexDel,1);
        console.log(arrSinhVien)
        renderTableSinhVien(arrSinhVien); //Sau khi xoá xong thì render lại table sinh viên từ mảng mới
    }
}
/* 
    arrSV = [
        {maSinhVien:1,tenSinhVien:'Nguyễn Văn A',...} //index = 0
        {maSinhVien:2,tenSinhVien:'Nguyễn Văn B',...},// index = 1
        {maSinhVien:3,tenSinhVien:'Nguyễn Văn C',...}, // index =2
        {maSinhVien:abc,tenSinhVien:'Nguyễn Văn C',...}, // index =3
    ]
*/
window.chinhSua = function (maSinhVien) {
    document.querySelector('#maSinhVien').disabled = true;
    let svUpdate = arrSinhVien.find(sv => sv.maSinhVien === maSinhVien);
    if(svUpdate) {
        // {maSinhVien:abc,tenSinhVien:'Nguyễn Văn C',...}, // index =3

        //Load sinh viên đó lên các thẻ form
        // document.querySelector('#maSinhVien').value = svUpdate.maSinhVien;
        // document.querySelector('#tenSinhVien').value = svUpdate.tenSinhVien;
        for (let key in svUpdate){
            document.querySelector(`#${key}`).value = svUpdate[key];
        }
    }
}
/*
     arrSV = [
        {maSinhVien:1,tenSinhVien:'Nguyễn Văn A',...} //index = 0
        {maSinhVien:2,tenSinhVien:'Nguyễn Văn B',...},// index = 1
        {maSinhVien:3,tenSinhVien:'Nguyễn Văn C',...}, // index =2
        {maSinhVien:abc,tenSinhVien:'Nguyễn Văn C',...}, // index =3
    ]
    [0xx1,0xx2,0xx3]
*/
document.querySelector('#btnLuuThongTin').onclick = function(e) {
    //Lấy tất cả thông tin từ giao diện đưa vào object 
    let svEdit = new SinhVien(); // {maSinhVien:'1',tenSinhVien:'b update',} 
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        let id = input.id;
        let value = input.value;
        svEdit[id] = value
    }
    console.log('svEdit',svEdit);
    //Sau khi lấy dữ liệu từ giao diện đưa vào object svEdit => tìm thằng trong mảng để cập nhật thông tin = svEdit
    let svTrongMang = arrSinhVien.find(sv => sv.maSinhVien === svEdit.maSinhVien);
    if(svTrongMang){ // {maSinhVien:1,tenSinhVien:'Nguyễn Văn A',...} //index = 0 
        // svTrongMang['maSinhVien'] = svEdit['maSinhVien'];
        for(let key in svTrongMang){
            svTrongMang[key] = svEdit[key];
        }
        //Mảng sau khi thay đổi thì render lại table từ mảng mới
        renderTableSinhVien(arrSinhVien);
        document.querySelector('#maSinhVien').disabled = false;
    }
}

document.querySelector('#frmTimKiem').onsubmit = function(e) {
    e.preventDefault();
    //input: keyword,loaiTimKiem
    let tuKhoa = document.querySelector('#tuKhoa').value;
    tuKhoa = stringToSlug(tuKhoa);
    let loai = document.querySelector('#loaiTimKiem').value;
    
    let arrSVTimKiem = [];
    //output: arr được filter theo từ khoá
    if(loai === 'sdt') {
        arrSVTimKiem = arrSinhVien.filter(sv => stringToSlug(sv.soDienThoai).search(tuKhoa) !== -1);
    }else if (loai === 'ten') {
        arrSVTimKiem = arrSinhVien.filter(sv => stringToSlug(sv.tenSinhVien).search(tuKhoa) !== -1);
    }
    
    //Sau khi filter thì dùng mảng kết quả render lại table
    renderTableSinhVien(arrSVTimKiem);
    if(arrSVTimKiem.length > 0)
    {   
        document.querySelector('#ketQuaTimKiem').className = 'alert alert-success mt-2';
        document.querySelector('#ketQuaTimKiem').innerHTML = `Tìm thấy ${arrSVTimKiem.length} sinh viên`;
    }else {
        document.querySelector('#ketQuaTimKiem').className = 'alert alert-danger mt-2';
        document.querySelector('#ketQuaTimKiem').innerHTML = `Không tìm thấy sinh viên nào`;
    }

}

/*
    tuKhoa = 'Nguyễn Văn A' => nguyen-van-a
    SEO Title
    arrSV = [
        {maSinhVien:1,tenSinhVien:'nguyen-van-a',...} //index = 0
        {maSinhVien:2,tenSinhVien:'nguyen-van-b',...},// index = 1
        {maSinhVien:3,tenSinhVien:'Nguyễn Văn C',...}, // index =2
        {maSinhVien:abc,tenSinhVien:'Nguyễn Văn C',...}, // index =3
    ]

*/


window.saveLocalstorage =  function () {

    //Biến đổi mảng thành string [] => "[]"
    let strSinhVien = JSON.stringify(arrSinhVien);
    //Lưu vào localstorage
    localStorage.setItem('arrSinhVien',strSinhVien);
    // console.log('strSinhVien',strSinhVien)
    // console.log('arrSinhVien',arrSinhVien)
}

window.loadLocalStorage = function () {
    if(localStorage.getItem('arrSinhVien')){ // []
        let strSinhVien = localStorage.getItem('arrSinhVien');
        arrSinhVien = JSON.parse(strSinhVien);
        renderTableSinhVien(arrSinhVien);
    }
}
loadLocalStorage();