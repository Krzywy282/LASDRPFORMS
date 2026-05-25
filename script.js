const fields = {
  station: 'r_station',
  incident: 'r_incident',

  deputy: 'r_deputy',
  badge: 'r_badge',

  date: 'r_date',
  time: 'r_time',

  location: 'r_location',

  type: 'r_type',
  status: 'r_status',

  suspect: 'r_suspect',

  summary: 'r_summary'
};


// UPDATE REPORT
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


// EVENTS
Object.keys(fields).forEach(id => {

  const element = document.getElementById(id);

  if(element){

    element.addEventListener('input', updatePreview);
    element.addEventListener('change', updatePreview);

  }

});


// INITIAL
updatePreview();


// DOWNLOAD JPG
async function downloadImage(){

  try{

    const report = document.getElementById('report');

    const canvas = await html2canvas(report,{
      scale:2,
      backgroundColor:'#ffffff'
    });

    const link = document.createElement('a');

    link.download = 'critical-incident-report.jpg';
    link.href = canvas.toDataURL('image/jpeg',1.0);

    link.click();

  }catch(err){

    console.error(err);
    alert('Błąd pobierania.');
  }
}


// COPY IMAGE
async function copyImage(){

  try{

    const report = document.getElementById('report');

    const canvas = await html2canvas(report,{
      scale:2,
      backgroundColor:'#ffffff'
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