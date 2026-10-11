import type { Project } from "../types";

// The first project is shown as the large featured card
export const projects: Project[] = [
  {
    id: 1,
    title: "Site Management",
    year: "2026",
    date: "Sep – Oct 2026",
    avatar: "SM",
    images: [
      { src: "/assets/projects/site-management/1.webp", caption: "Landing page" },
      { src: "/assets/projects/site-management/2.webp", caption: "Features" },
      { src: "/assets/projects/site-management/3.webp", caption: "Interactive demo" },
      { src: "/assets/projects/site-management/4.webp", caption: "Getting started in 3 steps" },
      { src: "/assets/projects/site-management/5.webp", caption: "Roles" },
    ],
    shortDescription:
      "A daily log system for construction sites. Foremen record the day's work from their phones, and engineers and project owners see progress against the plan, remaining materials and crew expenses in one place.",
    details:
      "The front end is React, TypeScript and Tailwind, and the API is Node and Express on PostgreSQL, all running in Docker. The field app is a PWA, so it installs from the browser and keeps working without signal: reports wait on the phone and send themselves once the connection is back. Admins set permissions per role, reports export as Thai or English PDFs, and the system can post daily summaries to a LINE group.",
    tags: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Docker", "PWA"],
  },
  {
    id: 2,
    title: "Course Recommender (Senior Project)",
    year: "2024 – 2025",
    date: "Academic Year 2024",
    avatar: "AI",
    images: [
      // Figures 4.1, 4.5, 4.11, 4.12, 4.4, 4.6 and 4.8 from chapter 4 of the project report
      { src: "/assets/projects/course-recommender/1.webp", caption: "Sign-in page", position: "center" },
      { src: "/assets/projects/course-recommender/2.webp", caption: "Student profile and grades", position: "center" },
      { src: "/assets/projects/course-recommender/3.webp", caption: "Entering a student's details", position: "center" },
      { src: "/assets/projects/course-recommender/4.webp", caption: "Prediction result", position: "center" },
      { src: "/assets/projects/course-recommender/5.webp", caption: "Admin menu", position: "center" },
      { src: "/assets/projects/course-recommender/6.webp", caption: "Model management", position: "center" },
      { src: "/assets/projects/course-recommender/7.webp", caption: "Student data management", position: "center" },
    ],
    shortDescription:
      "My senior project with Chanakit Chidputra. It suggests which undergraduate computer science program a student should choose, using a neural network trained on records of past students.",
    details:
      "Students sign in with their university Google account. Admins upload CSV and ARFF data, manage the models and read feedback from users. Training runs in Python with scikit-learn's MLPClassifier, and the web app is Node, Express and EJS on MongoDB. We tested different numbers of hidden layers and neurons, learning rates, batch sizes and epochs. One hidden layer of 16 neurons gave the best accuracy, and adding more layers didn't improve it.",
    tags: ["Python", "scikit-learn", "Node.js", "Express", "MongoDB", "Google OAuth"],
    repoUrl: "https://github.com/npST411/Website-Course-Forecast",
    // Copy of the paper with the authors' email addresses removed
    paperUrl: "/assets/projects/course-recommender/research-paper.pdf",
  },
  {
    id: 3,
    title: "Product Management (CRUD)",
    year: "2024",
    date: "Jul 2024",
    avatar: "CR",
    images: [
      { src: "/assets/projects/product-crud/1.webp", caption: "Product list" },
      { src: "/assets/projects/product-crud/2.webp", caption: "Add product" },
      { src: "/assets/projects/product-crud/3.webp", caption: "Product details" },
      { src: "/assets/projects/product-crud/4.webp", caption: "Edit product" },
    ],
    shortDescription:
      "An admin page for a clothing shop's products. You can add, view, edit and delete items, each with a price, a category (shirts, pants or shoes) and an image.",
    details:
      "Pages are rendered on the server with Express and EJS and styled with Bootstrap, and the data lives in MongoDB through Mongoose. The product table shows ten items per page. Edit and delete use method-override, so plain HTML forms can send PUT and DELETE requests.",
    tags: ["Node.js", "Express", "EJS", "MongoDB", "Bootstrap"],
    repoUrl: "https://github.com/npST411/CRUD_NodeJS",
  },
  {
    id: 4,
    title: "XO Game",
    year: "2024",
    date: "Jul 2024",
    avatar: "XO",
    images: [
      { src: "/assets/projects/xo-game/1.webp", caption: "3×3 board" },
      { src: "/assets/projects/xo-game/2.webp", caption: "5×5 board" },
      { src: "/assets/projects/xo-game/3.webp", caption: "Saved games for replay" },
    ],
    shortDescription:
      "Tic-tac-toe on a board of any size from 3×3 up. To win, you fill a whole row, column or diagonal.",
    details:
      "Each game and every move is saved to MongoDB through an Express API, and the game list lets you pick a finished game and replay it on its original board size.",
    tags: ["JavaScript", "Node.js", "Express", "MongoDB"],
    repoUrl: "https://github.com/npST411/Tic-Tac-Toe",
  },
  {
    id: 5,
    title: "CS&IT Department Website",
    year: "2023",
    date: "Aug 2023",
    avatar: "WD",
    images: [
      { src: "/assets/projects/csit-website/1.webp", caption: "Home page and news" },
      { src: "/assets/projects/csit-website/2.webp", caption: "Curriculum" },
      { src: "/assets/projects/csit-website/3.webp", caption: "Study plan" },
      { src: "/assets/projects/csit-website/4.webp", caption: "Academic calendar" },
    ],
    shortDescription:
      "A five-page website for the Computer Science and IT department at Rajamangala University of Technology Krungthep, written in plain HTML and CSS.",
    details:
      "The pages are the home page with department news, the curriculum, the study plan, the staff list and the academic calendar. No CSS framework is used; each page has its own stylesheet.",
    tags: ["HTML", "CSS"],
    repoUrl: "https://github.com/npST411/Static_Website",
    demoUrl: "https://npst411.github.io/Static_Website/",
  },
];
