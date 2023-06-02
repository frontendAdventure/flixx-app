const apiKey = '0bc9de3e7dc77bc172b2b2b61ea07bbe';
const kodOdczytuApi =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmM5ZGUzZTdkYzc3YmMxNzJiMmIyYjYxZWEwN2JiZSIsInN1YiI6IjY0NzljYTE2MTc0OTczMDBjMTMxYTgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._c8djm4FiGv6YDzY-dZ0f5mVu775SFOd6D8yUXg369Q';

const global = {
  currentPage: window.location.pathname,
};

function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }
    })
}



function init() {
  switch (global.currentPage) {
    case '/':
    case 'index.html':
      console.log('Home');
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('tv Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
