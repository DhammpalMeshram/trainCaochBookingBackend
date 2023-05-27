import Seats from "./modules/seats.js";
import DateRecord from "./modules/dateRecord.js";

// function to get current date
function getCurrentDate(separator=''){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}


//function to check that date is generated or not for today date
export const checkDataAvailability = async()=>{
    const todaysDate = getCurrentDate();
    // const todaysDate = 20230529;
    // await Seats.deleteMany();
    // await DateRecord.deleteMany();

    try{
        let checkDate = await DateRecord.find({date:todaysDate});
        if(checkDate.length) {
            console.log("date is found returning from here");
            return;
        }
        else {
            console.log("generating the data")
            generateData(todaysDate);
        }
    }
    catch(err){
        console.log(err);
        return;
    }
}


//function to generate all seats data automatically
const generateData = (todaysDate)=>{
    const seatArrayObject = [];
    let rowArray = [];
    let index = 1;
    for(let rows=1; rows<=12; rows++){
        rowArray =[]
        for(let seats = 1; seats<=8; seats++){
            if(rows===12 && seats===4) break;
            rowArray.push({id:seats===4?"":index++, seatType: seats===4?"hiddend":"availabel", rowNumber:rows, bookedBy:"none"});
        }
        seatArrayObject.push(rowArray);
    }
    console.log("data is generated successfully");
    return storeDefaultData(seatArrayObject, todaysDate);
}


//function to store that data in the MongoDB
const storeDefaultData = async (data, todaysDate)=>{
    try{
        console.log("Storing Data in DataBase "+"for date "+todaysDate);
        let newSeatsData = new Seats({
                id:todaysDate,
                generationDate:todaysDate, 
                data:data,
                avalableSeats:80,
                bookedSeats:0,
                gents:0,
                ladies:0,
                other:0,
                freeSeatsArray:{"1":7,"2":7, "3":7, "4":7,"5":7, "6":7,'7':7,'8':7,'9':7,'10':7,'11':7,"12":3}
            })
        await newSeatsData.save();
        let newDate = new DateRecord({date:todaysDate})
        await newDate.save();
        console.log("Data inserted Successfully");
    }
    catch(err){
        console.log("data insertion failed "+err);
    }
};

let  ArrayIndex = 0;

//function to update booking data
// export const bookTicketsData = async (seatsTOBook, todaysDate)=>{
//     try{
//         let seatNumbers = seatsTOBook;
//         console.log("Storing Data in DataBase "+"for date "+todaysDate);
//         let seatData  = await Seats.findOne({generationDate:todaysDate})
//         let newSeatData = {};

        
//         let {freeSeatsArray} = seatData;
//         let toProceedFurther = true;

//         for (const key in freeSeatsArray) {
//             if (freeSeatsArray[key] >= seatsTOBook && toProceedFurther){
//                 ArrayIndex = key;

//                 console.log(ArrayIndex);
//                 // console.log(seatData .data[--ArrayIndex]);
//                 const targetedArray = seatData.data[ArrayIndex];
//                 console.log(targetedArray.length);

//                 let newArray = [];
//                 for(let i=0; i<targetedArray.length; i++){
//                     if(targetedArray[i].seatType==='availabel' && seatsTOBook >0){
//                         // console.log("entert in if condition");
//                         let newObject = {
//                             id:targetedArray[i].id,
//                             seatType: "booked",
//                             rowNumber: targetedArray[i].rowNumber,
//                             bookedBy: targetedArray[i].bookedBy,
//                         }
//                         newArray.push(newObject);
//                         seatsTOBook--;
//                     }
//                     else newArray.push(targetedArray[i]);
//                 }

//                     // console.log("below is the new Array out of if");
//                     // console.log(newArray);
//                     //update the data
//                     let ArraytoUpdata = seatData.data;
//                     ArraytoUpdata[ArrayIndex] = newArray;

//                     console.log("updated array");
//                     // console.log(ArraytoUpdata);
//                     // console.log(seatsTOBook);
//                     // console.log(+seatData.avalableSeats-seatNumbers);
//                     // console.log(+seatData.bookedSeats+seatNumbers);
//                     const freeSeatsArray = {...seatData.freeSeatsArray};
//                     freeSeatsArray[ArrayIndex] -= seatNumbers;
                    
//                     // console.log(freeSeatsArray);
//                     newSeatData = {
//                         'freeSeatsArray':freeSeatsArray,
//                         'data': ArraytoUpdata,
//                         'avalableSeats': +seatData.avalableSeats-seatNumbers,
//                         'bookedSeats': +seatData.bookedSeats+seatNumbers,
//                     };

//                     // console.log(newSeatData);
//                 toProceedFurther = false;
//             }
//         }

//         const newSavedValues = await Seats.findOneAndUpdate({generationDate:todaysDate},{...newSeatData})
        
//         console.log(newSavedValues);
//     }
//     catch(err){
//         console.log("data fetch failed "+err.message);
//     }
// }


