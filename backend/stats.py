from urlextract import URLExtract
import pandas as pd
from collections import Counter
import emoji

extract = URLExtract()

def fetch_stats(df,user):
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

    top_stats = {"num_messages" : num_messages,
                 "num_words" : num_words,
                 "num_media_messages" : num_media_messages,
                 "num_links" : num_links}

    return top_stats

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

