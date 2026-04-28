import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser> ({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const User = mongoose.model<IUser>("User", userSchema)