/*const focusableSelector = 'button, a, input, textarea'*/
/*Pour pouvoir fermer la modale je sauvegarde une variable qui sera nulle par défaut*/
let modal = null
/*let focusables = []
let previouslyFocusedElement = null*/

const openModal = async function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    /*pour afficher la boite modale, je le mets à null pour retirer le display none que j'avais mis. 
    C'est le display flex qui prendra le relais et ma boite sera affichée. Comme ça on saura quelle boite est ouverte.*/
    target.style.display = null
    /*voici la boite modale que je viens d'ouvrir*/
    modal = target
    modal.addEventListener('click', closeModal)
    modal.queryelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.queryselector('.js-modal-close').removeEventListener('click', closeModal)

    modal = null
}

/*je dois trouver l'élément qui est la cible par rapport au lien*/
const target = e.target.getAttribute('href')
if (target.startsWith('#')) {
    modal = document.querySelector(target)
} else {
    modal = await loadModal(target)
}
/*focusables = Array.from(modal.querySelectorAll(focusableSelector))
previouslyFocusedElement = document.querySelector(':focus')
modal.style.display = null
focusables[0].focus()
modal.removeAttribute('aria-hidden')
modal.setAttribute('aria-modal', 'true')
modal.addEventListener('click', closeModal)
modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)*/

/*
const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    /* Animation-direction reversed
    modal.style.display = "none"
    modal.offsetWidth
    modal.style.display = null
     */
modal.setAttribute('aria-hidden', 'true')
modal.removeAttribute('aria-modal')
modal.removeEventListener('click', closeModal)
modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)

/*Ce qui suit empêche le bug de l'ouverture de la modale plein de fois observé dans l'inspecteur !!! voir demande Open Cl*/
const hideModal = function () {
    modal.style.display = "none"
    modal.removeEventListener('animationend', hideModal)
    modal = null
}
modal.addEventListener('animationend', hideModal)


/*je clique n'importe où dans la boite modale et ça ferme la boite. 
Donc je vais créer une fonction pour empêcher la propagation de cet événement vers les parents.*/
const stopPropagation = function (e) {
    e.stopPropagation()
}

/*const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}*/

const loadModal = async function (url) {
    // TODO : Afficher un loader
    const target = '#' + url.split('#')[1]
    const exitingModal = document.querySelector(target)
    if (exitingModal !== null) return exitingModal
    const html = await fetch(url).then(response => response.text())
    const element = document.createRange().createContextualFragment(html).querySelector(target)
    if (element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
    document.body.append(element)
    return element
}
/*Je crée la fonction openModal*/
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)

})

/*Fonctionnement d'utilisation du clavier
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})*/