# 🟢 Reusable UI Components: Button Component

A highly reusable, high-fidelity, and reactive UI component built specifically for the **School Management System (SMS)**. 

This component matches the brand guidelines and styling rules perfectly: featuring a rich forest-green primary action, sleek outline, and micro-interactive ghost variants.

---

## 🎨 Visual Preview

Here is how the three main variations correspond to the design specifications:

| Variant | Visual Appearance | Focus Use Case |
| :--- | :--- | :--- |
| **Primary** | Solid Forest Green (`#003d29`), White text, subtle drop shadow | Principal page actions, form submissions, approvals. |
| **Outline** | Transparent background, Forest Green border & text | Secondary actions, cancellations, step navigations. |
| **Ghost** | Completely flat, charcoal-green text (`#4a5d54`), background tint on hover | Inline lists, minor toolbar actions, dismissals. |

---

## 🚀 Key Features

- ⚡ **Signal-Based Architecture**: Fully uses Angular 21 reactive signals (`input()`) for lightning-fast performance and clean state management.
- ✨ **Tactile Micro-Interactions**: Dynamic scale shrinkage (`transform: scale(0.97)`) on press, smooth cubic-bezier transitions, and sleek custom overlays on hover.
- 🔄 **Integrated Spinner Loader**: Beautiful CSS-based loading state that disables the button and replaces left icons with a high-fidelity spinner to prevent layout shifts.
- 🧩 **FontAwesome Support**: Built-in support for prefix (`iconLeft`) and suffix (`iconRight`) icons.
- ♿ **Highly Accessible**: Supports native `:focus-visible` styling with custom glowing rings (`rgba(0, 61, 41, 0.35)`) and proper ARIA accessibility labels.

---

## 🛠️ API & Inputs Reference

The `<app-button>` component exposes the following inputs:

| Input | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style variant of the button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing scale determining padding, font-size, and height. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Underlying native HTML button element type. |
| `disabled` | `boolean` | `false` | Sets button to a greyed-out, inactive state. |
| `loading` | `boolean` | `false` | Shows custom loading spinner and disables user interaction. |
| `iconLeft` | `string \| undefined` | `undefined` | FontAwesome class name for a prefix icon (e.g., `'fa-solid fa-plus'`). |
| `iconRight` | `string \| undefined` | `undefined` | FontAwesome class name for a suffix icon (e.g., `'fa-solid fa-arrow-right'`). |
| `customClass` | `string` | `''` | Custom additional class strings to merge. |

---

## 💻 Code Examples

### 1. Basic Action Buttons
```html
<app-button variant="primary">Primary Action</app-button>
<app-button variant="outline">Outline Action</app-button>
<app-button variant="ghost">Ghost Action</app-button>
```

### 2. Sizing Configurations
```html
<app-button size="sm" variant="primary">Small Action</app-button>
<app-button size="md" variant="primary">Medium Action</app-button>
<app-button size="lg" variant="primary">Large Action</app-button>
```

### 3. Icon Integrations
```html
<app-button variant="primary" iconLeft="fa-solid fa-plus">Add Student</app-button>
<app-button variant="outline" iconRight="fa-solid fa-arrow-right">Next Page</app-button>
```

### 4. Interactive States (Loading/Disabled)
```html
<app-button variant="primary" [loading]="isLoading" [disabled]="isDisabled">
  Save Record
</app-button>
```

---

## 🎨 Global Design Tokens Used

The button styles are controlled via CSS custom properties on `:host` to make customization or theme-switching extremely easy:

```css
:host {
  --primary-color: #003d29;       /* Deep Forest Green */
  --primary-hover: #004d34;       /* Medium Emerald Green */
  --primary-active: #002c1e;      /* Ultra Deep Emerald Green */
  --primary-tint: rgba(0, 61, 41, 0.04);
  
  --ghost-color: #4a5d54;         /* Charcoal Green */
  
  --disabled-bg: #f1f5f9;         /* Slate Gray */
  --disabled-text: #94a3b8;

  /* Typography — inherited from :root, do not override */
  --font-family: var(--font-family); /* 'Atkinson Hyperlegible Next' */
}
```

### 🔤 Primary Typeface

All SMS components inherit the system font from the global `:root` token:

```css
/* styles.css — applied globally */
:root {
  --font-family: 'Atkinson Hyperlegible Next', 'Atkinson Hyperlegible', Arial, sans-serif;
}
```

**Atkinson Hyperlegible Next** was designed by the Braille Institute specifically for low-vision readers. Its exaggerated character differentiation (no two glyphs look alike) makes it ideal for a data-dense school management interface where accuracy matters — student IDs, grade values, dates, and names are always unambiguous.

Loaded via `<link rel="preconnect">` in `index.html` for optimal performance (no build-time network fetch).
