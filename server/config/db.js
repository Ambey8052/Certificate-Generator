import mongoose from "mongoose";

const connectDB = async () => {
	try {
		if (!process.env.MONGO_URI) {
			throw new Error("MONGO_URI is missing in .env");
		}

		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		process.exit(1);
	}
};

export default connectDB;