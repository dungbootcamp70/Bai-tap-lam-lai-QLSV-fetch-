import { SinhVien } from "../models/SinhVien.js";
import {stringToSlug} from "../assets/util/method.js"
import { kiemTraDoDai, kiemTraEmail, kiemTraGiaTri, kiemTraRong, kiemTraSo, kiemTraSoDienThoai, kiemTraTen } from "../assets/util/validation.js";
async function getAllSinhVienAsync() {
    const response = await fetch('https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien');
    const data = await response.json();
    // console.log(data)
    renderTableSinhVien(data);
};
getAllSinhVienAsync();



async function insertSinhVienAsync(sinhVienOb) { //format sinh viên api
    const response = await fetch('https://svcy.myclass.vn/api/SinhVienApi/themSinhVien',{
        method:'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(sinhVienOb)
    });
    const data = await response.json();
    console.log(data);
}

window.chinhSua = async function (maSinhVien) {
    //Tạo đường link url cho lấy thông tin 1 sinh viên
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,{
        method:'GET',
        headers: {
            'Content-Type': 'Application/json'
        },
        // body: JSON.stringify(obUpdate)
    });
    const data = await response.json();
    console.log(data);
    //Sau khi lấy dữ liệu từ api của sinh viên đó về thì load dữ liệu lên control tương ứng với id của input
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        input.value = data[input.id];
    }
}

async function updateSinhVienAsync (id,obUpdate){ 
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(obUpdate)
    });
    const data = await response.json();
    console.log(data);
}
// let obUpdate = {...obCreate};
// obUpdate.tenSinhVien = 'AAAAA'
// // updateSinhVienAsync(5312,obUpdate)

async function deleteSinhVienAsync(id) {
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/xoaSinhVien?maSinhVien=${id}`, {
        method:'DELETE'
    });

    const data = await response.json();
    console.log(data);

}

window.xoaSinhVien = async function(maSinhVien){
    //Tạo ra link api xoá
    // let urlXoa = `https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`;
    // let response = await axios({
    //     url:urlXoa,
    //     method:'DELETE'
    // });
    deleteSinhVienAsync(maSinhVien)
    console.log(response.data);
    //Sau khi xoá thành công thì gọi lại api lấy danh sách sinh viên 
    getAllSinhVienAsync();
}

// deleteSinhVienAsync(16)
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

//Thêm sinh viên
document.querySelector('#frmSinhVien').onsubmit = async function(e) {
    e.preventDefault();
    //input: Dữ liệu người dùng nhập từ form
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        sv[input.id] = input.value;
    }
    //Kiểm tra dữ liệu nhập có hợp lệ hay không 
    /* Kiểm tra rỗng (bắt buộc nhập) */
    let {maSinhVien,tenSinhVien,soDienThoai,email,diemHoa,diemLy,diemToan,diemRenLuyen,loaiSinhVien} = sv;
    let valid = true;
    valid &= kiemTraRong(maSinhVien,'#err_required_maSinhVien','Mã sinh viên') & kiemTraRong(tenSinhVien,'#err_required_tenSinhVien','Tên sinh viên') & kiemTraRong(email,'#err_required_email','Email') & kiemTraRong(soDienThoai,'#err_required_soDienThoai','Số điện thoại');
    //Kiểm tra định dạng số (regex number)
    valid &= kiemTraSo(maSinhVien,'#err_number_maSinhVien','Mã sinh viên');
    let arrInputNumber = document.querySelectorAll('.form-control[data-type=number]');
    for(let inputNumber of arrInputNumber){
       let {id} = inputNumber; //Lấy ra id của thẻ
       let selector = document.querySelector(`[data-id=${id}]`);
       valid &= kiemTraSo(sv[id],`#${selector.id}`, id );
    }
    //Kiểm tra định dạng tên
    valid &= kiemTraTen(sv.tenSinhVien,'#err_regexName_tenSinhVien','Tên sinh viên');
    //Kiểm tra số điện thoại
    valid &= kiemTraSoDienThoai(sv.soDienThoai,'#err_regexPhone_soDienThoai','Số điện thoại');
    //Kiểm tra email
    valid &= kiemTraEmail(sv.email,'#err_regexEmail_email','Email');
    //Kiểm tra độ dài của giá trị
    valid &= kiemTraDoDai(maSinhVien,'#err_min_max_length_maSinhVien','Mã sinh viên',1,5);
    //Kiểm tra giá trị 
    valid &= kiemTraGiaTri(diemToan,'#error-min-max-value','Điểm toán',1,10);
    if(!valid){
        return;
    }
    insertSinhVienAsync(sv)
    getAllSinhVienAsync();

}

document.querySelector('#frmTimKiem').onsubmit = async function(e) {
    e.preventDefault();
    const response = await fetch('https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien');
    const arrSinhVien= await response.json();
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
document.querySelector('#btnLuuThongTin').onclick = async function(e) {
    //Lấy dữ liệu người dùng nhập từ giao diện bỏ vào object api qui định
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        sv[input.id] = input.value;
    }
    updateSinhVienAsync(sv.maSinhVien,sv)
    //sv = {maSinhVien,tenSinhVien,....} =>format backend qui định
    //url backend qui định
    // let urlCapNhat = `https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sv.maSinhVien}`;

    // let response = await axios({
    //     url:urlCapNhat,
    //     method:'PUT',
    //     data:sv
    // })
    // console.log(response.data);
    //Sau khi cập nhật thành công thì load lại api lấy danh sách sinh viên
    getAllSinhVienAsync();
}
window.onload = function(e) {
    //Khi nào window load tất cả xong thì sẽ chạy hàm này
    // getDataSinhVienApi();
    getAllSinhVienAsync();

}
setInterval(function() {
    getAllSinhVienAsync();
},5000);