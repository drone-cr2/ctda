import re 
# library for regular expression
import pandas as pd

def preprocess(data):

    #  as regex is for dates, we match it to find all dates
    date_regex = '\d{1,2}/\d{1,2}/\d{1,2},\s\d{1,2}:\d{1,2}'
    dates = re.findall(date_regex,data)
    len(dates)

    user_message_regex = '\d{1,2}/\d{1,2}/\d{1,2},\s\d{1,2}:\d{1,2}\s-\s'
    user_messages = re.split(user_message_regex,data)[1:]
    #  from line 1 as line 0 is empty
    len(user_messages)

    df = pd.DataFrame({'user_message':user_messages,'date':dates})
    # df.head()

    # convert date into proper format
    # format(input) is 'mm/dd/yy, hh:mm' and consider the',' and year is in yy format hence %y NOT %Y
    df['date'] = pd.to_datetime(df['date'],format='%m/%d/%y, %H:%M')

    users = []
    messages = []
    for message in df['user_message']:
        #  generalised and primitive regex used here due to vaiablity in contact names saved
        linesplit =  re.split(':\s',message)
        if linesplit[1:]:
            users.append(linesplit[0])
            messages.append(linesplit[1])
        else:
            users.append('Sys notif')
            messages.append(linesplit[0])

    df['user'] = users
    df['message'] = messages

    df.drop(columns='user_message',inplace=True)

    # further classification of date into primitives ...
    # alrady in standard format and can be coverted using inbuild fns
    df['year'] = df['date'].dt.year            # year is a property 
    df['month'] = df['date'].dt.month_name()   # month is a property, month_name is a function returning jan, feb, ...
    df['day'] = df['date'].dt.day
    df['hour'] = df['date'].dt.hour
    df['minute'] = df['date'].dt.minute

    return df