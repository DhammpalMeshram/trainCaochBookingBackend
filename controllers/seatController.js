import Seats from "../modules/seats.js"

export const getAllDataController = async (req, res)=>{
    try{
        // console.log("this request is triggered");
        let date = req.body.date;
        let seats = await Seats.findOne({generationDate:date});
        // console.log(seats);

        res.status(200).json(seats);
    }
    catch(err){
        console.log("error occured");
        res.status(500).json({message:err.message});
    }
}



export const getSeatNumbers  =async (req, res)=>{
    try{
        let date = req.body.date;
        let seats = await Seats.findOne({generationDate:date});

        console.log(seats);

        const {avalableSeats,bookedSeats,gents,ladies,other} = seats;
        
        res.status(200).json({avalableSeats,bookedSeats,gents,ladies,other});
    }
    catch(err){
        console.log("error occured");
        res.status(500).json({message:err.message});
    }
}


//function to update booking data
export const bookSeatController = async (req, res)=>{
    try{
        // getting all the data
        let todaysDate = req.body.date;
        let seatsTOBook = req.body.numberOfSeats;
        let seatNumbers = seatsTOBook;
        let bookTicketsNumbers = []

        // bringbing dataCopy from backend
        // console.log("Storing Data in DataBase "+"for date "+todaysDate);
        let seatData  = await Seats.findOne({generationDate:todaysDate})
        console.log(seatData);
        let newSeatData = {};
        
        //check for number of seats with help of freeSeatsArrays
        let {freeSeatsArray} = seatData;
        let toProceedFurther = true;

        // loop to check number of seats availability in
        for (const key in freeSeatsArray) {
            //if free seats are available in array
            if (freeSeatsArray[key] >= seatsTOBook && toProceedFurther){
                
                //capture the row number in which seats are available
                let ArrayIndex = key;
                // console.log(ArrayIndex);
                // console.log(seatData .data[--ArrayIndex]);

                //capture targetedArray from database
                const targetedArray = seatData.data[ArrayIndex];
                // console.log(targetedArray.length);

                let newArray = [];

                // building new row with updated value of seat ocuupation
                for(let i=0; i<targetedArray.length; i++){
                    if(targetedArray[i].seatType==='availabel' && seatsTOBook >0){
                        // console.log("entert in if condition");
                        let newObject = {...targetedArray[i],
                            // id:targetedArray[i].id,
                            seatType: "booked",
                            // rowNumber: targetedArray[i].rowNumber,
                            // bookedBy: targetedArray[i].bookedBy,
                        }
                        bookTicketsNumbers.push(targetedArray[i].id);
                        newArray.push(newObject);
                        seatsTOBook--;
                    }
                    else newArray.push(targetedArray[i]);
                }

                // at this point i have one complete row,

                    // console.log("below is the new Array out of if");
                    // console.log(newArray);
                    //update the data
                    let ArrayToUpdate = seatData.data;
                    ArrayToUpdate[ArrayIndex] = newArray;

                    // console.log("updated array");
                    // console.log(ArrayToUpdate);
                    // console.log(seatsTOBook);
                    // console.log(+seatData.avalableSeats-seatNumbers);
                    let bookedSeats = Number(seatData.bookedSeats)+Number(seatNumbers);
                    console.log(bookedSeats);
                    
                    //updating the values for free seats array
                    const freeSeatsArray = {...seatData.freeSeatsArray};
                    freeSeatsArray[ArrayIndex] -= seatNumbers;
                    
                    // console.log(freeSeatsArray);

                    //setting all updation together
                    newSeatData = {
                        'freeSeatsArray':freeSeatsArray,
                        'data': ArrayToUpdate,
                        'avalableSeats': +seatData.avalableSeats-seatNumbers,
                        'bookedSeats': bookedSeats,
                    };

                    // console.log(newSeatData);
                    //if more seats are needed to fill
                    if(seatsTOBook>0) {
                         //updating the value;
                        const newSavedValues = await Seats.findOneAndUpdate({generationDate:todaysDate},{...newSeatData})
                        // console.log(newSavedValues);
                        toProceedFurther = true;
                    }
                    else toProceedFurther = false;
            }
        }
        const newSavedValues = await Seats.findOneAndUpdate({generationDate:todaysDate},{...newSeatData})
        // console.log(newSavedValues);

        const seats = await Seats.findOne({generationDate:todaysDate});

        res.status(200).json(seats);
        // res.status(201).json({newUpdatedData,bookTickes:bookTicketsNumbers})
    }
    catch(err){
        console.log("data fetch failed "+err.message);
    }
}