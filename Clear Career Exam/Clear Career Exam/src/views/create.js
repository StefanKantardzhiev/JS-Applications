import { createOffer } from '../views/api/data.js'
import { html } from '../lib.js'

const createTemplate = (onSubmit) =>
    html`
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form @submit=${onSubmit}class="create-form">
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
</section>
`

export async function createPage(ctx) {
    return ctx.render(createTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const title = formData.get('title')
        const description = formData.get('description')
        const image = formData.get('imageUrl')
        const category = formData.get('category')
        const requirements = formData.get('requirements')
        const salary = formData.get('salary')



        if (title == '' || description == '' || image == '' || category == '' || requirements == '' || salary == '') {
            return alert('All fields must be filled!')
        }

        await createOffer({
            title,
            description,
            image,
            category,
            requirements,
            salary
        })
        ctx.page.redirect('/')
    }
}