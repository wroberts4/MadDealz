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
    context.render('the_bool_link', 'links/link.html', href='/the_bool.html',
                   id='the_bool_link', div='text', text='the_bool_link')

    # Temporary data.
    database = {'State Street Brats': {'$1 Hamburgers': {'extra_info': '', 'days':
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

    # Add a table template for each day.
    context.render('table', 'tables/sorted_tables.html', div='text', database=database, function='sort_by_day')

    # Show home.html template.
    return render(request, 'pages/home.html', context)


def the_bool(request):
    context = Context(request)
    # Add a link template.
    context.render('home_link', 'links/link.html', div='body', href='/home.html', id='home_link', text='home_link')
    # show the_bool.html template.
    return render(request, 'pages/the_bool.html', context)
