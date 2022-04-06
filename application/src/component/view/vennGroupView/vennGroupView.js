import styles from './vennGroupView.module.css'

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
export default function VennGroupViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
    setMailGroups,
    selectedMailGroups,
    setSelectedMailGroups,
}) {

    return (
        <div className={styles.mailGroupViewer}>
            test
        </div>
    )
}