# 对应 map.html

import flask as fk

app = fk.Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def addpoint():
    if fk.request.method == "POST":
        lat = float(fk.request.form['input_lat']) + 0.001
        lon = float(fk.request.form['input_lon']) + 0.001
        return fk.render_template("map.html", lat=lat, lon=lon)
    else:
        return fk.render_template("map.html", lat=121.4383773, lon=31.0273647)


if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)
