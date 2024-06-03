import { faker } from '@faker-js/faker';
import { FileSubmitted } from './types';

const getFileSubmitted = (): FileSubmitted => ({
    id: faker.number.int(1000),
    sentDate: faker.date.recent().toISOString(),
    name: `File ${faker.number.int(10)}`,
    vendor: faker.company.name(),
    channel: faker.helpers.arrayElement(['Email', 'Fax', 'Post', 'Chat']),
});

export const getFileSubmitteds = (count: number) =>
    Array.from({ length: count }, () => getFileSubmitted());
