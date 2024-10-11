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
      const response = await fetch('filefinder.php');
      const data = await response.json();
      // Access PDF paths from the data object
      return data;
    } catch (error) {
      console.error('Error fetching PDF data:', error);
      return [];
    }
  }

// pdf viewer

function showPaths(pdfData) {
    const CList = document.getElementById('CoursesList');
    const TList = document.getElementById('TDList');
        for (const folder in pdfData) {
            for (const filePath of pdfData[folder]) {
                const fileName = basename(filePath);
                const listItem = document.createElement('li');
                
                // Set color based on folder
                if (folder === 'td') {
                    listItem.className = 'pdf-link td';
                } else if (folder === 'courses') {
                    listItem.className = 'pdf-link courses';
                }

                const link = document.createElement('a');
                link.href = filePath;
                link.textContent = fileName;
            
                listItem.appendChild(link);

                if (folder === 'td') {
                    TList.appendChild(listItem);
                } else if (folder === 'courses') {
                    CList.appendChild(listItem);
                }
  
            }
        }
    }
