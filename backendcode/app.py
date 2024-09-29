from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import pymongo
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Get OpenAI API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")

# Connect to MongoDB
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']  # Replace with your database name

@app.route('/')
def home():
    return "Welcome to the AI Content Generator!"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    goals = data.get('goals', '')
    target_audience = data.get('target_audience', '')
    brand_guidelines = data.get('brand_guidelines', '')

    prompt = (f"Generate creative content for an ad campaign targeting {target_audience} "
              f"to achieve the following goals: {goals}. Adhere to the brand guidelines: {brand_guidelines}.")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use your model here
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7
        )

        content = response['choices'][0]['message']['content']

        # Save the generated content to MongoDB
        db.generated_content.insert_one({
            "goals": goals,
            "target_audience": target_audience,
            "brand_guidelines": brand_guidelines,
            "content": content
        })

        return jsonify({'content': content})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
