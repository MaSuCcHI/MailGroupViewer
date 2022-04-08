import styles from './vennGroupView.module.css'
import { getChildrenUserMails } from '../../data_transform';

import * as d3 from 'd3';
import * as venn from "venn.js";
import React, {useEffect, useState,useRef} from "react";
import ReactDOM from 'react-dom'
import { node } from 'prop-types';
import { useForkRef } from '@mui/material';


export default function VennGroupViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
    setMailGroups,
    selectedMailGroups,
    setSelectedMailGroups,
}) {

    const container = useRef(null);
    const chart = venn.VennDiagram()
    useEffect(() => {
        console.log("VennGroupView useEffect:")
        console.log(selectedMailGroups)
        const svg = d3.select(container.current)

        if (mailGroups === undefined || selectedMailGroups === undefined ) {return }
        console.log(selectedMailGroups.length)

        console.log(mailGroups.get('gA@test.com').children)
        const sets = []
        selectedMailGroups.forEach( (elem) => {
            let tmp = {}
            // tmp.sets = [mailGroups.get(elem).children] 
            tmp.sets = [Array.from(getChildrenUserMails(elem,mailGroups,true))]
            tmp.size = 100 
            tmp.label = elem
            sets.push(tmp)
        })
        console.log(sets)
        

        svg.datum(sets).call(chart)
        


    },[mailGroups,selectedMailGroups])

    
    return (
        <svg
        className='venn'
        height={600}
        width={600}
        ref={container}
        />

        )

}