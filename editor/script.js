// event listener - color picker
document.getElementById('colorPicker').addEventListener('input', function() {
    const color = this.value;
    execCmd('foreColor', color);
});

// event listener for "Enter" key press on color picker - hexcodes/hsl/rgb
document.getElementById('colorPicker').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const color = this.value;
        execCmd('foreColor', color);
    }
});

// editor commands
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

// download content as a .txt file
function downloadTxt() {
    const content = document.getElementById('editor').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(a.href);  // Clean up
}

// load a .txt file into the editor
function loadTxt() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('editor').innerText = e.target.result;
    };

    if (file) {
        reader.readAsText(file);
    }
}
