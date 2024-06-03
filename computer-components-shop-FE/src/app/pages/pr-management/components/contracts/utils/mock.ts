import { faker } from '@faker-js/faker';
import { Contract } from './types';

const getContract = (): Contract => ({
    id: faker.number.int(1000),
    sentDate: faker.date.recent().toISOString(),
    suplier: faker.company.name(),
    files: Array(1).fill(`File ${faker.number.int(10)}`),
});

export const getContracts = (count: number) =>
    Array.from({ length: count }, () => getContract());
