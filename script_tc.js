const fields = {
  station: 'r_station',
  report: 'r_report',
  deputy: 'r_deputy',
  serial: 'r_serial',

  date: 'r_date',
  time: 'r_time',

  location: 'r_location',

  driver1: 'r_driver1',
  vehicle1: 'r_vehicle1',

  partyType: 'r_partyType',
  partyDesc: 'r_partyDesc',

  weather: 'r_weather',
  road: 'r_road',

  injuries: 'r_injuries',
  hitrun: 'r_hitrun',

  summary: 'r_summary'
};


// UPDATE REPORT PREVIEW
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

    link.download = 'traffic-collision-report.jpg';
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