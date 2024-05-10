document.getElementById('searchBtn').addEventListener('click', async () => {
    try {
        const searchInput = document.getElementById('searchInput').value;

        const response = await fetch(`https://www.amiiboapi.com/api/amiibo/?name=${searchInput}`);

        if (!response.ok) {
            throw new Error('No se pudo completar la solicitud a la API');
        }

        const data = await response.json();
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (data.amiibo.length === 0) {
            resultsContainer.innerHTML = '<p class="text-red-500">No se encontraron resultados.</p>';
            return;
        }

        data.amiibo.forEach(amiibo => {
            const { name, image, gameSeries, character } = amiibo;

            /* Contenedores */
            const resultCard = `
                <div class="bg-gray-100 border border-gray-300 rounded-lg p-4 flex flex-col justify-between w-full shadow-md">
                    <img src="${image}" alt="${name}" class="mx-auto mb-2 w-24 h-24 rounded-full">
                    <div>
                        <p class="text-lg font-semibold text-gray-800">${name}</p>
                        <p class="text-sm text-gray-600"><span class="font-semibold">Serie:</span> ${gameSeries}</p>
                        <p class="text-sm text-gray-600"><span class="font-semibold">Personaje:</span> ${character}</p>
                    </div>
                </div>
            `;
            resultsContainer.insertAdjacentHTML('beforeend', resultCard);
        });
    } catch (error) {
        console.error('Se produjo un error:', error);
        alert('Se produjo un error al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
});