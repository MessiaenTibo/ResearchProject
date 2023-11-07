// variables
const postsContainer = document.querySelector('.posts-container');
const postButton = document.querySelector('.post-btn');
let number = 1;

async function getPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos/' + number
  );
  const data = await response.json();
  return data;
}

function init() {
  console.log('init');
  postButton.addEventListener('click', () => {
    console.log('clicked');
    getPosts().then((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `<li>
      ${post.title}f</li>
        `;
      postsContainer.appendChild(postElement);
      number++;
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
