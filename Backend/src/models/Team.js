// import mongoose from "mongoose";

// const teamSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference
//     members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference array
//     status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
//   },
//   { timestamps: true }
// );

// const Team = mongoose.model("Team", teamSchema);
// export default Team;

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
