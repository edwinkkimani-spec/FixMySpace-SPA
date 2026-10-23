
//Getting elements by id
const report= document.getElementById("report");
const title = document.getElementById("title");
const loca = document.getElementById("location");
const cate1= document.getElementById("category2");
const despi = document.getElementById("description");

const reportL = document.getElementById("report3");
const messages = document.getElementById("message");
const searchIn = document.getElementById("search5");
const search= document.getElementById("search-btn");
const  messageSEARCH = document.getElementById("search-mess");

//Storing the reports while page still open
let reports = [];

//Creating a function that will display reports
function Reportsdisplayed(reportsToDisplay) {
  reportL.innerHTML = "";

  if (reportsToDisplay.length === 0) {
    reportL.innerHTML = "<p>No reports found</p>";
    return;
  }

  reportsToDisplay.forEach(function (report) {
    const article = document.createElement("article");

    const head = document.createElement("h3");
    head.textContent = report.title;

    const loc = document.createElement("p");
    loc.textContent = "Location: " + report.location;

    const cat = document.createElement("p");
    cat.textContent = "Category: " + report.category;

    const des = document.createElement("p");
    des.textContent = "description: " + report.description;

    const statusl= document.createElement("label");
    statusl.textContent = "Status: ";

    const stat= document.createElement("select");

    const statuses = ["Unresolved", "In Progress", "Resolved"];

    statuses.forEach(function (statusOption) {
      const opt = document.createElement("option");
      opt.value = statusOption;
      opt.textContent = statusOption;

      if (statusOption === report.status) {
        opt.selected = true;
      }

      stat.appendChild(opt);
    });

    stat.addEventListener("change", function () {
      report.status = stat.value;
      UpdateDashboard();
    });

    statusl.appendChild(stat);

    article.append(head, loc, cat, des, statusl);
    reportL.appendChild(article);
  });
}

//Update dashBoard numbers to show
function UpdateDashboard() {
  document.getElementById("total-reports").textContent = reports.length;

  document.getElementById("unresolved-reports").textContent = reports.filter(
    function (report) {
      return report.status === "Unresolved";
    },
  ).length;

  document.getElementById("progress-reports").textContent = reports.filter(
    function (report) {
      return report.status === "In Progress";
    },
  ).length;

  document.getElementById("resolved-reports").textContent = reports.filter(
    function (report) {
      return report.status === "Resolved";
    },
  ).length;
}

const ApI_URL ="http://localhost:3002/reports"

async function Reportsfetch(){
     try{
     const response=await fetch(ApI_URL)
  

     if(!response.ok){
      throw new error("Failed to fetch reports")
     }
     const data= await response.json()
     console.log(data)
    reports = data;

     Reportsdisplayed(reports)
     UpdateDashboard()
     }catch(error){
      console.error("Error occured fetching reports",error)
      messages.textContent="Unable to load reports" 
     }
}


//Submit another campus reprot
report.addEventListener("submit", async function (event) {
  event.preventDefault();

  try {
    const newr = {
      title: title.value.trim(),
      location: loca.value.trim(),
      category: cate1.value.trim(),
      description: despi.value.trim(),
      status: "Unresolved",
    };

    if (
      !newr.title ||
      !newr.location ||
      !newr.category ||
      !newr.description
    ) {
      messages.textContent = "Please complete all fields";
      return;
    }
    const response= await fetch(ApI_URL,{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        }  ,   
       body:JSON.stringify(newr)
      })
        if(!response.ok){
         throw new  Error("Failed to submit report.")
        }
       const data= await response.json()
        reports.push(data)

    Reportsdisplayed(reports);
    UpdateDashboard();

    messages.textContent = "Your report was submitted successfully";
    
  } catch (error) {
    messages.textContent = "Something went wrong. Please try submitting again.";
    console.error(error);
  }
});

// Search when the Search button is clicked.
search.addEventListener("click", function () {
  const searchTerm = searchIn.value.trim().toLowerCase();

  const matchingReports = reports.filter(function (report) {
    return (
      report.title.toLowerCase().includes(searchTerm) ||
      report.location.toLowerCase().includes(searchTerm) ||
      report.category.toLowerCase().includes(searchTerm)
    );
  });

  Reportsdisplayed(matchingReports);

  if (matchingReports.length === 0) {
    searchMessage.textContent = "No matching reports found.";
  } else {
    searchMessage.textContent =
      matchingReports.length + " matching report(s) found.";
  }
});

// Clear the search and show all reports when the search box is emptied.
searchIn.addEventListener("input",function(){
   if(searchIn.value.trim()===""){
    messageSEARCH.textContent="";
    Reportsdisplayed(reports)
   }
})
// Show a message when a category is selected.
cate1.addEventListener("change", function () {
  if (cate1.value !== "") {
    messages.textContent = "Selected category: " + cate1.value;
  }
});

// Initial page setup.
Reportsfetch()
