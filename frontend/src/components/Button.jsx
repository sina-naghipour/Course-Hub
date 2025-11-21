import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'contained',
  size = 'medium',
  disabled = false,
  onClick,
  href,
  component,
  to,
  sx = {},
  ...props
}) => {
  const sizeProps = {
    small: { padding: '8px 16px' },
    medium: { padding: '12px 24px' },
    large: { padding: '16px 32px' },
  }[size];

  return (
    <MuiButton
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      href={href}
      component={component}
      to={to}
      sx={{
        borderRadius: 0,
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.5px',
        boxShadow: 'none',
        ...sizeProps,
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: variant === 'contained' ? 'primary.dark' : 'grey.100',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
