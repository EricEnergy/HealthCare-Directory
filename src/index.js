import 'normalize.css'
import './styles/app.scss'
import $ from 'jquery'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_'
let currentLetter = ''
const selected = ['_']
const listItems = []
let thisLetter = ''
let pass = false

// Render content to page
const renderList = (par1, par2) => {
  // Checks which array to use
  const check = pass ? par1 : listItems
  $('#listOf').empty()
  $('#alphaB').empty()
  currentLetter = ''

  // Renders Large Letters and the titles underneath
  check.forEach((e) => {
    thisLetter = e.title.charAt(0)
    if (thisLetter !== currentLetter) {
      currentLetter = thisLetter
      const el = $('<div>')
      el.addClass('row')
      el.attr('id', 'row' + currentLetter)
      const h2 = $('<h2>')
      h2.addClass('largeLetter')
      h2.text(currentLetter)
      $('#listOf').append(h2)
      $('#listOf').append(el)
      selected.push(currentLetter)
    }
    const word = $('<a>')
    word.attr('href', e.link)
    word.attr('title', e.title)
    word.addClass('intro')
    word.text(e.title)
    $('#row' + thisLetter).append(word)
  })

  // Add string of the alphabet to page with click function
  for (let i = 0; alphabet.length > i; i += 1) {
    const letterBtn = $('<strong>')
    letterBtn.attr('data-letter', alphabet[i])
    letterBtn.text(alphabet[i])

    // This section adds styling to the clickable letters
    if (par2 !== alphabet[i] && selected.includes(alphabet[i])) {
      letterBtn.css({ color: '#A3C8F1', cursor: 'pointer' })
    } else if (par2 === alphabet[i]) {
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

// Starts the application
$(() => {
  $.ajax(
    'https://ericenergy.github.io//HealthCare-Directory/assets/data.json'
  ).then((res) => {
    res.termList.forEach((element) => {
      listItems.push(element)
    })
    renderList()
  })
})

// Handles which letter a user clicks on
const renderClick = function () {
  const text = $(this).text()
  if (selected.includes(text)) {
    pass = true
    const arr =
      text === '_' ? listItems : listItems.filter((e) => e.title[0] === text)
    const arr2 = selected.filter((e) => e.charAt(0) === text)
    renderList(arr, ...arr2)
  }
}

$('#alphaB').on('click', 'strong', renderClick)
