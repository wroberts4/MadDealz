import urllib.request
import os


for url in ['http://localhost:5000/home.html', 'http://localhost:5000/the_bool.html']:
    with urllib.request.urlopen(url) as page:
        code = page.read().decode('utf8')
        with open(os.path.join('output', url.split('/')[-1]), 'w') as file:
            file.write(code)
