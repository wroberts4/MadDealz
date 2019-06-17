from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
@app.route("/home.html")
def hello():
    links = {'bool_link': render_template('link.html', href='bools.html', id='bool_link', div='text')}
    tables = {'monday': render_template('table.html', id='monday', div='text',
                                        data=[['Bar Name', 'Deal', 'Start Time', 'End Time'],
                                              ['State Street Brats', '$1 Hamburgers', '9pm', '10pm']])}
    return render_template('home.html', **links, **tables)


@app.route("/bools.html")
def bools():
    links = {'home_link': render_template('link.html', href='home.html', id='home_link', div='body')}
    return render_template('bools.html', **links)


if __name__ == '__main__':
    app.run(debug=True)
