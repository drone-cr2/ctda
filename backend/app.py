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
import nlp_charts
import plotly.io as pio


app = Flask(__name__)           # Flask constructor takes the name of current module (__name__) as argument.
cors = CORS(app,origins='*')    # set app to send/accepts requests in localhost as well

df = None
user_list = None
user = None


# # helper function with default arg value for "labels"
# def covert_to_json(fig,labels=None):
#     plot_json = mpld3.fig_to_dict(fig)
#     plt.close(fig)
#     if(labels != None):
#         plot_json["labels"] = labels
#     return jsonify(plot_json)

# The route() function of the Flask class is a decorator, 
# mapping the URLs to a specific function that will handle the logic for that URL.
@app.route('/')
def default():
    return "konichiwa bitch"


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith(".txt"):
        data = file.read().decode("utf-8")      # Read file contents
        df , user_list = preprocess(data)       # processing and converting into dataframe
        return jsonify({"users" : user_list})   # Return the list of uesrs

    return jsonify({"error": "Invalid file type"}), 400
    

@app.route('/set-user', methods=['POST'])  
def set_user():
    data = request.get_json() 
    user = data.get("user") 

    return jsonify({"message": f"User '{user}' set successfully!"})


if(user == None and df == None):
    f = open("WhatsApp Chat with BE IT A Official 2024-25.txt",'r',encoding='utf-8')    # reading file
    data = f.read() 
    df, user_list = preprocess(data)   # processing and converting into dataframe
    # user = 'jayesh Badgujar, Dyp'
    user = "Overall"


# 1 : numerical stats - num of messages, links etc
@app.route('/top-stats')
def serve_top_stats():
    return jsonify(stats.top_stats(df,user))

# 2 : temporal stats - busiest day,week,month
@app.route('/temporal-stats')
def serve_temporal_stats():
    return jsonify(stats.top_temporal_stats(df,user))

# 3 : dataframe of users and their chat contribution in %
@app.route('/contributions')
def serve_contributions():
    user_contribution_df = stats.user_contribution(df)
    return user_contribution_df.to_json(orient='columns')

# 4 : bar graph of top 5 users with message counts
@app.route('/top-users')
def serve_buzy_users():
    return pio.to_json(charts.top_users(df)) 

# 5 : horizontal bar graph of top 10(or less) most common words with occourance
@app.route('/top-words')
def serve_top_words():
    return pio.to_json(charts.top_words(df,user)) 
    # return covert_to_json(*charts.top_words(df,user))

# 6 dataframe of top 10(or less) common emojis with occourance
@app.route('/top-emojis')
def serve_top_emojis():
    emoji_df = stats.top_emojis(df,user)
    return emoji_df.to_json(orient='columns')

# 7 : timeline of chats from group creation, wrt no of messages
@app.route('/timeline')
def serve_timeline():
    return pio.to_json(charts.timeline(df,user)) 

# 8 : busiest days wrt message counts (monday, tuesday, ...)
@app.route('/buzy-days/<type>')
def serve_buzy_days(type):
    bar,pie = charts.busiest_days(df,user)
    if(type == "pie"):
        return pio.to_json(pie)
    elif(type == "bar"):
        return pio.to_json(bar)
    else:
        return "Invalid type. Expected 'bar' or 'pie'"

# 9 : days and their word counts (amt of content shared) (monday, tuesday, ...)
@app.route('/daily-wordcount/<type>')
def serve_daily_wordcount(type):
    bar,pie = charts.daily_wordcount(df,user)
    if(type == "pie"):
        return pio.to_json(pie)
    elif(type == "bar"):
        return pio.to_json(bar)
    else:
        return "Invalid type. Expected 'bar' or 'pie'"

# 10 : busiest months wrt message counts (jan, feb, ...)
@app.route('/buzy-months/<type>')
def serve_buzy_months(type):
    bar,pie = charts.busiest_months(df,user)
    if(type == "pie"):
        return pio.to_json(pie)
    elif(type == "bar"):
        return pio.to_json(bar)
    else:
        return "Invalid type. Expected 'bar' or 'pie'"
    
# 11 : months and their word counts (amt of content shared) (jan, feb, ...)
@app.route('/monthly-wordcount/<type>')
def serve_monthly_wordcount(type):
    bar,pie = charts.monthy_wordcount(df,user)
    if(type == "pie"):
        return pio.to_json(pie)
    elif(type == "bar"):
        return pio.to_json(bar)
    else:
        return "Invalid type. Expected 'bar' or 'pie'"
    
# 12 : busiest hours wrt message counts (0, 1, 2, ...)
@app.route('/buzy-hours')
def serve_busiest_hours():
    return pio.to_json(charts.busiest_hours(df,user))

# 13 : Overall Heatmap
@app.route('/heatmap', methods=['GET'])
def serve_activity_heatmap():
    return jsonify(charts.activity_heatmap(df,user))

# 14 : Overall Wordcloud
@app.route('/wordcloud')
def serve_wordcloud():
    wc_str = charts.wordcloud(df,user)
    return jsonify({"wordcloud_image": wc_str})


# NLP charts' routes

# 15 : timeline of chats from group creation, wrt specific sentiment and no of messages
@app.route('/sen-timeline/<int:k>')
def serve_sentiment_timeline(k):
    return pio.to_json(nlp_charts.daily_timeline(df,user,k))

# 16 : dataframe of users and their chat contribution in % wrt specific sentiment
@app.route('/sen-contribution/<int:k>')
def serve_sentiment_precent_contribution(k):
    sen_df = stats.sen_percentage(df,k)
    return sen_df.to_json(orient='columns')

# 17 : dataframe of most common words wrt to specific sentiment
@app.route('/sen-common-words/<int:k>')
def serve_sentiment_common_words(k):
    return pio.to_json(nlp_charts.most_common_words(df,user,k))    

# 18 : day wise activity map wrt specific sentiment (mon, tue, wed, ...)
@app.route('/sen-activity-map/<int:k>')
def serve_sen_activity_map(k):
    return pio.to_json(nlp_charts.week_activity_map(df,user,k))

@app.route('/testing')
def test():
    return df.to_json(orient='columns')


# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True,port=8080)