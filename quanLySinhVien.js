import { SinhVien } from "./models/SinhVien.js";
document.querySelector('#frmSinhVien').onsubmit = function (e) {
    e.preventDefault(); //ngăn reload trình duyệt
    console.log('submit')
    //input: sinhVien: object SinhVien
    let sv = new SinhVien();
    let arrInput = document.querySelectorAll('#frmSinhVien .form-control');
    for(let input of arrInput){
        let id = input.id;
        let value = input.value;
        sv[id] = value
    }
    console.log(sv);
    //output: htmlString `<tr> <td></td> `
    let htmlString = '';
    //process
    htmlString = `
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
                <button class="btn btn-primary mx-2">Chỉnh sửa</button>
                <button class="btn btn-danger" onclick="xoaSinhVien(this)" >Xoá</button>
            </td>
        </tr>
    `;
    //in output ra giao diện
    document.querySelector('#tblSinhVien').innerHTML += htmlString;
}



window.xoaSinhVien = function (tag) {
    tag.closest('tr').remove()
}