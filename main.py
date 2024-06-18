from flask import Flask, request, render_template, send_file
from PIL import Image, ImageDraw
import io

app = Flask(__name__)

# Ensure the upload folder exists
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        # Check if the post request has the file part
        if 'image' not in request.files:
            return "No file part"

        file = request.files['image']
        text = request.form['text']

        if file.filename == '':
            return "No selected file"

        if file and text:
            # Open the image and draw text
            image = Image.open(file)
            draw = ImageDraw.Draw(image)

            # Define the text position and color
            text_position = (50, 50)
            text_color = "white"

            # Set the font size to 150 pixels (default font)
            font_size = 500

            # Draw the text on the image with the specified font size
            draw.text(text_position, text, fill=text_color, font=None, font_size=font_size)

            # Save the image to a bytes object
            img_io = io.BytesIO()
            image.save(img_io, 'JPEG')
            img_io.seek(0)

            # Return the image as a response without saving
            return send_file(img_io, mimetype='image/jpeg')

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8000)
