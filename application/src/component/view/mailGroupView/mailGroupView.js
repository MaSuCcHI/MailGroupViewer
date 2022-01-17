import styles from './mailGroupView.module.css'

import React, {useEffect, useState} from "react";
import createEngine, {
    DiagramModel,
    DefaultNodeModel,
    DefaultLinkModel,
} from "@projectstorm/react-diagrams"
import { CanvasWidget } from '@projectstorm/react-canvas-core';

const engine = createEngine();
const model = new DiagramModel()
export default function MailGroupViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
    setMailGroups,
}) {

    useEffect(() => {
        if (mailGroups === undefined) {return}
        console.log("test")
        console.log(mailGroups)
        mailGroups.forEach((elems,index) => {
            console.log(index)
            console.log(elems)
            const node = new DefaultNodeModel({
                name: "メールグループ:" + index
            })
            node.registerListener({
                selectionChanged: (event) => {
                    setShowDetailInfo(event.isSelected ? index : "")
                }
            })
            node.addInPort(index)
            elems.forEach((elem) => {
                node.addOutPort(elem)
            })
            model.addAll(node)
        })
    },[mailGroups])

    
    // const node1 = new DefaultNodeModel({
    //     name: "node1"
    // })
    // node1.setPosition(200,300);
    // node1.addInPort("port1-1")
    // node1.addInPort("port1-2")

    // const node2 = new DefaultNodeModel({
    //     name: "node2"
    // })
    // node2.setPosition(300,300);
    // node2.addOutPort("port2-1")

    // const link1 = new DefaultLinkModel()
    // link1.setTargetPort(node1.getPort("port1-1"))
    // link1.setSourcePort(node2.getPort("port2-1"))

    // model.addAll(node1,node2,link1)
    engine.setModel(model)

    return (
        <div className={styles.mailGroupViewer}>
            <CanvasWidget className={styles.diagramContainer} engine={engine}/>
        </div>
    )
}