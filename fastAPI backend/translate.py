from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image, ImageEnhance

# Load your model
model_path = "C:/Users/Yuvi/Downloads/sign_language_model.keras"
model = load_model(model_path)

def translate_image(file_path: str):
    # Load the image
    img = Image.open(file_path).convert("L")  #grayscale

    img = img.resize((64, 64), Image.LANCZOS)  # High-quality downsampling filter

    # Step 2: Slight contrast enhancement
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2) 

    # Convert to a numpy array and normalize to [0, 1]
    img_array = np.array(img).astype("float32") / 255.0  # Scale pixels to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = np.expand_dims(img_array, axis=-1)  # Add channel dimension for grayscale

    # Save the preprocessed image for inspection
    preprocessed_image = Image.fromarray((img_array[0, :, :, 0] * 255).astype(np.uint8))
    preprocessed_image_path = "enhanced_preprocessed_image.png"
    preprocessed_image.save(preprocessed_image_path)
    print(f"Preprocessed image saved at: {preprocessed_image_path}")

    # Logging statements for debugging
    print("Image array shape:", img_array.shape)
    print("Image pixel values (min, max):", img_array.min(), img_array.max())

    # Step 3: Make a prediction
    predictions = model.predict(img_array)
    print("Prediction values:", predictions)
    predicted_class = np.argmax(predictions, axis=1)
    print("Predicted class:", predicted_class)

    return str(predicted_class[0]) 

