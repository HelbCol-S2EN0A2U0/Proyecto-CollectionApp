import mongoose from "mongoose";

const markSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    set: (v) => v.toUpperCase(),
  },
  imagen: {
    type: String,
    required: false,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

export default mongoose.model("Marks", markSchema);
