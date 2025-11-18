import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { LoginFormComponent } from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  title: 'Shop/LoginForm',
  component: LoginFormComponent,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Loading state during authentication',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    submitForm: {
      action: 'submit',
      description: 'Emitted when form is submitted',
    },
  },
  args: {
    submitForm: fn(),
  },
};

export default meta;
type Story = StoryObj<LoginFormComponent>;

export const Default: Story = {
  args: {
    loading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
  },
};

export const WithError: Story = {
  args: {
    loading: false,
    error: 'Invalid username or password. Please try again.',
  },
};

export const NetworkError: Story = {
  args: {
    loading: false,
    error: 'Network error. Please check your connection and try again.',
  },
};

export const ServerError: Story = {
  args: {
    loading: false,
    error: 'Server error (500). Please try again later.',
  },
};

export const LoadingWithPreviousError: Story = {
  args: {
    loading: true,
    error: 'Previous error message',
  },
};
