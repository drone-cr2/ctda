from urlextract import URLExtract
from wordcloud import WordCloud, STOPWORDS


extract = URLExtract()

def fetch_stats(df,user):
    if user != 'Overall':
        df = df[df['user'] == user]

    total_messages = df.shape[0]

    # fetch the total number of words
    word_list = []
    for message in df['message']:
        word_list.extend(message.split())
    words = len(word_list)

    # fetch number of media messages
    media_messages = df[df['message'] == '<Media omitted>\n'].shape[0]

    # fetch number of links shared
    link_list = []
    for message in df['message']:
        link_list.extend(extract.find_urls(message))
    links = len(link_list)

    return total_messages,words,media_messages,links

def most_busy_users(df):
    x = df['user'].value_counts().head()
    df = round((df['user'].value_counts() / df.shape[0]) * 100, 2).reset_index().rename(
        columns={'index': 'name', 'user': 'percent'})
    return x,df

