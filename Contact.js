// https://nominatim.openstreetmap.org/search?q=Bhubaneswar&format=json&limit=1
document.addEventListener("DOMContentLoaded", () => {
const radioButtons = document.querySelectorAll(".dropdown");
let prev = null; 
   
radioButtons.forEach((radio) => {
   
        radio.addEventListener("click", () => {
          let btn=radio.nextElementSibling;
            
            let section=btn.nextElementSibling;
           
            let rect=btn.getBoundingClientRect();
           
            section.style.width=rect.width+"px";

            if (radio.checked) {
                if (radio.classList.contains("selected")) {
                    radio.checked = false;
                    radio.classList.remove("selected");
                    prev = null;
                } else {
                    if (prev) prev.classList.remove("selected");
                    radio.classList.add("selected");
                    prev = radio;
                }
            }
        });
   });

const form = document.querySelector('.form').querySelector('form');

form.querySelectorAll('input:not([name="gender"]):not([id="tick"]):not([name="country"]):not([id="country"]):not([name="state"]):not([id="state"])').forEach((input) => {
    input.addEventListener("input", (e) => {
      if( input.id!=="terms"&&input.parentElement.parentElement.id!=="request"&&input.name!=="city"){
        input.parentElement.querySelector('.iconcotainer')?.classList.add("opacity-0");
     }
        if(input.id==="fileInput"){

            const fileInput = document.getElementById("fileInput");
            const fileLabel = document.getElementById("file-label");
            const preview = document.getElementById("preview");
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const fileName = file.name;
          
                
          
                  preview.classList.add("hidden"); 
             
          
                fileLabel.textContent = fileName;
                document.getElementById("fileuploadlogo").classList.add("hidden");
              } else {
                console.log("with in the else part")
                fileLabel.textContent = "Choose file";
                preview.classList.add("hidden");
                document.getElementById("fileuploadlogo").classList.remove("hidden");
              }
        }
        else{
        let key = input.name;
        let value = input.value;
       
       
        const innertext=input.parentElement?.nextElementSibling?.innerText;
        
        
        if(innertext&&input.id!=="terms"&&input.id!=="fileInput"&&input.parentElement.parentElement.id!="request"){
          input.parentElement.parentElement.querySelector('.error-text').innerText="";
        }
        if(input.id=="terms"){
          input.nextElementSibling.querySelector('p').textContent="";
        }
       
      if (key === "address"|| key === "message"||input.id==="cityInput") {
        let charInput = input.parentElement.querySelector('.charcounter').textContent.split('/');
        console.log(charInput)
        let currentCount = parseInt(charInput[0].trim(), 10);
        let maxCount = parseInt(charInput[1].trim(), 10);
        if (currentCount >= maxCount) {
          console.log(input.parentElement.parentElement.querySelector('.error-text').innerText);
          input.parentElement.parentElement.querySelector('.error-text').innerText = "Limit Reached!";
        }
      }
      
    }
     
    });
    input.addEventListener("change",()=>{
      if( input.id!=="terms"&&input.parentElement.parentElement.id!=="request"){
        input.parentElement.querySelector('.iconcotainer')?.classList.add("opacity-0");
     }
      let key = input.name;
      let value = input.value;
     
     
      const innertext=input.parentElement?.parentElement?.querySelector('.error-text')?.innerText;
      console.log(innertext)
      
      if(innertext&&input.id!=="terms"&&input.id!=="fileInput"){
        input.parentElement.parentElement.querySelector('.error-text').innerText="";
      }
      if(input.id=="terms"){
        input.nextElementSibling.querySelector('p').textContent="";
      }
       if (key === "email") {
        const emailResult = validateEmail(value);
       
        if (emailResult !== "Valid"&&emailResult!=="") {
          customAlert("./public/yellow3.png" ,emailResult,3000);
        }
      }
      if (key === "fullname") {
        const nameResult = validateName(value);
        if (nameResult !== "Valid" &&nameResult!=="") {
          customAlert( "./public/yellow3.png", nameResult,3000);
        }
      
     
    }
    if(key==="phonenumber"){
        const validationresult=validatePhoneNumbebr(value);
        if(validationresult!=="Valid"&&validationresult!==""){
          customAlert("./public/yellow3.png",validationresult,3000);
        }  
    }
    })


});
});
const form = document.querySelector('.form').querySelector('form');

form.addEventListener('submit', async(e) => {
  e.preventDefault();
  

  form.querySelectorAll('.error-message').forEach(error => error.remove());

  const formData = new FormData(form);
  let isValid = true;
  let firstInvalidInput = null; 

  for (let [key, value] of formData.entries()) {
    const input = document.getElementsByName(key)[0];
   console.log(key,input.required)

    if (input.required && key!=="fileupload"&&!value.trim()&&input.name!=="city") {
    
    console.log("for city",key,value);
      const errorDiv = input.parentElement.querySelector('.iconcotainer');
      isValid = false;
      if (!firstInvalidInput) {
        firstInvalidInput = input; 
        console.log(firstInvalidInput);
      }
      if (errorDiv) {
    
        errorDiv.classList.remove("opacity-0");
      }
     
    }

    if (key === "email") {
      const result = validateEmail(value);
      if (result !== "Valid") {
        isValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
        const paragraph = input.parentElement.parentElement.querySelector('.error-text'); 

        if (paragraph) {
          paragraph.innerText = result;
        }
      }
    }

    if (key === "fullname") {
      const result = validateName(value);
      if (result !== "Valid") {
        isValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
        const paragraph = input.parentElement.parentElement.querySelector('.error-text'); 

        
        if (paragraph) {
          paragraph.innerText = result;
        }
      }
    }
    if(key==="phonenumber"){
      const result = validatePhoneNumbebr (value);
      if (result !== "Valid") {
        isValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
        const paragraph = input.parentElement.parentElement.querySelector('.error-text'); 

       
        if (paragraph) {
          paragraph.innerText = result;
        }
      }
  }
  if(key=="gender"||key=="country"||key=="state"){
    const result = validateText(value);
    if (result !== "Valid") {
      isValid = false;
      if (!firstInvalidInput) {
        firstInvalidInput = input;
        }
        const paragraph = input.parentElement.parentElement.querySelector('.error-text'); 
        if (paragraph) {
          paragraph.innerText = result;
          }
  }
    
  } 

  if(key=="fileupload"&&input.required){
    if(input.files.length<1){
      input.parentElement.parentElement.querySelector('.iconcotainer').classList.remove("opacity-0");
      if(!firstInvalidInput){
        firstInvalidInput=input;
      }
    }
  }
}
const terms=document.getElementById("terms");
   
    if (terms.checked==false){
      if(terms.classList.contains("pulse")){
          terms.classList.remove("pulse");
      }
      isValid=false;
      if (!firstInvalidInput) {
          firstInvalidInput = terms;
      }
      terms.classList.add("pulse");
      terms.parentElement.querySelector('.error-text').innerText="You must agree to the terms and conditions";
    }else if(terms.checked){
      terms.parentElement.querySelector('.error-text').innerText="";

    }  
try{
  if (isValid) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('hidden');
    document.body.style.overflow="hidden";

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });
    
        const result = await response.json();
        console.log("File uploaded successfully:",result);
        
  
        customAlert("./public/green.png", "form submitted successfully");
        document.getElementById("file-label").textContent = "Choose file";
        preview.classList.add("hidden");
        document.getElementById("fileuploadlogo").classList.remove("hidden");
        document.querySelectorAll('.charcounter').forEach((item)=>{
          const max=item.textContent.split('/')[1];
          item.textContent=`0/${max}`;
        })
    loadingOverlay.classList.add('hidden');
    document.body.style.overflow="";


        form.reset();
  } else {
    if (firstInvalidInput) {
      firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalidInput.focus();
    }
  }}catch(error){
    const loadingOverlay = document.getElementById('loadingOverlay');
    
      console.log("Error during submission:",error);
      customAlert("./public/cross.png","Submission Failed!");
      document.getElementById("file-label").textContent = "Choose file";
      preview.classList.add("hidden");
      document.getElementById("fileuploadlogo").classList.remove("hidden");
      document.querySelectorAll('.charcounter').forEach((item)=>{
        const max=item.textContent.split('/')[1];
        item.textContent=`0/${max}`;
      })
    document.body.style.overflow="";

    loadingOverlay.classList.add('hidden');

      form.reset();
  }

});
let prevAccordion = null;

document.querySelectorAll(".accordion").forEach((item) => {
    let img = item.querySelector(".icon");
    
    item.addEventListener("click", function (event) {
      event.preventDefault(); 
      let content = this.querySelector("p");
      
      
      if (this.hasAttribute("open")) {
        content.classList.remove("fadeIn");
      void content.offsetWidth; 
       
      content.classList.add("fadeOut");
        this.removeAttribute("open");
        img.src="./public/plus.png";
        prevAccordion = null;
        
      } else {
       if (prevAccordion) {
          
        prevAccordion.querySelector('p').classList.add('fadeOut');
        prevAccordion.querySelector('p').classList.remove('fadeIn');
        
          prevAccordion.removeAttribute("open");
          prevAccordion.querySelector('.icon').src="./public/plus.png"
        
      

        }
        content.classList.remove("fadeOut");
        // content.classList.remove("fadeIn");
      void content.offsetWidth; 
      content.classList.add("fadeIn");
        img.src="./public/minus.png"
      
        this.setAttribute("open", true);
        prevAccordion = this;
      }
    });
});
document.addEventListener('click', function(event) {
    const excludedDiv = document.querySelector('.left');
    if(excludedDiv.contains(event.target)){
      return;
    }
    document.querySelectorAll('.dropdown').forEach((item) => {
        if (item.checked) {
            item.checked = false;
        }
    });
});

pickItem("optioncontainer","option","tick","gender").then(()=>{
  document.getElementsByName("gender")[0].nextElementSibling.classList.add("opacity-0");
});
select("gender", "optioncontainer","tick","option");


function customAlert(imgsrc,message,duration=3000){
    const alert=document.getElementById("customAlert");
    alert.querySelector('p').textContent=message;
    alert.querySelector('img').src=imgsrc;
   
    alert.classList.remove("opacity-0", "pointer-events-none");
    alert.classList.add("opacity-100");
    setTimeout(() => {
        alert.classList.remove("opacity-100");
        alert.classList.add("opacity-0", "pointer-events-none");
    },duration)
}

document.getElementById("tick").addEventListener('click',()=>{
  const tickInput=document.getElementById("tick");
  if(tickInput.checked){
    document.querySelector(".optioncontainer").classList.add("flex");
    document.querySelector(".optioncontainer").classList.remove("hidden");

    
  }
  if(!tickInput.checked){
    document.querySelector(".optioncontainer").classList.remove("flex");
    document.querySelector(".optioncontainer").classList.add("hidden");
  }
})
function validateText(str){
  if(str.length==0){
    return "";
  }
  if (!/^[a-zA-Z\s]+$/.test(str)){
    return "Invalid input!"
  }; 
  return "Valid";
}
function setupCharCount(inputId, countId, maxChars) {
  const inputField = document.getElementById(inputId);
  const charCountDisplay = document.getElementById(countId);

  inputField.addEventListener('input', function() {
    let currentLength = inputField.value.length;

    if (currentLength > maxChars) {
      inputField.value = inputField.value.slice(0, maxChars);
      currentLength = maxChars;
    }

    charCountDisplay.textContent = `${currentLength} / ${maxChars}`;
  });
}

setupCharCount('cityInput','charCount', 20);
setupCharCount('addressInput','addresschar', 60);
setupCharCount('messageinput','message', 100);
function waitForSelect(inputName) {
  return new Promise((resolve) => {
    const inputField = document.querySelector(`input[name="${inputName}"]`);
    inputField.addEventListener("change", function handler() {
      inputField.removeEventListener("change", handler); 
      resolve(inputField.value);
    });
  });
}
function initializeCountrySelection() {
  return populateCountry()
    .then(() => {
      select("country", "countrycontainer", "country", "country");

      return pickItem("countrycontainer", "country", "country", "country");
    })
    .then((selectedCountry) => {
      console.log("Country selected:", selectedCountry);
      return getStateFromCountry(selectedCountry);
    })
    .then(() => {
      select("state", "statecontainer", "state", "state");

      return pickItem("statecontainer", "state", "state", "state");
    })
    .then((selectedState) => {
      console.log("State selected:", selectedState);
      document.getElementsByName("state")[0].nextElementSibling.classList.add("opacity-0");

      doSomethingAfterStateSelection(selectedState);
    })
    .catch((error) => {
      console.error("Error in sequential selection:", error);
    });
}
initializeCountrySelection();

document.querySelector('input[name="country"]').addEventListener("change", () => {
initializeCountrySelection();

});
document.querySelector('input[name="state"]').addEventListener("change", () => {
  document.querySelector('input[name="state"]').parentElement.querySelector('.iconcotainer').add("opacity-0");
  
  });
function pickItem(containerClass, childClass, checkId, inputName) {
    return new Promise((resolve) => {
      const options = document.querySelectorAll(`.${childClass}`);
      options.forEach((item) => {
        item.addEventListener("click", ()=> {
          const input = document.querySelector(`input[name="${inputName}"]`);
          if (input) {
            input.value = item.innerText;
          }
          const checkbox = document.getElementById(checkId);
          if (checkbox && checkbox.checked) {
            checkbox.checked = false;
            const container = document.querySelector(`.${containerClass}`);
            container.classList.remove("flex");
            container.classList.add("hidden");
          }
          resolve(item.innerText); 
        });
      });
    });
}

function populateCountry() {
  return new Promise((resolve, reject) => {
    const container = document.querySelector('.countrycontainer');
    
    const uniqueCountries = new Set();

    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {

        data.forEach((country) => {
          const countryName = country.name.common; 

          // Check for uniqueness before adding to the Set
          if (!uniqueCountries.has(countryName)) {
            uniqueCountries.add(countryName);

            // Create a new div for each country
            const cntryElement = document.createElement('div');
            cntryElement.classList.add("country", "item");
            cntryElement.textContent = countryName; // Set the country name
            container.appendChild(cntryElement);
          }
        });
        
        resolve();  // Resolve the promise after all countries are appended
      })
      .catch(error => {
        console.error("Error:", error);
        reject(error); // Reject in case of an error
      });
  });
}
async function getStateFromCountry(country="India") {
  const container = document.querySelector(".statecontainer");

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://api.geonames.org/searchJSON?q=${country}&maxRows=1&username=Sibanarayan`);
      const data = await response.json();
      console.log(data);
      if (data && data.geonames.length > 0) {
        const countryData = data.geonames[0];
        const geonameId = countryData.geonameId;
        console.log(geonameId)

        const statesResponse = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=Sibanarayan`);
        const statesData = await statesResponse.json();
        console.log(statesData)

        if (statesData && statesData.geonames && statesData.geonames.length > 0) {
          console.log("States/Regions for", country, ":");
          
          container.innerHTML = ''; 

          statesData.geonames.forEach(state => {
            const cntryElement = document.createElement('div');
            cntryElement.classList.add("state", "option", "px-2", "hover:bg-sky-600", "hover:text-white", "cursor-pointer", "drop-shadow-lg", "shadow-inner", "shadow-gray-50");
            cntryElement.textContent = state.name; // Set the state name
            container.appendChild(cntryElement);
          });

         
          resolve();
        } else {
          console.log("No states/regions found for", country);
          reject("No states/regions found");
        }
      } else {
        console.log("Country not found");
        reject("Country not found");
      }
    } catch (error) {
      console.error("Error fetching data from Geonames:", error);
      reject(error); // Reject the promise in case of an error
    }
  });
}
function select(inputName, optionContainerClass, checkId, optionClassName) {
  const inputField = document.querySelector(`input[name="${inputName}"]`);
  const optionContainer = document.querySelector(`.${optionContainerClass}`);
  const checkbox = document.getElementById(checkId);

  inputField.addEventListener('change', () => {
    inputField.parentElement.querySelector('.iconcotainer').classList.add("opacity-0");
    
    const filter = inputField.value.toLowerCase();
    const options = optionContainer.querySelectorAll(`.${optionClassName}`);
    let matchFound = false;
    let firstMatch=null;
    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      if (text.indexOf(filter) > -1) {
        matchFound = true;
        firstMatch=option;
      }
    });
    if (!matchFound && inputField.name === "country") {
      inputField.value = "";
      customAlert("./public/yellow3.png", `${inputField.name} not found`);
    }else{
      firstMatch.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  inputField.addEventListener("input", function () {
    if (!checkbox.checked) {
      checkbox.checked = true;
    }
    inputField.parentElement.querySelector('.iconcotainer').classList.add("opacity-0");
    const filter = inputField.value.toLowerCase();
    const options = optionContainer.querySelectorAll(`.${optionClassName}`);
    let firstMatch = null;
    let matchFound = false;
  
    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      if (text.indexOf(filter) > -1) {
        option.style.display = "";
        if (!firstMatch) {
          firstMatch = option;
        }
        matchFound = true;
      } else {
        option.style.display = "none"; 
      }
    });
  
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}
function doSomethingAfterStateSelection(state) {
  console.log("Proceeding with state:", state);
}
function validateAddress(str){
  let regex = /^[a-zA-Z0-9\s,.'-]+$/;
  if(!regex.test(str)) {
    return "Address contain invalid characters!";}
    return "Valid";
}
function validateName(str) {
   
  if(str.length==0){
      return  "";
  }
  if (!/^[a-zA-Z\s]+$/.test(str)) {
      return "Name can only contain letters!";
  }
  if (str.length < 5) {
      return "Name should be atleast 5 characters long!";
  }

 

  return "Valid";
}
function validateEmail(str) {
  if(str.length==0){
      return  "";
  }
  if (!str.includes("@")) {
      return "Email must contain '@' symbol!";
  }

  const parts = str.split("@");

  if (parts.length !== 2 || parts[0] === "" || parts[1] === "") {
      return "Invalid username and domain!";
  }

  const [localPart, domain] = parts;

  if (!/^[a-zA-Z0-9._%+-]+$/.test(localPart)) {
      return "Invalid characters in the username part.";
  }

  if (!domain.includes(".")) {
      return "Domain must contain a '.' symbol.";
  }

  const domainParts = domain.split(".");
  if (domainParts.some(part => part === "")) {
      return "Domain must not be empty!";
  }

  if (!/^[a-zA-Z]{2,}$/.test(domainParts[domainParts.length - 1])) {
      return "Domain extension must have at least 2 letters!";
  }

  return "Valid";
}
function validatePhoneNumbebr(number){
  if(number.length==0){
      return"";
  }
  if (!/^[0-9]+$/.test(number)) {
      return "Phone Number should contain number only!";
  }
if(number.length<10){
  return"Number should be atleast 10 digits long!";
}
return "Valid";
}