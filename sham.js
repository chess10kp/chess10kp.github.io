function dropdown() {
    document.getElementById("dropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropdown-btn')) {
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  } 