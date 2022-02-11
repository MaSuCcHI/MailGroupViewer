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

    function addNode(address, isParent=false) {
        const tmpNode = model.getNode(address)
        if (tmpNode !== undefined) {return tmpNode}

        const isGroup = mailGroups.has(address)
        const node = new DefaultNodeModel({name: address})
        node.id = address
        node.registerListener({
            selectionChanged: (event) => {
                console.log("selected")
                setShowDetailInfo(event.isSelected ? address : "")
            }
        })

        node.addInPort(" ")
        model.addAll(node)
        console.log("addNode:"+address)
        return node
    }

    function addChildrenNode(parentNode,dissmiss=[]) {
        const children = mailGroups.get(parentNode.id).children
        const pX = parentNode.getX()
        const pY = parentNode.getY()
        
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
           
        children.forEach((elem,index) => {
            // console.log("c:"+elem)
            const isGroup = mailGroups.has(elem)
            
            if(isGroup){
                // メールグループ
                if(model.getNode(elem) !== undefined){ return }
                if(elem in dissmiss){ return }

                const link = new DefaultLinkModel()
                model.addAll(link)

                const childNode = addNode(elem)
                childNode.setPosition(pX + 250, pY + 80 * (index - users.length) )
                childrenNode.push(childNode)

                parentNode.addOutPort(elem)
                link.setSourcePort(parentNode.getPort(elem))
                link.setTargetPort(childNode.getPort(" "))
                
                // 再帰させる　孫，ひ孫の追加
                addChildrenNode(childNode)
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

        return
    }

    function addParentsNode(childNode,dissmiss=[]){
        const parents = mailGroups.get(childNode.id).parents

        const cX = childNode.getX()
        const cY = childNode.getY()
        parents.forEach((elem,index) => {
            if(model.getNode(elem) !== undefined){ return }
            if(elem in dissmiss){ return }

            const parentNode = addNode(elem,true)
            parentNode.setPosition(cX - 250, cY - 80 * index)
            const isGroup = mailGroups.has(elem)

            const link = new DefaultLinkModel()
            parentNode.addOutPort(childNode.id)
            link.setSourcePort(parentNode.getPort(childNode.id))
            link.setTargetPort(childNode.getPort(" "))
            model.addAll(link)
            
            // //再帰させる　孫，ひ孫の追加
            if(isGroup) {
                addParentsNode(parentNode)
            }
        })
    }

    useEffect(() => {
        console.log("mailGroupView useEffect:"+selectedMailGroup)
        if (mailGroups === undefined || selectedMailGroup === undefined || !mailGroups.has(selectedMailGroup)) {return}
        model = new DiagramModel()
        const node = addNode(selectedMailGroup)
        node.setPosition(40,10)
        node.setSelected(true)
        addChildrenNode(node)
        addParentsNode(node)

        engine.setModel(model)
        
    },[mailGroups,selectedMailGroup])

    return (
        <div className={styles.mailGroupViewer}>
            <CanvasWidget className={styles.diagramContainer} engine={engine}/>
        </div>
    )
}