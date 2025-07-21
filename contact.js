document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Simple validation (already enforced by HTML5 but for JS demonstration)
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
        document.getElementById("response-message").textContent = "Thanks for reaching out! We will get back to you soon.";
        this.reset();
    } else {
        document.getElementById("response-message").textContent = "Please fill in all fields correctly.";
        document.getElementById("response-message").style.color = "red";
    }
});
