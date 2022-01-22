import React, { useEffect, useState } from 'react';
import { mailGroups } from "./component/node/interface.ts"


import './App.css';
import MailGroupViewer from './component/view/mailGroupView/mailGroupView';
import DetailInfoViewer from './component/view/detailInfo/detailInfoView';
import Header from './component/view/header/header';
import UploadFileModal from './component/view/uploadModal/uplodaModal';

function App() {

  const [showDetailInfo,setShowDetailInfo] = React.useState("")
  const [showImportDataModal,setShowImportDataModal] = React.useState("")
  const [mailGroups,setMailGroups] = React.useState()
  const [selectedMailGroup,setSelectedMailGroup] = React.useState("gA@test.com")

  return (
    <div className="App">
      <Header className="Header"
        showImportDataModal={showImportDataModal}
        setShowImportDataModal={setShowImportDataModal}
        mailGroups={mailGroups}
        setMailGroups={setMailGroups}
        selectedMailGroup={selectedMailGroup}
        setSelectedMailGroup={setSelectedMailGroup}
      />
      
      <div className='MainApp'>
        <UploadFileModal
          showImportDataModal={showImportDataModal}
          setShowImportDataModal={setShowImportDataModal}
          mailGroups={mailGroups}
          setMailGroups={setMailGroups}
        />
        <MailGroupViewer
          showDetailInfo={showDetailInfo}
          setShowDetailInfo={setShowDetailInfo}
          mailGroups={mailGroups}
          setMailGroups={setMailGroups}
          selectedMailGroup={selectedMailGroup}
          setSelectedMailgroup={setSelectedMailGroup}
        />
        <DetailInfoViewer
          showDetailInfo={showDetailInfo}
          setShowDetailInfo={setShowDetailInfo}
          mailGroups={mailGroups}
        />
      </div>
      
    </div>
  );
}

export default App;
