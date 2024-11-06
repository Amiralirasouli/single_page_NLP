document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const modelSelect = document.getElementById('model');
    const inputText = document.getElementById('input_text');
    const submitButton = document.getElementById('submit_button');
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    modelSelect.disabled = true;
    inputText.disabled = true;
    submitButton.disabled = true;

    categorySelect.addEventListener('change', function() {
        modelSelect.disabled = false;
        modelSelect.value = '';
        inputText.disabled = true;
        submitButton.disabled = true;

        Array.from(modelSelect.options).forEach(option => {
            option.style.display = option.getAttribute('data-category') === categorySelect.value ? '' : 'none';
        });
    });

    modelSelect.addEventListener('change', function() {
        inputText.disabled = false;
        submitButton.disabled = true;
    });

    inputText.addEventListener('input', function() {
        submitButton.disabled = inputText.value.trim() === '';
    });

    stars.forEach(star => {
        // پیش‌نمایش تعداد ستاره‌ها در حالت هاور
        star.addEventListener('mouseenter', function() {
            const hoverValue = this.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.toggle('hovered', s.getAttribute('data-value') <= hoverValue);
            });
        });

        // پاک کردن پیش‌نمایش هنگام خروج موس
        star.addEventListener('mouseleave', function() {
            stars.forEach(s => s.classList.remove('hovered'));
        });

        // ثبت تعداد ستاره‌های انتخاب شده هنگام کلیک
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
            alert(data.success ? 'Thank you for your rating!' : 'There was an error submitting your rating.');
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
