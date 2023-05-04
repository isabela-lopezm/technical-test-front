function sendRequest() {
    var contractParam = document.getElementById("text").value;
    console.log("Enviando petición...");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/TechnicalTest/service?operation=doGet&contractParam=' + contractParam, true);
    xhr.onload = function () {
        if (this.status == 200) {
            let contractData = JSON.parse(this.responseText).contractData;
            loadContractData(contractData);
        }
    }
    xhr.send();
}

function loadContractData(contractData) {
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = " ";
    console.log(contractData);

    let contractCodes = [];
    contractData.forEach(function (currentPart) {
        if (!contractCodes.includes(currentPart.code)) {
            contractCodes.push(currentPart.code);
            let partsPerRoles = {
                'Arrendatario': [],
                'Propietario': [],
                'Deudor': []
            };
            let contractParts = contractData.filter(function (part) { return part.code == currentPart.code });
            console.log(contractParts);
            getPartsPerRole(partsPerRoles, contractParts);
            let rowspan = Math.max(...Object.values(partsPerRoles).map(function (role) {return role.length}));

            for (let i = 0; i < rowspan; i++) {
                let row = document.createElement("tr");
                if (i == 0) {
                    var codeCell = document.createElement("td");
                    codeCell.textContent = contractParts[i].code;
                    row.appendChild(codeCell);
                    codeCell.setAttribute("rowspan", rowspan);

                    var addressCell = document.createElement("td");
                    addressCell.textContent = contractParts[i].address;
                    row.appendChild(addressCell);
                    addressCell.setAttribute("rowspan", rowspan);

                    var lesseeCell = document.createElement("td");
                    lesseeCell.textContent = partsPerRoles["Arrendatario"];
                    row.appendChild(lesseeCell);
                    lesseeCell.setAttribute("rowspan", rowspan);
                }

                var ownerCell = document.createElement("td");
                ownerCell.textContent = partsPerRoles["Propietario"][i];
                row.appendChild(ownerCell);

                var debtorCell = document.createElement("td");
                debtorCell.textContent = partsPerRoles["Deudor"][i];
                row.appendChild(debtorCell);

                tbody.appendChild(row);
            }
        }
    });
}

function getPartsPerRole(partsPerRoles, contractParts) {
    contractParts.forEach(function (part) {
        partsPerRoles[part.role].push(part.full_name);
    });
}
