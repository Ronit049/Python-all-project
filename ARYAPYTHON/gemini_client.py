import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

print("API Key:", os.getenv("GEMINI_API_KEY"))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

response = model.generate_content("population of india?")

print(response.text)