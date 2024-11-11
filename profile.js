window.addEventListener("DOMContentLoaded", (event) => {
  let profileData;
  let profileImage;

  // Retrieve storage type from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const storageType = urlParams.get("storageType") || "localStorage";

  switch (storageType) {
    case "localStorage":
      profileData = JSON.parse(localStorage.getItem("profileData"));
      profileImage = localStorage.getItem("profileImage");
      break;
    case "sessionStorage":
      profileData = JSON.parse(sessionStorage.getItem("profileData"));
      profileImage = sessionStorage.getItem("profileImage");
      break;
    case "cookies":
      profileData = JSON.parse(getCookie("profileData"));
      profileImage = getCookie("profileImage");
      break;
    case "indexedDB":
      retrieveFromIndexedDB();
      return; // Exit early as IndexedDB is asynchronous
  }

  displayProfileData(profileData, profileImage);
});

function displayProfileData(profileData, profileImage) {
  if (profileData) {
    document.getElementById(
      "displayName"
    ).innerText = `Name: ${profileData.firstName} ${profileData.middleName} ${profileData.lastName}`;
    document.getElementById(
      "displayEmail"
    ).innerText = `Email: ${profileData.email}`;
    document.getElementById(
      "displayAddress"
    ).innerText = `Address: ${profileData.address}`;
    document.getElementById(
      "displayPhone"
    ).innerText = `Phone: ${profileData.phone}`;
    document.getElementById(
      "displayDob"
    ).innerText = `Date of Birth: ${profileData.dob}`;
    document.getElementById(
      "displayEducation"
    ).innerText = `Education: ${profileData.education}`;
    document.getElementById(
      "displayBranch"
    ).innerText = `Branch: ${profileData.branch}`;
    document.getElementById(
      "displaySkill"
    ).innerText = `Skill: ${profileData.skill}`;

    if (profileData.linkedin) {
      document.getElementById("displayLinkedin").href = profileData.linkedin;
      document.getElementById("linkedinImage").src = "./linklogo.png";
    }

    if (profileData.codeforces) {
      document.getElementById("displayCodeforces").href =
        profileData.codeforces;
      document.getElementById("codeforcesImage").src = "./cf logo.jpg";
    }

    if (profileImage) {
      document.getElementById("displayImage").src = profileImage;
    }
  } else {
    alert("No profile data found.");
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function retrieveFromIndexedDB() {
  const dbName = "ProfileDB";
  const request = indexedDB.open(dbName, 1);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.error);
    alert("Error retrieving data from IndexedDB");
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["profiles"], "readonly");
    const objectStore = transaction.objectStore("profiles");
    const getRequest = objectStore.getAll();

    getRequest.onerror = function (event) {
      console.error(
        "Error retrieving data from IndexedDB:",
        event.target.error
      );
      alert("Error retrieving data from IndexedDB");
    };

    getRequest.onsuccess = function (event) {
      const profileData = event.target.result[0]; // Assuming we're storing only one profile
      if (profileData) {
        const profileImage = profileData.profileImage;
        delete profileData.profileImage; // Remove image from profileData object
        displayProfileData(profileData, profileImage);
      } else {
        alert("No profile data found in IndexedDB");
      }
    };
  };
}
