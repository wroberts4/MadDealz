def sort_by_day(data, day):
    tmp = [['location', 'deal', 'start time', 'end time']]
    for bar, deals in data.items():
        for deal, info in deals.items():
            if info.get('days') and info['days'].get(day):
                tmp.append([bar, deal, info['days'][day].get('start_time'), info['days'][day].get('end_time')])
    return tmp
