import mongoose, {Schema, HydratedDocument, Types} from "mongoose"; 

interface IExpense {
    title: string;
    amount: number;
    category: string;
    userId: Types.ObjectId;
}

export type ExpenseDocument = HydratedDocument<IExpense>;

const expenseSchema = new Schema<ExpenseDocument> ({
    title: {
        type: String,
        required: true
    }, 
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
}) 

export const Expense =  mongoose.model<ExpenseDocument>("Expense", expenseSchema)