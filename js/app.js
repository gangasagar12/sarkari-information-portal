// ===== DEMO MUNICIPALITY DATA =====

const municipalities = [
    {
        name: "Kathmandu Metropolitan City",
        district: "Kathmandu",
        province: "Bagmati Province",
        address: "Kathmandu, Nepal",
        phone: "01-1234567",
        email: "info@kathmandu.gov.np",
        website: "https://kathmandu.gov.np",
        wards: 32
    },
    {
        name: "Pokhara Metropolitan City",
        district: "Kaski",
        province: "Gandaki Province",
        address: "Pokhara, Nepal",
        phone: "061-123456",
        email: "info@pokhara.gov.np",
        website: "https://pokhara.gov.np",
        wards: 33
    }
];

// ===== SEARCH FUNCTION =====

function searchMunicipality() {

    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultBox = document.getElementById("result");

    const found = municipalities.find(m =>
        m.name.toLowerCase().includes(input)
    );

    if (found) {
        resultBox.innerHTML = `
            <div class="result-box">
                <h3>${found.name}</h3>
                <p><strong>District:</strong> ${found.district}</p>
                <p><strong>Province:</strong> ${found.province}</p>
                <p><strong>Address:</strong> ${found.address}</p>
                <p><strong>Phone:</strong> ${found.phone}</p>
                <p><strong>Email:</strong> ${found.email}</p>
                <p><strong>Website:</strong> ${found.website}</p>
                <p><strong>Total Wards:</strong> ${found.wards}</p>
            </div>
        `;
    } else {
        resultBox.innerHTML = `
            <div class="result-box">
                <p>No municipality found.</p>
            </div>
        `;
    }
}