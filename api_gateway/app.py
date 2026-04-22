from flask import Flask, request
import requests

app = Flask(__name__)

@app.route("/users/<path:path>", methods=["GET","POST"])
def users(path):
    return requests.request(
        method=request.method,
        url=f"http://user_service:5001/users/{path}",
        json=request.json
    ).json()

@app.route("/content/<path:path>", methods=["GET","POST","PUT","DELETE"])
def content(path):
    return requests.request(
        method=request.method,
        url=f"http://content_service:5002/content/{path}",
        json=request.json
    ).json()

@app.route("/comments/<path:path>", methods=["GET","POST"])
def comments(path):
    return requests.request(
        method=request.method,
        url=f"http://interaction_service:5003/comments/{path}",
        json=request.json
    ).json()

app.run(host="0.0.0.0", port=5000)