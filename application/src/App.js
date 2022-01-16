import React, { useEffect, useState } from 'react';

import './App.css';
import MailGroupViewer from './component/view/mailGroupView/mailGroupView';
import DetailInfoViewer from './component/view/detailInfo/detailInfoView';
import Header from './component/view/header/header';
import UploadFileModal from './component/view/uploadModal/uplodaModal';

function App() {

  const [showDetailInfo,setShowDetailInfo] = React.useState(true)
  const [showImportDataModal,setShowImportDataModal] = React.useState(false)
  const [mailGroupInfo,setMailgroupInfo] = React.useState()

  useEffect(() => {
    console.log(showImportDataModal)
  })

  return (
    <div className="App">
      <Header className="Header"
        showImportDataModal={showImportDataModal}
        setShowImportDataModal={setShowImportDataModal}
        mailGroupInfo={mailGroupInfo}
        setMailgroupInfo={setMailgroupInfo}
      />
      <UploadFileModal
        showImportDataModal={showImportDataModal}
        setShowImportDataModal={setShowImportDataModal}
      />
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
