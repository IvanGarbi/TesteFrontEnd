import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createRouter, createWebHistory } from 'vue-router';
import AddCliente from './components/Add-Cliente.vue';
import ListaClientes from './components/Lista-Clientes.vue';
import EditarCliente from './components/Editar-Cliente.vue';


const routes = [
  { path: '/adicionar-cliente', component: AddCliente },
  { path: '/clientes', component: ListaClientes },
  { path: '/editar-cliente/:id', name: 'editar-cliente', component: EditarCliente, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


createApp(App).use(router).mount('#app')
