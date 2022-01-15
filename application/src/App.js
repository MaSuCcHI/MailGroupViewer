import React, { useState} from 'react';

import './App.css';
import MailGroupViewer from './component/viewer/mailGroupView';
import DetailInfoViewer from './component/detailInfo/detailInfoView';
import Header from './component/header/header';

function App() {

  const [showDetailInfo,setShowDetailInfo] = React.useState(0)

  return (
    <div className="App">
      <Header/>
      <div className='MainApp'>
        <MailGroupViewer/>
        <DetailInfoViewer
          showDetailInfo={showDetailInfo}
          setShowDetailInfo={setShowDetailInfo}
        />
      </div>
      
    </div>
  );
}

export default App;
