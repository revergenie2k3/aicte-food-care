var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");
const bodyParser=require('body-parser');

var app=Express(); 
app.use(cors());
app.use(bodyParser.json());
var CONNECTION_STRING="mongodb+srv://smoggysai555:saisharan@cluster0.bxrdtjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME="Food-Care";
var database;
app.listen(5038,()=>{

Mongoclient.connect(CONNECTION_STRING, (error, client)=>{
database=client.db (DATABASENAME);
console.log("Mongo DB Connection Successful");
});
})

app.get('/api/foodcare/displayDish', (request, response)=>{
    database.collection ("Ingredients").find({}).toArray((error, result)=>{
        console.log(result);
    response.json(result);
    });
    })

app.post('/api/foodcare/addDish', (request, response)=>{ 
    console.log(request.body);
        
    database.collection("Ingredients").insertOne({
        food:request.body.name,
        rice:request.body.rice,
        wheat:request.body.wheat,
        mushroom:request.body.mushroom,
        Oil:request.body.oil,
        salt:request.body.salt,
        maggi:request.body.maggi,
        ghee:request.body.ghee,
        coriander:request.body.corriander,
        tomato:request.body.tomato
    });
    response.json("Added Succesfully");
    })

app.post('/api/foodcare/addSales', (request, response) => {
        // Get current date
        const currentDate = new Date().toISOString().split('T')[0];
    
        // Extract data from request body
        const { food, items } = request.body;
    
        // Check if the provided food is valid
        const foods = ["Fried Vermicelli", "Ghee Roast", "Chapati & Gravy", "Parotta & Gravy", "Appam", "Poori", "Maggi", "Ghee Rice", "Idly", "Tomato Rice", "Mushroom Roast", "Pongal"];
        if (!foods.includes(food)) {
            return response.status(400).json({ error: "Invalid food provided" });
        }
    
        // Validate items
        const parsedItems = parseInt(items);
        if (isNaN(parsedItems) || parsedItems <= 0) {
            return response.status(400).json({ error: "Invalid number of items" });
        }
    
        // Insert data into Sales collection
        database.collection("Sales").insertOne({
            date: currentDate,
            food: food,
            items: parsedItems.toString()
        }, (error, result) => {
            if (error) {
                console.error("Error inserting data into Sales:", error);
                return response.status(500).json({ error: "Internal Server Error" });
            }
    
            // Send response
            response.json("Data added successfully to Sales collection");
        });
    });
    
app.post('/api/foodcare/addWaste', (request, response) => {
        // Get current date
        const currentDate = new Date().toISOString().split('T')[0];
    
        // Extract data from request body
        const { amt } = request.body;
    
        // Validate amt
        const parsedAmt = parseFloat(amt);
        if (isNaN(parsedAmt) || parsedAmt <= 0) {
            return response.status(400).json({ error: "Invalid waste amount" });
        }
    
        // Insert data into Waste collection
        database.collection("Waste").insertOne({
            date: currentDate,
            amt: parsedAmt.toString()
        }, (error, result) => {
            if (error) {
                console.error("Error inserting data into Waste:", error);
                return response.status(500).json({ error: "Internal Server Error" });
            }
    
            // Send response
            response.json("Data added successfully to Waste collection");
        });
    });

app.get('/api/foodcare/displayWaste', (request, response) => {
        // Fetch data from Waste collection
        database.collection("Waste").find({}).toArray((error, result) => {
            if (error) {
                console.error("Error fetching data from Waste collection:", error);
                return response.status(500).json({ error: "Internal Server Error" });
            }
    
            // Send response with fetched data
            response.json(result);
        });
    });

app.post('/api/foodcare/addInterReport', (request, response) => {
        // Get current date
        const currentDate = new Date().toISOString().split('T')[0]; 
        
        // Define foods array
        const foods = ["Fried Vermicelli", "Ghee Roast", "Chapati & Gravy", "Parotta & Gravy", "Appam", "Poori", "Maggi", "Ghee Rice", "Idly", "Tomato Rice", "Mushroom Roast", "Pongal"];
    
        // Initialize object to store final data
        const interReportData = [];
    
        // Iterate over each food
        foods.forEach(food => {
            // Initialize object for current food
            const foodData = {
                date: currentDate,
                food: food,
                sold: "0",
                wasted: "0",
                consumed: "0"
            };
    
            // Fetch sales data for current food
            database.collection("Sales").find({ date: currentDate, food: food }).toArray((error, salesResult) => {
                if (error) {
                    console.error("Error fetching sales data:", error);
                    return response.status(500).json({ error: "Internal Server Error" });
                }
    
                // Calculate total sold items
                const totalSoldItems = salesResult.reduce((acc, sale) => acc + parseInt(sale.items), 0);
                foodData.sold = totalSoldItems.toString();
    
                // Fetch ingredient data for current food
                database.collection("Ingredients").findOne({ food: food }, (error, ingredientResult) => {
                    if (error) {
                        console.error("Error fetching ingredient data:", error);
                        return response.status(500).json({ error: "Internal Server Error" });
                    }
    
                    // Calculate total ingredient values
                    const totalIngredientValues = Object.values(ingredientResult).reduce((acc, val) => {
                        if (val !== food && !isNaN(parseInt(val))) {
                            return acc + parseInt(val);
                        }
                        return acc;
                    }, 0);
    
                    // Calculate wasted (dummy value for now)
                    const totalWasted = 0; // You need to fetch wasted data from your database
                    foodData.wasted = totalWasted.toString();
    
                    // Calculate consumed
                    foodData.consumed = (totalSoldItems - totalWasted).toString();
    
                    // Push food data to interReportData array
                    interReportData.push(foodData);
    
                    // Check if all foods data processed
                    if (interReportData.length === foods.length) {
                        // Insert interReportData to InterReport collection
                        database.collection("InterReport").insertMany(interReportData, (error, result) => {
                            if (error) {
                                console.error("Error inserting data into InterReport:", error);
                                return response.status(500).json({ error: "Internal Server Error" });
                            }
    
                            // Send response
                            response.json("Data added successfully to InterReport collection");
                        });
                    }
                });
            });
        });
    });

    app.post('/api/foodcare/addReport', (request, response) => {
        // Get current date
        const currentDate = new Date().toISOString().split('T')[0]; 
        
        // Define foods array
        const foods = ["Fried Vermicelli", "Ghee Roast", "Chapati & Gravy", "Parotta & Gravy", "Appam", "Poori", "Maggi", "Ghee Rice", "Idly", "Tomato Rice", "Mushroom Roast", "Pongal"];
    
        // Initialize object to store final data
        const reportData = [];
    
        // Iterate over each food
        foods.forEach(food => {
            // Get InterReport data for current food
            database.collection("InterReport").findOne({ date: currentDate, food: food }, (error, interReportData) => {
                if (error) {
                    console.error("Error fetching InterReport data:", error);
                    return response.status(500).json({ error: "Internal Server Error" });
                }
    
                // Determine action based on amt
                let action = "";
                let amt = "";
                if (interReportData) {
                    const interReportAmt = parseInt(interReportData.amt);
                    if (!isNaN(interReportAmt)) {
                        action = interReportAmt >= 0 ? "Increase" : "Reduce";
                        amt = Math.abs(interReportAmt).toString();
                    }
                }
    
                // Add entry for current food with action and amount
                reportData.push({
                    date: currentDate,
                    food: food,
                    action: action,
                    amt: amt
                });
    
                // Check if all foods data processed
                if (reportData.length === foods.length) {
                    // Insert reportData to Report collection
                    database.collection("Report").insertMany(reportData, (error, result) => {
                        if (error) {
                            console.error("Error inserting data into Report:", error);
                            return response.status(500).json({ error: "Internal Server Error" });
                        }
    
                        // Send response
                        response.json("Data added successfully to Report collection");
                    });
                }
            });
        });
    });
    