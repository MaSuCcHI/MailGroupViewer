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
        const node = new DefaultNodeModel({name: address})
        node.id = address
        node.registerListener({
            selectionChanged: (event) => {
                setShowDetailInfo(event.isSelected ? address : "")
            }
        })

        node.addInPort(" ")
        model.addAll(node)
        console.log("addNode:"+address)
        return node
    }

    function addChildrenNode(parentNode) {
        const pX = parentNode.getX()
        const pY = parentNode.getY()
        const children = mailGroups.get(parentNode.id)
        
        // ユーザーアドレスをまとめたノード
        let usersAddressNode = new DefaultNodeModel({name:"ユーザーアドレス"})
        usersAddressNode.id = parentNode.id + "/users"
        usersAddressNode.registerListener({
            selectionChanged: (event) => {
                setShowDetailInfo(event.isSelected ? usersAddressNode.id : "")
            }
        })
        let users = []
        let childrenNode = [usersAddressNode]
        let grandChildrenNode = []
           
        children.forEach((elem,index) => {
            // console.log("c:"+elem)
            const isGroup = mailGroups.has(elem)
            
            if(isGroup){
                // メールグループ
                const link = new DefaultLinkModel()
                const childNode = addNode(elem)
                childNode.setPosition(pX + 250, pY + 80 * (index - users.length) )
                childrenNode.push(childNode)

                parentNode.addOutPort(elem)
                link.setSourcePort(parentNode.getPort(elem))
                link.setTargetPort(childNode.getPort(" "))
                model.addAll(link)
                
                //再帰させる　孫，ひ孫の追加
                grandChildrenNode.concat(addChildrenNode(childNode))

            }else{
                // ユーザーアドレス
                users.push(elem)
                const ports = usersAddressNode.getOutPorts()
                console.log("test")
                console.log(ports.length)
                if (ports.length < 5) {
                    usersAddressNode.addOutPort(elem)            
                } else if (ports.length === 5) {
                    usersAddressNode.addOutPort("・・・") 
                }

            }
        })

        

        if(usersAddressNode.getOutPorts().length !== 0){
            const link = new DefaultLinkModel()
            usersAddressNode.setPosition(pX + 250, pY + 80 * (children.length - users.length))
            usersAddressNode.addInPort("Users")
            parentNode.addOutPort("Users")
            link.setSourcePort(parentNode.getPort("Users"))
            link.setTargetPort(usersAddressNode.getPort("Users"))
            
            model.addAll(usersAddressNode,link)
        }
        

        return childrenNode.concat(grandChildrenNode)
    }

    useEffect(() => {
        console.log("mailGroupView useEffect:"+selectedMailGroup)
        if (mailGroups === undefined || selectedMailGroup === undefined || !mailGroups.has(selectedMailGroup)) {return}
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