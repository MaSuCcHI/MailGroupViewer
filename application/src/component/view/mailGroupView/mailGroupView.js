import styles from './mailGroupView.module.css'
import React, {useEffect,useState} from "react";

import createEngine, {
    DiagramModel,
    DefaultNodeModel,
    DefaultLinkModel,
} from "@projectstorm/react-diagrams"
import { CanvasWidget } from '@projectstorm/react-canvas-core';


export default function MailGroupViewer () {

    const engine = createEngine();
    const model = new DiagramModel()

    const node1 = new DefaultNodeModel({
        name: "node1"
    })
    node1.setPosition(200,300);
    node1.addInPort("port1-1")
    node1.addInPort("port1-2")

    const node2 = new DefaultNodeModel({
        name: "node2"
    })
    node2.setPosition(300,300);
    node2.addOutPort("port2-1")

    const link1 = new DefaultLinkModel()
    link1.setTargetPort(node1.getPort("port1-1"))
    link1.setSourcePort(node2.getPort("port2-1"))

    model.addAll(node1,node2,link1)
    engine.setModel(model)

    return (
        <div className={styles.mailGroupViewer}>
            <CanvasWidget className={styles.diagramContainer} engine={engine}/>
        </div>
    )
}