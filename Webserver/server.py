# 用Python编写一个桌面软件系统的步骤是什么？ - dc lin的回答 - 知乎
# https://www.zhihu.com/question/338453063/answer/773655748
# 对应 index.html

import flask as fk

app = fk.Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if fk.request.method == "POST":
        feet = float(fk.request.form['entry_feet'])
        meters = feet * 0.3048
        return fk.render_template("index.html", meters=meters, feet=feet)
    else:
        return fk.render_template("index.html", meters=0.3048, feet=1)


if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)
