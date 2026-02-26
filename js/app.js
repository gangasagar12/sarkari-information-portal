document.getElementById("province").addEventListener("change", function() {
    fetch(`/load-districts/?province_id=${this.value}`)
    .then(response => response.json())
    .then(data => {
        let districtDropdown = document.getElementById("district");
        districtDropdown.innerHTML = "<option>Select District</option>";
        data.forEach(district => {
            districtDropdown.innerHTML += `<option value="${district.id}">${district.name}</option>`;
        });
    });
});

document.getElementById("district").addEventListener("change", function() {
    fetch(`/load-municipalities/?district_id=${this.value}`)
    .then(response => response.json())
    .then(data => {
        let municipalityDropdown = document.getElementById("municipality");
        municipalityDropdown.innerHTML = "<option>Select Municipality</option>";
        data.forEach(muni => {
            municipalityDropdown.innerHTML += `<option value="${muni.id}">${muni.name}</option>`;
        });
    });
});

function getMunicipalityInfo() {
    let municipality_id = document.getElementById("municipality").value;

    fetch(`/municipality-detail/?municipality_id=${municipality_id}`)
    .then(response => response.json())
    .then(data => {

        let html = `
        <h3>${data.name}</h3>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>

        <h4>Mayor Information</h4>
        <p>${data.mayor_name}</p>
        <p>${data.mayor_phone}</p>
        <p>${data.mayor_email}</p>

        <h4>Ward Information</h4>
        `;

        data.wards.forEach(ward => {
            html += `
            <div>
                <strong>Ward ${ward.ward_number}</strong><br>
                Chairperson: ${ward.chairperson_name}<br>
                Phone: ${ward.phone}<br>
                Email: ${ward.email}
                <hr>
            </div>
            `;
        });

        document.getElementById("result").innerHTML = html;
    });
}
