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
from charts import timelines, activity_heatmap, commons, wordcloud
import stats

app = Flask(__name__)           # Flask constructor takes the name of current module (__name__) as argument.
cors = CORS(app,origins='*')    # set app to send/accepts requests in localhost as well


@app.route('/json', methods=['POST'])
def json():
    data = request.get_json()   # Get the JSON data from the request
    return 'JSON received!'     # Return a success message

f = open("WhatsApp Chat with BE IT A Official 2024-25.txt",'r',encoding='utf-8')    # reading file
data = f.read() 
df, user_list = preprocess(data)   # processing and converting into dataframe
user = user_list[0]

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/',methods=['GET'])
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return jsonify(
        {
            "data" : ['hello','world']
        }
    )

@app.route('/plot-json',methods=['GET'])
def generate_plot_json():
    # Create a Matplotlib figure
    fig, ax = plt.subplots()
    ax.plot([1, 2, 3], [4, 5, 6], label='Example Line')
    ax.set_title('Interactive Plot')
    ax.set_xlabel('X-axis')
    ax.set_ylabel('Y-axis')
    ax.legend()

    # # Convert the matplotlib figure to a Plotly JSON object
    # plotly_fig = tls.mpl_to_plotly(fig)
    # plt.close(fig)  
    # return jsonify(plotly_fig)

    # Convert the figure to JSON using mpld3
    plot_json = mpld3.fig_to_dict(fig)
    plt.close(fig)  # Close the figure to free memory

    # Return the JSON object
    return jsonify(plot_json)

# Timelines - real data
@app.route('/timelines',methods=['GET'])
def serve_timelines():
    timeline_monthly_fig, buzy_day_fig, buzy_month_fig = timelines(df,user)

    plot_json = mpld3.fig_to_dict(timeline_monthly_fig)
    plt.close(timeline_monthly_fig)
    return jsonify(plot_json)

@app.route('/dayfig',methods=['GET'])
def serve_day_fig():
    timeline_monthly_fig, buzy_day_fig, buzy_month_fig = timelines(df,user)

    plot_json = mpld3.fig_to_dict(buzy_day_fig)
    plt.close(buzy_day_fig)
    return jsonify(plot_json)

@app.route('/heatmap', methods=['GET'])
def serve_activity_heatmap():
    heatmap = activity_heatmap(df,user)

    return jsonify(heatmap)


# RETURNS HORIZONTAL BAR GRAPH wrt to most used common words and their count
@app.route('/commons')
def common_words():
    most_common_df_fig, wordlist, emoji_df = commons(df,user)

    plot_json = mpld3.fig_to_dict(most_common_df_fig)
    plt.close(most_common_df_fig)

    plot_json['wordlist'] = wordlist

    return jsonify(plot_json)



# following is used for next 2 routes
user_contribution_df, buzy_users_fig, usernames = stats.most_busy_users(df)

# RETURNS BAR GRAPH OF USERS WITH THE MOST NUM OF MESSAGES 
@app.route('/buzy-users')
def buzy_users():
    # buzy_users_fig, ax = plt.subplots()
    # ax.bar(buzy_users_df.index, buzy_users_df.values,color='red')
    # plt.xticks(rotation='vertical')

    plot_json = mpld3.fig_to_dict(buzy_users_fig)
    plt.close(buzy_users_fig)

    plot_json["usernames"] = usernames

    return jsonify(plot_json)

# RETURNS A DATAFRAME REPRESENTING % OF CONTRIBUTION OF EACH USER
@app.route('/user-contribution')
def user_contribution():
    return user_contribution_df.to_json(orient='columns')

@app.route('/wordcloud')
def serve_wordcloud():
    wdc = wordcloud(df,user)
    wdc.to_file("wordcloud.png")  # Save to file
    return send_file("wordcloud.png", mimetype='image/png')



# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True,port=8080)