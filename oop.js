document.querySelector('#frmSinhVien').onsubmit = function (e) {
    e.preventDefault();
    //input: sinhVien (gồm 4 thuộc tính);
    let sinhVien = {};


    let arrInput = document.querySelectorAll('#frmSinhVien input');
    for (let input of arrInput) {
        let id = input.id;
        let value = input.value;
        sinhVien[id] = value;
    }

    console.log(sinhVien); // {maSinhVien:'01',tenSinhVien:'Nguyễn Văn A',diemToan:'10',diemVan:'9'}
    //output:
    let output = `<h3>Thông tin sinh viên</h3>`;
    for (let key in sinhVien){
        output += `
            <p>${key} : ${sinhVien[key]}</p>
        `
    }
    //tính điểm trung bình
    sinhVien.tinhDiemTrungBinh = function(){
        let dtb = 0;
        dtb = (Number(sinhVien.diemToan) + Number(sinhVien.diemVan))/2
        return dtb
    } 
    /*
         sinhVien = {
            maSinhVien:'01',
            tenSinhVien:'Nguyễn Văn A',
            diemToan:'10',
            diemVan:'9',
            tinhDiemTrungBinh: function(){
                return (sinhVien.diemToan + sinhVien.diemVan )/2
            }
        }
    */

    document.querySelector('#ketQua').innerHTML = `
        ${output}
        <p>Điểm trung bình: ${sinhVien.tinhDiemTrungBinh()} </p>
    `;

    
}