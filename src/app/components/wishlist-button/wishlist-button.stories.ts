import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { WishlistButtonComponent } from './wishlist-button.component';
import { Store } from '../../core/store/store';
import { userReducer } from '../../state/user/user.reducer';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<WishlistButtonComponent> = {
  title: 'Components/WishlistButton',
  component: WishlistButtonComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), Store],
    }),
  ],
};

export default meta;
type Story = StoryObj<WishlistButtonComponent>;

export const NotInWishlist: Story = {
  args: {
    productId: '1',
  },
};

export const InWishlist: Story = {
  args: {
    productId: '2',
  },
};
