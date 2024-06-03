import { Message } from './types';
import { faker } from '@faker-js/faker';

const getMessage = (): Message => ({
    id: faker.string.uuid(),
    text: '',
    createdDate: faker.date.recent().toISOString(),
    participantId: faker.helpers.arrayElement(['Supplier', 'Me']),
});

export const getThread = (count: number) =>
    Array.from({ length: count }, () => getMessage());
