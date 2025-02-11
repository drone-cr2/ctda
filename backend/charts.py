from wordcloud import WordCloud, STOPWORDS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from collections import Counter
import pandas as pd
import plotly.express as px

day_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
month_order = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

def series_to_df(sr):
    df = pd.DataFrame({'titles':sr.index, 'values':sr.values})
    return df

def top_users(df):
    df = df[df['user'] != 'System generated'] 
    buzy_users_series = df['user'].value_counts().head()
    dfx = series_to_df(buzy_users_series)

    fig = px.bar(dfx, x='titles', y='values', title='Most Buzy Users',  text="values" )
    # "test" Show values on top of bars
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="User names",
        yaxis_title="Number of messages",
    )
    return fig


def top_words(df,user):
    
    if user != 'Overall':
        df = df[df['user'] == user]

    common_words = [] 
    temp = df[df['message'] != '<Media omitted>\n']
    for message in temp['message']:
        for common_word in message.lower().split():
            common_words.append(common_word)

    # Read stopwords from file into a set
    with open("stop_hinglish.txt", "r") as f:
        stopwords = set(word.strip() for word in f.readlines())  # Remove newline characters
    filtered_words = [word for word in common_words if word.lower() not in stopwords]   # Remove stopwords from the list
    dfx = pd.DataFrame(Counter(filtered_words).most_common(10))
    dfx.columns = ['titles','values']

    fig = px.bar(dfx, x='titles', y='values', title='Most used words',  text="values" )
    # "test" Show values on top of bars
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="Words",
        yaxis_title="Occourances",
    )
    return fig

    # fig,ax = plt.subplots()
    # ax.barh(most_common_df[0],most_common_df[1])
    # return fig, most_common_df[0].to_list()

def timeline(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    timeline_df = df.groupby(['year', 'month_num', 'month']).count()['message'].reset_index()
    timeline_labels = []
    for i in range(timeline_df.shape[0]):
        timeline_labels.append(timeline_df['month'][i][:3] + "-" + str(timeline_df['year'][i]))
    timeline_df['timeline_labels'] = timeline_labels

    fig = px.bar(timeline_df, x='timeline_labels', y='message', title='Timeline',  text="values" )
    # "test" Show values on top of bars
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="User names",
        yaxis_title="Number of messages",
    )
    return fig

    # fig,ax = plt.subplots()
    # ax.plot(timeline_df['timeline_labels'], timeline_df['message'])
    # return fig,timeline_labels

def busiest_hours(df, user):
    if user != 'Overall':
        df = df[df['user'] == user]
    
    series = df['hour'].value_counts(sort=False)
    all_hours = pd.Series(0, index=range(24))       # Dummy series , ensuring all hours (0-23) are represented, filling missing values with 0     
    series = all_hours.add(series, fill_value=0)    # Combine the two series, ensuring all hours exist.

    dfx = series_to_df(series)

    # Create Plotly figure from DataFrame
    fig = px.bar(dfx, x="titles", y="values", title="Busiest hours")
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="Hours",
        yaxis_title="Message counts",
    )
    return fig 

# days plotted against number of messages per day
def busiest_days(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    day_counts_series = df['day_name'].value_counts()
    sorted_series = day_counts_series.reindex(day_order)
    dfx = series_to_df(sorted_series)

    fig = px.bar(dfx, x='titles', y='values', title='Busiest days',  text="values" )
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="Days in week",
        yaxis_title="Number of messages",
    )
    return fig

    # fig,ax = plt.subplots()
    # ax.bar(sorted_series.index, sorted_series.values)
    # return df_hour

# days plotted against number of words(content length) per day
def daily_wordcount(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    daily_wc_series = df.groupby('day_name')['word_count'].sum()
    sorted_series = daily_wc_series.reindex(day_order)
    dfx = series_to_df(sorted_series)

    fig = px.bar(dfx, x='titles', y='values', title='Daily wordcount',  text="values" )
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="Days in week",
        yaxis_title="Amount of content shared",
    )
    return fig


    # fig,ax = plt.subplots()
    # ax.bar(sorted_series.index,sorted_series.values) 
    # return fig, day_order

# months plotted against number of messages per month
def busiest_months(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    month_count_series = df['month'].value_counts()
    sorted_series = month_count_series.reindex(month_order)
    dfx = series_to_df(sorted_series)

    fig = px.bar(dfx, x='titles', y='values', title='Busiest Months',  text="values" )
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="Months in year",
        yaxis_title="Number of messages",
    )
    return fig

    # fig,ax  = plt.subplots()
    # ax.bar(sorted_series.index, sorted_series.values)
    # return fig, month_order

# months plotted against number of words(content length) per month
def monthy_wordcount(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    # Group by month and sum the word counts
    monthly_word_count = df.groupby('month')['word_count'].sum()
    sorted_series = monthly_word_count.reindex(month_order)

    dfx = series_to_df(sorted_series)

    fig = px.bar(dfx, x='titles', y='values', title='Busiest Months',  text="values" )
    fig.update_layout(
        title_font=dict(size=24, color="darkblue"),
        xaxis_title="Months in year",
        yaxis_title="Amount of content shared",
    )
    return fig

    # fig,ax = plt.subplots()
    # ax.bar(sorted_series.index, sorted_series.values) 
    # return fig, month_order


def activity_heatmap(df, user):
    # user = 'Overall'  
    if user != 'Overall':
        df_filtered = df[df['user'] == user]
    else:
        df_filtered = df

    df_filtered['hour'] = df_filtered['hour'].astype(int)

    # Pivot table for heatmap
    user_heatmap = df_filtered.pivot_table(index='day_name', columns='period', values='message', aggfunc='count').fillna(0)

    # Ensure correct day order
    user_heatmap = user_heatmap.reindex(day_order)

    # Convert data to JSON
    heatmap_data = {
        "x": list(user_heatmap.columns),  # Periods
        "y": list(user_heatmap.index),  # Days
        "z": user_heatmap.fillna(0).values.tolist()  # Heatmap values
    }

    return heatmap_data

# def wordcloud(df,user):
#     if user != 'Overall':
#         df = df[df['user'] == user]

#     all_messages = " ".join(df['message'])

#     custom_stopwords =  STOPWORDS.union(set([
#         "Media","omitted","This","message","deleted"
#     ]))

#     wordcloud = WordCloud(stopwords =custom_stopwords,width=800, height=400, background_color='white').generate(all_messages)

#     fig, ax = plt.subplots(figsize=(10, 6))
#     ax.imshow(wordcloud, interpolation='bilinear')
#     ax.axis('off')
#     ax.set_title('Word Cloud of Messages', fontsize=16)
#     plt.tight_layout()

#     return fig

