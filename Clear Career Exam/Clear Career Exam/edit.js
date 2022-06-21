import { html, nothing, render } from '../../node_modules/lit-html/lit-html.js';
import { editOffer, getOfferById } from '../api/data.js';
import { getUserData } from '../util.js';


const editTemplate = (offer, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" .value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" .value=${offer.category} />
            <textarea id="job-description" name="description" .value=${offer.description} rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" .value=${offer.requirements} rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`


export async function editView(ctx) {

    const offer = await getOfferById(ctx.params.id);

    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let title = formData.get('title').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let category = formData.get('category').trim();
        let description = formData.get('description').trim();
        let requirements = formData.get('requirements').trim();
        let salary = formData.get('salary').trim();

        if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
            return alert('All fields must be filled!!');
        }

        await editOffer(ctx.params.id, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });

        ctx.page.redirect('/details/' + ctx.params.id);
    }
}






{/* <section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section> */}