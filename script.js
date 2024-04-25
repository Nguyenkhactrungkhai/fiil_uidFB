function loadFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('inputText').value = e.target.result;
            extractAndFilterIDs();
        };
        reader.readAsText(file);
    }
}

function extractAndFilterIDs() {
    const loadingIndicator = document.getElementById('loading');
    const inputText = document.getElementById('inputText').value;
    const resultArea = document.getElementById('idList');
    const countArea = document.getElementById('count');

    loadingIndicator.style.display = 'block';
    resultArea.innerHTML = '';

    setTimeout(() => {
        let idList = inputText.match(/\b\d{15}\b/g) || [];
        idList = [...new Set(idList)]; // Lọc trùng lặp bằng cách chuyển thành Set rồi lại chuyển về Array

        idList.forEach(id => {
            const li = document.createElement('li');
            li.textContent = id;
            resultArea.appendChild(li);
        });
        
        countArea.textContent = idList.length;
        loadingIndicator.style.display = 'none';
    }, 1000);
}

function exportToFile() {
    const idText = Array.from(document.querySelectorAll('#idList li'))
                        .map(li => li.textContent)
                        .join('\n');
    const blob = new Blob([idText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ids.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('File đã được tải xuống!');
}
