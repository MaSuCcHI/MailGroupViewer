import React, { useEffect, useState } from 'react';
import { mailGroups } from "./component/node/interface.ts"


import './App.css';
import MailGroupViewer from './component/view/mailGroupView/mailGroupView';
import DetailInfoViewer from './component/view/detailInfo/detailInfoView';
import Header from './component/view/header/header';
import UploadFileModal from './component/view/uploadModal/uplodaModal';

function App() {

  const [showDetailInfo,setShowDetailInfo] = React.useState(true)
  const [showImportDataModal,setShowImportDataModal] = React.useState(false)
  const [mailGroups,setMailGroups] = React.useState()

  useEffect(() => {
    console.log(showImportDataModal)
  })

  return (
    <div className="App">
      <Header className="Header"
        showImportDataModal={showImportDataModal}
        setShowImportDataModal={setShowImportDataModal}
        mailGroups={mailGroups}
        setMailGroups={setMailGroups}
      />
      <UploadFileModal
        showImportDataModal={showImportDataModal}
        setShowImportDataModal={setShowImportDataModal}
        mailGroups={mailGroups}
        setMailGroups={setMailGroups}
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
