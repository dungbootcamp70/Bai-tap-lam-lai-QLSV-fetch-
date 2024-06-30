import { SinhVien } from "../models/SinhVien.js";
import { kiemTraDoDai, kiemTraEmail, kiemTraGiaTri, kiemTraRong, kiemTraSo, kiemTraSoDienThoai, kiemTraTen } from "../assets/util/validation.js";
//Cách 1: dùng thư viện axios (tương tác với api của backend)
console.log(axios);
//Cách 2: Dùng fetch của browser (tương tác với api của backend)
console.log(fetch);
//--------------------------------------------------------------------------
function getDataSinhVienApi () {
    //Dùng axios
    let promise = axios({
        url: 'https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', // Đường dẫn backend cung cấp
        method:'GET', //Phương thức backend qui định cho api
        responseType: 'json' // Định dạng của dữ liệu trả về
    });
    //Xử lý thành công 
    promise.then(function(response){ //hàm này sẽ chạy khi server trả kết quả (qua biến response)
        console.log(response.data);
        //Xử lý dom để hiển thị dữ liệu lên giao diện
        // document.querySelector('#content').innerHTML = JSON.stringify(response.data);
        renderTableSinhVien(response.data);
    })
    //Xử lý thất bại
    promise.catch(function(err) {
        //Hàm này sẽ chạy khi lỗi server gửi về
        console.log(err)
    });

    console.log('ok')
}

async function getSinhVienApiAsync() {
     //Dùng axios
     try {
        let response = await axios({
            url: 'https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', // Đường dẫn backend cung cấp
            method:'GET', //Phương thức backend qui định cho api
            responseType: 'json' // Định dạng của dữ liệu trả về
        });
        console.log('oke')
        console.log(response.data);
        renderTableSinhVien(response.data);
    }catch(err) {
        console.log(err);
    }
}

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

window.onload = function(e) {
    //Khi nào window load tất cả xong thì sẽ chạy hàm này
    // getDataSinhVienApi();
    getSinhVienApiAsync();

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

    // for(let key in sv){
    //     valid &= kiemTraRong(sv[key],`#err_required_${key}`, key);
    // }

    if(!valid){
        return;
    }

    //Xử dụn axios để đưa dữ liệu về server
    let response = await axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //Đường dẫn đến file xử lý của server (api)
        method:'POST',
        data:sv //sv = {"maSinhVien":1,....}
    });
    //Sau khi thêm sinh viên thành công gọi lại api lấy danh sách sinh viên
    getSinhVienApiAsync();
    // console.log(response.data);
}


window.xoaSinhVien = async function(maSinhVien){
    //Tạo ra link api xoá
    let urlXoa = `https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`;
    let response = await axios({
        url:urlXoa,
        method:'DELETE'
    });
    console.log(response.data);
    //Sau khi xoá thành công thì gọi lại api lấy danh sách sinh viên 
    getSinhVienApiAsync();
}

//Hàm setInterval là hàm sẽ chạy liên tục sau mỗi thời gian qui định
setInterval(function() {
    getDataSinhVienApi();
},5000); //5000 là 5000 mili giây hàm function sẽ chạy 1 lần

//Update sinh viên
window.chinhSua = async function (maSinhVien) {
    //Tạo đường link url cho lấy thông tin 1 sinh viên
    let url = `https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`;
    //Gọi api lấy thông tin sinh viên từ id
    let res = await axios({
        url:url,
        method:'GET'
    });
    console.log(res.data)
    let svEdit = res.data;
    //Sau khi lấy dữ liệu từ api của sinh viên đó về thì load dữ liệu lên control tương ứng với id của input
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        input.value = svEdit[input.id];
    }
}


document.querySelector('#btnLuuThongTin').onclick = async function(e) {
    //Lấy dữ liệu người dùng nhập từ giao diện bỏ vào object api qui định
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        sv[input.id] = input.value;
    }
    //sv = {maSinhVien,tenSinhVien,....} =>format backend qui định
    //url backend qui định
    let urlCapNhat = `https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sv.maSinhVien}`;

    let response = await axios({
        url:urlCapNhat,
        method:'PUT',
        data:sv
    })
    console.log(response.data);
    //Sau khi cập nhật thành công thì load lại api lấy danh sách sinh viên
    getSinhVienApiAsync()
}