from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
# import pandas as pd
import matplotlib
matplotlib.use('Agg') # Set non-GUI backend
import matplotlib.pyplot as plt
    # matplotlib.use('Agg') sets the backend for Matplotlib to Agg, which is a non-GUI backend
    # that renders plots as image files (PNG, etc.) instead of displaying them in a window.
import mpld3
from preprocessing import preprocess
import stats
import charts
from charts import timeline

app = Flask(__name__)           # Flask constructor takes the name of current module (__name__) as argument.
cors = CORS(app,origins='*')    # set app to send/accepts requests in localhost as well

df = None
user_list = None
user = None

# The route() function of the Flask class is a decorator, 
# mapping the URLs to a specific function that will handle the logic for that URL.
@app.route('/')
def default():
    return "konichiwa bitch"

# : accepts chat and returns list of users for dropdown
@app.route('/post/', methods=['POST'])
def post():
    if(request.method == 'POST'):
        data = request.get_json()           # Get the JSON data from the request
        df , user_list = preprocess(data)   # processing and converting into dataframe
        return jsonify(user_list)                    # Return the list of uesrs
    
# : route to set user
@app.route('/set-user')
def set_user():
    user = request.get_json()               # Set user
    return "user set successfully"


f = open("WhatsApp Chat with BE IT A Official 2024-25.txt",'r',encoding='utf-8')    # reading file
data = f.read() 
df, user_list = preprocess(data)   # processing and converting into dataframe
user = user_list[0]

# 1 : numerical stats
@app.route('/top-stats')
def serve_top_stats():
    top_stats = stats.fetch_stats(df,user)
    return jsonify(top_stats)

# 2 : bar graph of top 5 users woth message counts
@app.route('/top-users')
def serve_buzy_users():
    buzy_users_fig, usernames = charts.top_users(df)
    plot_json = mpld3.fig_to_dict(buzy_users_fig)
    plt.close(buzy_users_fig)
    plot_json["labels"] = usernames
    return jsonify(plot_json)

# 3 : dataframe of users and their chat contribution in %
@app.route('/contributions')
def serve_contributions():
    user_contribution_df = stats.user_contribution(df)
    return user_contribution_df.to_json(orient='columns')

# 4 : horizontal bar graph of top 10(or less) most common words with occourance
@app.route('/top-words')
def serve_top_words():
    fig, wordlist = charts.top_words(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plt.close(fig)
    plot_json['labels'] = wordlist
    return jsonify(plot_json)

# 5 dataframe of top 10(or less) common emojis with occourance
@app.route('/top-emojis')
def serve_top_emojis():
    emoji_df = stats.top_emojis(df,user)
    return emoji_df.to_json(orient='columns')

# 6 : timeline of chats from group creation, wrt no of messages
@app.route('/timeline')
def serve_timeline():
    fig,timeline_labels = charts.timeline(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plt.close(fig)
    plot_json['labels'] = timeline_labels
    return jsonify(plot_json)

# 7 : busiest days wrt message counts (monday, tuesday, ...)
@app.route('/buzy-days')
def serve_buzy_days():
    fig, day_order_labels = charts.busiest_days(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plot_json['labels'] = day_order_labels
    plt.close(fig)
    return jsonify(plot_json)

# 8 : days and their word counts (amt of content shared) (monday, tuesday, ...)
@app.route('/daily-wordcount')
def serve_daily_wordcount():
    fig, day_order_labels = charts.daily_wordcount(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plot_json['labels'] = day_order_labels
    plt.close(fig)
    return jsonify(plot_json)

# 9 : busiest months wrt message counts (jan, feb, ...)
@app.route('/buzy-months')
def serve_buzy_months():
    fig, month_order_labels = charts.busiest_months(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plot_json['labels'] = month_order_labels
    plt.close(fig)
    return jsonify(plot_json)

# 10 : months and their word counts (amt of content shared) (jan, feb, ...)
@app.route('/monthly-wordcount')
def serve_monthly_wordcount():
    fig, month_order_labels = charts.monthy_wordcount(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plot_json['labels'] = month_order_labels
    plt.close(fig)
    return jsonify(plot_json)

# 11 : busiest hours wrt message counts (0, 1, 2, ...)
@app.route('/buzy-hours')
def serve_busiest_hours():
    fig, hour_labels = charts.busiest_hours(df,user)
    plot_json = mpld3.fig_to_dict(fig)
    plot_json['labels'] = hour_labels
    plt.close(fig)
    return jsonify(plot_json)

# 12 : heatmap
@app.route('/heatmap', methods=['GET'])
def serve_activity_heatmap():
    heatmap = charts.activity_heatmap(df,user)

    return jsonify(heatmap)


# @app.route('/wordcloud')
# def serve_wordcloud():
#     wdc = charts.wordcloud(df,user)
#     wdc.to_file("wordcloud.png")  # Save to file
#     return send_file("wordcloud.png", mimetype='image/png')


# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True,port=8080)