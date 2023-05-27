import mongoose from "mongoose";

const dateRecordSchema = new mongoose.Schema({
    date:{type: String},
})

//Creating Collection
const DateRecord = mongoose.model("dateRecord", dateRecordSchema);
export default DateRecord;
