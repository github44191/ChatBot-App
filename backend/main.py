# from flask import Flask, jsonify, request
# from flask_cors import CORS
from app import generate_res
# Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process | venv\Scripts\activate 

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return "Backend Server using FastAPI changed"

# @app.get("/items")
# async def read_items():
#     return {"Output": "md" }

class Message(BaseModel):
    content: str

@app.post("/generate-response")
async def generate_response(message: Message):
    # Replace this with your actual response generation logic
    response_content = generate_res(message.content)
    return {"response": response_content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

# app = Flask(__name__)
# CORS(app)  # This will enable CORS for all routes

# @app.route('/')
# def home():
#     return "Hello, Flask!"

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     data = {"Output": output}
#     return jsonify(data)

# @app.route('/api/data', methods=['POST'])
# def post_data():
#     data = request.get_json()
#     return jsonify(data), 201

# if __name__ == '__main__':
#     app.run(debug=True)
