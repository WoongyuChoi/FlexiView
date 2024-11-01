# FlexiView

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=fff&labelColor=grey&color=62d9fb)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/WoongyuChoi/FlexiView/blob/main/LICENSE)
![Platform](https://img.shields.io/badge/platform-web-blue)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/WoongyuChoi/FlexiView)

<figure align="center">
    <img src="https://private-user-images.githubusercontent.com/138280607/382238966-0894edb3-8117-4a18-843b-a3dd38452147.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzA0NTI3NDcsIm5iZiI6MTczMDQ1MjQ0NywicGF0aCI6Ii8xMzgyODA2MDcvMzgyMjM4OTY2LTA4OTRlZGIzLTgxMTctNGExOC04NDNiLWEzZGQzODQ1MjE0Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEwMVQwOTE0MDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zZmZjYjcwNmI3MjBhZDQ5ZDVmMjhiNWFlNzJlOGZkZTZjMGQ1YWZmYTg3ZjZlNGEyMzBmZTE5OWJlYmE0NjZiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.FU6F8XZcVhSLOLIzBrGyF9v2enkFDGIJcbhrhGmYViM" width="80%"/>
</figure>

## Overview

FlexiView aims to streamline the development of responsive and aesthetically pleasing web interfaces. With MUI and Emotion for styling, developers can effortlessly adjust component styles, while Vite ensures fast reloads and smooth development experiences. This tool is perfect for those who need flexible, performance-focused solutions for complex UIs.

## Features

- **MUI Components**: Enjoy access to a wide variety of MUI components to quickly structure and style your UI.
- **Flexible Styling with Emotion**: Control every detail with powerful CSS-in-JS capabilities provided by Emotion.
- **TypeScript Support**: Use TypeScript for a type-safe, scalable codebase.
- **Vite for Fast Development**: Accelerate development with Vite's fast build times and hot module replacement (HMR).
- **Tree View Management**: Manage complex hierarchical data using custom tree views with extensive customization.

## Setup

1. Clone the repository:
    ```bash
    https://github.com/WoongyuChoi/FlexiView.git
    ```

2. Navigate into the project directory:
    ```bash
    cd react-chart-visualizer
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. To build for production:
    ```bash
    npm run build
    ```

## Usage

FlexiView provides a range of customizable components for building complex UIs. For example, you can use RichTreeView for displaying nested data structures, customize TreeItem components, and utilize MUI's extensive theme capabilities.

Here’s a simple setup for using a customized TreeItem component in FlexiView:

```tsx
import { CustomTreeItem } from './components/CustomTreeItem';

function App() {
  return (
    <RichTreeView
      items={menuTreeItems} // Array of items with hierarchical data
      slots={{ item: CustomTreeItem }}
      multiSelect
      checkboxSelection
    />
  );
}
```

## Project Structure

- **components/**: Contains reusable UI components.
- **utils/**: Utility functions for data conversion and transformations.
- **layout/**: Customizable layout components, including tree views and charts.
- **App.tsx**: Main application entry.

## License

This project is licensed under the MIT License.
