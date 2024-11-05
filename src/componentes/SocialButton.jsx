// SocialButton.jsx
import { IconButton } from '@chakra-ui/react';

const SocialButton = ({ children, ...props }) => (
    <IconButton
        aria-label="Social Media"
        icon={children}
        variant="ghost"
        _hover={{ bg: 'transparent' }}
        {...props}
    />
);

export default SocialButton;