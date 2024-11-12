document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const modelSelect = document.getElementById('model');
    const inputText = document.getElementById('input_text');
    const submitButton = document.getElementById('submit_button');
    const stars = document.querySelectorAll('.star');
    const ratingDisplay = document.getElementById('average_rating');
    let selectedRating = 0;

    modelSelect.disabled = true;
    inputText.disabled = true;
    submitButton.disabled = true;

    categorySelect.addEventListener('change', function() {
        modelSelect.disabled = false;
        modelSelect.value = '';
        inputText.disabled = true;
        submitButton.disabled = true;

        fetch(`/api/models/${categorySelect.value}/`)
            .then(response => response.json())
            .then(models => {
                modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.id;
                    option.textContent = model.name;
                    option.setAttribute('data-api-endpoint', model.api_endpoint);
                    modelSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading models:', error));
    });

    modelSelect.addEventListener('change', function() {
        inputText.disabled = false;
        submitButton.disabled = true;
        const modelId = modelSelect.value;

        fetch(`/api/model_rating/${modelId}/`)
            .then(response => response.json())
            .then(data => {
                ratingDisplay.textContent = `Average Rating: ${data.average_rating}`;
            })
            .catch(error => console.error('Error fetching average rating:', error));
    });

    inputText.addEventListener('input', function() {
        submitButton.disabled = inputText.value.trim() === '';
    });



    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const hoverValue = this.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.toggle('hovered', s.getAttribute('data-value') <= hoverValue);
            });
        });

        star.addEventListener('mouseleave', function() {
            stars.forEach(s => s.classList.remove('hovered'));
        });

        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-value');
            stars.forEach(s => s.classList.toggle('selected', s.getAttribute('data-value') <= selectedRating));
            sendRating(selectedRating);
        });
    });

    function sendRating(rating) {
        fetch('/rate_model/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ model_id: modelSelect.value, rating })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you for your rating!');
            } else {
                alert(data.message);
            }
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie) {
            document.cookie.split(';').forEach(cookie => {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.split('=')[1]);
                }
            });
        }
        return cookieValue;
    }
});


//بخش1
document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');

    // دریافت دسته‌بندی‌ها از API
    fetch('/api/categories/')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

    // باقی کدهای جاوااسکریپت برای عملکرد انتخاب دسته‌بندی و مدل و غیره
});
document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const modelSelect = document.getElementById('model');

    // وقتی دسته‌بندی تغییر می‌کند
    categorySelect.addEventListener('change', function() {
        const categoryId = this.value;

        // پاک کردن مدل‌های قبلی
        modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';

        if (categoryId) {
            // درخواست AJAX برای دریافت مدل‌ها
            fetch(`/api/models/${categoryId}/`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(model => {
                        const option = document.createElement('option');
                        option.value = model.id;
                        option.textContent = model.name;
                        modelSelect.appendChild(option);
                    });
                    // فعال کردن انتخاب مدل
                    modelSelect.disabled = false;
                })
                .catch(error => {
                    console.error('Error fetching models:', error);
                });
        } else {
            modelSelect.disabled = true;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const modelSelect = document.getElementById('model');
    const inputText = document.getElementById('input_text');
    const submitButton = document.getElementById('submit_button');
    const resultTextarea = document.getElementById('result_textarea');

    categorySelect.addEventListener('change', function() {
        const categoryId = this.value;

        fetch(`/api/models/${categoryId}/`)
            .then(response => response.json())
            .then(models => {
                modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.id;
                    option.textContent = model.name;
                    option.setAttribute('data-api-endpoint', model.api_endpoint);
                    modelSelect.appendChild(option);
                });
                modelSelect.disabled = false;
            })
            .catch(error => console.error('Error loading models:', error));
    });

    modelSelect.addEventListener('change', function() {
        const selectedModelOption = modelSelect.options[modelSelect.selectedIndex];
        const apiEndpoint = selectedModelOption.getAttribute('data-api-endpoint');

        console.log("API Endpoint from selected model:", apiEndpoint);

        if (apiEndpoint) {
            inputText.disabled = false;
            submitButton.disabled = false;

            // ذخیره apiEndpoint در data attribute برای استفاده هنگام کلیک روی دکمه
            submitButton.setAttribute('data-api-endpoint', apiEndpoint);
        } else {
            inputText.disabled = true;
            submitButton.disabled = true;
            console.error("API Endpoint not found for selected model.");
        }
    });

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const apiEndpoint = this.getAttribute('data-api-endpoint');  // گرفتن apiEndpoint از data attribute
        const text = inputText.value.trim();

        if (!apiEndpoint || !text) {
            console.error('API Endpoint or input text is missing.');
            return;
        }

        console.log('Sending POST request to API:', apiEndpoint);
        console.log('Text input:', text);

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ text: text })
        })
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            if (data.message) {
                resultTextarea.value = data.message;
            } else {
                console.error('Message field not found in API response.');
                resultTextarea.value = 'An error occurred while processing your request.';
            }
        })
        .catch(error => {
            console.error('Error during prediction:', error);
            resultTextarea.value = 'An error occurred while processing your request.';
        });
    });

    // تابع برای دریافت CSRF token از کوکی‌ها
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

