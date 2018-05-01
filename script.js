// UI Handles
const quotesEl = document.getElementById('quote-box');
const quotesFormEl = document.getElementById('quotesForm');
const quotesIntroEl = document.getElementById('quotesIntro');
const quotesEndEl = document.getElementById('quotesEnd');
const quotesExitEl = document.getElementById('exitQuotes');
const quotesRestartEl = document.getElementById('restartQuotes');

// Handle for setInterval
let handle;
// Handle for reload Interval
let reloadHandle;
// Count for number of quotes
let count = 0;

// Starts quote on Submit
quotesFormEl.onsubmit = function(e) {
  e.preventDefault();
  const topicEl = document.getElementById('quotesTopic');
  const lengthEl = document.getElementById('quotesLength');
  const topic = topicEl.options[topicEl.selectedIndex].value;
  const length = lengthEl.options[lengthEl.selectedIndex].value;

  if (!topic) {
    alert('Please select quotes topic!');
    return;
  } else if (!length) {
    alert('Please select number of quotes!');
    return;
  } else {
    quotesIntroEl.style.display = 'none';
    generateRandomQuotesForTopic(topic, length);
  }
}

function generateRandomQuotesForTopic(selectedTopic, selectedLength) {
  let quotesArray = [];
  for(let i = 0; i < quotes.length; i++) {
    if(quotes[i].topic === selectedTopic) {
      quotesArray.push(quotes[i]);
    }
  }
  generateRandomQuote(quotesArray, selectedLength);
}

function generateRandomQuote(quotesArray, length) {
  const shuffled = getShuffledArray(quotesArray);
  let quote = shuffled[0];
  printQuotesOnScreen(shuffled, quote, length);
  // Call function to repeat quote generation
  handle = setInterval(function() {
    printQuotesOnScreen(shuffled, quote, length);
  }, 5000);
}

function printQuotesOnScreen(shuffled, obj, length){
  // Random background color
  document.getElementById('rgb').style.background = randomColor();
  // Make a new quote if its not the first one
  if(count != 0) {
    obj = shuffled[count];
  }
  let message = '<p class="quote">' + obj.quote + '</p>'; 
  message += '<p class="source">' + obj.source;
  if (obj.citation !== undefined && obj.year !== undefined) {
    message += '<span class="citation">' + obj.citation + '</span>'; 
    message += '<span class="year">' + obj.year + '</span>' + '</p>';
  }

  message += '<h4>' + obj.tags + '</h4>';
  quotesEl.innerHTML = message;
  count += 1;

  console.log(obj.quote);
  if(count == length) {
    clearInterval(handle);
    handle = 0;
    exitQuotes();
  }
}

function exitQuotes() {
  reloadHandle = setInterval(function() {
    reloadPage();
  }, 5000);
}


function reloadPage() {
  location.reload();
  clearInterval(reloadHandle);
  reloadHandle = 0;
}

function randomRGB() {
  return Math.floor(Math.random() * 256);
}

function randomColor() {
  var color;
  red = randomRGB();
  green = randomRGB();
  blue = randomRGB();
  color = 'rgb(' + red + ',' + green + ',' + blue + ')';
  return color;
}


function getShuffledArray (arr){
  let newArr = [...arr]
  for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]]=[newArr[rand], newArr[i]];
  }
  return newArr;
}
