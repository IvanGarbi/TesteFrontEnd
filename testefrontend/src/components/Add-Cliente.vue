<template>
  <div class="container mt-5">
    <h2>Adicionar Novo Cliente</h2>
    <form @submit.prevent="adicionarCliente">
      <div class="mb-3">
        <label for="nomeEmpresa" class="form-label">Nome da Empresa</label>
        <input type="text" class="form-control" id="nomeEmpresa" v-model="nomeEmpresa" required />
      </div>

      <div class="mb-3">
        <label for="tamanhoEmpresa" class="form-label">Tamanho da Empresa (número de funcionários)</label>
        <input type="number" class="form-control" id="tamanhoEmpresa" v-model="tamanhoEmpresa" required />
      </div>

      <button type="submit" class="btn btn-primary">Adicionar Cliente</button>
    </form>
  </div>
</template>



<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import clienteService from "@/services/cliente.service.js";

const router = useRouter();
const nomeEmpresa = ref("");
const tamanhoEmpresa = ref(null);


const adicionarCliente = async () => {

  const cliente = {
    nomeEmpresa: nomeEmpresa.value,
    porteEmpresa: tamanhoEmpresa.value,
  };

  try {
    const { status } = await clienteService.postCliente(cliente);
    if (status == 200) {
      console.log('Cliente adicionado com sucesso:');
      alert('Cliente adicionado com sucesso!');
      router.push('/clientes');
    }
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    alert('Ocorreu um erro ao adicionar o cliente. Tente novamente.');
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