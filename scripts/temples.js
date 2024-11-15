const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
      },
      {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
      },
      {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
      },
      {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
      },
      {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
      },
      {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
      },

      {
        templeName: "Accra Ghana",
        location: "Accra, Greater Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-248708-high-res-print.jpg"
      },

      {
        templeName: "Barranquilla Colombia Temple",
        location: "Barranquilla, Colombia",
        dedicated: "2018, December, 9",
        area: 25349,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/barranquilla-colombia/400x250/3-Barranquilla-Columblia-Temple-2135198.jpg"
      },

      {
        templeName: "Calgary Alberta Temple",
        location: "Calgary, Alberta, Canada",
        dedicated: "2012, October, 28",
        area: 33000,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/calgary-alberta/400x250/calgary-alberta-temple-lds-1025065-wallpaper.jpg"
      },

      //Add more temple objects here...
    ];
  
      // Add more temple objects...
  
  function updateFooter() {
      const currentYear = new Date().getFullYear();
      const copyrightElement = document.getElementById('copyright');
      if (copyrightElement) {
          copyrightElement.textContent = `&copy; ${currentYear} Your Name`;
      }
      const lastModifiedDate = document.lastModified;
      const modifiedElement = document.getElementById('lastModified');
      if (modifiedElement) {
          modifiedElement.textContent = `Last modified: ${lastModifiedDate}`;
      }
  }
  
  function createTempleCard(temple) {
      const card = document.createElement('div');
      card.classList.add('temple-card');
      
      const image = document.createElement('img');
      image.src = temple.imageUrl;
      image.alt = temple.templeName;
      image.loading = 'lazy';
      
      const name = document.createElement('h2');
      name.textContent = temple.templeName;
      
      const location = document.createElement('p');
      location.textContent = temple.location;
      
      const dedicated = document.createElement('p');
      dedicated.textContent = `Dedicated: ${temple.dedicated}`;
      
      const area = document.createElement('p');
      area.textContent = `Area: ${temple.area} square feet`;
      
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(location);
      card.appendChild(dedicated);
      card.appendChild(area);
      
      return card;
  }
  
  function displayTemples(filteredTemples) {
      const templeContainer = document.getElementById('temple-container');
      templeContainer.innerHTML = '';
      filteredTemples.forEach(temple => {
          const card = createTempleCard(temple);
          templeContainer.appendChild(card);
      });
  }
  
  function filterTemples(filter) {
      let filteredTemples = [];
      switch (filter) {
          case 'old':
              filteredTemples = temples.filter(temple => {
                  const dedicatedYear = new Date(temple.dedicated).getFullYear();
                  return dedicatedYear < 1900;
              });
              break;
          case 'new':
              filteredTemples = temples.filter(temple => {
                  const dedicatedYear = new Date(temple.dedicated).getFullYear();
                  return dedicatedYear > 2000;
              });
              break;
          case 'large':
              filteredTemples = temples.filter(temple => temple.area > 90000);
              break;
          case 'small':
              filteredTemples = temples.filter(temple => temple.area < 10000);
              break;
          default:
              filteredTemples = temples;
              break;
      }
      displayTemples(filteredTemples);
  }

 
  document.addEventListener('DOMContentLoaded', () => {
      updateFooter();
      filterTemples('all');
  
      // Function to toggle mobile navigation menu
    function toggleMenu() {
        const navMenu = document.querySelector('nav ul');
        if (navMenu) {
        navMenu.classList.toggle('show');
    }
}

// Event listener for hamburger menu button
const hamburgerButton = document.getElementById('hamburger');
if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu);
}
const navLinks = document.querySelectorAll('nav ul li a');
      navLinks.forEach(link => {
          link.addEventListener('click', function(event) {
              event.preventDefault();
              const filter = this.id;
              filterTemples(filter);
          });
      });
  });
