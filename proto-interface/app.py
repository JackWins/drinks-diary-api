
# Standard Library Imports
import os
import sys

# Third Party Imports
import flask


app = flask.Flask(__name__)
app.debug = True

@app.route("/")
def landing():
    return flask.render_template("landing.html")

@app.route("/home", methods=["GET"])
def index():
    return flask.render_template("index.html")


@app.route("/manage_diaries")
def manage_diaries():
    return flask.render_template("diary_management.html")

@app.route("/diary", methods=["GET"])
def diary_management():
    return flask.render_template("diary_overview.html")

@app.route("/diary/entry", methods=["GET"])
def diary_entry():
    return flask.render_template("diary_entry.html")


@app.route("/account", methods=["GET"])
def account_management():
    return flask.render_template("account_management.html")


@app.route("/desktop_test", methods=["GET"])
def desktop_test():
    return flask.render_template("mobile_layout.html")

if __name__ == "__main__":
    app.run()    
    
