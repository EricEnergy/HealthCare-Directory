import 'normalize.css'
import './styles/app.scss'
import $ from 'jquery'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_'
let clickedLetter = ''
const selectable = ['_']
const listItems = []
let currentLetter = ''
let rerender = false

// Render content to page
const renderList = (par1, par2) => {
  if (rerender) {
    $('#listOf').empty()
    $('#alphaB').empty()
    clickedLetter = ''
  }

  // Checks which array to use
  const check = rerender ? par1 : listItems

  // Renders Large Letters and the titles underneath
  check.forEach((e) => {
    // Grabs first letter of the title to chec against
    currentLetter = e.title.charAt(0)
    // Below creates a large letter if one does not exsist on the page
    if (currentLetter !== clickedLetter) {
      clickedLetter = currentLetter
      const el = $('<div>')
      el.addClass('row')
      el.attr('id', 'row' + clickedLetter)
      const h2 = $('<h2>')
      h2.addClass('largeLetter')
      h2.text(clickedLetter)
      $('#listOf').append(h2)
      $('#listOf').append(el)
      if (!selectable.includes(par2)) {
        selectable.push(clickedLetter)
      }
    }
    // Adds the titles to the page
    const word = $('<a>')
    word.attr('href', e.link)
    word.attr('title', e.title)
    word.addClass('intro')
    word.text(e.title)
    $('#row' + currentLetter).append(word)
  })

  // Adds the alphabet to page
  // This was added at the bottom of the function
  // This is due to parms cannot be passed with out an arrow function
  // But I wanted to demo for loops and for each
  for (let i = 0; alphabet.length > i; i += 1) {
    const letterBtn = $('<strong>')
    letterBtn.attr('data-letter', alphabet[i])
    letterBtn.text(alphabet[i])

    // After clicking on a letter first if statement will be hit
    // Second else if will handle non clicked letters that are clickable
    if (par2 === alphabet[i]) {
      letterBtn.css({ color: '#A3C8F1', cursor: 'pointer' })
    } else if (selectable.includes(alphabet[i])) {
      letterBtn.css({
        color: '#1b76dd',
        cursor: 'pointer',
      })
    } else {
      letterBtn.css({ color: 'grey' })
    }
    $('#alphaB').append(letterBtn)
  }
}

// Starts the application by calling the JSON and pushing data
// If no data is present it will post a message
$(() => {
  $.ajax('https://ericenergy.github.io//HealthCare-Directory/assets/data.json')
    .then((res) => {
      res.termList.forEach((element) => {
        listItems.push(element)
      })
      renderList()
    })
    .catch(() => {
      const h2 = $('<h2>')
      h2.css({ textAlign: 'center' })
      h2.text('There is nothing to show here')
      $('#listOf').append(h2)
    })
})

// Handles which letter a user clicks on
const renderClick = function () {
  const text = $(this).text()
  if (selectable.includes(text)) {
    rerender = true
    const arr =
      text === '_' ? listItems : listItems.filter((e) => e.title[0] === text)
    const arr2 = selectable.filter((e) => e.charAt(0) === text)
    renderList(arr, ...arr2)
  }
}

$('#alphaB').on('click', 'strong', renderClick)
