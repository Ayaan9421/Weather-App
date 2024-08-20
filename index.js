import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "d97f27ec1e0d49deaee133708242007";
const apiURL = "http://api.weatherapi.com/v1/current.json";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , (req,res)=>{
    res.render("index.ejs");
    // console.log(req.body);
})
app.post("/submit" , async (req,res)=>{
    const city = req.body.city;
    try {
        const response = await axios.get(apiURL + `?q=${city}&key=${apiKey}`);
        const result = response.data;
        //console.log(result);
        res.render("index.ejs" ,{ data: result , place:city } )
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
}
);
app.listen(port, ()=>{
    console.log(`Server Running on ${port}!`);
});