from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__)

# Setup the MongoDB URI
app.config["MONGO_URI"] = "mongodb+srv://thumulavamshidhar:f4trYd1iwcsN2Wcm@cluster0.tft0ezp.mongodb.net/squirrel"
mongo = PyMongo(app)
CORS(app)

# Routes

# Fetch all data
@app.route('/data', methods=['GET'])
def get_all_data():
    data = mongo.db.my_collection.find()
    return dumps(data)

# Insert new data
@app.route('/data', methods=['POST'])
def add_data():
    data = request.json
    mongo.db.my_collection.insert_one(data)
    return jsonify(message="Data added successfully"), 201

# Fetch single data by ID
@app.route('/data/<id>', methods=['GET'])
def get_data(id):
    data = mongo.db.my_collection.find_one({"_id": ObjectId(id)})
    return dumps(data)

# Update data by ID
@app.route('/data/<id>', methods=['PUT'])
def update_data(id):
    data = request.json
    mongo.db.my_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify(message="Data updated successfully")

# Delete data by ID
@app.route('/data/<id>', methods=['DELETE'])
def delete_data(id):
    mongo.db.my_collection.delete_one({"_id": ObjectId(id)})
    return jsonify(message="Data deleted successfully")

@app.route('/api/save-inspection', methods=['POST'])
def save_inspection():
    form_data = request.json
    inspection_id = mongo.db.inspections.insert_one(form_data).inserted_id
    return jsonify({"msg": "Inspection saved", "id": str(inspection_id)})

if __name__ == "__main__":
    app.run(debug=True)
