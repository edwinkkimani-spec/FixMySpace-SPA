
//Getting elements by id
const reportForm = document.getElementById("report-form");
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");

const reportList = document.getElementById("report-list");
const message = document.getElementById("message");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchMessage = document.getElementById("search-message");

//Storing the reports while page still open
let reports = [];

//Creating a function that will display reports
function displayReports(reportsToDisplay) {
  reportList.innerHTML = "";

  if (reportsToDisplay.length === 0) {
    reportList.innerHTML = "<p>No reports found</p>";
    return;
  }

  reportsToDisplay.forEach(function (report) {
    const article = document.createElement("article");

    const heading = document.createElement("h3");
    heading.textContent = report.title;

    const location = document.createElement("p");
    location.textContent = "Location: " + report.location;

    const category = document.createElement("p");
    category.textContent = "Category: " + report.category;

    const description = document.createElement("p");
    description.textContent = "description: " + report.description;

    const statusLabel = document.createElement("label");
    statusLabel.textContent = "Status: ";

    const statusSelect = document.createElement("select");

    const statuses = ["Unresolved", "In Progress", "Resolved"];

    statuses.forEach(function (statusOption) {
      const option = document.createElement("option");
      option.value = statusOption;
      option.textContent = statusOption;

      if (statusOption === report.status) {
        option.selected = true;
      }

      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener("change", function () {
      report.status = statusSelect.value;
      UpdateDashboard();
    });

    statusLabel.appendChild(statusSelect);

    article.append(heading, location, category, description, statusLabel);
    reportList.appendChild(article);
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

const API_URL = "";

async function fetchReports() {
  try {
    const response = await fetch();

    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }

    const data = await response.json();

    reports = data.slice(0, 10).map(function (post) {
      return {
        title: post.title,
        location: "Sample campus location",
        category: "Other",
        description: post.body,
        status: "Unresolved",
      };
    });

    displayReports(reports);
    UpdateDashboard();
  } catch (error) {
    console.error("Error fetching reports:", error);
    message.textContent = "Unable to load reports. Please try again later.";
  }
}

//Submit another campus reprot
reportForm.addEventListener("submit", function (event) {
  event.preventDefault();

  try {
    const newReport = {
      title: titleInput.value.trim(),
      location: locationInput.value.trim(),
      category: categoryInput.value.trim(),
      description: descriptionInput.value.trim(),
      status: "Unresolved",
    };

    if (
      !newReport.title ||
      !newReport.location ||
      !newReport.category ||
      !newReport.description
    ) {
      message.textContent = "Please complete all fields";
      return;
    }
    reports.push(newReport);

    displayReports(reports);
    UpdateDashboard();

    message.textContent = "Your report was submitted successfully";
    reportForm.reset();
  } catch (error) {
    message.textContent = "Something went wrong. Please try submitting again.";
    console.error(error);
  }
});

// Search when the Search button is clicked.
searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const matchingReports = reports.filter(function (report) {
    return (
      report.title.toLowerCase().includes(searchTerm) ||
      report.location.toLowerCase().includes(searchTerm) ||
      report.category.toLowerCase().includes(searchTerm)
    );
  });

  displayReports(matchingReports);

  if (matchingReports.length === 0) {
    searchMessage.textContent = "No matching reports found.";
  } else {
    searchMessage.textContent =
      matchingReports.length + " matching report(s) found.";
  }
});

// Clear the search and show all reports when the search box is emptied.
searchInput.addEventListener("input", function () {
  if (searchInput.value.trim() === "") {
    searchMessage.textContent = "";
    displayReports(reports);
  }
});

// Show a message when a category is selected.
categoryInput.addEventListener("change", function () {
  if (categoryInput.value !== "") {
    message.textContent = "Selected category: " + categoryInput.value;
  }
});

// Initial page setup.
displayReports(reports);
UpdateDashboard();
