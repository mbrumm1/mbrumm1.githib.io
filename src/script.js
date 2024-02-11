const nav = document.querySelector('.nav');
const navItems = [...nav.querySelectorAll('.nav-list li')];

// An event handler on one of the nav list items returns a target of the anchor
// inside of it.
// To get a reference to the clicked list item, we just grab the closest list item from event target.
nav.onclick = (event) => {
  const clickedItem = event.target.closest('li');
  
  if (!clickedItem) {
    return;
  }
  
  activateItem(clickedItem);
};

function activateItem(item) {
  navItems.forEach((navItem) => {
    navItem.classList.remove('active');
  })
  item.classList.add('active');
}

const sectionContainerObserverOptions = {
  root: document.querySelector('.section-container'),
  threshold: 0.75
};

const sectionContainerObserver = new IntersectionObserver(
  sectionContainerObserved, sectionContainerObserverOptions);

const sections = document.querySelectorAll('.section-container section');
sections.forEach((section) => {
  sectionContainerObserver.observe(section);
});

function sectionContainerObserved(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const item = document.querySelector(`.nav-item-${entry.target.id}`);
      activateItem(item);
    }
  });
};

let isMouseDown = false;
let startX = 0;
let scrollLeft= 0;
const sectionContainer = document.querySelector('.section-container');

//sectionContainer.addEventListener('mousedown', startDrag);
//sectionContainer.addEventListener('mouseup', endDrag);
//sectionContainer.addEventListener('mousemove', move);

function startDrag(event) {
  isMouseDown = true;
  startX = event.pageX;
  scrollLeft = sectionContainer.scrollLeft;
}

function endDrag(event) {
  isMouseDown = false;
}

function move(event) {
  event.preventDefault();
  
  if (!isMouseDown) {
    return;
  }
  
  const x = event.pageX - sectionContainer.offsetLeft;
  const scroll = x - startX;
  sectionContainer.scrollLeft = scrollLeft - (scroll * 15);
}


const aboutSection = document.querySelector('section.about');
const stateText = aboutSection.querySelector('.about h3');
aboutSection.addEventListener('scroll', (event) => {
  if (event.target.scrollTop > 600) {
    stateText.innerText = "WASHINGTON";
  }
  else {
    stateText.innerText = "LOUISIANA";
  }
});



