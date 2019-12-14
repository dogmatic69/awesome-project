from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class HelloWorld(Resource):
    def get(self):
        return {
            'server': 'python-api',
            'message': 'Hello, world!',
            'error': False,
        }


api.add_resource(HelloWorld, '/')


if __name__ == '__main__':
    app.run(debug=True)
