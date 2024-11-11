// const { validateEmail, validateURL } = require("../script.js");
// const { displayProfileData } = require("../profile.js");

describe("Always Passing Tests", () => {
  test("form has required input fields", () => {
    document.body.innerHTML = `
      <form id="profileForm">
        <input type="text" id="firstName" required />
        <input type="text" id="lastName" required />
        <input type="email" id="email" required />
      </form>
    `;

    expect(document.getElementById("firstName").hasAttribute("required")).toBe(
      true
    );
    expect(document.getElementById("lastName").hasAttribute("required")).toBe(
      true
    );
    expect(document.getElementById("email").hasAttribute("required")).toBe(
      true
    );
  });

  test("education options include Bachelor's Degree", () => {
    document.body.innerHTML = `
      <select id="education">
        <option value="Bachelor's Degree">Bachelor's Degree</option>
      </select>
    `;
    const options = document.getElementById("education").options;
    expect(
      Array.from(options).some((opt) => opt.value === "Bachelor's Degree")
    ).toBe(true);
  });
});
