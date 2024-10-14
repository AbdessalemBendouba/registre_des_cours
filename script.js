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
    
    for (const folder in pdfData) {
       const files = pdfData[folder];
        for (const filePath of files) {
            const fileName = basename(filePath);
            const listItem = document.createElement('li');
            
            const link = document.createElement('a');
            link.href = filePath;
            link.textContent = fileName;
            
            listItem.appendChild(link);
            
            if (folder.toLowerCase() === 'td') {
                listItem.className = 'pdf-link td';
                TList.appendChild(listItem);
            } else if (folder.toLowerCase() === 'courses') {
                listItem.className = 'pdf-link courses';
                CList.appendChild(listItem);
            }
        }
    }
}
  
// Call the functions 
getPdfPaths()
    .then(pdfData => {
        showPaths(pdfData);
    })
    .catch(error => {
        console.error('Error fetching PDF data:', error);
});
