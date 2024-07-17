import { DirectionsController } from '../../controllers/DirectionsController';
import { PostgresDirectionsRepository } from '../../repositories/PostgresDirectionRepository';
import { DirectionService } from '../../../aplication/Use-Cases/DirectionService';

const directionRepository = new PostgresDirectionsRepository();
const directionService = new DirectionService(directionRepository);
const directionController = new DirectionsController(directionService);

export { directionController, directionService };

