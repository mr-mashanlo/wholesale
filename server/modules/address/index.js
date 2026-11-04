import { db } from '../../prisma/db.js';
import { AddressController } from './controller.js';
import { AddressRepository } from './repository.js';
import { AddressService } from './service.js';

const addressRepository = new AddressRepository( db );
const addressService = new AddressService( addressRepository );
export const addressController = new AddressController( addressService );
