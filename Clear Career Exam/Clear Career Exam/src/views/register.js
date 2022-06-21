import { register } from '../api.js'
import { html } from '../lib.js'

const registerTemplate = (onSubmit) =>
    html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`

export async function registerPage(ctx) {
    return ctx.render(registerTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const email = formData.get('email').trim()
        const password = formData.get('password').trim()
        const confPass = formData.get('re-password').trim()


        if (email == '' || password == '' || confPass == '') {
            return alert('All fields must be filled!')
        }

        if (password !== confPass) {
            return alert('Passwords don`t match!')
        }

        await register(email, password);

        // ctx.updateUserNavigation()
        ctx.page.redirect('/')
    }
}