document.body.classList.add('js-enabled')

const shoutForm = document.querySelector('.form-shout')

if (shoutForm) {
    shoutForm.addEventListener('submit', (event) => {
        if (event.submitter.nodeName == 'BUTTON') event.preventDefault()
    })

    const btnAddEmoji = shoutForm.querySelector('button')
    const inputText = shoutForm.querySelector('[name=text]')

    btnAddEmoji.addEventListener('click', (event) => {
        const emoji = event.target.textContent
        inputText.value += emoji 
    })
}


