const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');
const imageGallery = document.getElementById('imageGallery');
const modalContainer = document.getElementById('modalContainer');
const modalContent = document.getElementById('modalContent');
const closeModalButton = document.getElementById('closeModal');
const viewMoreButton = document.getElementById('viewMoreButton');

const accessKey = '5QkRS7AyGSNbkRMyZ2wH8PqiEUqILm4RvKujcj76pM0';
let page = 1;
let currentQuery = '';

function fetchImages(query, page) {
	const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${accessKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			displayImages(data.results);
			if (data.results.length === 0) {
				viewMoreButton.style.display = 'none';
			} else {
				viewMoreButton.style.display = 'block';
			}
		})
		.catch(error => console.log(error));
}

function displayImages(images) {
	if (page === 1) {
		imageGallery.innerHTML = '';
	}

	images.forEach(image => {
		const imageCard = document.createElement('div');
		imageCard.classList.add('image-card');

		const imageItem = document.createElement('div');
		imageItem.classList.add('image-item');
		imageItem.innerHTML = `
      <img src="${image.urls.regular}" alt="${image.alt_description}">
      <p>Photographer: ${image.user.name}</p>
      <p>Created at: ${new Date(image.created_at).toLocaleDateString()}</p>
      <button class="view-more">Details</button>
    `;

		const viewMoreButton = imageItem.querySelector('.view-more');
		viewMoreButton.addEventListener('click', () => openModal(image));

		imageCard.appendChild(imageItem);
		imageGallery.appendChild(imageCard);
	});
}

function handleFormSubmit(event) {
	event.preventDefault();
	const query = searchQuery.value;
	currentQuery = query;
	page = 1;
	fetchImages(query, page);
}

function handleViewMore() {
	page++;
	fetchImages(currentQuery, page);
}


function openModal(image) {
	modalContent.innerHTML = `
    <img src="${image.urls.regular}" alt="${image.alt_description}">
    <p>Photographer: ${image.user.name}</p>
    <p>Location: ${image.location ? image.location.title : 'Not specified'}</p>
    <p>Likes: ${image.likes}</p>
    <p>Description: ${image.description ? image.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ac urna gravida, sed interdum metus efficitur. Suspendisse lacinia velit a maibulum dui commodo.'}</p>
    <p>Created at: ${new Date(image.created_at).toLocaleDateString()}</p>
  `;
	modalContainer.style.display = 'block';
}

function closeModal() {
	modalContainer.style.display = 'none';
}

searchForm.addEventListener('submit', handleFormSubmit);
closeModalButton.addEventListener('click', closeModal);
viewMoreButton.addEventListener('click', handleViewMore);

// Go Back
function goBack() {
	history.back()
}