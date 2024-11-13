from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from translate import translate_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the directory where uploaded images will be stored temporarily
UPLOAD_DIRECTORY = "uploaded_images"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@app.get("/translate/")
async def translate_info():
    return {"message": "Use POST /translate/ with an image file to get a translation prediction."}

@app.post("/translate/")
async def translate(file: UploadFile = File(...)):  # Specify UploadFile type
    if not file:
        raise HTTPException(status_code=400, detail="No file sent")
    
    print(file.filename)

    # Save the uploaded file in the upload directory
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())
    
    try:
        prediction = translate_image(file_location)

    except Exception as e:
        print("An error occurred:", e)
        prediction = "Some error occured"

    # finally:
    #     if os.path.exists(file_location):
    #         os.remove(file_location)
    
    return {"prediction": prediction}
