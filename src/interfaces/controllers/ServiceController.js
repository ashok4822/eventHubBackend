import { AddService, EditService, DeleteService, GetAllServices } from '../../application/use-cases/ServiceUseCases.js';
import { MongooseServiceRepository } from '../../infrastructure/repositories/MongooseRepositories.js';

const serviceRepository = new MongooseServiceRepository();

const addService = async (req, res) => {
  try {
    const addServiceUseCase = new AddService(serviceRepository);
    const service = await addServiceUseCase.execute(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editService = async (req, res) => {
  try {
    const editServiceUseCase = new EditService(serviceRepository);
    const service = await editServiceUseCase.execute(req.params.id, req.body);
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const deleteServiceUseCase = new DeleteService(serviceRepository);
    await deleteServiceUseCase.execute(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const getAllServicesUseCase = new GetAllServices(serviceRepository);
    const services = await getAllServicesUseCase.execute(req.query);
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { addService, editService, deleteService, getAllServices };
