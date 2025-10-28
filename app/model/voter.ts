// models/Voter.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface IVoter extends Document {
  voterName: string;
  school: string;
  placeNumber: number;
  votesCount: number;
}

const VoterSchema = new Schema<IVoter>({
  voterName: { type: String, required: true },
  school: { type: String, required: true },
  placeNumber: { type: Number, required: true },
  votesCount: { type: Number, default: 0 },
});

// Use existing model if it’s already declared to avoid “OverwriteModelError”
const Voter: Model<IVoter> =
  (mongoose.models.Voter as Model<IVoter>) ||
  mongoose.model<IVoter>("Voter", VoterSchema);

export default Voter;
