from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
import numpy as np
import os
import io

app = Flask(__name__)
CORS(app)

ASCII_CHARS = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."]

def resize_image(image, new_width=100):
    width, height = image.size
    ratio = height / width
    new_height = int(new_width * ratio)
    resized_image = image.resize((new_width, new_height))
    return resized_image

def grayify(image):
    grayscale_image = image.convert("L")
    return grayscale_image

def pixels_to_ascii(image):
    pixels = np.array(image)
    ascii_str = ""
    for pixel_value in pixels.flatten():
        ascii_str += ASCII_CHARS[pixel_value // 25]
    return ascii_str

def convert_image_to_ascii(image_path):
    try:
        image = Image.open(image_path)
    except Exception as e:
        print(e)
        return None
    
    image = resize_image(image)
    image = grayify(image)
    
    ascii_str = pixels_to_ascii(image)
    img_width = image.width
    ascii_str_len = len(ascii_str)
    ascii_img = ""
    for i in range(0, ascii_str_len, img_width):
        ascii_img += ascii_str[i:i + img_width] + "\n"
    
    return ascii_img

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file:
        filepath = os.path.join("/tmp", file.filename)
        file.save(filepath)
        ascii_art = convert_image_to_ascii(filepath)
        os.remove(filepath)
        if ascii_art is None:
            return "Error converting image to ASCII", 500
        
        response = send_file(
            io.BytesIO(ascii_art.encode('utf-8')),
            mimetype='text/plain',
            as_attachment=True,
            download_name='ascii_art.txt'
        )
        return response

@app.route('/api/health', methods=['GET'])
def health_check():
    return "OK", 200

if __name__ == "__main__":
    app.run(debug=True)