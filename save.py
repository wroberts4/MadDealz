import urllib.request
with urllib.request.urlopen('http://127.0.0.1:5000/') as page:
    code = page.read().decode('utf8')
    with open('site.html', 'w') as file:
        file.write(code)
