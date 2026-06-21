import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const RadioSelect = ({ value, onChange, options, label, name }) => {
  const id = React.useId();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel
        id={`${id}-label`}
        sx={{
            color: 'black',
            '&.Mui-focused': { color: 'black' },
        }}
        >
  {label}
</FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${id}-label`}
        name={name}
        value={value}
        onChange={handleChange}
        sx={{ ml: 0, '& .MuiFormControlLabel-label': { ml: '-4px' } }}
      >
        {options.map((option) => (
          <FormControlLabel key={option} 
          sx={{ ml: 0, '& .MuiFormControlLabel-label': { ml: '-4px' } }}
          value={option} control={<Radio 
          sx={{
                //   color: 'orange',
                  '&.Mui-checked': { color: '#fe6a37'},
                  padding: '4px',
                }}
                />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};