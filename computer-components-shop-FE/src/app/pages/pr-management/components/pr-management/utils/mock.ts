import { faker } from '@faker-js/faker';
import { FileVendor, PurchaseRequest, SelectOption, Supplier } from './types';

const getPurchaseRequest = (): PurchaseRequest => ({
    id: faker.number.int(1000),
    item: faker.number.int(1000),
    material: faker.commerce.product(),
    materialGroup: faker.number.int(1000),
    docType: faker.string.alpha({ length: 2, casing: 'upper' }),
    docCategory: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
    purchasingGroup: `P${faker.number.int(10)}`,
    plant: faker.number.int(10000),
    storageLocation: faker.number.int(100),
    deliveryDate: faker.date.recent().toISOString(),
    releaseDate: faker.date.recent().toISOString(),
    status: faker.helpers.arrayElement([
        'New',
        'In Progress',
        'Pending',
        'Send PR',
        'Send Addendum',
        'Addenum confirmed',
        'Creat PO',
    ]),
});

const getSuplier = (): Supplier => ({
    id: faker.number.int(10000),
    name: faker.company.name(),
    companyCode: faker.number.int(10000),
    rating: faker.number.int(10),
    purchased: faker.number.int(10),
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    vat: `GB${faker.number.int(10000000)}`,
    paymentBlock: faker.helpers.arrayElement(['Free for payment', ' ']),
    status: faker.helpers.arrayElement([
        'New',
        'In Progress',
        'Pending',
        'Send PR',
        'Send Addendum',
        'Addenum confirmed',
        'Creat PO',
    ]),
});

const getFileVendor = (): FileVendor => ({
    id: faker.number.int(1000),
    sentDate: faker.date.recent().toISOString(),
    label: faker.commerce.product(),
    vendor: faker.company.name(),
    channel: faker.helpers.arrayElement(['Email', 'Fax', 'Post', 'Chat']),
});

export const getPurchaseRequests = (count: number) =>
    Array.from({ length: count }, () => getPurchaseRequest());

export const getSupliers = (count: number) =>
    Array.from({ length: count }, () => getSuplier());

export const getFileVendors = (count: number) =>
    Array.from({ length: count }, () => getFileVendor());

export const getMaterials = (): SelectOption<string>[] => [
    {
        name: faker.commerce.product(),
        code: 'A',
    },
    {
        name: faker.commerce.product(),
        code: 'B',
    },
    {
        name: faker.commerce.product(),
        code: 'C',
    },
];

export const getMaterialGroups = (): SelectOption<string>[] => [
    {
        name: faker.number.int(1000),
        code: 'A',
    },
    {
        name: faker.number.int(1000),
        code: 'B',
    },
    {
        name: faker.number.int(1000),
        code: 'C',
    },
];

export const getStatuses = (): SelectOption<string>[] => [
    {
        name: 'New',
        code: 'A',
        value: 0
    },
    {
        name: 'In Progress',
        code: 'B',
        value: 1

    },
    {
        name: 'Send PR',
        code: 'D',
        value: 2
    },
    {
        name: 'Send Addendum',
        code: 'E',
        value: 3
    },
    {
        name: 'Addenum confirmed',
        code: 'F',
        value: 4
    },
    {
        name: 'Creat PO',
        code: 'G',
        value: 5
    },
];
