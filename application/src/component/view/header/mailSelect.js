import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { height } from '@mui/system';

import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function MailSelect({
  mailGroups,
  setMailGroups,
  selectedMailGroups,
  setSelectedMailGroups,
}) {

  useEffect(() => {

  },[mailGroups])

  if (mailGroups===undefined) { return(<div/>) }
  const t = Array.from(mailGroups.keys())
  return(
    <Autocomplete
      multiple
      // id="checkboxes-tags-demo"
      options={t}
      disableCloseOnSelect
      // getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ width: "65%" }}
      renderInput={(params) => (
        <TextField {...params} label="メールグループ"  />
      )}
      onChange={(event,value)=>{
        console.log(event)
        console.log(value)
        setSelectedMailGroups(value)
      }}
      // onInputChange={(event,newVal) => {
      //   console.log(event)
      //   console.log(newVal)
      //   if(mailGroups.has(newVal)){
      //     setSelectedMailGroups(newVal)
      //   }
      //  }}
    />
  )
}
