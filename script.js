let body = document.querySelector("body");
function toggletheme(){
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
    }else{
        body.classList.remove('dark');
        body.classList.add('light');
    }
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
    
    for (const folder in fileData) {
        const files = fileData[folder];
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

getFilePaths()
    .then(fileData => {
        showPaths(fileData);
    })
    .catch(error => {
        console.error('Error fetching PDF data:', error);
    });
