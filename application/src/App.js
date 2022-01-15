import React, { useState } from 'react';

import './App.css';
import MailGroupViewer from './component/view/mailGroupView/mailGroupView';
import DetailInfoViewer from './component/view/detailInfo/detailInfoView';
import Header from './component/view/header/header';

function App() {

  const [showDetailInfo,setShowDetailInfo] = React.useState(true)
  const [mailGroupInfo,setMailgroupInfo] = React.useState()
  return (
    <div className="App">
      <Header/>
      <div className='MainApp'>
        <MailGroupViewer
          showDetailInfo={showDetailInfo}
          setShowDetailInfo={setShowDetailInfo}
        />
        <DetailInfoViewer
          showDetailInfo={showDetailInfo}
          setShowDetailInfo={setShowDetailInfo}
        />
      </div>
      
    </div>
  );
}

export default App;
