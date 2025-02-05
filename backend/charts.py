from wordcloud import WordCloud, STOPWORDS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from collections import Counter
import pandas as pd
import numpy as np
import mpld3
from flask import jsonify

def top_users(df):
    df = df[df['user'] != 'System generated'] 
    buzy_users_series = df['user'].value_counts().head()
    buzy_users_df = buzy_users_series.to_frame()
    buzy_users_df = buzy_users_df.reset_index()
    buzy_users_df.columns = ['user', 'message_count']  # Rename columns for clarity

    buzy_users_fig, ax = plt.subplots()
    ax.bar(buzy_users_df['user'], buzy_users_df['message_count'])

    return buzy_users_fig, buzy_users_df['user'].tolist()



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

    # Remove stopwords from the list
    filtered_words = [word for word in common_words if word.lower() not in stopwords]
    most_common_df = pd.DataFrame(Counter(filtered_words).most_common(10))
    fig,ax = plt.subplots()
    ax.barh(most_common_df[0],most_common_df[1])

    return fig, most_common_df[0].to_list()





def timelines(df,user):

    if user != 'Overall':
        df = df[df['user'] == user]

    # monthly timeline for activity

    df['month_num'] = df['date'].dt.month

    timeline = df.groupby(['year', 'month_num', 'month']).count()['message'].reset_index()

    time = []
    for i in range(timeline.shape[0]):
        time.append(timeline['month'][i] + "-" + str(timeline['year'][i]))

    timeline['time'] = time

    timeline_monthly_fig,ax = plt.subplots()
    ax.plot(timeline['time'], timeline['message'],color='green')
    plt.xticks(rotation='vertical')

    # most buzy day and month

    df['day_name'] = df['date'].dt.day_name() 

    day_counts_df = df['day_name'].value_counts(sort=False)
    day_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    sorted_day_counts_df = day_counts_df.reindex(day_order)
    buzy_day_fig,ax2 = plt.subplots()
    ax2.bar(sorted_day_counts_df.index, sorted_day_counts_df.values,color='purple')
    plt.xticks(rotation='vertical')

    month_count_df = df['month'].value_counts()
    buzy_month_fig,ax  = plt.subplots()
    ax.bar(month_count_df.index, month_count_df.values, color='orange')
    plt.xticks(rotation='vertical')

    return timeline_monthly_fig, buzy_day_fig, buzy_month_fig

# def monthy_wordcount(df,user):

#     if user != 'Overall':
#         df = df[df['user'] == user]

#     # Create a new column with word count for each message
#     df['word_count'] = df['message'].apply(lambda x: len(x.split()))

#     # Group by month and sum the word counts
#     monthly_word_count = df.groupby('month')['word_count'].sum()

#     # Plot the data
#     fig,ax = plt.subplots()
#     ax.bar(df['month'].unique(),monthly_word_count)
#     plt.title('Total Word Count by Month')
#     plt.xlabel('Month')
#     plt.ylabel('Total Word Count')
#     plt.xticks(rotation=45)
    
#     return fig

def activity_heatmap(df, user):
    user = 'Overall'  
    if user != 'Overall':
        df_filtered = df[df['user'] == user]
    else:
        df_filtered = df

    df_filtered['day_name'] = df_filtered['date'].dt.day_name()

    # Create period column (hour ranges)
    period = []
    for hour in df_filtered['hour']:
        if hour == 23:
            period.append(f"{hour}-00")
        elif hour == 0:
            period.append(f"00-{hour + 1}")
        else:
            period.append(f"{hour}-{hour + 1}")

    df_filtered['period'] = period
    df_filtered['hour'] = df_filtered['hour'].astype(int)

    # Pivot table for heatmap
    user_heatmap = df_filtered.pivot_table(index='day_name', columns='period', values='message', aggfunc='count').fillna(0)

    # Ensure correct day order
    day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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

