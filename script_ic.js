const fields = {
  station: 'r_station',
  incident: 'r_incident',
  deputy: 'r_deputy',
  serial: 'r_serial',

  date: 'r_date',
  time: 'r_time',

  location: 'r_location',

  type: 'r_type',
  priority: 'r_priority',

  suspect: 'r_suspect',
  victim: 'r_victim',

  arrest: 'r_arrest',
  medical: 'r_medical',

  narrative: 'r_narrative',
  evidence: 'r_evidence',
  witness: 'r_witness'
};


// UPDATE PREVIEW
function updatePreview(){

  for(const inputId in fields){

    const targetId = fields[inputId];

    const input = document.getElementById(inputId);
    const target = document.getElementById(targetId);

    if(input && target){
      target.textContent = input.value;
    }
  }
}


// LISTENERS
Object.keys(fields).forEach(id => {

  const element = document.getElementById(id);

  if(element){

    element.addEventListener('input', updatePreview);
    element.addEventListener('change', updatePreview);

  }

});


// INITIAL UPDATE
updatePreview();


// DOWNLOAD JPG
async function downloadImage(){

  try{

    const report = document.getElementById('reportSheet');

    const canvas = await html2canvas(report,{
      scale:2,
      backgroundColor:'#ffffff',
      useCORS:true
    });

    const link = document.createElement('a');

    link.download = 'incident-report.jpg';
    link.href = canvas.toDataURL('image/jpeg',1.0);

    link.click();

  }catch(err){

    console.error(err);
    alert('Błąd podczas pobierania.');

  }
}


// COPY IMAGE
async function copyImage(){

  try{

    const report = document.getElementById('reportSheet');

    const canvas = await html2canvas(report,{
      scale:2,
      backgroundColor:'#ffffff',
      useCORS:true
    });

    canvas.toBlob(async(blob)=>{

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);

      alert('Obraz został skopiowany.');

    });

  }catch(err){

    console.error(err);
    alert('Błąd kopiowania.');

  }
}