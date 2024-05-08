import mongoose from "mongoose";

const jsonDataSchema = mongoose.Schema(
  {
    end_year: {
      type: String,
      default: null,
    },
    intensity: {
      type: Number,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    insight: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    start_year: {
      type: String,
      default: null,
      required: true,
    },
    impact: {
      type: String,
      default: null,
    },
    added: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    relevance: {
      type: Number,
      required: true,
    },
    pestle: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    likelihood: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const JSONData = mongoose.model("JSONData", jsonDataSchema);

export default JSONData;
