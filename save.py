import urllib.request
import os


# Opens the running website and saves the html so that mobile apps can read them when website is not running.
for url in ['http://localhost:8000/home.html', 'http://localhost:8000/the_bool.html']:
    with urllib.request.urlopen(url) as page:
        code = page.read().decode('utf8')
        with open(os.path.join('output', url.split('/')[-1]), 'w') as file:
            file.write(code)
