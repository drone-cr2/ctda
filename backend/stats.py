from urlextract import URLExtract
import pandas as pd
from collections import Counter
import emoji

extract = URLExtract()

def top_stats(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    num_messages = df.shape[0]

    # fetch the total number of words
    word_list = []
    for message in df['message']:
        word_list.extend(message.split())
    num_words = len(word_list)

    # fetch number of media messages
    num_media_messages = df[df['message'] == '<Media omitted>\n'].shape[0]

    # fetch number of links shared
    link_list = []
    for message in df['message']:
        link_list.extend(extract.find_urls(message))
    num_links = len(link_list)

    stats = {"num_messages" : num_messages,
                 "num_words" : num_words,
                 "num_media_messages" : num_media_messages,
                 "num_links" : num_links}

    return stats


def top_temporal_stats(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    df['year-month-day'] = df['date'].dt.date                   # df['date'].dt.date extracts only the year-month-day part (e.g., 2024-03-04),
    daily_counts = df['year-month-day'].value_counts()
    busiest_day = daily_counts.idxmax().strftime('%d/%m/%Y')    #idxmax() returns the index (label) of the maximum value.
    busiest_day_msgs = int(daily_counts.max())

    df['month_year'] = df['date'].dt.to_period('M')             # Group messages by Month and Year, Example: 2024-03
    monthly_counts = df['month_year'].value_counts()
    busiest_month = monthly_counts.idxmax().strftime('%m/%y')
    busiest_month_msgs = int(monthly_counts.max())  

    # Get the start of each ISO week (Monday at 00:00:00) If you group messages using ISO weeks, your data aligns with how business and global reports define weeks.
    # .normalize() sets the time component to 00:00:00. For any Monday, whether a message arrived at 10:49 or 15:17, they’ll share the same date “YYYY-MM-DD 00:00:00.”
    df['week_start'] = (df['date'] - pd.to_timedelta(df['date'].dt.weekday, unit='D')).dt.normalize()
    weekly_counts = df.groupby('week_start').size()     # Count messages per 'week_start'
    busiest_week_start = weekly_counts.idxmax()
    busiest_week_msgs = int(weekly_counts.max()) 
    busiest_week_end = busiest_week_start + pd.Timedelta(days=6)
    week_range = f"{busiest_week_start.strftime('%d/%m/%Y')} - {busiest_week_end.strftime('%d/%m/%Y')}" # Format output

    stats = {
        "busiest_day" : busiest_day,
        "busiest_day_message_count" : busiest_day_msgs,
        "busiest_month" : busiest_month,
        "busiest_month_message_count" : busiest_month_msgs,
        "busiest_week" : week_range,
        "busiest_week_message_count" : busiest_week_msgs
    }

    return stats

def find_busiest_day(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    daily_counts = df['date'].dt.date.value_counts()
    
    # Get the busiest day and its message count
    # Convert date to DD/MM/YY format
    busiest_day = daily_counts.idxmax().strftime('%d/%m/%Y')
    max_messages = int(daily_counts.max())

    print(busiest_day)
    print(max_messages)
    
    stats = {
        "busiest_day" : busiest_day,
        "num_of_messages" : max_messages}
    
    messages_2024_02_05 = df[df['date'].dt.date == pd.to_datetime("2024-02-05").date()]
    print("Messages on 2024-02-05:", len(messages_2024_02_05))

    return stats

def find_busiest_week(df, user):
    if user != 'Overall':
        df = df[df['user'] == user]

    # Ensure 'date' is a datetime
    df['date'] = pd.to_datetime(df['date'])

    # Get the start of each ISO week (Monday at 00:00:00)
    # .normalize() sets the time component to 00:00:00.
# For any Monday, whether a message arrived at 10:49 or 15:17, they’ll share the same date “YYYY-MM-DD 00:00:00.”
    df['week_start'] = (df['date'] - pd.to_timedelta(df['date'].dt.weekday, unit='D')).dt.normalize()

    # Count messages per 'week_start'
    weekly_counts = df.groupby('week_start').size()

    # Identify busiest week
    busiest_week_start = weekly_counts.idxmax()
    max_messages = int(weekly_counts.max())  # convert int64 -> int

    # End of that week (Sunday at 00:00:00)
    busiest_week_end = busiest_week_start + pd.Timedelta(days=6)

    # Format output
    week_range = f"{busiest_week_start.strftime('%d/%m/%y')} - {busiest_week_end.strftime('%d/%m/%y')}"

    return {
        "busiest_week": week_range,
        "num_of_messages": max_messages
    }

def find_busiest_month(df, user):
    if user != 'Overall':
        df = df[df['user'] == user]

    # Group messages by Month and Year
    df['month_year'] = df['date'].dt.to_period('M')  # Example: 2024-03

    # Count messages per month
    monthly_counts = df['month_year'].value_counts()

    # Get the busiest month and message count
    busiest_month = monthly_counts.idxmax()
    max_messages = int(monthly_counts.max())  # Convert int64 to standard Python int for Flask

    # Convert to MM/YY format
    month_str = busiest_month.strftime('%m/%y')

    stats = {
        "busiest_month": month_str,
        "num_of_messages": max_messages
    }

    return stats

def user_contribution(df):
    contribution_percent_df = round((df['user'].value_counts() / df.shape[0]) * 100, 2).reset_index().rename(
    columns={'index': 'name', 'user': 'percent'})

    return contribution_percent_df

def top_emojis(df,user):

    if user != 'Overall':
        df = df[df['user'] == user]

    emojis = []
    for message in df['message']:
        emojis.extend([c for c in message if c in emoji.EMOJI_DATA])

    emoji_df = pd.DataFrame(Counter(emojis).most_common(10))

    # emoji_df_fig,ax = plt.subplots()
    # ax.barh(emoji_df[0],emoji_df[1])

    return emoji_df

def sen_percentage(df,k):
    df = round((df['user'][df['value']==k].value_counts() / df[df['value']==k].shape[0]) * 100, 2).reset_index().rename(
        columns={'index': 'name', 'user': 'percent'})
    return df.head(10)
