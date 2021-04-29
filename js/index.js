let isToggled = false;

function toggleMenu(e) {
  e.preventDefault();
  isToggled = !isToggled;

  if(isToggled) {
    document.getElementById('mob-nav').style.display = 'flex';
  } else {
    document.getElementById('mob-nav').style.display = 'none';
  }

}

let apiUrl = 'https://api.shrtco.de/v2/shorten';
let links = [];
let inputElement = document.getElementById('url');
let resultItems = document.getElementById('result');
let errMessage = document.getElementById('err-message');

function shortenUrl(e, el) {
  e.preventDefault();
  let url = inputElement.value;
  if(url) {
    errMessage.style.display = 'none';
    el.innerHTML = `<img src="./images/spinnervlll.gif" alt="" width="50px">`;
    $.ajax({
      url: apiUrl,
      data: {url: url},
      success: (response) => {

        resultItems.innerHTML += `
        <div class="item">
						<a href="${response.result.original_link}" class="old-url" target="_blank">${response.result.original_link}</a>
						<div>
							<a href="${response.result.full_short_link}" class="new-url" target="_blank">${response.result.full_short_link}</a>
							<button id="copyBtn" onclick="copyToClipboard(this)">Copy</button>
						</div>
					</div>`;

          url.value = '';
          el.innerHTML = `Shorten It!`;
      }
    });
  } else {
    errMessage.style.display = 'block';
    inputElement.style.borderColor = 'hsl(0, 87%, 67%)';
  }
}


function validInput() {
  let url = inputElement.value;
  if(url) {
    errMessage.style.display = 'none';
    inputElement.style.borderColor = '#fff';
  } else {
    errMessage.style.display = 'block';
    inputElement.style.borderColor = 'hsl(0, 87%, 67%)';
  }
}


function copyToClipboard(element) {
  const el = document.createElement('textarea');
  el.value = element.previousElementSibling.getAttribute('href');
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  element.innerHTML = 'Copied!';
  element.classList.add('copied');
  setTimeout(() => {
    element.innerHTML = 'Copy';
    element.classList.remove('copied');
  }, 2000);
}