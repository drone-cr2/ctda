import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from collections import Counter

# Will return count of messages of selected user per day having k(0/1/-1) sentiment
def week_activity_map(df,selected_user,k,color):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]
    df = df[df['value'] == k]

    busy_day = df['day_name'].value_counts()

    fig, ax = plt.subplots()
    ax.bar(busy_day.index, busy_day.values, color=color)
    plt.xticks(rotation='vertical')

    return fig

def activity_heatmap(df,selected_user,k):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]
    df = df[df['value'] == k]
    
    # Creating heat map
    user_heatmap_df = df.pivot_table(index='day_name', columns='hour', values='message', aggfunc='count').fillna(0)

    # fig, ax = plt.subplots()
    fig, ax = plt.subplots()
    ax = sns.heatmap(user_heatmap_df)
    return fig

# Will return count of messages of selected user per date having k(0/1/-1) sentiment
def daily_timeline(df,selected_user,k):
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]
    df = df[df['value']==k]
    # count of message on a specific date
    daily_timeline = df.groupby('day').count()['message'].reset_index()

    fig, ax = plt.subplots()
    ax.plot(daily_timeline['day'], daily_timeline['message'], color='green')
    plt.xticks(rotation='vertical')
    return fig

def percentage(df,k):
    df = round((df['user'][df['value']==k].value_counts() / df[df['value']==k].shape[0]) * 100, 2).reset_index().rename(
        columns={'index': 'name', 'user': 'percent'})
    return df.head(10)

def most_common_words(df,selected_user,k,color):

    # f = open('stop_hinglish.txt','r')
    # stop_words = f.read()
    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]
    temp = df[df['user'] != 'group_notification']
    temp = temp[temp['message'] != '<Media omitted>\n']
    words = []
    for message in temp['message'][temp['value'] == k]:
        for word in message.lower().split():
            words.append(word)
            # if word not in stop_words:
            #     words.append(word)
                
    # Creating data frame of most common 20 entries
    most_common_df = pd.DataFrame(Counter(words).most_common(20))

    fig, ax = plt.subplots()
    ax.barh(most_common_df[0], most_common_df[1],color=color)
    plt.xticks(rotation='vertical')
    return fig