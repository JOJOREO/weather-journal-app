/* Global Variables */


const allData = [];





let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
let newDate2=newDate.toString();
const baseURLServer="http://localhost:8000/";
//const zipCode=document.getElementById("zip");
const date = document.querySelector("#date");
const zipCode=document.querySelector("#zip");
const temp =  document.getElementById('temp'); 
//const content =  document.getElementById('content').value;
const feeling =  document.getElementById('feelings');
const feelingBanner=document.getElementById("content")




const baseUrlExample="https://api.openweathermap.org/data/2.5/weather?zip={zipcode},{country code}&appid={API key}"




const baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API
// const apiKey = '<your_api_key>&units=imperial';

const apiKey ='&appid=dd2863c7af4dbf35efe8c3c36479a5dc&units=imperial';
const apiKey2="&appid=d6d447bcb13daeecec6d8dff28ff930d&units=imperial";



document.getElementById("generate").addEventListener("click",performAction);

function performAction(event){  
  event.preventDefault();
  // console.log(baseUrl);
  // console.log(zipCode.value);
  // console.log(apiKey);

  const resultUrl=`${baseUrl}${zipCode.value}${apiKey}`;
  //console.log(resultUrl);
  getData(resultUrl)
    .then((data)=>{
      passData(data)
        .then((info)=>{
          postData("/postAll",info)
            .then((data)=>{
              returnData("/home")
                .then((data)=>{
                  updateUi(data);
                });
            });
        });
    });
   };
        
      
         
  const getData = async (url)=>{
    //console.log("1");
    try {
      //console.log("2");
      const result = await fetch(url);
      const data = await result.json();
      if(data.cod == 200)
      {
        //console.log("3");
        //console.log(data);
        return data;
      }
      else
      {
        //console.log("4");
        console.log(data.message);
        return data;
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
  const passData= async (data)=>{

    try {
        
      if(data.message)
      {
        // const reqData=data.message;
        // return reqData;
        return data;
      }      
      else{
        const reqData = {date:newDate2 , feelings:feeling.value,temp:data.main.temp };
        //console.log(reqData)
        return reqData;
      }
      

    } catch (error) {
      console.log(error);
    }

  }
  const postData = async (url="",data={})=>
  {
    try {
      const result = await fetch(url,{
        method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      });
      return result;
      
    } catch (error) {
      console.log(error);
    }
  }
  const returnData = async (url)=>{
    const data = await fetch(url);
    try {
      //const response =  (await data).json;
      const response =  await data.json();
     // console.log(response);
      return response;
      
    } catch (error) {
      console.log(error);
    }
  }

  const updateUi= async (data)=>{
    //const response = (await data).json;
    const response = await data;
    // console.log(response);
    if(response.date)
    {
      date.innerHTML=`date = ${response.date} \n`;
      temp.innerHTML=`temp = ${response.temp} \n`;
      feelingBanner.innerHTML=`feelings = ${response.feelings?response.feelings:"how are u feeling now?"} \n`;  
    }
    else{
      date.innerHTML=`  ${response.message} \n`;
    }
  }
  
 