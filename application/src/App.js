import React, { useEffect, useState } from 'react';
import { mailGroups } from "./component/node/interface.ts"


import './App.css';
import MailGroupViewer from './component/view/mailGroupView/mailGroupView';
import VennGroupViewer from './component/view/vennGroupView/vennGroupView';
import DetailInfoViewer from './component/view/detailInfo/detailInfoView';
import Header from './component/view/header/header';
import UploadFileModal from './component/view/uploadModal/uplodaModal';
import AuthGoogleModal from './component/view/authGoogleModal/authGoogleModal';


function App() {

  const [showDetailInfo,setShowDetailInfo] = React.useState("")
  const [showImportDataModal,setShowImportDataModal] = React.useState("")
  const [showImportDataFromSpleadsheet,setShowImportDataFromSpleadsheet] = React.useState("")
  const [mailGroups,setMailGroups] = React.useState()
  const [selectedMailGroups,setSelectedMailGroups] = React.useState([])
  const [viewMode,setViewMode] =React.useState("Diagram")

  return (
    <div className="App">
      <Header className="Header"
        showImportDataModal={showImportDataModal}
        setShowImportDataModal={setShowImportDataModal}
        showImportDataFromSpleadsheet={showImportDataFromSpleadsheet}
        setShowImportDataFromSpleadsheet={setShowImportDataFromSpleadsheet}
        mailGroups={mailGroups}
        setMailGroups={setMailGroups}
        selectedMailGroups={selectedMailGroups}
        setSelectedMailGroups={setSelectedMailGroups}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <div className='MainApp'>
        <UploadFileModal
          showImportDataModal={showImportDataModal}
          setShowImportDataModal={setShowImportDataModal}
          mailGroups={mailGroups}
          setMailGroups={setMailGroups}
        />
        <AuthGoogleModal
         showImportDataFromSpleadsheet={showImportDataFromSpleadsheet}
         setShowImportDataFromSpleadsheet={setShowImportDataFromSpleadsheet}
         mailGroups={mailGroups}
         setMailGroups={setMailGroups}
        /> 
        {viewMode==='Diagram' && (
        <MailGroupViewer
            showDetailInfo={showDetailInfo}
            setShowDetailInfo={setShowDetailInfo}
            mailGroups={mailGroups}
            setMailGroups={setMailGroups}
            selectedMailGroups={selectedMailGroups}
            setSelectedMailgroups={setSelectedMailGroups}
          />)}
        <DetailInfoViewer
          showDetailInfo={showDetailInfo}
          etShowDetailInfo={setShowDetailInfo}
          mailGroups={mailGroups}
        />

        {viewMode==="Venn" && (
        <VennGroupViewer
            showDetailInfo={showDetailInfo}
            setShowDetailInfo={setShowDetailInfo}
            mailGroups={mailGroups}
            setMailGroups={setMailGroups}
            selectedMailGroups={selectedMailGroups}
            setSelectedMailgroups={setSelectedMailGroups}
        />)}

        
      </div>
      
    </div>
  );
}

export default App;