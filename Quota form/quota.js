 // Get references to the range input and output element
  const educationRange = document.getElementById('education-range');
  const educationOutput = document.getElementById('education-level');
  const nameOutput = document.getElementById('name');
  
  // Array to map education level to the corresponding text
  const educationMap = [
    { label: "None", position: 0 },
    { label: "High School", position: 1 },
    { label: "Bachelor's Degree", position: 2 },
    { label: "Master's/Doctoral Degree", position: 3 }
  ];
  
  // Update output when the range input value changes
  educationRange.addEventListener('input', function() {
    const level = parseInt(educationRange.value);
    educationOutput.textContent = "Education Level: " + educationMap[level].label;
  });
  
  // Function to update name when dragged
  educationRange.addEventListener('mousemove', function(event) {
    const rect = educationRange.getBoundingClientRect(); // Get the position and dimensions of the range input
    const x = event.clientX - rect.left; // Calculate x position relative to the input
    const y = event.clientY - rect.top; // Calculate y position relative to the input
    nameOutput.style.position = "absolute";
    nameOutput.style.left = rect.left + x + 'px'; // Set nameOutput's position based on the mouse position relative to the input
    nameOutput.style.top = rect.top + y + 'px';
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the button and form container
    const showFormButton = document.getElementById("showFormButton");
    const formContainer = document.querySelector(".container");

    // Event listener for button click
    showFormButton.addEventListener("click", function() {
        // Toggle the visibility of the form container
        formContainer.classList.toggle("show");
    });
});

