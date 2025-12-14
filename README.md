# AI Code Explainer

A modern, minimalistic web application that helps developers understand code through AI-powered explanations. Built with Next.js and Tailwind CSS, this tool provides clear, beginner-friendly explanations of code snippets with simple explanations, detailed breakdowns, and real-world analogies.

## Features

- 🤖 **AI-Powered Explanations** - Get intelligent code explanations powered by OpenAI GPT-4o-mini
- 🎨 **Minimalistic Design** - Clean, modern UI with a white background and classy color palette
- 📝 **Multiple Language Support** - Supports JavaScript, Python, Java, and other languages
- 📖 **Three-Tier Explanations**:
  - **Simple Explanation** - Quick overview for beginners
  - **What This Code Does** - Detailed step-by-step breakdown
  - **Real-World Analogy** - Relatable analogies to help understand concepts
- 🚀 **Fast & Responsive** - Optimized for performance with a fixed-height, non-scrollable layout
- 💻 **Code Editor** - Large, scrollable textarea for pasting code of any length

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **AI Integration**: OpenAI API
- **Fonts**: Geist Sans & Geist Mono

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MohitMehtre/ai-code-explainer.git
cd ai-code-explainer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Select Language**: Choose the programming language of your code from the dropdown (JavaScript, Python, Java, or Other)

2. **Paste Code**: Paste your code snippet into the large textarea. The textarea is scrollable, so you can paste code of any length.

3. **Explain Code**: Click the "Explain Code" button to generate an AI-powered explanation.

4. **View Results**: The explanation will appear in the right panel with three sections:
   - **Simple Explanation**: A brief overview of what the code is
   - **What This Code Does**: A detailed step-by-step explanation
   - **Real-World Analogy**: A relatable analogy to help understand the concept

## Project Structure

```
ai-code-explainer/
├── app/
│   ├── api/
│   │   └── explain/
│   │       └── route.ts          # API endpoint for code explanation
│   ├── globals.css                # Global styles with Tailwind
│   ├── layout.tsx                 # Root layout component
│   └── page.tsx                   # Main page component
├── public/                        # Static assets
├── .env.local                     # Environment variables (not in git)
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## API Endpoint

The application uses a Next.js API route at `/api/explain` that:

- Accepts POST requests with `code` and `language` parameters
- Uses OpenAI GPT-4o-mini to generate explanations
- Returns structured JSON with three explanation types

### Request Format

```json
{
  "code": "your code here",
  "language": "JavaScript"
}
```

### Response Format

```json
{
  "simpleExplanation": "Brief explanation...",
  "whatItDoes": "Detailed explanation...",
  "realWorldAnalogy": "Analogy explanation..."
}
```

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/MohitMehtre/ai-code-explainer).

---

Built with ❤️ using Next.js and OpenAI
