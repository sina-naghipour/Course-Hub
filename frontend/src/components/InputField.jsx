import React from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';

const InputField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  helperText,
  multiline = false,
  rows = 1,
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!error}>
      <TextField
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        error={!!error}
        multiline={multiline}
        rows={rows}
        variant="outlined"
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
          },
        }}
        {...props}
      />
      {(error || helperText) && (
        <FormHelperText sx={{ 
          mx: 0,
          fontSize: '0.75rem',
          lineHeight: 1.4,
        }}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputField;
