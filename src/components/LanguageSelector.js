import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  '& .MuiSelect-icon': { color: 'inherit' },
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: selected ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const Flag = ({ country, ...props }) => (
  <Box
    component="img"
    src={`https://flagcdn.com/w20/${country}.png`}
    srcSet={`https://flagcdn.com/w40/${country}.png 2x`}
    width="20"
    height="15"
    alt={`${country} flag`}
    {...props}
  />
);

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <StyledSelect
      value={i18n.language}
      onChange={changeLanguage}
      variant="outlined"
      size="small"
    >
      <StyledMenuItem value="en" selected={i18n.language === 'en'}>
        <Flag country="gb" /> EN
      </StyledMenuItem>
      <StyledMenuItem value="es" selected={i18n.language === 'es'}>
        <Flag country="es" /> ES
      </StyledMenuItem>
      <StyledMenuItem value="pt" selected={i18n.language === 'pt'}>
        <Flag country="br" /> PT
      </StyledMenuItem>
    </StyledSelect>
  );
};

export default LanguageSelector;
