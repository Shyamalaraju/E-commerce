document.addEventListener("DOMContentLoaded", function () {
    let cartBadge = document.querySelector("#cart-count");
    let addToCartButtons = document.querySelectorAll(".addtocart");

    // ✅ Reset count on full page reload
    if (!sessionStorage.getItem("cartInitialized")) {
        sessionStorage.setItem("cartCount", "0"); 
        sessionStorage.setItem("cartInitialized", "true"); 
    }

    function updateCartCount() {
        let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;

        // ✅ Ensure count updates properly
        cartBadge.textContent = cartCount;
        cartBadge.style.display = "inline-block"; // Always show badge

        console.log("🛒 Updated Cart Count:", cartCount); // Debug log
    }

    // ✅ Show 0 when page loads
    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;
            cartCount++; // Increase count
            sessionStorage.setItem("cartCount", cartCount); // ✅ Store in sessionStorage

            updateCartCount(); // Update UI

            // Change button UI
            this.textContent = "Added!";
            this.disabled = true;
            this.style.backgroundColor = "#28a745";
        });
    });

    // ✅ Sync count across tabs/pages
    window.addEventListener("storage", function () {
        updateCartCount();
    });
});


//back-button
document.addEventListener("DOMContentLoaded", function () {
    let backToTop = document.getElementById("backToTop");

    // Scroll pannina button show pannanum
    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) { // If user scrolls down 500px
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Click panna smooth-a top-ku poganum
    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
// login-signup
document.addEventListener("DOMContentLoaded", function () {
    function validateInput(input, message) {
        if (input.value.trim() === "") {
            showError(input, message);
            return false;
        } else {
            removeError(input);
            return true;
        }
    }

    function validateEmail(emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email address");
            return false;
        } else {
            removeError(emailInput);
            return true;
        }
    }

    function validatePassword(passwordInput) {
        if (passwordInput.value.length < 6) {
            showError(passwordInput, "Password must be at least 6 characters");
            return false;
        } else {
            removeError(passwordInput);
            return true;
        }
    }

    function showError(input, message) {
        input.classList.add("is-invalid");
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.innerText = message;
    }

    function removeError(input) {
        input.classList.remove("is-invalid");
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
            input.nextElementSibling.remove();
        }
    }

    function closeModal(modalId) {
        let modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (!modal) {
            modal = new bootstrap.Modal(document.getElementById(modalId));
        }
        modal.hide();
    }

    // ✅ Login Form Validation
    document.querySelector("#loginModal form").addEventListener("submit", function (e) {
        e.preventDefault();
        let emailValid = validateEmail(document.getElementById("loginEmail"));
        let passwordValid = validatePassword(document.getElementById("loginPassword"));

        if (emailValid && passwordValid) {
            closeModal("loginModal");
            setTimeout(() => {
                alert("Login Successful! 🎉");
            }, 500);
        }
    });

    // ✅ Signup Form Validation
    document.querySelector("#signupModal form").addEventListener("submit", function (e) {
        e.preventDefault();
        let nameValid = validateInput(document.getElementById("signupName"), "Enter your name");
        let emailValid = validateEmail(document.getElementById("signupEmail"));
        let passwordValid = validatePassword(document.getElementById("signupPassword"));

        if (nameValid && emailValid && passwordValid) {
            closeModal("signupModal");
            setTimeout(() => {
                alert("Signup Successful! 🎉");
            }, 500);
        }
    });
});

/*validation*/
document.addEventListener("DOMContentLoaded", function () {
    function validateInput(input, message) {
        if (input.value.trim() === "") {
            showError(input, message);
            return false;
        } else {
            removeError(input);
            return true;
        }
    }

    function validateUPI() {
        return validateInput(document.getElementById("upiId"), "Enter a valid UPI ID");
    }

    function validateCard() {
        let valid = true;
        valid &= validateInput(document.getElementById("cardNumber"), "Enter a valid card number");
        valid &= validateInput(document.getElementById("cardName"), "Enter cardholder name");
        valid &= validateInput(document.getElementById("expiryDate"), "Enter expiry date");
        valid &= validateInput(document.getElementById("cvv"), "Enter valid CVV");
        return Boolean(valid);
    }

    function validateCOD() {
        let valid = true;
        valid &= validateInput(document.getElementById("billingAddress"), "Enter billing address");
        valid &= validateInput(document.getElementById("contactNumber"), "Enter a valid contact number");
        return Boolean(valid);
    }

    function showError(input, message) {
        input.classList.add("is-invalid");
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.innerText = message;
    }

    function removeError(input) {
        input.classList.remove("is-invalid");
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
            input.nextElementSibling.remove();
        }
    }

    document.querySelectorAll(".payNowButton").forEach(button => {
        button.addEventListener("click", function (e) {
            let paymentSection = this.closest(".collapse, .modal");
            let isValid = false;

            if (paymentSection && paymentSection.id === "upiPayment") {
                isValid = validateUPI();
            }
            if (paymentSection && paymentSection.id === "cardPayment") {
                isValid = validateCard();
            }
            if (paymentSection && paymentSection.id === "codModal") {
                isValid = validateCOD();
            }

            if (isValid) {
                console.log("✅ Validation Passed");

                // ✅ Modal close
                let modal = bootstrap.Modal.getInstance(paymentSection);
                if (!modal) {
                    modal = new bootstrap.Modal(paymentSection);
                }
                modal.hide();

                console.log("✅ Modal Closed");

                // ✅ Alert message after closing modal
                setTimeout(() => {
                    alert("Thanks for ordering!");
                    console.log("✅ Alert Displayed");
                }, 500);
            } else {
                console.log("❌ Validation Failed - Showing Errors");
                e.preventDefault();
            }
        });
    });
});

// contact
document.addEventListener("DOMContentLoaded", function () {
    function validateInput(input, message) {
        if (input.value.trim() === "") {
            showError(input, message);
            return false;
        } else {
            removeError(input);
            return true;
        }
    }

    function validateEmail(emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email address");
            return false;
        } else {
            removeError(emailInput);
            return true;
        }
    }

    function showError(input, message) {
        input.classList.add("is-invalid");
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.innerText = message;
    }

    function removeError(input) {
        input.classList.remove("is-invalid");
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
            input.nextElementSibling.remove();
        }
    }

    // 🔥 FIX 1: Remove error message when user starts typing
    document.querySelectorAll("#contact input, #contact textarea").forEach((input) => {
        input.addEventListener("input", function () {
            removeError(input);
        });
    });

    document.querySelector("#contact button").addEventListener("click", function (e) {
        e.preventDefault(); 

        let nameInput = document.getElementById("contactName");
        let emailInput = document.getElementById("contactEmail");
        let subjectInput = document.getElementById("contactSubject");
        let messageInput = document.getElementById("contactMessage");

        let nameValid = validateInput(nameInput, "Enter your full name");
        let emailValid = validateEmail(emailInput);
        let subjectValid = validateInput(subjectInput, "Enter a subject");
        let messageValid = validateInput(messageInput, "Enter your message");

        if (nameValid && emailValid && subjectValid && messageValid) {
            // 
            alert("✅ Thanks for contacting us! We will get back to you soon.");
        }
    });
});




