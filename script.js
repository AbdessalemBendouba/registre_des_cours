let body = document.querySelector("body");

function setTheme(theme) {
  body.classList.remove('light', 'dark'); // Remove both classes
  body.classList.add(theme);
  localStorage.setItem('theme', theme); // Store in local storage
}

// Function to toggle the theme
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light'; // Get current theme or default to 'light'
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme); // Set the new theme
}

// Function to load the theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('light'); // Default to light theme if no theme is saved
  }
}

// pdf finder handler

async function getPdfPaths() {
    try {
      const response = await fetch('pdf_paths.json');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching PDF data:', error);
      return [];
    }
}

// pdf viewer

function basename(path) {
    return path.split('/').pop();
}

function showPaths(pdfData) {
    const CList = document.getElementById('CoursesList');
    const TList = document.getElementById('TDList');
    const PList = document.getElementById('TPList');
    
    for (const folder in pdfData) {
       const files = pdfData[folder];
        for (const filePath of files) {
            const fileName = basename(filePath);
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            link.href = filePath;
            link.textContent = fileName;
            link.target = '_blank';
            
            fetchSvgContent('./svg/pdf.svg') // Replace with the actual path
            .then(svgContent => {
              const svgElement = createSvgElement(svgContent);
              listItem.appendChild(svgElement);
            })
            .catch(error => {
              console.error('Error fetching SVG:', error);
            });
            
            listItem.appendChild(link);

            if (folder.toLowerCase() === 'td') {
                listItem.className = 'pdf-link td';
                TList.appendChild(listItem);

            } else if (folder.toLowerCase() === 'courses') {
                listItem.className = 'pdf-link courses';
                CList.appendChild(listItem);

            } else if (folder.toLowerCase() === 'tp') {
                listItem.className = 'pdf-link tp';
                PList.appendChild(listItem);

            }
        }
    }
}
  
// Call the functions 

function createSvgElement(svgCode) {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.innerHTML = svgCode;
    return svgElement;
}

function fetchSvgContent(svgPath) {
  return fetch(svgPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch SVG');
      }
      return response.text();
    });
}

getPdfPaths()
    .then(pdfData => {
        showPaths(pdfData);
    })
    .catch(error => {
        console.error('Error fetching PDF data:', error);
    });
