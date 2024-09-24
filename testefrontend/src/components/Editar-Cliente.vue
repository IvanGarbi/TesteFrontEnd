<template>
  <div class="container mt-5">
    <h2>Editar Cliente</h2>
    <form @submit.prevent="editarCliente">
      <div class="mb-3">
        <label for="nomeEmpresa" class="form-label">Nome da Empresa</label>
        <input type="text" class="form-control" id="nomeEmpresa" v-model="nomeEmpresa" required />
      </div>

      <div class="mb-3">
        <label for="tamanhoEmpresa" class="form-label">Tamanho da Empresa</label>
        <input type="number" class="form-control" id="tamanhoEmpresa" v-model="tamanhoEmpresa" required />
      </div>

      <button type="submit" class="btn btn-primary">Salvar Alterações</button>
    </form>
  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import clienteService from "@/services/cliente.service.js";

const router = useRouter();
const nomeEmpresa = ref("");
const tamanhoEmpresa = ref(null);
const clienteId = ref("");

onMounted(() => {
  clienteId.value = router.currentRoute.value.params.id;
  fetchCliente();
});

const fetchCliente = async () => {
  try {
    const response = await clienteService.getClienteById(clienteId.value);
    nomeEmpresa.value = response.data.nomeEmpresa;
    tamanhoEmpresa.value = response.data.porteEmpresa;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    alert('Erro ao buscar cliente. Tente novamente mais tarde.');
  }
};

const editarCliente = async () => {

  const clienteAtualizado = {
    nomeEmpresa: nomeEmpresa.value,
    porteEmpresa: tamanhoEmpresa.value,
  };

  try {
    const { status } = await clienteService.putCliente(clienteAtualizado, clienteId.value);
    if (status == 200) {
      console.log('Cliente atualizado com sucesso:');
      alert('Cliente atualizado com sucesso!');
      router.push('/clientes');
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    alert('Ocorreu um erro ao atualizar o cliente. Tente novamente.');
    if (error.response.data != null) {
      for (let i = 0; i < error.response.data.length; i++) {
        alert(error.response.data[i].mensagem);
      }
    }
  }
};

</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>