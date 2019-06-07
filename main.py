from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World!</h1>"

# import urllib.request
#
#
# page = urllib.request.urlopen('http://127.0.0.1:5000/')
# code = page.read().decode('utf8')
# page.close()
# print(code)
