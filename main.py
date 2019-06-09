from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    links = {'bool_link': render_template('link.html', text='THE BOOL', href='bool', id='bool_link')}
    return render_template('home.html', **links)


@app.route("/bool")
def bools():
    links = {'home_link': render_template('link.html', text='HOME', href='', id='home_link')}
    return render_template('bools.html', **links)


if __name__ == '__main__':
    app.run(debug=True)
