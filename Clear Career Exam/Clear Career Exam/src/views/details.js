import { html, render } from '../lib.js'
import { getUserData } from '../util.js'
import { deleteOffer, getOffersById } from './api/data.js'


const detailsTemplate = (offer, isOwner,onDelete) =>
    html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}a</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>
        ${offerControlsTemplate(offer, isOwner,onDelete)}

        <a href="" id="apply-btn">Apply</a>
    </div>
    </div>
</section>`
const offerControlsTemplate = (offer, isOwner,onDelete) => {
    if (isOwner) {
        return html`<div id="action-buttons">
    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>`
    } else {
        return null
    }
}

export async function detailsPage(ctx) {
    const offer = await getOffersById(ctx.params.id)

    const userData = getUserData()
    const isOwner = userData && userData.id == offer._ownerId
    ctx.render(detailsTemplate(offer, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${offer.title}`)

        if (choice) {
            await deleteOffer(ctx.params.id)
            ctx.page.redirect('/')
        }
    }

}


