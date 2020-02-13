from django.shortcuts import render


# Makes using templates inside of templates easier.
class Context(dict):
    # Called when Context() is ran.
    def __init__(self, request):
        self.request = request
        super().__init__()

    def render(self, name, template, **context):
        # self.update is a built in function for dict objects.
        # decode('utf-8') turns a bytestring to a string.
        self.update({name: render(self.request, template, context).content.decode('utf-8')})


def home(request):
    context = Context(request)
    # Add a link template.
    context.render('the_bool_link', 'link.html', href='/the_bool.html', id='the_bool_link', div='text')

    # Temporary data.
    data = {'State Street Brats': {'$1 Hamburgers': {'extra_info': '', 'days':
        {'monday': {'start_time': '9pm', 'end_time': '10pm'},
         'tuesday': {'start_time': '9pm', 'end_time': '10pm'},
         'friday': {'start_time': '9pm', 'end_time': '10pm'}}},
                                   'Free Beer': {'extra_info': '', 'days':
                                       {'wednesday': {'start_time': '12am', 'end_time': '12pm'},
                                        'tuesday': {'start_time': '12am', 'end_time': '12pm'},
                                        'friday': {'start_time': '12am', 'end_time': '12pm'}}}},
            'Sconnie': {'$1 Hamburgers': {'extra_info': '', 'days':
                {'monday': {'start_time': '1pm', 'end_time': '2pm'},
                 'tuesday': {'start_time': '1pm', 'end_time': '2pm'},
                 'friday': {'start_time': '1pm', 'end_time': '2pm'}}}}}

    # Add sorting code.
    context.render('sort_db', 'sort.html', id='sort_db', div='text')
    # Add a table template for each day.
    for day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
        context.render(day, 'table.html', id=day, div='text', data=data, info={'day': day, 'function': 'sort_by_day'})

    # Show home.html template.
    return render(request, 'home.html', context)


def the_bool(request):
    context = Context(request)
    # Add a link template.
    context.render('home_link', 'link.html', href='/home.html', id='home_link', div='body')
    # show the_bool.html template.
    return render(request, 'the_bool.html', context)
