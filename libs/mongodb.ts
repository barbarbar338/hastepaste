import { MongoClient, MongoClientOptions } from "mongodb";
import constants from "./constants";

const options: MongoClientOptions = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(constants.MONGODB_URI, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(constants.MONGODB_URI, options);
	clientPromise = client.connect();
}

export default clientPromise;
