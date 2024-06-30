document.querySelector('#frmSinhVien').onsubmit = function (e){
    e.preventDefault();
    //input: maSinhVien,tenSinhVien,diemToan,diemVan
    let maSinhVien = document.querySelector('#maSinhVien').value;
    let tenSinhVien = document.querySelector('#tenSinhVien').value;
    let diemToan = +document.querySelector('#diemToan').value;
    let diemVan = +document.querySelector('#diemVan').value;
    //output: maSinhVien,tenSinhVien,diemTrungBinh
    let diemTrungBinh = 0;
    //process
    diemTrungBinh = tinhDiemTrungBinh(diemToan,diemVan);
    //in ra giao diện
    document.querySelector('#ketQua').innerHTML = `
        <h3>Thông tin sinh viên</h3>
        <p>Mã sinh viên: ${maSinhVien}</p>
        <p>Tên sinh viên: ${tenSinhVien}</p>
        <p>Điểm trung bình: ${diemTrungBinh}</p>
    `;
    
}
function tinhDiemTrungBinh(dToan,dVan) {
    let dtb = 0 ;
    dtb = (dToan + dVan)/2;
    return dtb;
}