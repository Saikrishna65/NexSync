import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    members: [
      {
        _id: false,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "editor", "viewer"],
          default: "viewer",
        },
      },
    ],
    graph: {
      nodes: [
        {
          _id: false,
          id: { type: String, required: true },
          type: { type: String, required: true },
          position: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
          },
          config: {
            latency: { type: Number, default: 0, min: 0 },
            failureRate: {
              type: Number,
              default: 0,
              min: 0,
              max: 1,
            },
            capacity: { type: Number, default: 0, min: 0 },
          },
        },
      ],
      edges: [
        {
          _id: false,
          id: { type: String, required: true },
          source: { type: String, required: true },
          target: { type: String, required: true },
        },
      ],
    },
    simulation: {
      isRunning: { type: Boolean, default: false },
      trafficRate: { type: Number, default: 100, min: 0 },
      lastRunAt: { type: Date },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

workspaceSchema.index({ name: 1, owner: 1 }, { unique: true });

workspaceSchema.index({ "members.user": 1 });

export const Workspace = mongoose.model("Workspace", workspaceSchema);
