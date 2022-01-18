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
const model = new DiagramModel()
export default function MailGroupViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
    setMailGroups,
    selectedMailGroup,
    setSelectedMailGroup,
}) {

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
        const children = mailGroups.get(parentNode.id)
        

        let childrenNode = new Array()
        let grandChildrenNode = new Array()
        
        children.forEach((elem,index) => {
            console.log("c:"+elem)
            const link = new DefaultLinkModel()
            const childNode = addNode(elem)
            const isGroup = mailGroups.has(elem)
            childrenNode.push(childNode)

            parentNode.addOutPort(elem)
            link.setSourcePort(parentNode.getPort(elem))
            link.setTargetPort(childNode.getPort(elem))
            model.addAll(link)
            
            //再帰させる　孫，ひ孫の追加
            if(isGroup) {
                addChildrenNode(childNode)
            }
            
        })
        //childrenと親を結ぶ


        // return childrenNode.concat(grandChildrenNode)
    }

    useEffect(() => {
        if (mailGroups === undefined || selectedMailGroup === undefined) {return}

        const node = addNode(selectedMailGroup)
        const childrenNode = addChildrenNode(node)


        // mailGroups.forEach((elems,index) => {
        //     console.log(index)
        //     console.log(elems)
        //     const node = new DefaultNodeModel({
        //         name: "メールグループ:" + index
        //     })
        //     node.registerListener({
        //         selectionChanged: (event) => {
        //             setShowDetailInfo(event.isSelected ? index : "")
        //         }
        //     })
        //     node.addInPort(index)
        //     elems.forEach((elem) => {
        //         node.addOutPort(elem)
        //     })
        //     model.addAll(node)
        // })


    },[mailGroups])

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