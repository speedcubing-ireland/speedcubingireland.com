# Speedcubing Ireland
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=speedcubingireland-com)](https://speedcubingireland.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This is the repo which runs [speedcubingireland.com](https://speedcubingireland.com/).

## Getting Started
Firstly, make sure you have git, a recent version of [Node.js](https://nodejs.org/en/), and [Yarn](https://yarnpkg.com/) installed.

To clone and enter the repo, run:

```bash
git clone https://github.com/speedcubing-ireland/speedcubingireland.com.git
cd speedcubingireland.com
```

Then, install the dependencies:

```bash
yarn install
```

You will need to set up a `.env` file in the root directory. You can use the `.env.example` file as a template.

To run the development server, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Pages

Pages are located in the `pages` directory. Each page is a React component exported from a `.tsx` file.
The posts in the pages/posts are generated from the `.mdx` files. A basic post looks like this:

```md
import Post from '../../components/posts/Post';

# Hello World
This is where the post content goes.

export default ({ children }) => <Post title="Post Title">{children}</Post>
```