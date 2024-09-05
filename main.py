from flask import Flask, render_template, redirect
from flask_bootstrap import Bootstrap5
# import skills from the my_skills file
from my_skills import skills

# create a flask application instance
app = Flask(__name__)
bootstrap = Bootstrap5(app)

# the home route
@app.route("/")
def home_page():
    return render_template("index.html")

# About page route
@app.route("/about")
def about_page():
    return render_template("about.html", skills=skills)

if __name__ == "__main__":
    # run the flask application in debug mode
    app.run(debug=True, port=5001)