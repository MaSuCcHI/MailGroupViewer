import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function MailSelect({
  mailGroups,
  setMailGroups,
  selectedMailGroup,
  setSelectedMailGroup,
}) {

  useEffect(() => {

  },[mailGroups])

  if (mailGroups===undefined) { return(<div/>) }
  const t = Array.from(mailGroups.keys())
  return(
    <Autocomplete
      options={t}
      sx={{ width:300 }}
      renderInput={(prams) => <TextField {...prams} label="メールグループ" />}
      onInputChange={(event,newVal) => {
        console.log(event)
        console.log(newVal)
        if(mailGroups.has(newVal)){
          setSelectedMailGroup(newVal)
        }
      }}
    />
  )
}
