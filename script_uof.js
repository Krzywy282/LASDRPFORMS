const fields = {
  station: 'r_station',
  reportNo: 'r_reportNo',
  deputy: 'r_deputy',
  serial: 'r_serial',
  subject: 'r_subject',
  dob: 'r_dob',
  location: 'r_location',
  date: 'r_date',
  time: 'r_time',
  forceType: 'r_forceType',
  injury: 'r_injury',
  summary: 'r_summary'
};

function updatePreview(){

  for(const inputId in fields){

    const targetId = fields[inputId];

    const input = document.getElementById(inputId);
    const target = document.getElementById(targetId);

    target.textContent = input.value;
  }
}

Object.keys(fields).forEach(id => {

  document
    .getElementById(id)
    .addEventListener('input', updatePreview);

});

updatePreview();


// DOWNLOAD JPG
async function downloadImage(){

  const report = document.getElementById('report');

  const canvas = await html2canvas(report,{
    scale:2,
    backgroundColor:'#ffffff'
  });

  const link = document.createElement('a');

  link.download = 'use-of-force-report.jpg';
  link.href = canvas.toDataURL('image/jpeg',1.0);

  link.click();
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