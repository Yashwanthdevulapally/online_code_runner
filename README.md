Online Code Execution Platform
Project Overview
The Online Code Execution Platform is a web-based application that allows users to write and execute code directly in the browser.
Users can:
* Write code in an integrated code editor
* Select a programming language
* Execute the code
* View the output instantly
This project demonstrates full-stack web development by integrating a frontend interface with a backend execution engine.
Currently the platform supports Python and JavaScript execution.

System Architecture
The application follows a client-server architecture.

User Browser
      ↓
React Frontend (Code Editor UI)
      ↓
HTTP API Request
      ↓
FastAPI Backend Server
      ↓
Code Execution Engine
      ↓
Python / Node Runtime
      ↓
Output returned to frontend


Technology Stack
Frontend
* React.js
* Monaco Editor (VS Code editor in browser)
* JavaScript
* HTML / CSS
Backend
* FastAPI (Python)
* Uvicorn server
Execution Engine
* Python interpreter
* Node.js runtime

Features
1. Code Editor
The platform includes a browser-based code editor built using Monaco Editor.
Features:
* Syntax highlighting
* Dark theme
* Real-time editing
* Language switching
Supported languages:
* Python
* JavaScript

2. Code Execution
Users can execute code directly from the browser.
Execution flow:
1. User writes code
2. Clicks Run Code
3. Frontend sends request to backend
4. Backend executes code
5. Output returned and displayed
Example:
User input:

print("Hello World")

Output:

Hello World


3. Language Selection
Users can choose between multiple programming languages.
Currently supported:
* Python
* JavaScript
The selected language determines which runtime environment is used for execution.
Example request sent to backend:

{
 "language": "python",
 "code": "print('Hello')"
}


4. Output Panel
The output panel displays the result of the executed code.
It shows:
* Program output
* Runtime errors
* Execution messages
Example:

Output:
Hello DevOps


5. Execution History
The platform stores the history of executed code snippets.
Users can see:
* Previous code
* Corresponding output
Example:

Execution History

Code:
print("Hello")

Output:
Hello


6. Loading Indicator
While code is executing, the UI shows a loading indicator.
Example:

Running code...

This improves user experience by indicating that execution is in progress.

7. Clear Output Feature
Users can clear the output panel using the Clear Output button.
This helps maintain a clean interface while testing multiple code snippets.

8. Execution Timeout Protection
To prevent server blocking, the execution engine includes a timeout limit.
Example problematic code:

while True:
    pass

Without protection this would run indefinitely.
Solution:
Execution is limited to 3 seconds.
If exceeded:

Execution timed out (3 seconds limit)


Backend Design
The backend is built using FastAPI, a high-performance Python web framework.
The backend exposes a REST API endpoint for executing code.
API Endpoint

POST /run

Request format:

{
 "language": "python",
 "code": "print('Hello')"
}

Response format:

{
 "output": "Hello",
 "error": ""
}


Code Execution Engine
The backend contains a code execution service that performs the following tasks:
1. Receive code and language
2. Create a temporary file
3. Execute the code using the appropriate runtime
4. Capture output or errors
5. Return results to the API
6. Delete the temporary file
Example execution:
Python execution command:

python3 file.py

JavaScript execution command:

node file.js


Project Folder Structure

online-code-runner
│
├── backend
│   │
│   ├── routes
│   │     └── run_code.py
│   │
│   ├── services
│   │     └── executor.py
│   │
│   ├── main.py
│   └── venv
│
├── frontend
│   │
│   ├── src
│   │     └── App.js
│   │
│   ├── public
│   └── package.json
│
└── README.md


Backend Components
main.py
Entry point of the FastAPI application.
Responsibilities:
* Start FastAPI server
* Enable CORS
* Register API routes

routes/run_code.py
Defines the API endpoint.
Responsibilities:
* Receive code execution request
* Validate request data
* Call execution service
* Return output response

services/executor.py
Handles the actual execution of code.
Responsibilities:
* Create temporary file
* Execute program
* Capture output
* Handle timeout
* Delete temporary file

Frontend Design
The frontend is built using React.
Main UI components:
1. Header
Displays application title.

Online Code Runner


2. Control Panel
Includes:
* Language selector
* Run Code button
* Clear Output button

3. Code Editor
Uses Monaco Editor.
Provides:
* Syntax highlighting
* Dark theme
* Large editing area

4. Output Terminal
Displays program output in terminal-style UI.

5. Execution History
Shows previously executed programs and results.

How to Run the Project
Backend Setup
Navigate to backend directory:

cd backend

Create virtual environment:

python3 -m venv venv

Activate environment:

source venv/bin/activate

Install dependencies:

pip install fastapi uvicorn

Run server:

uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000


Frontend Setup
Navigate to frontend directory:

cd frontend

Install dependencies:

npm install

Install Monaco editor:

npm install @monaco-editor/react

Start React application:

npm start

Frontend runs at:

http://localhost:3000


Example Execution
Python example:

print("Hello DevOps")

Output:

Hello DevOps

JavaScript example:

console.log("Hello JS")

Output:

Hello JS


Limitations
Current limitations of the system:
* Code runs directly on server
* No user authentication
* No persistent storage
* Limited language support
* Not optimized for concurrent users
These limitations will be addressed in future improvements.

Future Improvements
Possible enhancements include:
* Support for additional programming languages
* Docker-based secure execution
* User authentication
* Code saving functionality
* File-based project editing
* Performance optimization

Conclusion
The Online Code Execution Platform demonstrates the implementation of a full-stack system that allows browser-based code execution.
The project integrates:
* A modern frontend interface
* A scalable backend API
* A runtime execution engine
This project provides a foundation that can later be extended with cloud deployment, containerization, and DevOps practices.
