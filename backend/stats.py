# from urlextract import URLExtract
# from wordcloud import WordCloud, STOPWORDS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt


# extract = URLExtract()

# def fetch_stats(df,user):
#     if user != 'Overall':
#         df = df[df['user'] == user]

#     total_messages = df.shape[0]

#     # fetch the total number of words
#     word_list = []
#     for message in df['message']:
#         word_list.extend(message.split())
#     words = len(word_list)

#     # fetch number of media messages
#     media_messages = df[df['message'] == '<Media omitted>\n'].shape[0]

#     # fetch number of links shared
#     link_list = []
#     for message in df['message']:
#         link_list.extend(extract.find_urls(message))
#     links = len(link_list)

#     return total_messages,words,media_messages,links

def most_busy_users(df):

    user_contribution_df = round((df['user'].value_counts() / df.shape[0]) * 100, 2).reset_index().rename(
        columns={'index': 'name', 'user': 'percent'})
    
    buzy_users_series = df['user'].value_counts().head()
    buzy_users_df = buzy_users_series.to_frame()
    buzy_users_df = buzy_users_df.reset_index()

    buzy_users_df.columns = ['user', 'message_count']  # Rename columns for clarity

    buzy_users_fig, ax = plt.subplots()
    ax.bar(buzy_users_df['user'], buzy_users_df['message_count'],color='red')
    # ax.bar(buzy_users_series.index,buzy_users_series.values,color='red')
    plt.xticks(rotation='vertical')

    return user_contribution_df, buzy_users_fig, buzy_users_df['user'].tolist()

