import styles from './mailGroupView.module.css'

import React, {useEffect, useState} from "react";
import createEngine, {
    DiagramModel,
    DefaultNodeModel,
    DefaultLinkModel,
} from "@projectstorm/react-diagrams"
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { node } from 'prop-types';

const engine = createEngine();
let model = new DiagramModel()
export default function MailGroupViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
    setMailGroups,
    selectedMailGroup,
    setSelectedMailGroup,
}) {
    engine.setModel(model)

    function addNode(address) {
        const tmpNode = model.getNode(address)
        if (tmpNode !== undefined) {return tmpNode}

        const isGroup = mailGroups.has(address)
        const node = new DefaultNodeModel({name: (isGroup ? "メールG:":"")+address})
        node.id = address
        node.registerListener({
            selectionChanged: (event) => {
                setShowDetailInfo(event.isSelected ? address : "")
            }
        })

        //　メールグループ
        if (isGroup) {
                       
        }
        // ユーザー 
        else {

        }
        node.addInPort(address)
        model.addAll(node)
        console.log("addNode:"+address)
        return node
    }

    function addChildrenNode(parentNode) {
        const children = mailGroups.get(parentNode.id).children
        
        let childrenNode = new Array()
        let grandChildrenNode = new Array()
        
        const pX = parentNode.getX()
        const pY = parentNode.getY()
        children.forEach((elem,index) => {
            // console.log("c:"+elem)
            const link = new DefaultLinkModel()
            const childNode = addNode(elem)
            childNode.setPosition(pX + 250, pY + 80 * index)
            const isGroup = mailGroups.has(elem)
            childrenNode.push(childNode)

            parentNode.addOutPort(elem)
            link.setSourcePort(parentNode.getPort(elem))
            link.setTargetPort(childNode.getPort(elem))
            model.addAll(link)
            
            //再帰させる　孫，ひ孫の追加
            if(isGroup) {
                grandChildrenNode.concat(addChildrenNode(childNode))
            }
            
        })

        return childrenNode.concat(grandChildrenNode)
    }

    useEffect(() => {
        console.log("mailGroupView useEffect:"+selectedMailGroup)
        if (mailGroups === undefined || selectedMailGroup === undefined) {return}
        model = new DiagramModel()
        const node = addNode(selectedMailGroup)
        const childrenNode = addChildrenNode(node)

        engine.setModel(model)
    },[mailGroups,selectedMailGroup])

    return (
        <div className={styles.mailGroupViewer}>
            <CanvasWidget className={styles.diagramContainer} engine={engine}/>
        </div>
    )
}