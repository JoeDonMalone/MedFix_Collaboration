let signupFormHandler = async (event) => {
    event.preventDefault();
  
    let name = document.querySelector('#name').value.trim();
    let dosage = document.querySelector('#dosage').value.trim();
    let regimen = document.querySelector('#regimen').value.trim();
    let length = parseInt(document.querySelector('#length').value.trim());
    let side_effects = document.querySelector('#side-effects').value.trim()
    let refill = document.querySelector('#refill').value.trim()
    let remindTime = `${document.getElementById('hour')}:${document.getElementById('minute')}`
  
    if (name && dosage && regimen && length && side_effects && ((refill == 'yes') || (refill == 'no'))) {
        if (refill == 'yes') refill = true
        if (refill == 'no') refill = false
        let days = {mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7}
        let remind_days = ''
        for (day of ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']) {
          if (document.getElementById(`reminder-${day}`).checked) {
            remind_days += days[day]
          }
        }

      let response = await fetch('/api/medication/add', {
        method: 'POST',
        body: JSON.stringify({
            name,
            dosage,
            regimen,
            length,
            side_effects,
            refill,
            remind_days,
            remindTime
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
          alert(response.statusText)
      } else {
        alert('successfully added medication!')
        document.location.replace('/userprofile')
      }
    } else {
      alert('invalid input')
    }
  };
  
  document
    .getElementById('medication-form')
    .addEventListener('submit', signupFormHandler);
  
  