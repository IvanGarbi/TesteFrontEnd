<template>
  <div class="container mt-5">
    <h2>Lista de Clientes</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome da Empresa</th>
          <th>Tamanho da Empresa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nomeEmpresa }}</td>
          <td>{{ cliente.tamanhoEmpresa }}</td>
          <td>
            <button class="btn btn-warning me-2" @click="editarCliente(cliente.id)">Editar</button>
            <button class="btn btn-danger" @click="excluirCliente(cliente.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import clienteService from "@/services/cliente.service.js";

const router = useRouter();
const clientes = ref([]);

onMounted(() => {
  fetchClientes();
});

const fetchClientes = async () => {
  try {
    const response = await clienteService.getCliente('/Cliente');
    clientes.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    alert('Erro ao buscar clientes. Tente novamente mais tarde.');
  }
};


const editarCliente = async (id) => {
  router.push({ name: 'editar-cliente', params: { id } });
};


const excluirCliente = async (id) => {
  try {
    await clienteService.deleteCliente(id);
    clientes.value = clientes.value.filter(cliente => cliente.id !== id);
    alert('Cliente excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    alert('Erro ao excluir cliente. Tente novamente.');
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>