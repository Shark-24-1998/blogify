# Text Editor MVC Architecture

This directory contains the text editor components following the Model-View-Controller (MVC) pattern.

## Architecture Overview

### Model Layer (`src/models/`)
- **`postModel.js`**: Handles data operations for posts and drafts
- **`imageModel.js`**: Handles image upload and deletion operations

### Controller Layer (`src/controllers/`)
- **`textEditorController.js`**: Main controller that manages business logic for the text editor
- **`postController.js`**: Handles draft and post operations
- **`imageController.js`**: Handles image-related operations

### View Layer (`src/components/text-editor/`)
- **`index.jsx`**: Main text editor component (orchestrates the view)
- **`AuthorSection.jsx`**: Author information input component
- **`StatusMessages.jsx`**: Status display component
- **`ActionButtons.jsx`**: Action buttons component
- **`EditorContainer.jsx`**: Editor wrapper with upload overlay
- **`menu-bar.jsx`**: Editor toolbar component
- **`preview-modal.jsx`**: Preview modal component
- **`CustomImageNode.jsx`**: Custom image node for the editor

### Hook Layer (`src/hooks/`)
- **`useTextEditor.js`**: Custom hook that uses the TextEditorController

## Data Flow

1. **User Interaction** → View Component
2. **View Component** → Custom Hook
3. **Custom Hook** → Controller
4. **Controller** → Model (for data operations)
5. **Model** → External Services (Firebase, API)
6. **Response flows back up** through the same chain

## Key Benefits

- **Separation of Concerns**: Business logic is separated from UI components
- **Testability**: Each layer can be tested independently
- **Maintainability**: Changes to business logic don't affect UI components
- **Reusability**: Controllers can be reused across different views
- **State Management**: Centralized state management through the controller

## Usage Example

```jsx
import { useTextEditor } from '@/hooks/useTextEditor';

function MyComponent() {
  const {
    title,
    authorName,
    saveStatus,
    setTitle,
    setAuthorName,
    saveDraft,
    publishPost
  } = useTextEditor(initialPostId);

  // Use the state and actions
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={saveDraft}>Save</button>
    </div>
  );
}
``` 