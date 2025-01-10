const btnSearch = document.getElementById('btnSearch');
const btnclearSearch = document.getElementById('btnReset');

function fetchApi() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  console.log(input);
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const condition = data.hasOwnProperty(input) ? data[input] : null;
      if (condition) {
        for (let i = 0; i < condition.length; i++) {
          const description = condition[i].description;
          const name = condition[i].name;
          const imageUrl = condition[i].imageUrl;
          resultDiv.innerHTML += `<h2>${name}</h2>`;
          resultDiv.innerHTML += `<img src="${imageUrl}" alt="hjh" width="300" height="200">`;
          resultDiv.innerHTML += `<p><strong>Description:</strong> ${description}</p>`;
        }
        console.log(condition, typeof condition, condition.length);

        // const symptoms = condition.symptoms.join(', ');
        // const prevention = condition.prevention.join(', ');
        // const treatment = condition.treatment;

        // resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        // resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        // resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        // resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        // resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
      } else {
        resultDiv.innerHTML = 'Condition not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'Can not fetch data.';
    });
}
btnSearch.addEventListener('click', fetchApi);
// Example usage
// fetchApi('beach');

function resetForm() {
  document.getElementById('conditionInput').value = '';
}

btnclearSearch.addEventListener('click', resetForm);