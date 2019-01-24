import Header from './components/Header'

/* comentando pois estou usando lazy loading
import Mamatas from './components/mamata/Mamatas'
import MamatasHome from './components/mamata/MamatasHome'
import AdicionarMamata from './components/mamata/AdicionarMamata'
import Definicao from './components/Definicao'
import Formacao from './components/Formacao'
import Sobre from './components/Sobre'
import Login from './components/Login'
*/

const Mamatas = resolve => {
    require.ensure(['./components/mamata/Mamatas'], () => {
        resolve(require('./components/mamata/Mamatas'))
    })
}

const MamatasHome = resolve => {
    require.ensure(['./components/mamata/MamatasHome'], () => {
        resolve(require('./components/mamata/MamatasHome'))
    })
}

const AdicionarMamata = resolve => {
    require.ensure(['./components/mamata/AdicionarMamata'], () => {
        resolve(require('./components/mamata/AdicionarMamata'))
    })
}

const Definicao = resolve => {
    require.ensure(['./components/Definicao'], () => {
        resolve(require('./components/Definicao'))
    })
}

const Formacao = resolve => {
    require.ensure(['./components/Formacao'], () => {
        resolve(require('./components/Formacao'))
    })
}


const Sobre = resolve => {
    require.ensure(['./components/Sobre'], () => {
        resolve(require('./components/Sobre'))
    })
}

const Login = resolve => {
    require.ensure(['./components/Login'], () => {
        resolve(require('./components/Login'))
    })
}

export const routes = [
    { path: '/', component: Header },
    { path: '/mamatas', component: Mamatas, children: [
        { path: '', component: MamatasHome }, 
        { path: 'new', component: AdicionarMamata }
    ] },
    { path: '/definicao', component: Definicao },
    { path: '/formacao', component: Formacao },
    { path: '/sobre', component: Sobre },
    { path: '/login', component: Login },
    { path: '*', redirect: '/' }
]