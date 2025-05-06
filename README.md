-**This is the structure**

css
html 
(images folder is inside the html)




- **CSS and JavaScript Placement**: 
  - In most HTML files, **CSS** is stored separately in the `css/` folder. The corresponding CSS file is linked in the HTML files using relative paths like this:
    ```html
    <link rel="stylesheet" href="../css/your-style.css">
    ```
  - **JavaScript** files are also linked separately in the HTML files.

- **Special Cases: `requestprocessing.html` and `withdraw.html`**:
  - These two HTML files are exceptions in the project. They include **both CSS and JavaScript** directly inside the HTML file.
    - For `requestprocessing.html`, the CSS and JavaScript are embedded within the file for dynamic functionality.
    - The same applies to `withdraw.html`.
  
  This deviation is made for specific use cases where inline styling and scripting are required. Please review these files carefully before making any changes.

- **Images**:
  - All images used across the project are located within the `html/` folder. They are referenced in the HTML files with relative paths like this:
    ```html
    <img src="../images/your-image.png" alt="Image description">
    ```
  - Ensure that the image paths remain consistent when working with these files.

## How to View

1. Open `html/index.html` in your browser.
2. Ensure that CSS files are correctly linked, especially for the files that reference CSS from the `css/` folder.
3. Ensure the images are accessible from the `html/` folder.

## 🛠️ Built With

- **HTML5** – Markup language for structuring the content.
- **CSS3** – Styling for the front-end layout.
- **JavaScript** – For dynamic interactions on specific pages.

