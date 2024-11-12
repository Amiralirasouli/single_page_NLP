# AI Model Evaluation Landing Page

**Note**: This is an initial version of the project. The final product version may differ in functionality and design.

This project is a **Django-based** landing page that allows users to evaluate a variety of AI models by sending requests directly to each model. Users can interact with the models available, test them, and assess their performance in real time. This tool is designed to make it easy to analyze the effectiveness and suitability of different AI models for various tasks.

## Features

- **Model Request Interface**: Enables users to send requests to each available AI model and evaluate their responses.
- **Real-Time Evaluation Results**: Immediate feedback on model performance, aiding in model comparison.
- **Simple User Interface**: A clean and intuitive landing page for a seamless user experience.

## Getting Started

### Prerequisites

- **Python 3.x**: Required to run Django.
- **Django**: The primary framework used in this project.
- **Other Dependencies**: Listed in `requirements.txt`.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Amiralirasouli/single_page_NLP.git
   cd university_products

   Install Dependencies

bash
Copy code
pip install -r requirements.txt
Run Database Migrations

bash
Copy code
python manage.py migrate
Running the Project
Start the Django Server

bash
Copy code
python manage.py runserver
Open the Landing Page In your browser, go to http://127.0.0.1:8000 to access the model evaluation page.

Usage
Choose a Model: Select from the list of available models displayed on the landing page.
Send an Evaluation Request: Use the interface to request evaluation from the chosen model.
View the Results: Results will be displayed instantly, allowing for easy performance analysis.
Contributing
Contributions are welcome! Feel free to fork the project and submit a pull request. Suggested improvements include adding more models, refining the interface, or optimizing performance.

License
This project is licensed under the MIT License.
