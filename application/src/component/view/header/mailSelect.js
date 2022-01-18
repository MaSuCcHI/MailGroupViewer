import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setSelectedMailGroup(event.target.value)
  };

  // const getList = () => {
  //   if(mailGroups === undefined) {return(<MenuItem>test</MenuItem>)}
  // }

  // React.useEffect(() => {
  //   if(mailGroups === undefined) {return}
  //   const keys = Array.from(mailGroups.keys())
  //   console.log(keys)
  //   mailItemsList = keys.map((value)=>{
  //     return( 
  //       <MenuItem value={value}>tf a</MenuItem>
  //     )
  //   })
  //   console.log(mailItemsList)
  // },[mailGroups])
  
  return (
    <Box sx={{ minWidth: 420 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">メールグループ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedMailGroup}
          label="メールグループ"
          onChange={handleChange}
        >
          <MenuItem value="gA@test.com">Ten</MenuItem>
          <MenuItem value="gB@test.com">Twenty</MenuItem>
          <MenuItem value="gC@test.com">Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
