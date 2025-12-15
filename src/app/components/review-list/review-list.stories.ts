import { Meta, StoryObj } from '@storybook/angular';
import { ReviewListComponent } from './review-list.component';

const meta: Meta<ReviewListComponent> = {
  title: 'Components/ReviewList',
  component: ReviewListComponent,
  tags: ['autodocs'],
  argTypes: {
    reviews: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<ReviewListComponent>;

export const Default: Story = {
  args: {
    reviews: [
      {
        id: 'r1',
        user: 'Alice',
        rating: 5,
        comment: 'Excellent produit, très satisfaite!',
        createdAt: '2024-03-01T10:00:00Z',
      },
      {
        id: 'r2',
        user: 'Bob',
        rating: 4,
        comment: 'Bon rapport qualité/prix',
        createdAt: '2024-03-02T14:30:00Z',
      },
      {
        id: 'r3',
        user: 'Charlie',
        rating: 3,
        comment: 'Correct mais peut mieux faire',
        createdAt: '2024-03-03T09:15:00Z',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    reviews: [],
  },
};

export const SingleReview: Story = {
  args: {
    reviews: [
      {
        id: 'r1',
        user: 'John',
        rating: 5,
        comment: 'Parfait!',
        createdAt: '2024-03-01T10:00:00Z',
      },
    ],
  },
};
