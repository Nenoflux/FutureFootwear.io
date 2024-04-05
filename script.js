document.addEventListener('DOMContentLoaded', function() {
    const landingSection = document.querySelector('.landing');
    const catalogSection = document.querySelector('.catalog');
    const cartSection = document.querySelector('.cart');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const spec = document.querySelector('.spec');

    const viewCartButton = document.querySelector('.view-cart');
    const checkoutButton = document.querySelector('.checkout');
    const checkoutForm = document.querySelector('.checkout-form');
    const deliveryForm = document.getElementById('delivery-form');
    const feedback = document.getElementById('feedback');

    const paymentMethods = document.querySelectorAll('.payment-methods .method input[type="radio"]');
    const creditCardFields = document.querySelector('.credit-card-fields');
    const paypalFields = document.querySelector('.paypal-fields');

    const orderConfirmation = document.querySelector('.order-confirmation');
    const orderTrackingLink = document.querySelector('.order-tracking a');
    const orderTrackingSection = document.querySelector('.order-tracking');

    //hide order confirmation and tracking sections
    orderConfirmation.classList.add('hidden');
    orderTrackingLink.classList.add('hidden');

    // Function to show order confirmation
    function showOrderConfirmation() {
        orderConfirmation.classList.remove('hidden');
    }

    // Function to handle form submission
    function submitDeliveryForm(event) {
        event.preventDefault();
        // Form submission code...

        // Simulating order placement with a delay
        setTimeout(() => {
            showOrderConfirmation();
            // Optionally, reset form fields here
        }, 2000); // 2 seconds delay to simulate processing
    }

    // Event listener for order tracking link
    orderTrackingLink.addEventListener('click', function(event) {
        event.preventDefault();
        const orderTrackingSection = document.querySelector('.order-tracking');
        orderTrackingSection.classList.remove('hidden');
        window.location.href = '#order-tracking';
    });



        // Array containing product data
        const productData = [
            { name: 'Shoe 1', price: 50.00, image: 'Assets/shoe1.jpg' },
            { name: 'Shoe 2', price: 60.00, image: 'Assets/shoe2.jpg' },
            { name: 'Shoe 3', price: 160.00, image: 'Assets/shoe3.jpg' },
            { name: 'Shoe 4', price: 180.00, image: 'Assets/shoe4.jpg' },
            { name: 'Shoe 5', price: 280.00, image: 'Assets/shoe5.jpg' },
            // Add more shoe data as needed
        ];

    let slideIndex = 0;
    let cartItems = [];

    // Move landing section up after a delay
    setTimeout(() => {
        landingSection.style.height = '50px'; // Small banner height
    }, 3000);


    // Show cart section when View Cart button is clicked
    //const viewCartButton = document.querySelector('.view-cart');
    viewCartButton.addEventListener('click', function() {

        catalogSection.style.display = 'none';
        cartSection.classList.add('show');
        // Show checkout form
        checkoutForm.style.display = 'block';
        // Hide view cart button
        viewCartButton.style.display = 'none';
        // Show checkout button
        checkoutButton.style.display = 'inline-block';
    });

    
    deliveryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(deliveryForm);
        const deliveryDetails = Object.fromEntries(formData.entries());

        // Validate form fields
        if (!deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
            displayMessage('Please fill in all fields.', false);
            return;
        }
        // Validate phone number format
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(deliveryDetails.phone)) {
            displayMessage('Please enter a valid phone number.', false);
            return;
        }
        
        //remove delivery form from display
        deliveryForm.style.display ='none';

        displayMessage('Delivery details submitted successfully.', true);
        console.log('Delivery information submitted. Proceeding to payment...');
    });

       // Function to clear the cart
       function clearCart() {
        cartItems = [];
        localStorage.removeItem('cartItems');
        renderCart();
    }

     // Event listener for clear cart button
     const clearCartBtn = document.querySelector('.clear-cart');
     clearCartBtn.addEventListener('click', clearCart);
 

       // Function to move slider to the specified slide index
       function moveToSlide(index) {
        if (index < 0 || index >= productData.length) return;

        // Hide all slides
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Show the slide at the specified index
        slides[index].style.display = 'block';

        // Update spec area with details of the current shoe
        updateSpec(productData[index]);
    }

    // Function to update spec area with details of the current shoe
    function updateSpec(shoe) {
        spec.innerHTML = `
            <h3>${shoe.name}</h3>
            <p>Price: $${shoe.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
    }

    // Event listener for add to cart button
    spec.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            addToCart(productData[slideIndex]);
            cartSection.classList.add('show');
        }
    });

    

        // Function to add item to cart
        function addToCart(shoe) {
            cartItems.push(shoe);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }
    
        // Function to render cart items
        function renderCart() {
            cartItemsList.innerHTML = '';
            let total = 0;
    
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItemsList.appendChild(li);
                total += item.price;
            });
    
            cartTotal.textContent = total.toFixed(2);
        }

    // Event listeners for prev and next buttons
    prevBtn.addEventListener('click', function() {
        moveToSlide(slideIndex - 1);
        slideIndex--;
    });

    nextBtn.addEventListener('click', function() {
        moveToSlide(slideIndex + 1);
        slideIndex++;
    });

    // Function to handle form submission
    function submitDeliveryForm(event) {
        event.preventDefault();
        const formData = new FormData(deliveryForm);
        const deliveryDetails = Object.fromEntries(formData.entries());

        // Here you can perform further actions with the delivery details, such as validation, sending data to server, etc.

        console.log('Delivery Details:', deliveryDetails);
    }

     // Function to display feedback messages
     function displayMessage(message, success = true) {
        feedback.textContent = message;
        feedback.classList.remove('error', 'success');
        feedback.classList.add(success ? 'success' : 'error');
        //clear text content after few seconds
        setTimeout(() => {
            feedback.textContent = '';
        },3500);
    }

    // Function to handle form submission
    function submitDeliveryForm(event) {
        event.preventDefault();
        const formData = new FormData(deliveryForm);
        const deliveryDetails = Object.fromEntries(formData.entries());

        // Validate form fields
        if (!deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
            displayMessage('Please fill in all fields.', false);
            return;
        }

        // Here you can send the delivery details to a server for processing
        // For demonstration purposes, we'll just log the details
        console.log('Delivery Details:', deliveryDetails);
        displayMessage('Delivery details submitted successfully.', true);
    }

    // Function to handle payment method selection
    function selectPaymentMethod(event) {
        const selectedMethod = event.target.value;
        console.log('Selected Payment Method:', selectedMethod);
    }

    // Event listener for payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', selectPaymentMethod);
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', function() {
        // Here you can implement further actions for checkout process, such as validating delivery details, processing payment, etc.
        displayMessage('Processing payment...', true);
        checkoutForm.style.display = 'none';
        setTimeout(() => {
            displayMessage('Payment successful. Thank you!', true);
            clearCart(); // Clear cart after payment is successful
             // Hide checkout form after payment is successful
            viewCartButton.style.display = 'inline-block'; // Show view cart button after payment is successful
            showOrderConfirmation();
            setTimeout(()=>{ orderTrackingSection.classList.remove('hidden'); // Show order tracking link after payment is successful
                },2900);
        }, 2000); // Simulate payment processing delay
    });

    // Initialize slider
    moveToSlide(slideIndex);

    // Load cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        renderCart();
    }

    //Payment methods code

    // Function to show payment fields based on selected method
    function showPaymentFields(method) {
        switch (method) {
            case 'credit-card':
                creditCardFields.classList.remove('hidden');
                paypalFields.classList.add('hidden');
                break;
            case 'paypal':
                paypalFields.classList.remove('hidden');
                creditCardFields.classList.add('hidden');
                break;
            // Add cases for other payment methods if needed
            default:
                creditCardFields.classList.add('hidden');
                paypalFields.classList.add('hidden');
                break;
        }
    }

    // Function to handle form submission
    function submitDeliveryForm(event) {
        // Form submission code...
    }

    // Function to handle payment method selection
    function selectPaymentMethod(event) {
        const selectedMethod = event.target.value;
        showPaymentFields(selectedMethod);
    }

    // Event listener for payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', selectPaymentMethod);
    });
    showPaymentFields();
});
