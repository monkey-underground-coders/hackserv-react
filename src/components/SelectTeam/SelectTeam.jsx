import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SelectTeam() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
        <FormControl className={classes.formControl}>
            <Select
            required
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="" disabled>
                    Выберите команду
                </MenuItem>
                <MenuItem value={1} >Team1</MenuItem>
                <MenuItem value={2}>Team2</MenuItem>
                <MenuItem value={3}>Team3</MenuItem>
            </Select>
        </FormControl>
  );
}