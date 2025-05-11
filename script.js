document.addEventListener("DOMContentLoaded", () => {
    // ========== Event Handling ==========
    const buttonClicked = document.getElementById("button-clicked");
    const clickedOutput = document.getElementById("clicked-output");
    const keyPressed = document.getElementById("keypress__display");
    const secretBox = document.querySelector(".secret__box");
    const secretMessage = document.querySelector(".secret__message");

    buttonClicked.addEventListener("click", function() {
        clickedOutput.textContent = "Button was clicked!";
        clickedOutput.style.color = "green";

        setTimeout(() => {
            clickedOutput.textContent = "Button not clicked yet!";
            clickedOutput.style.color = "";
        }, 2000);
    });

    document.addEventListener("keypress", (e) => {
        keyPressed.textContent = `Key pressed: ${e.key} (code: ${e.code})`;
        keyPressed.style.color = "green";

        setTimeout(() => {
            keyPressed.textContent = "Waiting for Keypress...";
            keyPressed.style.color = "";
        }, 2000);
    });

    let pressTimer;
    const longPressDuration = 1000;

    secretBox.addEventListener("mousedown", () => {
        pressTimer = setTimeout(() => {
            showSecret()
        }, longPressDuration);
    });

    secretBox.addEventListener("mouseup", () => {
        clearTimeout(pressTimer);
    });

    secretBox.addEventListener("mouseleave", () => {
        clearTimeout(pressTimer);
    });

    secretBox.addEventListener("dblclick", showSecret);

    function showSecret() {
        secretMessage.style.display = "block";

        setTimeout(() => {
            secretMessage.style.display = "none";
        }, 3000)
    }

    // ========== Interactive Elements ==========
    const buttonChangeColor = document.getElementById("button__color__change");
    const colorOutput = document.getElementById("color__output");
    const galleryImages = document.querySelector(".gallery__images");
    const imageElements = document.querySelectorAll(".gallery__images img");
    const prevButton = document.querySelector(".gallery__prev");
    const nextButton = document.querySelector(".gallery__next");
    const tabButton = document.querySelectorAll(".tab__button");
    const tabContent = document.querySelectorAll(".tab__content");
    
    // Button to change color
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    let currentColorIndex = 0

    buttonChangeColor.addEventListener("click", () => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        buttonChangeColor.style.backgroundColor = colors[currentColorIndex];
        colorOutput.textContent = `Color changed to (${currentColorIndex +1}/${colors.length})`

        setTimeout(() => {
            colorOutput.textContent = "color not changed yet"
            buttonChangeColor.style.backgroundColor = "";
        }, 2000);
    });

    // Image gallery
    let currentImageIndex = 0;

    function showImage(index) {
        imageElements.forEach(img => img.classList.remove("active"));
        imageElements[index].classList.add("active");
        currentImageIndex = index;
    }

    prevButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex -1 + imageElements.length) % imageElements.length;
        showImage(currentImageIndex);
    });

    nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % imageElements.length;
        showImage(currentImageIndex);
    });

    // Auto-play Gallery
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % imageElements.length;
        showImage(currentImageIndex);
    }, 4000);

    // Tabbed content
    tabButton.forEach((button) => {
        button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");

            tabButton.forEach(btn => btn.classList.remove("active"));
            tabContent.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        })
    });

    // ========== Form Validation ==========
    const formValidation = document.getElementById("validate__form")
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nameError = document.getElementById("name__error");
    const emailError = document.getElementById("email__error");
    const passwordError = document.getElementById("password__error");
    const strengthBar = document.querySelector(".strength__bar");
    const strengthText = document.querySelector(".strength__text");

    // RealTime Validation
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword)

    function validateName() {
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Name is required";
            return false;
        } else {
            nameError.textContent = "";
            return true;
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Email is required";
            return false;
        }

        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Invalid email format";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;

        if (password === "") {
            passwordError.textContent = ""
            updatePasswordStrength(0);
            return false;
        }

        if (password.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters"
            passwordError.style.color = "red";
            updatePasswordStrength(0);
            return false;
        } else {
            passwordError.textContent = "";

            // Calculate Password Strength
            let strength = 0;
        
            // Length contributes to strength
            strength += Math.min(3, Math.floor(password.length / 4));

            // Contain Numbers 
            if (/\d/.test(password)) strength += 1;

            // Contain special characters
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

            // Contains uppercase letters
            if (/[A-Z]/.test(password)) strength += 1;
            
            // Contains lowercase letters
            if (/[a-z]/.test(password)) strength += 1;

            // Normalize strength to a scale of 0-100
            strength = Math.min(strength, 5);
            const strengthPercentage = (strength / 5) * 100;
            updatePasswordStrength(strengthPercentage);
            return true;
        }
    }

    function updatePasswordStrength(percentage) {
        // const bar = document.querySelector("::after") || strengthBar;

        // Update the pseudo-element's width through a CSS variable
        strengthBar.style.setProperty("--strength", `${percentage}%`);

        // Update color based on strength
        let color, text;
        if (percentage < 30) {
            color = '#e74c3c';
            text = 'Weak';
        } else if (percentage < 70) {
            color = '#f39c12';
            text = 'Moderate';
        } else {
            color = '#2ecc71';
            text = 'Strong';
        }

        strengthBar.style.setProperty("--strength-color", color)
        strengthText.textContent = passwordInput.value ? `Password Strength: ${text}` : `Password Strength`;
    }

    // Add CSS for the strength bar
    const style = document.createElement("style");
    style.textContent = `
        .strength__bar::after {
            width: var(--strength, 0%);
            background-color: var(--strength-color, #e74c3c);
        }
    `;
    document.head.appendChild(style);

    // Form Submission
    formValidation.addEventListener("submit", (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isPasswordValid) {
            alert("Form Submitted Successfully!");
            formValidation.reset();
            updatePasswordStrength(0);
        } else {
            alert("Please fix the errors in the form before submitting.");
        }
    });
});