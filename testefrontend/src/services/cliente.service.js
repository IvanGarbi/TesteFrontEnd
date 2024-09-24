import api from "@/utils/api.js";

class ClienteService {

  async getCliente() {
    return await api().get(`/Cliente`);
  }

  async getClienteById(id) {
    return await api().get(`/Cliente/${id}`);
  }

  async putCliente(cliente, id) {
    return await api().put(`/Cliente/${id}`, cliente);
  }

  async postCliente(cliente) {
    return await api().post(`/Cliente`, cliente);
  }

  async deleteCliente(id) {
    return await api().delete(`/Cliente/${id}`);
  }
}

export default new ClienteService();