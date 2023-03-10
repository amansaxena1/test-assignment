from flask import Flask, request, render_template
from pymongo import MongoClient
from bson.json_util import dumps,loads
import json
import base64
import io
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
client = MongoClient('mongodb+srv://codefingersapp:fwXiVrjGocjBeTyz@codefingerscluster.plh122i.mongodb.net/eLitmus?retryWrites=true&w=majority')

USER_DATA_COLLECTION=client["eLitmus"]["users"]
TEST_DATA_COLLECTION=client["eLitmus"]["tests"]
TEST_USER_DATA_COLLECTION=client["eLitmus"]["testUserData"]

@app.route('/')
def root():
    return render_template('./root.html')

@app.route('/validate-creds', methods=['post'])
def validateCreds():
    body = request.json
    res = {}
    res['status'] = 200
    data = json.loads(dumps(TEST_DATA_COLLECTION.find_one({"code": body["code"]})))
    if not data:
        res['status'] = 403
        res['message'] = '"' + body["code"] + '"' + ' is incorect test code'
    
    data = json.loads(dumps(TEST_USER_DATA_COLLECTION.find_one({"key": body["email"] + "-" + body["code"]})))
    if data:
        res['status'] = 403
        res['message'] = '"' + body["email"] + '"' + ' have already attempted the test'

    data = json.loads(dumps(USER_DATA_COLLECTION.find_one({"email": body["email"]})))    
    if not data:
        res['status'] = 403
        res['message'] = '"' + body["email"] + '"' + ' is Unauthorized User'

    return{
        'data': res
    }

@app.route('/test-details', methods=['post'])
def testDetails():
    body = request.json
    TEST_DATA_COLLECTION.update_one({"code": body["code"]}, {"$addToSet":{"attemptedBy": body["email"]}})
    TEST_USER_DATA_COLLECTION.insert_one({"key": body["email"] + "-" + body["code"], "data": []})
    res = json.loads(dumps(TEST_DATA_COLLECTION.find_one({"code": body["code"]})))
    return {
        'data': res, 
    }
    
    
@app.route('/send-image', methods=['post'])
def sendImage():
    body = request.json
    TEST_USER_DATA_COLLECTION.update_one({"key": body["key"]}, {"$push":{"data": {"img": body["img"], "timestamp": body["timestamp"]}}})
    return {
        'data': 'image added successfully', 
    }


@app.route('/all-tests',methods=['get'])
def getAllTests():
    res = json.loads(dumps(TEST_DATA_COLLECTION.find()))
    return {
        "data": res
    }

@app.route('/user-data', methods=['post'])
def userData():
    body = request.json
    res = json.loads(dumps(TEST_USER_DATA_COLLECTION.find_one({"key": body["key"]})))
    return {
        'data': res, 
    }

@app.route('/update-interval-or-duration',methods=['post'])
def updateIntervalOrDuration():
    body = request.json
    TEST_DATA_COLLECTION.find_one_and_update({"code":body["code"]},{"$set":{body["key"]:int(body["value"])}})
    return {
        'data': 'interval update successfully', 
    }


if __name__ == '__main__':
    app.run(debug=True)

