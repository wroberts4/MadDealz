from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
@app.route("/home.html")
def hello():
    links = {'bool_link': render_template('link.html', href='bools.html', id='bool_link', div='test')}
    return render_template('home.html', **links)


@app.route("/bools.html")
def bools():
    links = {'home_link': render_template('link.html', href='home.html', id='home_link', div='body')}
    return render_template('bools.html', **links)


if __name__ == '__main__':
    app.run(debug=True)
