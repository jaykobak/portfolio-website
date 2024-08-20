from flask import Flask, render_template

# create a flask application instance
app = Flask(__name__)

# the home route
@app.route("/")
def home_page():
    return render_template("index.html")

if __name__ == "__main__":
    # run the flask application in debug mode
    app.run(debug=True)