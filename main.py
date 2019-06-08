from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
@app.route("/home")
def hello():
    return render_template('home.html')


@app.route("/bools")
def bools():
    return render_template('bools.html')


if __name__ == '__main__':
    app.run(debug=True)

# import urllib.request
# with urllib.request.urlopen('http://127.0.0.1:5000/') as page:
#     code = page.read().decode('utf8')
#     print(code)
