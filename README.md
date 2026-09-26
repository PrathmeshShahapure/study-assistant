


# AI Study Assistant

An AI-powered study assistant that converts a topic or study material into interactive flashcards and quizzes.

I built this project as a frontend internship assignment to explore how an AI model can be integrated into a real React application and turned into a useful learning experience.

The application currently supports two main learning modes:

- Flashcards
- Quiz

The quiz also includes score tracking and a retest mode that allows the user to retry only the questions they answered incorrectly.

The application uses React on the frontend, Express and Node.js on the backend, Groq for AI generation, and Zod to validate AI-generated responses before they reach the frontend.

---

## Features

### 1. AI-Generated Flashcards

Users can enter a topic or paste their study material and generate flashcards from it.

Each flashcard contains:

- Question
- Answer
- Card navigation
- Show/hide answer
- Progress through the cards

Example:

```text
Input:
Photosynthesis

        ↓

AI generates:

Q: What is the main purpose of photosynthesis?

A: To convert light energy into chemical energy.
````

---

### 2. AI-Generated Quiz

Users can generate a multiple-choice quiz from the same study material.

The quiz supports:

* Multiple-choice questions
* Four options per question
* Question navigation
* Answer selection
* Answer validation
* Score calculation
* Results display

The user must answer the questions before submitting the quiz.

---

### 3. Wrong Answer Retest

One of the features I specifically wanted to include was the ability to retest the questions the user got wrong.

For example:

```text
Quiz
 ↓
5 Questions
 ↓
Score: 3 / 5
 ↓
2 Wrong Answers
 ↓
Retest Wrong Questions
```

Instead of forcing the user to repeat the entire quiz, the application creates a smaller quiz containing only the questions that were answered incorrectly.

This makes the quiz more useful as a learning tool rather than only an assessment.

---

### 4. Structured AI Responses

The AI is instructed to return a predictable JSON structure.

For flashcards:

```json
{
  "flashcards": [
    {
      "id": 1,
      "question": "What is photosynthesis?",
      "answer": "Photosynthesis is the process by which plants convert light energy into chemical energy."
    }
  ]
}
```

For quizzes:

```json
{
  "quiz": [
    {
      "id": 1,
      "question": "What is the main purpose of photosynthesis?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": "Option A"
    }
  ]
}
```

This makes it possible for the React frontend to work with the AI-generated data in a predictable way.

---

### 5. AI Response Validation

AI-generated responses cannot always be trusted to follow the expected structure.

Because of that, I added Zod validation on the backend.

The response goes through:

```text
Groq
 ↓
JSON.parse()
 ↓
Zod validation
 ↓
Validated response
 ↓
Frontend
```

If the response does not match the expected structure, it is rejected instead of sending potentially broken data to the frontend.

---

### 6. Loading States

When the AI is generating content, the UI enters a loading state.

This prevents users from accidentally sending multiple requests while the previous request is still being processed.

The flow is:

```text
Idle
 ↓
Loading
 ↓
Success
```

or:

```text
Idle
 ↓
Loading
 ↓
Error
```

---

### 7. Error Handling

The application handles common errors such as:

* Empty study material
* Invalid generation type
* Backend errors
* AI generation failures
* Invalid AI JSON
* Invalid AI response structure
* Network/API failures

The API key and AI-related errors are handled on the backend rather than exposing implementation details to the frontend.

---

### 8. Direct Navigation Protection

The Quiz and Flashcards pages depend on generated data passed through React Router.

The application also handles cases where the required data is missing, such as directly visiting the route without generating content first.

Instead of allowing the UI to crash, the user is shown a message asking them to return to the home page.

---

# Tech Stack

## Frontend

* React
* React Router
* Tailwind CSS
* Axios
* Lucide React
* Vite

## Backend

* Node.js
* Express.js
* CORS
* dotenv

## AI

* Groq API
* `groq-sdk`

## Validation

* Zod

---

# Architecture

The application follows a simple frontend-backend architecture.

```text
                    ┌─────────────────┐
                    │     React       │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             │ HTTP Request
                             ↓
                    ┌─────────────────┐
                    │    Express      │
                    │     Backend     │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │      Groq       │
                    │   AI Model      │
                    └────────┬────────┘
                             │
                             ↓
                       JSON Response
                             │
                             ↓
                    ┌─────────────────┐
                    │  JSON.parse()   │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │      Zod        │
                    │   Validation    │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │  React UI       │
                    │ Quiz / Cards    │
                    └─────────────────┘
```

---

# Project Structure

The project is organized into separate frontend and backend applications.

```text
ai-study-assistant/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Flashcards.jsx
│   │   │   └── Quiz.jsx
│   │   │
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── src/
│   │   ├── schemas/
│   │   │   ├── flashcardSchema.js
│   │   │   └── quizSchema.js
│   │   │
│   │   ├── groq.js
│   │   ├── index.js
│   │   └── server.js
│   │
│   ├── package.json
│   ├── .env
│   └── ...
│
├── .gitignore
└── README.md
```

---

# Application Flow

## Flashcard Flow

```text
User enters topic/study material
            ↓
Clicks "Start Learning"
            ↓
React sends POST /api/generate
            ↓
Express receives request
            ↓
Backend sends prompt to Groq
            ↓
Groq generates flashcards
            ↓
JSON.parse()
            ↓
Zod validates response
            ↓
Backend sends validated data
            ↓
React receives flashcards
            ↓
Flashcards UI displays them
```

---

## Quiz Flow

```text
User enters topic/study material
            ↓
Clicks "Take a Test"
            ↓
React sends POST /api/generate
            ↓
Express receives request
            ↓
Backend sends prompt to Groq
            ↓
Groq generates quiz
            ↓
JSON.parse()
            ↓
Zod validates response
            ↓
Backend sends validated data
            ↓
React receives quiz
            ↓
User answers questions
            ↓
Score is calculated
            ↓
Wrong answers are identified
            ↓
User can retest wrong questions
```

---

# Getting Started

## Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* A Groq API key

You can check your Node.js version using:

```bash
node -v
```

and npm using:

```bash
npm -v
```

---

# Installation

## 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

Move into the project:

```bash
cd ai-study-assistant
```

---

# Backend Setup

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=3000
GROQ_API_KEY=your_groq_api_key
```

Replace:

```text
your_groq_api_key
```

with your actual Groq API key.

### Start the backend

```bash
npm run dev
```

The backend should start on:

```text
http://localhost:3000
```

---

# Frontend Setup

Open another terminal.

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

---

# Environment Variables

The backend requires the following environment variables:

```env
PORT=3000
GROQ_API_KEY=your_groq_api_key
```

The Groq API key is intentionally kept on the backend.

It is **not** exposed to the browser.

The frontend communicates with the Express backend instead:

```text
React
 ↓
Express
 ↓
Groq
```

rather than:

```text
React
 ↓
Groq
```

This prevents the API key from being included in client-side code.

---

# API

## Generate Study Material

### Endpoint

```http
POST /api/generate
```

### Request Body

For flashcards:

```json
{
  "title_or_content": "Photosynthesis",
  "type": "flashcards"
}
```

For quiz:

```json
{
  "title_or_content": "Photosynthesis",
  "type": "quiz"
}
```

---

## Flashcard Response

The backend returns:

```json
{
  "title": "Photosynthesis",
  "flashcards": [
    {
      "id": 1,
      "question": "What is photosynthesis?",
      "answer": "The process by which plants convert light energy into chemical energy."
    }
  ]
}
```

---

## Quiz Response

The backend returns:

```json
{
  "title": "Photosynthesis",
  "quiz": [
    {
      "id": 1,
      "question": "What is the main purpose of photosynthesis?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": "Option A"
    }
  ]
}
```

---

# Validation

The backend uses Zod to validate the AI-generated responses.

## Flashcard Schema

Each flashcard is expected to contain:

```text
id           → number
question     → string
answer       → string
```

The overall response must contain:

```text
flashcards → array
```

---

## Quiz Schema

Each quiz question is expected to contain:

```text
id             → number
question       → string
options        → array of strings
correctAnswer  → string
```

The quiz response must contain:

```text
quiz → array
```

The quiz validation also ensures that each question contains exactly four options and that the correct answer exists among those options.

---

# Why I Used Zod

An LLM response is not guaranteed to always follow the structure requested in the prompt.

For example, the model could potentially return:

```json
{
  "questions": []
}
```

when the application expects:

```json
{
  "quiz": []
}
```

Without validation, this could cause unexpected frontend behavior.

Zod gives the backend a validation layer between the AI and the frontend.

```text
AI Response
     ↓
Is it valid JSON?
     ↓
Does it match our schema?
     ↓
Send to frontend
```

This makes the application more reliable.

---

# Learning Mode

## Planned Feature

One of the next features I would like to add is a **Learning Mode**.

Currently, the application generates flashcards and quizzes, but the user cannot have a conversation with the study material.

Learning Mode would allow users to ask doubts while studying.

For example:

```text
User:

Why is sunlight necessary for photosynthesis?


AI:

Sunlight provides the energy required for the
light-dependent reactions of photosynthesis.
```

The goal is to make the application more interactive and useful for understanding concepts, not just memorizing them.

---

# Future Version: RAG

A future version of the application can introduce **Retrieval-Augmented Generation (RAG)**.

The current version sends the user's study material directly to the AI model.

This works well for relatively small inputs, but larger study materials such as textbooks, PDFs, and long notes would require a different approach.

With RAG, the application could process larger documents and retrieve only the relevant information when the user asks a question.

The planned architecture would look like:

```text
              PDF / Notes
                   ↓
              Text Extraction
                   ↓
                Chunking
                   ↓
               Embeddings
                   ↓
             Vector Database
                   ↓
             User asks doubt
                   ↓
          Semantic Similarity Search
                   ↓
          Relevant Study Material
                   ↓
                  Groq
                   ↓
          Grounded AI Response
```

This would make the future Learning Mode more reliable because the AI could use the user's own study material as context.

---

# Possible RAG Stack

A future implementation could use technologies such as:

```text
Document Processing
        ↓
Embeddings
        ↓
Vector Database
        ↓
Retrieval
        ↓
Groq
```

Possible technologies I could explore:

* LangChain
* pgvector
* Pinecone
* Qdrant
* Chroma
* Embedding models

The exact stack would depend on the requirements and scale of the application.

RAG is **not implemented in the current version**.

---

# Future Improvements

The following features could be added in future versions:

### Learning

* [ ] Learning Mode
* [ ] Ask doubts about study material
* [ ] AI explanations
* [ ] Follow-up questions
* [ ] Concept summaries

### RAG

* [ ] PDF upload
* [ ] Document processing
* [ ] Text chunking
* [ ] Embeddings
* [ ] Vector database
* [ ] Semantic search
* [ ] Context-aware answers

### Personalization

* [ ] User accounts
* [ ] Save quizzes
* [ ] Save flashcards
* [ ] Study history
* [ ] Progress tracking
* [ ] Difficulty selection
* [ ] Personalized quizzes
* [ ] Spaced repetition

### AI Improvements

* [ ] Better prompt engineering
* [ ] Difficulty-aware question generation
* [ ] AI-generated explanations for wrong answers
* [ ] Better handling of malformed AI responses
* [ ] More structured AI output validation

---

# Current Limitations

The current version intentionally keeps the application relatively simple.

Currently:

* Study material is not permanently stored.
* There is no authentication.
* There is no database.
* There is no PDF upload.
* There is no RAG pipeline.
* There is no persistent learning history.
* Generated quizzes and flashcards are not saved after the current session.

These are possible improvements for future versions.

---

# Design Decisions

## Why React?

React made it straightforward to build the interactive parts of the application such as:

* Flashcard state
* Quiz state
* Question navigation
* Selected answers
* Results
* Retesting

---

## Why Express?

I wanted the AI API call to happen on the server rather than directly from the browser.

Express provides a simple backend layer between the React application and Groq.

---

## Why Groq?

Groq provides an API that can be used to generate the quiz and flashcard content required by the application.

The AI model is responsible for generating the educational content, while the application is responsible for validating and displaying that content.

---

## Why Zod?

The AI output is dynamic.

Zod gives the backend a clear contract for the data that the frontend expects.

This helps separate:

```text
AI generation
```

from:

```text
Application data validation
```

---

# What I Learned

Building this project helped me understand several things that are different from building a normal CRUD application.

### 1. AI integration is more than just calling an API

The AI response needs to be structured and validated before the frontend can safely use it.

---

### 2. Frontend and backend responsibilities

The frontend handles:

* User interaction
* UI state
* Quiz state
* Navigation
* Results

The backend handles:

* AI API calls
* API key security
* Response parsing
* Data validation

---

### 3. Working with asynchronous operations

Generating AI content takes time, so the UI needs to handle:

```text
Loading
Success
Error
```

instead of assuming the request will always complete immediately.

---

### 4. AI output needs validation

Even when the prompt asks for a specific format, the application should not blindly trust the response.

That is why I added:

```text
JSON.parse()
+
Zod validation
```

before returning the data to the frontend.

---

### 5. Building the wrong-answer retest

The retest feature helped me work with:

* Arrays
* Filtering
* State updates
* Question tracking
* Score calculation
* Conditional UI

It also made the application more useful from a learning perspective.

---

# Testing

Before deployment, the application should be tested for:

### Flashcards

* [ ] Generate flashcards from a topic
* [ ] Generate flashcards from longer text
* [ ] Navigate forward
* [ ] Navigate backward
* [ ] Reveal answers
* [ ] Verify the last card
* [ ] Verify the first card

### Quiz

* [ ] Generate quiz
* [ ] Select answers
* [ ] Navigate between questions
* [ ] Submit quiz
* [ ] Verify score
* [ ] Verify wrong answers
* [ ] Retest wrong answers
* [ ] Verify perfect score behavior

### Error Cases

* [ ] Empty input
* [ ] Backend unavailable
* [ ] AI request failure
* [ ] Invalid AI response
* [ ] Missing quiz data
* [ ] Missing flashcard data
* [ ] Direct navigation to `/quiz`
* [ ] Direct navigation to `/flashcards`

---

# Security

The Groq API key is stored in the backend environment variables.

The `.env` file should never be committed to Git.

The project `.gitignore` contains:

```gitignore
node_modules/
.env
.env.*
dist/
```

The frontend never receives the Groq API key.

---

# Deployment

The application can be deployed using separate frontend and backend services.

A possible deployment architecture is:

```text
                 Internet
                    │
                    ↓
              ┌───────────┐
              │  Vercel   │
              │ Frontend  │
              └─────┬─────┘
                    │
                    ↓
              ┌───────────┐
              │ Backend   │
              │ Express   │
              └─────┬─────┘
                    │
                    ↓
                ┌───────┐
                │ Groq  │
                └───────┘
```

The exact hosting providers can be changed depending on deployment requirements.

For production deployment, the following environment variables need to be configured on the backend:

```env
PORT=3000
GROQ_API_KEY=your_groq_api_key
```

The frontend API URL also needs to point to the deployed backend instead of:

```text
http://localhost:3000
```
---

# Project Status

The current version includes the main AI-powered study workflow:

```text
Topic / Study Material
        ↓
   Choose Mode
      ↙   ↘
Flashcards  Quiz
               ↓
             Score
               ↓
        Wrong Answer Retest
```

The core functionality is complete.

The next major version would focus on making the application more personalized and context-aware through Learning Mode and RAG.

---

# Future Vision

The long-term goal of this project is to turn it from a simple AI content generator into a more complete study assistant.

The planned experience would be:

```text
                    AI Study Assistant
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ↓                  ↓                  ↓
    Flashcards            Quiz          Learning Mode
                                              │
                                              ↓
                                        Ask a Doubt
                                              │
                                              ↓
                                     Retrieve Context
                                              │
                                              ↓
                                             AI
                                              │
                                              ↓
                                         Explanation
```

The user should eventually be able to upload their own study material, learn through flashcards, test themselves, ask questions about difficult concepts, and track their progress over time.

---

# Author

**Prathmesh Shahapure**

Built as a frontend internship assignment to explore AI-powered application development with React, Express, Groq and Zod.

---



