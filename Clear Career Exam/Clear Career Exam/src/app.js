import { html, page, render } from './lib.js'
import * as api from './views/api/data.js'
import { createPage } from './views/create.js'
import { dashboardPage } from './views/dashboard.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { getUserData ,clearUserData} from '../src/util.js'
import { logout } from '../src/api.js'
import { detailsPage } from './views/details.js'
import { editView } from './views/edit.js'
const root = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', onLogout);



page(decorateContext)


page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/details/:id',detailsPage)
page('/dashboard', dashboardPage)
page('/edit/:id',editView)



window.api = api

updateUserNavigation()
page.start()



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNavigation = updateUserNavigation
    next()
}


export function updateUserNavigation() {
    const userData = getUserData()
    if (userData) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
        
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'

    }
}

function onLogout() {
    logout()
    clearUserData()
    updateUserNavigation()
    page.redirect('/')
}