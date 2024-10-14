// Import necessary modules
import PDFDocument from 'pdfkit';
import fs from 'fs';

// Sample JSON data (replace this with your JSON input)
const bookData = {
  "title": "React for Beginners",
  "chapters": [
{
  "title": "Chapter 1: Introduction to ReactJS",
  "content": [
    {
      "type": "paragraph",
      "text": "Welcome to the first chapter of \"Mastering the ReactJS Interview.\" In this chapter, we will explore the fundamentals of ReactJS and understand why it has become a pivotal technology in modern web development."
    },
    {
      "type": "bullet-list",
      "items": [
        "The evolution of front-end development",
        "Why ReactJS is popular among developers and companies",
        "Understanding the component-based architecture"
      ]
    },
    {
      "type": "subheading",
      "text": "The Evolution of Front-End Development"
    },
    {
      "type": "paragraph",
      "text": "Front-end development has significantly evolved from static HTML pages to dynamic, interactive web applications. The need for efficient UI updates and state management led to the creation of JavaScript frameworks and libraries."
    },
    {
      "type": "paragraph",
      "text": "Traditional approaches involved manipulating the DOM directly, which could be inefficient and lead to complex, hard-to-maintain codebases as applications grew in size."
    },
    {
      "type": "subheading",
      "text": "Why ReactJS is Popular Among Developers and Companies"
    },
    {
      "type": "paragraph",
      "text": "ReactJS addresses many of the challenges faced in front-end development. Here are some reasons for its popularity:"
    },
    {
      "type": "bullet-list",
      "items": [
        "**Declarative Syntax:** Makes code more predictable and easier to debug.",
        "**Component-Based Architecture:** Encourages reusability and modular code.",
        "**Virtual DOM:** Improves performance by minimizing direct DOM manipulations.",
        "**Strong Community Support:** Extensive ecosystem of tools and libraries.",
        "**Flexibility:** Can be used with other frameworks and supports React Native for mobile development."
      ]
    },
    {
      "type": "subheading",
      "text": "Understanding the Component-Based Architecture"
    },
    {
      "type": "paragraph",
      "text": "Components are the building blocks of a React application. They allow you to split the UI into independent, reusable pieces that can be managed separately."
    },
    {
      "type": "code",
      "code": "// Example of a simple React component\nimport React from 'react';\n\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\nexport default Welcome;"
    },
    {
      "type": "paragraph",
      "text": "In the example above, the `Welcome` component is a functional component that takes `props` as an argument and returns a JSX element."
    },
    {
      "type": "paragraph",
      "text": "Components can be composed to build complex user interfaces, promoting better organization and maintainability in your codebase."
    },
    {
      "type": "code",
      "code": "// Composing components\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Alice\" />\n      <Welcome name=\"Bob\" />\n      <Welcome name=\"Charlie\" />\n    </div>\n  );\n}"
    },
    {
      "type": "paragraph",
      "text": "By understanding these core concepts, you'll be well on your way to mastering ReactJS and impressing in your interviews."
    }
  ]
},{
  "title": "Chapter 2: Core Concepts and Fundamentals",
  "content": [
    {
      "type": "paragraph",
      "text": "In this chapter, we'll delve into the fundamental concepts that form the backbone of ReactJS. A solid understanding of these topics is essential for any React developer aiming to excel in interviews."
    },
    {
      "type": "bullet-list",
      "items": [
        "JSX and rendering elements",
        "Components: Functional vs. Class-based",
        "Props and State management",
        "Lifecycle methods in Class components"
      ]
    },
    {
      "type": "subheading",
      "text": "JSX and Rendering Elements"
    },
    {
      "type": "paragraph",
      "text": "JSX stands for JavaScript XML. It allows you to write HTML elements in JavaScript and place them in the DOM without using functions like `createElement()` or `appendChild()`. JSX makes it easier to write and add HTML in React."
    },
    {
      "type": "code",
      "code": "// Example of JSX\nconst element = <h1>Hello, world!</h1>;\nReactDOM.render(element, document.getElementById('root'));"
    },
    {
      "type": "paragraph",
      "text": "Under the hood, JSX is transformed into React.createElement() calls, which return plain JavaScript objects called 'React elements'. These elements describe what should appear on the screen."
    },
    {
      "type": "subheading",
      "text": "Components: Functional vs. Class-based"
    },
    {
      "type": "paragraph",
      "text": "Components are independent, reusable pieces of code that return React elements to be rendered to the page. There are two types of components: Functional and Class-based."
    },
    {
      "type": "subheading",
      "text": "Functional Components"
    },
    {
      "type": "paragraph",
      "text": "Functional components are simple JavaScript functions that accept props as an argument and return React elements."
    },
    {
      "type": "code",
      "code": "// Functional Component\nfunction Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\nexport default Greeting;"
    },
    {
      "type": "paragraph",
      "text": "They are easy to write and understand, and with the introduction of Hooks, they can manage state and lifecycle events."
    },
    {
      "type": "subheading",
      "text": "Class-based Components"
    },
    {
      "type": "paragraph",
      "text": "Class-based components are more feature-rich. They can have state and lifecycle methods, which are hooks that run at specific points in a component's life."
    },
    {
      "type": "code",
      "code": "// Class-based Component\nimport React from 'react';\n\nclass Greeting extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}!</h1>;\n  }\n}\n\nexport default Greeting;"
    },
    {
      "type": "paragraph",
      "text": "While both types of components can achieve the same results, functional components with Hooks are now the preferred choice."
    },
    {
      "type": "subheading",
      "text": "Props and State Management"
    },
    {
      "type": "paragraph",
      "text": "Props (short for properties) are inputs to components. They are data passed down from a parent component to a child component."
    },
    {
      "type": "code",
      "code": "// Using Props\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n// In Parent Component\n<Welcome name=\"Alice\" />"
    },
    {
      "type": "paragraph",
      "text": "State, on the other hand, is managed within the component (similar to variables declared within a function). State can change over time, usually as a result of user events."
    },
    {
      "type": "code",
      "code": "// Using State in a Class Component\nclass Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n\n  increment = () => {\n    this.setState({ count: this.state.count + 1 });\n  };\n\n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={this.increment}>Increment</button>\n      </div>\n    );\n  }\n}"
    },
    {
      "type": "paragraph",
      "text": "In functional components, state can be managed using the `useState` Hook."
    },
    {
      "type": "code",
      "code": "// Using State in a Functional Component\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n\nexport default Counter;"
    },
    {
      "type": "subheading",
      "text": "Lifecycle Methods in Class Components"
    },
    {
      "type": "paragraph",
      "text": "Lifecycle methods are special methods in class components that allow you to hook into different phases of a component's life: mounting, updating, and unmounting."
    },
    {
      "type": "bullet-list",
      "items": [
        "**componentDidMount()**: Invoked immediately after a component is mounted.",
        "**componentDidUpdate(prevProps, prevState)**: Called immediately after updating occurs.",
        "**componentWillUnmount()**: Invoked immediately before a component is unmounted and destroyed."
      ]
    },
    {
      "type": "code",
      "code": "// Lifecycle Methods Example\nclass Timer extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { seconds: 0 };\n  }\n\n  tick() {\n    this.setState(state => ({\n      seconds: state.seconds + 1\n    }));\n  }\n\n  componentDidMount() {\n    this.interval = setInterval(() => this.tick(), 1000);\n  }\n\n  componentWillUnmount() {\n    clearInterval(this.interval);\n  }\n\n  render() {\n    return (\n      <div>\n        Seconds: {this.state.seconds}\n      </div>\n    );\n  }\n}\n\nexport default Timer;"
    },
    {
      "type": "paragraph",
      "text": "Understanding lifecycle methods is crucial for tasks like data fetching, setting up subscriptions, and manually changing the DOM in React components."
    },
    {
      "type": "paragraph",
      "text": "In functional components, lifecycle methods can be managed using the `useEffect` Hook, which we'll cover in detail in a subsequent chapter."
    },
    {
      "type": "paragraph",
      "text": "By mastering these core concepts, you'll be well-prepared to tackle more advanced topics and impress potential employers with your ReactJS knowledge."
    }
  ]
},{
  "title": "Chapter 3: Acing the Practical and Behavioral Aspects of the Interview",
  "content": [
    {
      "type": "paragraph",
      "text": "Welcome to the final chapter of \"Mastering the ReactJS Interview.\" This chapter focuses on the practical and behavioral aspects of the interview process. We'll cover strategies for live coding challenges, building a sample application, debugging techniques, and preparing for behavioral questions."
    },
    {
      "type": "bullet-list",
      "items": [
        "Live Coding Challenges",
        "Building a Sample Application",
        "Debugging and Problem-Solving",
        "Behavioral Interview Preparation",
        "Final Tips and Tricks"
      ]
    },
    {
      "type": "subheading",
      "text": "Live Coding Challenges"
    },
    {
      "type": "paragraph",
      "text": "Live coding challenges are a common part of technical interviews. They test your problem-solving skills, coding proficiency, and how you handle pressure."
    },
    {
      "type": "subheading",
      "text": "Strategies for Tackling Coding Problems"
    },
    {
      "type": "paragraph",
      "text": "Here are some strategies to help you excel in live coding challenges:"
    },
    {
      "type": "bullet-list",
      "items": [
        "**Understand the Problem:** Take a moment to read and comprehend the question. Ask clarifying questions if necessary.",
        "**Plan Before Coding:** Outline your approach and consider edge cases before diving into code.",
        "**Think Aloud:** Verbalize your thought process to demonstrate your problem-solving skills.",
        "**Write Clean Code:** Use meaningful variable names and follow best practices.",
        "**Test Your Code:** Check for errors and test with different inputs."
      ]
    },
    {
      "type": "subheading",
      "text": "Practicing Common ReactJS Coding Exercises"
    },
    {
      "type": "paragraph",
      "text": "Practice makes perfect. Work on common ReactJS exercises to build your confidence."
    },
    {
      "type": "code",
      "code": "// Example Exercise: Build a To-Do List Component\nimport React, { useState } from 'react';\n\nfunction TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState('');\n\n  const addTodo = () => {\n    setTodos([...todos, input]);\n    setInput('');\n  };\n\n  return (\n    <div>\n      <input value={input} onChange={e => setInput(e.target.value)} />\n      <button onClick={addTodo}>Add</button>\n      <ul>\n        {todos.map((todo, index) => (\n          <li key={index}>{todo}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default TodoList;"
    },
    {
      "type": "paragraph",
      "text": "Regularly solving such exercises will enhance your ability to code under time constraints."
    },
    {
      "type": "subheading",
      "text": "Thinking Aloud and Explaining Your Thought Process"
    },
    {
      "type": "paragraph",
      "text": "Communicating effectively is as important as writing correct code. Explain your reasoning, assumptions, and choices as you code. This helps the interviewer understand your approach and can make up for any minor coding errors."
    },
    {
      "type": "subheading",
      "text": "Building a Sample Application"
    },
    {
      "type": "paragraph",
      "text": "Creating a sample application demonstrates your ability to build a project from scratch and apply ReactJS concepts in a real-world scenario."
    },
    {
      "type": "subheading",
      "text": "Developing a Small Project from Scratch"
    },
    {
      "type": "paragraph",
      "text": "Choose a simple project that showcases key ReactJS features. For example, a weather app that fetches data from an API."
    },
    {
      "type": "code",
      "code": "// Basic structure for fetching data in a React component\nimport React, { useState, useEffect } from 'react';\n\nfunction WeatherApp() {\n  const [weather, setWeather] = useState(null);\n\n  useEffect(() => {\n    fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London')\n      .then(response => response.json())\n      .then(data => setWeather(data));\n  }, []);\n\n  return (\n    <div>\n      {weather ? (\n        <div>\n          <h1>{weather.location.name}</h1>\n          <p>{weather.current.temp_c}°C</p>\n        </div>\n      ) : (\n        <p>Loading...</p>\n      )}\n    </div>\n  );\n}\n\nexport default WeatherApp;"
    },
    {
      "type": "paragraph",
      "text": "Ensure your project includes state management, API integration, and clean, maintainable code."
    },
    {
      "type": "subheading",
      "text": "Demonstrating State Management and API Integration"
    },
    {
      "type": "paragraph",
      "text": "Use Hooks like `useState` and `useEffect` for managing state and side effects. Show that you can handle asynchronous operations and update the UI accordingly."
    },
    {
      "type": "subheading",
      "text": "Deploying Your Application"
    },
    {
      "type": "paragraph",
      "text": "Deploy your application using services like Netlify or Vercel. This demonstrates your ability to deliver a complete product."
    },
    {
      "type": "paragraph",
      "text": "Provide a live link and share your code on a platform like GitHub for the interviewer to review."
    },
    {
      "type": "subheading",
      "text": "Debugging and Problem-Solving"
    },
    {
      "type": "paragraph",
      "text": "Debugging skills are essential. Interviewers may test your ability to identify and fix issues."
    },
    {
      "type": "subheading",
      "text": "Common Bugs and How to Fix Them"
    },
    {
      "type": "bullet-list",
      "items": [
        "**Undefined or Null Values:** Check for data before rendering.",
        "**State Updates Not Reflecting:** Remember that state updates are asynchronous.",
        "**Infinite Loops in useEffect:** Ensure dependencies are correctly specified."
      ]
    },
    {
      "type": "paragraph",
      "text": "Understanding common pitfalls can help you quickly resolve issues during the interview."
    },
    {
      "type": "subheading",
      "text": "Tools for Debugging React Applications"
    },
    {
      "type": "paragraph",
      "text": "Familiarize yourself with tools like React Developer Tools for inspecting component hierarchies and states."
    },
    {
      "type": "paragraph",
      "text": "Use console statements and breakpoints to trace and debug your code effectively."
    },
    {
      "type": "subheading",
      "text": "Behavioral Interview Preparation"
    },
    {
      "type": "paragraph",
      "text": "Behavioral questions assess your soft skills, teamwork, and how you handle challenges."
    },
    {
      "type": "subheading",
      "text": "Discussing Past Projects and Your Role"
    },
    {
      "type": "paragraph",
      "text": "Be prepared to talk about previous projects, your contributions, and the technologies used."
    },
    {
      "type": "paragraph",
      "text": "Highlight specific challenges you overcame and what you learned from the experience."
    },
    {
      "type": "subheading",
      "text": "Explaining Challenges and How You Overcame Them"
    },
    {
      "type": "paragraph",
      "text": "Use the STAR method (Situation, Task, Action, Result) to structure your responses."
    },
    {
      "type": "paragraph",
      "text": "Demonstrate problem-solving skills and the ability to learn from difficult situations."
    },
    {
      "type": "subheading",
      "text": "Communicating Effectively with Team Members"
    },
    {
      "type": "paragraph",
      "text": "Discuss experiences where you've collaborated with both technical and non-technical team members."
    },
    {
      "type": "paragraph",
      "text": "Emphasize your communication skills, adaptability, and teamwork."
    },
    {
      "type": "subheading",
      "text": "Final Tips and Tricks"
    },
    {
      "type": "paragraph",
      "text": "As you conclude your preparation, here are some final tips to keep in mind."
    },
    {
      "type": "bullet-list",
      "items": [
        "**Prepare Your Own Questions:** Show interest by asking insightful questions about the company and role.",
        "**Follow Up After the Interview:** Send a thank-you email reiterating your interest.",
        "**Stay Updated:** Keep learning about the latest ReactJS features and best practices."
      ]
    },
    {
      "type": "paragraph",
      "text": "Remember that confidence comes from preparation. Good luck with your ReactJS interviews!"
    }
  ]
}
  ]
};

// Configuration options
const config = {
  font: 'Helvetica',
  fontSize: 24,
  lineSpacing: 1.5,
  margins: {
    top: 72 + (72 / 2),    // 1 inch
    bottom: 72 + (72 / 2),
    left: 72 + (72 / 2),
    right: 72 + (72 / 2)
  },
  pageSize: [1057, 1688], // or 'A4', or [width, height]
  codeBlock: {
    backgroundColor: '#f0f0f0'
  }
};

// Helper function to parse and apply bold/italic formatting
function formatText(doc, text, config) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/); // Split by **<text>** or *<text>*

  tokens.forEach(token => {
    if (token.startsWith('**') && token.endsWith('**')) {
      // Italics
      doc.font(config.font).fontSize(config.fontSize).font('Helvetica-Oblique');
      doc.text(token.slice(2, -2));
    } else if (token.startsWith('*') && token.endsWith('*')) {
      // Bold
      doc.font(config.font).fontSize(config.fontSize).font('Helvetica-Bold');
      doc.text(token.slice(1, -1));
    } else {
      // Regular text
      doc.font(config.font).fontSize(config.fontSize).font('Helvetica');
      doc.text(token);
    }
  });

  // End the current text line
  doc.text('');
}

// Function to create the PDF
function createPDF(bookData, config) {
  const doc = new PDFDocument({
    size: config.pageSize,
    margins: config.margins
  });

  doc.pipe(fs.createWriteStream('output.pdf'));

  doc.font(config.font).fontSize(config.fontSize);

  // Iterate over chapters
  for (const chapter of bookData.chapters) {
    // Add chapter title
    doc.addPage();
    doc.fontSize(config.fontSize + 36).font('Helvetica-Bold').text(chapter.title.split(`:`)[0], { align: 'center' });
    doc.moveDown();
    doc.fontSize(config.fontSize + 24).font('Helvetica-Bold').text(chapter.title.split(`:`)[1], { align: 'center' });
    doc.moveDown();

    // Iterate over content
    for (const content of chapter.content) {
      switch (content.type) {
        case 'paragraph':
          doc.font(config.font).fontSize(config.fontSize);
          formatText(doc, content.text, config); // Use the formatText function to handle bold/italics
          doc.moveDown();
          break;
        case 'bullet-list':
          doc.font(config.font).fontSize(config.fontSize);
          for (const item of content.items) {
            doc.circle(doc.x + 5, doc.y + 5, 2).fill();
            formatText(doc, item, config); // Use formatText to support bold/italics in bullet points
            doc.moveDown(0.5);
          }
          doc.moveDown();
          break;
        case 'code':
          const codeWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
          const codeTextOptions = {
            width: codeWidth - 10,
            align: 'left',
            lineGap: config.lineSpacing,
            font: 'Courier',
            fontSize: config.fontSize
          };
          const codeHeight = doc.heightOfString(content.code, codeTextOptions);
          // Draw background rectangle
          doc.save();
          doc.rect(doc.x, doc.y, codeWidth, codeHeight + 10)
            .fill(config.codeBlock.backgroundColor);
          doc.restore();
          doc.fillColor('black');
          doc.text(content.code, doc.x + 5, doc.y + 5, codeTextOptions);
          doc.moveDown();
          break;
        default:
          // Handle other types if necessary
          break;
      }
    }
  }

  doc.end();
}

// Run the function
createPDF(bookData, config);

