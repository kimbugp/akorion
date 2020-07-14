import json
import os
from flask import Flask, Response, render_template, request
from flask.json import jsonify
from flask_mail import Mail, Message

'martinkatamba@akorion.com'
app = Flask(__name__)

app.config.update(dict(
    DEBUG=True,
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
    MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
))

mail = Mail(app)
DEFAULT_EMAIL = 'kimbsimon2@gmail.com'


class ItemStorage():
    data = {}

    def add(self, item):
        item_id = self.get_next_id()
        item['id'] = item_id
        self.data[item_id] = item
        return item

    def get_item(self, item_id):
        return self.data[item_id]

    def get_next_id(self):
        return len(self.data.keys())+1

    def get_all(self):
        return list(self.data.values())


def send_mail(subject, message, receipient):
    msg = Message(subject=subject, message=message,
                  sender="info@email.com", recipients=[receipient])
    mail.send(msg)


storage = ItemStorage()


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/items', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        item = request.json
        save_item = storage.add(item)
        message = f'Hello, a new item has been created with the details Name: {save_item["name"]} Price:{save_item["price"]}'
        try:
            send_mail('New Item created', message, DEFAULT_EMAIL)
        except Exception as err:
            raise err
        return jsonify(save_item)
    return jsonify(storage.get_all())


@app.route('/items/<item_id>', methods=['GET'])
def get_one(item_id):
    return jsonify(storage.get_item(int(item_id)))


if __name__ == "__main__":
    app.run(port=5000)
