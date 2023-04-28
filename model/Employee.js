const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      unique: true,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    status: {
      type: String,
      enum: ["Remote Location", "Contract Employee", "Full-Time"],
    },
    lat: { type: String, required: true },
    long: { type: String, required: true },
  }
  // { timestamps: true }
);
EmployeeSchema.pre("save", async function (next) {
  try {
    const doc = this;
    if (!doc.isNew) {
      return next(); // Skip if the document is not new
    }

    const maxSerialNumber = await mongoose
      .model("Employee")
      .findOne()
      .sort({ serialNumber: -1 })
      .select("serialNumber")
      .lean();

    const nextSerialNumber = (maxSerialNumber?.serialNumber || 0) + 1;
    doc.serialNumber = nextSerialNumber;
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
