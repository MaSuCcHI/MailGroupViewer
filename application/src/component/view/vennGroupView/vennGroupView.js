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
        if(selectedMailGroups.length > 3){return}
        console.log(selectedMailGroups)
        const svg = d3.select(container.current)

        if (mailGroups === undefined || selectedMailGroups === undefined ) {return }
        console.log(selectedMailGroups.length)

        // const sets = []
        // selectedMailGroups.forEach( (elem,index) => {
        //     let tmp = {}
        //     // tmp.sets = [mailGroups.get(elem).children] 
        //     let setA = getChildrenUserMails(elem,mailGroups,true) 
        //     tmp.sets = [Array.from(setA)]
        //     tmp.size =  10 * setA.size
        //     tmp.label = elem
        //     sets.push(tmp)
        // })
        // console.log(sets)

        // let setA = getChildrenUserMails(selectedMailGroups[0],mailGroups,true) 
        // let setB = getChildrenUserMails(selectedMailGroups[1],mailGroups,true) 
        // let interset = setA.union(setB)
        
        // let tmp1 = {}
        // tmp1.sets = [Array.from(interset)]
        // tmp1.size = interset.size
        // // tmp1.label = 'setA ∩ setB'
        // console.log(tmp1.sets)
        // sets.push(tmp1)

        var sets1 = [
            {sets: ['A'], size: 12},
            {sets: ['B'], size: 12},
            {sets: ['C'], size: 12},
            {sets: ['A','B'], size: 2},
            {sets: ['A','C'], size: 2},
            {sets: ['B','C'], size: 0}
        ];
        svg.datum(sets1).call(chart)
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

Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

Set.prototype.union = function(setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}
