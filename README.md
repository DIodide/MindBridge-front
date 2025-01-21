# Our Product

Our app creates AI-powered, personalized educational guides for any topic. Provided with a request defining the user’s goal and feedback identifying their prior experiences and learning techniques, MindBridge generates a custom interactive roadmap with clear summaries, tutorials, and practice problems for each phase. With an easy-to-follow step-by-step guide, it is easier than ever to attain one’s goals, hone existing skills, or cultivate new ones.  The combination of trackable, achievable steps, enables user productivity by reducing the time spent searching for resources that match your current skill level or appeal to your learning style. Additionally, visualizing progress improves motivation and consistency, and subdividing the problem into smaller, actionable steps makes the problem more approachable. Only with us can you get this detailed level of customization with our virtually limitless number of topics.


On the front end, the learner begins by entering a topic that they would like to learn more about in the text area. They are then routed to a short section asking for prior knowledge and later their learning style. Finally, they are given the roadmap for their goal, and when they click a step it provides a description, an example, and additional resources.

![Screenshot 2024-11-10 014609.png](https://cdn.dorahacks.io/static/files/1931541cf06fc18b468d3214413932d5.png)
Topic input

![Screenshot 2024-11-10 014737.png](https://cdn.dorahacks.io/static/files/193154272573ace2280d00d424cace5a.png)
Experience input

![Screenshot 2024-11-10 024851.png](Uploading...)![Screenshot 2024-11-10 024851.png](https://cdn.dorahacks.io/static/files/1931545a6580706ada0680c4631823cc.png)
Roadmap

# Backend
Our backend begins by taking the topic the user wants to learn about and it uses the OpenAI API to get the topics seen in the checklist screen. The backend then sends in the prompt along with the context of what they already know and their learning style to generate the information to be displayed in the roadmap. Additionally, when the user clicks on a step in the roadmap our backend calls the AI API again, with more detailed information about the step and how they may achieve/work towards it, which is then formatted and displayed on the sidebar of the roadmap page.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Acknowledgments

We would like to extend our gratitude to the open-source community and the developers behind the libraries and frameworks that powered our project. This application would not have been possible without the following technologies:

Next.js: For enabling rapid development of our React application with server-side rendering and static site generation.

Tailwind CSS and tailwindcss-animate: For allowing us to create a beautiful, responsive UI with ease.

@mui/material and @emotion/react/styled: For providing customizable components and styling solutions to enhance our UI design.

Radix UI components: For providing accessible and highly customizable UI primitives, including Checkbox, Dialog, Tooltip, and more.

Framer Motion: For powering our animations and bringing fluid motion to the user experience.

Zod: For simplifying our data validation.

Graphology and vis-network: For making it easier to visualize and manage graph data.

OpenAI: For integration with advanced AI-powered services.

dotenv: For managing environment variables securely.

ESLint: For maintaining code quality and standards.
