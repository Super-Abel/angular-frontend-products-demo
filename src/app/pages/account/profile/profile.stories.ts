import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { ProfileComponent } from './profile.component';
import { Store } from '../../../core/store/store';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

const meta: Meta<ProfileComponent> = {
  title: 'Pages/Profile',
  component: ProfileComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideRouter([]), Store],
    }),
  ],
};

export default meta;
type Story = StoryObj<ProfileComponent>;

export const Default: Story = {};
