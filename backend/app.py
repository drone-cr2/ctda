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
import plotly.io as pio


app = Flask(__name__)           # Flask constructor takes the name of current module (__name__) as argument.
cors = CORS(app,origins='*')    # set app to send/accepts requests in localhost as well

df = None
user_list = None
user = None


# helper function with default arg value for "labels"
def covert_to_json(fig,labels=None):
    plot_json = mpld3.fig_to_dict(fig)
    plt.close(fig)
    if(labels != None):
        plot_json["labels"] = labels
    return jsonify(plot_json)

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

# # : accepts chat and returns list of users for dropdown
# @app.route('/post/', methods=['POST'])
# def post():
#     if(request.method == 'POST'):
#         data = request.get_json()           # Get the JSON data from the request
#         df , user_list = preprocess(data)   # processing and converting into dataframe
#         return jsonify(user_list)                    # Return the list of uesrs
    
# # : route to set user
# @app.route('/set-user')
# def set_user():
#     user = request.get_json()               # Set user
#     return "user set successfully"


f = open("WhatsApp Chat with BE IT A Official 2024-25.txt",'r',encoding='utf-8')    # reading file
data = f.read() 
df, user_list = preprocess(data)   # processing and converting into dataframe
# user = 'jayesh Badgujar, Dyp'
user = "Overall"


# 1 : numerical stats
@app.route('/top-stats')
def serve_top_stats():
    return covert_to_json(*stats.fetch_stats(df,user))
# NOTE :  helper functions' returns a tuple, and the * operator unpacks it into separate arguments for covert_to_json().

# 2 : bar graph of top 5 users woth message counts
@app.route('/top-users')
def serve_buzy_users():
    fig = charts.top_users(df)
    json_data = pio.to_json(fig)
    return json_data 
    # return covert_to_json(*charts.top_users(df))

# 3 : dataframe of users and their chat contribution in %
@app.route('/contributions')
def serve_contributions():
    user_contribution_df = stats.user_contribution(df)
    return user_contribution_df.to_json(orient='columns')

# 4 : horizontal bar graph of top 10(or less) most common words with occourance
@app.route('/top-words')
def serve_top_words():
    return covert_to_json(*charts.top_words(df,user))

# 5 dataframe of top 10(or less) common emojis with occourance
@app.route('/top-emojis')
def serve_top_emojis():
    emoji_df = stats.top_emojis(df,user)
    return emoji_df.to_json(orient='columns')

# 6 : timeline of chats from group creation, wrt no of messages
@app.route('/timeline')
def serve_timeline():
    return covert_to_json(*charts.timeline(df,user))


# 7 : busiest days wrt message counts (monday, tuesday, ...)
@app.route('/buzy-days')
def serve_buzy_days():
    # return covert_to_json(*charts.busiest_days(df,user))
    return charts.busiest_days(df,user).to_json(orient='columns')


# 8 : days and their word counts (amt of content shared) (monday, tuesday, ...)
@app.route('/daily-wordcount')
def serve_daily_wordcount():
    return covert_to_json(*charts.daily_wordcount(df,user))


# 9 : busiest months wrt message counts (jan, feb, ...)
@app.route('/buzy-months')
def serve_buzy_months():
    return covert_to_json(*charts.busiest_months(df,user))


# 10 : months and their word counts (amt of content shared) (jan, feb, ...)
@app.route('/monthly-wordcount')
def serve_monthly_wordcount():
    return covert_to_json(*charts.monthy_wordcount(df,user))


# 11 : busiest hours wrt message counts (0, 1, 2, ...)
@app.route('/buzy-hours')
def serve_busiest_hours():
    # return covert_to_json(charts.busiest_hours(df,user))
    # return charts.busiest_hours(df,user).to_json(orient='columns')
    fig = charts.busiest_hours(df,user)
    json_data = pio.to_json(fig)
    return json_data  # Send JSON to frontend



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