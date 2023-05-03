function sendRequest() {
    var input = document.getElementById("text").value;
    console.log("Enviando petición...")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/TechnicalTest/service?operation=getContractData&input=' + input, true);
    xhr.onload = function () {
        if (this.status == 200) {
            let data = JSON.parse(this.responseText).data;
        }
    }
}