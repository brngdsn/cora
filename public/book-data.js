const bookData = [
  {
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
      }
    ]
  }
];