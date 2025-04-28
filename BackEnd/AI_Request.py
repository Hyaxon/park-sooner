import time
import os
from dotenv import load_dotenv, dotenv_values
import datetime
import openai
from openai import OpenAI
from Parker_Fetch_Data import prompt


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

    while True:
        message = input("User : ")
        if message:
            messages.append({"role": "user", "content": message})
            response = openai.chat.completions.create(
                model="gpt-4.1-nano",
                messages=messages,
                temperature=0.3,
                max_tokens=200
            )
            reply = response.choices[0].message.content
            print("Parker : ", reply)
            messages.append({"role": "system", "content": reply})


system_request()
