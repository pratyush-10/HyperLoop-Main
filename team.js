document.addEventListener("DOMContentLoaded", function () {
    const teamMembers = document.querySelectorAll(".team-member");
  
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Function to add "show" class to elements in view
    function revealTeamMembers() {
      teamMembers.forEach((member) => {
        if (isElementInViewport(member)) {
          member.classList.add("show");
        }
      });
    }
  
    // Initial check
    revealTeamMembers();
  
    // Check again on scroll
    window.addEventListener("scroll", revealTeamMembers);
  });
  