from flask import Flask, render_template
import yaml
app = Flask(__name__)


@app.route("/")
@app.route("/home.html")
def hello():
    links = {'the_bool_link': render_template('link.html', href='the_bool.html', id='the_bool_link', div='text')}
    with open('deals.yml') as file:
        data = yaml.load(file, Loader=yaml.FullLoader)
        tables = {day: render_template('table.html', id=day, div='text', data=data) for day in
                  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
    return render_template('home.html', **links, **tables)


@app.route("/the_bool.html")
def the_bool():
    links = {'home_link': render_template('link.html', href='home.html', id='home_link', div='body')}
    return render_template('the_bool.html', **links)


if __name__ == '__main__':
    app.run(debug=True)
