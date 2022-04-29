import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
  showDetailInfoMailGroups,
  setShowDetailInfoMailGroups
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
      style={{ width: "65%",alignItems: 'center', display:'flex' }}
      renderInput={(params) => (
        <TextField {...params} label="メールグループ"  />
      )}
      onChange={(event,value)=>{
        console.log('val')
        console.log(value)
        setSelectedMailGroups(value)
        setShowDetailInfoMailGroups(new Set(value))
      }}
    />
  )
}
