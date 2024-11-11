document
  .getElementById("profileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const middleName = document.getElementById("middleName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const linkedin = document.getElementById("linkedin").value;
    const codeforces = document.getElementById("codeforces").value;
    const profileImage = document.getElementById("profileImage").files[0];
    const education = document.getElementById("education").value;
    const branch = document.getElementById("branch").value;
    const skill = document.getElementById("skills").value;
    const storageType = document.getElementById("storageType").value;
    console.log("bruh");
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !phone ||
      !dob ||
      !linkedin ||
      !codeforces ||
      !profileImage ||
      !education ||
      !branch ||
      !skill
    ) {
      alert("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return;
    }

    if (!validateURL(linkedin) || !validateURL(codeforces)) {
      alert("Invalid URL format.");
      return;
    }

    const profileData = {
      firstName,
      middleName,
      lastName,
      email,
      address,
      phone,
      dob,
      linkedin,
      codeforces,
      education,
      branch,
      skill,
      storageType,
    };

    // Store data based on selected storage type
    switch (storageType) {
      case "localStorage":
        localStorage.setItem("profileData", JSON.stringify(profileData));
        storeProfileImage(profileImage, "localStorage");
        break;
      case "sessionStorage":
        sessionStorage.setItem("profileData", JSON.stringify(profileData));
        storeProfileImage(profileImage, "sessionStorage");
        break;
      case "cookies":
        document.cookie = `profileData=${JSON.stringify(
          profileData
        )}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
        storeProfileImage(profileImage, "cookies");
        break;
      case "indexedDB":
        storeInIndexedDB(profileData, profileImage);
        break;
    }

    window.location.href = "profile.html";
  });

function storeProfileImage(profileImage, storageType) {
  const reader = new FileReader();
  reader.onload = function (e) {
    switch (storageType) {
      case "localStorage":
        localStorage.setItem("profileImage", e.target.result);
        break;
      case "sessionStorage":
        sessionStorage.setItem("profileImage", e.target.result);
        break;
      case "cookies":
        document.cookie = `profileImage=${e.target.result}; expires=${new Date(
          Date.now() + 86400000
        ).toUTCString()}; path=/`;
        break;
    }
  };
  reader.readAsDataURL(profileImage);
}

function storeInIndexedDB(profileData, profileImage) {
  const dbName = "ProfileDB";
  const request = indexedDB.open(dbName, 1);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["profiles"], "readwrite");
    const objectStore = transaction.objectStore("profiles");

    const reader = new FileReader();
    reader.onload = function (e) {
      profileData.profileImage = e.target.result;
      const request = objectStore.put(profileData);

      request.onerror = function (event) {
        console.error("Error storing data in IndexedDB:", event.target.error);
      };

      request.onsuccess = function (event) {
        console.log("Data stored successfully in IndexedDB");
      };
    };
    reader.readAsDataURL(profileImage);
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("profiles", { keyPath: "email" });
  };
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateURL(url) {
  const re = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  return re.test(String(url).toLowerCase());
}

function myFunction() {
  if (document.getElementById("myDropdown").style.display == "grid") {
    document.getElementById("myDropdown").style.display = "none";
  } else {
    document.getElementById("myDropdown").style.display = "grid";
  }
}
function myFunction2() {
  // document.getElementById("myDropdown").classList.toggle("show");
  if (document.getElementById("contactDrop").style.display == "grid") {
    document.getElementById("contactDrop").style.display = "none";
  } else {
    document.getElementById("contactDrop").style.display = "grid";
  }
  // document.getElementById("myDropdown").classList.toggle("personal");
}
function myFunction3() {
  // document.getElementById("myDropdown").classList.toggle("show");
  if (document.getElementById("socialDrop").style.display == "grid") {
    document.getElementById("socialDrop").style.display = "none";
  } else {
    document.getElementById("socialDrop").style.display = "grid";
  }
  // document.getElementById("myDropdown").classList.toggle("personal");
}
function myFunction4() {
  // document.getElementById("myDropdown").classList.toggle("show");
  if (document.getElementById("eduDrop").style.display == "grid") {
    document.getElementById("eduDrop").style.display = "none";
  } else {
    document.getElementById("eduDrop").style.display = "grid";
  }
  // document.getElementById("myDropdown").classList.toggle("personal");
}
function myFunction5() {
  // document.getElementById("myDropdown").classList.toggle("show");
  if (document.getElementById("skillDrop").style.display == "grid") {
    document.getElementById("skillDrop").style.display = "none";
  } else {
    document.getElementById("skillDrop").style.display = "grid";
  }
  // document.getElementById("myDropdown").classList.toggle("personal");
}
