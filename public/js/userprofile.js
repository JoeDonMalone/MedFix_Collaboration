async function deleteMed(medId) {
    const response = await fetch('/api/medication/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({med_id: medId})
      });
    
      if (response.ok) {
        alert('med deleted')
        location.reload()
      } else {
        alert(response.statusText);
      }
}