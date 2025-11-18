import type { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from './products-list.component';
import { Product } from '../../core/models/product.models';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Mouse',
    price: 29.99,
    created_at: '2025-01-10',
    ratings: [{ id: 1, value: 4 }, { id: 2, value: 5 }],
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 89.99,
    created_at: '2025-01-12',
    ratings: [{ id: 3, value: 5 }, { id: 4, value: 5 }, { id: 5, value: 4 }],
  },
  {
    id: 3,
    name: 'USB-C Cable',
    price: 12.99,
    created_at: '2025-01-08',
    ratings: [{ id: 6, value: 3 }, { id: 7, value: 4 }],
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 45.0,
    created_at: '2025-01-15',
    ratings: [{ id: 8, value: 5 }],
  },
];

const meta: Meta<ProductsListComponent> = {
  title: 'Shop/ProductsList',
  component: ProductsListComponent,
  tags: ['autodocs'],
  argTypes: {
    products: {
      control: 'object',
      description: 'Array of products to display',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    totalCount: {
      control: 'number',
      description: 'Total count of products',
    },
  },
};

export default meta;
type Story = StoryObj<ProductsListComponent>;

export const Default: Story = {
  args: {
    products: mockProducts,
    loading: false,
    error: null,
    totalCount: 4,
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
    error: null,
    totalCount: 0,
  },
};

export const Error: Story = {
  args: {
    products: [],
    loading: false,
    error: 'Failed to load products. Please try again.',
    totalCount: 0,
  },
};

export const Empty: Story = {
  args: {
    products: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
    loading: false,
    error: null,
    totalCount: 1,
  },
};

export const ManyProducts: Story = {
  args: {
    products: [
      ...mockProducts,
      {
        id: 5,
        name: 'Monitor 27"',
        price: 299.99,
        created_at: '2025-01-14',
        ratings: [{ id: 9, value: 4 }],
      },
      {
        id: 6,
        name: 'Webcam HD',
        price: 79.99,
        created_at: '2025-01-16',
        ratings: [{ id: 10, value: 4 }, { id: 11, value: 3 }],
      },
    ],
    loading: false,
    error: null,
    totalCount: 50,
  },
};
