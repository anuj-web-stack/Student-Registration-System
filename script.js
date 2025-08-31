document.addEventListener("DOMContentLoaded", () => {
  // DOM references
  const form = document.getElementById("studentForm");
  const tableBody = document.querySelector("#studentTable tbody");
  const studentCountEl = document.getElementById("studentCount");
  const tableContainer = document.querySelector(".table-container");

  // Fetch students from localStorage 
  let students = JSON.parse(localStorage.getItem("students")) || [];

  
  function renderStudents() {
    tableBody.innerHTML = ""; // clear table

    // Loop through students and create rows
    students.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Update student count
    studentCountEl.textContent = `Total Registered Students: ${students.length}`;

    // Dynamically add/remove scrollbar
    if (tableBody.scrollHeight > 300) {
      tableContainer.style.overflowY = "scroll";
    } else {
      tableContainer.style.overflowY = "hidden";
    }
  }

  // Initial render
  renderStudents();

  // Save students to localStorage
  function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values from form
    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value.trim();

    // Validate Name: only alphabets and spaces
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(name)) {
      alert("Name should contain only alphabets (A-Z, a-z).");
      return;
    }

    //  Validate Contact: must be exactly 10 digits
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    // Create new student object
    const newStudent = { name, studentId, email, contact };

    // Add to list and save
    students.push(newStudent);
    saveStudents();
    renderStudents();

    // Highlight last added row
    const lastRow = tableBody.lastElementChild;
    lastRow.classList.add("highlight");

    // Reset form
    form.reset();
  });

  
    // Edit and Delete actions on student rows
   
  tableBody.addEventListener("click", function (e) {
    const row = e.target.closest("tr");
    const index = Array.from(tableBody.children).indexOf(row);

    // Delete student
    if (e.target.classList.contains("delete-btn")) {
      students.splice(index, 1); // remove from array
      saveStudents();
      renderStudents();
    } 
    // Edit student
    else if (e.target.classList.contains("edit-btn")) {
      const student = students[index];

      // Pre-fill form with existing data
      document.getElementById("name").value = student.name;
      document.getElementById("studentId").value = student.studentId;
      document.getElementById("email").value = student.email;
      document.getElementById("contact").value = student.contact;

      // Remove current entry before editing
      students.splice(index, 1);
      saveStudents();
      renderStudents();
    }
  });
});
