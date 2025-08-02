import React from "react";

function AboutProject() {
  return (
    <div className="p-6 md:p-10 text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center">👨‍💻 Developer's Insight</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">📘 About This Project</h2>
          <p>
            Hi! I'm Talha Rajput, a MERN Stack Developer. This system is built to manage inventory efficiently, with role-based access and a clean UI for business owners and employees.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">⚙️ Technologies Used</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>React (with Vite)</li>
            <li>Redux Toolkit</li>
            <li>Tailwind CSS (Dark Mode Supported)</li>
            <li>Node.js & Express</li>
            <li>MongoDB + Mongoose</li>
            <li>JWT Authentication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🌟 Key Features</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Admin & Employee Roles</li>
            <li>Secure login system with access/refresh tokens</li>
            <li>Inventory Management (CRUD)</li>
            <li>Dashboard with stats and charts</li>
            <li>Fully Responsive UI</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🔨 How I Built This</h2>
          <p>
            I used RESTful APIs with protected routes. Backend has MVC structure, and I store tokens in cookies and localStorage safely. I used Redux for auth/user state and controlled sidebar/dark mode with slices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🚧 Challenges Solved</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Handling large datasets with pagination</li>
            <li>Role-based UI protection</li>
            <li>Making charts data-efficient</li>
            <li>Auto login with refresh tokens</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📈 Future Improvements</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Invoice/Order system</li>
            <li>Multi-shop support</li>
            <li>Notifications & Reminders</li>
            <li>Export to Excel / PDF</li>
          </ul>
        </section>

        <footer className="text-center text-sm pt-6 border-t border-gray-300 dark:border-gray-700">
          Built with ❤️ by Talha Rajput
        </footer>
      </div>
    </div>
  );
}

export default AboutProject