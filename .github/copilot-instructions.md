<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# TravelSim React Application

This is a React TypeScript application for a travel SIM card service built with Vite and Tailwind CSS.

## Project Structure
- Uses React with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for responsive design and styling
- Context API for state management (language switching)
- Lucide React for icons

## Key Features
- Multi-language support (English, Spanish, French, German, Chinese)
- Responsive design for mobile and desktop
- Language selector in the top bar
- Navigation with login/signup buttons
- SIM card purchase section ($30 for 7 days)
- Network coverage map
- Provider comparison tool
- Footer with contact information

## Code Style Guidelines
- Use functional components with hooks
- Import types separately when using verbatimModuleSyntax
- Follow Tailwind CSS utility-first approach
- Maintain consistent component structure
- Use TypeScript interfaces for type definitions
- Keep components focused and reusable

## Components Organization
- `/components/layout` - Layout components (Header, Footer, etc.)
- `/components/ui` - Reusable UI components
- `/components` - Feature-specific components
- `/context` - React context providers
- `/types` - TypeScript type definitions
