import { Meta, StoryObj } from '@storybook/angular';
import { ReviewFormComponent } from './review-form.component';

const meta: Meta<ReviewFormComponent> = {
  title: 'Components/ReviewForm',
  component: ReviewFormComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ReviewFormComponent>;

export const Default: Story = {
  args: {},
};
