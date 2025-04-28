import time
import os
from dotenv import load_dotenv, dotenv_values
import datetime
import openai
from openai import OpenAI
from Parker_Fetch_Data import prompt
from flask import Flask

user_input = "Hi, i am a student here at OU. Please help me figure out whether I should buy a commuter pass. I go to class 5 times a week, mostly in Dale Hall and Devon, but sometimes in the Bizzell Library. I also go to the gym at the Sarkeys Fitness Center 3 times a week. I usually go to class around 10 am and leave around 2 pm. I also go to the library at least once a week, usually on Wednesdays. I have a car and I want to know if it is worth it to buy a commuter pass or if I should just pay for parking when I need it. Also please predict parking availability at relevant times."

app = Flask(__name__)

load_dotenv()

client = OpenAI(api_key = os.environ['OPENAI_API_KEY'])


def throttle(interval):
    def decorator(func):
        last_called = 0
        def wrapper(*args, **kwargs):
            nonlocal last_called
            now = time.time()
            if now - last_called >= interval:
                last_called = now
                return func(*args, **kwargs)
        return wrapper
    return decorator

@throttle(120)
def system_request():

    messages = [{"role": "system", "content": prompt}] #put all the database stuff in here

    message = user_input
    if message:
            messages.append({"role": "user", "content": message})
            response = openai.chat.completions.create(
                model="gpt-4.1-nano",
                messages=messages,
                temperature=0.3,
                max_tokens=500
            )
            reply = response.choices[0].message.content
            return(reply)
            #messages.append({"role": "system", "content": reply})


#system_request()

@app.route('/')
def home():
    return system_request()

if __name__ == '__main__':
    app.run(host = '0.0.0.0', debug=True)