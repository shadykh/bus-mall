
'use strict';

let productsArrayName= [
  'bag',
  'chair',
  'pet-sweep',
  'usb',
  'banana',
  'cthulhu',
  'scissors',
  'water-can',
  'bathroom',
  'dog-duck',
  'shark',
  'wine-glass',
  'boots',
  'dragon',
  'sweep',
  'breakfast',
  'tauntaun',
  'bubblegum',
  'pen',
  'unicorn'
];
let productsArray = [
  'bag.jpg',
  'chair.jpg',
  'pet-sweep.jpg',
  'usb.gif',
  'banana.jpg',
  'cthulhu.jpg',
  'scissors.jpg',
  'water-can.jpg',
  'bathroom.jpg',
  'dog-duck.jpg',
  'shark.jpg',
  'wine-glass.jpg',
  'boots.jpg',
  'dragon.jpg',
  'sweep.png',
  'breakfast.jpg',
  'tauntaun.jpg',
  'bubblegum.jpg',
  'pen.jpg',
  'unicorn.jpg'
];

const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const midImage = document.getElementById( 'midImage' );
const rightImage = document.getElementById( 'rightImage' );

let leftProductIndex = 0;
let midProductIndex = 0;
let rightProductIndex = 0;
const clickCounter = 25;

function Product( name, nameEx ) {
  this.name = name;
  this.nameEx=nameEx;
  this.image = `./img/${nameEx}`;
  this.clicks = 0;
  this.shown = 0;
  Product.all.push( this );
}

Product.all = [];
Product.counter = 0;

for( let i = 0; i < productsArray.length; i++ ) {
  new Product( productsArrayName[i],productsArray[i] );
}
let nextIndexGl =[];
function renderNewProduct() {

  let previuosIndex = nextIndexGl;
  do {
    let nextIndex = [];
    nextIndexGl= nextIndex;
    let leftIndex = randomNumber( 0, Product.all.length - 1 );
    leftImage.src = Product.all[leftIndex].image;
    leftImage.alt = Product.all[leftIndex].name;
    leftProductIndex = leftIndex;

    let rightIndex;
    do {
      rightIndex = randomNumber( 0, Product.all.length - 1 );
    } while( leftIndex === rightIndex );

    rightImage.src = Product.all[rightIndex].image;
    rightImage.alt = Product.all[rightIndex].name;
    rightProductIndex = rightIndex;

    let midIndex;
    do {
      midIndex = randomNumber( 0, Product.all.length - 1 );
    } while( midIndex === rightIndex || midIndex=== leftIndex );

    midImage.src = Product.all[midIndex].image;
    midImage.alt = Product.all[midIndex].name;
    midProductIndex = midIndex;

    Product.all[leftIndex].shown++;
    Product.all[midIndex].shown++;
    Product.all[rightIndex].shown++;
    nextIndexGl.push( leftIndex,midIndex,rightIndex );
  } while ( nextIndexGl.includes( previuosIndex[0] ) || nextIndexGl.includes( previuosIndex[1] ) || nextIndexGl.includes( previuosIndex[2] ) );

}
let button = document.getElementById( 'resultButton' );
button.style.visibility='hidden';

function handelClick( event ) {

  if( Product.counter <= clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'midImage' || clickedElement.id === 'rightImage' ) {

      if( clickedElement.id === 'leftImage' ) {
        Product.all[leftProductIndex].clicks++;
      }

      if( clickedElement.id === 'midImage' ) {
        Product.all[midProductIndex].clicks++;
      }

      if( clickedElement.id === 'rightImage' ) {
        Product.all[rightProductIndex].clicks++;
      }

      Product.counter++;
      renderNewProduct();

    }
  } else {
    button.style.visibility='visible';
    removeHandler();
  }
}

imageSection.addEventListener( 'click', handelClick );

function viewResult() {
  const parentElement = document.getElementById( 'results' );
  const ulElement = document.createElement( 'ul' );
  parentElement.appendChild( ulElement );
  for ( let i =0; i < Product.all.length; i++ ){
    const liElement = document.createElement( 'li' );
    ulElement.appendChild( liElement );
    liElement.textContent = `${Product.all[i].name} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].shown}  times.`;
  }

}

function removeHandler() {
  document.getElementById( 'imageSection' ).removeEventListener( 'click', handelClick );
}

function renderBars(){

  let nameLables = [];
  let dataValueClicks = [];
  let dataValueShown = [];

  for (let i = 0; i < Product.all.length; i++){
    nameLables.push(Product.all[i].name);
    dataValueClicks.push(Product.all[i].clicks);
    dataValueShown.push(Product.all[i].shown); 
  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameLables,
      datasets: [{
        label: 'Number of Clicks',
        data: dataValueClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },{
        label: 'Number of Shown',
        data: dataValueShown ,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}

// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

renderNewProduct();
