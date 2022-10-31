const searchImagesBtn = document.getElementById('search-images-btn');
const input = document.getElementById('searching-input');
let content = document.getElementsByClassName('content')[0];

const sendRequest = () =>{
  const requestURL = `https://api.unsplash.com/search/photos?query='+${input.value}+'&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

  const request = async (method, url, body = null) => {
    const repsonse = await fetch(url);
    return await repsonse.json();
  };

  request('GET', requestURL)
  .then(data => showImages(data))
  .catch(err => console.log(err));
}

const showImages = (data) => {
  // while (content.firstChild) {
  //   content.removeChild(content.firstChild)
  // };
  //or
  content.textContent ='';

  for (let i = 0; i < data.results.length; i++) {
    let image = document.createElement('div');
    image.className = 'image';
    image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
    content.appendChild(image);

    image.addEventListener('dblclick', function() {
      window.open(data.results[i].links.download, '_blank')
    })
  }
};

searchImagesBtn.addEventListener('click', function(){
  sendRequest();
  input.value = '';
});

input.addEventListener('keydown', event => {
  if( event.code === 'NumpadEnter' || event.code === 'Enter') {
    sendRequest();
    input.value = '';
  };
});
