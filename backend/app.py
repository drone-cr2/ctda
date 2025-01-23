# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import re 
# import pandas as pd
import matplotlib.pyplot as plt
import plotly.tools as tls
import mpld3


# file = open('WhatsApp Chat with BE IT A Official 2024-25.txt','r',encoding='utf-8')
# data = file.read()
# date_regex = '\d{1,2}/\d{1,2}/\d{1,2},\s\d{1,2}:\d{1,2}'
# dates = re.findall(date_regex,data)



# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
cors = CORS(app,origins='*' )

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

@app.route('/mpld3.js',methods=['GET'])
def serve_mpld3_js():
    return send_from_directory('.', 'mpld3.js')

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True,port=8080)