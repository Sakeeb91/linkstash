# 🔗 LinkStash

> A modern, serverless link bookmarking application built with React and AWS Amplify

[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
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

# Start the Amplify sandbox for development
npm run sandbox

# In a new terminal, start the development server
npm start
```

The app will be running at `http://localhost:3000`

### First Time Setup

1. **Configure AWS CLI** (if not already done):
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID, Secret Access Key, and preferred region.

2. **Start Amplify Sandbox**:
   ```bash
   npm run sandbox
   ```
   This will deploy the backend resources to your AWS account and generate `amplify_outputs.json`.

3. **Run the Application**:
   ```bash
   npm start
   ```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, CSS Modules |
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
npm run sandbox   # Start Amplify sandbox
npm run deploy    # Deploy to AWS
npm run generate  # Generate GraphQL types
npm run console   # Open Amplify Console
```

### Environment Setup

The application uses AWS Amplify Gen 2, which generates configuration automatically. After running `npm run sandbox`, the following files are created:

- `amplify_outputs.json` - Backend configuration (auto-generated, gitignored)

---

## 📋 Roadmap

See the [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) for detailed development phases.

- [x] Project initialization
- [x] Phase 1.1: Initialize AWS Amplify Gen 2 Backend
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
