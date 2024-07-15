// script.js
const parseTextToHTML = (text) => {
    return text
        .split('\n\n')
        .map(paragraph => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('#')) {
                const level = trimmed.match(/^#+/)[0].length;
                return `<h${level}>${trimmed.slice(level).trim()}</h${level}>`;
            } else {
                return `<p>${trimmed}</p>`;
            }
        })
        .join('');
};

const updatePreview = () => {
    const htmlInput = document.getElementById('html-input').value;
    const html = parseTextToHTML(htmlInput);

    const fontFamily = document.getElementById('font-family').value;
    const fontSize = document.getElementById('font-size').value + 'px';
    const fontWeight = document.getElementById('font-weight').value;
    const textAlign = document.getElementById('text-align').value;
    const lineHeight = document.getElementById('line-height').value;
    const letterSpacing = document.getElementById('letter-spacing').value + 'px';
    const border = document.getElementById('border').value;
    const borderRadius = document.getElementById('border-radius').value + 'px';
    const margin = document.getElementById('margin').value + 'px';
    const padding = document.getElementById('padding').value + 'px';

    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const boxShadow = document.getElementById('box-shadow').checked ? '0 0 10px rgba(0,0,0,0.1)' : 'none';
    const textShadow = document.getElementById('text-shadow').checked ? '1px 1px 2px rgba(0,0,0,0.1)' : 'none';

    const jsClickAlert = document.getElementById('js-click-alert').checked;
    const jsHoverEffect = document.getElementById('js-hover-effect').checked;

    const iframe = document.getElementById('preview');
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(`
        <style>
            body {
                background-color: ${bgColor};
                color: ${textColor};
                font-family: ${fontFamily};
                font-size: ${fontSize};
                font-weight: ${fontWeight};
                text-align: ${textAlign};
                line-height: ${lineHeight};
                letter-spacing: ${letterSpacing};
                border: ${border};
                border-radius: ${borderRadius};
                margin: ${margin};
                padding: ${padding};
                box-shadow: ${boxShadow};
                text-shadow: ${textShadow};
            }
            ${jsHoverEffect ? `
            p:hover, h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover {
                color: #007BFF;
                transition: color 0.3s;
            }
            ` : ''}
        </style>
        ${html}
        ${jsClickAlert ? `
        <script>
            document.body.addEventListener('click', () => {
                alert('You clicked the page!');
            });
        </script>
        ` : ''}
    `);
    doc.close();
};

const addEventListeners = () => {
    const inputs = document.querySelectorAll('textarea, select, input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updatePreview();
            updateSliderValues();
        });
    });

    document.getElementById('template1').addEventListener('click', () => {
        document.getElementById('html-input').value = `
# Welcome to Template 1

This is a simple template with a heading and a paragraph.
        `;
        updatePreview();
    });

    document.getElementById('template2').addEventListener('click', () => {
        document.getElementById('html-input').value = `
# Template 2

- Item 1
- Item 2
- Item 3
        `;
        updatePreview();
    });

    document.getElementById('template3').addEventListener('click', () => {
        document.getElementById('html-input').value = `
## Card Title

Some interesting content goes here. It could be a summary or an article preview.
        `;
        updatePreview();
    });

    document.getElementById('download-html').addEventListener('click', () => {
        const htmlContent = document.getElementById('html-input').value;
        downloadFile('index.html', htmlContent);
    });

    document.getElementById('download-css').addEventListener('click', () => {
        const cssContent = generateCSS();
        downloadFile('styles.css', cssContent);
    });
};

const updateSliderValues = () => {
    const sliders = ['font-size', 'line-height', 'letter-spacing', 'border-radius', 'margin', 'padding'];
    sliders.forEach(slider => {
        const value = document.getElementById(slider).value;
        document.getElementById(`${slider}-value`).textContent = value;
    });
};

const generateCSS = () => {
    const fontFamily = document.getElementById('font-family').value;
    const fontSize = document.getElementById('font-size').value + 'px';
    const fontWeight = document.getElementById('font-weight').value;
    const textAlign = document.getElementById('text-align').value;
    const lineHeight = document.getElementById('line-height').value;
    const letterSpacing = document.getElementById('letter-spacing').value + 'px';
    const border = document.getElementById('border').value;
    const borderRadius = document.getElementById('border-radius').value + 'px';
    const margin = document.getElementById('margin').value + 'px';
    const padding = document.getElementById('padding').value + 'px';
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const boxShadow = document.getElementById('box-shadow').checked ? '0 0 10px rgba(0,0,0,0.1)' : 'none';
    const textShadow = document.getElementById('text-shadow').checked ? '1px 1px 2px rgba(0,0,0,0.1)' : 'none';

    return `
body {
    background-color: ${bgColor};
    color: ${textColor};
    font-family: ${fontFamily};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    text-align: ${textAlign};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing};
    border: ${border};
    border-radius: ${borderRadius};
    margin: ${margin};
    padding: ${padding};
    box-shadow: ${boxShadow};
    text-shadow: ${textShadow};
}
    `;
};

const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

document.addEventListener('DOMContentLoaded', () => {
    addEventListeners();
    updatePreview();
    updateSliderValues();
});