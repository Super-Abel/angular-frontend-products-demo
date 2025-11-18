import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';

const meta: Meta<ProductCardComponent> = {
  title: 'Shop/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Product name',
    },
    price: {
      control: 'number',
      description: 'Product price in EUR',
    },
    created_at: {
      control: 'text',
      description: 'Product creation date (ISO format)',
    },
    avgRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Average rating (0-5)',
    },
  },
};

export default meta;
type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {
  args: {
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10',
    avgRating: 4.2,
  },
};

export const HighRated: Story = {
  args: {
    name: 'Premium Laptop',
    price: 1299.99,
    created_at: '2025-01-15',
    avgRating: 4.9,
  },
};

export const LowRated: Story = {
  args: {
    name: 'Budget Mouse',
    price: 9.99,
    created_at: '2024-12-20',
    avgRating: 2.3,
  },
};

export const NoRating: Story = {
  args: {
    name: 'New Product',
    price: 49.99,
    created_at: '2025-01-18',
    avgRating: undefined,
  },
};

export const Expensive: Story = {
  args: {
    name: 'Professional Workstation',
    price: 5999.0,
    created_at: '2025-01-01',
    avgRating: 4.7,
  },
};
