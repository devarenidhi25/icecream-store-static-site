document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("navMenu");
    const header = document.querySelector(".header");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    // Header transparency on scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function(event) {
        if (navMenu && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove("show");
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Store finder functionality
    const locationInput = document.getElementById("locationInput");
    const searchBtn = document.querySelector(".search-btn");
    
    if (searchBtn && locationInput) {
        searchBtn.addEventListener("click", function() {
            const location = locationInput.value.trim();
            if (location) {
                alert(`🔍 Searching for Magic Cones near "${location}"...\n\n✨ Found 3 magical locations nearby!\n\n🏪 Check out our store cards below for details!`);
            } else {
                alert("📍 Please enter a city or zip code to find nearby stores!");
            }
        });
        
        locationInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                searchBtn.click();
            }
        });
    }

    // Store direction buttons
    document.querySelectorAll(".store-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const storeCard = this.closest(".store-card");
            const storeName = storeCard.querySelector("h3").textContent;
            alert(`🗺️ Opening directions to ${storeName}...\n\n📱 This would normally open your maps app!`);
        });
    });

    // Franchise button
    const franchiseBtn = document.querySelector(".franchise-btn");
    if (franchiseBtn) {
        franchiseBtn.addEventListener("click", function() {
            alert("💼 Thank you for your interest in franchising!\n\n📧 Our franchise team will contact you soon.\n\n🦄 Let's spread the magic together!");
        });
    }

    // Order summary updates for drawing page
    const coneSelect = document.getElementById("coneType");
    const flavorSelect = document.getElementById("flavorType");
    const toppingsCheckboxes = document.querySelectorAll('.toppings-checkboxes input[type="checkbox"]');
    
    function updateOrderSummary() {
        const selectedCone = document.getElementById("selectedCone");
        const selectedFlavor = document.getElementById("selectedFlavor");
        const selectedToppings = document.getElementById("selectedToppings");
        const totalPrice = document.getElementById("totalPrice");
        
        if (selectedCone && coneSelect) {
            selectedCone.textContent = coneSelect.options[coneSelect.selectedIndex].text;
        }
        
        if (selectedFlavor && flavorSelect) {
            selectedFlavor.textContent = flavorSelect.options[flavorSelect.selectedIndex].text;
        }
        
        if (selectedToppings && toppingsCheckboxes) {
            const checkedToppings = Array.from(toppingsCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.parentElement.textContent.trim());
            
            selectedToppings.textContent = checkedToppings.length > 0 
                ? checkedToppings.join(", ") 
                : "None selected";
        }
        
        // Calculate price (basic pricing logic)
        if (totalPrice) {
            let basePrice = 4.99;
            const toppingCount = Array.from(toppingsCheckboxes).filter(cb => cb.checked).length;
            const toppingPrice = toppingCount * 0.75;
            const total = basePrice + toppingPrice;
            totalPrice.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    if (coneSelect) coneSelect.addEventListener("change", updateOrderSummary);
    if (flavorSelect) flavorSelect.addEventListener("change", updateOrderSummary);
    if (toppingsCheckboxes) {
        toppingsCheckboxes.forEach(cb => {
            cb.addEventListener("change", updateOrderSummary);
        });
    }

    // Order and share buttons
    const orderBtn = document.querySelector(".order-btn");
    const shareBtn = document.querySelector(".share-btn");
    
    if (orderBtn) {
        orderBtn.addEventListener("click", function() {
            const cone = document.getElementById("selectedCone")?.textContent || "Custom Cone";
            const flavor = document.getElementById("selectedFlavor")?.textContent || "Custom Flavor";
            const price = document.getElementById("totalPrice")?.textContent || "$4.99";
            
            alert(`🛒 Added to Cart!\n\n${cone}\n${flavor}\nTotal: ${price}\n\n✨ Your magical creation is ready to order!`);
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener("click", function() {
            alert("📱 Sharing your magical design!\n\n🎨 This would normally open sharing options to social media.\n\n✨ Show off your creativity to friends!");
        });
    }

    // Add some magical sparkle effects
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
    
    // Create sparkles occasionally
    setInterval(createSparkle, 3000);
    
    // Add sparkle effect to buttons on hover
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (Math.random() > 0.7) { // 30% chance
                createSparkle();
            }
        });
    });
});