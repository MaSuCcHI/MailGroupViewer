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
let nodes = new Map()
export default function MailGroupViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
    setMailGroups,
    selectedMailGroups,
    setSelectedMailGroups,
}) {
    engine.setModel(model)

    function addNode(address, isParent=false, isUsers=false) {
        const tmpNode = nodes.get(address) 
        if (tmpNode !== undefined) {return tmpNode}

        const isGroup = mailGroups.has(address)
        const node = new DefaultNodeModel({
            name: isUsers ? "ユーザーアドレス" : address,
            color: isParent ? "rgba(192, 0, 25, 0.2)" :  "rgba(0, 192, 255, 0.2)"
        })
        node.id = address
        
        node.registerListener({
            selectionChanged: (event) => {
                console.log("selected")
                setShowDetailInfo(event.isSelected ? address : "")
            }
        })

        node.addInPort(isUsers ? "Users" : " ")
        nodes.set(address,node)
        model.addAll(node)
        console.log("addNode:"+address)
        return node
    }

    function addChildrenNode(parentNode,dissmiss=[]) {
        const children = mailGroups.get(parentNode.id).children
        const pX = parentNode.getX()
        const pY = parentNode.getY()
        
        // ユーザーアドレスをまとめたノード
        const isExistUserAddressNode = nodes.has(parentNode.id + "/users")
        let usersAddressNode = addNode( parentNode.id + "/users",false,true)
        let numGroupChildren = 0   
        children.forEach((elem,index) => {
            const isGroup = mailGroups.has(elem)
            
            if(isGroup){
                // メールグループ
                numGroupChildren = numGroupChildren + 1
                // if(nodes.get(elem) !== undefined){ return }
                if(dissmiss.includes(elem)){ return }

                const childNode = addNode(elem)
                childNode.setPosition(pX + 350, pY + 100 * (numGroupChildren-1) )

                if(parentNode.getPort(elem)===undefined){
                    parentNode.addOutPort(elem)
                    const link = new DefaultLinkModel()
                    link.setSourcePort(parentNode.getPort(elem))
                    link.setTargetPort(childNode.getPort(" "))
                    model.addAll(link)
                }
                
                // 再帰させる　孫，ひ孫の追加
                addChildrenNode(childNode)
                // addParentsNode(childNode,[parentNode.id]) //とても複雑なものを再起的に描写すると重すぎるためコメントアウト
            }else{
                // ユーザーアドレス
                if(isExistUserAddressNode){ return }
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
        
        if(usersAddressNode.getOutPorts().length !== 0 && usersAddressNode.getInPorts().length === 1 ){
            if(isExistUserAddressNode){ return }
            const link = new DefaultLinkModel()
            usersAddressNode.setPosition(pX + 350, pY + numGroupChildren * 150)
            parentNode.addOutPort("Users")
            link.setSourcePort(parentNode.getPort("Users"))
            link.setTargetPort(usersAddressNode.getPort("Users"))
            
            nodes.set(usersAddressNode.id,usersAddressNode)
            model.addAll(usersAddressNode,link)
        } else if(usersAddressNode.getOutPorts().length === 0) {
            const rmNode = nodes.get(parentNode.id + "/users")
            model.removeNode(rmNode)
        }

        return
    }

    function addParentsNode(childNode,dissmiss=[]){
        const parents = mailGroups.get(childNode.id).parents

        const cX = childNode.getX()
        const cY = childNode.getY()
        parents.forEach((elem,index) => {
            if(nodes.get(elem) !== undefined){ return }
            if(dissmiss.includes(elem)){ return }

            const parentNode = addNode(elem,true,false)
            parentNode.setPosition(cX - 350, cY - 80 * index)
            const isGroup = mailGroups.has(elem)

            const link = new DefaultLinkModel()
            parentNode.addOutPort(childNode.id)
            link.setSourcePort(parentNode.getPort(childNode.id))
            link.setTargetPort(childNode.getPort(" "))
            model.addAll(link)
            
            // //再帰させる　孫，ひ孫の追加
            if(isGroup) {
                addParentsNode(parentNode)
                // addChildrenNode(parentNode,[childNode.id])　//とても複雑なものを再起的に描写すると重すぎるためコメントアウト
            }
        })
    }

    useEffect(() => {
        console.log("mailGroupView useEffect:")
        console.log(selectedMailGroups)
        if (mailGroups === undefined || selectedMailGroups === undefined ) {return }
        model = new DiagramModel()
        nodes = new Map() //model.getNode(id) が使えないため自前で管理
        selectedMailGroups.forEach((elem,index)=>{
            const node = addNode(elem)
            if(!nodes.has(elem)){
                node.setPosition(40 ,10 + index*120)
            }
            node.setSelected(true)
            addChildrenNode(node)
            addParentsNode(node)
        })
        
        engine.setModel(model)
        
    },[mailGroups,selectedMailGroups])

    return (
        <div className={styles.mailGroupViewer}>
            <CanvasWidget className={styles.diagramContainer} engine={engine}/>
        </div>
    )
}