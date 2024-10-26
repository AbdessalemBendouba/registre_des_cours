let body = document.body;

function setTheme(theme) {
    document.body.classList.remove('light', 'dark'); // Remove both classes to ensure only one is active
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme); // Store the theme in local storage
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme'); //get theme from localStorage if it exists, otherwise get the theme from body if a theme class exists
    const newTheme = (currentTheme === 'dark' || (!currentTheme && body.classList.contains('dark')) ) ? 'light' : 'dark';
    setTheme(newTheme);
}


// file finder handler

async function fetchJsonFile(filePath) { //fetch json file function
    try {
        const response = await fetch(filePath);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching JSON file '${filePath}':`, error);
        return {}; // Return empty object to avoid further errors
    }
}

async function getFilePaths() {
    const fileTypes = ['pdf', 'doc', 'img', 'other', 'ppt', 'src', 'xls']; // Add other file types as needed
    const fileData = {};

    const fetchPromises = fileTypes.map(fileType => 
        fetchJsonFile(`${fileType}_paths.json`) // Assuming file names like pdf_paths.json, doc_paths.json, etc.
        .then(data => { fileData[fileType] = data; }) // Use file type as the key. If a file doesn't exist for a given type, that type's array will be undefined
    );
 
    try{ 
        await Promise.all(fetchPromises); // Wait for all fetches to complete 
        console.log("all files data :",fileData) // Log the complete file data 
        return fileData; //data will be undefined when a json file is not found for a declared file type 
    }catch(error){ 
        console.error("Error fetching JSON data :",error) 
        return {}; // Return empty object to avoid further errors.
    }
}


// file viewer

function basename(path) {
    return path.split('/').pop();
}

function getFileType(fileName) {  // Helper function to determine file type
    const ext = fileName.toLowerCase().split('.').pop();
    switch (ext) {
        case 'pdf': return 'pdf';
        case 'docx': return 'doc';
        case 'pptx': return 'ppt';
        case 'xlsx': return 'xls';
        case ".jpeg": case "jpg": case "png": case "gif": case "bmp": case "tiff": return 'img';
        case 'cpp': case 'c': case 'py': case 'sci': case 'm': case 'ipynb': return 'src';
        default: return 'oth'; 
    }
}

function showPaths(fileData) {
    const CList = document.getElementById('CoursesList');
    const TList = document.getElementById('TDList');
    const PList = document.getElementById('TPList');
    console.log(fileData);
    for (const folder in fileData) {
        const files = fileData[folder];
        console.log(files);
        for (const filePath of files) {
            const fileName = basename(filePath);
            const fileType = getFileType(fileName); // Get the file type
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            link.href = filePath;
            link.textContent = fileName;
            link.target = '_blank';

            const svgTargetPath = `./svg/${fileType}.svg`;

            fetchSvgContent(svgTargetPath) // Dynamic SVG path based on file type

            .then(svgContent => {
              const svgElement = createSvgElement(svgContent);
              listItem.appendChild(svgElement);
              listItem.appendChild(link);
            })
            .catch(error => {
              console.error('Error fetching SVG:', error);
              listItem.appendChild(link);
            });


            
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
  
// Call the functions and showing elements

function createSvgElement(svgCode) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
    return svgDoc.documentElement; // Directly return the <svg> element from the parsed SVG
}

function fetchSvgContent(svgPath) {
  return fetch(svgPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG from ${svgPath}`);
      }
      return response.text();
    });
}

getFilePaths()
.then(fileData => {
    showPaths(fileData);
}).catch(error => {
    console.error('Error fetching PDF data:', error);
});

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');
    
    //if a theme is stored in local storage add it to the body, else, default to light theme if no theme is found
    if (storedTheme) {
        setTheme(storedTheme);
    }else if(!document.body.classList.contains('dark')){
        setTheme('light')
    }
});
