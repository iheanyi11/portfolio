/**
 * project-data.js
 * ─────────────────────────────────────────────────────
 * Update these with your real projects.
 * Each entry renders as a full case-study accordion card.
 * ─────────────────────────────────────────────────────
 */

const PROJECTS = [
  {
    id: "01",
    title: "Acme — Financial SaaS Dashboard",
    description:
      "A full-stack financial SaaS dashboard with secure login, invoice tracking, customer management, and revenue analytics — fully responsive across desktop, tablet, and mobile.",
    tags: ["React", "Next.js", "PostgreSQL", "Tailwind CSS", "NextAuth"],
    problem:
      "Businesses tracking invoices and customer payments across spreadsheets had no secure, centralised place to log in and see collected vs. pending revenue, search invoice history, or manage customer records — making financial oversight slow and error-prone.",
    solution:
      "Built a full-stack SaaS dashboard with Next.js and PostgreSQL. Users must authenticate via a secure login page before accessing any data — unauthenticated requests are redirected automatically. Once inside, the dashboard provides a sidebar navigation with Home, Invoices, and Customers sections, a 6-month revenue bar chart, a searchable paginated invoice table, and a fully responsive mobile layout with a bottom tab-bar.",
    highlights: [
      "Protected routes with NextAuth — all dashboard pages require authentication, unauthenticated users are redirected to login",
      "Secure credential-based login page as the entry point to the entire application",
      "Revenue overview cards displaying total collected and pending amounts at a glance",
      "Searchable, paginated invoice table with customer name, email, amount, date, and status",
      "Responsive layout: sidebar nav on desktop collapses to a mobile bottom navigation bar",
      "Server-side data fetching with PostgreSQL for fast, SEO-friendly page loads",
    ],
    github: "https://github.com/iheanyi11/acme-app/tree/main/nextjs-dashboard",
    live: "https://nextjs-dashboard-drab-alpha-15.vercel.app/",
  },
  {
    id: "02",
    title: "Fitness Journey Tracker",
    description:
      "A full-stack fitness web app where users create an account, log in, and track their workouts, nutrition, weekly progress, and personal goals — all from a personalised dashboard.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "localStorage", "Chart.js"],
    problem:
      "People trying to build consistent fitness habits had no simple, personal tool to log workouts, monitor calorie and macro intake, visualise weekly progress, and set goals — all in one place without needing a mobile app.",
    solution:
      "Built a multi-page fitness web application with a landing page featuring Sign In and Create Account flows. Authenticated users land on a personalised dashboard showing their Profile Summary (height, weight, BMI), Activity Summary (weekly workouts and day streak), Today's Nutrition with a calorie donut chart and macro breakdown, a Weekly Progress line chart, Recent Workouts log, and a Goals tracker. Navigation spans Dashboard, Workouts, Nutrition, Goals, and Routes sections.",
    highlights: [
      "Authentication flow with Sign In and Create Account from the landing page — dashboard is locked behind login",
      "Profile Summary card displaying user height, weight, and calculated BMI",
      "Activity Summary tracking total workouts completed this week and current day streak",
      "Nutrition dashboard with a calorie donut chart and Protein / Carbs / Fat progress bars",
      "Weekly Progress line chart visualising calorie burn across Mon–Sun",
      "Goals tracker with the ability to add and monitor personal fitness targets",
    ],
    github: "https://github.com/iheanyi11/my-final-project",
    live: "https://my-final-project-sable.vercel.app/index.html",
  },
  {
    id: "03",
    title: "SleepOutside — E-Commerce Store",
    description:
      "A multi-page e-commerce website for outdoor gear — featuring product categories, a shopping cart with live validation, newsletter signup, and a full checkout flow.",
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage", "Vercel"],
    problem:
      "Outdoor enthusiasts needed a clean, affordable online store to browse and purchase camping gear — tents, backpacks, sleeping bags, and hammocks — without the clutter and high prices of big retail sites.",
    solution:
      "Built a fully functional multi-page e-commerce site with a branded landing page, product category browsing, and a cart system built with vanilla JavaScript and localStorage. The cart persists across page visits, displays live feedback when empty, and validates before checkout. A newsletter signup section captures user emails for discount updates. The footer clearly marks it as a learning project.",
    highlights: [
      "Product category pages for Tents, Backpacks, Sleeping Bags, and Hammocks with icon-based navigation",
      "Shopping cart built with JavaScript and localStorage — items persist across page refreshes",
      "Live cart validation: alerts the user and blocks checkout if the cart is empty",
      "Newsletter signup section to capture emails for outdoor tips, gear updates, and discount codes",
      "Multi-page routing with a consistent branded header (SleepOutside logo) across all pages",
      "Deployed live on Vercel as a fully functioning static site",
    ],
    github: "https://github.com/iheanyi11/WDD330AIE",
    live: "https://wdd-330-aie.vercel.app/",
  },
];