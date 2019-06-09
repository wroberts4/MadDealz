import urllib.request
with urllib.request.urlopen('http://localhost:5000/home.html') as page:
    code = page.read().decode('utf8')
    with open('site.html', 'w') as file:
        file.write(code)
