from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import pandas as pd
import numpy as np

# def fetch_charts(df,user):
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

# def commons(df,user):
    
#     if user != 'Overall':
#         df = df[df['user'] == user]

#     # most common words ... extension of wordcloud

#     common_words = [] 

#     temp = df[df['message'] != '<Media omitted>\n']
#     for message in temp['message']:
#         for common_word in message.lower().split():
#             common_words.append(common_word)

#     most_common_df = pd.DataFrame(Counter(common_words).most_common(5))

#     most_common_df_fig,ax = plt.subplots()
#     ax.barh(most_common_df[0],most_common_df[1])
#     plt.xticks(rotation='vertical')


#     # most common emojis
    
#     emojis = []
#     for message in df['message']:
#         emojis.extend([c for c in message if c in emoji.EMOJI_DATA])

#     emoji_df = pd.DataFrame(Counter(emojis).most_common(5))

#     emoji_df_fig,ax = plt.subplots()
#     ax.barh(emoji_df[0],emoji_df[1])

#     #  can do pie chart here but emojis are not displayed

#     return most_common_df_fig,emoji_df

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

# def activity_heatmap(df, user):
#     if user != 'Overall':
#         df = df[df['user'] == user]

#     df['day_name'] = df['date'].dt.day_name()

#     period = []
#     for hour in df['hour']:
#         if hour == 23:
#             period.append(f"{hour}-00")
#         elif hour == 0:
#             period.append(f"00-{hour + 1}")
#         else:
#             period.append(f"{hour}-{hour + 1}")

#     df['period'] = period
#     df['hour'] = df['hour'].astype(int)  

#     user_heatmap = df.pivot_table(index='day_name', columns='period', values='message', aggfunc='count').fillna(0)

#     user_heatmap = user_heatmap.astype(float)

#     day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
#     user_heatmap = user_heatmap.reindex(day_order)

#     fig, ax = plt.subplots()
#     sns.heatmap(user_heatmap, ax=ax)

#     plot_json = mpld3.fig_to_dict(fig)
#     plt.close(fig)

#     return jsonify(plot_json)



