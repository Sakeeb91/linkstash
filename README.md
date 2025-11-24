# 🔗 LinkStash

> A modern, serverless link bookmarking application built with React and AWS Amplify

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS%20Amplify-Gen%202-ff9900?logo=aws-amplify)](https://docs.amplify.aws/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 About

LinkStash is a personal link bookmarking tool that helps you save, organize, and discover your bookmarks efficiently. Built on AWS Amplify's serverless infrastructure, it provides a fast, secure, and scalable solution that runs entirely within the AWS Free Tier.

### ✨ Features

- 🔐 **Secure Authentication** - Email/password sign-in via AWS Cognito
- 🔗 **Link Management** - Save, edit, delete, and organize bookmarks
- 🏷️ **Tagging System** - Flexible tag-based organization
- 📁 **Collections** - Group related links into collections
- 🔍 **Smart Search** - Search across titles, descriptions, and tags
- 📝 **Notes & Annotations** - Add personal notes to bookmarks
- 🌐 **Auto Metadata** - Automatically fetch title, description, and favicon
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🌙 **Dark Mode** - System-aware theme switching

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- AWS Account (free tier eligible)
- AWS CLI configured with credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/Sakeeb91/linkstash.git
cd linkstash

# Install dependencies
npm install

# Install Amplify CLI (if not already installed)
npm install -g @aws-amplify/cli

# Initialize Amplify sandbox for development
npx ampx sandbox

# Start the development server
npm start
```

The app will be running at `http://localhost:3000`

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, CSS Modules |
| **Authentication** | AWS Cognito |
| **API** | AWS AppSync (GraphQL) |
| **Database** | Amazon DynamoDB |
| **Storage** | Amazon S3 |
| **Functions** | AWS Lambda |
| **Hosting** | AWS Amplify Hosting |

---

## 📁 Project Structure

```
linkstash/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (routes)
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context providers
│   ├── services/       # API service layer
│   ├── types/          # TypeScript type definitions
│   ├── styles/         # Global styles and themes
│   └── utils/          # Utility functions
├── amplify/
│   ├── auth/           # Cognito configuration
│   ├── data/           # GraphQL schema & resolvers
│   ├── functions/      # Lambda functions
│   └── storage/        # S3 configuration
├── docs/               # Documentation
└── public/             # Static assets
```

---

## 🛠️ Development

### Available Scripts

```bash
npm start         # Start development server
npm run build     # Build for production
npm test          # Run tests
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

### Amplify Commands

```bash
npx ampx sandbox          # Start local development sandbox
npx ampx deploy           # Deploy to AWS
npx ampx generate         # Generate GraphQL types
npx ampx console          # Open Amplify Console
```

---

## 📋 Roadmap

See the [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) for detailed development phases.

- [x] Project initialization
- [ ] Phase 1: Authentication & Foundation
- [ ] Phase 2: Core Link Management
- [ ] Phase 3: Collections & Tags
- [ ] Phase 4: Search & Discovery
- [ ] Phase 5: Polish & Enhancement

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [AWS Amplify](https://docs.amplify.aws/) for the amazing serverless framework
- [React](https://reactjs.org/) for the UI library
- All the open-source contributors who make projects like this possible

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Sakeeb91">Sakeeb91</a>
</p>
