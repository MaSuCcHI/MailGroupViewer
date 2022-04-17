import styles from './vennGroupView.module.css'
import { getChildrenUserMails } from '../../data_transform';

import * as d3 from 'd3';
import * as venn from "venn.js";
import React, {useEffect, useState,useRef} from "react";
import { Tooltip } from '@mui/material';


export default function VennGroupViewer ({
    showDetailInfoMailGroups,
    setShowDetailInfoMailGroups,
    mailGroups,
    setMailGroups,
    selectedMailGroups,
    setSelectedMailGroups,
}) {
    const container = useRef(null);
    const [tooltipText,setTooltipText] = useState("test")

    const chart = venn.VennDiagram()

    useEffect(() => {
        console.log("VennGroupView useEffect:")
        if(selectedMailGroups.length > 3){return}
        console.log(selectedMailGroups)
        const svg = d3.select(container.current)
        

        if (mailGroups === undefined || selectedMailGroups === undefined ) {return }
        console.log(selectedMailGroups.length)

        const sets = []
        const ABC = []

        for(const elem of selectedMailGroups) {
            console.log(elem)
            let childrenUser = getChildrenUserMails(elem,mailGroups,true)

            let mailSet = {}
            mailSet.sets = [elem]
            mailSet.size = childrenUser.size 

            sets.push(mailSet)
            for(const addedMailgroup of ABC){
                let childrenUser_addedMailgroup = getChildrenUserMails(addedMailgroup,mailGroups,true)

                let mailSet_addedMailgroup = {}
                mailSet_addedMailgroup.sets = [elem,addedMailgroup]
                mailSet_addedMailgroup.size = childrenUser.intersection(childrenUser_addedMailgroup).size
                sets.push(mailSet_addedMailgroup)
            }
            // 三つのメールグループに含まれるもの
            if(ABC.size === 2){
                let AchildrenUser_addedMailgroup = getChildrenUserMails(ABC[0],mailGroups,true)
                let BchildrenUser_addedMailgroup = getChildrenUserMails(ABC[1],mailGroups,true) 
                let mailSet_addedMailgroup = {}
                mailSet_addedMailgroup.sets = [elem,ABC[0],ABC[1]]
                mailSet_addedMailgroup.size = childrenUser.intersection(AchildrenUser_addedMailgroup).intersection(BchildrenUser_addedMailgroup).size
                sets.push(mailSet_addedMailgroup)
            }
            ABC.push(elem)
        }

        console.log(sets)
        svg.datum(sets).call(chart)

        svg.selectAll("path")
            .style("stroke-opacity", 0)
            .style("stroke", "#fff")
            .style("stroke-width", 2)

        svg.selectAll('g').on('mouseover',function(d,i) {
            venn.sortAreas(svg,d)
            // console.log(d.size)
            setTooltipText(d.size + 'ユーザー')

            const selection = d3.select(this).transition("tooltip").duration(400);
            console.log(selection.select('path'))
            selection
                .select("path")
                .style("stroke-width", 10)
                .style("fill-opacity", d.sets.length === 1 ? 0.4 : 0.1)
                .style("stroke-opacity", 1);

        })
        .on('mouseout', function(d,i) {
            const selection = d3.select(this).transition("tooltip").duration(400);
            console.log(selection.select('path'))
            selection
                .select("path")
                .style("stroke-width", 0)
                .style("fill-opacity", d.sets.length === 1 ? .25 : .0)
                .style("stroke-opacity", 0);
        })

        // var sets1 = [
        //     {sets: ['A'], size: 12},
        //     {sets: ['B'], size: 12},
        //     {sets: ['C'], size: 12},
        //     {sets: ['A','B'], size: 2},
        //     {sets: ['A','C'], size: 2},
        //     {sets: ['B','C'], size: 0}
        // ];
        // svg.datum(sets1).call(chart)

    },[mailGroups,selectedMailGroups])

    
    return (        
        <Tooltip title={tooltipText} followCursor>
            <svg
            className='venn'
            height={600}
            width={1200}
            ref={container}
            />
        </Tooltip>
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
